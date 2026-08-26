#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Compare GBK vs UTF-8 decoding of jewellery-shopping-bag zh-hk content"""
import json
import codecs

SLUG = "jewellery-shopping-bag-printing-guide"
path = r"F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json"

# Try GBK first
try:
    with open(path, "r", encoding="gbk") as f:
        data_gbk = json.load(f)
    entry = data_gbk.get(SLUG)
    if entry:
        title = entry.get("title", "")
        content = entry.get("content", "")
        print(f"GBK decode SUCCESS:")
        print(f"  Title: {title}")
        print(f"  Content length: {len(content)} chars")
        print(f"  First 200 chars: {content[:200]}")
        print(f"  Has Author (作者): {('作者' in content)}")
        print(f"  Has Sources (資料來源): {('資料來源' in content)}")
        print(f"  Has Disclaimer (免責聲明): {('免責聲明' in content)}")
        print(f"  Has 重點摘要: {('重點摘要' in content)}")
        print(f"  H3 count: {content.count('<h3')}")
        print(f"  table count: {content.count('<table')}")
        print(f"  Q&A pairs: {content.count('text-lg font-bold')}")
        print(f"  internal links: {content.count('href=')}")
    else:
        print("GBK: slug not found")
except (UnicodeDecodeError, json.JSONDecodeError) as e:
    print(f"GBK decode FAILED: {e}")

print()
# Try UTF-8
try:
    with open(path, "r", encoding="utf-8") as f:
        data_utf8 = json.load(f)
    entry = data_utf8.get(SLUG)
    if entry:
        title = entry.get("title", "")
        content = entry.get("content", "")
        print(f"UTF-8 decode SUCCESS:")
        print(f"  Title: {title}")
        print(f"  Content length: {len(content)} chars")
        print(f"  First 200 chars: {content[:200]}")
        print(f"  Has Author (作者): {('作者' in content)}")
        print(f"  Has Sources (資料來源): {('資料來源' in content)}")
        print(f"  Has Disclaimer (免責聲明): {('免責聲明' in content)}")
    else:
        print("UTF-8: slug not found")
except (UnicodeDecodeError, json.JSONDecodeError) as e:
    print(f"UTF-8 decode FAILED: {e}")
