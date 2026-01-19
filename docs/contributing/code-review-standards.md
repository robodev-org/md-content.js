---
layout: default
title: Code Review Standards
---

## Purpose
Define review criteria for changes to the runtime and documentation.

## Scope
- Covers: review criteria for correctness, safety, and determinism.
- Does not cover: team-specific processes.

## Table of Contents
{:toc}

## Review Criteria
- Defaults and safety invariants MUST be preserved.
- Diagnostics MUST be updated alongside behavior changes.
- Error codes MUST remain stable.
- Tests MUST cover new behaviors and failure modes.
