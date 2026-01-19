---
layout: default
title: Worker Model
---

## Purpose
Describe the worker model and concurrency expectations.

## Scope
- Covers: how work is sequenced and isolated.
- Does not cover: thread pools or runtime-specific execution details.

## Table of Contents
{:toc}

## Model
- A Runner executes a deterministic Strategy.
- Each render call is a single Diagnostics Session.
- Ordering of pipeline stages is fixed.

## Invariants
- No parallel mutation of shared state during a session.
- Diagnostics emission order matches stage order.
