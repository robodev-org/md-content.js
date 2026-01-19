---
layout: default
title: Design Principles
---

## Purpose
List design principles that govern behavior, APIs, and documentation.

## Scope
- Covers: system invariants and prioritized design principles.
- Does not cover: project history or roadmap.

## Table of Contents
{:toc}

## Principles
- Defaults-first: safe defaults are enforced regardless of user overrides.
- Determinism-first: output MUST be stable across runs.
- Diagnostics-first: behavior MUST be observable through diagnostics.
- Minimal dependencies: additions MUST be justified by operational value.
- Explicit contracts: undefined behavior MUST be eliminated.

## Definitions
- Defaults-first: required defaults are applied before any optional behavior.
- Diagnostics Session: the lifecycle of a single diagnostics report.
- Runner: a component that executes the pipeline.
- Strategy: a deterministic policy used within a Runner.

## Tradeoffs
- Tight contracts can slow experimentation; contract stability is prioritized.
