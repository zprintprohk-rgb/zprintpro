# -*- coding: utf-8 -*-
import io, re
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
a = s.find("packagingContent:")
b = s.find("{", a); d = 0; k = b; e = None
while k < len(s):
    if s[k] == "{": d += 1
    elif s[k] == "}":
        d -= 1
        if d == 0: e = k; break
    k += 1
pkg = s[a:e]
base = s[:a].count("\n") + 1
pats = ["全盒型 100", "100 units for all", "all box styles", "全箱型100個から", "異形刀模 500", "die-cuts from 500", "カスタム型抜きは500", "100 個起", "From 100", "100 units", "100個から"]
seen = set()
for i, l in enumerate(pkg.split("\n")):
    if any(p in l for p in pats):
        t = l.strip()[:200]
        if t in seen: continue
        seen.add(t)
        print("L%d: %s" % (base + i, t))
