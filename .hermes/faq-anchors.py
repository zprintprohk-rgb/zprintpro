# -*- coding: utf-8 -*-
import io

P = r'F:\zprintpro-nextjs\src\data\category-seo-content.ts'
lines = io.open(P, encoding='utf-8').read().split('\n')
targets = {
    'stickers-zh': 178, 'calendars-zh': 1736, 'calendars-en': 1843, 'calendars-ja': 1942,
    'packaging-ja': 1623, 'doujin-ja': 4208, 'books-en': 3806, 'books-zh': 3696,
    'banners-zh': 3388, 'redpackets-zh': 2047,
}
for name, ln in targets.items():
    # line numbers are 1-based from grep
    print(name, '| L%d:' % ln, lines[ln - 1].strip()[:130])
