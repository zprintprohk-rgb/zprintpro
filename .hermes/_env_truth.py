# -*- coding: utf-8 -*-
import io, re
p = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
# robust: split top-level product objects by "slug:" occurrences, then look ahead window
idxs = [m.start() for m in re.finditer(r"slug:\s*'", p)]
for k, i in enumerate(idxs):
    end = idxs[k + 1] if k + 1 < len(idxs) else len(p)
    blk = p[i:end]
    slug = re.match(r"slug:\s*'([a-z0-9-]+)'", blk).group(1)
    mq = re.search(r"minQuantity:\s*(\d+)", blk)
    cat = re.search(r"categoryId:\s*'([a-z-]+)'", blk) or re.search(r"category:\s*'([a-z-]+)'", blk)
    if mq and ("envelope" in slug or (cat and "envelope" in cat.group(1)) or "card" in slug):
        print("%-34s cat=%-18s minQ=%s" % (slug, cat.group(1) if cat else "-", mq.group(1)))
print("---- all envelope-ish ----")
for k, i in enumerate(idxs):
    end = idxs[k + 1] if k + 1 < len(idxs) else len(p)
    blk = p[i:end]
    slug = re.match(r"slug:\s*'([a-z0-9-]+)'", blk).group(1)
    if "envelop" in slug:
        mq = re.search(r"minQuantity:\s*(\d+)", blk)
        print("%-34s minQ=%s" % (slug, mq.group(1) if mq else "?"))
print("---- locate 50–100 claim ----")
c = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
for m in re.finditer(r"50–100", c):
    ln = c[:m.start()].count("\n") + 1
    print("L%d: %s" % (ln, c[max(0, m.start()-260):m.start()+90].replace("\n", " ")[:330]))
