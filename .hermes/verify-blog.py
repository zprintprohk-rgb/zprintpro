"""Verify v8 blog content"""
import json
import re

for lang, path in [
    ('zh-hk', r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json'),
    ('en', r'F:\zprintpro-nextjs\src\data\blog-data\en.json'),
    ('ja', r'F:\zprintpro-nextjs\src\data\blog-data\ja.json'),
]:
    data = json.load(open(path, encoding='utf-8'))
    v = data['same-day-flyers-printing-hong-kong-guide']
    content = v['content']
    plain = re.sub(r'<[^>]+>', '', content)
    plain = re.sub(r'\s+', ' ', plain).strip()
    h3 = len(re.findall(r'<h3>', content))
    faq = len(re.findall(r'<strong>Q:', content))
    # Use different escaping
    links = re.findall(r'href="(/[^"]*|https://[^"]*)"', content)
    uniq = set(links)
    imgs = len(re.findall(r'<img', content))
    tables = len(re.findall(r'<table', content))
    print(f'{lang}: plain_chars={len(plain)}, h3_sections={h3}, faq={faq}, links={len(links)} total / {len(uniq)} unique, img={imgs}, tables={tables}')
    print(f'  unique links:')
    for l in sorted(uniq)[:10]:
        print(f'    - {l}')
