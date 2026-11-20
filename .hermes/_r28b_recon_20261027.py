# -*- coding: utf-8 -*-
"""Robust residue scan: brace-matching segments, all slugs (10-27 order 28b recon)."""
import io, re

s = io.open(r"src\data\sku-seo-data.ts", encoding="utf-8").read()

def slug_seg(s, slug):
    i = s.find('"%s": {' % slug)
    if i == -1: return None
    # brace matching from the '{' after '"slug": '
    brace = s.find('{', i)
    depth = 0
    p = brace
    while p < len(s):
        if s[p] == '{': depth += 1
        elif s[p] == '}':
            depth -= 1
            if depth == 0:
                return s[i:p+1]
        p += 1
    return s[i:]

# top-level slugs: match lines that look like '"slug": {' — use the known pattern
cands = re.findall(r'\n {2}"([a-z0-9-]+)": \{', s)
# dedupe preserving order
seen = []
for c in cands:
    if c not in seen and not c.startswith("'"):
        seen.append(c)
# filter to those whose segment contains a zh-hk locale block (true slugs)
true_slugs = [c for c in seen if '"zh-hk": {' in (slug_seg(s, c) or "") and '"ja": {' in (slug_seg(s, c) or "")]
print("true slugs:", len(true_slugs))

res = {}
for slug in true_slugs:
    seg = slug_seg(s, slug) or ""
    cert = len(re.findall(r'国際認証体系', seg))
    fda = len(re.findall(r'FDA', seg))
    scn = len(re.findall(r'推廣單張、活動入口的指示牌', seg))
    sgs = len(re.findall(r'SGS', seg))
    if cert or fda or scn or sgs:
        res[slug] = (cert, fda, scn, sgs)

for slug, (cert, fda, scn, sgs) in sorted(res.items()):
    print("  %-32s cert=%d fda=%d scn=%d sgs=%d" % (slug, cert, fda, scn, sgs))
tot = tuple(sum(r[i] for r in res.values()) for i in range(4))
print("TOTAL:", tot)
