import type { Logger } from './types';

export type DiagnosticsLevel = 'debug' | 'info' | 'warn' | 'error';

export interface DiagnosticsReport {
  repo: string;
  version: string;
  traceId: string;
  env: { userAgent?: string; platform?: string };
  options: Record<string, unknown>;
  timeline: Array<{ t: number; name: string; meta?: Record<string, unknown> }>;
  events: Array<{ level: DiagnosticsLevel; name: string; meta?: Record<string, unknown> }>;
  artifacts: { notes?: string[]; samples?: Array<Record<string, unknown>> };
  errors?: Array<{ code: string; message: string; cause?: string }>;
}

export interface DiagnosticsSession {
  report: DiagnosticsReport;
  logger?: Logger;
  _tCounter: number;
}

let TRACE_COUNTER = 0;

export function createDiagnosticsSession(params: {
  repo: string;
  version: string;
  options: Record<string, unknown>;
  env?: { userAgent?: string; platform?: string };
  logger?: Logger;
  traceId?: string;
}): DiagnosticsSession {
  const traceId = params.traceId ?? `trace-${++TRACE_COUNTER}`;
  return {
    report: {
      repo: params.repo,
      version: params.version,
      traceId,
      env: params.env ?? {},
      options: params.options,
      timeline: [],
      events: [],
      artifacts: {},
    },
    logger: params.logger,
    _tCounter: 0,
  };
}

export function recordTimeline(
  session: DiagnosticsSession | undefined,
  name: string,
  meta?: Record<string, unknown>
): void {
  if (!session) return;
  session._tCounter += 1;
  session.report.timeline.push({ t: session._tCounter, name, meta });
}

export function recordEvent(
  session: DiagnosticsSession | undefined,
  level: DiagnosticsLevel,
  name: string,
  meta?: Record<string, unknown>
): void {
  if (!session) return;
  session.report.events.push({ level, name, meta });
  if (!session.logger) return;
  const logger = session.logger;
  const msg = meta ? `${name} ${JSON.stringify(meta)}` : name;
  if (level === 'debug') logger.debug?.(msg);
  if (level === 'info') logger.info?.(msg);
  if (level === 'warn') logger.warn?.(msg);
  if (level === 'error') logger.error?.(msg);
}

export function recordSnapshot(
  session: DiagnosticsSession | undefined,
  name: string,
  data: Record<string, unknown>
): void {
  if (!session) return;
  if (!session.report.artifacts.samples) {
    session.report.artifacts.samples = [];
  }
  session.report.artifacts.samples.push({ name, data });
}

export function finalizeDiagnosticsReport(
  session: DiagnosticsSession | undefined
): DiagnosticsReport | undefined {
  if (!session) return undefined;
  return session.report;
}
