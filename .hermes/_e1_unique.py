import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
raw = open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8").read()
needle = "campaigns and small-batch restocking for cross-border sellers."
print("目标子串出现次数:", raw.count(needle))
print("锚词组 'small-batch restocking for cross-border sellers' 出现次数:", raw.count("small-batch restocking for cross-border sellers"))
# 确认 sticker-guide 是否已含 /en/product/small-batch-stickers/ 链接
print("sticker-guide 段是否已链 small-batch-stickers:", "/en/product/small-batch-stickers/" in raw[raw.find('sticker-guide'):raw.find('sticker-design')])
