---
layout: default
title: Runtime Boundaries
---

## Purpose
Define runtime boundaries, including what is executed and what is prohibited.

## Scope
- Covers: boundaries between input, processing, and output.
- Does not cover: external integrations or hosting environments.

## Table of Contents
{:toc}

## Boundaries
- Input markdown is treated as untrusted.
- Sanitization MUST occur before rendering.
- No network calls are performed by default.
- The pipeline does not execute untrusted scripts.

## Tradeoffs
- Prohibiting execution reduces flexibility but ensures safety and determinism.
