import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# large-bags 块
m = re.search(r"\{\s*id:\s*['\"]PB-\d+['\"][\s\S]*?slug:\s*['\"]large-bags['\"]", content)
if m:
    start = m.start()
    end = content.find('},', start) + 2
    print('=== large-bags block ===')
    print(content[start:end][:1500])
    print()

# japan-doujin 5 entries
print('=== japan-doujin 5 SKU ===')
for line_num in [18597, 18759, 18925, 19089, 19255]:
    # 找该行向上 5 行
    lines = content.split('\n')
    block = '\n'.join(lines[max(0, line_num-5):line_num+2])
    print(f'--- line {line_num} ---')
    print(block)
    print()
