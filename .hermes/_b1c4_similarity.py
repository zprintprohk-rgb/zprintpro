# -*- coding: utf-8 -*-
"""Cluster4 post-rewrite similarity: food/folding/mailer tri-pair, dual method."""
import io, re

ts = io.open(r"F:\zprintpro-nextjs\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
SLUGS = ["food-boxes", "folding-boxes", "mailer-boxes"]

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

worst = 0.0
import itertools
for loc in ("zh-hk", "en", "ja"):
    for dom, key in (("body", "body"), ("desc", "description")):
        for a, b in itertools.combinations(SLUGS, 2):
            ta = field(entries[a], loc, key).replace('\\n', '\n')
            tb = field(entries[b], loc, key).replace('\\n', '\n')
            g = jac(ngrams(norm(ta), 8), ngrams(norm(tb), 8))
            worst = max(worst, g)
            flag = " <-- WATCH" if g > 0.55 else ""
            print("%-6s %-5s %-16s %-16s gram8=%.3f%s" % (loc, dom, a, b, g, flag))
print("\nWORST 8-gram = %.3f (gate <=0.55)" % worst)
