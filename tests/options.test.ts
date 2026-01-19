import { expect } from 'vitest';
import { resolveMdFactoryOptions, DEFAULT_MD_FACTORY_OPTIONS } from '../src/options';
import { diagnosticsTest } from './helpers/diagnosticsTest';

const expectedDefaults = {
  sanitize: true,
  allowHtml: false,
  maxDocBytes: 500_000,
  stableSlugify: true,
  slugPrefix: undefined,
  diagnostics: false,
  logger: undefined
};

diagnosticsTest('defaults resolution applies mandatory defaults', (probe) => {
  const resolved = resolveMdFactoryOptions({});
  probe.setResolvedOptions(resolved as unknown as Record<string, unknown>);

  expect(resolved).toEqual(expectedDefaults);
  expect(DEFAULT_MD_FACTORY_OPTIONS).toEqual(expectedDefaults);
});

diagnosticsTest('defaults resolution enforces safety overrides', (probe) => {
  const resolved = resolveMdFactoryOptions({
    sanitize: false,
    allowHtml: true,
    maxDocBytes: -1,
    stableSlugify: false
  });
  probe.setResolvedOptions(resolved as unknown as Record<string, unknown>);

  expect(resolved.sanitize).toBe(true);
  expect(resolved.allowHtml).toBe(false);
  expect(resolved.maxDocBytes).toBe(expectedDefaults.maxDocBytes);
  expect(resolved.stableSlugify).toBe(false);
});
