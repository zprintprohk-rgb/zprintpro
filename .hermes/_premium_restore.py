# -*- coding: utf-8 -*-
# premium 还原: 被 Stage A 误换的 3 语数组恢复为 v26 greeting premium 路径 (死-5 保持已摘除)
import io
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
ts_path = ROOT / 'src/data/products.ts'
t = io.open(ts_path, encoding='utf-8').read()

def loc_block(loc):
    b = "    '%s': [\n" % loc
    for v in ('hero', 'detail', 'multi-angle', 'variety'):
        b += "      '/images/v26/greeting-cards/premium/%s/%s.webp',\n" % (loc, v)
    b += "    ],"
    return b

base = t.index('export const products')
i = t.index("slug: 'premium-greeting-cards'", base)
j = t.index('imagesByLocale', i)
seg_end = t.index('\n  },', j)  # imagesByLocale 对象闭合
seg = t[i:seg_end]
new_seg = seg
for loc in ('zh-hk', 'en', 'ja'):
    m_start = new_seg.index("'%s': [" % loc)
    m_end = new_seg.index('],', m_start) + 2
    new_seg = new_seg[:m_start] + loc_block(loc) + new_seg[m_end:]
t = t[:i] + new_seg + t[seg_end:]

# 验证: premium 数组=v26; place-cards 产品图引用=0 (产品不存在); 其余 greeting 兄弟未被误伤
seg2 = t[i:i+2200]
assert '/images/v26/greeting-cards/premium/zh-hk/hero.webp' in seg2
assert 'zprintpro-place-cards' not in seg2
for sib in ('thick-greeting-cards-400g', 'foil-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards'):
    k = t.index("slug: '%s'" % sib, base)
    blk = t[k:k+2600]
    assert 'zprintpro-place-cards' not in blk, sib
io.open(ts_path, 'w', encoding='utf-8', newline='\n').write(t)
print('premium restored; siblings clean')
