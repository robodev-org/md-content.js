import fs from 'node:fs';
import path from 'node:path';

export function loadFixture(name: string): unknown {
  const filePath = path.resolve('tests', 'fixtures', name);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function stableReplacer(value: unknown): unknown {
  if (!value || typeof value !== 'object') return value;
  if (Array.isArray(value)) {
    return value.map((item) => stableReplacer(item));
  }
  const entries = Object.entries(value as Record<string, unknown>).sort(
    ([a], [b]) => a.localeCompare(b)
  );
  const sorted: Record<string, unknown> = {};
  for (const [key, val] of entries) {
    sorted[key] = stableReplacer(val);
  }
  return sorted;
}

export function toStableJson(value: unknown): string {
  return JSON.stringify(stableReplacer(value), null, 2);
}
