import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
src = open("F:/zprintpro-nextjs/src/data/category-seo-content.ts", encoding="utf-8").read()
start = src.find("const booksContent")
end = src.find("\nconst ", start + 10)
blk = src[start:end] if end > 0 else src[start:start+20000]
links = re.findall(r'[hH]ref=[\"\x27](/[a-z-]+/product/[^\"\x27]+)[\"\x27]', blk)
print("booksContent 内链 (en 形态) 数量:", len(links))
for l in set(links):
    if 'saddle' in l or 'product' in l:
        print("  ", l)
# 也看 markdown 形态 [text](/xxx)
mlinks = re.findall(r'\[[^\]]*\]\((/[^)]*product[^)]*)\)', blk)
print("markdown 内链:", set(mlinks) if mlinks else "无")
# 判断 books category 是否有任何 product 链接
anyprod = re.findall(r'/product/', blk)
print("含 /product/ 次数:", len(anyprod))
