# -*- coding: utf-8 -*-
import io, re
s = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()
i = s.find("doujinshi-printing")
print("first mention at", i)
# show wide context around each mention
for m in re.finditer(r"doujinshi-printing", s):
    a = m.start()
    seg = s[max(0, a-200):a+140].replace("\n", " | ")
    print("...", seg[:320])
    print("---")
