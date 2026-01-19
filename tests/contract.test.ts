import { expect } from 'vitest';
import { createDiagnosticsSession } from '../src/diagnostics';
import { DEFAULT_MD_FACTORY_OPTIONS, resolveMdFactoryOptions } from '../src/options';
import { diagnosticsTest } from './helpers/diagnosticsTest';

diagnosticsTest('contract: options shape remains stable', (probe) => {
  const resolved = resolveMdFactoryOptions({});
  probe.setResolvedOptions(resolved as unknown as Record<string, unknown>);

  expect(Object.keys(DEFAULT_MD_FACTORY_OPTIONS)).toEqual([
    'sanitize',
    'allowHtml',
    'maxDocBytes',
    'stableSlugify',
    'slugPrefix',
    'diagnostics',
    'logger'
  ]);

  expect(Object.keys(resolved)).toEqual(Object.keys(DEFAULT_MD_FACTORY_OPTIONS));
});

diagnosticsTest('contract: diagnostics report shape remains stable', (probe) => {
  const session = createDiagnosticsSession({
    repo: 'md-content-factory',
    version: '0.0.0',
    options: { sanitize: true }
  });
  probe.setOutput('diagnosticsSession', session);

  const { report } = session;
  expect(report.repo).toBe('md-content-factory');
  expect(report.version).toBe('0.0.0');
  expect(report.traceId.length).toBeGreaterThan(0);
  expect(Array.isArray(report.timeline)).toBe(true);
  expect(Array.isArray(report.events)).toBe(true);
  expect(typeof report.artifacts).toBe('object');
});
