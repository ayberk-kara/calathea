---
title: rag-pipeline-kit
index: '11'
type: LLM
summary: >-
  A starter kit for retrieval-augmented generation that ships with
  chunking strategies, a hybrid sparse+dense retriever, and
  citation-checking so answers don't cite text that isn't there.
stack:
  - Python
  - LangChain
  - Postgres
  - pgvector
tags:
  - optimization
repo: https://github.com/ayberkkara/rag-pipeline-kit
featured: true
lang: en
---

Most RAG starter kits stop at "retrieve some chunks and stuff them in the
prompt." rag-pipeline-kit treats that as the easy 80% and spends its effort
on the rest.

It ships a few chunking strategies (fixed-size, sentence-aware, and
structure-aware for Markdown/HTML), a hybrid retriever that blends a
sparse BM25 pass with dense embeddings, and a citation-checking step that
verifies every cited chunk was actually retrieved for that query —
catching the specific failure mode where a model cites something
plausible-sounding that was never in context.

It's meant to be forked and gutted, not run as-is.
