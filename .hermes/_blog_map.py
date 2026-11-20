# -*- coding: utf-8 -*-
# Stage B1: 19 无图 blog slug → 最近 SKU 的 per-locale hero 路径 (从 products.ts imagesByLocale[loc][0] 取真值)
import io, json, re
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()

MAP = {
 '2027-calendar-printing-complete-guide': 'wall-calendars',
 'apparel-clothing-tag-printing-guide': 'place-cards',
 'certificate-printing-guide': 'thick-paper-flyers',
 'childrens-picture-book-printing-guide': 'hardcover-books',
 'christmas-card-printing-2026': 'premium-greeting-cards',
 'cny-2027-red-packet-printing-guide': 'red-packets',
 'comiket-printing-prep-guide': 'doujinshi-printing',
 'corporate-holiday-cards-printing-guide': 'premium-greeting-cards',
 'folded-leaflet-printing-guide': 'folded-leaflets',
 'new-year-card-printing-2027-guide': 'premium-greeting-cards',
 'packaging-box-price-2026': 'folding-boxes',
 'photo-book-printing-guide': 'hardcover-books',
 'roll-up-banner-printing-guide': 'roll-up-banners',
 'rush-printing-hk-guide': 'same-day-flyers',
 'school-exercise-book-printing-guide': 'saddle-stitch-booklets',
 'self-publishing-printing-guide': 'perfect-bound-books',
 'textbook-printing-guide': 'perfect-bound-books',
 'thick-card-printing-guide': 'thick-paper-flyers',
 'zine-small-batch-booklet-printing-guide': 'saddle-stitch-booklets',
}

def entry_block(slug):
    base = t.index('export const products')
    i = t.index("slug: '%s'" % slug, base)  # 跳过 categories 数组里的同名 slug
    # 行级回扫: 整行恰为 '  {' 或 '    {' 的最近一行 (跳过嵌套对象)
    j = None
    for k in range(i, base, -1):
        line_start = t.rfind('\n', 0, k) + 1
        line = t[line_start:k + 1]
        if line in ('  {', '    {'):
            j = line_start
            break
    if j is None:
        return None
    depth = 0
    in_str = None
    esc = False
    for k in range(j, len(t)):
        c = t[k]
        if in_str:
            if esc:
                esc = False
            elif c == '\\':
                esc = True
            elif c == in_str:
                in_str = None
        else:
            if c in ('"', "'", '`'):
                in_str = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return t[j:k + 1]
    return None

out = {}
errors = []
for blog_slug, prod in MAP.items():
    try:
        blk = entry_block(prod)
    except ValueError as e:
        errors.append((blog_slug, prod, 'slug literal missing: %s' % e))
        continue
    if not blk:
        errors.append((blog_slug, prod, 'no entry'))
        continue
    m = re.search(r'imagesByLocale: \{(.*?)\n\s*\}', blk, re.DOTALL)
    if not m:
        errors.append((blog_slug, prod, 'no imagesByLocale'))
        continue
    locs = {}
    for mm in re.finditer(r"'(zh-hk|en|ja)': \[(.*?)\]", m.group(1), re.DOTALL):
        loc, arr = mm.group(1), mm.group(2)
        paths = re.findall(r"'(/images/[^']+)'", arr)
        if not paths:
            errors.append((blog_slug, prod, 'empty ' + loc))
            continue
        p = paths[0]
        if not (ROOT / 'public' / p.lstrip('/')).exists():
            errors.append((blog_slug, prod, 'missing file ' + p))
            continue
        locs[loc] = p
    if len(locs) == 3:
        out[blog_slug] = {'product': prod, 'locs': locs}
    else:
        errors.append((blog_slug, prod, 'locs=%s' % list(locs)))

print('mapped:', len(out), '/ 19')
for e in errors:
    print('ERR:', e)
io.open(ROOT / '.hermes/_blog_img_map.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=1))
for k, v in out.items():
    print('%-45s -> %s' % (k, v['product']))
