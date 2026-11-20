# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
a = s.find("packagingContent:")
b = s.find("{", a)
d = 0; k = b; e = None
while k < len(s):
    if s[k] == "{": d += 1
    elif s[k] == "}":
        d -= 1
        if d == 0: e = k; break
    k += 1
pkg = s[a:e]
base_line = s[:a].count("\n") + 1
needles = ["30 個", "50 個", "30 units", "50 units", "100–200", "3 天", "3-day", "3 days"]
for n in needles:
    idx = 0
    while True:
        idx = pkg.find(n, idx)
        if idx < 0: break
        ln = base_line + pkg[:idx].count("\n")
        seg = pkg[max(0, idx - 90):idx + 90].replace("\n", " ")
        print("[%s] L~%d: ...%s..." % (n, ln, seg))
        idx += 1
