import fs from 'node:fs';
import path from 'node:path';

export type DiagnosticsLevel = 'debug' | 'info' | 'warn' | 'error';

export interface DiagnosticsReport {
  testName: string;
  traceId: string;
  resolvedOptions?: Record<string, unknown>;
  timeline: Array<{ t: number; name: string; meta?: Record<string, unknown> }>;
  events: Array<{ level: DiagnosticsLevel; name: string; meta?: Record<string, unknown> }>;
  snapshots: Array<{ name: string; data: Record<string, unknown> }>;
  callTrace: Array<{ name: string; args?: unknown[] }>;
  outputs?: Record<string, unknown>;
  error?: { name: string; message: string; code?: string };
}

let TRACE_COUNTER = 0;

export function nextTraceId(): string {
  TRACE_COUNTER += 1;
  return `trace-${TRACE_COUNTER}`;
}

export class DiagnosticsProbe {
  readonly testName: string;
  readonly traceId: string;
  private tCounter = 0;
  private report: DiagnosticsReport;

  constructor(params: { testName: string; traceId?: string }) {
    this.testName = params.testName;
    this.traceId = params.traceId ?? nextTraceId();
    this.report = {
      testName: this.testName,
      traceId: this.traceId,
      timeline: [],
      events: [],
      snapshots: [],
      callTrace: []
    };
  }

  setResolvedOptions(options: Record<string, unknown>): void {
    this.report.resolvedOptions = options;
  }

  traceCall(name: string, ...args: unknown[]): void {
    this.report.callTrace.push({ name, args });
  }

  recordTimeline(name: string, meta?: Record<string, unknown>): void {
    this.tCounter += 1;
    this.report.timeline.push({ t: this.tCounter, name, meta });
  }

  recordEvent(level: DiagnosticsLevel, name: string, meta?: Record<string, unknown>): void {
    this.report.events.push({ level, name, meta });
  }

  recordSnapshot(name: string, data: Record<string, unknown>): void {
    this.report.snapshots.push({ name, data });
  }

  setOutput(key: string, value: unknown): void {
    if (!this.report.outputs) {
      this.report.outputs = {};
    }
    this.report.outputs[key] = value;
  }

  setError(err: unknown): void {
    if (!(err instanceof Error)) return;
    this.report.error = {
      name: err.name,
      message: err.message,
      code: (err as { code?: string }).code
    };
  }

  getReport(): DiagnosticsReport {
    return JSON.parse(JSON.stringify(this.report)) as DiagnosticsReport;
  }

  async writeFailureArtifacts(): Promise<void> {
    const report = this.getReport();
    const safeName = this.testName.replace(/[^a-z0-9._-]+/gi, '-');
    const fileName = `${safeName}-${this.traceId}.json`;
    const artifactPath = path.resolve('tests', 'artifacts', fileName);
    const payload = JSON.stringify(report, null, 2);

    console.error(payload);

    try {
      fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
      fs.writeFileSync(artifactPath, payload, 'utf8');
    } catch {
      // Best-effort only.
    }
  }
}
