---
title: 'Tokenizing Turkish: The Agglutination Problem'
date: 2025-11-20
tags:
  - livo
  - systems-design
  - deep-dive
excerpt: >-
  Turkish words carry their grammar as suffixes, which breaks naive
  whitespace and BPE tokenization alike. Here's how Livo's tokenizer
  handles it.
project: livo
lang: en
---

## The problem

Turkish is agglutinative: grammatical information — case, possession,
tense, negation — is expressed as a chain of suffixes attached to a root,
governed by vowel harmony. A single root can legally produce hundreds of
surface forms.

`kitap` (book) → `kitaplarımdan` (from my books) is one root plus four
suffixes. A whitespace tokenizer sees these as two unrelated tokens. A
subword (BPE) tokenizer will usually split `kitaplarımdan` into pieces, but
which pieces depends on what happened to be frequent in its training
corpus — not on Turkish morphology. The same root can end up represented by
entirely different subword sequences depending on its suffixes.

For search, that means a query for `kitap` and a document containing
`kitaplarımdan` share no tokens, even though one is obviously about the
other.

## What Livo does instead

Indexing runs a morphological analyzer first, which splits each word into
its root and suffix chain using a finite-state model of Turkish
morphology. Both the root and a normalized stem are indexed, so
`kitaplarımdan` indexes under `kitap` (among other forms).

Queries go through the same analyzer, so `kitaplarım` and `kitaba` both
resolve back to `kitap` at query time. The inverted index itself doesn't
need to know any of this — it's just indexing more tokens per document,
chosen more carefully.

## What this doesn't fix

Genuinely ambiguous segmentations (a handful of suffix chains parse more
than one way) are resolved by keeping the top-N analyses and indexing all
of them, weighted by frequency. It's a small index-size cost for a
real recall win, and it's the kind of trade-off that's easy to tune once
you can measure it — which is what Relevance Lab is for.
