---
layout: default
title: Render API
---

## Purpose
Define the render and metadata extraction contract for the Markdown pipeline.

## Scope
- Covers: `MdFactory.render` and `MdFactory.extractMetadata`.
- Does not cover: underlying parsing or sanitization implementations.

## Table of Contents
{:toc}

## MdFactory.render(markdown, options?)
### Defaults
- Options are resolved using `resolveMdFactoryOptions`.
- `sanitize = true`, `allowHtml = false`, `maxDocBytes = 500000`, `stableSlugify = true`.

### Returns
- `RenderResult` with `html`, `metadata`, and optional `diagnostics`.

### Invariants
- Output MUST be deterministic for the same input and options.
- Output MUST be sanitized when `allowHtml` is false.
- Diagnostics MUST be attached when enabled.

### Error Conditions
- Invalid input MAY throw `MdFactoryError` with a stable code.
- Rendering failures MUST use `MD_FACTORY_RENDER_FAILED`.

## MdFactory.extractMetadata(markdown, options?)
### Defaults
- Same defaults as `render`.

### Returns
- `{ metadata, diagnostics? }`.

### Invariants
- Metadata MUST include headings, links, and wordCount.
- Diagnostics MUST be attached when enabled.

### Error Conditions
- Failures MUST use `MD_FACTORY_METADATA_FAILED`.
