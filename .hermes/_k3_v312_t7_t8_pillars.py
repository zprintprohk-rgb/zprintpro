#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 v3.12 Session 2: T7 海报 Pillar + T8 贴纸 Pillar (3 locale 加 featuredSnippet + h2 + lastUpdated)
"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

# T7: postersContent L3461
# 当前 zh-hk h2 缺 "印海報" / "海報印刷" / "poster 印刷" / "a3海報大小"
POSTERS_OLD = """  'zh-hk': {
    h2: '海報印刷 — 100 個起印, A0-A3 全尺寸, 同日特急可選',"""

POSTERS_NEW = """  'zh-hk': {
    featuredSnippet: '海報印刷 A2 100 張起, 128g 銅版紙 HK$6-9/張, A1 HK$10-16/張, 500 張再減 30%, 1,000 張以上轉柯式再降 40%。3-5 個工作天交期, DHL 全球 2-4 天。',
    lastUpdated: '2026-08-21',
    h2: '印海報 / 海報印刷 / poster 印刷 / a3海報大小 — A0-A3 全尺寸 100 張起印, 同日特急可選',"""

# T7 en
POSTERS_EN_OLD = """  en: {
    h2: 'Poster Printing — From 10 pcs, A0-A3 Sizes, Same-Day Rush Available',"""

POSTERS_EN_NEW = """  en: {
    featuredSnippet: 'Poster printing from 10 pcs: A2 US$0.80-1.20 each, A1 US$1.30-2.10 each at 100 pcs, 500+ saves 30%, 1,000+ offset drops 40% more. 3-5 business day turnaround, DHL global 2-4 days.',
    lastUpdated: '2026-08-21',
    h2: 'Print Posters / Poster Printing / Poster Print / a3 poster size — A0-A3 Full Sizes From 10 pcs, Same-Day Rush Available',"""

# T7 ja
POSTERS_JA_OLD = """  ja: {
    h2: 'ポスター印刷 — 10枚から, A0-A3 全サイズ, 即日特急対応',"""

POSTERS_JA_NEW = """  ja: {
    featuredSnippet: 'ポスター印刷 10枚から: A2 ¥100-150/枚, A1 ¥170-260/枚 (100枚時), 500枚で 30% OFF, 1,000枚以上はオフセットでさらに 40% 削減。3-5 営業日納期, DHL グローバル 2-4日。',
    lastUpdated: '2026-08-21',
    h2: 'ポスター 印刷 / ポスター 印刷 費用 / ポスター プリント / a3 ポスター サイズ — A0-A3 全サイズ 10枚から, 即日特急対応',"""

# T8: stickersContent L2859 zh-hk
STICKERS_ZHHK_OLD = """  'zh-hk': {
    h2: '貼紙印刷 — 50 個起印, 防水啞光可選, 5-7 天交期',"""

STICKERS_ZHHK_NEW = """  'zh-hk': {
    featuredSnippet: '貼紙印刷 50 個起, 防水啞光 HK$0.45/張起, 戶外貼紙 100 個起, 可移貼紙 100 個起, 5-7 天交期, DHL 全球 2-4 天。',
    lastUpdated: '2026-08-21',
    h2: '貼紙印刷 / 戶外貼紙 / 防水貼紙 / 可移貼紙 — 50 個起印 5-7 天交期',"""

# T8 en
STICKERS_EN_OLD = """  en: {
    h2: 'Custom Stickers & Labels — From 50 pcs, Waterproof Matte Options, 5-7 Day Turnaround',"""

STICKERS_EN_NEW = """  en: {
    featuredSnippet: 'Custom stickers from 50 pcs, waterproof matte from US$0.06 each, outdoor vinyl stickers 100 pcs MOQ, removable stickers 100 pcs MOQ, 5-7 day production, DHL global 2-4 days.',
    lastUpdated: '2026-08-21',
    h2: 'Custom Stickers / Outdoor Stickers / Waterproof Stickers / Removable Stickers — From 50 pcs, 5-7 Day Turnaround',"""

# T8 ja
STICKERS_JA_OLD = """  ja: {
    h2: 'オリジナルステッカー印刷 — 50枚から, 防水マット選択可, 5-7日納期',"""

STICKERS_JA_NEW = """  ja: {
    featuredSnippet: 'ステッカー印刷 50枚から, 防水マット 1枚 ¥7 から, 屋外ステッカー 100枚から, 剥がせるステッカー 100枚から, 5-7日納期, DHL グローバル 2-4日。',
    lastUpdated: '2026-08-21',
    h2: 'ステッカー 印刷 / 屋外 ステッカー / 防水ステッカー / 剥がせるステッカー — 50枚から 5-7日納期',"""

changes = []
for old, new, name in [
    (POSTERS_OLD, POSTERS_NEW, "T7-zh-hk"),
    (POSTERS_EN_OLD, POSTERS_EN_NEW, "T7-en"),
    (POSTERS_JA_OLD, POSTERS_JA_NEW, "T7-ja"),
    (STICKERS_ZHHK_OLD, STICKERS_ZHHK_NEW, "T8-zh-hk"),
    (STICKERS_EN_OLD, STICKERS_EN_NEW, "T8-en"),
    (STICKERS_JA_OLD, STICKERS_JA_NEW, "T8-ja"),
]:
    if old in txt:
        txt = txt.replace(old, new, 1)
        changes.append(name)
    else:
        print(f"  WARN: {name} old_string not found")

C.write_text(txt, encoding="utf-8")
print(f"Applied: {changes}")
print(f"Total changes: {len(changes)}/6")
