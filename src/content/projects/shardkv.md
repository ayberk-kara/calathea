---
title: ShardKV
index: '04'
type: OSS
summary: >-
  A Raft-backed, horizontally-sharded key-value store written for a
  distributed systems course and since hardened with snapshotting,
  dynamic resharding, and a Go client library.
stack:
  - Go
  - gRPC
  - Raft
tags:
  - systems-design
repo: https://github.com/ayberkkara/shardkv
featured: false
lang: en
---

ShardKV started as coursework: implement a replicated key-value store on
top of Raft, then split it into shards that can be rebalanced without
downtime. It has since grown past the assignment.

Each shard is its own Raft group with periodic snapshotting so logs don't
grow without bound. A separate shard-controller group owns the assignment
of shards to groups and drives migrations when that assignment changes,
moving only the keys that actually need to move.

The client library retries against the controller's current configuration
automatically, so a rebalance in progress is invisible to callers beyond a
brief latency blip.
