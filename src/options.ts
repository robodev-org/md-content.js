import type { MdFactoryOptions } from './types';

export const DEFAULT_MD_FACTORY_OPTIONS: MdFactoryOptions = Object.freeze({
  sanitize: true,
  allowHtml: false,
  maxDocBytes: 500_000,
  stableSlugify: true,
  slugPrefix: undefined,
  diagnostics: false,
  logger: undefined,
});

export function resolveMdFactoryOptions(
  options: Partial<MdFactoryOptions> = {}
): MdFactoryOptions {
  const resolved: MdFactoryOptions = {
    ...DEFAULT_MD_FACTORY_OPTIONS,
    ...options,
  };

  // Enforce safety defaults regardless of caller overrides.
  resolved.sanitize = true;
  resolved.allowHtml = false;

  if (!Number.isFinite(resolved.maxDocBytes) || resolved.maxDocBytes <= 0) {
    resolved.maxDocBytes = DEFAULT_MD_FACTORY_OPTIONS.maxDocBytes;
  }

  resolved.stableSlugify = Boolean(resolved.stableSlugify);

  return resolved;
}
