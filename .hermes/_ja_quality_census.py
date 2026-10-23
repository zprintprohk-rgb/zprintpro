# -*- coding: utf-8 -*-
# ja quality census: 多個 / 份 occurrences by slug with context buckets
import json, re, io, sys
from collections import Counter, defaultdict
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

raw = open(r'F:\zprintpro-nextjs\src\data\blog-data\ja.json', encoding='utf-8').read()
d = json.loads(raw)
posts = [{'slug': k, **v} for k, v in d.items()] if isinstance(d, dict) else d

def walk(o, path, acc):
    if isinstance(o, dict):
        for k, v in o.items():
            walk(v, path + [k], acc)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, path + [str(i)], acc)
    elif isinstance(o, str):
        acc.append((path, o))

pat_multi = re.compile(r'.{12}多個.{12}')
pat_bun = re.compile(r'.{12}份.{12}')

report = []
for p in posts:
    slug = p.get('slug', '?')
    acc = []
    walk(p, [slug], acc)
    multi_ctx = Counter()
    bun_ctx = []
    for path, s in acc:
        for m in pat_multi.finditer(s):
            ctx = m.group(0)
            key = re.sub(r'[^\u4e00-\u9fffA-Za-z0-9多個]', '', ctx)
            multi_ctx[ctx] += 1
        for m in pat_bun.finditer(s):
            bun_ctx.append((path[-2] if len(path) >= 2 else '?', m.group(0)))
    if multi_ctx or bun_ctx:
        report.append((slug, multi_ctx, bun_ctx))

total_multi = sum(sum(c.values()) for _, c, _ in report)
total_bun = sum(len(b) for _, _, b in report)
print('posts:', len(posts))
print('total 多個:', total_multi, '| posts with 多個:', sum(1 for _, c, _ in report if c))
print('total 份:', total_bun, '| posts with 份:', sum(1 for _, _, b in report if b))
print()
for slug, c, b in report:
    if c:
        print(f'== {slug} ({sum(c.values())}x 多個) ==')
        for ctx, n in c.most_common(40):
            print(f'  {n}x {ctx}')
    if b:
        print(f'-- {slug} ({len(b)}x 份) --')
        for fld, ctx in b[:8]:
            print(f'  [{fld}] {ctx}')
json.dump([{'slug': s, 'multi': dict(c), 'bun': [x[1] for x in b]} for s, c, b in report],
          open(r'F:\zprintpro-nextjs\.hermes\_ja_quality_census.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print()
print('census -> .hermes/_ja_quality_census.json')
