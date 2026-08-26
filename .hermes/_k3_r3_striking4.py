#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 R3 striking 4 词五件套 (2026-08-19 备好等拍板)
1. 即日印刷 (zh-hk) - services/rush-printing-delivery
2. 餐牌印刷 (zh-hk) - category/menus
3. 両面カラー印刷 (ja) - category/menus (ja 通用)
4. 月曆印刷 (zh-hk) - category/calendars

5 件套:
- 答案前置 60-150 词 (✓ category h2 段; rush service 已有 GEO 答案块)
- 40-60 字答案块争 position 0 (★ 本脚本注入)
- FAQPage (✓ category-seo-content.ts faq; rush service RushDeliveryFAQ)
- 内链 (✓ 来自 CategorySidebar 自动)
- Last updated 时间戳 (★ 本脚本注入)
"""
import os, re, json

CATEGORY_SEO = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
RUSH_PAGE = r"F:\zprintpro-nextjs\src\app\[locale]\services\rush-printing-delivery\page.tsx"

# ============================================================
# 1) 餐牌印刷 (zh-hk) - menusContent
# 2) 月曆印刷 (zh-hk) - calendarsContent (找一下)
# 3) 両面カラー印刷 (ja) - menusContent ja 或 calendarsContent ja
# ============================================================

# 找 calendarsContent 起始
with open(CATEGORY_SEO, "r", encoding="utf-8") as f:
    src = f.read()

# --- 餐牌印刷 zh-hk 注入 ---
zh_menus_snippet = """  'zh-hk': {
    h2: '香港餐牌印刷 — 防水防油，PVC／過膠／硬膠，餐廳 Menu 專家',"""

zh_menus_replacement = """  'zh-hk': {
    // 2026-08-19 R3 餐牌印刷 5 件套
    featuredSnippet: '餐牌印刷 10 份起，防水 PVC HK$3.5/份，最快即日交貨，順豐滿 HK$500 免運。',
    lastUpdated: '2026-08-19',
    h2: '香港餐牌印刷 — 防水防油，PVC／過膠／硬膠，餐廳 Menu 專家',"""

if zh_menus_replacement in src:
    print("[SKIP] 餐牌印刷 zh-hk already has 5 件套")
elif zh_menus_snippet in src:
    src = src.replace(zh_menus_snippet, zh_menus_replacement, 1)
    print("[OK] 餐牌印刷 zh-hk 5 件套 injected")
else:
    print("[WARN] 餐牌印刷 zh-hk anchor not found")

# --- 月曆印刷 zh-hk 注入 ---
# 找 calendarsContent 的 zh-hk h2
calendars_zh_pattern = re.compile(r"(// [^\n]*CALENDARS[^\n]*\n// =+\nconst calendarsContent:[\s\S]*?'zh-hk': \{\s*\n\s*h2: '[^']+',)")
calendars_zh_match = calendars_zh_pattern.search(src)

if calendars_zh_match:
    block = calendars_zh_match.group(1)
    if "featuredSnippet" in block:
        print("[SKIP] 月曆印刷 zh-hk already has 5 件套")
    else:
        new_block = block.replace(
            "'zh-hk': {\n    h2:",
            "'zh-hk': {\n    // 2026-08-19 R3 月曆印刷 5 件套\n    featuredSnippet: '月曆印刷 100 本起，掛曆 HK$18/本，檯曆 HK$9/本，9 月開學季企業定制起量。',\n    lastUpdated: '2026-08-19',\n    h2:",
            1
        )
        # 通用替换
        new_block = re.sub(
            r"('zh-hk': \{\s*\n)\s*(h2:)",
            r"\1    // 2026-08-19 R3 月曆印刷 5 件套\n    featuredSnippet: '月曆印刷 100 本起，掛曆 HK$18/本，檯曆 HK$9/本，9 月開學季企業定制起量。',\n    lastUpdated: '2026-08-19',\n    \2",
            new_block,
            count=1
        )
        src = src.replace(block, new_block, 1)
        print("[OK] 月曆印刷 zh-hk 5 件套 injected")
else:
    print("[WARN] 月曆印刷 zh-hk anchor not found")

# --- 両面カラー印刷 (ja) 注入 ---
# 找 calendarsContent ja 段
calendars_ja_pattern = re.compile(r"(const calendarsContent:[\s\S]*?'ja': \{\s*\n\s*h2: '[^']+',)")
calendars_ja_match = calendars_ja_pattern.search(src)

if calendars_ja_match:
    block = calendars_ja_match.group(1)
    if "featuredSnippet" in block and "両面" in block:
        print("[SKIP] 両面カラー印刷 ja already has 5 件套")
    else:
        new_block = re.sub(
            r"('ja': \{\s*\n)\s*(h2:)",
            r"\1    // 2026-08-19 R3 両面カラー印刷 5 件套\n    featuredSnippet: '両面カラー印刷 100 枚〜、4C CMYK 標準対応、A4 ¥12〜、小ロット 1 日特急。',\n    lastUpdated: '2026-08-19',\n    \2",
            block,
            count=1
        )
        src = src.replace(block, new_block, 1)
        print("[OK] 両面カラー印刷 ja 5 件套 injected")
else:
    print("[WARN] 両面カラー印刷 ja anchor not found")

# 写回
with open(CATEGORY_SEO, "w", encoding="utf-8") as f:
    f.write(src)

# ============================================================
# 即日印刷 (zh-hk) - services/rush-printing-delivery/page.tsx
# 注入 40-60 字 Featured Snippet + Last Updated
# ============================================================
with open(RUSH_PAGE, "r", encoding="utf-8") as f:
    rush_src = f.read()

# Anchor: GEO 答案块上方
rush_anchor_zh = """      {/* GEO 答案块 */}
      <section className=\"mb-4\">
        <h1 className=\"text-3xl md:text-4xl font-bold text-gray-900 mb-2\">{title}</h1>"""

rush_replacement_zh = """      {/* GEO 答案块 */}
      <section className=\"mb-4\">
        <h1 className=\"text-3xl md:text-4xl font-bold text-gray-900 mb-2\">{title}</h1>
        {/* 2026-08-19 R3 即日印刷 5 件套 - 40-60 字 Featured Snippet 块 */}
        <p className=\"text-base md:text-lg text-[#1A56DB] font-medium bg-[#F0F7FF] border-l-4 border-[#2873F5] px-4 py-3 mb-4 rounded-r\">
          <strong>即日印刷 18:00 截單，順豐翌日中午 12 點前到；傳單／海報／貼紙／紙袋／畫冊 100 張起印，CMYK 全彩防水。</strong>
        </p>"""

if rush_replacement_zh in rush_src:
    print("[SKIP] 即日印刷 zh-hk already has 5 件套")
elif rush_anchor_zh in rush_src:
    rush_src = rush_src.replace(rush_anchor_zh, rush_replacement_zh, 1)
    print("[OK] 即日印刷 zh-hk 5 件套 snippet injected")
else:
    print("[WARN] 即日印刷 zh-hk anchor not found")

# Anchor: 末尾 </main> 前加 Last Updated
rush_footer_anchor = """      {/* FAQ */}
      <RushDeliveryFAQ locale={locale} />
    </main>"""

rush_footer_replacement = """      {/* FAQ */}
      <RushDeliveryFAQ locale={locale} />

      {/* 2026-08-19 R3 即日印刷 5 件套 - Last Updated + 内部链接 */}
      <section className=\"mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500\">
        <p className=\"mb-3\"><strong>最後更新：</strong>2026 年 8 月 19 日 · 智印港 ZprintPro（彩龍印刷旗下）</p>
        <p className=\"mb-2\"><strong>相關服務：</strong></p>
        <ul className=\"space-y-1 list-disc list-inside\">
          <li><a href=\"/zh-hk/category/posters/\" className=\"text-[#2873F5] hover:underline\">海報印刷</a> · A1/A2 即日速遞，順豐港九新界翌日中午到</li>
          <li><a href=\"/zh-hk/category/flyers/\" className=\"text-[#2873F5] hover:underline\">傳單印刷</a> · A4/A5 100 張起印，即日截單翌日達</li>
          <li><a href=\"/zh-hk/category/stickers/\" className=\"text-[#2873F5] hover:underline\">貼紙印刷</a> · 防水 Vinyl 50 張起，連工藝完成 24 小時</li>
          <li><a href=\"/zh-hk/category/paper-bags/\" className=\"text-[#2873F5] hover:underline\">紙袋印刷</a> · 100 個起，活動 / 展會批量趕工</li>
          <li><a href=\"/zh-hk/category/calendars/\" className=\"text-[#2873F5] hover:underline\">月曆印刷</a> · 2027 掛曆 9 月開學季企業定制起量</li>
        </ul>
      </section>
    </main>"""

if rush_footer_replacement in rush_src:
    print("[SKIP] 即日印刷 zh-hk already has footer + last updated")
elif rush_footer_anchor in rush_src:
    rush_src = rush_src.replace(rush_footer_anchor, rush_footer_replacement, 1)
    print("[OK] 即日印刷 zh-hk footer + last updated + 内部链接 injected")
else:
    print("[WARN] 即日印刷 zh-hk footer anchor not found")

# 写回
with open(RUSH_PAGE, "w", encoding="utf-8") as f:
    f.write(rush_src)

# ============================================================
# 输出文件大小
# ============================================================
print(f"\n=== R3 完成 ===")
print(f"  category-seo-content.ts: {os.path.getsize(CATEGORY_SEO):,} bytes")
print(f"  rush-printing-delivery/page.tsx: {os.path.getsize(RUSH_PAGE):,} bytes")
