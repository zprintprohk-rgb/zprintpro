# -*- coding: utf-8 -*-
"""Truths + turnaround for FAQ batch-2 SKUs (magnetic/photo-frame calendars, laminated-menus, spiral-notebooks, colored-envelopes, vehicle-wraps)."""
import io, re

prod = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
seo = io.open(r"F:\zprintpro-nextjs\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()

targets = ["magnetic-calendars", "photo-frame-calendars", "laminated-menus",
           "spiral-notebooks", "colored-envelopes", "vehicle-wraps"]
for t in targets:
    m = re.search(r"slug: '%s'," % re.escape(t), prod)
    out = {}
    if m:
        chunk = prod[m.start(): m.start() + 4200]
        for f in ["minQuantity", "basePrice", "basePrice_en", "basePrice_ja", "price_range"]:
            mm = re.search(r"\b%s\s*:\s*([^,\n]+)" % f, chunk)
            if mm:
                out[f] = mm.group(1).strip()[:80]
    m2 = re.search(r"%s'|\"%s\"" % (re.escape(t), re.escape(t)), seo)
    tats = set()
    if m2:
        seg = seo[m2.start(): m2.start() + 9000]
        for mm in re.finditer(r"(\d+[-–]\d+)\s*(?:個工作天|営業日|business days?)", seg):
            tats.add(mm.group(0))
        for mm in re.finditer(r"(\d+)\s*(?:個工作天|営業日)", seg):
            tats.add(mm.group(0))
    print(t, "|", out, "| tat:", sorted(tats)[:6])
