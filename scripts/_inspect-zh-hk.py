#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inspect zh-hk.json baseline raw + decoded."""
from pathlib import Path

p = Path("F:/zprintpro-nextjs/src/data/blog-data/zh-hk.json")
raw = p.read_bytes()
text = raw.decode("gbk", errors="replace")
print(f"file size: {len(raw)} bytes")
print(f"GBK decoded text length: {len(text)} chars")
print(f"first 200 chars: {text[:200]!r}")
print(f"chars 1000-1200: {text[1000:1200]!r}")
# 找第一个 { 
brace = text.find("{")
print(f"first {{: at {brace}")
print(f"  near: {text[max(0,brace-20):brace+50]!r}")
# 找第一个 "}  (slug 边界)
print(f"\nfirst 5 slugs:")
import re
# slug pattern: "slug-name": {
for m in re.finditer(r'"([\w\-]+)"\s*:\s*\{', text[:50000]):
    print(f"  pos {m.start()}: {m.group(1)!r}")
    if m.start() > 5000:
        break
