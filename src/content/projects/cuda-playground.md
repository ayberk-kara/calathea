---
title: cuda-playground
index: '09'
type: OSS
summary: >-
  A growing collection of small, heavily-commented CUDA kernels —
  reductions, prefix sums, tiled matmul, flash-attention-style fused
  kernels — written as teaching material.
stack:
  - CUDA
  - C++
tags:
  - cuda
repo: https://github.com/ayberkkara/cuda-playground
featured: false
lang: en
---

Every kernel in this repo started as "I had to re-derive this from
scratch and couldn't find a clear example." Each one ships with a naive
version, an optimized version, and a comment block walking through why
the optimized version is faster — occupancy, memory coalescing, bank
conflicts, the usual suspects.

It's the repo other projects on this site borrow kernels from before
those kernels get specialized and harder to read.
