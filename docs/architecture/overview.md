---
layout: default
title: Architecture Overview
---

## Purpose
Provide a structural overview of the Markdown processing pipeline and its boundaries.

## Scope
- Covers: core pipeline stages and data flow.
- Does not cover: implementation details or optimization strategies.

## Table of Contents
{:toc}

## Pipeline Stages
1) Parser
2) Sanitizer
3) Slug/Anchor Generator
4) Metadata Extractor
5) Renderer

## Data Flow
- Input markdown enters the Parser.
- Sanitizer removes disallowed content and enforces HTML policy.
- Slug/Anchor Generator produces stable slugs for headings.
- Metadata Extractor produces headings, links, and word counts.
- Renderer produces final HTML output.

## Invariants
- No raw HTML is emitted when allowHtml is false.
- Diagnostics are emitted at every stage.
