#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/13 登錄態/登录态 残留清理 R2 (K3 4-week-execution-plan 8/13 batch 1)
- R1 已替换 9 处, R2 剩 6 处
- 6 处真残留清单 (path, find, replace)
- 走 Python UTF-8 IO
- PowerShell 5.1 console GBK 解决: stdout buffer 强制 UTF-8
"""
import os
import sys
import json
from pathlib import Path

BASE = Path(r"F:\zprintpro-nextjs")

# Force UTF-8 stdout
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

REPLACEMENTS = [
    # 1) src/data/price-tables/packaging.json L7: "待 intuan 登录询价校准" → "待 intuan 登入询价校准"
    {
        "file": "src/data/price-tables/packaging.json",
        "find": "待 intuan 登录询价校准",
        "replace": "待 intuan 登入询价校准",
        "count": 1,
    },
    # 2) src/data/price-tables/paper-bags.json L7
    {
        "file": "src/data/price-tables/paper-bags.json",
        "find": "待 intuan 登录询价校准",
        "replace": "待 intuan 登入询价校准",
        "count": 1,
    },
    # 3) src/data/price-tables/README.md L17: "登录 intuan.com 账号" → "登入 intuan.com 账号"
    {
        "file": "src/data/price-tables/README.md",
        "find": "登录 intuan.com 账号",
        "replace": "登入 intuan.com 账号",
        "count": 1,
    },
    # 4) src/data/price-tables/flyers.json L11: 整句替换
    {
        "file": "src/data/price-tables/flyers.json",
        "find": '"intuan.com 登录态真实询价 CNY×1.3×1.087→HKD (intuan-real-quotes-2026-07-18.json)"',
        "replace": '"intuan.com 登入真实询价 CNY×1.3×1.087→HKD (intuan-real-quotes-2026-07-18.json)"',
        "count": 1,
    },
    # 5) src/data/price-tables/books.json L11: 同上
    {
        "file": "src/data/price-tables/books.json",
        "find": '"intuan.com 登录态真实询价 CNY×1.3×1.087→HKD (intuan-real-quotes-2026-07-18.json)"',
        "replace": '"intuan.com 登入真实询价 CNY×1.3×1.087→HKD (intuan-real-quotes-2026-07-18.json)"',
        "count": 1,
    },
    # 6) src/data/price-tables/stickers.json L7: "intuan 登录态实询" → "intuan 登入实询"
    {
        "file": "src/data/price-tables/stickers.json",
        "find": '"intuan 登录态实询 (60×30mm 铜版纸不干胶 彩色 切成品)"',
        "replace": '"intuan 登入实询 (60×30mm 铜版纸不干胶 彩色 切成品)"',
        "count": 1,
    },
]


def safe_read(path: Path) -> str:
    with open(path, "rb") as f:
        raw = f.read()
    if raw.startswith(b"\xef\xbb\xbf"):
        raw = raw[3:]
    return raw.decode("utf-8")


def safe_write(path: Path, content: str):
    with open(path, "wb") as f:
        f.write(content.encode("utf-8"))


def safe_validate_json(path: Path):
    if path.suffix != ".json":
        return
    try:
        with open(path, "r", encoding="utf-8") as f:
            json.load(f)
    except json.JSONDecodeError as e:
        print(f"[FAIL] JSON INVALID after edit: {path} -> {e}", flush=True)
        sys.exit(1)


def main():
    total = 0
    errors = []
    for spec in REPLACEMENTS:
        file_path = BASE / spec["file"]
        if not file_path.exists():
            errors.append(f"[MISSING] {file_path}")
            continue
        try:
            content = safe_read(file_path)
            actual = content.count(spec["find"])
            if actual == 0:
                print(f"[WARN] {spec['file']}: find not found (skip)", flush=True)
                continue
            if actual != spec["count"]:
                print(
                    f"[WARN] {spec['file']}: count mismatch (expected {spec['count']}, "
                    f"actual {actual})",
                    flush=True,
                )
            new_content = content.replace(spec["find"], spec["replace"])
            safe_write(file_path, new_content)
            safe_validate_json(file_path)
            print(f"[OK] {spec['file']}: replaced {actual}x", flush=True)
            total += actual
        except Exception as e:
            errors.append(f"ERR {file_path}: {e}")

    print(f"\n=== R2 Total replacements: {total} ===", flush=True)
    if errors:
        print("Errors:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    print("[OK] R2 All replacements OK, JSON validated (where applicable).", flush=True)


if __name__ == "__main__":
    main()
