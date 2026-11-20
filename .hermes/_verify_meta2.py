# -*- coding: utf-8 -*-
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
checks = [
    ('zh new', 'A2 HK$9 起/張、A1 HK$45 起/張'),
    ('en new', 'Poster printing from $2.30 (A2 157g), 1 MOQ'),
    ('ja new', 'A2 ¥300〜、A1 ¥600〜'),
    ('zh old', 'HK$10 起/張'),
    ('en old', 'from $3.50'),
    ('ja old', '¥500〜'),
]
for name, s in checks:
    print(f'{name}: {t.count(s)}')
# ensure posters titles unchanged
i = t.find("'posters': {")
j = t.find('titles:', i)
seg = t[j:j+300]
print('posters titles block unchanged check:')
print('  has 海報印刷 A0/A1/A2・防水1張起印:', '海報印刷 A0/A1/A2・防水1張起印' in seg)
print('  has HK$10 in titles:', 'HK$10' in seg)
