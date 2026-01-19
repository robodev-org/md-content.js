---
layout: default
title: Performance Budgets
---

## Purpose
Document performance budgets and regression checks.

## Scope
- Covers: throughput and latency expectations.
- Does not cover: platform-specific tuning.

## Table of Contents
{:toc}

## Budgets
- Micro-benchmark thresholds MUST be loose and non-flaky.
- Performance regressions MUST be detected by tests, not ad hoc runs.

## Tradeoffs
- Determinism can reduce peak throughput; stability is prioritized.
