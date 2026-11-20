# -*- coding: utf-8 -*-
import io, os, re

root = r"F:\zprintpro-nextjs\src"
needles = ["3 天出貨", "FDA 級安全", "FDA-grade", "50 個起", "50 units", "50個から"]
for dp, dn, fn in os.walk(root):
    for f in fn:
        if not f.endswith((".tsx", ".ts")): continue
        p = os.path.join(dp, f)
        try:
            s = io.open(p, encoding="utf-8", newline="").read()
        except Exception:
            continue
        for n in needles:
            if n in s:
                cnt = s.count(n)
                print("%s | %s x%d" % (os.path.relpath(p, root), n, cnt))
