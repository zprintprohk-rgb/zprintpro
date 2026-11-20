# -*- coding: utf-8 -*-
"""Full exact-string dump for order 28b fixer (stickers 8 slugs + boxes non-body 收尾)."""
import io, re

s = io.open(r"src\data\sku-seo-data.ts", encoding="utf-8").read()

def seg_str(s, slug):
    i = s.find('"%s": {' % slug)
    if i == -1: return None
    brace = s.find('{', i)
    depth = 0; p = brace; in_str = False; esc = False
    while p < len(s):
        c = s[p]
        if in_str:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == '"': in_str = False
        else:
            if c == '"': in_str = True
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: return s[i:p+1]
        p += 1
    return s[i:]

def field(seg, loc, fld):
    """extract value of seg.loc.fld as raw text between quotes (first match)."""
    k = seg.find('"%s": {' % loc)
    if k == -1: return None
    f = seg.find('"%s": ' % fld, k)
    if f == -1: return None
    # skip ': "'
    q = seg.find('"', f + len('"%s": ' % fld))
    if q == -1: return None
    buf = []; p = q + 1
    while p < len(seg):
        ch = seg[p]
        if ch == '\\': buf.append(seg[p:p+2]); p += 2; continue
        if ch == '"': break
        buf.append(ch); p += 1
    return ''.join(buf)

def body(seg, loc):
    b = seg.find('"%s": {' % loc)
    k = seg.find('"body": "', b)
    if k == -1: return None
    buf = []; p = k + len('"body": "')
    while p < len(seg):
        ch = seg[p]
        if ch == '\\': buf.append(seg[p:p+2]); p += 2; continue
        if ch == '"': break
        buf.append(ch); p += 1
    return ''.join(buf)

stickers = ["waterproof-stickers","transparent-stickers","removable-stickers","small-batch-stickers",
            "die-cut-stickers","foil-stickers","security-stickers","fruit-food-label-stickers"]
pats = [(r'国際認証体系','CERT'), (r'FDA','FDA'), (r'SGS','SGS'), (r'推廣單張、活動入口的指示牌','SCN')]

out = []
for slug in stickers:
    seg = seg_str(s, slug)
    if not seg: continue
    for loc in ["zh-hk","en","ja"]:
        for fld in ["title","description","h1","imageAlt"]:
            v = field(seg, loc, fld)
            if v and any(re.search(p[0], v) for p in pats):
                out.append("[%s|%s|%s] %s" % (slug, loc, fld, v))
        b = body(seg, loc)
        if b:
            for pat, label in pats:
                for m in re.finditer(pat, b):
                    a = max(0, m.start()-160); z = min(len(b), m.end()+160)
                    out.append("[%s|%s|BODY|%s] ...%s..." % (slug, loc, label, b[a:z].replace("\\n"," | ")))
    # keywords
    for loc in ["zh-hk","en","ja"]:
        k = seg.find('"%s": {' % loc)
        kw = seg.find('"keywords": [', k)
        if kw != -1:
            p = kw + len('"keywords": [')
            buf = []
            while p < len(seg):
                ch = seg[p]
                if ch == ']': break
                buf.append(ch); p += 1
            kws = ''.join(buf)
            if any(re.search(pat[0], kws) for pat in pats):
                out.append("[%s|%s|KEYWORDS] %s" % (slug, loc, kws))

# boxes non-body
for slug in ["cosmetic-boxes","food-boxes"]:
    seg = seg_str(s, slug)
    for loc in ["zh-hk","en","ja"]:
        for fld in ["title","description","h1","imageAlt"]:
            v = field(seg, loc, fld)
            if v and re.search(r'FDA', v):
                out.append("[%s|%s|%s] %s" % (slug, loc, fld, v))
        k = seg.find('"%s": {' % loc)
        kw = seg.find('"keywords": [', k)
        if kw != -1:
            p = kw + len('"keywords": [')
            buf = []
            while p < len(seg):
                ch = seg[p]
                if ch == ']': break
                buf.append(ch); p += 1
            kws = ''.join(buf)
            if 'FDA' in kws:
                out.append("[%s|%s|KEYWORDS] %s" % (slug, loc, kws))

io.open(r".hermes\_r28b_dump2_20261027.txt","w",encoding="utf-8").write("\n".join(out))
print("dumped", len(out), "lines")
