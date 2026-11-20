# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
lines = s.split("\n")
for i, l in enumerate(lines):
    if "30 units" in l or "50 units" in l:
        print("L%d: ...%s..." % (i + 1, l.strip()[:200]))
        print("   ctx:", lines[max(0, i - 2)].strip()[:120])
