---
layout: default
title: Reading Diagnostics
---

## Purpose
Explain how to read a DiagnosticsReport to debug failures without source access.

## Scope
- Covers: interpreting timeline, events, snapshots, and options.
- Does not cover: diagnosis of external systems.

## Table of Contents
{:toc}

## Reading Order
1) Options: confirm defaults and overrides.
2) Timeline: confirm stage order and last completed step.
3) Events: check for errors or warnings.
4) Snapshots: inspect state at key stages.

## Key Fields
- `options`: resolved defaults and overrides.
- `timeline`: ordered stage progression.
- `events`: warnings and error markers.
- `artifacts.samples`: state snapshots.
- `errors`: stable error codes and messages.
