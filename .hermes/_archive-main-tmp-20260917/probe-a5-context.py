"""Find a5-flyers optimizedAt context to understand field placement"""
import re
with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    p = f.read()
blocks = re.split(r'(?=^\s*slug:\s*[\'"])', p, flags=re.MULTILINE)
for block in blocks:
    if re.match(r"\s*slug:['\"]a5-flyers['\"]", block):
        idx = block.find('optimizedAt')
        if idx > 0:
            print('--- a5-flyers optimizedAt context ---')
            print(block[max(0,idx-400):idx+200])
        break
