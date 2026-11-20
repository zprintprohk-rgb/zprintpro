# -*- coding: utf-8 -*-
"""Extract ground truth blocks for cartoon/eco/large red-packets (read-only dump)."""
import io, os

ROOT = r"F:\zprintpro-nextjs"

def dump(path, start, end, label):
    with io.open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    print("\n" + "=" * 30 + " " + label + " (L%d-L%d)" % (start, end) + " " + "=" * 30)
    for i in range(start - 1, min(end, len(lines))):
        print("%d\t%s" % (i + 1, lines[i].rstrip("\n")))

# products.ts: 3 SKUs, ~93 lines each
prod = os.path.join(ROOT, "src", "data", "products.ts")
dump(prod, 3990, 4092, "products.ts cartoon-red-packets (up to eco start)")
dump(prod, 4085, 4188, "products.ts eco-red-packets (up to large start)")
dump(prod, 4176, 4280, "products.ts large-red-packets (to block end ~93 lines)")

# sku-seo-data.ts: 3 remaining + 3 done (for similarity)
seo = os.path.join(ROOT, "src", "data", "sku-seo-data.ts")
dump(seo, 1322, 1360, "sku-seo cartoon")
dump(seo, 1358, 1396, "sku-seo eco")
dump(seo, 1394, 1432, "sku-seo large")
