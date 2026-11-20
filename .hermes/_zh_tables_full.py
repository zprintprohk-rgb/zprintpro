# -*- coding: utf-8 -*-
# full material/process/rush tables of zh poster-printing-guide (untruncated)
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json', encoding='utf-8'))
c = d['poster-printing-guide']['content']
tables = re.findall(r'<table.*?</table>', c, re.S)
print('tables:', len(tables))
for i, t in enumerate(tables):
    if i in (1, 2, 3):
        print(f'===== TABLE {i} FULL =====')
        print(t)
        print()
