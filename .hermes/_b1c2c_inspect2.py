# -*- coding: utf-8 -*-
"""Inspect round 2: ja FAQ exact spans by slug anchors + cartoon CSV title/h1 cells."""
import io, re

ROOT = r"F:\zprintpro-nextjs"

def load(p):
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        return f.read()

csv_raw = load(ROOT + r"\zprintpro-sku-seo-data.csv")
lines = csv_raw.split("\n")
hdr = lines[0].split("\t")
COL = {n: i for i, n in enumerate(hdr)}
for row in lines:
    c = row.split("\t")
    if len(c) > COL["Slug"] and c[COL["Slug"]] == "cartoon-red-packets":
        for colname in ("SEO标题(ZH)", "SEO标题(EN)", "SEO标题(JA)", "H1标题(ZH)", "H1标题(EN)", "H1标题(JA)", "内部链接建议", "图片Alt标签(ZH)"):
            print("cartoon CSV |", colname, "|", repr(c[COL[colname]][:120]))

ts = load(ROOT + r"\src\data\sku-seo-data.ts")
for slug in ("cartoon-red-packets", "eco-red-packets", "large-red-packets"):
    si = ts.find('"%s": {' % slug)
    bi = ts.find("**FAQ**", si)
    print("\n--- %s ja FAQ span (exact) ---" % slug)
    # print 700 chars from FAQ start
    print(repr(ts[bi:bi+700]))
