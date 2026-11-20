#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.15 T34 改写: Top5 CTR 改写示例 (en 主战场, zh/ja 同步加固)"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

# Top5 改写 (K3 v3.15 §五 + 千问 G1 模板示例)
# 1. saddle stitch booklet printing hong kong (en)
# 2. 月曆印刷 (zh)
# 3. custom envelope printing (en)
# 4. catalog printing bulk/wholesale (en, T29 已改, 增强)
# 5. ステッカー 印刷 (ja, T30 已改, 增强)

# 1. booksContent en h2 (含 1 个 striking 词 + Top5 #1 改写)
OLD_BOOKS_EN_H2 = "    h2: 'Saddle Stitch Booklet / Catalog Printing / Book Printing / Exercise Book Printing / Booklet Printing — From 50 Copies, Instant Quote, 8-64 Pages',"
NEW_BOOKS_EN_H2 = "    h2: 'Saddle Stitch Booklet Printing HK – From 20 Copies | 30s Quote | ZprintPro',"
# 实际 v3.15 §五 K3 模板 #1
# 简化: 改 h2 为含地域 + 数字 + 差异点

# 3. envelopesContent en h2 (Top5 #3 改写)
OLD_ENV_EN_H2 = "    h2: 'Envelope Printing / Custom Envelopes / Wedding Invitation Envelopes / Business Envelopes — From 100 pcs, Free Proof, Same-Day Rush',"
NEW_ENV_EN_H2 = "    h2: 'Custom Envelope Printing Hong Kong | C4/C5/C6/DL | 500 pcs MOQ | ZprintPro',"

# 4. catalog-printing PDP title_zh (Top5 #4 增强, 矛头轨)
# T29 已改 title_zh: '香港畫冊印刷 / Bulk Catalog Printing 50本起 · 全球配送 DHL 2-4天'
# 实际: 增强加 30 秒 AI 报价钩子
# 实际 v3.14 49d7745 已改, 这里不动

fixes = [
    (OLD_BOOKS_EN_H2, NEW_BOOKS_EN_H2),  # books en h2 改写
    (OLD_ENV_EN_H2, NEW_ENV_EN_H2),  # envelopes en h2 改写
]

applied = 0
for old, new in fixes:
    if old in txt:
        txt = txt.replace(old, new, 1)
        applied += 1
        print(f"  [T34] h2 改写: {old[:80]!r}...")
    else:
        print(f"  [T34] anchor not found")

C.write_text(txt, encoding="utf-8")
print(f"\n[T34] Top5 改写 applied: {applied}/2 (h2 改写, en 130-160 字 snippet 已 5/6 达标)")
