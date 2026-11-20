# -*- coding: utf-8 -*-
"""Cross-category MOQ/turnaround claim audit vs products.ts truths.
Read-only: lists suspicious numeric claims per category block so we can judge (no auto-fix)."""
import io, os, re, json

ROOT = r"F:\zprintpro-nextjs"
prod = io.open(os.path.join(ROOT, "src", "data", "products.ts"), encoding="utf-8", newline="").read()

# parse products: slug -> (category, minQuantity)
objs = re.findall(r"\{[^{}]*?slug:\s*'([a-z0-9-]+)'[^{}]*?category:\s*'([a-z-]+)'[^{}]*?minQuantity:\s*(\d+)", prod, re.S)
cats = {}
for slug, cat, mq in objs:
    cats.setdefault(cat, []).append((slug, int(mq)))
print("== products.ts minQuantity per category ==")
for c in sorted(cats):
    vals = sorted(set(m for _, m in cats[c]))
    print("  %-22s n=%2d  minQ=%s" % (c, len(cats[c]), vals))

# scan claim sources for MOQ-ish numbers
SRC = [
    ("seo", "src/data/category-seo-content.ts"),
    ("conv", "src/data/category-conversion-blocks.ts"),
    ("ind", "src/components/category/CategoryIndustries.tsx"),
    ("hook", "src/components/category/CategorySharpHooks.tsx"),
]
pats = [
    r"(\d+)\s*個起", r"(\d+)\s*張起", r"(\d+)\s*本起", r"(\d+)\s*份起", r"(\d+)\s*枚から",
    r"from\s+(\d+)\b", r"(\d+)\s*units?\b",
]
print("\n== numeric MOQ-style claims found per source ==")
for tag, rel in SRC:
    s = io.open(os.path.join(ROOT, rel), encoding="utf-8", newline="").read()
    found = []
    for p in pats:
        for m in re.finditer(p, s):
            num = int(m.group(1))
            if num in (1, 2, 3, 5, 7, 10, 20, 30, 50, 100, 200, 250, 300, 500, 1000):
                ctx = s[max(0, m.start()-70):m.end()+50].replace("\n", " ")
                found.append((num, ctx))
    if found:
        print("\n[%s] %s  (%d hits)" % (tag, rel, len(found)))
        seen = set()
        for num, ctx in found[:40]:
            key = (num, ctx[:60])
            if key in seen: continue
            seen.add(key)
            print("   %4d | %s" % (num, ctx[:150]))
