---
layout: default
title: Error Model
---

## Purpose
Define error codes, error propagation rules, and stability guarantees.

## Scope
- Covers: error codes and invariants.
- Does not cover: stack traces or runtime-specific formatting.

## Table of Contents
{:toc}

## Error Codes
| Code | Meaning | Stable |
| --- | --- | --- |
| MD_FACTORY_MAX_DOC_BYTES | Input exceeded maxDocBytes | MUST remain stable |
| MD_FACTORY_INVALID_OPTIONS | Options were invalid | MUST remain stable |
| MD_FACTORY_RENDER_FAILED | Rendering failed | MUST remain stable |
| MD_FACTORY_METADATA_FAILED | Metadata extraction failed | MUST remain stable |

## Rules
- Errors MUST include a stable code.
- Errors MAY include a cause string.
- Errors MUST NOT expose sensitive input.
