# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\lib\seo.ts", encoding="utf-8", newline="").read().split("\n")
for i in range(463, 480):
    print(i + 1, repr(s[i][:300]))
