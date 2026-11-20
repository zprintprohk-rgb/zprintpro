# -*- coding: utf-8 -*-
# 退场词页面现状: 燙金利是封 ja / 中綴じ冊子激安 ja / 畢業紀念冊 zh / 印刷信封 zh
# 找 ja 利是封 + 小冊子页面的 title/desc/h2 (blog-data + sku-seo-data + category)
import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 1. blog-data ja: 找 red packet / booklet / 冊子 相关 slug 的 title + 首段
for fn in ['ja.json', 'zh-hk.json']:
    data = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\\' + fn, encoding='utf-8'))
    print(f'\n########## {fn} ##########')
    for slug, e in data.items():
        if not isinstance(e, dict):
            continue
        title = e.get('title', '')
        body = (e.get('content') or '')[:400]
        if any(k in slug + title for k in ['red-pack', 'redpack', '利是', '小冊子', '冊子', 'booklet', 'zine', '卒業', 'graduation', 'album']):
            t = re.sub(r'<[^>]+>', ' ', body)
            t = re.sub(r'\s+', ' ', t)
            print(f'  [{slug[:40]}]')
            print(f'    title: {title[:100]}')
            print(f'    head:  {t[:150]}')

# 2. sku-seo-data ja: 小冊子/利是封 SKU title
print('\n########## sku-seo-data (ja) ##########')
sk = open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
for m in re.finditer(r"slug: ['\"]([^'\"]+)['\"][\s\S]{0,400}?ja: \{[\s\S]{0,600}?title: ['\"]([^'\"]+)['\"]", sk):
    slug, title = m.group(1), m.group(2)
    if any(k in slug for k in ['red', 'booklet', 'zine', 'album', 'graduation', 'saddle', '小冊']):
        print(f'  [{slug}] ja title: {title[:110]}')
