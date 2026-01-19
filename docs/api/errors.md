---
layout: default
title: Errors API
---

## Purpose
Define error types and stable error codes.

## Scope
- Covers: `MdFactoryError` and `MdFactoryErrorCode`.
- Does not cover: stack traces or environment-specific formatting.

## Table of Contents
{:toc}

## MdFactoryError
### Fields
| Field | Type | Notes |
| --- | --- | --- |
| name | string | Always `MdFactoryError` |
| code | MdFactoryErrorCode | Stable error code |
| message | string | Human-readable description |
| cause | string? | Optional cause string |

## MdFactoryErrorCode
| Code | Meaning | Default Handling |
| --- | --- | --- |
| MD_FACTORY_MAX_DOC_BYTES | Input exceeded maxDocBytes | Abort with diagnostics |
| MD_FACTORY_INVALID_OPTIONS | Options were invalid | Resolve to defaults |
| MD_FACTORY_RENDER_FAILED | Rendering failed | Return diagnostics |
| MD_FACTORY_METADATA_FAILED | Metadata extraction failed | Return diagnostics |

## Invariants
- Error codes MUST remain stable across releases.
- New codes MUST be documented before use.
