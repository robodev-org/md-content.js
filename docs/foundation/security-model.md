---
layout: default
title: Security Model
---

## Purpose
Define the security boundaries and default protections of the runtime suite.

## Scope
- Covers: sanitization defaults, input limits, and threat assumptions.
- Does not cover: external service security or deployment infrastructure.

## Table of Contents
{:toc}

## Threats Addressed
- Injection of raw HTML or script content.
- Resource exhaustion from large documents.
- Non-deterministic behavior leaking environment state.

## Invariants
- Sanitization MUST be enabled regardless of caller input.
- HTML MUST be disallowed by default.
- Input size MUST be bounded by maxDocBytes.

## Out of Scope
- Host sandboxing or OS-level enforcement.
- Network isolation or runtime permissions.
