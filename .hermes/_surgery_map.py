# -*- coding: utf-8 -*-
# 手术全图: 受影响 9 slug 在各系统的块边界
import io, re
AFFECTED = ['fluorescent-stickers','drink-tokens','cafe-table-cards','wedding-place-cards','save-the-date-cards','wedding-seating-charts','wedding-suite-bundle','eco-tote-bag','postcard-set']
TARGETS  = {'fluorescent-stickers':'roll-stickers','drink-tokens':'place-cards','cafe-table-cards':'place-cards','wedding-place-cards':'place-cards','save-the-date-cards':'wedding-invitations','wedding-seating-charts':'wedding-invitations','wedding-suite-bundle':'wedding-invitations','eco-tote-bag':'paper-bags','postcard-set':'greeting-cards'}

pt = io.open('src/data/products.ts', encoding='utf-8').read()
print('=== products.ts ST ids ===')
print(sorted(set(re.findall(r"id: '(ST-\d+)'", pt))))
print()
print('=== products.ts 条目边界 (行号) ===')
lines = pt.split('\n')
for i, ln in enumerate(lines, 1):
    m = re.search(r"slug: '([a-z0-9-]+)'", ln)
    if m and m.group(1) in AFFECTED:
        # 向上找条目起点 "  {"
        s = i
        while s > 1 and not lines[s-1].startswith('  {'):
            s -= 1
        print('  L%d-%d slug=%s id=%s' % (s, i, m.group(1), re.search(r"id: '([^']+)'", '\n'.join(lines[s-1:i+3])).group(1) if re.search(r"id: '([^']+)'", '\n'.join(lines[s-1:i+3])) else '?'))
