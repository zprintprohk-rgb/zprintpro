"""Find a5-flyers optimizedAt context"""
import re
with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    p = f.read()

# Find a5-flyers block - 任何编码
m = re.search(r"slug:\s*['\"]a5-flyers['\"]", p)
if m:
    print(f'Found a5-flyers at position {m.start()}')
    # find the next slug
    next_slug = re.search(r"\n\s*slug:\s*['\"]", p[m.end():])
    if next_slug:
        block_end = m.end() + next_slug.start()
    else:
        block_end = m.end() + 3000
    block = p[m.start():block_end]
    # 找 optimizedAt
    oa_idx = block.find('optimizedAt:')
    if oa_idx > 0:
        print('--- context 300 chars before and 200 after optimizedAt ---')
        print(block[max(0,oa_idx-300):oa_idx+200])
    else:
        print('No optimizedAt in block, block first 500 chars:')
        print(block[:500])
else:
    print('a5-flyers not found')
