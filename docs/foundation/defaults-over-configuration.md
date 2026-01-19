---
layout: default
title: Defaults Over Configuration
---

## Purpose
Document the defaults-first rule and the mandatory defaults in the runtime suite.

## Scope
- Covers: default resolution semantics and invariants.
- Does not cover: user customization beyond documented options.

## Table of Contents
{:toc}

## Defaults-First Rule
- Defaults MUST be applied before any optional configuration.
- Safety defaults MUST override caller-provided values.
- Invalid option values MUST be replaced by defaults.

## Mandatory Defaults
| Option | Default | Invariant |
| --- | --- | --- |
| sanitize | true | MUST remain true |
| allowHtml | false | MUST remain false |
| maxDocBytes | 500000 | MUST be finite and > 0 |
| stableSlugify | true | MUST be boolean |

## Error Conditions
- Invalid options MUST yield a corrected resolved options object.
- If maxDocBytes is not finite or <= 0, it MUST be reset to default.

## Tradeoffs
- Enforced defaults reduce configurability; safety and determinism are prioritized.
