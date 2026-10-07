# -*- coding: utf-8 -*-
"""Extract EN old values (looser regex) for 4 blocks"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\.hermes\_bak-sku-seo-before-merge-1791356653045.ts', encoding='utf-8').read()
for slug in ['doujinshi-printing', 'eco-tote-bag', 'graduation-yearbook', 'postcard-set']:
    i = ts.find('"%s": {' % slug)
    j = ts.find('\n  "', i + 6)
    seg = ts[i:j if j > 0 else len(ts)]
    k = seg.find('"en": {')
    if k < 0:
        print(slug, 'EN not found'); continue
    s = seg[k:k + 3200]
    h1 = re.search(r'"h1":\s*"((?:[^"\\]|\\.)*)"', s)
    de = re.search(r'"description":\s*"((?:[^"\\]|\\.)*)"', s)
    kw = re.search(r'"keywords":\s*\[([^\]]*)\]', s)
    print('== %s [en]' % slug)
    print('  h1:', h1.group(1)[:90] if h1 else '-')
    print('  desc:', de.group(1)[:110] if de else '-')
    print('  kw:', (kw.group(1)[:130] if kw else '-'))
