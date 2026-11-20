#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[3/4] 单独跑 — 改 category/[slug]/page.tsx L193 en calendars 100 MOQ → 1000 MOQ
[1/4] products.ts 6 SKU 字段 ✓
[2/4] pricing.ts 6 SKU anchor + L892 ✓
[3/4] L193 en H1 ← 本脚本
[4/4] spot check 编码
"""
import io
import os

ROOT = r"F:\zprintpro-nextjs"
PATH = os.path.join(ROOT, "src", "app", "[locale]", "category", "[slug]", "page.tsx")

# 用真实中点字符 U+00B7, 不用 \u00b7 escape (避免 Python source 转义问题)
DOT = "\u00b7"  # ·
# Read 工具显示 L193 = `     'en': 'Custom Calendars Free Shipping · 100 MOQ 2027 ... USA Corporate Gifts',`
# 实际是 5 空格缩进 (不是 6), 文件 hex dump 确认
OLD = "     'en': 'Custom Calendars Free Shipping" + DOT + " 100 MOQ 2027 Desk Wall Hardcover Foil" + DOT + " USA Corporate Gifts',"
NEW = "     'en': 'Custom Calendars Free Shipping" + DOT + " 1000 MOQ 2027 Desk Wall Hardcover Foil" + DOT + " USA Corporate Gifts',"

def main():
    with io.open(PATH, "r", encoding="utf-8") as f:
        text = f.read()
    if OLD not in text:
        raise RuntimeError("OLD string not found in page.tsx L193")
    if NEW in text:
        print("ALREADY DONE — NEW already present")
        return
    text2 = text.replace(OLD, NEW, 1)
    with io.open(PATH, "w", encoding="utf-8", newline="\n") as f:
        f.write(text2)

    # Verify
    with io.open(PATH, "r", encoding="utf-8") as f:
        t2 = f.read()
    if NEW in t2 and OLD not in t2:
        print("OK — L193 en calendars 100 MOQ -> 1000 MOQ")
    else:
        raise RuntimeError("Verification failed after replace")

    # Spot check encoding
    with open(PATH, "rb") as f:
        b = f.read()
    bom = b[:3] == b"\xef\xbb\xbf"
    print(f"size={len(b)} BOM={bom}")
    if bom:
        raise RuntimeError("UTF-8 BOM detected, revert immediately")

if __name__ == "__main__":
    main()
