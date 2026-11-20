# -*- coding: utf-8 -*-
"""B1c cluster2 cleanup: locate anchors + extract ground truth (read-only)."""
import io, json, os, re, sys

ROOT = r"F:\zprintpro-nextjs"
SLUGS = ["cartoon-red-packets", "eco-red-packets", "large-red-packets",
         "foil-red-packets", "embossed-red-packets", "custom-red-packets"]

def p(*a):
    print(*a)

# 1) lane.lock
lp = os.path.join(ROOT, ".hermes", "locks", "lane.lock")
p("LANE_LOCK:", "ABSENT" if not os.path.exists(lp) else "EXISTS mtime=" + str(os.path.getmtime(lp)))

# 2) products.ts anchors
prod_path = os.path.join(ROOT, "src", "data", "products.ts")
with io.open(prod_path, "r", encoding="utf-8") as f:
    prod_lines = f.readlines()
p("\n=== products.ts slug anchors ===")
anchors = {}
for i, ln in enumerate(prod_lines, 1):
    for s in SLUGS:
        if ('slug: "%s"' % s) in ln or ("slug: '%s'" % s) in ln:
            anchors[s] = i
            p(i, ln.strip()[:90])

# 3) sku-seo-data.ts anchors
seo_path = os.path.join(ROOT, "src", "data", "sku-seo-data.ts")
with io.open(seo_path, "r", encoding="utf-8") as f:
    seo_lines = f.readlines()
p("\n=== sku-seo-data.ts slug anchors (entry starts) ===")
seo_anchors = {}
for i, ln in enumerate(seo_lines, 1):
    for s in SLUGS:
        # entry pattern like: 'cartoon-red-packets': {  OR "cartoon-red-packets": {
        if re.search(r'''['"]%s['"]\s*:\s*\{''' % re.escape(s), ln):
            seo_anchors.setdefault(s, []).append(i)
for s in SLUGS:
    p(s, "->", seo_anchors.get(s, "NOT FOUND"))

# 4) CSV row locations
csv_path = os.path.join(ROOT, "zprintpro-sku-seo-data.csv")
with io.open(csv_path, "r", encoding="utf-8") as f:
    csv_lines = f.readlines()
p("\n=== CSV header (first line, first 40 fields indexed) ===")
hdr = csv_lines[0].rstrip("\n").split("\t")
for idx, name in enumerate(hdr):
    p(idx, name)
p("\n=== CSV red-packets row numbers ===")
for i, ln in enumerate(csv_lines, 1):
    for s in SLUGS:
        if ln.startswith(s + "\t") or ("\t" + s + "\t") in ln[:200]:
            p("line", i, "slug", s)
