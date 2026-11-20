# -*- coding: utf-8 -*-
import io, re, itertools, json
src = io.open('src/data/sku-seo-data.ts', encoding='utf-8').read()

def norm(t):
    t = re.sub(r'\s+', '', t or '')
    return re.sub(r'[^\w\u4e00-\u9fff\u3040-\u30ff]', '', t).lower()

def ngrams(t, n=8):
    return set(t[i:i+n] for i in range(max(0, len(t)-n+1))) or {t}

def jac(a, b):
    return len(a & b) / len(a | b) if a and b else 0.0

chunks = re.split(r'\n\s{2}"([a-z0-9-]+)": \{', src)
slugs, bodies = [], {}
for i in range(1, len(chunks) - 1, 2):
    slugs.append(chunks[i]); bodies[chunks[i]] = chunks[i+1]

TG = ['waterproof-stickers','transparent-stickers','foil-stickers','security-stickers','fluorescent-stickers']
out = {}
for loc in ('zh-hk','en','ja'):
    R = re.compile('"%s":\\s*\\{.*?"body":\\s*"((?:[^"\\\\]|\\\\.)*)"' % re.escape(loc), re.S)
    texts = {}
    for s in TG:
        m = R.search(bodies[s])
        texts[s] = norm(m.group(1).replace('\\n','')) if m else ''
    pairs = []
    for a, b in itertools.combinations(TG, 2):
        pairs.append((round(jac(ngrams(texts[a]), ngrams(texts[b])), 3), a, b))
    pairs.sort(reverse=True)
    out[loc] = pairs
    print(loc, 'max=', pairs[0], 'min=', pairs[-1])
json.dump(out, io.open('.hermes/analysis/b1c-cluster1-similarity-2026-10-12.json','w',encoding='utf-8'), ensure_ascii=False, indent=1)
