# -*- coding: utf-8 -*-
"""B2 merge: for 4 rows — h1/desc = old ts-only values restored verbatim; keywords = union(old,new) deduped"""
import io, re

BAK = r'F:\zprintpro-nextjs\.hermes\_bak-sku-seo-before-merge-1791356653045.ts'
CSV = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'
TARGETS = ['doujinshi-printing', 'eco-tote-bag', 'graduation-yearbook', 'postcard-set']

ts = io.open(BAK, encoding='utf-8').read()

def old_vals(slug, loc):
    i = ts.find('"%s": {' % slug)
    j = ts.find('\n  "', i + 6)
    seg = ts[i:j if j > 0 else len(ts)]
    k = seg.find('"%s": {' % loc)
    s = seg[k:k + 3400]
    h1 = re.search(r'"h1":\s*"((?:[^"\\]|\\.)*)"', s)
    de = re.search(r'"description":\s*"((?:[^"\\]|\\.)*)"', s)
    kw = re.findall(r'"((?:[^"\\]|\\.)*)"', re.search(r'"keywords":\s*\[([^\]]*)\]', s).group(1)) if re.search(r'"keywords":\s*\[([^\]]*)\]', s) else []
    return (h1.group(1) if h1 else ''), (de.group(1) if de else ''), kw

lines = io.open(CSV, encoding='utf-8').read().split('\n')
out = [lines[0]]
loc_col = {'zh-hk': ('11', '14', '8'), 'en': ('12', '15', '9'), 'ja': ('13', '16', '10')}
for l in lines[1:]:
    if not l.strip():
        continue
    f = l.split('\t')
    slug = f[3].strip()
    if slug in TARGETS:
        for loc, (ci_d, ci_h, ci_k) in loc_col.items():
            oh, od, okw = old_vals(slug, loc)
            new_kw = [k.strip() for k in f[int(ci_k)].split(',') if k.strip()]
            union = []
            for k in okw + new_kw:
                if k and k not in union:
                    union.append(k)
            if od:
                f[int(ci_d)] = od
            if oh:
                f[int(ci_h)] = oh
            f[int(ci_k)] = ','.join(union[:18])
        print('merged %s: kw counts now zh=%d en=%d ja=%d' % (slug, len(f[8].split(',')), len(f[9].split(',')), len(f[10].split(','))))
    out.append('\t'.join(f))
io.open(CSV, 'w', encoding='utf-8', newline='\n').write('\n'.join(out))
print('CSV merged')
