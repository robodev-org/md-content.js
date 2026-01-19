---
layout: default
title: Diagnostics First
---

## Purpose
Explain the diagnostics-first requirement and how diagnostics enable deterministic debugging.

## Scope
- Covers: diagnostics principles and required observability.
- Does not cover: specific API shapes (see diagnostics model and API docs).

## Table of Contents
{:toc}

## Requirements
- Every major behavior MUST emit a diagnostics event.
- Every pipeline step MUST record a timeline marker.
- Key state changes MUST record a snapshot.
- Diagnostics output MUST be deterministic for the same input and options.

## Tradeoffs
- Diagnostics add overhead; this is accepted for debuggability and auditability.
- Diagnostics volume is constrained by deterministic, bounded structures.

## Relationship to Testing
- Tests MUST fail if a behavior occurs without diagnostic evidence.
- Golden fixtures MUST verify deterministic diagnostics output.
