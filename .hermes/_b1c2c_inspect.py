# -*- coding: utf-8 -*-
"""Inspect exact bytes of failing anchors (read-only)."""
import io, json, re

ROOT = r"F:\zprintpro-nextjs"

def load(p):
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        return f.read()

csv_raw = load(ROOT + r"\zprintpro-sku-seo-data.csv")
lines = csv_raw.split("\n")
hdr = lines[0].split("\t")
COL = {n: i for i, n in enumerate(hdr)}

print("=== CSV cells (repr, truncated) ===")
for row in lines:
    c = row.split("\t")
    if len(c) > COL["Slug"] and c[COL["Slug"]] in ("cartoon-red-packets", "eco-red-packets", "large-red-packets", "embossed-red-packets"):
        s = c[COL["Slug"]]
        for colname in ("SEO描述(ZH)", "SEO描述(EN)", "SEO关键词(ZH)", "SEO关键词(JA)", "SEO描述(JA)"):
            v = c[COL[colname]]
            print(s, "|", colname, "| len", len(v), "|", repr(v[:150]))

ts = load(ROOT + r"\src\data\sku-seo-data.ts")
print("\n=== ts exact regions ===")
# cartoon zh 交期 region
i = ts.find("正常交期")
print("cartoon zh 交期:", repr(ts[i-60:i+80]))
# cartoon ja FAQ region
for slug_anchor, q1 in [("キャラクターポチ袋", "**FAQ**"), ("エコポチ袋", "**FAQ**"), ("大判ポチ袋", "**FAQ**"), ("エンボスポチ袋", "**FAQ**")]:
    # find body blocks: search for slug entry then 'body' after it
    si = ts.find('"%s": {' % slug_anchor if slug_anchor != "エンボスポチ袋" else '"embossed-red-packets": {')
    bi = ts.find("**FAQ**", si)
    # print 80 chars before FAQ and 700 after
    print("\n--- %s FAQ region ---" % slug_anchor)
    print(repr(ts[bi:bi+520]))
