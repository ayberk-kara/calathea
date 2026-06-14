---
title: Relevance Lab
index: '08'
type: SEARCH
summary: >-
  An offline evaluation harness for search ranking changes — judged query
  sets, NDCG and MRR scoring, and side-by-side diffing of result lists
  before a model ships to Livo.
stack:
  - Python
  - DuckDB
  - Streamlit
tags:
  - livo
repo: https://github.com/ayberkkara/relevance-lab
featured: false
lang: en
---

Every ranking change to Livo runs through Relevance Lab before it ships.
A frozen set of judged queries — real queries with hand-labeled relevant
documents — is scored against the current production ranker and the
candidate, producing NDCG and MRR deltas per query, not just an aggregate
number.

The Streamlit front end is mostly a side-by-side result list diff: pick a
query, see what moved, and click into why. It's saved more than one
ranking change that looked great on the aggregate metric but quietly broke
a handful of high-traffic queries.
