---
title: 'Livo: Search That Understands Turkish'
index: '02'
type: SEARCH
summary: >-
  A semantic search engine built around Turkish morphology — agglutinative
  tokenization, a custom inverted index, and a ranking pipeline tuned for
  short, informal queries.
stack:
  - Rust
  - Tantivy
  - Python
  - FastAPI
  - PostgreSQL
tags:
  - livo
  - systems-design
repo: https://github.com/ayberkkara/livo
featured: true
lang: en
---

Most off-the-shelf tokenizers treat Turkish like English with extra dots.
That falls apart fast: Turkish words carry tense, case, and possession as
chained suffixes, so the same root can surface in dozens of surface forms
a whitespace or BPE tokenizer will never connect.

Livo runs a morphological analyzer ahead of indexing, so a query for
"kitaplarımdan" can match documents containing "kitap". The index itself is
built on Tantivy, with a custom postings format and a ranking layer tuned
on real, informal query logs rather than well-formed test queries.

The goal isn't to beat a general-purpose search engine at everything — it's
to be unreasonably good at the one language most of them get wrong.
