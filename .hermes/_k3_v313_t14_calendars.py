#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.13 T14: calendars 月曆 Pillar 3 locale 加厚 (5 词对齐 + 2027 时效 + 5 FAQ)"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

# zh-hk: 加 h2 5 词 + 5 FAQ + 改 featuredSnippet + 改 lastUpdated
fixes = [
    # T14 zh-hk: 改 h2 加 4 词 + 改 lastUpdated
    ("""  'zh-hk': {
    // 2026-08-19 R3 月曆印刷 5 件套
    featuredSnippet: '月曆印刷 100 本起，掛曆 HK$18/本，檯曆 HK$9/本，9 月開學季企業定制起量。',
    lastUpdated: '2026-08-19',
    h2: '香港月曆印刷 — 座枱曆／掛牆曆／年曆卡，50 本起訂，節日促銷必備',""",
     """  'zh-hk': {
    // 2026-08-21 v3.13 T14: 月曆 5 词对齐 + 2027 时效 + 5 FAQ (季节窗最急)
    featuredSnippet: '月曆印刷 100 本起訂製, 2027 年曆 9 月早鳥, 掛曆 HK$18/本、檯曆 HK$9/本、年曆卡 HK$3/張。免費設計 + 燙金封面, DHL 全球 2-4 天。',
    lastUpdated: '2026-08-21',
    h2: '月曆印刷 / 月曆訂製 / 訂制月曆 / 印月曆 / 2027 月曆 — 座枱曆/掛牆曆/年曆卡 100 本起訂, 企業禮品 9 月旺季前夜',"""),
    # T14 en: 改 h2 4 词 + featuredSnippet + lastUpdated
    ("""  en: {
    featuredSnippet: 'Calendar printing from 100 pcs, 2027 calendars ready Sep, wall US$2.30/pc, desk US$1.15/pc, card US$0.40/pc. Free design + foil cover, DHL global 2-4 day delivery.',
    lastUpdated: '2026-08-19',
    h2: 'Calendar Printing — Desk / Wall / Card Calendars, From 50 pcs, Holiday Promotions Essential',""",
     """  en: {
    // 2026-08-21 v3.13 T14: 5 词对齐 + 2027 时效
    featuredSnippet: 'Calendar printing from 100 pcs, 2027 calendars ready Sep, wall US$2.30/pc, desk US$1.15/pc, card US$0.40/pc. Free design + foil cover, DHL global 2-4 day delivery.',
    lastUpdated: '2026-08-21',
    h2: 'Calendar Printing / Custom Calendars / Print Calendars / 2027 Calendars / Wall Calendars — Desk/Wall/Card From 100 pcs, Corporate Gifting Sep 9-11 Peak Season',"""),
    # T14 ja
    ("""  ja: {
    featuredSnippet: 'カレンダー印刷 100冊から, 2027年カレンダー 9月先行, 壁掛け ¥270/冊, 卓上 ¥135/冊, カード ¥45/枚. 無料デザイン + 箔押し表紙, DHL グローバル 2-4日配送.',
    lastUpdated: '2026-08-19',
    h2: 'カレンダー印刷 — 卓上／壁掛け／カード、50冊から、季節プロモーション必須',""",
     """  ja: {
    // 2026-08-21 v3.13 T14: 5 词对齐 + 2027 时效
    featuredSnippet: 'カレンダー印刷 100冊から, 2027年カレンダー 9月先行, 壁掛け ¥270/冊, 卓上 ¥135/冊, カード ¥45/枚. 無料デザイン + 箔押し表紙, DHL グローバル 2-4日配送.',
    lastUpdated: '2026-08-21',
    h2: 'カレンダー印刷 / カレンダー オーダーメイド / 2027年カレンダー / 卓上カレンダー / 壁掛けカレンダー — 卓上/壁掛け/カード 100冊から, 企業ギフト 9-11月繁忙期前夜',"""),
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
