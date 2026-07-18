#!/usr/bin/env python3
"""Inspect page.tsx structure"""
import re
p = r'F:\zprintpro-nextjs\src\app\[locale]\blog\[slug]\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
print('TOTAL_SIZE=', len(text))
# find articleSlugs array
m = re.search(r'articleSlugs.*?\];', text, re.DOTALL)
if m:
    print('---articleSlugs last 300 chars---')
    print(repr(m.group()[-300:]))
# find all occurrences of '},' + closing patterns
print('---search "}, \\n  },\\n  ja: {"---')
target1 = '},\n  },\n  ja: {'
idx = text.find(target1)
print('idx=', idx)
if idx > 0:
    print('context before:', repr(text[max(0,idx-300):idx]))
    print('context after:', repr(text[idx:idx+200]))
print('---search "},\\n  }\\n};\\n"---')
target2 = '},\n  }\n};\n'
idx2 = text.find(target2)
print('idx2=', idx2)
if idx2 > 0:
    print('context before:', repr(text[max(0,idx2-300):idx2]))
# Also search for 'ja: {' to see structure
print('---all "ja: {" occurrences---')
for i, m in enumerate(re.finditer(r'ja: \{', text)):
    pos = m.start()
    print(f'  match {i}: pos={pos}, context:', repr(text[max(0,pos-50):pos+100]))
# Also search for '};' to see all end-of-block
print('---all "};" occurrences near blog---')
for i, m in enumerate(re.finditer(r'\};', text)):
    pos = m.start()
    if 'blogPosts' in text[max(0,pos-500):pos+50]:
        print(f'  match {i}: pos={pos}, context:', repr(text[max(0,pos-100):pos+50]))
