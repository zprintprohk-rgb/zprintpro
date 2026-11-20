# -*- coding: utf-8 -*-
"""Inventory v2: covered SKUs (array form) + truth fields for 7 target SKUs."""
import io, re

faq = io.open(r"F:\zprintpro-nextjs\src\data\product-faqs.ts", encoding="utf-8", newline="").read()
i = faq.find("skuMoneyFAQs: Record<string, FAQItem[]> = {")
seg = faq[i:]
covered = re.findall(r"\n  '([a-z0-9-]+)': \[", seg)
print("covered (%d): %s" % (len(covered), ", ".join(covered)))

prod = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
targets = ["desk-calendars", "custom-calendars", "catalog-printing", "pvc-menus",
           "roll-up-banners", "kraft-paper-bags", "certificates"]
print("\n=== truth fields ===")
for t in targets:
    m = re.search(r"slug: '%s'," % re.escape(t), prod)
    if not m:
        print(t, "NOT FOUND"); continue
    chunk = prod[m.start(): m.start() + 4200]
    out = {}
    for f in ["category", "minQuantity", "basePrice", "basePrice_en", "basePrice_ja", "price_range", "priceRange", "turnaround", "deliveryTime"]:
        mm = re.search(r"\b%s\s*:\s*([^,\n]+)" % f, chunk)
        if mm:
            out[f] = mm.group(1).strip()[:110]
    print(t, "->", out)
