#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/14 batch 2 §11 名片清扫 — 精确定位 user-facing 6 文件残留"""
import os

ROOT = r"F:\zprintpro-nextjs"
OUT = r"F:\zprintpro-nextjs\.hermes\batch2-scan-2026-08-14-out.txt"

# user-facing 6 file 范围
TARGET_FILES = [
    r"src\data\blog-data\zh-hk.json",
    r"src\data\blog-data\en.json",
    r"src\data\blog-data\ja.json",
    r"src\data\sku-seo-data.ts",
    r"src\data\category-seo-content.ts",
    r"src\app\[locale]\case-studies\page.tsx",
]

PATTERNS = ["名片", "名刺", "咭片"]

with open(OUT, "w", encoding="utf-8") as out:
    grand_total = 0
    for rel in TARGET_FILES:
        fp = os.path.join(ROOT, rel)
        if not os.path.exists(fp):
            out.write(f"SKIP (not found): {rel}\n")
            continue
        try:
            with open(fp, "r", encoding="utf-8") as f:
                content = f.read()
        except UnicodeDecodeError:
            out.write(f"SKIP (decode error): {rel}\n")
            continue
        lines = content.split("\n")
        file_total = 0
        out.write(f"\n=== {rel} (size={len(content)}) ===\n")
        for i, line in enumerate(lines, 1):
            for p in PATTERNS:
                if p in line:
                    file_total += line.count(p)
                    out.write(f"L{i} [{p}x{line.count(p)}]: {line[:200]}\n")
        out.write(f"  -> {file_total} hits in {rel}\n")
        grand_total += file_total
    out.write(f"\nGRAND TOTAL: {grand_total} hits in {len(TARGET_FILES)} files\n")
print(f"DONE: {OUT}, grand_total={grand_total}")
