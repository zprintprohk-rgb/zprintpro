# -*- coding: utf-8 -*-
"""Extract exact defect strings per boxes SKU for pair design."""
import io, re

s = io.open(r"src\data\sku-seo-data.ts", encoding="utf-8").read()
slugs = ["cosmetic-boxes", "food-boxes", "mailer-boxes", "folding-boxes", "rigid-boxes",
         "magnetic-closure-gift-box", "electronics-packaging-box", "kraft-paper-packaging-box"]

def get_body(slug, loc):
    i = s.find('"%s": {' % slug)
    j = s.find('\n  "', i + 1)
    t = s[i:j if j != -1 else len(s)]
    k = t.find('"%s": {' % loc)
    k2 = t.find('"body": "', k)
    if k2 == -1: return ""
    p = k2 + len('"body": "')
    buf = []
    while p < len(t):
        ch = t[p]
        if ch == '\\':
            buf.append(t[p:p+2]); p += 2; continue
        if ch == '"': break
        buf.append(ch); p += 1
    return ''.join(buf)

for slug in slugs:
    zh = get_body(slug, "zh-hk"); en = get_body(slug, "en"); ja = get_body(slug, "ja")
    print("=" * 18, slug, "=" * 18)
    # zh block + wrong-scn
    m = re.search(r'国際認証体系工廠[^。]*。', zh)
    if m: print("ZH-cert-block:", m.group(0))
    m = re.search(r'無論您需要[^。]*。', zh)
    if m: print("ZH-wrong-scn:", m.group(0))
    m = re.search(r'三種材質均[^。]*。', zh)
    if m: print("ZH-material-FDA:", m.group(0))
    # en fragments
    for pat in [r'certified production with full FDA compliance where applicable\.',
                r'All three are FSC-certified paper[^.]*\.',
                r'Our food-grade box options use FDA-safe[^.]*\.',
                r'FDA-safe indirect food contact as standard',
                r'FDA-safe adhesives[^.]*\.',
                r'FDA food-grade with PE/PLA linings']:
        for mm in re.finditer(pat, en):
            print("EN-FRAG:", mm.group(0))
    # ja fragments
    for pat in [r'国際認証体系の工場、[^。]*。',
                r'間接食品接触対応のFDAセーフ仕様',
                r'FDAセーフ接着剤[^。]*。']:
        for mm in re.finditer(pat, ja):
            print("JA-FRAG:", mm.group(0))
