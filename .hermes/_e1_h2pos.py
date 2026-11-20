import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
c = data["sticker-guide"]["content"]
# 找 H2 "What's the minimum order" 及其后第一个 <p>
h2 = c.find("What's the minimum order")
seg = c[h2:h2+900]
print("H2 之后结构:")
# 提取该 H2 后到下一个 H2 的内容
next_h2 = c.find("<h2", h2+10)
block = c[h2:next_h2 if next_h2>0 else h2+1500]
# 锚在 block 哪个位置
ai = block.find("small-batch restocking")
print("H2 与锚距离:", ai, "字符")
print("block 前 120:", re.sub(r'<[^>]+>',' ',block[:120])[:120])
print("锚在 block 内 (第", ai, "字符) — H2 后第一个采购段内 ✓" if ai < 600 else "锚不在第一段")
