import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
c = data["sticker-guide"]["content"]
i = c.find("small-batch restocking for cross-border sellers")
s = max(0, i-40)
print("目标段落精确文本:")
print("..." + c[s:i+60] + "...")
print()
# 确认是否已在 <a> 内 (避免重复)
j = c.find("small-batch restocking")
pre = c[max(0,j-120):j]
print("前 120 字符 (检查是否已是链接):")
print(pre[-80:])
