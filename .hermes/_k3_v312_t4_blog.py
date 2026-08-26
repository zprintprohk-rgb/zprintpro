#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 v3.12 T4-2: paper-bag-printing-guide blog 3 locale 加「訂製直通」段
"""
import json
from pathlib import Path

BLOG_DIR = Path(r"F:\zprintpro-nextjs\src\data\blog-data")

# 通用段: 在 content 末尾 + </div> 之前加「訂製直通」CTA 段
CTA_ZHHK = """<div class="bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-5 my-6 rounded-r-lg">
<h3 class="text-lg font-bold text-[#333333] mb-3">📦 訂製直通 — 紙袋訂製 4 步下單</h3>
<p class="text-sm text-gray-700 mb-3">看完以上紙袋印刷全指南, 立即開始訂製:</p>
<ol class="text-sm text-gray-700 space-y-2 list-decimal pl-5">
<li><strong>挑類目:</strong> 牛皮紙袋 / 白卡紙袋 / 手挽紙袋 / 禮品紙袋 4 大類 20+ 材質</li>
<li><strong>WhatsApp 提交:</strong> 尺寸 + 數量 + Logo → 30 秒 AI 即時報價</li>
<li><strong>免費打樣:</strong> 2-3 天確認, 滿意先量產</li>
<li><strong>順豐直送:</strong> 香港 1-2 個工作天, 跨境 DHL 全球 2-4 天</li>
</ol>
<p class="text-sm mt-4"><strong>3 大入口:</strong></p>
<ul class="text-sm space-y-2 list-disc pl-5">
<li>🛍️ <a href="/zh-hk/category/paper-bags/" class="text-[#1A56DB] underline font-medium">紙袋訂製類目頁</a> — 全材質全場景對標</li>
<li>📦 <a href="/zh-hk/product/kraft-paper-bags/" class="text-[#1A56DB] underline font-medium">牛皮紙袋訂製</a> — 環保首選, HK$1.5/個起</li>
<li>🛍️ <a href="/zh-hk/product/handle-bags/" class="text-[#1A56DB] underline font-medium">手挽紙袋</a> — 餐飲零售採購, 邊度買紙袋首選</li>
</ul>
<p class="text-xs text-gray-500 mt-3">最後更新: 2026-08-21 · 智印港 ZprintPro · 滿 HK$500 順豐本地免運</p>
</div>"""

CTA_EN = """<div class="bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-5 my-6 rounded-r-lg">
<h3 class="text-lg font-bold text-[#333333] mb-3">📦 Order Direct — Custom Paper Bags in 4 Steps</h3>
<p class="text-sm text-gray-700 mb-3">After reading this paper bag printing guide, start your order now:</p>
<ol class="text-sm text-gray-700 space-y-2 list-decimal pl-5">
<li><strong>Choose category:</strong> 4 major types (kraft, white card, handle, gift) with 20+ material options</li>
<li><strong>WhatsApp submit:</strong> dimensions + quantity + logo → 30-second AI instant quote</li>
<li><strong>Free sample:</strong> 2-3 day confirmation, approve before mass production</li>
<li><strong>Fast delivery:</strong> DHL Express 2-4 days worldwide, US/UK/AU 2-4 days</li>
</ol>
<p class="text-sm mt-4"><strong>3 Quick Entry Points:</strong></p>
<ul class="text-sm space-y-2 list-disc pl-5">
<li>🛍️ <a href="/en/category/paper-bags/" class="text-[#1A56DB] underline font-medium">Custom Paper Bags Category</a> — Full material & scene coverage</li>
<li>📦 <a href="/en/product/kraft-paper-bags/" class="text-[#1A56DB] underline font-medium">Kraft Paper Bags</a> — Eco-friendly, from US$0.19/pc</li>
<li>🛍️ <a href="/en/product/handle-bags/" class="text-[#1A56DB] underline font-medium">Handle Paper Bags</a> — F&B retail, where to buy paper bags</li>
</ul>
<p class="text-xs text-gray-500 mt-3">Last updated: 2026-08-21 · ZprintPro · Free shipping over $99</p>
</div>"""

CTA_JA = """<div class="bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-5 my-6 rounded-r-lg">
<h3 class="text-lg font-bold text-[#333333] mb-3">📦 すぐに注文 — 紙袋オーダーメイド 4 ステップ</h3>
<p class="text-sm text-gray-700 mb-3">紙袋印刷ガイドを読んだら, 今すぐ注文開始:</p>
<ol class="text-sm text-gray-700 space-y-2 list-decimal pl-5">
<li><strong>カテゴリ選択:</strong> クラフト/白カード/ハンドル/ギフト 4 大類 20+ 素材</li>
<li><strong>WhatsApp 送信:</strong> 寸法 + 数量 + ロゴ → 30秒 AI 即時見積もり</li>
<li><strong>無料サンプル:</strong> 2-3日確認, 量産前に承認</li>
<li><strong>迅速配送:</strong> DHL グローバル 2-4日, 日本全国 2-4日</li>
</ol>
<p class="text-sm mt-4"><strong>3 つの入口:</strong></p>
<ul class="text-sm space-y-2 list-disc pl-5">
<li>🛍️ <a href="/ja/category/paper-bags/" class="text-[#1A56DB] underline font-medium">紙袋オーダーメイドカテゴリ</a> — 全素材・全シーン対応</li>
<li>📦 <a href="/ja/product/kraft-paper-bags/" class="text-[#1A56DB] underline font-medium">クラフト紙袋</a> — エコ, 1個 ¥22 から</li>
<li>🛍️ <a href="/ja/product/handle-bags/" class="text-[#1A56DB] underline font-medium">手提げ紙袋</a> — F&B 小売, 紙袋購入先</li>
</ul>
<p class="text-xs text-gray-500 mt-3">最終更新: 2026-08-21 · ジープリント ZprintPro · $500相当以上送料無料</p>
</div>"""

CTAs = {"zh-hk": CTA_ZHHK, "en": CTA_EN, "ja": CTA_JA}

# 3 个文件, paper-bag-printing-guide 是 slug
for locale, cta in CTAs.items():
    f = BLOG_DIR / f"{locale}.json"
    data = json.loads(f.read_text(encoding="utf-8"))
    if "paper-bag-printing-guide" not in data:
        print(f"  [{locale}] paper-bag-printing-guide not found, skipping")
        continue
    content = data["paper-bag-printing-guide"].get("content", "")
    if "訂製直通" in content or "Order Direct" in content or "すぐに注文" in content:
        print(f"  [{locale}] already has CTA, skipping")
        continue
    # 在 content 末尾的 </div> 之前插入 CTA
    # 简单方法: 追加到末尾 (html 解析容易出问题, 直接 append 即可)
    data["paper-bag-printing-guide"]["content"] = content + "\n" + cta
    f.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  [{locale}] CTA added to paper-bag-printing-guide")

print("\n✓ Done")
