# -*- coding: utf-8 -*-
import io, sys, csv, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
rows = list(csv.DictReader(open(r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
for slug in ['saddle-stitch-booklets', 'exercise-books']:
    r = next((x for x in rows if (x.get('Slug') or '').strip() == slug), None)
    if not r:
        # 找含 slug 的行
        cand = [x for x in rows if slug in (x.get('Slug') or '')]
        print(f'{slug}: 精确无; 候选 {len(cand)} 行')
        if cand: r = cand[0]
    if not r:
        print(f'{slug}: 仍无'); continue
    print(f'===== {slug} =====')
    for col in ['SEO标题(EN)', 'SEO标题(JA)', 'H1标题(EN)', 'H1标题(JA)', 'FAQ答案1(ZH)']:
        v = (r.get(col) or '').strip()
        print(f'  [{col}] {v[:140]}')

print()
print('===== sku-seo-data.ts slug 格式样例 =====')
sk = open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
for m in list(re.finditer(r'slug[^,]{0,50}', sk))[:6]:
    print(' ', m.group(0)[:60])
