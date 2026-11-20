# -*- coding: utf-8 -*-
import io, re
p = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
idxs = [m.start() for m in re.finditer(r"slug:\s*'", p)]
print("== mailer-boxes / envelope SKUs minQ ==")
for k, i in enumerate(idxs):
    end = idxs[k + 1] if k + 1 < len(idxs) else len(p)
    blk = p[i:end]
    slug = re.match(r"slug:\s*'([a-z0-9-]+)'", blk).group(1)
    if "mailer" in slug or "envelop" in slug:
        mq = re.search(r"minQuantity:\s*(\d+)", blk)
        print("%-30s minQ=%s" % (slug, mq.group(1) if mq else "-"))

print()
print("== SharpHooks ecommerce + finance-envelope scenario zh/ja lines ==")
s = io.open(r"F:\zprintpro-nextjs\src\components\category\CategorySharpHooks.tsx", encoding="utf-8", newline="").read()
lines = s.split("\n")
for ln in [65, 66, 67, 218, 219, 220, 221]:
    print("L%d: %s" % (ln, lines[ln - 1].strip()[:150]))

print()
print("== CategoryIndustries: same scenarios (ecommerce / finance-envelope) zh/en/ja ==")
s2 = io.open(r"F:\zprintpro-nextjs\src\components\category\CategoryIndustries.tsx", encoding="utf-8", newline="").read()
lines2 = s2.split("\n")
for i, l in enumerate(lines2):
    if "500 個起" in l or "From 500" in l or "500個から" in l:
        print("L%d: %s" % (i + 1, l.strip()[:140]))
