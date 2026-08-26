# -*- coding: utf-8 -*-
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
with io.open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
# find testimonials
idx = content.find('testimonials:')
print(f'testimonials at idx={idx}')
print(repr(content[idx-50:idx+800]))
