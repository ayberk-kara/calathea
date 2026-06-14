---
title: GPU-Optimized Inference Pipeline
index: '01'
type: SYSTEMS
summary: >-
  A drop-in serving runtime for transformer inference. Fused attention,
  paged KV-cache, and hand-written CUDA kernels push throughput to 4.1x
  the stock baseline at the same latency budget.
stack:
  - CUDA
  - C++
  - Python
  - Triton
  - TensorRT
tags:
  - gpu-inference
  - cuda
  - optimization
  - systems-design
repo: https://github.com/ayberkkara/gpu-inference
featured: true
lang: en
---

The stock runtime spent most of its time moving data, not computing it. A
profiler trace pointed straight at attention: the projection, the softmax,
and the weighted sum each round-tripped activations through global memory,
and the KV-cache reallocated on every step.

Fusing those three passes into a single kernel keeps the working set in
shared memory and registers, using the streaming-softmax trick specialized
for our head dimensions. Splitting the KV-cache into fixed-size pages let
sequences grow without copying and kept batching efficient across requests
with wildly different lengths.

The result is a serving runtime that's a near drop-in replacement for the
stock pipeline, at 4.1x the throughput and the same latency budget.
