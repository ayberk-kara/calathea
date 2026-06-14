---
title: vectorhash
index: '06'
type: SYSTEMS
summary: >-
  An approximate nearest-neighbor index combining product quantization
  with a graph-based search layer, built to stay memory-flat past a
  billion vectors.
stack:
  - C++
  - Python
  - SIMD
tags:
  - optimization
  - systems-design
repo: https://github.com/ayberkkara/vectorhash
featured: false
lang: en
---

Most ANN libraries are fast until the index stops fitting in memory, then
either fall over or get slow in ways that are hard to predict. vectorhash
is built around the assumption that the index won't fit, from the start.

Vectors are compressed with product quantization before they ever hit the
graph layer, so the resident set stays roughly constant as the collection
grows. The search layer is a small, cache-conscious graph walk with SIMD
distance kernels for the common dimensions (256, 768, 1536).

It trades a little recall for a lot of predictability — the kind of trade
that's easy to defend in a production system and hard to defend in a
benchmark leaderboard.
