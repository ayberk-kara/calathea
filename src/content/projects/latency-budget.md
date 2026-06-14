---
title: latency-budget
index: '10'
type: TOOLS
summary: >-
  A small dashboard that turns a service's p50/p95/p99 latency targets
  into a per-dependency budget, and flags which calls in a trace blew
  theirs.
stack:
  - TypeScript
  - Next.js
  - Prometheus
tags: []
repo: https://github.com/ayberkkara/latency-budget
featured: false
lang: en
---

"Keep p99 under 300ms" is easy to say and hard to enforce once a request
fans out into a dozen downstream calls. latency-budget takes that target,
splits it across the dependencies in a request's trace by their historical
share, and tracks each one against its slice.

When a deploy pushes a dependency over its slice, the dashboard flags it
specifically — not just "p99 went up," but which call grew and by how
much relative to its budget.
