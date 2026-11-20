#!/usr/bin/env python3
import os
from PIL import Image
files = [
    ('CL-001 wall-calendar EN',  r'F:\zprintpro-nextjs\zprintpro-en-us-images\CL-001\zprintpro-calendars-wall-calendars-en-hero.webp'),
    ('BN-001 outdoor-banner EN', r'F:\zprintpro-nextjs\zprintpro-en-us-images\BN-001\zprintpro-banners-outdoor-vinyl-banners-en-hero.webp'),
    ('RP-001 red-packets JA',    r'F:\zprintpro-nextjs\zprintpro-en-us-images\RP-001\zprintpro-red-packets-foil-red-packets-en-hero.webp'),
    ('DJ-001 doujinshi JA',      r'F:\zprintpro-nextjs\zprintpro-en-us-images\DJ-001\zprintpro-japan-doujin-doujinshi-printing-ja-hero.webp'),
]
print(f"{'TEST':<30} {'SIZE':<11} {'BYTES':<10} XMP  JSON  STATUS")
print('-' * 75)
for name, path in files:
    if not os.path.exists(path):
        print(f'{name:<30} MISSING')
        continue
    img = Image.open(path)
    sz = os.path.getsize(path)
    with open(path, 'rb') as f:
        data = f.read()
    has_xmp = b'x:xmpmeta' in data
    has_json = os.path.exists(path.replace('.webp', '.json'))
    status = 'PASS' if (img.size == (1200, 1200) and sz <= 122880 and has_xmp and has_json) else 'WARN'
    x = 'X' if has_xmp else ' '
    j = 'X' if has_json else ' '
    print(f'{name:<30} {img.size[0]}x{img.size[1]:<6} {sz:>8,}B  {x}     {j}     [{status}]')
