#!/usr/bin/env python3
"""Fix ONLY '制' -> '製' in 5 SKU blocks (simplified Chinese detection from pre-commit)"""
import re
from pathlib import Path

SRC = Path("src/data/products.ts")
content = SRC.read_text(encoding="utf-8")

target_slugs = ["white-card-bags", "handle-bags", "mailer-boxes", "food-boxes", "kraft-paper-packaging-box"]

for slug in target_slugs:
    pattern = rf"slug: '{slug}',"
    m = re.search(pattern, content)
    if not m:
        print(f"!! {slug}: not found")
        continue
    start = m.start()
    end = min(start + 8000, len(content))
    block = content[start:end]
    # ONLY fix the specific char that pre-commit caught
    new_block = block.replace("制", "製")
    if new_block != block:
        n_diff = sum(1 for a, b in zip(block, new_block) if a != b)
        content = content[:start] + new_block + content[end:]
        print(f"[OK] {slug}: replaced {n_diff} chars")
    else:
        print(f"-- {slug}: no change")

SRC.write_text(content, encoding="utf-8")
print(f"\n[OK] products.ts updated, size: {len(content)} chars")
