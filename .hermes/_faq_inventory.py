# -*- coding: utf-8 -*-
"""Inventory: skuMoneyFAQs covered SKUs vs all product slugs -> pick high-value gaps."""
import io, re

faq = io.open(r"F:\zprintpro-nextjs\src\data\product-faqs.ts", encoding="utf-8", newline="").read()
i = faq.find("skuMoneyFAQs")
seg = faq[i:]
# entries look like   'slug': { ... }
covered = re.findall(r"\n  '([a-z0-9-]+)':\s*\{", seg)
print("covered (%d):" % len(covered))
print(", ".join(covered))

prod = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
slugs = re.findall(r"slug:\s*'([a-z0-9-]+)'", prod)
cats = dict(re.findall(r"slug:\s*'([a-z0-9-]+)',\s*\n\s*[^\n]*\n?\s*category:\s*'([a-z0-9-]+)'", prod))
print("\ntotal product slugs (%d)" % len(slugs))
gaps = [s for s in slugs if s not in covered]
print("gap count: %d" % len(gaps))
# group gaps by guessed category via slug naming
import collections
print("\ngaps:", ", ".join(gaps))
