# -*- coding: utf-8 -*-
"""Verify w32 write actually landed + similarity after."""
import io, re, itertools

ts = io.open(r"F:\zprintpro-nextjs\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
print("has EN new body:", "Doujinshi printing for Comiket cycles" in ts)
print("has JA new body:", "コミケに向けた同人誌印刷" in ts)
print("has C107 anchor:", "C107 直答" in ts)

bi = ts.find('"doujinshi-printing": {')
ei = ts.find('\n  "', bi + 4)
blk = ts[bi:ei if ei > 0 else len(ts)]
print("block len:", len(blk))
bodies = {}
lines = blk.split("\n")
seg = 0
for loc in ("zh-hk", "en", "ja"):
    loc_line = next(k for k, ln in enumerate(lines) if ln.strip().startswith('"%s": {' % loc))
    loc_end = next((k for k in range(loc_line + 1, len(lines)) if re.match(r'\s*"(zh-hk|en|ja)": \{', lines[k])), len(lines))
    bl = [ln for ln in lines[loc_line:loc_end] if ln.strip().startswith('"body": "')]
    assert len(bl) == 1, (loc, len(bl))
    m = re.search(r'"body":\s*"((?:[^"\\]|\\.)*)"', bl[0])
    bodies[loc] = m.group(1)
    print(loc, "len", len(bodies[loc]), "| C107:", bodies[loc].count("C107"), "| head:", bodies[loc][:56])


def n8(t, n=8):
    t = re.sub(r"\s+", "", t)
    return set(t[i:i + n] for i in range(max(0, len(t) - n + 1))) or {t}


for a, b in itertools.combinations(("zh-hk", "en", "ja"), 2):
    print(a, "vs", b, "gram8=%.3f" % (len(n8(bodies[a]) & n8(bodies[b])) / len(n8(bodies[a]) | n8(bodies[b]))))
