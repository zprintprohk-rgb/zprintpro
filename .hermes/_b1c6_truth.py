# -*- coding: utf-8 -*-
"""Cluster6: dump display/art/adhesive truth + all 5 posters CSV rows."""
import io, re

ROOT = r"F:\zprintpro-nextjs"
SLUGS = ["a1-posters", "a2-posters", "display-posters", "art-posters", "adhesive-posters"]

lines = io.open(ROOT + r"\src\data\products.ts", encoding="utf-8", newline="").read().split("\n")
out = io.open(ROOT + r"\.hermes\_b1c6_truth2.txt", "w", encoding="utf-8")
for i, ln in enumerate(lines, 1):
    for s in ("display-posters", "art-posters", "adhesive-posters"):
        if ("slug: '%s'" % s) in ln:
            for j in range(i - 1, min(i + 92, len(lines))):
                out.write("%d\t%s\n" % (j + 1, lines[j]))
out.close()

t = io.open(ROOT + r"\.hermes\_b1c6_truth2.txt", encoding="utf-8").read()
for ln in t.split("\n"):
    if re.search(r"(slug: |minQuantity|basePrice|price_range|material:|size: |printMethod|finishing: |【)", ln):
        print(ln[:190])

csv = io.open(ROOT + r"\zprintpro-sku-seo-data.csv", encoding="utf-8", newline="").read().split("\n")
hdr = csv[0].split("\t")
COL = {n: i for i, n in enumerate(hdr)}
out2 = io.open(ROOT + r"\.hermes\_b1c6_csvcells.txt", "w", encoding="utf-8")
for ln in csv:
    c = ln.split("\t")
    if len(c) > COL["Slug"] and c[COL["Slug"]] in SLUGS:
        s = c[COL["Slug"]]
        out2.write("==== %s ====\n" % s)
        for col in ("SEO标题(ZH)", "SEO标题(EN)", "SEO标题(JA)", "SEO描述(ZH)", "SEO描述(EN)", "SEO描述(JA)",
                    "H1标题(ZH)", "H1标题(EN)", "H1标题(JA)", "SEO关键词(ZH)", "SEO关键词(EN)", "SEO关键词(JA)",
                    "图片Alt标签(ZH)", "图片Alt标签(EN)", "图片Alt标签(JA)"):
            out2.write("%s | %r\n" % (col, c[COL[col]][:230]))
out2.close()
print("\nCSV cells -> .hermes/_b1c6_csvcells.txt")
