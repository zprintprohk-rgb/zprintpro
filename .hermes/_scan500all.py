# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
lines = s.split("\n")
import re
for i, l in enumerate(lines):
    if re.search(r"500枚(?!以上)|500 pcs|500 units", l):
        print("L%d: %s" % (i + 1, l.strip()[:200]))
