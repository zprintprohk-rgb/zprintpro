# -*- coding: utf-8 -*-
"""Extract pre-merge (ts-only) values for the 4 covered blocks from latest generator backup"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\.hermes\_bak-sku-seo-before-merge-1791356653045.ts', encoding='utf-8').read()
for slug in ['doujinshi-printing', 'eco-tote-bag', 'graduation-yearbook', 'postcard-set']:
    i = ts.find('"%s": {' % slug)
    if i < 0:
        print(slug, 'NOT in backup'); continue
    j = ts.find('\n  "', i + 6)
    seg = ts[i:j if j > 0 else len(ts)]
    print('== %s (backup block %d chars)' % (slug, len(seg)))
    for loc in ['zh-hk', 'en', 'ja']:
        m = re.search(r'"%s":\s*\{([\s\S]{0,2600}?)\n      \}' % loc, seg)
        if not m:
            print('  [%s] segment not found' % loc); continue
        s = m.group(1)
        h1 = re.search(r'"h1":\s*"((?:[^"\\]|\\.)*)"', s)
        de = re.search(r'"description":\s*"((?:[^"\\]|\\.)*)"', s)
        kw = re.search(r'"keywords":\s*\[([^\]]*)\]', s)
        bd = 'YES' if '"body"' in s else 'no'
        print('  [%s] h1: %s' % (loc, (h1.group(1)[:80] if h1 else '-')))
        print('         desc: %s' % (de.group(1)[:80] if de else '-'))
        print('         kw(%s): %s | body: %s' % (len(re.findall(r'"', kw.group(1)))//2 if kw else 0, (kw.group(1)[:100] if kw else '-'), bd))
