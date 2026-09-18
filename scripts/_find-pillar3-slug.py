#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Find Pillar 3 slug in zh-hk.json baseline."""
import re
from pathlib import Path

text = Path("F:/zprintpro-nextjs/src/data/blog-data/zh-hk.json").read_bytes().decode("gbk", errors="replace")
matches = list(re.finditer(r'"([^"]*)poster([^"]*)"', text))
print(f"total 'poster' string matches: {len(matches)}")
for m in matches[:10]:
    print(f"  pos={m.start()}: {m.group()[:80]!r}")

# 找所有 slug
slug_matches = list(re.finditer(r'"([\w\-]+)"\s*:\s*\{', text))
print(f"\ntotal slug blocks: {len(slug_matches)}")
for m in slug_matches[:8]:
    print(f"  slug: {m.group(1)!r}")
