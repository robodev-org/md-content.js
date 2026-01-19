import { resolveMdFactoryOptions } from '../../src/options';
import type { MdFactoryOptions } from '../../src/types';
import { DiagnosticsProbe } from '../helpers/diagnosticsProbe';

export type FakeStep = 'parse' | 'sanitize' | 'slugify' | 'metadata' | 'render';

export interface FakeRunOptions {
  timeoutAt?: FakeStep;
  errorAt?: FakeStep;
  abortAt?: FakeStep;
  partialOutput?: boolean;
  forceUnsanitized?: boolean;
  signal?: AbortSignal;
}

export interface FakeRenderResult {
  html: string;
  metadata: {
    headings: Array<{ depth: number; text: string; slug: string }>;
    links: Array<{ href: string; text?: string }>;
    wordCount: number;
  };
}

export class FakeMdPipeline {
  private disposed = false;
  private runCount = 0;
  private resolvedOptions: MdFactoryOptions;

  constructor(
    options: Partial<MdFactoryOptions> = {},
    private probe?: DiagnosticsProbe
  ) {
    this.resolvedOptions = resolveMdFactoryOptions(options);
    this.probe?.setResolvedOptions(this.resolvedOptions as unknown as Record<string, unknown>);
  }

  render(markdown: string, runOptions: FakeRunOptions = {}): FakeRenderResult {
    this.ensureActive();
    this.runCount += 1;
    this.probe?.traceCall('render', markdown, runOptions);

    if (runOptions.signal?.aborted) {
      return this.abortNow('render');
    }

    const trimmed = this.ensureMaxBytes(markdown);
    const parsed = this.step('parse', runOptions, () => this.parse(trimmed));
    const sanitized = this.step('sanitize', runOptions, () =>
      this.sanitize(parsed, runOptions.forceUnsanitized)
    );
    const slugged = this.step('slugify', runOptions, () =>
      this.slugifyHeadings(sanitized)
    );
    const metadata = this.step('metadata', runOptions, () =>
      this.extractMetadata(slugged)
    );
    const html = this.step('render', runOptions, () =>
      this.toHtml(slugged, runOptions.partialOutput)
    );

    const result: FakeRenderResult = { html, metadata };
    this.probe?.setOutput('renderResult', result);
    return result;
  }

  reset(): void {
    this.ensureActive();
    this.runCount = 0;
    this.probe?.recordEvent('info', 'reset');
    this.probe?.recordSnapshot('reset', { runCount: this.runCount });
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.probe?.recordEvent('info', 'dispose');
    this.probe?.recordSnapshot('dispose', { disposed: this.disposed, runCount: this.runCount });
  }

  getState(): { disposed: boolean; runCount: number } {
    return { disposed: this.disposed, runCount: this.runCount };
  }

  private ensureActive(): void {
    if (!this.disposed) return;
    this.probe?.recordEvent('error', 'disposed');
    throw new Error('Pipeline is disposed');
  }

  private ensureMaxBytes(markdown: string): string {
    if (typeof markdown !== 'string') {
      this.probe?.recordEvent('error', 'invalid-input');
      throw new Error('Invalid markdown input');
    }

    const maxBytes = this.resolvedOptions.maxDocBytes;
    if (markdown.length <= maxBytes) return markdown;

    const truncated = markdown.slice(0, maxBytes);
    this.probe?.recordEvent('warn', 'doc:truncated', { maxBytes });
    this.probe?.recordSnapshot('truncate', { originalBytes: markdown.length, maxBytes });
    return truncated;
  }

  private step<T>(name: FakeStep, runOptions: FakeRunOptions, fn: () => T): T {
    this.probe?.recordTimeline(name);
    this.probe?.recordEvent('info', name);
    this.probe?.recordSnapshot(name, { runCount: this.runCount });

    if (runOptions.signal?.aborted) {
      return this.abortNow(name);
    }

    if (runOptions.abortAt === name) {
      return this.abortNow(name);
    }

    if (runOptions.timeoutAt === name) {
      const err = new Error(`Timeout at ${name}`);
      err.name = 'TimeoutError';
      this.probe?.recordEvent('error', 'timeout', { step: name });
      throw err;
    }

    if (runOptions.errorAt === name) {
      const err = new Error(`Error at ${name}`);
      err.name = 'StepError';
      this.probe?.recordEvent('error', 'step:error', { step: name });
      throw err;
    }

    return fn();
  }

  private abortNow(step: FakeStep): never {
    const err = new Error(`Aborted at ${step}`);
    err.name = 'AbortError';
    this.probe?.recordEvent('warn', 'abort:signaled', { step });
    throw err;
  }

  private parse(markdown: string): string {
    return markdown.trim();
  }

  private sanitize(markdown: string, forceUnsanitized?: boolean): string {
    if (forceUnsanitized) {
      this.probe?.recordEvent('warn', 'sanitize:skipped');
      return markdown;
    }
    const sanitized = markdown.replace(/<[^>]*>/g, '');
    this.probe?.recordEvent('info', 'sanitize:blocked');
    return sanitized;
  }

  private slugifyHeadings(markdown: string): string {
    const lines = markdown.split('\n');
    return lines
      .map((line) => {
        if (!line.startsWith('#')) return line;
        const text = line.replace(/^#+\s*/, '').trim();
        const slug = this.slugify(text);
        return `${line} {#${slug}}`;
      })
      .join('\n');
  }

  private slugify(text: string): string {
    const stable = this.resolvedOptions.stableSlugify;
    const prefix = this.resolvedOptions.slugPrefix ?? '';
    const normalized = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    const slug = stable ? normalized : `${normalized}-${this.runCount}`;
    return `${prefix}${slug}`;
  }

  private extractMetadata(markdown: string): FakeRenderResult['metadata'] {
    const headings: Array<{ depth: number; text: string; slug: string }> = [];
    const links: Array<{ href: string; text?: string }> = [];
    const lines = markdown.split('\n');

    for (const line of lines) {
      const headingMatch = /^(#{1,6})\s+(.+?)(?:\s+\{#([a-z0-9-]+)\})?$/.exec(
        line.trim()
      );
      if (headingMatch) {
        headings.push({
          depth: headingMatch[1].length,
          text: headingMatch[2],
          slug: headingMatch[3] ?? this.slugify(headingMatch[2])
        });
      }

      const linkMatch = /\[(.+?)\]\((.+?)\)/.exec(line);
      if (linkMatch) {
        links.push({ href: linkMatch[2], text: linkMatch[1] });
      }
    }

    const wordCount = markdown
      .replace(/\[[^\]]+\]\([^\)]+\)/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean).length;

    return { headings, links, wordCount };
  }

  private toHtml(markdown: string, partialOutput?: boolean): string {
    const body = markdown
      .split('\n')
      .map((line) => {
        if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
        if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
        return `<p>${line}</p>`;
      })
      .join('');
    if (partialOutput) {
      this.probe?.recordEvent('warn', 'render:partial');
      return body.slice(0, Math.max(0, Math.floor(body.length / 2)));
    }
    return body;
  }
}
