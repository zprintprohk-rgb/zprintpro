import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
p = r"F:\zprintpro-nextjs\src\data\blog-data\en.json"
raw = open(p, encoding="utf-8").read()
old = "campaigns and small-batch restocking for cross-border sellers."
new = "campaigns and <a href=\"/en/product/small-batch-stickers/\">small-batch restocking for cross-border sellers</a>."
assert raw.count(old) == 1, "old 出现次数 != 1"
raw2 = raw.replace(old, new)
data = json.loads(raw2)  # 若破坏 JSON 会抛异常
c = data["sticker-guide"]["content"]
print("dry-run JSON 有效 ✓")
print("锚出现:", "/en/product/small-batch-stickers/" in c)
print("H2 数保持:", len(c.split('<h2')))
