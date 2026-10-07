# -*- coding: utf-8 -*-
"""B3 recon: ja catalog title live value + greeting-ja/zine/clear-poster anchor points"""
import io, re, urllib.request

for slug in ['catalog-printing']:
    for loc in ['ja', 'en', 'zh-hk']:
        try:
            html = urllib.request.urlopen(urllib.request.Request(
                'https://zprintpro.com/%s/services/%s/' % (loc, slug), headers={'User-Agent': 'Mozilla/5.0'}), timeout=40).read().decode('utf-8', 'replace')
            m = re.search(r'(?s)<title>(.*?)</title>', html)
            print('%s %s: %s' % (slug, loc, re.sub(r'\s+', ' ', m.group(1)).strip()[:90]))
        except Exception as e:
            print(slug, loc, 'ERR', str(e)[:50])

csc = io.open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
i = csc.find('greeting-cards')
print('\ngreeting-cards block at', i)
seg = csc[i:i + 3000]
for kw in ['年賀状', 'quickAnswer', 'faq']:
    print('  contains %s: %s' % (kw, kw in seg))
