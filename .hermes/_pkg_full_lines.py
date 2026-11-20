# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
lines = s.split("\n")
for ln in [276, 295, 324, 383, 404]:
    print("L%d FULL: %s" % (ln, lines[ln - 1].strip()))
    print()
