# -*- coding: utf-8 -*-
"""Money-variant kw injection: word-order/spelling variants of proven money words"""
import io

P = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'
ADD = {
    'catalog-printing': {
        'en': ['china catalog printing', 'catalogue printing china', 'catalogue printing'],
    },
    'waterproof-stickers': {
        'ja': ['pvc シール', 'PVCシール'],
    },
    'textbooks': {
        'ja': ['教科書 印刷会社', '教材 印刷製本', '教材 テキスト印刷'],
    },
}
lines = io.open(P, encoding='utf-8').read().split('\n')
out = [lines[0]]
touched = []
for l in lines[1:]:
    if not l.strip():
        continue
    f = l.split('\t')
    slug = f[3].strip()
    if slug in ADD:
        for lang, words in ADD[slug].items():
            ci = 9 if lang == 'en' else 10 if lang == 'ja' else 8
            kw = [k.strip() for k in f[ci].split(',') if k.strip()]
            for w in words:
                if w not in kw and len(kw) < 20:
                    kw.append(w)
            f[ci] = ','.join(kw)
        touched.append(slug)
    out.append('\t'.join(f))
assert len(touched) == len(ADD), 'missing slugs: %s' % set(ADD) - set(touched)
io.open(P, 'w', encoding='utf-8', newline='\n').write('\n'.join(out))
print('touched:', touched)
