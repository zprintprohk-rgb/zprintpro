# -*- coding: utf-8 -*-
# trilingual redaction-residue census: zh-hk 多年件 / 多個 etc; ja 多個 already known; en control
import json, re, io, sys
from collections import Counter
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def load(loc):
    return json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))

tokens = ['多年件', '多個', '多件', '大批量', '大货']
for loc in ['zh-hk', 'en', 'ja']:
    d = load(loc)
    print(f'===== {loc} ({len(d)} posts) =====')
    for tok in tokens:
        total = 0; posts_n = 0; examples = []
        for slug, post in d.items():
            s = json.dumps(post, ensure_ascii=False)
            c = s.count(tok)
            if c:
                total += c; posts_n += 1
                if len(examples) < 3:
                    i = s.find(tok)
                    examples.append(f'{slug}: ...{s[max(0,i-25):i+25]}...')
        if total:
            print(f'  {tok}: {total}x in {posts_n} posts')
            for e in examples: print('    ', e)
