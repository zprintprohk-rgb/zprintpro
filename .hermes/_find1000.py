# -*- coding: utf-8 -*-
import io, re
for f in [r"src\data\product-faqs.ts"]:
    s = io.open(r"F:\zprintpro-nextjs" + "\\" + f, encoding="utf-8", newline="").read().split("\n")
    for i, l in enumerate(s):
        if re.search(r"1,000\+|1000\+|1,000 客|,000\+", l):
            print("%s L%d: %s" % (f, i + 1, l.strip()[:140]))
