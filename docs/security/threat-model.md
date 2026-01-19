---
layout: default
title: Threat Model
---

## Purpose
Provide a concise threat model for the runtime suite.

## Scope
- Covers: untrusted input, sanitization, and determinism risks.
- Does not cover: platform-specific security controls.

## Table of Contents
{:toc}

## Assets
- Output HTML integrity.
- Deterministic behavior guarantees.
- Diagnostics accuracy.

## Threats
- HTML/script injection via Markdown input.
- Resource exhaustion with oversized documents.
- Nondeterministic output that leaks environment state.

## Mitigations
- Enforced sanitization and HTML disablement.
- maxDocBytes enforcement.
- Stable slugify behavior.
