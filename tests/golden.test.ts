import { expect } from 'vitest';
import { FakeMdPipeline } from './fakes/fakePipeline';
import { diagnosticsTest } from './helpers/diagnosticsTest';
import { loadFixture, toStableJson } from './helpers/golden';

const sampleMarkdown = `# Title\n\nHello world with a [link](https://example.com).`;

diagnosticsTest(
  'golden: deterministic diagnostics report',
  (probe) => {
    const pipeline = new FakeMdPipeline({}, probe);
    pipeline.render(sampleMarkdown);

    const report = probe.getReport();
    const golden = loadFixture('diagnostics-golden.json');

    expect(toStableJson(report)).toEqual(toStableJson(golden));
  },
  { traceId: 'trace-golden' }
);
