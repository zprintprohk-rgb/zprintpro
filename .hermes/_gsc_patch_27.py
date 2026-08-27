#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Patch: add exact GSC query 'paper bag print file requirements' to all 3 locales for SEO max match."""
import json
from pathlib import Path

DATA = Path("src/data/blog-data")

# Append a small keyword-density booster to paper-bag-printing-guide (append after new content).
PATCH_EN = """\n<p><strong>Paper bag print file requirements (the short list):</strong> 3 mm bleed, 3-5 mm safe zone, 300 DPI for photos, 600 DPI for fine line work, CMYK color mode, PDF/X-1a delivery, all fonts embedded or outlined. This is the minimum-viable paper bag print file requirements for first-pass pre-press approval at any professional printer (per the 98% first-time approval benchmark at Healey Packaging).</p>\n"""

PATCH_ZH = """\n<p><strong>紙袋印刷檔案要求（精簡清單）：</strong> 3 mm 出血位、3-5 mm 安全區、相片 300 dpi、幼線 600 dpi、CMYK 色彩模式、PDF/X-1a 交付、字型嵌入或轉外框。呢個係任何專業印刷廠首次 pre-press 通過嘅紙袋印刷檔案最低要求（參考 Healey Packaging 公佈嘅 98% 首次通過率指標）。</p>\n"""

PATCH_JA = """\n<p><strong>紙袋印刷ファイル要件（ショートリスト）：</strong> 3 mm ブリード、3-5 mm セーフゾーン、写真 300 dpi、細線 600 dpi、CMYK 色モード、PDF/X-1a 納品、すべてのフォント埋め込みまたはアウトライン。これはプロフェッショナル印刷会社での初回プリプレス合格に必要な紙袋印刷ファイルの最低要件（Healey Packaging 公開の 98% 初回合格率ベンチマーク参照）。</p>\n"""


def patch(loc, slug, text):
    path = DATA / f"{loc}.json"
    with open(path, encoding="utf-8") as f:
        obj = json.load(f)
    if slug not in obj:
        return False
    b = obj[slug]
    b["content"] = b.get("content", "") + text
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
    return True


for loc, txt in [("en", PATCH_EN), ("zh-hk", PATCH_ZH), ("ja", PATCH_JA)]:
    ok = patch(loc, "paper-bag-printing-guide", txt)
    print(f"{loc}/paper-bag-printing-guide: {'OK' if ok else 'SKIP'}")

# Verify
for loc in ["en", "zh-hk", "ja"]:
    p = DATA / f"{loc}.json"
    with open(p, encoding="utf-8") as f:
        obj = json.load(f)
    c = obj["paper-bag-printing-guide"]["content"]
    for kw in ["paper bag print file requirements", "紙袋印刷檔案要求", "紙袋印刷ファイル要件"]:
        if kw.lower() in c.lower():
            print(f"  ✓ {loc}: '{kw}' found")
        else:
            print(f"  ✗ {loc}: '{kw}' NOT found")
