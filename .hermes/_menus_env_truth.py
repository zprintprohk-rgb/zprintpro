# -*- coding: utf-8 -*-
import io, re
p = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
idxs = [m.start() for m in re.finditer(r"slug:\s*'", p)]
print("== menus SKUs ==")
for k, i in enumerate(idxs):
    end = idxs[k + 1] if k + 1 < len(idxs) else len(p)
    blk = p[i:end]
    slug = re.match(r"slug:\s*'([a-z0-9-]+)'", blk).group(1)
    if "menu" in slug:
        for f in ["minQuantity", "basePrice", "basePrice_en", "basePrice_ja"]:
            m = re.search(f + r":\s*'?([\d.]+)'?", blk)
            print("%-22s %s=%s" % (slug, f, m.group(1) if m else "-"))
        pr = re.search(r"price_range:\s*'([^']*)'", blk)
        if pr: print("%-22s range=%s" % (slug, pr.group(1)[:40]))
print()
print("== envelope SKU full price fields ==")
for k, i in enumerate(idxs):
    end = idxs[k + 1] if k + 1 < len(idxs) else len(p)
    blk = p[i:end]
    slug = re.match(r"slug:\s*'([a-z0-9-]+)'", blk).group(1)
    if slug == "envelopes" or "envelop" in slug:
        fields = re.findall(r"(minQuantity|basePrice|basePrice_en|basePrice_ja|price_range|price_en|price_ja)\s*:\s*'?([^,'\n]+)'?", blk)
        print(slug, "->", fields[:8])
