# -*- coding: utf-8 -*-
"""Decisive: brace-depth scan of calendarsContent Record -> real top-level keys + per-locale spans."""
import io

cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("calendarsContent:")
# find the '=' then first '{'
j = cat.find("{", i)
depth = 0
k = j
top_keys = []
spans = {}
while k < len(cat):
    ch = cat[k]
    if ch == "{":
        depth += 1
    elif ch == "}":
        depth -= 1
        if depth == 0:
            end = k
            break
    elif depth == 1 and ch == "'" and cat[k - 1] in ("\n", " "):
        # potential top-level key
        m_end = cat.find(":", k)
        key = cat[k + 1:m_end].strip()
        if key and len(key) < 24 and (key in ("zh-hk", "en", "ja") or "Content" in key):
            top_keys.append((key, k))
    k += 1

print("Record span: %d chars, top-level keys:" % (end - i))
# compute spans between consecutive keys
for idx, (key, pos) in enumerate(top_keys):
    nxt = top_keys[idx + 1][1] if idx + 1 < len(top_keys) else end
    seg = cat[pos:nxt]
    print("  %-12s span %6d chars | 2027:%3d | featuredSnippet: %s | q/a pairs: %2d | blog-links: %d" % (
        key, len(seg), seg.count("2027"), "featuredSnippet" in seg, seg.count("q: '") + seg.count("question:"),
        seg.count("/blog/")))
print("\nnext key after calendarsContent:", cat[end:end + 80].strip().split("\n")[0][:70])
