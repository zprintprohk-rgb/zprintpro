#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/9 retrofit 验证: 3 locale JSON valid + chars 统计"""
import json

for loc in ["zh-hk", "en", "ja"]:
    path = f"F:\\zprintpro-nextjs\\src\\data\\blog-data\\{loc}.json"
    with open(path, "r", encoding="utf-8") as f:
        d = json.load(f)
    slug = "baby-product-label-sticker-printing-guide"
    c = d[slug]["content"]
    date = d[slug]["date"]
    print(f"{loc}: valid JSON, content chars={len(c)}, date={date}")
    # 检查 v8 标准元素是否齐
    checks = {
        "summary_蓝字": "text-[#1A56DB] font-medium" in c,
        "yellow_callout": "bg-[#FFF8E6]" in c,
        "blue_cta_box": "bg-[#E0F2FE]" in c,
        "Author_块": "Author" in c or "作者" in c or "執筆" in c,
        "Sources_块": "Sources" in c or "資料來源" in c or "資料ソース" in c,
        "Disclaimer": "Disclaimer" in c or "免責聲明" in c or "免責声明" in c,
        "FAQ_H3_Q1": "Q1" in c or "Q1：" in c,
    }
    for k, v in checks.items():
        mark = "OK " if v else "MISS"
        print(f"  {mark} {k}")
