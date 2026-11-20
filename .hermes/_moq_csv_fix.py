# -*- coding: utf-8 -*-
# P0-3 第4批: ja/zh description 模板 MOQ 按 minQ 修正 (CSV 源头)
import io, sys, csv
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
csvp = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'
rows = list(csv.DictReader(open(csvp, encoding='utf-8'), delimiter='\t'))

def find(slug):
    return next((i for i, x in enumerate(rows) if (x.get('Slug') or '').strip() == slug), None)

# ja description: 50冊〜、5-10営業日 -> 10冊〜 (minQ=10) / 100冊〜 (textbooks)
JA10 = ['saddle-stitch-booklets', 'exercise-books', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks', 'catalog-printing']
JA100 = ['textbooks']
ZH10 = ['saddle-stitch-booklets', 'exercise-books', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks']
ZH100 = ['textbooks']

ok = 0
for slug in JA10 + JA100:
    i = find(slug)
    if i is None:
        print(f'FAIL {slug}: 无此行'); continue
    cur = (rows[i].get('SEO描述(JA)') or '')
    newv = cur.replace('50冊〜', '100冊〜' if slug in JA100 else '10冊〜')
    if newv == cur:
        print(f'WARN {slug} [SEO描述(JA)] 无 50冊〜: {cur[:50]}'); continue
    rows[i]['SEO描述(JA)'] = newv
    print(f'OK {slug} [JA desc]: 50冊〜 -> {"100冊〜" if slug in JA100 else "10冊〜"}')
    ok += 1

for slug in ZH10 + ZH100:
    i = find(slug)
    if i is None:
        print(f'FAIL {slug}: 无此行'); continue
    cur = (rows[i].get('SEO描述(ZH)') or '')
    newv = cur.replace('50 本起', '100 本起' if slug in ZH100 else '10 本起')
    if newv == cur:
        print(f'WARN {slug} [SEO描述(ZH)] 无 50 本起: {cur[:50]}'); continue
    rows[i]['SEO描述(ZH)'] = newv
    print(f'OK {slug} [ZH desc]: 50 本起 -> {"100 本起" if slug in ZH100 else "10 本起"}')
    ok += 1

with open(csvp, 'w', encoding='utf-8', newline='') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()), delimiter='\t')
    w.writeheader()
    w.writerows(rows)
print(f'done {ok}/14')



