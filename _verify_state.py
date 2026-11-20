import json
print('=== JSON sanity check ===')
for p in ['src/data/blog-data/zh-hk.json', 'src/data/blog-data/en.json', 'src/data/blog-data/ja.json']:
    try:
        d = json.load(open(p, encoding='utf-8'))
        s = 'print-specifications-reference-guide-2026'
        present = s in d
        chars = len(d[s]['content']) if present else 0
        print(f'{p}: {len(d)} slugs, target present: {present}, chars: {chars}')
    except Exception as e:
        print(f'{p}: ERROR {e}')

print('\n=== blog-posts.ts SSoT check ===')
import re
b = open('src/data/blog-posts.ts', encoding='utf-8').read()
m = re.findall(r"slug:\s*'([^']+)'", b)
print(f'Total slugs in blog-posts.ts: {len(m)}')
target = 'print-specifications-reference-guide-2026'
print(f'target present: {target in m}')
# Check entry is defined
defined = bool(re.search(r"const\s+printSpecificationsReferenceGuide2026\s*:\s*BlogPostMeta", b))
print(f'const defined: {defined}')

# Check 12 鐵律 indicators in each locale
print('\n=== 12 鐵律 Pillar 3-locale 自查 ===')
for p, locale, label in [
    ('src/data/blog-data/zh-hk.json', 'zh-hk', '答案'),
    ('src/data/blog-data/en.json', 'en', 'Answer Nugget'),
    ('src/data/blog-data/ja.json', 'ja', '答え'),
]:
    d = json.load(open(p, encoding='utf-8'))
    s = 'print-specifications-reference-guide-2026'
    if s in d:
        c = d[s]['content']
        bg = 'div class=' + chr(34) + 'bg-'
        h2_open = '<' + 'h2' + '>'
        h3_open = '<' + 'h3' + '>'
        table_open = '<' + 'table'
        schema_marker = chr(34) + '@type' + chr(34)
        nugget_marker = label + ' nugget'
        # internal href: per locale
        if locale == 'zh-hk':
            href = '/zh-hk/blog/'
        elif locale == 'en':
            href = '/en/blog/'
        else:
            href = '/ja/blog/'
        print(f'\n{locale}:')
        print(f'  chars: {len(c)}')
        print(f'  alert: {c.count(bg)}')
        print(f'  h2: {c.count(h2_open)}')
        print(f'  h3: {c.count(h3_open)}')
        print(f'  table: {c.count(table_open)}')
        print(f'  schema @type: {c.count(schema_marker)}')
        print(f'  {label} nugget: {c.count(nugget_marker)}')
        print(f'  internal href {href}: {c.count(chr(34) + href)}')
        print(f'  E-E-A-T: {sum(1 for x in ["FDA","EU REACH","FSC","LinkedIn"] if x in c)}')
        print(f'  wa.me CTA: {c.count("wa.me/8619880851334")}')
