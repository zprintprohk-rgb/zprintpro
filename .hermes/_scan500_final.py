# -*- coding: utf-8 -*-
import io, re
for f in [r"F:\zprintpro-nextjs\src\components\category\CategorySharpHooks.tsx",
          r"F:\zprintpro-nextjs\src\components\category\CategoryIndustries.tsx"]:
    s = io.open(f, encoding="utf-8", newline="").read()
    lines = s.split("\n")
    print("=====", f.split("\\")[-1])
    for i, l in enumerate(lines):
        if re.search(r"500", l) and not re.search(r"5,000|500-|bulk|500\+", l):
            print("L%d: %s" % (i + 1, l.strip()[:150]))
