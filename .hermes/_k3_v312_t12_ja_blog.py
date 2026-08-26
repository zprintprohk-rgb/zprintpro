#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.12 T12 #2: ja poster-printing-price-guide 加厚 (ポスター 印刷 費用 1i pos13)"""
import json
from pathlib import Path

F = Path(r"F:\zprintpro-nextjs\src\data\blog-data\ja.json")
d = json.load(F.open(encoding="utf-8"))
p = d["poster-printing-price-guide"]

# 改 title 加「ポスター 印刷 費用」 + 改 description
p["title"] = "ポスター 印刷 費用 / ポスター印刷料金ガイド：A1 A2 単価・用紙・加工・ロット割引 | ZprintPro"
p["description"] = "ポスター 印刷 費用 を徹底解説。A2 コート紙 100 枚で 1 枚 ¥100-150、A1 は ¥170-260。4 大コスト要因、ポスター 印刷 費用 数量別価格表、FAQ 4 件、10〜1,000 枚、3-5 営業日納品。DHL 国際配送 2-4 日。"

# content 末尾加「ポスター 印刷 費用 価格表」段
NEW_PRICE_SECTION = """<div class=\"bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-5 my-6 rounded-r-lg\">
<h3 class=\"text-lg font-bold text-[#333333] mb-3\">💰 ポスター 印刷 費用 — 数量別価格表 (2026 最新)</h3>
<table class=\"w-full text-sm border-collapse my-4\"><thead><tr class=\"bg-gray-100\"><th class=\"border p-2 text-left\">数量</th><th class=\"border p-2 text-left\">A2 (¥/枚)</th><th class=\"border p-2 text-left\">A1 (¥/枚)</th><th class=\"border p-2 text-left\">A0 (¥/枚)</th></tr></thead><tbody>
<tr><td class=\"border p-2\">10 枚</td><td class=\"border p-2\">¥300-450</td><td class=\"border p-2\">¥500-700</td><td class=\"border p-2\">¥900-1,400</td></tr>
<tr><td class=\"border p-2\">50 枚</td><td class=\"border p-2\">¥180-250</td><td class=\"border p-2\">¥300-400</td><td class=\"border p-2\">¥600-900</td></tr>
<tr><td class=\"border p-2\">100 枚</td><td class=\"border p-2\">¥100-150</td><td class=\"border p-2\">¥170-260</td><td class=\"border p-2\">¥400-600</td></tr>
<tr><td class=\"border p-2\">500 枚</td><td class=\"border p-2\">¥70-100</td><td class=\"border p-2\">¥120-170</td><td class=\"border p-2\">¥280-400</td></tr>
<tr><td class=\"border p-2\">1,000 枚</td><td class=\"border p-2\">¥55-75</td><td class=\"border p-2\">¥90-130</td><td class=\"border p-2\">¥220-310</td></tr>
</tbody></table>
<p class=\"text-sm text-gray-700\">※ 128g コート紙・両面 CMYK 印刷 基準。数量割引で 1,000 枚以上は 50% OFF。</p>
<p class=\"text-sm mt-3\"><strong>関連 FAQ:</strong> ポスター 印刷 費用 いくらかかります? → A2 100 枚で ¥10,000-15,000 (1 枚 ¥100-150)。急いで必要? → 当日特急印刷 で翌営業日納品 (別途特急料金)。</p>
<p class=\"text-xs text-gray-500 mt-3\">最終更新: 2026-08-21 · ZprintPro ジープリント · DHL 国際配送 2-4 日</p>
</div>"""

p["content"] = p["content"] + "\n" + NEW_PRICE_SECTION
p["lastUpdated"] = "2026-08-21"

json.dump(d, F.open("w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("[T12 #2] ja poster-printing-price-guide 加厚: タイトル + 価格表 追加")
