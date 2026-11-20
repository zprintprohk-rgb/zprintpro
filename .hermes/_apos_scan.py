# -*- coding: utf-8 -*-
"""Scan my batch-2 en/ja/zh strings for raw straight apostrophes inside single-quoted values."""
import io, re

s = io.open(r"F:\zprintpro-nextjs\src\data\product-faqs.ts", encoding="utf-8", newline="").read().split("\n")
seg_start = None
for i, l in enumerate(s):
    if "skuMoneyFAQs" in l:
        seg_start = i
        break
bad = 0
pat = re.compile(r"^\s+(?:'zh-hk'|en|ja): '(.+)',\s*$")
for i in range(seg_start, len(s)):
    m = pat.match(s[i])
    if m and "'" in m.group(1):
        print("SUSPECT L%d: %s" % (i + 1, s[i].strip()[:130]))
        bad += 1
print("suspects:", bad)
