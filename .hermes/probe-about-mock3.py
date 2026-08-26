# -*- coding: utf-8 -*-
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
with io.open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
# find MOCK
idx = content.find('MOCK')
print(f'MOCK at idx={idx}')
print(repr(content[max(0,idx-100):idx+200]))
print()
# find all MOCK
import re
for m in re.finditer(r'MOCK', content):
    print(f'  pos {m.start()}: {content[max(0,m.start()-50):m.end()+50]!r}')
