import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
v = data.get("sticker-guide", {})
c = v.get("content", "")
print("sticker-guide content len:", len(c))
# 找 small batch / small-batch 词组出现
for m in re.finditer(r"small[- ]batch", c, re.I):
    s = max(0, m.start()-70)
    print("ctx:", c[s:m.end()+80].replace("\n"," ")[:170])
    print()
