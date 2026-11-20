#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.13 T18+T19+T20 v2: 修正 h2 字符串"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

T18_FIXES = [
    ("""    h2: '香港信封印刷 — 西式／中式／特種紙信封，500 個起訂，即日交貨',""",
     """    // 2026-08-22 v3.13 T18: envelopes CTR 修复
    featuredSnippet: '信封印刷訂製 100 個起：婚禮邀請/商務/節日信封, 免費打樣確認, 120g-300g 紙張可選, 燙金/壓凸/UV 加工, 3 個工作天. HK$1.5/個起.',
    lastUpdated: '2026-08-22',
    h2: '信封 / 信封印刷 / 邀請函信封 / 商務信封 — 100 個起, 免費打樣, 即日特急',"""),
    ("""    h2: 'Envelope Printing — Western / Chinese / Specialty Paper, From 500 pcs, Same-Day Delivery',""",
     """    // 2026-08-22 v3.13 T18: envelopes CTR fix
    featuredSnippet: 'Custom envelope printing from 100 pcs: wedding invitations, business, greeting cards. Free proof before print, foil/emboss/UV available. 120-300gsm paper, 3 business day turnaround.',
    lastUpdated: '2026-08-22',
    h2: 'Envelope Printing / Custom Envelopes / Wedding Invitation Envelopes / Business Envelopes — From 100 pcs, Free Proof, Same-Day Rush',"""),
    ("""    h2: '封筒印刷 — 洋形／中式／特殊紙、500枚から、即日納品',""",
     """    // 2026-08-22 v3.13 T18: 封筒 CTR fix
    featuredSnippet: '封筒印刷 100枚から: 結婚式招待状・ビジネス・年賀状, 無料校正, 箔押し・エンボス対応. 120-300gsm 用紙, 3営業日納期.',
    lastUpdated: '2026-08-22',
    h2: '封筒印刷 / 封筒 オーダーメイド / 招待状封筒 / ビジネス封筒 — 100枚から, 無料校正, 即日特急',"""),
    ("""    h2: '香港餐牌印刷 — 防水防油，PVC／過膠／硬膠，餐廳 Menu 專家',""",
     """    // 2026-08-22 v3.13 T19: 餐牌 Pillar 加厚
    featuredSnippet: '餐牌印刷訂製 100 張起：A3/A4 過膠餐牌/枱卡/牆掛菜單, 防水防油, 3 個工作天. 餐廳/カフェ/外賣適用. HK$15/張起.',
    lastUpdated: '2026-08-22',
    h2: '餐牌 / 餐牌印刷 / 菜單印刷 / 過膠餐牌 / 膠卡餐牌 / 膠片餐牌 — 防水防油, 100 張起, 即日特急',"""),
    ("""    h2: 'Menu Printing — Waterproof & Oil-Resistant, PVC / Laminated / Hard Plastic, Restaurant Menu Specialists',""",
     """    // 2026-08-22 v3.13 T19: Menu Pillar
    featuredSnippet: 'Menu printing from 100 pcs: A3/A4 laminated menus, table cards, wall posters, waterproof & oil-resistant. 3 business day turnaround. Restaurant/cafe/takeout.',
    lastUpdated: '2026-08-22',
    h2: 'Menu Printing / Restaurant Menus / Laminated Menus / Table Cards / PVC Menus / Waterproof Menus — From 100 pcs, Same-Day Rush',"""),
    ("""    h2: '封筒印刷 — 洋形／中式／特殊紙、500枚から、即日納品',""",  # ja templates - 实际有 2 个封筒 (T18 ja + T20 ja 都是 redPackets 相关)
     # 跳过避免重复
     """),
]

# 先跳过 ja T18 (跟 上面 ja h2 一样) + 看 ja T19/T20 实际 h2
# 实际 ja T19 是 メニュー
# 让我用更简单方法: 逐个 search + 替换
applied = 0
for old, new in T18_FIXES:
    if old and new and old in txt:
        txt = txt.replace(old, new, 1)
        applied += 1
    elif old and not new:
        pass  # 跳过
C.write_text(txt, encoding="utf-8")
print(f"Applied: {applied}/{len([x for x in T18_FIXES if x[1]])}")
