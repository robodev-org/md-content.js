---
layout: default
title: Options API
---

## Purpose
Define option defaults and resolution behavior.

## Scope
- Covers: `DEFAULT_MD_FACTORY_OPTIONS` and `resolveMdFactoryOptions`.
- Does not cover: rendering behavior or diagnostics output.

## Table of Contents
{:toc}

## DEFAULT_MD_FACTORY_OPTIONS
### Defaults
| Field | Type | Default | Invariant |
| --- | --- | --- | --- |
| sanitize | boolean | true | MUST remain true |
| allowHtml | boolean | false | MUST remain false |
| maxDocBytes | number | 500000 | MUST be finite and > 0 |
| stableSlugify | boolean | true | MUST be boolean |
| slugPrefix | string | undefined | MAY be empty or undefined |
| diagnostics | boolean | false | MAY be toggled |
| logger | Logger | undefined | MAY be undefined |

## resolveMdFactoryOptions(options?)
### Behavior
- Merges provided options with defaults.
- Enforces `sanitize = true` and `allowHtml = false`.
- Resets `maxDocBytes` to default if invalid.
- Coerces `stableSlugify` to a boolean.

### Error Conditions
- No error is thrown for invalid options; the values are corrected.

### Invariants
- Returned object MUST include all default fields.
- Safety defaults MUST override caller-provided values.
