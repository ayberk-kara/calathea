---
title: tokencost
index: '05'
type: TOOLS
summary: >-
  A tiny CLI and library that estimates the dollar cost of a prompt across
  OpenAI, Anthropic, and open-weight model pricing before you send the
  request.
stack:
  - Python
  - Typer
tags: []
repo: https://github.com/ayberkkara/tokencost
featured: false
lang: en
---

A one-function library and matching CLI: pipe in a prompt, get back a
token count per tokenizer and an estimated cost across a handful of
providers and price tiers.

The pricing table is just a versioned JSON file, so updating it for a new
model release is a one-line PR rather than a code change. Useful for
sanity-checking a batch job's cost before kicking it off, or for adding a
"this will cost about $X" line to a CLI tool.
