# -*- coding: utf-8 -*-
import io, json, re

d = json.load(io.open(r'F:\zprintpro-nextjs\src\data\blog-data\en.json', encoding='utf-8'))
for slug in ['catalog-printing-guide', 'catalog-printing-china-supplier-guide']:
    c = d[slug]['content']
    print('===', slug)
    print(c[:300].replace('\n', ' ')[:300])
    print('h2s:', re.findall(r'<h2[^>]*>(.*?)</h2>', c)[:3])

z = json.load(io.open(r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json', encoding='utf-8'))
c = z['sticker-guide']['content']
print('=== sticker-guide anchors:', re.findall(r'<a href="/zh-hk/category/stickers/"[^>]*>(.*?)</a>', c))
c2 = z['calendar-printing-guide']['content']
print('=== calendar anchors:', re.findall(r'<a href="/zh-hk/category/(?:calendars|red-packets)/"[^>]*>(.*?)</a>', c2))
j = json.load(io.open(r'F:\zprintpro-nextjs\src\data\blog-data\ja.json', encoding='utf-8'))
for slug in ['doujin-circle-printing-guide', 'comiket-printing-prep-guide']:
    c3 = j[slug]['content']
    print('=== ja', slug, '| doujin links:', c3.count('/ja/category/japan-doujin/'), '| h2s:', re.findall(r'<h2[^>]*>(.*?)</h2>', c3)[:2])
