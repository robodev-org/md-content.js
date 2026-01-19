---
layout: default
title: Diagnostics Harness
---

## Purpose
Describe the diagnostics test harness and expected diagnostics artifacts.

## Scope
- Covers: diagnostics probes, reports, and failure artifacts.
- Does not cover: production diagnostics API details.

## Table of Contents
{:toc}

## Harness Contracts
- Every diagnostics test MUST record resolved options.
- Every diagnostics test MUST capture timeline, events, snapshots, and call trace.
- On failure, a DiagnosticsReport JSON MUST be printed and saved to artifacts.

## Artifacts
- Location: `tests/artifacts/<testname>-<traceId>.json`
- Content: full DiagnosticsReport for the failing test.
