import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
raw = open("F:/zprintpro-nextjs/zprintpro-sku-seo-data.csv", encoding="utf-8", errors="replace").read()
i = raw.find("nengajo")
print("首命中上下文:")
print(repr(raw[max(0,i-80):i+40]))
# 找 slug 列
for line in raw.split("\n"):
    if "nengajo" in line.lower():
        print("行片段:", line[:120])
        break
