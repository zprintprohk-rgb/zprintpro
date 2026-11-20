# -*- coding: utf-8 -*-
"""doujinshi-printing: tri-body clone check + hub structure keys."""
import io, re, itertools

ts = io.open(r"F:\zprintpro-nextjs\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
bi = ts.find('"doujinshi-printing": {')
bseg = ts[bi:bi + 20000]
bodies = {}
for loc in ("zh-hk", "en", "ja"):
    li = bseg.find('"' + loc + '"')
    b = re.search(r'"body":\s*"((?:[^"\\]|\\.)*)"', bseg[li:li + 9500])
    bodies[loc] = b.group(1) if b else ""

print("zh==en:", bodies["zh-hk"] == bodies["en"], "| en==ja:", bodies["en"] == bodies["ja"])
print("zh body[:260]:", bodies["zh-hk"][:260])


def n8(t, n=8):
    t = re.sub(r"\s+", "", t)
    return set(t[i:i + n] for i in range(max(0, len(t) - n + 1))) or {t}


for a, b in itertools.combinations(("zh-hk", "en", "ja"), 2):
    print(a, "vs", b, "gram8=%.3f" % (len(n8(bodies[a]) & n8(bodies[b])) / len(n8(bodies[a]) | n8(bodies[b]))))

cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("japanDoujinContent")
seg = cat[i:i + 40000]
j = seg.find("'ja'")
keys = re.findall(r"(\w+): \{", seg[j:j + 9000])
print("hub ja structure keys:", sorted(set(keys)))
fs = re.search(r"featuredSnippet", seg[j:j + 9000])
print("hub ja has featuredSnippet:", bool(fs))
