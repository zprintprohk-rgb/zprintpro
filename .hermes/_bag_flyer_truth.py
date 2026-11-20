# -*- coding: utf-8 -*-
import io, re
p = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
idxs = [m.start() for m in re.finditer(r"slug:\s*'", p)]
print("== minQuantity truth: paper-bags / flyers / menus ==")
for k, i in enumerate(idxs):
    end = idxs[k + 1] if k + 1 < len(idxs) else len(p)
    blk = p[i:end]
    slug = re.match(r"slug:\s*'([a-z0-9-]+)'", blk).group(1)
    if any(x in slug for x in ["paper-bag", "bag", "flyer", "menu"]):
        mq = re.search(r"minQuantity:\s*(\d+)", blk)
        if mq:
            print("%-28s minQ=%s" % (slug, mq.group(1)))
