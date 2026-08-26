#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/14 batch 2 验证 — 检查剩余残留 29 hits"""
import os

ROOT = r"F:\zprintpro-nextjs"
OUT = r"F:\zprintpro-nextjs\.hermes\batch2-verify-2026-08-14-out.txt"

TARGETS = [
    r"src\data\category-seo-content.ts",
    r"src\app\[locale]\case-studies\page.tsx",
    r"src\data\blog-data\zh-hk.json",
    r"src\data\blog-data\ja.json",
]

PATTERNS = ["名片", "名刺", "咭片"]

with open(OUT, "w", encoding="utf-8") as out:
    for rel in TARGETS:
        fp = os.path.join(ROOT, rel)
        if not os.path.exists(fp):
            continue
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()
        out.write(f"\n=== {rel} (size={len(content)}) ===\n")
        lines = content.split("\n")
        file_total = 0
        for i, line in enumerate(lines, 1):
            for p in PATTERNS:
                if p in line:
                    file_total += line.count(p)
                    out.write(f"L{i} [{p}x{line.count(p)}]: {line[:200]}\n")
        out.write(f"  -> {file_total} hits in {rel}\n")
print(f"DONE: {OUT}")
