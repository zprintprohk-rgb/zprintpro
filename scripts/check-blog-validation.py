import re
import json
slug = 'large-envelope-printing-c4-c5'
print('=== VALIDATION SUMMARY ===')
all_pass = True
for lang in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{lang}.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
    entry = d.get(slug, {})
    if not entry:
        print(f'{lang}: MISSING ENTRY')
        all_pass = False
        continue
    seg = entry.get('content', '')
    h2_count = len(re.findall(r'<h2\b', seg))
    faq_count = len(re.findall(r'<strong>Q\d?[:：]', seg))
    pattern = r'href="(/[a-z\-]+/(?:blog|category|services)/[a-z0-9\-/]+)"'
    internal_links = set(re.findall(pattern, seg))
    # Forbidden words check
    forbidden = []
    for w in ['咭片', '名片', 'business card', '名刺']:
        if w.lower() in seg.lower():
            forbidden.append(w)
    text = re.sub(r'<[^>]+>', '', seg)
    text = re.sub(r'\s+', ' ', text).strip()
    if lang == 'zh-hk':
        cjk = len(re.findall(r'[\u4e00-\u9fff]', text))
        print(f'{lang}: H2={h2_count}, FAQ={faq_count}, links={len(internal_links)}, CJK={cjk}, forbidden={forbidden}')
        if cjk < 800:
            print(f'  ⚠️ CJK under 800')
    else:
        words = len(text.split())
        print(f'{lang}: H2={h2_count}, FAQ={faq_count}, links={len(internal_links)}, words={words}, forbidden={forbidden}')
    if h2_count < 7 or faq_count < 4 or len(internal_links) < 5 or forbidden:
        all_pass = False
print()
print(f'=== ALL PASS: {all_pass} ===')
