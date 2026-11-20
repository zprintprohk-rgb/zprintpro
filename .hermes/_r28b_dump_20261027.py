# -*- coding: utf-8 -*-
"""三闸门 #1: dump exact cert/FDA/scn strings in stickers segments (10-27 order 28b)."""
import io, re

s = io.open(r"src\data\sku-seo-data.ts", encoding="utf-8").read()
slugs = ["waterproof-stickers", "transparent-stickers", "removable-stickers",
         "small-batch-stickers", "die-cut-stickers", "foil-stickers", "security-stickers"]

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
                a = max(0, m.start()-70); b = min(len(body), m.end()+90)
                print("[%s|%s|%s] ...%s..." % (slug, loc, label, body[a:b].replace("\\n", " | ")))
