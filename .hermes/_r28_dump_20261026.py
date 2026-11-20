# -*- coding: utf-8 -*-
"""Dump defect sentences in boxes-family SKUs (order 28a)."""
import io, re

s = io.open(r"src\data\sku-seo-data.ts", encoding="utf-8").read()
slugs = ["cosmetic-boxes", "food-boxes", "mailer-boxes", "folding-boxes", "rigid-boxes",
         "magnetic-closure-gift-box", "electronics-packaging-box", "kraft-paper-packaging-box"]

def seg(slug):
    i = s.find('"%s": {' % slug)
    j = s.find('\n  "', i + 1)
    return s[i:j if j != -1 else len(s)]

def get_body(t, loc):
    i = t.find('"%s": {' % loc)
    k = t.find('"body": "', i)
    if k == -1: return ""
    k2 = k + len('"body": "')
    buf = []
    while k2 < len(t):
        ch = t[k2]
        if ch == '\\':
            buf.append(t[k2:k2+2]); k2 += 2; continue
        if ch == '"': break
        buf.append(ch); k2 += 1
    return ''.join(buf)

for slug in slugs:
    t = seg(slug)
    print("=" * 20, slug, "=" * 20)
    ja = get_body(t, "ja")
    en = get_body(t, "en")
    zh = get_body(t, "zh-hk")
    for m in re.finditer(r'[^。\n]*国際認証体系[^。\n]*。?', ja):
        print("  JA-cert:", m.group(0).replace("\\n", " | ")[:160])
    for m in re.finditer(r'[^.]*FDA[^.]*\.', en):
        print("  EN-FDA:", m.group(0).replace("\\n", " | ")[:160])
    for m in re.finditer(r'[^。\n]*推廣單張、活動入口的指示牌[^。\n]*。?', zh):
        print("  ZH-scn:", m.group(0).replace("\\n", " | ")[:160])
