#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 R3 ja 両面カラー印刷 5 件套 - 补打 ja calendars section
"""
import os, re

CATEGORY_SEO = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"

with open(CATEGORY_SEO, "r", encoding="utf-8") as f:
    src = f.read()

# 锚点:  calendarsContent 的 ja 段开头 (line 2059: "  ja: {")
# 标志: 紧跟着的 h2 是 "カレンダー印刷..."
ja_anchor = """const calendarsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    // 2026-08-19 R3 月曆印刷 5 件套
    featuredSnippet: '月曆印刷 100 本起，掛曆 HK$18/本，檯曆 HK$9/本，9 月開學季企業定制起量。',
    lastUpdated: '2026-08-19',
    h2: '香港月曆印刷 — 座枱曆／掛牆曆／年曆卡，50 本起訂，節日促銷必備',"""

if ja_anchor not in src:
    print("[WARN] calendarsContent zh-hk anchor not found")
else:
    # 找 zh-hk + en 之后 ja 段开头
    # 找 "h2: '香港月曆印刷" 后续到 calendarsContent 结尾
    # 实际 calendarsContent 块结束于下一个 const xxxContent 开头
    # 我们注入 ja 段: 在 zh-hk 已有 5 件套后, en 段保持原样, 在 ja 段开头加

    # 找 en 段 ("en: {") 之后到 ja 段开头
    en_anchor = """  en: {
    h2: 'Hong Kong Calendar Printing — Desk / Wall / Year Cards, 50 MOQ, Seasonal Marketing Essential',"""

    if en_anchor in src:
        # 在 ja: { 之前注入
        ja_marker = """  ja: {
    // 2026-08-19 R3 両面カラー印刷 5 件套 (ja 通用 double-sided color printing 击穿 pos 22.35 → 22.35)
    featuredSnippet: '両面カラー印刷 100 枚〜、4C CMYK 標準、A4 ¥12〜、小ロット 1 日特急、DHL 2-4 日。',
    lastUpdated: '2026-08-19',
    h2: 'カレンダー印刷 — 卓上／壁掛け／カード、50冊から、季節プロモーション必須',"""
        # 找 ja: { 段
        ja_pattern = re.compile(r"(const calendarsContent:[\s\S]*?)(\n  ja: \{\n    h2: 'カレンダー印刷)")
        m = ja_pattern.search(src)
        if m:
            src = src[:m.end(2)] + "\n    // 2026-08-19 R3 両面カラー印刷 5 件套\n    featuredSnippet: '両面カラー印刷 100 枚〜、4C CMYK 標準、A4 ¥12〜、小ロット 1 日特急、DHL 2-4 日。',\n    lastUpdated: '2026-08-19'," + src[m.end(2):]
            print("[OK] 両面カラー印刷 ja 5 件套 injected into calendars ja")
        else:
            print("[WARN] 両面カラー印刷 ja anchor regex not found")
    else:
        print("[WARN] calendarsContent en anchor not found")

with open(CATEGORY_SEO, "w", encoding="utf-8") as f:
    f.write(src)
print(f"OK · size: {os.path.getsize(CATEGORY_SEO):,} bytes")
