# -*- coding: utf-8 -*-
# ① 6 SKU minQuantity 真值 vs v28_5 EXIF/ledger MOQ 声明 ② sku-seo CSV imageAlt 权威值
import io, re
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
base = t.index('export const products')
SLUGS = ['foil-red-packets', 'embossed-red-packets', 'custom-red-packets',
         'cartoon-red-packets', 'eco-red-packets', 'large-red-packets']
print('--- products.ts 真值 ---')
truth = {}
for s in SLUGS:
    i = t.index("slug: '%s'" % s, base)
    seg = t[i:i+3000]
    mq = re.search(r'minQuantity: (\d+)', seg)
    name = re.search(r"name: '([^']+)'", seg)
    truth[s] = int(mq.group(1)) if mq else None
    print('%-24s minQ=%s name=%s' % (s, mq.group(1) if mq else '?', name.group(1) if name else '?'))

print('\n--- v28_5 ledger alt (hero 采样) ---')
import csv
with io.open(ROOT / 'zprintpro-en-us-images/v28_5_webp/_ledger/B_sku_consolidation.csv', encoding='utf-8-sig') as f:
    sample = f.read(4096)
    f.seek(0)
    dialect = csv.Sniffer().sniff(sample, delimiters=',\t;')
    rdr = csv.DictReader(f, dialect=dialect)
    hdr = [h.strip() for h in (rdr.fieldnames or [])]
    sku_c = next((h for h in hdr if h.lower() == 'sku'), hdr[0] if hdr else None)
    loc_c = next((h for h in hdr if h.lower() == 'locale'), None)
    view_c = next((h for h in hdr if h.lower() == 'view'), None)
    alt_c = next((h for h in hdr if h.lower() == 'alt_text'), None)
    for row in rdr:
        r = {k.strip(): v for k, v in row.items() if k}
        if r.get(sku_c) == 'RP-001' and r.get(loc_c) == 'zh-hk' and r.get(view_c) == 'hero':
            print('RP-001 zh alt:', r.get(alt_c))
        if r.get(sku_c) == 'RP-001' and r.get(loc_c) == 'en' and r.get(view_c) == 'hero':
            print('RP-001 en alt:', r.get(alt_c))
        if r.get(sku_c) == 'RP-001' and r.get(loc_c) == 'ja' and r.get(view_c) == 'hero':
            print('RP-001 ja alt:', r.get(alt_c))

print('\n--- sku-seo CSV imageAlt 权威 ---')
csvp = ROOT / 'zprintpro-sku-seo-data.csv'
if csvp.exists():
    with io.open(csvp, encoding='utf-8') as f:
        rdr = csv.DictReader(f, delimiter='\t')
        cols = rdr.fieldnames
        img_col = next((c for c in cols if 'imagealt' in c.lower().replace('_', '')), None)
        slug_col = next((c for c in cols if c.lower() == 'slug'), None)
        print('cols sample:', [c for c in cols][:12], '...')
        for row in rdr:
            if row.get(slug_col) in SLUGS and row.get('locale') == 'zh-hk':
                v = row.get(img_col, '')
                print('%-24s imageAlt=%s' % (row[slug_col], v[:100]))
else:
    print('CSV not found at', csvp)
