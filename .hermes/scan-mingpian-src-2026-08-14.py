#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/14 batch 2 名片清扫 — 全 src/ + messages/ + public/ 扫名片/名刺/咭片残留"""
import os
import sys

ROOT = r"F:\zprintpro-nextjs"
OUT = r"F:\zprintpro-nextjs\.hermes\scan-mingpian-src-2026-08-14-out.txt"

# 4-week-plan §二 elsewhere: 94 中文 + 55 日文 + 1 咭片 = 150 处
PATTERNS = ["名片", "名刺", "咭片"]
# Skip: image file names (per 4-week-plan §二 #2 图片文件名不动 豁免)
SKIP_FILE_PATTERNS = [
    r"business-cards-",  # image file names
    r"filename.*business-cards",
    r"images/business-cards",
]

def should_skip_file(path: str) -> bool:
    import re
    for p in SKIP_FILE_PATTERNS:
        if re.search(p, path):
            return True
    return False

results = {p: [] for p in PATTERNS}  # pattern -> [(file, line_no, line)]
extensions = [".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".mdx"]

# Walk
files_scanned = 0
files_with_hits = 0
for dirpath, dirnames, filenames in os.walk(ROOT):
    # Skip node_modules, .next, .git, public (images already known)
    parts = dirpath.split(os.sep)
    if any(p in parts for p in ["node_modules", ".next", ".git", "__pycache__", "zprintpro-en-us-images", "dist", "build", ".vercel"]):
        continue
    for fn in filenames:
        ext = os.path.splitext(fn)[1].lower()
        if ext not in extensions:
            continue
        fp = os.path.join(dirpath, fn)
        # Skip image filename files (heuristic: file with "image" in path)
        rel = os.path.relpath(fp, ROOT)
        if should_skip_file(rel):
            continue
        try:
            with open(fp, "r", encoding="utf-8") as f:
                content = f.read()
        except (UnicodeDecodeError, IOError):
            continue
        files_scanned += 1
        local_hits = {p: [] for p in PATTERNS}
        for i, line in enumerate(content.split("\n"), 1):
            for p in PATTERNS:
                if p in line:
                    local_hits[p].append((i, line))
        for p in PATTERNS:
            if local_hits[p]:
                files_with_hits += 1
                for i, line in local_hits[p]:
                    results[p].append((rel, i, line))

# Write to file
with open(OUT, "w", encoding="utf-8") as out:
    out.write(f"Files scanned: {files_scanned}, Files with hits: {files_with_hits}\n")
    out.write("=" * 80 + "\n")
    for p, hits in results.items():
        out.write(f"\n{p}: {len(hits)} hits total\n")
        out.write("-" * 60 + "\n")
        # Group by file
        by_file = {}
        for f, ln, line in hits:
            by_file.setdefault(f, []).append((ln, line))
        for f, items in sorted(by_file.items(), key=lambda x: -len(x[1]))[:30]:
            out.write(f"\n[{f}] ({len(items)} hits)\n")
            for ln, line in items[:5]:
                out.write(f"  L{ln}: {line[:200]}\n")
    out.write("\nDONE\n")
print(f"DONE: {OUT}")
print(f"Files scanned: {files_scanned}, Files with hits: {files_with_hits}")
for p, hits in results.items():
    print(f"{p}: {len(hits)} hits")
