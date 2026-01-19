# Contributing

Thanks for helping improve md-content-factory. Keep changes minimal, deterministic, and security-first.

## Dev setup
- Install dependencies: `npm install`
- Run tests: `npm test`
- Run typecheck: `npm run typecheck`

## Test philosophy (diagnostics-first)
- Tests must explain failures with diagnostics output.
- Every major behavior must emit events, timeline markers, and snapshots.
- Negative paths must be covered (timeouts, truncation, abort, invalid input, disposed usage).
- Golden fixtures are required for deterministic reports.

## Pull request checklist
- Defaults updated and verified (options resolution tests).
- Diagnostics coverage added or updated for new behaviors.
- Golden fixtures updated if outputs changed.
- Error codes remain stable or are explicitly documented.
- Bundle impact reviewed (no new heavy deps).
- Security/sanitization behavior verified.
