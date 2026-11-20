# -*- coding: utf-8 -*-
"""Extract exact MOQ/price/turnaround fields for packaging SKUs from products.ts."""
import io, re

p = r"F:\zprintpro-nextjs\src\data\products.ts"
s = io.open(p, encoding="utf-8", newline="").read()

out = io.open(r"F:\zprintpro-nextjs\.hermes\_pkg_truths.txt", "w", encoding="utf-8", newline="")
for slug in ["food-boxes", "folding-boxes", "mailer-boxes", "rigid-boxes", "cosmetic-boxes", "gift-boxes", "white-card-boxes", "wedding-boxes"]:
    i = s.find("slug: '%s'" % slug)
    if i < 0:
        out.write("%s: NOT FOUND\n" % slug); continue
    # capture the object chunk (next 3500 chars is enough for numeric fields)
    chunk = s[i:i + 3500]
    fields = {}
    for f in ["minQuantity", "basePrice", "basePriceEn", "basePriceJa", "basePriceUs", "priceRange", "priceRangeEn", "priceRangeJa", "turnaround", "turnaroundEn", "turnaroundJa", "deliveryTime", "moq"]:
        m = re.search(r"%s\s*:\s*([^,\n]+)" % f, chunk)
        if m: fields[f] = m.group(1).strip()[:60]
    out.write("%s: %s\n" % (slug, fields))
out.close()
print("done")
