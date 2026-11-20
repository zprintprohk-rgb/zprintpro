# -*- coding: utf-8 -*-
# K3 供图后一键落盘: .hermes/_roll_raw/roll_{loc}_{n}.(png|jpg) → public/.../zprintpro-stickers-roll-stickers-{loc}-{n}.webp
# 命名约定: roll_zh-hk_1.png / roll_en_2.jpg ... (n=1 hero, 2 detail, 3 multi-angle, 4 variety)
import io, sys
from pathlib import Path
from PIL import Image
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(r'F:\zprintpro-nextjs')
RAW = ROOT / '.hermes' / '_roll_raw'
OUT = ROOT / 'public' / 'images' / 'products' / 'seedream-webp'
NEED = [('zh-hk', 1), ('zh-hk', 2), ('zh-hk', 3),
        ('en', 1), ('en', 2), ('en', 3), ('en', 4),
        ('ja', 1), ('ja', 2), ('ja', 3), ('ja', 4)]

done, missing = [], []
for loc, n in NEED:
    target = OUT / ('zprintpro-stickers-roll-stickers-%s-%d.webp' % (loc, n))
    src = None
    for ext in ('.png', '.jpg', '.jpeg', '.webp'):
        c = RAW / ('roll_%s_%d%s' % (loc, n, ext))
        if c.exists():
            src = c
            break
    if not src:
        missing.append('%s-%d' % (loc, n))
        continue
    img = Image.open(src)
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')
    img.resize((1200, 1200), Image.LANCZOS).save(target, 'WEBP', quality=75, method=6)
    done.append('%s %dKB' % (target.name, target.stat().st_size // 1024))

print('converted %d/11:' % len(done))
for d in done:
    print(' ', d)
if missing:
    print('MISSING:', ', '.join(missing))
    sys.exit(2)
print('ALL 11 IMAGES READY')
