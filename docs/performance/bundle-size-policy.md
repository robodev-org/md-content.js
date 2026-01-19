---
layout: default
title: Bundle Size Policy
---

## Purpose
Define bundle size expectations for production builds.

## Scope
- Covers: dependency constraints and bundle size policy.
- Does not cover: build system choice.

## Table of Contents
{:toc}

## Policy
- Production bundle gzip size SHOULD be ≤ 18 KB.
- New dependencies MUST be justified and measured.
- Tree-shaking MUST be preserved.
