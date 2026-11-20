# -*- coding: utf-8 -*-
# 严格毒串终验: ja 文件零「紅包」; 全部文件零「樣片」/「ISO 9001」/「sample」; zh「紅包」=合法春節紅包
from pathlib import Path
DST = Path(r'F:\zprintpro-nextjs/public/images/products/seedream-webp')
files = sorted(DST.glob('zprintpro-red-packets-*.webp'))
print('total rp webp files:', len(files))
zh_hb, ja_hb, poison = 0, 0, []
for p in files:
    b = p.read_bytes()
    if '-zh-hk' in p.name:
        zh_hb += '紅包'.encode('utf-8') in b  # 合法: 春節紅包
    elif '-ja' in p.name:
        if '紅包'.encode('utf-8') in b:
            ja_hb += 1
            poison.append(('ja紅包', p.name))
    for needle in ('樣片', 'ISO 9001'):
        if needle.encode('utf-8') in b:
            poison.append((needle, p.name))
    if b'sample' in b:
        poison.append(('sample', p.name))
print('zh 紅包 (合法): %d 文件' % zh_hb)
print('ja 紅包 (必须 0):', ja_hb)
print('真毒串:', poison if poison else 'NONE')
assert len(files) == 72 and not poison and ja_hb == 0
print('POISON-FREE OK (strict)')
