# -*- coding: utf-8 -*-
"""Extract calendarsContent block: top-level locale keys + each locale's sub-keys + zh 2027 sample."""
import io, re

cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("calendarsContent:")
# block ends at the next `XxxContent:` key
m = re.search(r"\n[a-zA-Z]+Content:", cat[i + 10:])
end = i + 10 + m.start() if m else len(cat)
blk = cat[i:end]
print("calendarsContent block: %d chars" % len(blk))
# top-level locales: lines like '  'zh-hk': {' at 2-space indent
for ln in blk.split("\n"):
    if re.match(r"^  '", ln):
        print("TOP-LOCALE:", ln.strip()[:40])
# zh 2027 mentions sample
zi = blk.find("'zh-hk'")
zseg = blk[zi:zi + 14000]
print("\nzh 2027 sample lines:")
c = 0
for ln in zseg.split("\n"):
    if "2027" in ln and c < 6:
        print("  ", ln.strip()[:160])
        c += 1
# featuredSnippet location
fi = blk.find("featuredSnippet")
print("\nfeaturedSnippet at block offset:", fi, "context:", blk[fi:fi + 260].replace("\n", " | ")[:260])
# which locales have featuredSnippet
for loc in ("zh-hk", "en", "ja"):
    li = blk.find("'" + loc + "'")
    nxt = min([x for x in (blk.find("'zh-hk'", li + 6), blk.find("'en'", li + 6), blk.find("'ja'", li + 6)) if x > li] or [len(blk)])
    lseg = blk[li:nxt]
    print(loc, "segment %d chars | featuredSnippet: %s | faq-like:" % (len(lseg), "featuredSnippet" in lseg),
          lseg.count("question"), "| 2027:", lseg.count("2027"))
