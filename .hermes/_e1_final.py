import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open("F:/zprintpro-nextjs/src/data/blog-data/en.json", encoding="utf-8"))
c = data["sticker-guide"]["content"]
print("JSON 解析 OK | H2 数:", c.count("<h2"), "| 锚数:", c.count("/product/small-batch-stickers/"))
print("sticker-guide 文章数:", len(data), "篇")
