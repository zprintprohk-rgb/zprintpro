# -*- coding: utf-8 -*-
import io, re
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()

# ① 婚礼对条目 id + images 现状
for slug in ('foil-wedding-invitations', 'wedding-thank-you-cards', 'wedding-invitations'):
    i = t.index("slug: '%s'" % slug)
    seg = t[i:i+2500]
    mid = re.search(r"id: '([A-Z]+-\d+)'", seg)
    mim = re.search(r"images: \['([^']+)'\]", seg)
    mibl = re.search(r'imagesByLocale', seg)
    print('%-28s id=%s images=%s imagesByLocale=%s' % (slug, mid.group(1) if mid else None, mim.group(1) if mim else None, bool(mibl)))

# ② 全站 id 计数
ids = re.findall(r"id: '([A-Z]+-\d+)'", t)
print('\ntotal id-coded entries:', len(ids))

# ③ v28_5 婚礼目录
v = ROOT / 'zprintpro-en-us-images/v28_5_webp'
print('\nv28_5 WI dirs:', sorted(p.name for p in v.iterdir() if p.is_dir() and p.name.startswith('WI')))
for d in sorted(p for p in v.iterdir() if p.is_dir() and p.name.startswith('WI')):
    print(' %s: %d files, e.g. %s' % (d.name, len(list(d.iterdir())), sorted(p.name for p in d.iterdir())[:2]))

# ④ v26 greeting 目录存在性
v26 = ROOT / 'public/images/v26/greeting-cards'
print('\nv26 greeting-cards dirs:', sorted(p.name for p in v26.iterdir()) if v26.exists() else 'MISSING')

# ⑤ v28_5 中贺卡 6 兄弟的 SKU 码 (从 ledger 文件名反查)
led = io.open(v / '_ledger/B_sku_consolidation.csv', encoding='utf-8').read()
for pat in ('premium-greeting', 'thick', 'foil', 'spot-uv', 'matte', 'rounded'):
    hits = sorted(set(re.findall(r"^(BC-\d+),[^\n]*zprintpro-[^\n]*%s[^\n]*$" % pat.replace('-', '-'), led, re.MULTILINE)))
    m = re.search(r"(BC-\d+),[a-z-]+,hero,[^,]*greeting[^\n]*%s" % pat, led)
    print('v28_5 贺卡码 %-14s -> %s' % (pat, hits[:3] if hits else re.findall(r'(BC-\d{3})[^\n]*%s' % pat, led)[:3]))
