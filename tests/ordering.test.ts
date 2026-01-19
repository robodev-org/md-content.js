import { expect } from 'vitest';
import { FakeMdPipeline } from './fakes/fakePipeline';
import { diagnosticsTest } from './helpers/diagnosticsTest';

diagnosticsTest('ordering: pipeline lifecycle is ordered', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  pipeline.render('# Title\n\nBody');

  const report = probe.getReport();
  const timelineOrder = report.timeline.map((entry) => entry.name);
  const expected = ['parse', 'sanitize', 'slugify', 'metadata', 'render'];

  expect(timelineOrder).toEqual(expected);

  const eventOrder = report.events
    .filter((event) => expected.includes(event.name))
    .map((event) => event.name);

  expect(eventOrder).toEqual(expected);
});
