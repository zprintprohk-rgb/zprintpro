import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
p = r"F:\zprintpro-nextjs\src\data\blog-data\en.json"
raw = open(p, encoding="utf-8").read()
old = "campaigns and small-batch restocking for cross-border sellers."
# 注意: raw 中是 \n 转义 (repr 显示 \\n)，new 里也须保持同样形态
new = "campaigns and <a href=\\\"/en/product/small-batch-stickers/\\\">small-batch restocking for cross-border sellers</a>."
assert raw.count(old) == 1, f"old 出现 {raw.count(old)} 次"
raw2 = raw.replace(old, new)
data = json.loads(raw2)
c = data["sticker-guide"]["content"]
print("dry-run JSON 有效 ✓")
print("锚 URL 存在:", "/en/product/small-batch-stickers/" in c)
print("该段出现锚:", "cross-border sellers</a>." in c)
# 显示渲染后的锚片段
i = c.find("small-batch restocking")
print("渲染后片段:", c[i-30:i+60])
