# -*- coding: utf-8 -*-
"""Extract current-ts h1/desc/kw for 16 slugs (these are the pristine ts-only values to preserve)"""
import io, re, json

ts = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
slugs = ['save-the-date-cards', 'foil-wedding-invitations', 'wedding-thank-you-cards',
         'wedding-place-cards', 'wedding-seating-charts', 'wedding-suite-bundle',
         'corrugated-boxes', 'electronics-packaging-box', 'kraft-paper-packaging-box',
         'magnetic-closure-gift-box', 'tuck-end-boxes', 'white-card-boxes', 'gang-run-card-boxes',
         'cafe-table-cards', 'drink-tokens', 'fruit-food-label-stickers']
out = {}
for slug in slugs:
    i = ts.find('"%s": {' % slug)
    if i < 0:
        print(slug, 'NOT FOUND'); continue
    j = ts.find('\n  "', i + 6)
    seg = ts[i:j if j > 0 else len(ts)]
    entry = {}
    for loc in ['zh-hk', 'en', 'ja']:
        k = seg.find('"%s": {' % loc)
        if k < 0:
            continue
        s = seg[k:k + 3600]
        h1 = re.search(r'"h1":\s*"((?:[^"\\]|\\.)*)"', s)
        de = re.search(r'"description":\s*"((?:[^"\\]|\\.)*)"', s)
        kw = re.findall(r'"((?:[^"\\]|\\.)*)"', re.search(r'"keywords":\s*\[([^\]]*)\]', s).group(1)) if re.search(r'"keywords":\s*\[([^\]]*)\]', s) else []
        entry[loc] = {'h1': h1.group(1) if h1 else '', 'desc': de.group(1) if de else '', 'kw': kw}
    out[slug] = entry
    for loc in ['zh-hk', 'en', 'ja']:
        e = entry.get(loc, {})
        print('%-28s %-5s h1=%s kw=%d desc=%s' % (slug, loc, (e.get('h1', '')[:36] or '-'), len(e.get('kw', [])), (e.get('desc', '')[:40] or '-')))
io.open(r'F:\zprintpro-nextjs\.hermes\b2b-old-values.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=1))
print('saved .hermes/b2b-old-values.json')
