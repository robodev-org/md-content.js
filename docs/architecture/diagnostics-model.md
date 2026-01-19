---
layout: default
title: Diagnostics Model
---

## Purpose
Define the diagnostics model and its required structure.

## Scope
- Covers: diagnostics report composition and lifecycle.
- Does not cover: implementation details in code.

## Table of Contents
{:toc}

## Model
- A Diagnostics Session is created for a single render/extract operation.
- The session collects events, timeline markers, and snapshots.
- The final report is attached to results when diagnostics are enabled.

## Invariants
- Event ordering MUST reflect pipeline order.
- Timeline timestamps MUST be monotonic and deterministic.
- Snapshots MUST be bounded in size and deterministic.
