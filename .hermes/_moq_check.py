# -*- coding: utf-8 -*-
# P0-3: saddle/exercise CSV 全行 (按列名) vs sku-seo-data.ts 生成产物 vs 线上 H1
import io, sys, csv, re, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

csvp = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'
rows = list(csv.DictReader(open(csvp, encoding='utf-8-sig'), delimiter='\t'))
print('列名:', list(rows[0].keys()))
print()
for slug in ['saddle-stitch-booklets', 'exercise-books']:
    r = next((x for x in rows if x.get('Slug') == slug), None)
    if not r:
        print(f'{slug}: CSV 无此行'); continue
    print(f'===== {slug} =====')
    for col in ['SEO標題(EN)', 'SEO標題(JA)', 'H1標題(EN)', 'H1標題(JA)', 'FAQ問題1(ZH)', 'FAQ答案1(ZH)']:
        v = (r.get(col) or '').strip()
        print(f'  [{col}] {v[:130]}')

print()
print('===== sku-seo-data.ts 生成产物 (h1/title) =====')
sk = open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
for slug in ['saddle-stitch-booklets', 'exercise-books']:
    i = sk.find(f"slug: '{slug}'")
    if i < 0:
        print(f'{slug}: 产物无此行'); continue
    seg = sk[i:i+3000]
    for loc in ['zh-hk', 'en', 'ja']:
        t = re.search(r'"?title"?:\s*"((?:[^"\\]|\\.)*)"', seg)
        h1 = re.search(r'"h1":\s*"((?:[^"\\]|\\.)*)"', seg)
        if t: print(f'  {slug} [{loc}] title: {t.group(1)[:80]}')
        if h1: print(f'  {slug} [{loc}] h1: {h1.group(1)[:80]}')
        break  # 只查第一个 locale 块? 不对 - 三个 locale 都查
        # 修正: 在 seg 内找三个 locale
    # 重新: 分段找
    for loc in ['zh-hk', 'en', 'ja']:
        m = re.search(re.escape(loc) + r':\s*\{[\s\S]{0,900}?"title":\s*"((?:[^"\\]|\\.)*)"', seg)
        h = re.search(re.escape(loc) + r':\s*\{[\s\S]{0,1200}?"h1":\s*"((?:[^"\\]|\\.)*)"', seg)
        if m: print(f'  [{loc}] title: {m.group(1)[:80]}')
        if h: print(f'  [{loc}] h1: {h.group(1)[:80]}')
