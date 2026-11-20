#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.13 T14 残留: zh-hk/ja blog 尺寸段 + en/ja FAQ 注入"""
import json
from pathlib import Path

BLOG_DIR = Path(r"F:\zprintpro-nextjs\src\data\blog-data")

# zh-hk blog calendar-printing-guide 加 2027 尺寸段
ZH_SECTION = """<div class=\"bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-5 my-6 rounded-r-lg\">
<h3 class=\"text-lg font-bold text-[#333333] mb-3\">📏 2027 月曆印刷 尺寸 / 規格 全表</h3>
<table class=\"w-full text-sm border-collapse my-4\"><thead><tr class=\"bg-gray-100\"><th class=\"border p-2 text-left\">類型</th><th class=\"border p-2 text-left\">標準尺寸 (mm)</th><th class=\"border p-2 text-left\">頁數</th><th class=\"border p-2 text-left\">起印量</th></tr></thead><tbody>
<tr><td class=\"border p-2\">掛牆月曆 (大)</td><td class=\"border p-2\">A2 420×594</td><td class=\"border p-2\">13 頁 + 封面</td><td class=\"border p-2\">50 本</td></tr>
<tr><td class=\"border p-2\">掛牆月曆 (標準)</td><td class=\"border p-2\">A3 297×420</td><td class=\"border p-2\">7 頁 + 封面</td><td class=\"border p-2\">50 本</td></tr>
<tr><td class=\"border p-2\">座枱月曆 (三角)</td><td class=\"border p-2\">A5 148×210</td><td class=\"border p-2\">13 頁 + 三角座</td><td class=\"border p-2\">50 本</td></tr>
<tr><td class=\"border p-2\">年曆卡 (細)</td><td class=\"border p-2\">85×140 (卡片)</td><td class=\"border p-2\">12 頁 + 磁貼</td><td class=\"border p-2\">100 張</td></tr>
</tbody></table>
<p class=\"text-sm text-gray-700 mt-3\">📅 <strong>2027 月曆採購時間線:</strong> 8-10 月落單 → 9-12 月交貨。500 本以上柯式更平, 免費設計。 <a href=\"/zh-hk/quote/\" class=\"text-[#1A56DB] underline font-medium\">立即 30 秒 AI 報價 →</a></p>
<p class=\"text-xs text-gray-500 mt-3\">最後更新: 2026-08-21 · 智印港 ZprintPro · DHL 全球 2-4 天</p>
</div>"""

# ja blog calendar-printing-guide 加 2027 尺寸段
JA_SECTION = """<div class=\"bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-5 my-6 rounded-r-lg\">
<h3 class=\"text-lg font-bold text-[#333333] mb-3\">📏 2027年カレンダー印刷 サイズ / 仕様 全表</h3>
<table class=\"w-full text-sm border-collapse my-4\"><thead><tr class=\"bg-gray-100\"><th class=\"border p-2 text-left\">タイプ</th><th class=\"border p-2 text-left\">標準サイズ (mm)</th><th class=\"border p-2 text-left\">ページ数</th><th class=\"border p-2 text-left\">MOQ</th></tr></thead><tbody>
<tr><td class=\"border p-2\">壁掛けカレンダー (大)</td><td class=\"border p-2\">A2 420×594</td><td class=\"border p-2\">13 ページ + 表紙</td><td class=\"border p-2\">50 冊</td></tr>
<tr><td class=\"border p-2\">壁掛けカレンダー (標準)</td><td class=\"border p-2\">A3 297×420</td><td class=\"border p-2\">7 ページ + 表紙</td><td class=\"border p-2\">50 冊</td></tr>
<tr><td class=\"border p-2\">卓上カレンダー (三角)</td><td class=\"border p-2\">A5 148×210</td><td class=\"border p-2\">13 ページ + 三角スタンド</td><td class=\"border p-2\">50 冊</td></tr>
<tr><td class=\"border p-2\">ミニカレンダー (配布用)</td><td class=\"border p-2\">85×140 (カード)</td><td class=\"border p-2\">12 ページ + マグネット</td><td class=\"border p-2\">100 枚</td></tr>
</tbody></table>
<p class=\"text-sm text-gray-700 mt-3\">📅 <strong>2027年カレンダー 発注タイミング:</strong> 8-10 月発注 → 9-12 月納品。500 冊以上はオフセット印刷でさらに 40% コスト削減、無料デザイン。 <a href=\"/ja/quote/\" class=\"text-[#1A56DB] underline font-medium\">30秒 AI 見積もり →</a></p>
<p class=\"text-xs text-gray-500 mt-3\">最終更新: 2026-08-21 · ジープリント ZprintPro · DHL グローバル 2-4日</p>
</div>"""

# en/ja blog 末尾 FAQ 注入
EN_FAQ = """<div class=\"bg-gray-50 rounded-lg p-4 my-4 space-y-3\">
<p><strong>Q: What is the typical calendar size for 2027 wall calendars?</strong><br/>A: Standard wall calendar dimensions are A3 (297×420mm) for the most common US small business format, and A2 (420×594mm) for larger in-store / restaurant presence. Both are 1.5-2x the impression zone of a desk calendar.</p>
<p><strong>Q: How many pages can a saddle-stitch calendar have?</strong><br/>A: Saddle-stitch calendars must have page counts in multiples of 4 (8, 12, 16, ..., 64 pages). Beyond 64 pages, switch to perfect binding for durability.</p>
<p><strong>Q: Can I add foil stamping to the 2027 calendar cover?</strong><br/>A: Yes. Foil stamping (gold/silver/rose gold) on the cover or monthly pages adds US$0.06-0.20 per book, 100-book MOQ, 2-3 day rush available.</p>
</div>"""

JA_FAQ = """<div class=\"bg-gray-50 rounded-lg p-4 my-4 space-y-3\">
<p><strong>Q: 2027年カレンダー印刷 典型的なサイズは？</strong><br/>A: 壁掛けカレンダーの標準サイズは A3 (297×420mm) が最も一般的で、A2 (420×594mm) は大型サイズ（店舗・レストラン用）。卓上カレンダーの 1.5-2 倍のインパクトゾーン。</p>
<p><strong>Q: 中綴じカレンダーの最大ページ数は？</strong><br/>A: ページ数は 4 の倍数 (8, 12, 16, ..., 64 ページ) 必須。64 ページを超える場合は無線綴じに切り替え推奨。</p>
<p><strong>Q: 2027年カレンダーに箔押しを追加できますか？</strong><br/>A: 可能。表紙または月別ページに箔押し（金/銀/ローズゴールド）追加で 1 冊 ¥8-25 増、100 冊 MOQ、2-3 日特急対応。</p>
</div>"""

# 实施
for locale, slug, section, faq in [
    ("zh-hk", "calendar-printing-guide", ZH_SECTION, None),
    ("ja", "calendar-printing-guide", JA_SECTION, JA_FAQ),
    ("en", "calendar-printing-guide", None, EN_FAQ),
]:
    f = BLOG_DIR / f"{locale}.json"
    d = json.load(f.open(encoding="utf-8"))
    if slug not in d:
        print(f"  [{locale}] {slug} not found")
        continue
    p = d[slug]
    content = p.get("content", "")
    changed = False
    if section and "2027" not in content and "全表" not in content:
        content = content + "\n" + section
        changed = True
        print(f"  [{locale}] size section added")
    if faq and "saddle-stitch calendars" not in content and "中綴じカレンダー" not in content:
        content = content + "\n" + faq
        changed = True
        print(f"  [{locale}] FAQ section added")
    if changed:
        p["content"] = content
        p["lastUpdated"] = "2026-08-21"
        json.dump(d, f.open("w", encoding="utf-8"), ensure_ascii=False, indent=2)
    else:
        print(f"  [{locale}] no change (already has section/FAQ)")

print("\n✓ Done")
