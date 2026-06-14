---
title: 'gpu-inference v2.0.0: Fused Attention and 4.1x Throughput'
date: 2025-10-10
tags:
  - gpu-inference
  - release
excerpt: >-
  The first release with fused attention kernels end to end — 4.1x
  throughput over the stock baseline at the same latency budget.
project: gpu-inference
lang: en
---

`v2.0.0` is the first release where the fused attention kernel covers the
full forward pass — projection, online-softmax, and the weighted sum all
in one kernel, with no intermediate round trips to global memory.

## Highlights

- Fused attention kernel for all supported head dimensions (64, 96, 128)
- 4.1x throughput over the `v1.x` baseline at matched p99 latency
- New Triton-based serving entrypoint, replacing the old hand-rolled
  request loop
- Benchmark harness and results published in `bench/`

## Upgrade notes

This is a breaking release. The kernel ABI changed, so custom model configs
written against `v1.x` need to be regenerated — see `MIGRATING.md` in the
repo. There is no in-place upgrade path for running servers; redeploy from
this tag.

## What's next

The KV-cache is still one contiguous buffer per sequence, sized for the
worst case. That's the next thing to go — see the paged KV-cache dev note
for the design, shipping in `v2.1.0`.
