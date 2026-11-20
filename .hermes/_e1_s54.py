import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open("F:/zprintpro-nextjs/src/data/blog-data/en.json", encoding="utf-8"))
c = data["sticker-guide"]["content"]
n = c.count("/product/small-batch-stickers/")
print("sticker-guide → small-batch-stickers 链接数:", n, "(应=1, §5.4 每源页每目标仅 1 条)")
print("sticker-guide 全部 PDP 链接目标去重:", sorted(set(c.count(x) for x in ["die-cut-stickers","transparent-stickers","foil-stickers","waterproof-stickers"])))
