---
layout: default
title: Diagnostics API
---

## Purpose
Define the DiagnosticsReport schema and related APIs.

## Scope
- Covers: `createDiagnosticsSession`, `recordTimeline`, `recordEvent`, `recordSnapshot`, and `finalizeDiagnosticsReport`.
- Does not cover: logging sinks or external storage.

## Table of Contents
{:toc}

## DiagnosticsReport JSON Schema
```
{
  "repo": "string",
  "version": "string",
  "traceId": "string",
  "env": {
    "userAgent": "string?",
    "platform": "string?"
  },
  "options": { "<string>": "unknown" },
  "timeline": [
    { "t": "number", "name": "string", "meta": { "<string>": "unknown" }? }
  ],
  "events": [
    { "level": "debug|info|warn|error", "name": "string", "meta": { "<string>": "unknown" }? }
  ],
  "artifacts": {
    "notes": ["string"]?,
    "samples": [ { "name": "string", "data": { "<string>": "unknown" } } ]?
  },
  "errors": [
    { "code": "string", "message": "string", "cause": "string"? }
  ]?
}
```

## API Contracts
### createDiagnosticsSession(params)
- MUST create a session with deterministic `traceId` unless a caller provides one.
- MUST initialize empty `timeline` and `events` arrays.

### recordTimeline(session, name, meta?)
- MUST append a monotonically increasing timeline entry.
- MUST be a no-op if session is undefined.

### recordEvent(session, level, name, meta?)
- MUST append a diagnostics event.
- MAY forward events to a logger if provided.
- MUST be a no-op if session is undefined.

### recordSnapshot(session, name, data)
- MUST append a snapshot to `artifacts.samples`.
- MUST be a no-op if session is undefined.

### finalizeDiagnosticsReport(session)
- MUST return the report or undefined if session is undefined.

## Examples
### Successful Run
```
{
  "repo": "md-content-factory",
  "version": "0.0.0",
  "traceId": "trace-1",
  "env": {},
  "options": { "sanitize": true, "allowHtml": false, "maxDocBytes": 500000, "stableSlugify": true },
  "timeline": [
    { "t": 1, "name": "parse" },
    { "t": 2, "name": "sanitize" }
  ],
  "events": [
    { "level": "info", "name": "parse" },
    { "level": "info", "name": "sanitize" }
  ],
  "artifacts": { "samples": [ { "name": "parse", "data": { "runCount": 1 } } ] }
}
```

### Timeout
```
{
  "repo": "md-content-factory",
  "version": "0.0.0",
  "traceId": "trace-timeout",
  "env": {},
  "options": { "sanitize": true, "allowHtml": false, "maxDocBytes": 500000, "stableSlugify": true },
  "timeline": [ { "t": 1, "name": "parse" } ],
  "events": [
    { "level": "info", "name": "parse" },
    { "level": "error", "name": "timeout", "meta": { "step": "sanitize" } }
  ],
  "artifacts": {}
}
```

### Truncated Output
```
{
  "repo": "md-content-factory",
  "version": "0.0.0",
  "traceId": "trace-truncate",
  "env": {},
  "options": { "sanitize": true, "allowHtml": false, "maxDocBytes": 10, "stableSlugify": true },
  "timeline": [ { "t": 1, "name": "parse" } ],
  "events": [
    { "level": "warn", "name": "doc:truncated", "meta": { "maxBytes": 10 } }
  ],
  "artifacts": {
    "samples": [ { "name": "truncate", "data": { "originalBytes": 50, "maxBytes": 10 } } ]
  }
}
```
