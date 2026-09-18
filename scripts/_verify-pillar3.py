#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verify Pillar 3 replacement was successful."""
import re
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
TARGETS = [
    ROOT / "src/data/blog-data/zh-hk.json",
    ROOT / "src/data/blog-data/en.json",
    ROOT / "src/data/blog-data/ja.json",
]


def main() -> None:
    for path in TARGETS:
        raw = path.read_bytes()
        text = raw.decode("gbk", errors="replace")
        m = re.search(r'"poster-size-guide"\s*:\s*\{', text)
        if not m:
            print(f"[FAIL] {path.name}: cannot find poster-size-guide marker")
            continue
        start = m.end()
        cm = re.search(r'"content"\s*:\s*"', text[start:start + 5000])
        if not cm:
            print(f"[FAIL] {path.name}: cannot find content field")
            continue
        after_content = start + cm.end()
        end_m = re.search(r'",\\n', text[after_content:after_content + 200000])
        if not end_m:
            print(f"[FAIL] {path.name}: content too long or unterminated")
            continue
        content_len = end_m.start()
        # 检查 title field
        tm = re.search(r'"title"\s*:\s*"([^"]+)"', text[start:start + 1000])
        title = tm.group(1)[:80] if tm else "?"
        # 检查 schemas field
        sm = re.search(r'"schemas"\s*:\s*\[([^\]]+)\]', text[start:start + 5000])
        schemas = sm.group(1) if sm else "?"
        # 检查 lastUpdated field
        lu = re.search(r'"date"\s*:\s*"([^"]+)"', text[start:start + 5000])
        date = lu.group(1) if lu else "?"
        print(f"[OK] {path.name}")
        print(f"  title: {title}")
        print(f"  content: {content_len} chars")
        print(f"  schemas: {schemas}")
        print(f"  date: {date}")


if __name__ == "__main__":
    main()
