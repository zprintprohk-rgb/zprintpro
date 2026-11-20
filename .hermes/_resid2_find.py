# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\data\products-content.ts", encoding="utf-8", newline="").read()
out = io.open(r"F:\zprintpro-nextjs\.hermes\_resid2.txt", "w", encoding="utf-8", newline="")
i = 0
while True:
    i = s.find("無毒", i)
    if i < 0: break
    ln = s[:i].count("\n") + 1
    out.write("L%d: ...%s...\n" % (ln, s[max(0, i - 90):i + 90].replace("\n", " ")))
    i += 1
out.close()
print("done")
