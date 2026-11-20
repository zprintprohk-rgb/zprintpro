import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
v = data["sticker-guide"]
print("title:", v.get("title"))
print("description:", v.get("description"))
print("date:", v.get("date"))
print("仅改 content 字段 (锚点), title/desc/date 不动 ✓")
