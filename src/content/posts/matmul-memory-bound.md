---
title: Making Matmul Memory-Bound Work For You
date: 2025-09-28
tags:
  - cuda
  - optimization
  - deep-dive
excerpt: >-
  Arithmetic intensity, the roofline model, and why tiling a matmul for
  shared-memory reuse is the first lever to pull before anything fancier.
project: gpu-inference
lang: en
---

## Counting the bytes

Take a square multiply of size `N`. It does `2N³` floating-point operations
and, done naively, moves on the order of `N³` words through the cache
hierarchy — every output element re-reads a full row and column. The ratio
of those two numbers, flops per byte, is the **arithmetic intensity**, and
it's the single most useful number you can compute about a kernel.

```
flops = 2*N*N*N
bytes  = N*N*N * 4   // one f32 read per MAC, roughly
intensity = flops / bytes  // ~0.5, independent of N
```

## Reading the roofline

Plot arithmetic intensity on the x-axis and achievable throughput on the
y-axis, and every GPU has a "roofline": a memory-bandwidth-bound slope on
the left, a compute-bound ceiling on the right. A naive matmul sits well
inside the memory-bound region — the math is cheap, the data movement isn't.

That tells you exactly what to fix first, and it isn't the math.

## Tiling for reuse

The fix is to stop streaming whole rows and columns from global memory.
Load a tile of `A` and a tile of `B` into shared memory once, then let
every thread in the block reuse them for a tile of outputs. Reuse is the
whole game: a tile of size `T` cuts global traffic by roughly a factor of
`T`, which shifts the intensity right by the same factor.

```
Asub[local] = A[tileRow(t)];   // one global read…
Bsub[local] = B[tileCol(t)];   // …reused T times from shared memory
barrier();
for k in 0..T:
  acc += Asub[k] * Bsub[k];
```

## So: measure first

None of this is exotic — it's the first chapter of every GPU programming
guide. The point of writing it down is that it's also the first thing
worth checking on *any* slow kernel, before reaching for warp-level
primitives or tensor cores. If a profiler says you're memory-bound, more
flops-per-cycle cleverness won't help until the data movement is fixed.
