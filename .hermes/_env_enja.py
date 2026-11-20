# -*- coding: utf-8 -*-
import io, re
P = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
s = io.open(P, encoding="utf-8", newline="").read()
for pat in [r"500 units[^']{0,60}", r"500個[^']{0,40}", r"From 500[^']{0,40}"]:
    print("== %s" % pat)
    for m in re.finditer(pat, s):
        ln = s[:m.start()].count("\n") + 1
        print("  L%d: %s" % (ln, s[max(0, m.start() - 90):m.end() + 60].replace("\n", " ")[:200]))
