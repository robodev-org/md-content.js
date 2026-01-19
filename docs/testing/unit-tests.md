---
layout: default
title: Unit Tests
---

## Purpose
Describe unit test scope and invariants.

## Scope
- Covers: unit test expectations for options, errors, and diagnostics primitives.
- Does not cover: integration or end-to-end tests.

## Table of Contents
{:toc}

## Expectations
- Option defaults MUST be validated with deterministic assertions.
- Error codes MUST be validated for stability.
- Diagnostics primitives MUST be exercised with deterministic inputs.
