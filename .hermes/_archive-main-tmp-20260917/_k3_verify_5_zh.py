#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 5 件套 搜词注入 verify"""
import re

CHECKS = [
    ("R2 #1 small-batch EN sample pack", r"10-piece sample pack for \$5\.99", "src/data/products.ts"),
    ("R2 #1 small-batch ZH 樣品檔", r"10 張防水貼紙樣品檔 HK\$48", "src/data/products.ts"),
    ("R2 #1 small-batch JA サンプル", r"10 枚防水ステッカーサンプル 980 円", "src/data/products.ts"),
    ("R2 #2 大信封 title", r"大信封 / A4 信封印刷", "src/lib/seo.ts"),
    ("R2 #2 大信封 desc", r"大信封印刷 100 個起印, HK\$0\.45/個", "src/lib/seo.ts"),
    ("R2 #3 poster related en", r"RELATED-GUIDES-2026-08", "src/data/blog-data/en.json"),
    ("R2 #3 poster related zh", r"RELATED-GUIDES-2026-08", "src/data/blog-data/zh-hk.json"),
    ("R2 #3 poster related ja", r"RELATED-GUIDES-2026-08", "src/data/blog-data/ja.json"),
    ("R3 即日印刷 snippet zh", r"即日印刷 18:00 截單", "src/app/[locale]/services/rush-printing-delivery/page.tsx"),
    ("R3 即日印刷 last updated", r"最後更新：</strong>2026 年 8 月 19 日", "src/app/[locale]/services/rush-printing-delivery/page.tsx"),
    ("R3 餐牌 snippet", r"餐牌印刷 10 份起，防水 PVC HK\$3\.5/份", "src/data/category-seo-content.ts"),
    ("R3 月曆 snippet", r"月曆印刷 100 本起，掛曆 HK\$18/本", "src/data/category-seo-content.ts"),
    ("R3 両面カラー snippet", r"両面カラー印刷 100 枚〜、4C CMYK 標準", "src/data/category-seo-content.ts"),
    ("R3 CategoryPillar featuredSnippet 渲染", r"data\.featuredSnippet", "src/components/CategoryPillarContent.tsx"),
    ("R3 CategoryPillar lastUpdated 渲染", r"data\.lastUpdated", "src/components/CategoryPillarContent.tsx"),
    ("R3 CategoryLocaleContent 接口加字段", r"featuredSnippet\?:", "src/data/category-seo-content.ts"),
    ("R3 即日印刷 footer 内部链接", r"海報印刷", "src/app/[locale]/services/rush-printing-delivery/page.tsx"),
    ("R3 即日印刷 footer 5 链接全", r"月曆印刷", "src/app/[locale]/services/rush-printing-delivery/page.tsx"),
]

passes, fails = 0, 0
for name, pat, fp in CHECKS:
    with open(fp, "r", encoding="utf-8") as f:
        s = f.read()
    if re.search(pat, s):
        print(f"  [OK]   {name}")
        passes += 1
    else:
        print(f"  [FAIL] {name}  --  {fp}")
        fails += 1

print(f"\n=== 验收结果: {passes} PASS / {fails} FAIL / {len(CHECKS)} TOTAL ===")
