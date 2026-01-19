import { performance } from 'node:perf_hooks';
import { expect } from 'vitest';
import { FakeMdPipeline } from './fakes/fakePipeline';
import { diagnosticsTest } from './helpers/diagnosticsTest';

diagnosticsTest('performance: micro-bench smoke test', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  const iterations = 200;
  const start = performance.now();

  for (let i = 0; i < iterations; i += 1) {
    pipeline.render('# Title\n\nBody');
  }

  const elapsedMs = performance.now() - start;
  probe.setOutput('perfMs', elapsedMs);

  expect(elapsedMs).toBeLessThan(2000);
});
