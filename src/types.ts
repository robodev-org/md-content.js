import type { DiagnosticsReport } from './diagnostics';

export interface Logger {
  debug?: (message: string) => void;
  info?: (message: string) => void;
  warn?: (message: string) => void;
  error?: (message: string) => void;
}

export interface MdFactoryOptions {
  sanitize: boolean;
  allowHtml: boolean;
  maxDocBytes: number;
  stableSlugify: boolean;
  slugPrefix?: string;
  diagnostics?: boolean;
  logger?: Logger;
}

export interface Metadata {
  title?: string;
  headings: Array<{ depth: 1 | 2 | 3 | 4 | 5 | 6; text: string; slug: string }>;
  links: Array<{ href: string; text?: string }>;
  wordCount: number;
}

export interface RenderResult {
  html: string;
  metadata: Metadata;
  diagnostics?: DiagnosticsReport;
}

export interface MdFactory {
  render(markdown: string, options?: Partial<MdFactoryOptions>): RenderResult;
  extractMetadata(markdown: string, options?: Partial<MdFactoryOptions>): {
    metadata: Metadata;
    diagnostics?: DiagnosticsReport;
  };
}
