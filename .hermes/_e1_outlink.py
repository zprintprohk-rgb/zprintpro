import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
src = open("F:/zprintpro-nextjs/src/data/products.ts", encoding="utf-8").read()
start = src.find("slug: 'small-batch-stickers'")
# 该 SKU 块范围: 往前到上一个 slug, 往后到下一个 slug
prev = src.rfind("slug: '", 0, start)
nxt = src.find("slug: '", start + 10)
blk = src[prev:nxt] if nxt > 0 else src[prev:prev+8000]
links = re.findall(r'(?:href|to)=["\x27](/[a-z-]+/(?:blog|guide|product)/[^"\x27]+)["\x27]', blk)
print("small-batch-stickers 块出链:", links if links else "无")
# 长描述里是否提到指南
for kw in ["blog", "guide", "small batch sticker printing"]:
    c = blk.count(kw)
    print(f"  含 '{kw}': {c} 次")
