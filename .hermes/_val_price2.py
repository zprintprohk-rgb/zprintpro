import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['saddle-stitch-booklets','exercise-books','catalog-printing']:
    # 找 slug 出现位置, 提取其后 1200 字符内所有 price/moq 相关行
    idx = src.find(f"slug: '{slug}'")
    if idx < 0: continue
    chunk = src[idx:idx+2500]
    for line in chunk.splitlines()[:40]:
        if re.search(r'price|moq|MOQ|min|from|currency', line, re.I):
            print(f'[{slug}] {line.strip()[:100]}')
    print()
