import json
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(f'F:/zprintpro-nextjs/src/data/blog-data/{loc}.json', 'r', encoding='utf-8'))
    p2 = ['trade-show-banner-printing-guide', 'wedding-invitation-envelope-printing-guide', 'doujin-circle-printing-guide']
    for slug in p2:
        e = d.get(slug, {})
        content = e.get('content', '')
        title = e.get('title', '')
        print(f'{loc} {slug}:')
        print(f'  date: {e.get("date")}')
        print(f'  content_len: {len(content)}')
        print(f'  title: {title[:80]}')
