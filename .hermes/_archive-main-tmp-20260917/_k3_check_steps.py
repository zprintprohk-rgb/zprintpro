# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# Find all 'step:' occurrences
import re
matches = list(re.finditer(r"step:\s*'(\d)'", src))
for m in matches:
    pos = m.start()
    # Find the next 200 chars
    print('--- step {0} at {1} ---'.format(m.group(1), pos))
    print(src[pos:pos+250].replace(chr(10), ' ')[:250])
    print()
