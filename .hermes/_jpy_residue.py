# -*- coding: utf-8 -*-
"""Locate remaining HK$ residues in ja segments of category-seo-content.ts + envelope/calendar basePrice_ja truth from products.ts."""
import io, re

P = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
s = io.open(P, encoding="utf-8", newline="").read()
lines = s.split("\n")

print("== HK$ occurrences with ja-context heuristic ==")
for i, l in enumerate(lines):
    if "HK$" not in l:
        continue
    # ja context: line contains kana OR is within a ja block (heuristic: check for ja markers on same line)
    kana = re.search(r"[ぁ-ゖァ-ヺー]", l)
    print("L%d kana=%s | %s" % (i + 1, bool(kana), l.strip()[:170]))

print()
print("== products.ts: envelope + calendar SKUs price truth ==")
p = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
idxs = [m.start() for m in re.finditer(r"slug:\s*'", p)]
for k, i in enumerate(idxs):
    end = idxs[k + 1] if k + 1 < len(idxs) else len(p)
    blk = p[i:end]
    slug = re.match(r"slug:\s*'([a-z0-9-]+)'", blk).group(1)
    if any(x in slug for x in ["envelop", "calendar"]):
        bp = re.search(r"basePrice:\s*([\d.]+)", blk)
        bpe = re.search(r"basePrice_en:\s*([\d.]+)", blk)
        bpj = re.search(r"basePrice_ja:\s*([\d.]+)", blk)
        pr = re.search(r"price_range:\s*'([^']*)'", blk)
        print("%-30s basePrice=%s basePrice_en=%s basePrice_ja=%s range=%s" % (
            slug, bp.group(1) if bp else "-", bpe.group(1) if bpe else "-",
            bpj.group(1) if bpj else "-", (pr.group(1)[:36] if pr else "-")))
