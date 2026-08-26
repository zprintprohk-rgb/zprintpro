#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check if products.ts description has broken syntax."""
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for slug in ['security-stickers', 'fluorescent-stickers', 'thick-paper-flyers', 'gang-run-card-boxes', 'tuck-end-boxes']:
    sm = re.search(r"slug:\s*['\"]" + slug + r"['\"]", content)
    if not sm: continue
    start = sm.start()
    # Walk back to find description:
    desc_start = content.rfind('description:', 0, start)
    # Print 200 chars from there
    print(f'=== {slug} ===')
    print(content[desc_start:desc_start+400])
    print()
