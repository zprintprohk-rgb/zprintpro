# -*- coding: utf-8 -*-
"""B0: CSV MOQ/price drift census vs products.ts truth + ja tail-cluster dump"""
import io, re, json

csv_lines = io.open(r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv', encoding='utf-8').read().split('\n')
header = csv_lines[0].split('\t')
slug_i = header.index('slug') if 'slug' in header else 3

# products.ts truth
ts = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
truth = {}
for m in re.finditer(r"slug:\s*'([a-z0-9-]+)'[\s\S]{0,2000}?minQuantity:\s*(\d+)", ts):
    truth[m.group(1)] = int(m.group(2))

moq_cn = re.compile(r'(\d+)\s*(?:張|本|個|枚|套|部)起')
moq_ja = re.compile(r'(\d+)\s*(?:枚|部|個|冊|本)〜')

rows = [l for l in csv_lines[1:] if l.strip()]
print('rows:', len(rows))
drift, no_truth = [], []
tail_groups = {}
for l in rows:
    f = l.split('\t')
    slug = f[slug_i].strip()
    t = truth.get(slug)
    title_zh, title_ja = f[4], f[6]
    nums = []
    m = moq_cn.search(title_zh)
    if m: nums.append(('zh', int(m.group(1))))
    m = moq_ja.search(title_ja)
    if m: nums.append(('ja', int(m.group(1))))
    if t is None:
        no_truth.append(slug)
    else:
        for loc, n in nums:
            if n != t:
                drift.append((slug, loc, n, t))
    # ja keywords tail clusters (last 12 chars of ja kw field)
    if len(f) > 8 and f[8]:
        tails = [k.strip()[-12:] for k in f[8].split(',') if k.strip()]
        for tl in tails:
            tail_groups.setdefault(tl, set()).add(slug)

print('\n== MOQ drift (CSV title vs products.ts minQuantity):', len(drift))
for d in drift:
    print('  %-38s %s CSV=%d truth=%d' % d)

print('\n== CSV rows without products.ts slug (ghost):', no_truth)

print('\n== ja tail clusters >=3 rows (top 14 by row count):')
big = sorted(((tl, s) for tl, s in tail_groups.items() if len(s) >= 3), key=lambda x: -len(x[1]))[:14]
for tl, s in big:
    print('  %2d rows | ...%s | e.g. %s' % (len(s), tl, sorted(s)[0]))
