import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open("F:/zprintpro-nextjs/src/data/blog-data/en.json", encoding="utf-8"))
c = data["sticker-guide"]["content"]
print("JSON 有效 ✓")
print("锚存在:", "/en/product/small-batch-stickers/" in c)
print("锚闭合:", "cross-border sellers</a>" in c)
i = c.find("small-batch restocking")
print("落位片段:", c[i-40:i+80])
# H2 数
import re
print("H2 数:", len(re.findall(r"<h2", c)))
