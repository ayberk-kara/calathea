---
title: 'Paged Attention: How the KV-Cache Stopped Wasting Memory'
date: 2025-09-12
tags:
  - gpu-inference
  - cuda
  - dev-note
excerpt: >-
  Splitting the KV-cache into fixed-size pages instead of one contiguous
  buffer per sequence — what changed, what it cost, and what it bought us.
project: gpu-inference
lang: en
---

The old KV-cache allocated one contiguous buffer per sequence, sized for
the maximum sequence length. That's simple, but it means a batch of short
chats and one long document all reserve the same amount of memory — most
of it never used.

## The change

Instead, the cache is now split into fixed-size pages handed out by a
small allocator, the same idea as virtual memory paging. A sequence grows
by appending pages as needed instead of pre-reserving its worst case.
Attention reads across page boundaries through an indirection table that
maps logical positions to physical pages.

## What it cost

The indirection adds a small amount of pointer-chasing inside the attention
kernel — each page lookup is an extra load before the actual attention
math. We measured this at roughly 2-3% kernel time on our shapes, which is
noise compared to what it bought us.

## What it bought us

Average resident KV-cache memory per sequence dropped by more than half on
our production traffic mix (lots of short conversational turns, a long
tail of longer documents). That memory went straight back into batch size —
more sequences in flight per GPU, which is where the real throughput win
came from.

Next up: this is the change that shipped in `v2.1.0`, written up separately.
