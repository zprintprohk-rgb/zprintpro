# -*- coding: utf-8 -*-
"""Cluster 4 ground truth: dump food-boxes / folding-boxes (ts blocks + products blocks + CSV cells)
+ intra-cluster similarity (dual method) to locate the 98% layer."""
import io, re, json, itertools

ROOT = r"F:\zprintpro-nextjs"
SLUGS = ["food-boxes", "folding-boxes"]

ts = io.open(ROOT + r"\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
out = io.open(ROOT + r"\.hermes\_b1c4_dump_out.txt", "w", encoding="utf-8")

def w(*a):
    print(*a)
    out.write(" ".join(str(x) for x in a) + "\n")

# --- ts blocks (line-ranged) ---
ts_lines = ts.split("\n")
starts = {}
for i, ln in enumerate(ts_lines):
    for s in SLUGS:
        if re.match(r'\s*"%s": \{' % re.escape(s), ln):
            starts[s] = i
order = sorted(starts.items(), key=lambda kv: kv[1])
for j, (s, st) in enumerate(order):
    end = order[j + 1][1] if j + 1 < len(order) else min(st + 45, len(ts_lines))
    w("==== ts %s (L%d-L%d) ====" % (s, st + 1, end))
    for i in range(st, end):
        w("%d\t%s" % (i + 1, ts_lines[i]))

# --- products blocks ---
prod_lines = io.open(ROOT + r"\src\data\products.ts", encoding="utf-8", newline="").read().split("\n")
pstarts = {}
for i, ln in enumerate(prod_lines):
    for s in SLUGS:
        if ("slug: '%s'" % s) in ln:
            pstarts[s] = i
for j, (s, st) in enumerate(sorted(pstarts.items(), key=lambda kv: kv[1])):
    end = min(st + 110, len(prod_lines))
    w("\n==== products.ts %s (L%d-L%d) ====" % (s, st + 1, end))
    for i in range(st, end):
        w("%d\t%s" % (i + 1, prod_lines[i]))

# --- CSV cells ---
csv = io.open(ROOT + r"\zprintpro-sku-seo-data.csv", encoding="utf-8", newline="").read().split("\n")
hdr = csv[0].split("\t")
COL = {n: i for i, n in enumerate(hdr)}
for ln in csv:
    c = ln.split("\t")
    if len(c) > COL["Slug"] and c[COL["Slug"]] in SLUGS:
        w("\n==== CSV %s ====" % c[COL["Slug"]])
        for col in ("产品名称(ZH)", "SEO标题(ZH)", "SEO标题(EN)", "SEO标题(JA)", "SEO描述(ZH)", "SEO描述(EN)", "SEO描述(JA)",
                    "H1标题(ZH)", "H1标题(EN)", "H1标题(JA)", "SEO关键词(ZH)", "SEO关键词(EN)", "SEO关键词(JA)",
                    "图片Alt标签(ZH)", "内部链接建议"):
            w(col, "|", repr(c[COL[col]][:260]))
out.close()

# --- similarity (dual method) on the 2-SKU cluster, all locales, body+desc ---
def field(entry, loc, key):
    m = re.search(r'"%s":\s*\{.*?"%s":\s*"((?:[^"\\]|\\.)*)"' % (re.escape(loc), key), entry, re.S)
    return m.group(1) if m else ""

def norm(t):
    t = re.sub(r'\s+', '', t or '')
    return re.sub(r'[^\w\u4e00-\u9fff\u3040-\u30ff]', '', t).lower()

def ngrams(t, n):
    return set(t[i:i+n] for i in range(max(0, len(t)-n+1))) or {t}

def words(t):
    return set(re.findall(r'[\u4e00-\u9fff\u3040-\u30ff]|\w+', norm(t)))

def jac(a, b):
    return len(a & b) / len(a | b) if a and b else 0.0

parts = re.split(r'\n  "([a-z0-9-]+)": \{', ts)
entries = {parts[i]: parts[i + 1] for i in range(1, len(parts) - 1, 2)}
print("\n==== similarity (food vs folding) ====")
for loc in ("zh-hk", "en", "ja"):
    for dom, key in (("body", "body"), ("desc", "description")):
        a = norm(field(entries["food-boxes"], loc, key).replace('\\n', '\n'))
        b = norm(field(entries["folding-boxes"], loc, key).replace('\\n', '\n'))
        print("%-6s %-5s word=%.3f gram8=%.3f" % (loc, dom, jac(words(a), words(b)), jac(ngrams(a, 8), ngrams(b, 8))))
