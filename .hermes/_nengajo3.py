import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
src = open("F:/zprintpro-nextjs/src/data/sku-seo-data.ts", encoding="utf-8").read()
i = src.find("nengajo")
while i >= 0 and i < len(src):
    seg = src[max(0,i-40):i+20]
    print(repr(seg[-50:]))
    i = src.find("nengajo", i+1)
    if i > 100000: break
