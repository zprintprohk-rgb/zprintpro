# -*- coding: utf-8 -*-
"""Audit en/ja packaging category FAQ answers for numeric claims vs products.ts truths."""
import io, re

cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("packagingContent:")
j = cat.find("{", i)
d = 0; k = j; end = None
while k < len(cat):
    if cat[k] == "{": d += 1
    elif cat[k] == "}":
        d -= 1
        if d == 0: end = k; break
    k += 1
span = cat[i:end]

for loc in ["en", "ja"]:
    m = re.search(r"\n  %s: \{" % loc, span)
    if not m:
        print(loc, "block NOT FOUND"); continue
    start = m.start()
    # take until next locale key or record end
    rest = span[start + 1:]
    nxt = re.search(r"\n  (?:'?zh-hk'?|en|ja): \{", rest)
    block = rest[:nxt.start()] if nxt else rest
    faqs = re.findall(r"\{ q: '([^']{5,120})', a: '([^']{5,400})' \}", block)
    print("=== %s: %d FAQs ===" % (loc, len(faqs)))
    for q, a in faqs:
        nums = re.findall(r"(?:HK\$|¥|\$)?\d[\d,.]*(?:\s*(?:個|枚|册|冊|本|張|MOQ|pcs|個〜))?", a)
        print("  Q: %s" % q)
        print("     nums: %s | A[:110]: %s" % (", ".join(nums[:6]), a[:110]))
