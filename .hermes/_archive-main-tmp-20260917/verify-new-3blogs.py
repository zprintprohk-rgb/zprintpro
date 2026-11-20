import json
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(f'F:/zprintpro-nextjs/src/data/blog-data/{loc}.json', 'r', encoding='utf-8'))
    new = ['religious-ceremony-printing-guide', 'industrial-nameplate-printing-guide', 'construction-material-sample-book-printing-guide']
    for slug in new:
        e = d[slug]
        print(f'{loc} {slug}:')
        print(f'  date: {e["date"]}')
        print(f'  title: {e["title"][:70]}')
        print(f'  content_len: {len(e["content"])}')
        print()
