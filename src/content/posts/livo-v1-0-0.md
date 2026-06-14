---
title: 'Livo v1.0.0: Turkish-Aware Search, Shipped'
date: 2025-12-15
tags:
  - livo
  - release
excerpt: >-
  The first tagged release of Livo — morphology-aware tokenization, a
  ranking pipeline tuned on real query logs, and a small hosted demo.
project: livo
lang: en
---

`v1.0.0` is the first tagged release of Livo: a search engine that
understands Turkish morphology end to end, from indexing through query
parsing to ranking.

## Highlights

- Morphological tokenizer with top-N segmentation for ambiguous suffix
  chains
- Custom Tantivy field layout for raw tokens and normalized stems
- BM25 + learned re-ranking, tuned on real (anonymized) query logs
- Evaluation suite published alongside the release, built on the
  Relevance Lab harness

## What's not in this release

Multi-language support is intentionally out of scope — Livo is Turkish-first
by design, not a general-purpose engine with a Turkish mode. Query
autocomplete and typo tolerance are on the roadmap for `v1.1.0`.
