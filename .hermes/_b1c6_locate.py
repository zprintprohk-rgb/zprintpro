# -*- coding: utf-8 -*-
"""Cluster6 locate: a1/a2 posters (+ N-corner display/art/adhesive) anchors + quick truth."""
import io, re

ROOT = r"F:\zprintpro-nextjs"
SLUGS = ["a1-posters", "a2-posters", "display-posters", "art-posters", "adhesive-posters"]

ts = io.open(ROOT + r"\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
for s in SLUGS:
    print("sku-seo", s, "->", [m.start() for m in re.finditer('"%s": \{' % re.escape(s), ts)])

lines = io.open(ROOT + r"\src\data\products.ts", encoding="utf-8", newline="").read().split("\n")
for i, ln in enumerate(lines, 1):
    for s in SLUGS:
        if ("slug: '%s'" % s) in ln:
            print("products.ts L%d: %s" % (i, s))

csv = io.open(ROOT + r"\zprintpro-sku-seo-data.csv", encoding="utf-8", newline="").read().split("\n")
hdr = csv[0].split("\t")
ci = hdr.index("Slug")
for i, ln in enumerate(csv, 1):
    c = ln.split("\t")
    if len(c) > ci and c[ci] in SLUGS:
        print("CSV row", i, c[ci])

# quick truth dump for the pair (minQ/basePrice/price_range/specs/features/faq template?)
out = io.open(ROOT + r"\.hermes\_b1c6_dump_out.txt", "w", encoding="utf-8")
for i, ln in enumerate(lines, 1):
    for s in ("a1-posters", "a2-posters"):
        if ("slug: '%s'" % s) in ln:
            for j in range(i - 1, min(i + 95, len(lines))):
                out.write("%d\t%s\n" % (j + 1, lines[j]))
out.close()
print("truth dump -> .hermes/_b1c6_dump_out.txt")

# similarity pre-state: pair + N-corner (bodies)
def field(entry, loc, key):
    m = re.search(r'"%s":\s*\{.*?"%s":\s*"((?:[^"\\]|\\.)*)"' % (re.escape(loc), key), entry, re.S)
    return m.group(1) if m else ""

def norm(t):
    t = re.sub(r'\s+', '', t or '')
    return re.sub(r'[^\w\u4e00-\u9fff\u3040-\u30ff]', '', t).lower()

def ngrams(t, n):
    return set(t[i:i+n] for i in range(max(0, len(t)-n+1))) or {t}

def jac(a, b):
    return len(a & b) / len(a | b) if a and b else 0.0

parts = re.split(r'\n  "([a-z0-9-]+)": \{', ts)
entries = {parts[i]: parts[i + 1] for i in range(1, len(parts) - 1, 2)}
import itertools
print("\n=== posters family 8-gram pre-state ===")
have = [s for s in SLUGS if s in entries]
for loc in ("zh-hk", "en", "ja"):
    for a, b in itertools.combinations(have, 2):
        g = jac(ngrams(norm(field(entries[a], loc, "body").replace('\\n', '\n')), 8),
                ngrams(norm(field(entries[b], loc, "body").replace('\\n', '\n')), 8))
        flag = " <== DISEASE" if g > 0.55 else ""
        print("%-6s %-16s %-16s %.3f%s" % (loc, a, b, g, flag))
