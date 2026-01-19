---
layout: default
title: Testing Philosophy
---

## Purpose
Define how tests validate determinism, safety, and diagnostics coverage.

## Scope
- Covers: test intent and required coverage.
- Does not cover: individual test cases.

## Table of Contents
{:toc}

## Principles
- Diagnostics-first: tests MUST fail when behaviors are not observable.
- Golden fixtures: diagnostics output MUST be deterministic.
- Negative paths: failures MUST be predictable and recorded.

## Required Coverage
- Defaults resolution
- Behavior coverage for each pipeline stage
- Negative conditions (timeout, truncation, invalid input, abort)
- Ordering and lifecycle invariants
