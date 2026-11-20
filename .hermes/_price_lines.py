# -*- coding: utf-8 -*-
# exact price lines with line numbers in category-seo-content.ts for paper-bags + posters
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
lines = t.split('\n')

# regions: find const paperBagsContent and const postersContent start/end lines
starts = {}
for name in ['paperBagsContent', 'postersContent']:
    for i, l in enumerate(lines):
        if l.startswith('const ' + name):
            starts[name] = i
            break
print('starts:', starts)
# find end: next 'const ' after start
ends = {}
names_order = ['paperBagsContent', 'postersContent']
for idx, name in enumerate(names_order):
    nxt = None
    for i in range(starts[name]+1, len(lines)):
        if lines[i].startswith('const ') or lines[i].startswith('export const'):
            nxt = i
            break
    ends[name] = nxt
print('ends:', ends)

price_re = re.compile(r'(HK\$|US\$|¥|USD|\$)\s*[0-9][0-9,\.]*')
for name in ['paperBagsContent', 'postersContent']:
    print(f'==== {name} (lines {starts[name]}-{ends[name]}) ====')
    for i in range(starts[name], ends[name]):
        l = lines[i]
        if price_re.search(l) and not l.strip().startswith('//'):
            # trim long lines
            shown = l.strip()[:160]
            print(f'  L{i+1}: {shown}')
    print()
