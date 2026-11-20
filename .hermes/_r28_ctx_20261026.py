# -*- coding: utf-8 -*-
"""Full-context dump for boxes defect sentences (wider windows)."""
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

def show(slug, loc, pat, label, win=90):
    t = seg(slug)
    body = get_body(t, loc)
    for m in re.finditer(pat, body):
        a = max(0, m.start()-win); b = min(len(body), m.end()+win)
        print("  %s[%s]: ...%s..." % (slug, label, body[a:b].replace("\\n", " | ")))
        print()

for slug in ["cosmetic-boxes", "mailer-boxes", "kraft-paper-packaging-box"]:
    show(slug, "ja", r'国際認証体系', "JA-cert")
print("=" * 40)
for slug in ["cosmetic-boxes"]:
    show(slug, "en", r'FDA', "EN-FDA")
print("=" * 40)
for slug in ["food-boxes"]:
    show(slug, "en", r'FDA', "EN-FDA")
print("=" * 40)
for slug in ["cosmetic-boxes", "food-boxes", "mailer-boxes"]:
    show(slug, "zh-hk", r'推廣單張', "ZH-scn")
