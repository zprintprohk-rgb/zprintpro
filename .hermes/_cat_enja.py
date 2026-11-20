# -*- coding: utf-8 -*-
# CategoryLocaleContent interface + en/ja featuredSnippets for paper-bags/posters + faq presence
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
i = t.find('interface CategoryLocaleContent')
print('=== interface ===')
print(t[i:i+900])
for name in ['paperBagsContent', 'postersContent']:
    i = t.find('const ' + name)
    seg = t[i:i+20000]
    print('#####', name)
    # en block
    j = seg.find("'en': {")
    if j < 0:
        print('  no quoted en block')
        j = seg.find('en: {')
    if j >= 0:
        sub = seg[j:j+1500]
        m = re.search(r"featuredSnippet:\s*'((?:[^'\\]|\\.)*)'", sub)
        print('  [en] featuredSnippet:', m.group(1)[:200] if m else 'NONE')
        print('  [en] FAQ q count:', len(re.findall(r"q:\s*'", sub)))
    k = seg.find("'ja': {")
    if k < 0:
        k = seg.find('ja: {')
    if k >= 0:
        sub = seg[k:k+1500]
        m = re.search(r"featuredSnippet:\s*'((?:[^'\\]|\\.)*)'", sub)
        print('  [ja] featuredSnippet:', m.group(1)[:200] if m else 'NONE')
        print('  [ja] FAQ q count:', len(re.findall(r"q:\s*'", sub)))
    # total faq arrays
    print('  total q: occurrences in block:', seg.count("q: '"))
    print()
