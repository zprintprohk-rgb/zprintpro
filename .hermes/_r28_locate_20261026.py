# -*- coding: utf-8 -*-
"""Locate order-28 residue classes in sku-seo-data.ts, bucket by slug/family."""
import io, re

s = io.open(r"src\data\sku-seo-data.ts", encoding="utf-8").read()
slugs = re.findall(r'^\s*"([a-z0-9-]+)": \{', s, re.M)
print("total slugs:", len(slugs))

def seg(slug):
    i = s.find('"%s": {' % slug)
    j = s.find('\n  "', i + 1)
    return s[i:j if j != -1 else len(s)]

classes = {
    "cert_ja": r'国際認証体系',
    "fda_en": r'FDA',
    "wrong_scn_zh": r'推廣單張、活動入口的指示牌',
}
buckets = {k: [] for k in classes}
total = {k: 0 for k in classes}

for slug in slugs:
    t = seg(slug)
    for k, pat in classes.items():
        n = len(re.findall(pat, t))
        if n:
            buckets[k].append((slug, n))
            total[k] += n

for k in classes:
    print("\n== %s total=%d slugs=%d" % (k, total[k], len(buckets[k])))
    for slug, n in buckets[k][:30]:
        print("   %-32s %d" % (slug, n))

# family grouping heuristic: map slug to family by keyword
def family(slug):
    for kw in ["box", "bag", "envelope", "leaflet", "flyer", "sticker", "poster", "calendar",
               "card", "book", "booklet", "notebook", "brochure", "label", "tag", "folder",
               "letterhead", "menu", "invoice", "ticket", "banner", "flag", "sign", "rollup",
               "cup", "bottle", "pen", "gift", "packaging", "paper", "board", "hanger", "ribbon",
               "seal", "stamp", "mask", "glove", "tote", "pouch", "sleeve", "jacket", "cover",
               "wrap", "box", "carton", "display", "stand", "frame", "plaque", "trophy"]:
        if kw in slug:
            return kw
    return "other"

for k in classes:
    fam = {}
    for slug, n in buckets[k]:
        f = family(slug)
        fam[f] = fam.get(f, 0) + n
    top = sorted(fam.items(), key=lambda x: -x[1])[:12]
    print("== %s by family: %s" % (k, ", ".join("%s:%d" % (a, b) for a, b in top)))
