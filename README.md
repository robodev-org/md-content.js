# md-content-factory

Deterministic Markdown processing pipeline with diagnostics-first testing.

## Troubleshooting

- Output contains raw HTML when `allowHtml` should be false: inspect `resolvedOptions`, `events` (look for `sanitize:skipped` or `sanitize:blocked`), and `snapshots` around the `sanitize` step in the DiagnosticsReport.
- Slugs change between runs: inspect `resolvedOptions.stableSlugify`, `events` for `slugify`, and `snapshots` of slug state; compare `callTrace` to ensure no external input changes.
- Metadata drift (headings/links counts change): inspect `snapshots` tagged `metadata`, and compare `events` ordering (`parse` → `metadata`), then verify the parsed headings snapshot.
- Timeouts or hangs: inspect `timeline` for the last recorded step, and check `events` for `timeout` markers.
- Truncation or missing content: inspect `events` for `doc:truncated` and `snapshots` named `truncate`, then verify `resolvedOptions.maxDocBytes`.
- Abort/cancellation confusion: inspect `events` for `abort:signaled`, and the last `callTrace` entry to see where the abort happened.
- Tests fail without diagnostics JSON: ensure `tests/artifacts/` is writable and check console output for the report dump.
