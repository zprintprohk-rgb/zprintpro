# -*- coding: utf-8 -*-
import io, re
p = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
idxs = [m.start() for m in re.finditer(r"slug:\s*'", p)]
print("== sticker SKUs: basePrice vs basePrice_ja ==")
for k, i in enumerate(idxs):
    end = idxs[k + 1] if k + 1 < len(idxs) else len(p)
    blk = p[i:end]
    slug = re.match(r"slug:\s*'([a-z0-9-]+)'", blk).group(1)
    cat = re.search(r"category:\s*'([a-z-]+)'", blk)
    c = cat.group(1) if cat else ""
    if "sticker" in slug or c == "stickers":
        bp = re.search(r"basePrice:\s*([\d.]+)", blk)
        bpj = re.search(r"basePrice_ja:\s*([\d.]+)", blk)
        pr = re.search(r"price_range:\s*'([^']*)'", blk)
        if bp or bpj:
            r = ""
            if bp and bpj:
                r = "ratio=%.1f" % (float(bpj.group(1)) / float(bp.group(1)))
            print("%-26s cat=%-9s basePrice=%s basePrice_ja=%s %s range=%s" % (
                slug, c, bp.group(1) if bp else "-", bpj.group(1) if bpj else "-", r, (pr.group(1)[:26] if pr else "-")))
