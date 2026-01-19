---
layout: default
title: Mock Tests
---

## Purpose
Define expectations for mocks and fakes used in tests.

## Scope
- Covers: fake behavior coverage, timeouts, truncation, and aborts.
- Does not cover: external service integration tests.

## Table of Contents
{:toc}

## Requirements
- No network or external runtime downloads.
- Fakes MUST simulate timing, errors, partial outputs, and cancellation.
- Fakes MUST emit diagnostics consistent with real behavior.
