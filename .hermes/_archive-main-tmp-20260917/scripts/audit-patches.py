#!/usr/bin/env python3
"""Audit all patches for content length + zh-hk forbidden words."""
import re
from pathlib import Path

PATCHES_DIR = Path(r"F:\zprintpro-nextjs\.hermes\patches")

PATTERNS = [
    r"## 3\..*?完整新 content 字段.*?```(?:\w+)?\n(.*?)```",
    r"## 3\..*?Complete New content Field.*?```(?:\w+)?\n(.*?)```",
    r"## 3\..*?完全新 content フィールド.*?```(?:\w+)?\n(.*?)```",
]

ZH_HK_FORBIDDEN = [
    "深圳市彩龍印刷包裝有限公司",
    "深圳市彩龙印刷包装有限公司",
    "深圳市龍崗區平湖街道嘉城路 1 號",
    "Shenzhen Cai Long Printing Packaging",
    "1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen",
    "518111",
]

results = []
for p in sorted(PATCHES_DIR.glob("pillar-*-12rules.md")):
    text = p.read_text(encoding="utf-8")
    best_len = 0
    best_pattern = "none"
    for pat in PATTERNS:
        m = re.search(pat, text, re.DOTALL)
        if m:
            if len(m.group(1)) > best_len:
                best_len = len(m.group(1))
                best_pattern = pat[:30] + "..."
    forbidden_hits = [f for f in ZH_HK_FORBIDDEN if f in text]
    results.append({
        "file": p.name,
        "size": p.stat().st_size,
        "content_chars": best_len,
        "pattern": best_pattern,
        "forbidden": len(forbidden_hits),
        "forbidden_list": forbidden_hits,
    })

print(f"{'File':<40} {'Size':>8} {'Content':>10} {'Forbidden':>10}")
print("-" * 75)
for r in results:
    print(f"{r['file']:<40} {r['size']:>8} {r['content_chars']:>10} {r['forbidden']:>10}")
    if r["forbidden_list"]:
        for f in r["forbidden_list"]:
            print(f"  ❌ {f}")
print()
total_content = sum(r["content_chars"] for r in results)
total_files = len(results)
print(f"Total: {total_files} files, {total_content:,} chars content")
print(f"Files with content > 0: {sum(1 for r in results if r['content_chars'] > 0)}/{total_files}")
print(f"Files with forbidden: {sum(1 for r in results if r['forbidden'] > 0)}/{total_files}")
