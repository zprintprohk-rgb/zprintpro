import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
c = data["sticker-guide"]["content"]
h2 = re.findall(r'<h2[^>]*>', c)
print("sticker-guide H2 数:", len(h2))
for h in h2[:6]:
    print("  ", h[:40])
# 检查目标锚是否在 H2 后的采购段
i = c.find("small-batch restocking")
seg = c[max(0,i-500):i]
print("\n锚前 500 字符是否含 H2:")
print("  'What's the minimum order' 存在:", "minimum order" in seg)
print("  'Can I print small batches' 存在:", "print small batches" in seg)
