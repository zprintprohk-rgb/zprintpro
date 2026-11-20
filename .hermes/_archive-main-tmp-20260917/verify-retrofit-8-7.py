#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, re, sys

SLUG = "apparel-shopping-bag-printing-guide"

faq_h3_pattern = re.compile(
    r'<h3 class="text-lg font-bold text-\[#333333\] mt-4 mb-2">'
)

all_pass = True
for loc in ["zh-hk", "en", "ja"]:
    d = json.load(open(f"src/data/blog-data/{loc}.json", "r", encoding="utf-8"))
    c = d[SLUG]["content"]
    print(f"--- {loc} ({len(c)} chars) ---")
    checks = {
        "1. 重點摘要/TL;DR/要約": bool(re.search(r"(重點摘要|TL;DR|要約)", c)),
        "2. 黄 callout (FFF8E6+F59E0B)": "bg-[#FFF8E6] border-l-4 border-[#F59E0B]" in c,
        "3. 4 FAQ H3 数量": len(faq_h3_pattern.findall(c)),
        "4. 蓝 CTA (E0F2FE+1A56DB)": "bg-[#E0F2FE] border-l-4 border-[#1A56DB]" in c,
        "5. Author Bio": bool(re.search(r"(作者團隊|Author Team|執筆チーム)", c)),
        "6. Sources": bool(re.search(r"(資料來源|Sources|資料ソース)", c)),
        "7. Disclaimer": bool(re.search(r"(免責聲明|Disclaimer|免責事項)", c)),
        "8. /quote/ 链接": c.count("/quote/"),
        "9. /product/ SKU 链接 (kraft/white-card/gift/eco)": len(
            re.findall(r"/product/(kraft|white-card|gift|eco)", c)
        ),
    }
    for k, v in checks.items():
        status = "PASS" if v else "FAIL"
        print(f"  [{status}] {k}: {v}")
        if not v and k != "9. /product/ SKU 链接 (kraft/white-card/gift/eco)":
            all_pass = False
        if k == "9. /product/ SKU 链接 (kraft/white-card/gift/eco)" and v < 3:
            print(f"     [WARN] 少于 3 SKU,需要补")

    # 段号重复检查
    if loc == "zh-hk":
        seg = "六、智印港牛皮" in c
        print(f"  段号 6 重复 zh: {'FAIL 仍含' if seg else 'PASS 已修'}")
        if seg: all_pass = False
    elif loc == "en":
        seg = "6. Verified" in c
        print(f"  段号 6 重复 en: {'FAIL 仍含' if seg else 'PASS 已修'}")
        if seg: all_pass = False
    else:
        seg = "6. 実校正" in c
        print(f"  段号 6 重复 ja: {'FAIL 仍含' if seg else 'PASS 已修'}")
        if seg: all_pass = False
    print()

print("=== Overall:", "PASS" if all_pass else "FAIL", "===")
sys.exit(0 if all_pass else 1)
