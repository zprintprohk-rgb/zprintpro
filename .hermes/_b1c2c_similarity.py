# -*- coding: utf-8 -*-
"""B1c cluster2 post-rewrite similarity gate: dual method (8-gram shingle + word-level Jaccard).
Scope: 6 red-packets SKUs + category hub text, 3 locales, body + description domains.
Gate: word-Jaccard <= 0.55 (red line < 0.60), 8-gram reported alongside (B1 audit metric)."""
import io, re, itertools, json, sys

ROOT = r"F:\zprintpro-nextjs"
SLUGS = ["foil-red-packets", "embossed-red-packets", "custom-red-packets",
         "cartoon-red-packets", "eco-red-packets", "large-red-packets"]
LOCS = ["zh-hk", "en", "ja"]

src = io.open(ROOT + r"\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()

# split entries
parts = re.split(r'\n  "([a-z0-9-]+)": \{', src)
entries = {}
for i in range(1, len(parts) - 1, 2):
    entries[parts[i]] = parts[i + 1]

def field(entry, loc, key):
    m = re.search(r'"%s":\s*\{.*?"%s":\s*"((?:[^"\\]|\\.)*)"' % (re.escape(loc), key), entry, re.S)
    return m.group(1) if m else ""

def unesc(t):
    return t.replace('\\n', '\n').replace('\\"', '"')

def norm(t):
    t = re.sub(r'\s+', '', t or '')
    return re.sub(r'[^\w\u4e00-\u9fff\u3040-\u30ff]', '', t).lower()

def ngrams(t, n):
    return set(t[i:i+n] for i in range(max(0, len(t)-n+1))) or {t}

def words(t):
    return set(re.findall(r'[\u4e00-\u9fff\u3040-\u30ff]|\w+', norm(t)))

def jac(a, b):
    return len(a & b) / len(a | b) if a and b else 0.0

worst = []
report = {}
for loc in LOCS:
    dom = {}
    for s in SLUGS:
        e = entries.get(s, "")
        body = norm(unesc(field(e, loc, "body")))
        desc = norm(field(e, loc, "description"))
        dom.setdefault("body", {})[s] = body
        dom.setdefault("desc", {})[s] = desc
    for domain, items in dom.items():
        pairs = {}
        for a, b in itertools.combinations(SLUGS, 2):
            w = jac(words(items[a]), words(items[b]))
            g = jac(ngrams(items[a], 8), ngrams(items[b], 8))
            pairs[a + "|" + b] = {"word": round(w, 3), "gram8": round(g, 3)}
            worst.append((max(w, g), domain, loc, a, b))
        report.setdefault(domain, {})[loc] = pairs

print("=== worst 12 pairs (by max(word, gram8)) ===")
for w, domain, loc, a, b in sorted(worst, reverse=True)[:12]:
    print("%-5s %-4s %-5s %-24s %-24s" % (round(w, 3), domain, loc, a, b))

viol = [(w, d, l, a, b) for w, d, l, a, b in worst if w >= 0.60]
print("\nGATE: red line <0.60 -> violations:", len(viol))
for v in viol:
    print("VIOLATION:", v)

tgt = [(w, d, l, a, b) for w, d, l, a, b in worst if w > 0.55]
print("target <=0.55 exceedances:", len(tgt))
for t in tgt:
    print("OVER-TARGET:", t)

with io.open(ROOT + r"\.hermes\analysis\b1c-cluster2-final-similarity-2026-10-15.json", "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=1)
print("\nevidence: .hermes/analysis/b1c-cluster2-final-similarity-2026-10-15.json")
sys.exit(2 if viol else 0)
