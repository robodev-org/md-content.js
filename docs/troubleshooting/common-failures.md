---
layout: default
title: Common Failures
---

## Purpose
Provide a concise map of common failures and where to diagnose them.

## Scope
- Covers: frequent failure modes and diagnostic signals.
- Does not cover: deep root-cause analysis.

## Table of Contents
{:toc}

## Failure Map
| Symptom | Likely Cause | Diagnostics Fields |
| --- | --- | --- |
| Raw HTML in output | Sanitization disabled | `events`, `options` |
| Missing headings | Parse or slug failure | `timeline`, `snapshots` |
| Timeout | Pipeline step stuck | `events`, `timeline` |
| Truncated output | maxDocBytes reached | `events`, `snapshots` |

## Default Checks
- Confirm `sanitize = true` and `allowHtml = false`.
- Confirm `maxDocBytes` is valid.
