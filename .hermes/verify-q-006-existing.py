import json
for locale in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{locale}.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
    if 'tea-beverage-gift-box-printing-guide' in d:
        v = d['tea-beverage-gift-box-printing-guide']
        print(f'=== {locale} Q-006 EXISTING (7/7 部署) ===')
        print(f'  title: {v["title"][:80]}')
        print(f'  description chars: {len(v["description"])}')
        print(f'  content chars: {len(v["content"])}')
        print(f'  date: {v["date"]}')
        print(f'  category: {v["category"]}')
    else:
        print(f'{locale}: Q-006 NOT FOUND')
