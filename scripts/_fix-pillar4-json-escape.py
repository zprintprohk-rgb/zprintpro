#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix invalid \\u escape sequences in blog-data JSON files (Pillar 4 12-rules rewrite residue).
Per MEMORY.md §8: ≥3 locale 大段 JSON 必走 Python + raw + json.dump.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
TARGETS = [
    ROOT / "src/data/blog-data/zh-hk.json",
    ROOT / "src/data/blog-data/en.json",
    ROOT / "src/data/blog-data/ja.json",
]

# 非法 \u 残留在 9/4 0:18-0:37 fix-pillar-4-quality12*.py v1-v5 漏修
# 全部 Pillar 4 12-rules 改后的 content body 里 "border" 等 HTML class 错位成 "b娉ㄦ枃" 留下 \uXX 残序列
# Python json 默认 strict=True 不接受 \u 后接非 4 位 hex
# 解法: 先用 regex 修 \uXXXX (X 0-9a-fA-F) 之外的 \uXX 残序列, 删掉整个 \u

INVALID_ESCAPE_RE = re.compile(r'\\u(?![0-9a-fA-F]{4})[^"\\]{0,4}')


def fix_invalid_escapes(raw: str) -> tuple[str, int]:
    """Remove invalid \\u escape residues from JSON raw text.

    Returns (fixed_text, num_replacements).
    """
    fixed, n = INVALID_ESCAPE_RE.subn('', raw)
    return fixed, n


def repair(path: Path) -> None:
    raw = path.read_text(encoding='utf-8')
    fixed, n = fix_invalid_escapes(raw)
    if n == 0:
        print(f"[OK] {path.name}: 0 invalid escapes")
        return
    # 验证 fixed 是合法 JSON (单遍 parse 验证)
    try:
        json.loads(fixed)
    except json.JSONDecodeError as exc:
        print(f"[FAIL] {path.name}: still invalid after fix: {exc}", file=sys.stderr)
        # 不写回，避免损坏文件
        sys.exit(1)
    path.write_text(fixed, encoding='utf-8', newline='\n')
    print(f"[FIXED] {path.name}: {n} invalid escapes removed")


def main() -> None:
    for path in TARGETS:
        if not path.exists():
            print(f"[SKIP] {path}: not found", file=sys.stderr)
            continue
        repair(path)


if __name__ == "__main__":
    main()
