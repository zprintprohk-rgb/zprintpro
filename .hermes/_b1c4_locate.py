# -*- coding: utf-8 -*-
"""Cluster 4 locate: food-boxes / folding-boxes anchors in ts/products/CSV + lane.lock."""
import io, os, re

ROOT = r"F:\zprintpro-nextjs"
SLUGS = ["food-boxes", "folding-boxes"]

ts = io.open(ROOT + r"\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
for s in SLUGS:
    hits = [m.start() for m in re.finditer('"%s": \{' % re.escape(s), ts)]
    print("sku-seo", s, "->", hits)

lines = io.open(ROOT + r"\src\data\products.ts", encoding="utf-8", newline="").read().split("\n")
for i, ln in enumerate(lines, 1):
    for s in SLUGS:
        if ("slug: '%s'" % s) in ln:
            print("products.ts L%d: %s" % (i, s))

csv = io.open(ROOT + r"\zprintpro-sku-seo-data.csv", encoding="utf-8", newline="").read().split("\n")
hdr = csv[0].split("\t")
COL = {n: i for i, n in enumerate(hdr)}
for i, ln in enumerate(csv, 1):
    c = ln.split("\t")
    if len(c) > COL["Slug"] and c[COL["Slug"]] in SLUGS:
        print("CSV row", i, c[COL["Slug"]])

print("lane.lock:", os.path.exists(ROOT + r"\.hermes\locks\lane.lock"))
