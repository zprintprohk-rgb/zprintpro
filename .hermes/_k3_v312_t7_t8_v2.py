#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""T7+T8 Pillar v2: 用实际 h2 字符串"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

# T7 postersContent
fixes = [
    # T7 zh-hk
    ("""const postersContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港海報印刷 — A2/A1/A0 大圖輸出，防水防 UV，牆身貼紙專家',""",
     """const postersContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    featuredSnippet: '海報印刷 A2 100 張起, 128g 銅版紙 HK$6-9/張, A1 HK$10-16/張, 500 張再減 30%, 1,000 張以上轉柯式再降 40%。3-5 個工作天交期, DHL 全球 2-4 天。',
    lastUpdated: '2026-08-21',
    h2: '印海報 / 海報印刷 / poster 印刷 / a3海報大小 — A0-A3 全尺寸 100 張起印, 同日特急可選',"""),
    # T8 zh-hk
    ("""const stickersContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港貼紙印刷 — 防水／透明／燙金貼紙，50 張起訂，即日交貨',""",
     """const stickersContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    featuredSnippet: '貼紙印刷 50 個起, 防水啞光 HK$0.45/張起, 戶外貼紙 100 個起, 可移貼紙 100 個起, 5-7 天交期, DHL 全球 2-4 天。',
    lastUpdated: '2026-08-21',
    h2: '貼紙印刷 / 戶外貼紙 / 防水貼紙 / 可移貼紙 — 50 個起印 5-7 天交期',"""),
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
