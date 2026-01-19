---
layout: default
title: RLS and Boundaries
---

## Purpose
Define database boundary expectations for repositories that include database access.

## Scope
- Covers: row-level security expectations and boundary contracts.
- Does not cover: database schema design.

## Table of Contents
{:toc}

## RLS Expectations
- RLS MUST be enabled when data is exposed to multi-tenant environments.
- Authorization MUST be enforced at the data boundary.

## Boundary Rules
- Application code MUST NOT bypass RLS policies.
- Diagnostics MUST NOT leak sensitive row data.
