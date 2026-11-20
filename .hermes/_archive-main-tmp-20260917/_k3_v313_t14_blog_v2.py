#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.13 T14 #2: en calendar-printing-guide blog 加厚 - 2027 尺寸表 + sizes/dimensions/typical/average 词"""
import json
from pathlib import Path

BLOG = Path(r"F:\zprintpro-nextjs\src\data\blog-data\en.json")
d = json.load(BLOG.open(encoding="utf-8"))
p = d["calendar-printing-guide"]

NEW_SIZE_SECTION = """<div class=\"bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-5 my-6 rounded-r-lg\">
<h3 class=\"text-lg font-bold text-[#333333] mb-3\">📏 2027 Calendar Sizes & Dimensions — Quick Reference</h3>
<p class=\"text-sm text-gray-700 mb-3\">Average calendar sizes for 2027 wall, desk, and mini giveaways. All sizes in mm (width × height), production in 3-5 business days.</p>
<table class=\"w-full text-sm border-collapse my-4\"><thead><tr class=\"bg-gray-100\"><th class=\"border p-2 text-left\">Type</th><th class=\"border p-2 text-left\">Typical Size (mm)</th><th class=\"border p-2 text-left\">Standard Pages</th><th class=\"border p-2 text-left\">MOQ</th><th class=\"border p-2 text-left\">Best For</th></tr></thead><tbody>
<tr><td class=\"border p-2\">Wall Calendar (Large)</td><td class=\"border p-2\">A2 420×594</td><td class=\"border p-2\">13 sheets + cover</td><td class=\"border p-2\">50 pcs</td><td class=\"border p-2\">In-store, restaurant, salon brand presence</td></tr>
<tr><td class=\"border p-2\">Wall Calendar (Standard)</td><td class=\"border p-2\">A3 297×420</td><td class=\"border p-2\">7 sheets + cover</td><td class=\"border p-2\">50 pcs</td><td class=\"border p-2\">Office, retail, real estate brand touch</td></tr>
<tr><td class=\"border p-2\">Desk Calendar (Triangular)</td><td class=\"border p-2\">A5 148×210</td><td class=\"border p-2\">13 sheets + triangular stand</td><td class=\"border p-2\">50 pcs</td><td class=\"border p-2\">Realtor, finance, insurance client desk</td></tr>
<tr><td class=\"border p-2\">Mini Calendar (Giveaway)</td><td class=\"border p-2\">85×140 (credit-card size)</td><td class=\"border p-2\">12 sheets + magnet back</td><td class=\"border p-2\">100 pcs</td><td class=\"border p-2\">Trade show, mailer, mass-distribution brand awareness</td></tr>
<tr><td class=\"border p-2\">Pocket Calendar</td><td class=\"border p-2\">70×140</td><td class=\"border p-2\">14 sheets</td><td class=\"border p-2\">100 pcs</td><td class=\"border p-2\">Wallet, mass giveaway, low-cost brand impression</td></tr>
</tbody></table>
<p class=\"text-sm text-gray-700 mt-3\"><strong>2027 Calendar Dimensions — Key Specs:</strong></p>
<ul class=\"text-sm space-y-1 list-disc pl-5\">
<li><strong>Average wall calendar:</strong> A2 (420×594mm) — 1.5x desk calendar impression zone</li>
<li><strong>Standard wall calendar:</strong> A3 (297×420mm) — most common for US small business</li>
<li><strong>Typical desk calendar:</strong> A5 (148×210mm) — triangular wire-O binding, sits on client desk 365 days</li>
<li><strong>Custom sizes available</strong> from 70×140 (pocket) to 420×594 (large wall)</li>
</ul>
<p class=\"text-sm mt-3\">📅 <strong>2027 Calendar Season Timing:</strong> Order Aug-Oct 2026 for Sep-Dec delivery. Bulk discounts kick in at 500+ units. Free design mockup + free shipping over $99 USA. <a href=\"/en/quote/\" class=\"text-[#1A56DB] underline font-medium\">Get 2027 calendar instant quote →</a></p>
<p class=\"text-xs text-gray-500 mt-3\">Last updated: 2026-08-21 · ZprintPro · Free shipping over $99 USA · DHL Express 2-4 day delivery from Asia factory</p>
</div>"""

# 找尺寸段在 content 中位置, 或者直接追加
c = p["content"]
if "Quick Reference" not in c:
    # 找 closing p 段 (WhatsApp 之前)
    if "Get your 2027 calendar quote now" in c:
        c = c.replace(
            "Get your 2027 calendar quote now via",
            NEW_SIZE_SECTION + "\n<p>Get your 2027 calendar quote now via",
            1
        )
    else:
        c = c + "\n" + NEW_SIZE_SECTION

p["content"] = c
p["lastUpdated"] = "2026-08-21"

# 更新 title 加 2027 + sizes 词 (实际已有 2027)
# 实际 K3 要求 sizes/dimensions/typical/average 4 词在 content 自然出现
# 我加的 NEW_SIZE_SECTION 已含 sizes/dimensions/typical/average 4 词

json.dump(d, BLOG.open("w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("[T14 #2] en calendar-printing-guide blog 加厚: 尺寸表 + 2027 更新 + 4 词注入 ✅")
