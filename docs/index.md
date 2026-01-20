---
title: Documentation
---

# md-content-factory

md-content-factory is a deterministic Markdown processing pipeline with
diagnostics-first testing. These docs focus on how the pipeline is designed,
how to reason about its outputs, and where to go when things go wrong.

## What you can do here

- Understand core ideas like defaults-over-configuration and diagnostics-first
  workflows.
- Learn the architecture and runtime boundaries that keep the pipeline stable.
- Dive into the API surface and how renderer, options, errors, and diagnostics
  are modeled.
- Use operational runbooks for performance, security, and testing.

## Quick paths

- New to the project? Start with [Foundation]({{ site.baseurl }}/foundation/philosophy/) then
  move to the [Architecture overview]({{ site.baseurl }}/architecture/overview/).
- Looking for integration details? Head to the [API reference]({{ site.baseurl }}/api/).
- Chasing a flaky failure? Use [Troubleshooting common failures]({{ site.baseurl }}/troubleshooting/common-failures/).

## Troubleshooting highlights

If you see any of these symptoms, diagnostics are your best guide:

- Raw HTML leaks through when `allowHtml` should be false: check
  `resolvedOptions`, `events` (look for `sanitize:skipped` or
  `sanitize:blocked`), and the `sanitize` snapshots in the diagnostics report.
- Slugs change between runs: inspect `resolvedOptions.stableSlugify`,
  `events` for `slugify`, and slug state snapshots; compare `callTrace` for
  external input changes.
- Heading or link counts drift: inspect `metadata` snapshots and verify the
  `parse` → `metadata` event ordering.
- Timeouts or hangs: read the `timeline` to find the last step, then check
  `events` for `timeout` markers.
- Truncation or missing content: look for `doc:truncated` events and the
  `truncate` snapshots; confirm `resolvedOptions.maxDocBytes`.
- Aborts are confusing: find `abort:signaled` in `events` and the last entry
  in `callTrace`.
- Tests fail without a diagnostics JSON file: ensure `tests/artifacts/` is
  writable and check console output for a report dump.

## Explore by area

- [Foundation]({{ site.baseurl }}/foundation/philosophy/)
- [Architecture]({{ site.baseurl }}/architecture/overview/)
- [API reference]({{ site.baseurl }}/api/)
- [Performance]({{ site.baseurl }}/performance/performance-budgets/)
- [Security]({{ site.baseurl }}/security/threat-model/)
- [Testing]({{ site.baseurl }}/testing/testing-philosophy/)
- [Troubleshooting]({{ site.baseurl }}/troubleshooting/common-failures/)
- [Contributing]({{ site.baseurl }}/contributing/contributing/)
- [Glossary]({{ site.baseurl }}/glossary/)
