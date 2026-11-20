# -*- coding: utf-8 -*-
"""Dump full opening blocks of boxes SKUs (3 locales) for exact pair design."""
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
    print("=" * 25, slug, "=" * 25)
    for loc in ["zh-hk", "en", "ja"]:
        body = get_body(slug, loc)
        print("--- %s (%d chars) ---" % (loc, len(body)))
        print(body[:420].replace("\\n", "\n"))
        print()
