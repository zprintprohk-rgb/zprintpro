#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.13 T15: flyers 宣傳單張 Pillar 首建 3 locale"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

fixes = [
    # T15 zh-hk
    ("""  'zh-hk': {
    h2: '香港傳單印刷 — A5/A4/A3 彩印，100 張起訂，即日交貨',""",
     """  'zh-hk': {
    // 2026-08-22 v3.13 T15: 宣傳單張 Pillar 首建 (5 词对齐 + 5 FAQ)
    featuredSnippet: '宣傳單張印刷 100 張起, A5 單面 128g 銅版紙 HK$0.35/張起, 雙面 HK$0.45/張起, 3 個工作天交期, 即日特急可選. 免費設計模板 + DHL 全球 2-4 天.',
    lastUpdated: '2026-08-22',
    h2: '宣傳單張 / 宣傳單張印刷 / 傳單印刷 / 彩色單張 — A3-A6 全尺寸 100 張起印, 即日特急可選',"""),
    # T15 en
    ("""  en: {
    h2: 'Flyer Printing — A5/A4/A3 Full Color, From 100 pcs, Same-Day Delivery',""",
     """  en: {
    // 2026-08-22 v3.13 T15: Flyer Pillar 首建
    featuredSnippet: 'Flyer printing from 100 pcs, A5 single-side 128g coated paper US$0.045 each, double-side US$0.06 each, 3 business day turnaround, same-day rush available. Free design templates + DHL global 2-4 day delivery.',
    lastUpdated: '2026-08-22',
    h2: 'Flyer Printing / Leaflet Printing / Brochure Printing / Full Color Flyers — A6-A3 From 100 pcs, Same-Day Rush Available',"""),
    # T15 ja
    ("""  ja: {
    h2: 'チラシ印刷 — A5/A4/A3フルカラー、100枚から、即日納品',""",
     """  ja: {
    // 2026-08-22 v3.13 T15: チラシ Pillar 首建
    featuredSnippet: 'チラシ印刷 100枚から, A5 片面 128g コート紙 1枚 ¥6 から, 両面 ¥8 から, 3営業日納期, 即日特急対応. 無料デザインテンプレート + DHL グローバル 2-4日.',
    lastUpdated: '2026-08-22',
    h2: 'チラシ 印刷 / チラシ 作成 / フライヤー 印刷 / 両面カラーチラシ — A6-A3 100枚から, 即日特急対応',"""),
]

applied = 0
for old, new in fixes:
    if old in txt:
        txt = txt.replace(old, new, 1)
        applied += 1
    else:
        print(f"  WARN: not found")
C.write_text(txt, encoding="utf-8")
print(f"Applied: {applied}/{len(fixes)}")
