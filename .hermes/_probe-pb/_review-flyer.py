# -*- coding: utf-8 -*-
"""审查既有 flyer 文章: flyer-buying-guide / flyer-printing-guide 的 locale/长度/标题/覆盖主题"""
import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

src = open('src/data/blog-posts.ts', encoding='utf-8').read()
for slug in ['flyer-buying-guide', 'flyer-printing-guide', 'a5-vs-a6-flyer-size', 'folded-leaflet-printing-guide', 'school-flyers']:
    i = src.find("slug: '" + slug + "'")
    print('===', slug, '===')
    if i < 0:
        print(' NOT IN blog-posts.ts')
    else:
        seg = src[i:i + 900]
        t = re.search(r"title:\s*\{([\s\S]*?)\}", seg)
        print(' title:', (re.sub(r'\s+', ' ', t.group(1))[:240] if t else '?'))
        c = re.search(r"categoryKey:\s*'([^']+)'", seg)
        print(' categoryKey:', c.group(1) if c else '?')
    for loc in ['zh-hk', 'en', 'ja']:
        try:
            d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
            if slug in d:
                e = d[slug]
                print('  %-6s len=%d excerpt=%s' % (loc, len(e.get('content', '')), (e.get('excerpt') or '')[:70]))
            else:
                print('  %-6s (absent)' % loc)
        except Exception as e:
            print('  %-6s err %s' % (loc, e))
    # 若 zh-hk 存在, 列 H2
    try:
        d = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))
        if slug in d:
            c = d[slug]['content']
            for m in re.finditer(r'<(h2|h3)[^>]*>([\s\S]*?)</\1>', c):
                print('    <%s> %s' % (m.group(1), re.sub(r'<[^>]+>', '', m.group(2)).strip()[:70]))
    except Exception:
        pass
    print()
