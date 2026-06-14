---
title: PromptLens
index: '03'
type: LLM
summary: >-
  An observability layer for LLM applications: token-level cost tracking,
  prompt diffing, and regression alerts when a model or prompt change
  shifts output quality.
stack:
  - TypeScript
  - React
  - Python
  - ClickHouse
tags:
  - optimization
repo: https://github.com/ayberkkara/promptlens
featured: true
lang: en
---

Teams ship a prompt change, the model swaps a point release, and three
weeks later someone notices the support bot got worse. PromptLens is built
to catch that on day one.

Every request is logged with its full prompt, response, token counts, and
cost, then diffed against a baseline. A small eval suite runs on a sample
of traffic after every prompt or model change, and flags drops in answer
quality, latency, or cost before they reach everyone.

The dashboard is deliberately boring: tables, diffs, and charts. The
interesting part is what it's watching.
