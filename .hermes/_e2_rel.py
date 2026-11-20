import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
src = open("F:/zprintpro-nextjs/src/data/category-seo-content.ts", encoding="utf-8").read()
start = src.find("const booksContent")
end = src.find("\nconst ", start + 10)
blk = src[start:end] if end > 0 else src[start:start+20000]
m = re.search(r'relatedProducts[^;]{0,600}', blk)
if m:
    print("relatedProducts 配置存在:")
    print(m.group(0)[:400])
else:
    print("booksContent 无 relatedProducts 字段")
# 检查 buying-guides.ts 是否有 books
bg = open("F:/zprintpro-nextjs/src/data/buying-guides.ts", encoding="utf-8").read()
print("\nbuying-guides.ts 含 books 次数:", bg.count("books"))
bstart = bg.find("books")
if bstart > 0:
    print("books buying-guide 段有 saddle 链接:", "saddle-stitch-booklets" in bg[bstart:bstart+3000])
