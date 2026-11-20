import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
src = open(r"F:\zprintpro-nextjs\src\data\buying-guides.ts", encoding="utf-8").read()
# 找 stickers 相关 guide
idx = 0
count = 0
for m in re.finditer(r"slug:\s*'stickers'", src):
    s = max(0, m.start()-60)
    print("L~", src[:m.start()].count("\n")+1, "ctx:", src[s:m.end()+20].replace("\n"," ")[:110])
    count += 1
    if count > 3: break
# 找 small batch 词组
sm = re.findall(r"small[- ]batch", src, re.I)
print("\nsmall batch 出现次数:", len(sm))
for m in re.finditer(r"small[- ]batch", src, re.I):
    s = max(0, m.start()-50)
    seg = src[s:m.end()+50].replace("\n"," ")
    print("  ctx:", seg[:120])
