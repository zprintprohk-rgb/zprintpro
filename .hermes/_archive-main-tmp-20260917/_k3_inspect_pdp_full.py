content = open(r'src/app/[locale]/product/[slug]/page.tsx', encoding='utf-8').read()
lines = content.split('\n')
print('--- orderform / ReferencePriceBlock 引用位置 ---')
for i, l in enumerate(lines):
    if 'OrderForm' in l or 'ReferencePriceBlock' in l or 'orderform' in l or 'referencepriceblock' in l:
        print(f'L{i+1}: ' + l[:120])
print('')
print('--- 总行数 ---')
print(f'  {len(lines)} lines')
print('')
# 看 PDP 主要 section 结构
print('--- PDP 主要 section (前 30 个 component 引用) ---')
import re
comps = re.findall(r'<\w+(?:\s+[^>]*)?>', content)
seen = set()
for c in comps[:200]:
    tag = c.split()[0].lstrip('<')
    if tag and tag[0].isupper() and tag not in seen:
        seen.add(tag)
        if len(seen) <= 30:
            print(f'  {tag}')
