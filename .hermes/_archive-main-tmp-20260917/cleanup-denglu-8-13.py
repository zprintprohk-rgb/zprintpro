#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/13 登錄態/登录态 残留清理 (K3 4-week-execution-plan 8/13 batch 1)
- 9 文件 11 处真残留 (登錄態实询 + 登录态描述)
- 走 Python UTF-8 直接 IO, 不走 PowerShell Set-Content (per AGENTS.md §12 push 安全协议)
- 上下文敏感替换: "供應商登錄態實詢" → "供應商實詢", "需 user WebBridge 登录态" → "需 user WebBridge 登入", "intuan.com 已登录态" → "intuan.com 已登入", "登录态真实询价" → "登入真实询价"
- intuan-2026-07-18 JSON key 不动 (那是结构 key, 引用方多)
- 转换后 encoding 严格 UTF-8 (无 BOM)
"""
import os
import sys
import json
from pathlib import Path

BASE = Path(r"F:\zprintpro-nextjs")

# 真残留清单 (path, [find, replace, context_safe_check])
# context_safe_check = None 强制替换, = str 时仅当 find 前后是该字串才替换
REPLACEMENTS = [
    # 1) src/data/products.ts L151: "供應商登錄態實詢" → "供應商實詢"
    {
        "file": "src/data/products.ts",
        "find": "供應商登錄態實詢",
        "replace": "供應商實詢",
        "count": 1,
    },
    # 2) src/data/price-tables/calibration-status-2026-07-20.json
    {
        "file": "src/data/price-tables/calibration-status-2026-07-20.json",
        "find": "需 user WebBridge 登录态",
        "replace": "需 user WebBridge 登入",
        "count": 1,
    },
    # 3-5) 3 个 blockedBy 字段: "user WebBridge intuan 已登录态" → "user WebBridge intuan 已登入"
    # L72-74 各 1 处 (P0-1-B-3/4/6)
    {
        "file": "src/data/price-tables/calibration-status-2026-07-20.json",
        "find": "user WebBridge intuan 已登录态",
        "replace": "user WebBridge intuan 已登入",
        "count": 3,
    },
    # 6) L84: "intuan.com 已登录态 (cookie/devtools)" → "intuan.com 已登入 (cookie/devtools)"
    {
        "file": "src/data/price-tables/calibration-status-2026-07-20.json",
        "find": "intuan.com 已登录态",
        "replace": "intuan.com 已登入",
        "count": 1,
    },
    # 7) src/data/price-tables/packaging.json L7: "intuan.com 登录态真实询价" → "intuan.com 登入真实询价"
    {
        "file": "src/data/price-tables/packaging.json",
        "find": "intuan.com 登录态真实询价",
        "replace": "intuan.com 登入真实询价",
        "count": 1,
    },
    # 8) src/data/price-tables/paper-bags.json L7
    {
        "file": "src/data/price-tables/paper-bags.json",
        "find": "intuan.com 登录态真实询价",
        "replace": "intuan.com 登入真实询价",
        "count": 1,
    },
    # 9) src/data/price-tables/stickers.json L7
    {
        "file": "src/data/price-tables/stickers.json",
        "find": "intuan.com 登录态真实询价",
        "replace": "intuan.com 登入真实询价",
        "count": 1,
    },
    # 10) src/data/price-tables/intuan-real-quotes-2026-07-18.json L3
    {
        "file": "src/data/price-tables/intuan-real-quotes-2026-07-18.json",
        "find": "intuan.com 登录态真实询价",
        "replace": "intuan.com 登入真实询价",
        "count": 1,
    },
    # 11) src/data/price-tables/README.md L64
    {
        "file": "src/data/price-tables/README.md",
        "find": "需 user WebBridge 登录态",
        "replace": "需 user WebBridge 登入",
        "count": 1,
    },
]


def safe_read(path: Path) -> str:
    """Read file as UTF-8 (no BOM)."""
    with open(path, "rb") as f:
        raw = f.read()
    if raw.startswith(b"\xef\xbb\xbf"):
        raw = raw[3:]
    return raw.decode("utf-8")


def safe_write(path: Path, content: str):
    """Write file as UTF-8 (no BOM)."""
    with open(path, "wb") as f:
        f.write(content.encode("utf-8"))


def safe_validate_json(path: Path):
    """Validate JSON file structure after edit (if .json)."""
    if path.suffix != ".json":
        return
    try:
        with open(path, "r", encoding="utf-8") as f:
            json.load(f)
    except json.JSONDecodeError as e:
        print(f"[FAIL] JSON INVALID after edit: {path} -> {e}")
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
                print(f"[WARN] {spec['file']}: find '{spec['find']}' not found (skip)")
                continue
            if actual != spec["count"]:
                print(
                    f"[WARN] {spec['file']}: count mismatch (expected {spec['count']}, "
                    f"actual {actual}) for '{spec['find']}'"
                )
            new_content = content.replace(spec["find"], spec["replace"])
            safe_write(file_path, new_content)
            safe_validate_json(file_path)
            print(
                f"[OK] {spec['file']}: replaced {actual}x '{spec['find']}' -> '{spec['replace']}'"
            )
            total += actual
        except Exception as e:
            errors.append(f"ERR {file_path}: {e}")

    print(f"\n=== Total replacements: {total} ===")
    if errors:
        print("Errors:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    print("[OK] All replacements OK, JSON validated (where applicable).")


if __name__ == "__main__":
    main()
