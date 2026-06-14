---
title: 'gpu-inference v2.1.0: Paged KV-Cache Lands'
date: 2025-11-02
tags:
  - gpu-inference
  - cuda
  - release
excerpt: >-
  Paged KV-cache allocation, better batching across mixed-length
  sequences, and a handful of bug fixes from running v2.0.0 in production
  for three weeks.
project: gpu-inference
lang: en
---

`v2.1.0` ships the paged KV-cache described in the previous dev note, plus
a round of fixes from three weeks of running `v2.0.0` against real traffic.

## Highlights

- Paged KV-cache: fixed-size pages replace per-sequence contiguous buffers
- Average resident KV-cache memory down ~55% on our traffic mix
- Batch scheduler now accounts for available pages, not worst-case length,
  when admitting new sequences
- Fixed a rare deadlock in the request queue under sustained max-batch load

## Upgrade notes

The serving API is unchanged from `v2.0.0` — this is a drop-in upgrade.
Page size defaults to 16 tokens and is configurable via
`--kv-page-size`, though the default is a good starting point for most
workloads.

## Benchmarks

Updated numbers are in `bench/v2.1.0/`. The headline throughput number
hasn't moved much from `v2.0.0` on uniform-length synthetic batches — the
win shows up on mixed-length real traffic, where batch sizes are now
meaningfully larger.
