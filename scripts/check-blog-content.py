import json
import re
import sys

slug = 'large-envelope-printing-c4-c5'
for lang in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{lang}.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
    seg = d.get(slug, {}).get('content', '')
    if not seg:
        print(f'{lang}: NOT FOUND')
        continue
    text = re.sub(r'<[^>]+>', '', seg)
    text = re.sub(r'\s+', ' ', text).strip()
    h2_count = len(re.findall(r'<h2\b', seg))
    h3_count = len(re.findall(r'<h3\b', seg))
    # Extract internal links
    pattern = r'href="(/[a-z\-]+/(?:blog|category|services)/[a-z0-9\-/]+)"'
    internal_links = re.findall(pattern, seg)
    unique_links = set(internal_links)
    has_jsonld = 'application/ld+json' in seg
    print(f'{lang}:')
    print(f'  total_chars: {len(seg)}')
    print(f'  H2 count: {h2_count}')
    print(f'  H3 count: {h3_count}')
    print(f'  Internal links (total): {len(internal_links)}, unique: {len(unique_links)}')
    print(f'  Sample unique links:')
    for l in list(unique_links)[:10]:
        print(f'    {l}')
    if lang == 'zh-hk':
        cjk = len(re.findall(r'[\u4e00-\u9fff]', text))
        print(f'  CJK chars: {cjk}, text_chars: {len(text)}')
    elif lang == 'en':
        words = len(text.split())
        print(f'  words: {words}, text_chars: {len(text)}')
    else:
        words = len(text.split())
        cjk = len(re.findall(r'[\u4e00-\u9fff]', text))
        print(f'  words: {words}, CJK chars: {cjk}, text_chars: {len(text)}')
    print()
