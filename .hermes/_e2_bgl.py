import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
src = open("F:/zprintpro-nextjs/src/data/buying-guides.ts", encoding="utf-8").read()
# 找 books 相关段落的产品链接
for m in re.finditer(r'books', src):
    pass
# 找所有 /product/ 链接在 buying-guides.ts 的分布
links = re.findall(r'["\x27](/[a-z-]+/product/[^"\x27]+)["\x27]', src)
print("buying-guides.ts 全部 product 链接:")
for l in set(links):
    print("  ", l)
