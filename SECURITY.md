# Security Policy

## Threat model summary
- Untrusted Markdown input may attempt HTML/script injection.
- Determinism failures can leak environment-dependent behavior.
- Excessive input size can cause resource exhaustion.
- Option overrides must not bypass sanitization defaults.

## Reporting a vulnerability
- Prefer a private report to the maintainers.
- If no private channel is available, open a GitHub issue with minimal details and request a private follow-up.
- Include reproduction steps and expected vs. actual behavior.

## Supported versions
- The latest commit on the default branch is supported.
