import re
src = open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8').read()
qty_matches = re.findall(r'quantities:\s*\[[^\]]*\]', src, re.DOTALL)
slug_matches = re.findall(r"slug:\s*['\"]([a-z0-9-]+)['\"]", src)
print('SKU total:', len(slug_matches))
print('SKU with quantities field:', len(qty_matches))
print('with-qty coverage:', f'{len(qty_matches)}/{len(slug_matches)} = {100*len(qty_matches)/max(1,len(slug_matches)):.1f}%')
# 哪些 SKU 没 quantities? 用反向 search
slugs_with_qty = set()
for m in re.finditer(r"slug:\s*['\"]([a-z0-9-]+)['\"]", src):
    # 找 2000 chars 内的 quantities 字段
    pos = m.end()
    window = src[pos:pos+3000]
    if 'quantities:' in window and 'value:' in window:
        slugs_with_qty.add(m.group(1))
print('slugs with qty (rough heuristic):', len(slugs_with_qty))
no_qty = [s for s in slug_matches if s not in slugs_with_qty]
print('slugs without qty:', no_qty[:15])
print('count without qty:', len(no_qty))
# Sample 1 quantities 字段结构
if qty_matches:
    print('---sample quantities---')
    print(qty_matches[0][:400])
