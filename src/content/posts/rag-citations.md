---
title: Notes on a RAG Pipeline That Doesn't Hallucinate Citations
date: 2026-01-08
tags:
  - optimization
  - dev-note
excerpt: >-
  A short post-mortem on the citation-checking step in rag-pipeline-kit:
  how it catches an answer that cites a chunk it never retrieved.
project: rag-pipeline-kit
lang: en
---

A recurring failure mode in RAG demos: the model answers correctly, cites
a source, and the source is plausible — but it's not one of the chunks
that were actually retrieved for that query. It read as confident and
sourced, and it was neither.

## The check

After generation, `rag-pipeline-kit` extracts every citation marker from
the response and verifies that the referenced chunk ID was part of the
retrieved set passed into that generation call. If a citation doesn't
match, the response is flagged before it reaches the user.

This is deliberately dumb — it's a set-membership check, not another model
call. It can't tell you whether a *correct* citation actually supports the
claim next to it, only whether the model is citing something it was given.
That's a smaller guarantee, but it's one you can check for free on every
request.

## What it caught

In testing against a held-out question set, roughly 6% of responses with
at least one citation failed this check — almost always on questions where
the retrieved chunks didn't actually contain the answer, and the model
filled the gap from its own knowledge while keeping the citation format.
That's a useful signal in itself: a citation-check failure rate is a decent
proxy for "the retriever didn't find the right thing," even before looking
at answer quality.
