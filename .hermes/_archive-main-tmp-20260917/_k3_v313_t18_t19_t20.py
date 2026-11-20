#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.13 Commit 2: T18 envelopes + T19 menus + T20 red-packets Pillar 3 locale 批量改"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

# T18 envelopes CTR 修复 3 locale
T18_FIXES = [
    ("""  'zh-hk': {
    h2: '香港信封印刷 — 西式／中式／特種紙信封，500 個起訂，即日交貨',""",
     """  'zh-hk': {
    // 2026-08-22 v3.13 T18: envelopes CTR 修复 (pos 1-2.6 但 0 click = 改 snippet 触发)
    featuredSnippet: '信封印刷訂製 100 個起：婚禮邀請/商務/節日信封, 免費打樣確認, 120g-300g 紙張可選, 燙金/壓凸/UV 加工, 3 個工作天. HK$1.5/個起.',
    lastUpdated: '2026-08-22',
    h2: '信封 / 信封印刷 / 邀請函信封 / 商務信封 — 100 個起, 免費打樣, 即日特急',"""),
    ("""  en: {
    h2: 'Envelope Printing — Western / Chinese / Specialty Paper, From 500 pcs, Same-Day Delivery',""",
     """  en: {
    // 2026-08-22 v3.13 T18: envelopes CTR fix (pos 1-2.6 but 0 click)
    featuredSnippet: 'Custom envelope printing from 100 pcs: wedding invitations, business, greeting cards. Free proof before print, foil/emboss/UV available. 120-300gsm paper, 3 business day turnaround.',
    lastUpdated: '2026-08-22',
    h2: 'Envelope Printing / Custom Envelopes / Wedding Invitation Envelopes / Business Envelopes — From 100 pcs, Free Proof, Same-Day Rush',"""),
    ("""  ja: {
    h2: '封筒印刷 — 洋形／中式／特殊紙、500枚から、即日納品',""",
     """  ja: {
    // 2026-08-22 v3.13 T18: 封筒 CTR fix
    featuredSnippet: '封筒印刷 100枚から: 結婚式招待状・ビジネス・年賀状, 無料校正, 箔押し・エンボス対応. 120-300gsm 用紙, 3営業日納期.',
    lastUpdated: '2026-08-22',
    h2: '封筒印刷 / 封筒 オーダーメイド / 招待状封筒 / ビジネス封筒 — 100枚から, 無料校正, 即日特急',"""),
]

# T19 menus 餐牌 3 locale
T19_FIXES = [
    ("""  'zh-hk': {
    h2: '香港餐牌印刷 — 過膠餐牌／枱卡／牆掛菜單，100 張起訂，防水耐用',""",
     """  'zh-hk': {
    // 2026-08-22 v3.13 T19: 餐牌 Pillar 加厚 + 5 FAQ
    featuredSnippet: '餐牌印刷訂製 100 張起：A3/A4 過膠餐牌/枱卡/牆掛菜單, 防水防油, 3 個工作天. 餐廳/カフェ/外賣適用. HK$15/張起.',
    lastUpdated: '2026-08-22',
    h2: '餐牌 / 餐牌印刷 / 菜單印刷 / 過膠餐牌 / 膠卡餐牌 / 膠片餐牌 — 防水防油, 100 張起, 即日特急',"""),
    ("""  en: {
    h2: 'Menu Printing — Laminated Menus / Table Cards / Wall Posters, From 100 pcs, Waterproof',""",
     """  en: {
    // 2026-08-22 v3.13 T19: Menu Pillar
    featuredSnippet: 'Menu printing from 100 pcs: A3/A4 laminated menus, table cards, wall posters, waterproof & oil-resistant. 3 business day turnaround. Restaurant/cafe/takeout.',
    lastUpdated: '2026-08-22',
    h2: 'Menu Printing / Restaurant Menus / Laminated Menus / Table Cards / PVC Menus / Waterproof Menus — From 100 pcs, Same-Day Rush',"""),
    ("""  ja: {
    h2: 'メニュー印刷 — 防水／耐油／テーブルカード, 100枚から, レストラン/カフェ対応',""",
     """  ja: {
    // 2026-08-22 v3.13 T19: メニュー Pillar
    featuredSnippet: 'メニュー印刷 100枚から：A3/A4 防水・耐油 メニュー/テーブルカード/壁掛けメニュー, 3営業日納期. レストラン/カフェ/テイクアウト対応.',
    lastUpdated: '2026-08-22',
    h2: 'メニュー印刷 / レストランメニュー / 防水メニュー / テーブルカード / カフェメニュー — 100枚から, 即日特急',"""),
]

# T20 red-packets 利是封 CNY 3 locale (e-print HK$160 事实锚)
T20_FIXES = [
    ("""  'zh-hk': {
    h2: '香港利是封印刷 — 燙金／壓凸／UV，500 個起訂，CNY 企業禮品首選',""",
     """  'zh-hk': {
    // 2026-08-22 v3.13 T20: 利是封 CNY 备货 (e-print HK$160/100 事实锚, 我方 HK$1.2/個@1000)
    featuredSnippet: '利是封印刷訂製 100 個起：燙金/燙銀/壓凸/UV, 120g-300g 紅卡, 企業 LOGO 客製, HK$1.2/個起 (1000 個), 3 個工作天. 11 月前落單享早鳥價. 對比 e-print HK$1.6/個 (100 個), 企業批量更平.',
    lastUpdated: '2026-08-22',
    h2: '利是封 / 利是封印刷 / 利是封訂製 / 紅包袋 / 訂製利是封 — 燙金燙銀, 100 個起, 企業 LOGO 客製, 11 月早鳥',"""),
    ("""  en: {
    h2: 'Red Packet Printing — Foil Stamping / Embossing / UV, 500 pcs MOQ, CNY Corporate Gifting',""",
     """  en: {
    // 2026-08-22 v3.13 T20: Red Packet CNY
    featuredSnippet: 'Custom red packet printing from 100 pcs: foil stamping, embossing, UV. Corporate logo red envelopes from US$0.15/pc at 1,000 pcs. CNY 2027 (Feb 6) order by November for early-bird pricing.',
    lastUpdated: '2026-08-22',
    h2: 'Red Packet Printing / Custom Red Packets / Chinese New Year Envelopes / Foil Stamped Red Packets — From 100 pcs, Corporate Logo, CNY 2027 Early-Bird',"""),
    ("""  ja: {
    h2: '紅包袋（祝儀袋）印刷 — 箔押し／エンボス／UV, 500枚から, 春節企業ギフト',""",
     """  ja: {
    // 2026-08-22 v3.13 T20: 紅包袋 春節
    featuredSnippet: '紅包袋（祝儀袋）印刷 100枚から：箔押し・エンボス・UV, 企業ロゴ対応, 1枚 ¥20 から(1,000枚). 2027年春節（2/6）11月前発注で早鳥特典.',
    lastUpdated: '2026-08-22',
    h2: '紅包袋印刷 / 祝儀袋 / 箔押し紅包 / 企業ロゴ紅包 — 100枚から, 春節2027早鳥, 企業ギフト',"""),
]

all_fixes = T18_FIXES + T19_FIXES + T20_FIXES
applied = 0
for old, new in all_fixes:
    if old in txt:
        txt = txt.replace(old, new, 1)
        applied += 1
    else:
        print(f"  WARN: not found")
C.write_text(txt, encoding="utf-8")
print(f"Applied: {applied}/{len(all_fixes)} (T18 + T19 + T20 = 9 Pillar 3 locale)")
