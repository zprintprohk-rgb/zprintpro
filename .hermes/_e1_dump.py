import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
p = r"F:\zprintpro-nextjs\src\data\blog-data\en.json"
raw = open(p, encoding="utf-8").read()
i = raw.find("small-batch restocking")
print("目标处原始字节 (repr):")
print(repr(raw[i-30:i+50]))
# 找一个既有 HTML <a> 链接的原始形态作参照
j = raw.find('<a href="/en/product/die-cut-stickers/"')
print("\n既有链接原始字节 (repr):")
print(repr(raw[j-20:j+70]))
