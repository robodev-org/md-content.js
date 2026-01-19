---
layout: default
title: API Index
---

## Purpose
Provide a stable index of public API surfaces.

## Scope
- Covers: exported public APIs and their contract-level docs.
- Does not cover: internal utilities or test-only helpers.

## Table of Contents
{:toc}

## Public Surfaces
- Options resolution: `DEFAULT_MD_FACTORY_OPTIONS`, `resolveMdFactoryOptions`
- Diagnostics: `createDiagnosticsSession`, `recordTimeline`, `recordEvent`, `recordSnapshot`, `finalizeDiagnosticsReport`
- Errors: `MdFactoryError`, `MdFactoryErrorCode`
- Render contract: `MdFactory.render`, `MdFactory.extractMetadata`

## Invariants
- Public surfaces MUST remain stable or be versioned.
- Defaults MUST be documented in every API that accepts options.
