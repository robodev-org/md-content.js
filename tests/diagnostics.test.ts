import { expect } from 'vitest';
import { FakeMdPipeline } from './fakes/fakePipeline';
import { diagnosticsTest } from './helpers/diagnosticsTest';

diagnosticsTest('nondeterminism: stable slugify yields stable output', (probe) => {
  const pipeline = new FakeMdPipeline({ stableSlugify: true }, probe);
  const first = pipeline.render('# Title');
  const second = pipeline.render('# Title');

  expect(first.html).toEqual(second.html);
});

diagnosticsTest('nondeterminism: unstable slugify changes output', (probe) => {
  const pipeline = new FakeMdPipeline({ stableSlugify: false }, probe);
  const first = pipeline.render('# Title');
  const second = pipeline.render('# Title');

  expect(first.html).not.toEqual(second.html);
});

diagnosticsTest('sanitization: raw HTML is removed when allowHtml is false', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  const result = pipeline.render('# Title\n\n<script>alert(1)</script>');

  expect(result.html.includes('<script>')).toBe(false);
});

diagnosticsTest('metadata drift: headings and links match expectations', (probe) => {
  const pipeline = new FakeMdPipeline({}, probe);
  const result = pipeline.render('# Title\n\nSee [doc](https://example.com).');

  expect(result.metadata.headings).toEqual([
    { depth: 1, text: 'Title', slug: 'title' }
  ]);
  expect(result.metadata.links).toEqual([
    { href: 'https://example.com', text: 'doc' }
  ]);
  expect(result.metadata.wordCount).toBeGreaterThan(0);
});
