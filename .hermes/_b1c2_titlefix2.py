# -*- coding: utf-8 -*-
import io, json, csv
ROOT = r'F:\zprintpro-nextjs'
FIX = {
 ('custom-red-packets', 'en'): 'Corporate Red Packets | Logo 100 MOQ $0.74 | ZprintPro',
 ('foil-red-packets', 'en'): 'Foil Stamp Red Packets | 12 Colors from $0.46 | ZprintPro',
}
dec = json.JSONDecoder()
rows = list(csv.reader(io.open(ROOT + r'\zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
tcol = {'zh-hk': hdr.index('SEO标题(ZH)'), 'en': hdr.index('SEO标题(EN)'), 'ja': hdr.index('SEO标题(JA)')}
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    for (slug, loc), v in FIX.items():
        if r[si].strip() == slug:
            r[tcol[loc]] = v
w = io.open(ROOT + r'\zprintpro-sku-seo-data.csv', 'w', encoding='utf-8', newline='')
csv.writer(w, delimiter='\t', lineterminator='\n').writerows(rows)
w.close()

cur = io.open(ROOT + r'\src\data\sku-seo-data.ts', encoding='utf-8').read()

def set_field(t, slug, loc, field, value):
    i = t.index('"%s":' % slug)
    block = t[i:i + 80000]
    li = block.index('"seo":')
    li2 = block.index('"%s":' % loc, li)
    seg = block[li2:]
    fi = seg.index('"%s":' % field)
    abs_fi = i + li2 + fi + len('"%s":' % field)
    txt = t[abs_fi:].lstrip()
    lead = len(t[abs_fi:]) - len(txt)
    _, used = dec.raw_decode(txt)
    return t[:abs_fi + lead] + json.dumps(value, ensure_ascii=False) + t[abs_fi + lead + used:]

for (slug, loc), v in FIX.items():
    cur = set_field(cur, slug, loc, 'title', v)
io.open(ROOT + r'\src\data\sku-seo-data.ts', 'w', encoding='utf-8', newline='\n').write(cur)
print('2 titles synced')
