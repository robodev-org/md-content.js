import { expect } from 'vitest';
import { FakeMdPipeline } from './fakes/fakePipeline';
import { diagnosticsTest } from './helpers/diagnosticsTest';

diagnosticsTest('resources: dispose releases resources and changes state', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  pipeline.render('# Title');
  pipeline.dispose();

  const state = pipeline.getState();
  const report = probe.getReport();

  expect(state.disposed).toBe(true);
  expect(report.events.some((event) => event.name === 'dispose')).toBe(true);
  expect(report.snapshots.some((snapshot) => snapshot.name === 'dispose')).toBe(true);
});

diagnosticsTest('resources: reset clears run state', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  pipeline.render('# Title');
  pipeline.reset();

  const state = pipeline.getState();
  const report = probe.getReport();

  expect(state.runCount).toBe(0);
  expect(report.events.some((event) => event.name === 'reset')).toBe(true);
  expect(report.snapshots.some((snapshot) => snapshot.name === 'reset')).toBe(true);
});
