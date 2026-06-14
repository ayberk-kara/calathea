---
title: "Inside Livo's Inverted Index"
date: 2025-12-01
tags:
  - livo
  - systems-design
  - dev-note
excerpt: >-
  A tour of the on-disk format, how postings lists are compressed, and
  why we built on top of Tantivy instead of starting from scratch.
project: livo
lang: en
---

## Why not roll our own

The temptation with a search project is always to write the index format
yourself. We didn't, mostly because Tantivy already gets the boring parts
right: segment-based storage, merge policies, and a postings format that's
fast to decode. Building Livo on top of it meant the morphological
tokenizer (see the previous post) could plug in as a custom analyzer
without touching storage at all.

## What's custom

Three things sit on top of stock Tantivy:

- **The analyzer** — the morphological tokenizer that indexes a root plus
  its top-N segmentations
- **A field for normalized stems** — separate from the raw token field, so
  exact-form and stem-based queries can be weighted differently at query
  time
- **The ranking layer** — a BM25 pass over both fields, re-ranked by a
  small learned model trained on logged query/click data

## What this bought us

Segment merges, compaction, and on-disk compression are all stock Tantivy
behavior, which means we inherited years of tuning for free. The custom
layer is small enough that one person can hold the whole thing in their
head — which, for a project with one maintainer, is most of the point.
