# -*- coding: utf-8 -*-
# 价格报告博文 83→82 SKU 计数修正 (限 hong-kong-printing-cost-baseline-2026 一篇, 3 语)
import io, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
KEY = 'hong-kong-printing-cost-baseline-2026'
total = 0
for loc in ('zh-hk', 'en', 'ja'):
    p = ROOT / f'src/data/blog-data/{loc}.json'
    d = json.load(io.open(p, encoding='utf-8'))
    assert KEY in d, (loc, 'post missing')
    n = 0
    for fld in ('title', 'description', 'excerpt', 'content'):
        v = d[KEY].get(fld)
        if isinstance(v, str) and '83' in v:
            cnt = v.count('83')
            d[KEY][fld] = v.replace('83 SKU', '82 SKU').replace('83 個在售 SKU', '82 個在售 SKU') \
                           .replace('83 の実 SKU', '82 の実 SKU').replace('83 SKU、', '82 SKU、') \
                           .replace('83 個 SKU', '82 個 SKU')
            n += cnt
    # 二次兜底: 该篇内仍存的 "83 " 数字计数语境
    for fld in ('title', 'description', 'excerpt', 'content'):
        v = d[KEY].get(fld)
        if isinstance(v, str):
            import re
            d[KEY][fld] = re.sub(r'83(?= ?(?:live )?SKU)', '82', v)
    io.open(p, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2) + '\n')
    # 验证
    d2 = json.load(io.open(p, encoding='utf-8'))
    resid = sum(1 for fld in ('title', 'description', 'excerpt', 'content')
                if isinstance(d2[KEY].get(fld), str) and '83' in d2[KEY][fld])
    print('%s: patched-fields-hits=%d residual-83=%d' % (loc, n, resid))
    total += resid
assert total == 0, total
print('83->82 DONE (3 locales)')
