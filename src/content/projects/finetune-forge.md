---
title: finetune-forge
index: '07'
type: LLM
summary: >-
  A LoRA and QLoRA fine-tuning pipeline with dataset versioning, automatic
  eval harness runs, and one-command export to GGUF for local serving.
stack:
  - Python
  - PyTorch
  - Hugging Face
tags: []
repo: https://github.com/ayberkkara/finetune-forge
featured: false
lang: en
---

finetune-forge wraps the parts of a fine-tuning run that are easy to get
wrong: which dataset version produced this checkpoint, which eval suite it
passed, and whether it's actually better than the checkpoint it's
replacing.

A run is defined by a small YAML config — base model, dataset, LoRA rank,
and the eval suite to run afterward. Every run is tagged with a content
hash of its dataset so two runs that look identical but trained on
slightly different data are never confused for each other. Passing
checkpoints can be exported straight to GGUF for local serving with
llama.cpp.
