# -*- coding: utf-8 -*-
"""Dump REMAINING cert/FDA/scn occurrences in boxes segments after pass 1."""
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
    for loc in ["zh-hk", "en", "ja"]:
        body = get_body(slug, loc)
        for pat, label in [(r'国際認証体系', 'CERT'), (r'FDA', 'FDA'), (r'推廣單張、活動入口的指示牌', 'SCN')]:
            for m in re.finditer(pat, body):
                a = max(0, m.start()-60); b = min(len(body), m.end()+80)
                print("[%s|%s|%s] ...%s..." % (slug, loc, label, body[a:b].replace("\\n", " | ")))
