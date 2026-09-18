#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Debug: locate exact JSON parse error in blog-data/*.json after GBK decode."""
import json
import sys
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
TARGETS = [
    ROOT / "src/data/blog-data/zh-hk.json",
    ROOT / "src/data/blog-data/en.json",
    ROOT / "src/data/blog-data/ja.json",
]


def main() -> None:
    for path in TARGETS:
        if not path.exists():
            continue
        raw = path.read_bytes()
        text = raw.decode("gbk", errors="replace")
        try:
            json.loads(text)
            print("[OK]", path.name)
        except json.JSONDecodeError as exc:
            # 报告 line, col, msg, pos + 周围 80 char
            offset = max(0, exc.pos - 80)
            ctx = text[offset:exc.pos + 80]
            # 把每个 char 的 ord 打印
            print("[FAIL]", path.name, "line=", exc.lineno, "col=", exc.colno, "pos=", exc.pos, "msg=", exc.msg)
            print("  char at pos: ", repr(text[exc.pos]) if exc.pos < len(text) else "EOF")
            print("  context (raw repr, 80 chars before+after):")
            print("    " + repr(ctx))
            # 找到 line start
            line_start = text.rfind(chr(10), 0, exc.pos) + 1
            line_end = text.find(chr(10), exc.pos)
            if line_end < 0:
                line_end = len(text)
            line_text = text[line_start:line_end]
            print("  full line", exc.lineno, "(len=", len(line_text), "):")
            print("    " + repr(line_text))


if __name__ == "__main__":
    main()
