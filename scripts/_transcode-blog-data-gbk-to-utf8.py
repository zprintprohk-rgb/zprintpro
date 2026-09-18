#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Transcode blog-data/*.json from GBK bytes-as-UTF-8 to proper UTF-8.

Per MEMORY.md §8: ≥3 locale 大段 JSON 必走 Python + raw + json.dump.
"""
import json
import sys
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
TARGETS = [
    ROOT / "src/data/blog-data/zh-hk.json",
    ROOT / "src/data/blog-data/en.json",
    ROOT / "src/data/blog-data/ja.json",
]


def escape_invalid_control_chars_in_json_string_literals(text: str) -> tuple[str, int]:
    """Walk JSON text; for any unescaped control char (U+0000..U+001F) inside a string literal, replace with \\u00XX.
    We don't fully parse JSON; we conservatively replace any 0x00-0x1F byte that is not preceded by a backslash inside a "..." run.
    Strategy: do a streaming scan. Track whether we're inside a string literal. When we see a control char inside, escape it.
    """
    out: list[str] = []
    in_string = False
    escape = False
    n = 0
    for ch in text:
        if in_string:
            if escape:
                out.append(ch)
                escape = False
                continue
            if ch == "\\":
                out.append(ch)
                escape = True
                continue
            if ch == '"':
                out.append(ch)
                in_string = False
                continue
            code = ord(ch)
            # 允许 \n \r \t (因为前面已 escape) 和其他 control
            if code < 0x20:
                out.append(f"\\u{code:04x}")
                n += 1
            else:
                out.append(ch)
        else:
            if ch == '"':
                out.append(ch)
                in_string = True
            else:
                out.append(ch)
    return "".join(out), n


def transcode(path: Path) -> None:
    raw_bytes = path.read_bytes()
    # 文件实际是 "UTF-8 格式但内容是 GBK 字节"。M3 author 9/4 0:18-0:37
    # 用 GBK 编码写到 UTF-8 文件导致。需要: 读 raw bytes → GBK 解码 → UTF-8 写
    try:
        text = raw_bytes.decode("gbk", errors="strict")
        decode_mode = "strict"
    except UnicodeDecodeError as exc:
        # 部分位置 GBK 也不合法
        text = raw_bytes.decode("gbk", errors="replace")
        decode_mode = "replace"
    # 不管哪种 decode mode, 都走 control-char escape loop
    passes = 0
    while True:
        try:
            obj = json.loads(text)
            break
        except json.JSONDecodeError as exc:
            passes += 1
            if passes > 50:
                print(f"[FAIL] {path.name}: control char escape didn't converge after 50 passes: {exc}", file=sys.stderr)
                sys.exit(1)
            text, n = escape_invalid_control_chars_in_json_string_literals(text)
            if n == 0:
                print(f"[FAIL] {path.name}: no more control chars to escape but JSON still invalid: {exc}", file=sys.stderr)
                sys.exit(1)
    # 写回 (UTF-8 + LF newline)
    path.write_text(text, encoding="utf-8", newline="\n")
    print(f"[OK] {path.name}: GBK {decode_mode} → UTF-8 + control-char escape ({passes} pass), keys={len(obj)}")


def main() -> None:
    for path in TARGETS:
        if not path.exists():
            print(f"[SKIP] {path}: not found", file=sys.stderr)
            continue
        transcode(path)


if __name__ == "__main__":
    main()
