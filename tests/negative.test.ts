import { expect } from 'vitest';
import { FakeMdPipeline } from './fakes/fakePipeline';
import { diagnosticsTest } from './helpers/diagnosticsTest';

diagnosticsTest('negative: timeout at sanitize emits diagnostics', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);

  expect(() => pipeline.render('# Title', { timeoutAt: 'sanitize' })).toThrow('Timeout');

  const report = probe.getReport();
  expect(report.events.some((event) => event.name === 'timeout')).toBe(true);
});

diagnosticsTest('negative: truncation emits diagnostics and snapshots', (probe) => {
  const pipeline = new FakeMdPipeline({ maxDocBytes: 10 }, probe);
  const input = 'a'.repeat(50);

  const result = pipeline.render(input);
  const report = probe.getReport();

  expect(result.html.length).toBeGreaterThan(0);
  expect(report.events.some((event) => event.name === 'doc:truncated')).toBe(true);
  expect(report.snapshots.some((snapshot) => snapshot.name === 'truncate')).toBe(true);
});

diagnosticsTest('negative: invalid input is rejected', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);

  expect(() => pipeline.render(123 as unknown as string)).toThrow('Invalid markdown');

  const report = probe.getReport();
  expect(report.events.some((event) => event.name === 'invalid-input')).toBe(true);
});

diagnosticsTest('negative: disposed usage is rejected', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  pipeline.dispose();

  expect(() => pipeline.render('# Title')).toThrow('disposed');

  const report = probe.getReport();
  expect(report.events.some((event) => event.name === 'disposed')).toBe(true);
});

diagnosticsTest('negative: abort signal is honored', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  const controller = new AbortController();
  controller.abort();

  expect(() => pipeline.render('# Title', { signal: controller.signal })).toThrow('Aborted');

  const report = probe.getReport();
  expect(report.events.some((event) => event.name === 'abort:signaled')).toBe(true);
});

diagnosticsTest('negative: partial output is reported', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  const result = pipeline.render('# Title\\n\\nBody', { partialOutput: true });

  const report = probe.getReport();
  expect(result.html.length).toBeGreaterThan(0);
  expect(report.events.some((event) => event.name === 'render:partial')).toBe(true);
});
