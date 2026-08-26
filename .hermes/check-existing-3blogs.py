import json
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(f'F:/zprintpro-nextjs/src/data/blog-data/{loc}.json', 'r', encoding='utf-8'))
    for slug in ['restaurant-opening-flyer-printing-guide', 'cosmetics-packaging-box-printing-guide', 'pet-food-sticker-printing-guide']:
        e = d.get(slug, {})
        c = e.get('content', '')
        date = e.get('date')
        print(f'{loc} {slug}: content_len={len(c)}, date={date}')
