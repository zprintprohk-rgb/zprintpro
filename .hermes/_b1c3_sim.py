# -*- coding: utf-8 -*-
# 簇3 相似度双方法: flyers hub vs posters hub vs leaflet body ×3 locale
import io, json, re
from pathlib import Path
from itertools import combinations
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()
dec = json.JSONDecoder()

def hub_text(name, loc):
    i = cs.index('const %s' % name)
    block = cs[i:i+40000]
    key = "'%s': {" % loc if loc == 'zh-hk' else '%s: {' % loc
    li = block.index(key)
    seg = block[li:]
    # 取 buyingGuide paragraphs + h2 + featuredSnippet 作為頁面文本代表
    ps = re.search(r'paragraphs: \[(.*?)\n      \]', seg, re.DOTALL).group(1)
    paras = re.findall(r"'((?:[^'\\]|\\.)*)'", ps)
    h2m = re.search(r"h2: '((?:[^'\\]|\\.)*)'", seg)
    fs = re.search(r"featuredSnippet: '((?:[^'\\]|\\.)*)'", seg)
    parts = [h2m.group(1) if h2m else ''] + [fs.group(1) if fs else ''] + paras
    return '\n'.join(p.encode().decode('unicode_escape') if '\\' in p else p for p in parts)

def get_body(slug, loc):
    i = t.index('"%s":' % slug)
    block = t[i:i+90000]
    li = block.index('"seo":')
    li = block.index('"%s":' % loc, li)
    seg = block[li:]
    bi = seg.index('"body":')
    v, _ = dec.raw_decode(seg[bi+7:].lstrip())
    return v

def tokens(s):
    return set(re.findall(r'[\u4e00-\u9fff\u3040-\u30ff]|[a-zA-Z0-9$+.×~-]+', s.lower()))

def shingles(s, n=5):
    toks = re.findall(r'[\u4e00-\u9fff\u3040-\u30ff]|[a-zA-Z0-9$+.×~-]+', s.lower())
    return set(tuple(toks[k:k+n]) for k in range(max(0, len(toks)-n+1)))

print('%-8s %-22s %8s %8s' % ('locale', 'pair', 'jac', '5gram'))
worst = 0
for loc in ('zh-hk', 'en', 'ja'):
    pages = {
        'flyers-hub': hub_text('flyersContent', loc),
        'posters-hub': hub_text('postersContent', loc),
        'leaflet': get_body('folded-leaflets', loc),
    }
    for a, b in combinations(pages, 2):
        A, B = tokens(pages[a]), tokens(pages[b])
        jac = len(A & B) / len(A | B)
        SA, SB = shingles(pages[a]), shingles(pages[b])
        sh = len(SA & SB) / min(len(SA), len(SB)) if min(len(SA), len(SB)) else 0
        worst = max(worst, jac, sh)
        flag = ' <-- OVER' if max(jac, sh) >= 0.55 else ''
        print('%-8s %-22s %8.3f %8.3f%s' % (loc, '%s-%s' % (a, b), jac, sh, flag))
print('WORST = %.3f (red line 0.55)' % worst)
assert worst < 0.55
print('SIMILARITY PASS')
