# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
a = s.find("envelopesContent:")
b = s.find("{", a); d = 0; k = b; e = None
while k < len(s):
    if s[k] == "{": d += 1
    elif s[k] == "}":
        d -= 1
        if d == 0: e = k; break
    k += 1
env = s[a:e]
base = s[:a].count("\n") + 1
i = 0
while True:
    i = env.find("500 pcs", i)
    if i < 0: break
    print("L%d: %s" % (base + env[:i].count("\n"), env[max(0, i - 130):i + 130].replace("\n", " ")))
    i += 1
