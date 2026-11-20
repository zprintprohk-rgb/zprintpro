# -*- coding: utf-8 -*-
# 1) fix '加 80% 附加費' in zh poster-printing-guide; 2) check flyers/wedding/leaflets SSoT
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
B = r'F:\zprintpro-nextjs\src\data\blog-data'
d = json.load(open(rf'{B}\zh-hk.json', encoding='utf-8'))
c = d['poster-printing-guide']['content']
old = '智印港 A1 急件可單張數碼印但加 80% 附加費。'
new = '智印港 A1 急件可單張數碼印，附加費另計。'
n = c.count(old)
print('加80% spot count:', n)
if n == 1:
    c = c.replace(old, new)
    d['poster-printing-guide']['content'] = c
    json.dump(d, open(rf'{B}\zh-hk.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    print('fixed')
print()
print('=== SSoT check: flyers / wedding / leaflets ===')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['a5-flyers', 'a4-flyers', 'flyers', 'wedding-invitations', 'foil-wedding-invitations', 'tri-fold-leaflets', 'leaflets', 'double-sided-flyers', 'thick-paper-flyers']:
    i = prod.find("slug: '" + slug + "'")
    if i < 0:
        print(slug, 'NOT FOUND'); continue
    seg = prod[i:i+900]
    fs = []
    for f in ['minQuantity', 'basePrice', 'basePrice_en', 'basePrice_ja', 'price_range']:
        fm = re.search(re.escape(f) + r":\s*(\[[^\]]*\]|'((?:[^'\\]|\\.)*)'|[0-9.]+)", seg)
        if fm:
            fs.append(f'{f}={fm.group(1)[:60]}')
    print('##', slug, '|', ' | '.join(fs))
