import { expect } from 'vitest';
import { FakeMdPipeline } from './fakes/fakePipeline';
import { diagnosticsTest } from './helpers/diagnosticsTest';

const sampleMarkdown = `# Title\n\nHello world with a [link](https://example.com).`;

function assertBehaviorObserved(report: ReturnType<typeof FakeMdPipeline.prototype['render']>, probeReport: any, step: string) {
  const hasEvent = probeReport.events.some((event: any) => event.name === step);
  const hasTimeline = probeReport.timeline.some((entry: any) => entry.name === step);
  const hasSnapshot = probeReport.snapshots.some((entry: any) => entry.name === step);

  expect(hasEvent).toBe(true);
  expect(hasTimeline).toBe(true);
  expect(hasSnapshot).toBe(true);

  // Ensure behavior actually happened.
  expect(report).toBeTruthy();
}

diagnosticsTest('behavior coverage emits diagnostics for each pipeline stage', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  const result = pipeline.render(sampleMarkdown);
  const report = probe.getReport();

  ['parse', 'sanitize', 'slugify', 'metadata', 'render'].forEach((step) => {
    assertBehaviorObserved(result, report, step);
  });

  expect(report.callTrace.some((call: any) => call.name === 'render')).toBe(true);
});
