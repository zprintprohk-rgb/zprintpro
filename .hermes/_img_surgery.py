# -*- coding: utf-8 -*-
# Stage A 手术: ① 36 图平铺复制 ② products.ts 编辑 (2零图补块 + place-cards 重指 + 13 死-5摘除 + roll legacy 修指)
import io, shutil, sys
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
SRC = ROOT / 'zprintpro-en-us-images/v28_5_webp'
DST = ROOT / 'public/images/products/seedream-webp'
ts_path = ROOT / 'src/data/products.ts'
t = io.open(ts_path, encoding='utf-8').read()
orig = t

# ① 平铺复制 36 文件 (verbatim 文件名)
copied = 0
for d in ('WI-001', 'WI-003', 'PC-001'):
    for f in (SRC / d).iterdir():
        if f.suffix == '.webp':
            shutil.copy2(f, DST / f.name)
            copied += 1
print('copied:', copied)
assert copied == 36, copied

# 验证复制源齐全 (12×3)
for d in ('WI-001', 'WI-003', 'PC-001'):
    assert len(list((SRC / d).glob('*.webp'))) == 12

# ② roll legacy 修指
OLD_ROLL = "images: ['/images/products/roll-stickers.jpg'],"
NEW_ROLL = "images: ['/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-1.webp'],"
assert t.count(OLD_ROLL) == 1
t = t.replace(OLD_ROLL, NEW_ROLL)

# ③ 13 条死-5 行摘除 (文件从未存在, 全站 404)
dead5 = [
 "zprintpro-stickers-premium-stickers-en-5.webp",   # premium + wedding-invitations + place-cards 三处
 "zprintpro-stickers-thick-stickers-400g-zh-hk-5.webp",
 "zprintpro-stickers-thick-stickers-400g-en-5.webp",
 "zprintpro-stickers-thick-stickers-400g-ja-5.webp",
 "zprintpro-stickers-foil-stickers-zh-hk-5.webp",
 "zprintpro-stickers-foil-stickers-ja-5.webp",
 "zprintpro-stickers-matte-stickers-en-5.webp",
 "zprintpro-stickers-matte-stickers-ja-5.webp",
 "zprintpro-stickers-rounded-corner-cards-zh-hk-5.webp",
 "zprintpro-stickers-rounded-corner-cards-en-5.webp",
 "zprintpro-stickers-rounded-corner-cards-ja-5.webp",
]
removed = 0
lines = t.split('\n')
kept = []
for ln in lines:
    if any(("/images/products/seedream-webp/" + d) in ln for d in dead5):
        removed += 1
        continue
    kept.append(ln)
t = '\n'.join(kept)
print('dead -5 lines removed:', removed)
assert removed == 11, removed  # audit3 实锤 11 条 (premium-en ×1 + 其余 10)

# ④ place-cards 重指 (贺卡图→本産品 PC-001 图)
PC = "'zh-hk': [\n      '/images/products/seedream-webp/zprintpro-place-cards-wedding-place-cards-zh-hk-hero.webp',\n      '/images/products/seedream-webp/zprintpro-place-cards-wedding-place-cards-zh-hk-detail.webp',\n      '/images/products/seedream-webp/zprintpro-place-cards-wedding-place-cards-zh-hk-multi-angle.webp',\n      '/images/products/seedream-webp/zprintpro-place-cards-wedding-place-cards-zh-hk-variety.webp',\n    ],"
def loc_block(loc):
    b = "    '%s': [\n" % loc
    for v in ('hero', 'detail', 'multi-angle', 'variety'):
        b += "      '/images/products/seedream-webp/zprintpro-place-cards-wedding-place-cards-%s-%s.webp',\n" % (loc, v)
    b += "    ],"
    return b

i = t.index("slug: 'place-cards'")
seg_end = t.index('},', t.index('imagesByLocale', i))
seg = t[i:seg_end]
new_seg = seg
for loc in ('zh-hk', 'en', 'ja'):
    m_start = new_seg.index("'%s': [" % loc)
    m_end = new_seg.index('],', m_start) + 2
    new_seg = new_seg[:m_start] + loc_block(loc) + new_seg[m_end:]
t = t[:i] + new_seg + t[seg_end:]
print('place-cards repointed')

# ⑤ 两个零图婚礼条目: images 行后插 imagesByLocale + seoImages
def wiblock(cat_name, slug_part, alts):
    out = "  imagesByLocale: {\n"
    for loc in ('zh-hk', 'en', 'ja'):
        out += "    '%s': [\n" % loc
        for v in ('hero', 'detail', 'multi-angle', 'variety'):
            out += "      '/images/products/seedream-webp/zprintpro-%s-%s-%s-%s.webp',\n" % (cat_name, slug_part, loc, v)
        out += "    ],\n"
    out += "  },\n"
    out += "  seoImages: {\n"
    out += "    filename: { 'zh-hk': 'zprintpro-%s-%s-zh-hk-hero.webp', en: 'zprintpro-%s-%s-en-hero.webp', ja: 'zprintpro-%s-%s-ja-hero.webp' },\n" % (cat_name, slug_part, cat_name, slug_part, cat_name, slug_part)
    out += "    alt: {\n      'zh-hk': '%s',\n      en: '%s',\n      ja: '%s',\n    },\n  },\n" % alts
    return out

WED = 'wedding-invitations'
targets = [
 ('foil-wedding-invitations', WED, 'foil-wedding-invitations',
  ('燙金結婚請帖 香港婚禮請柬印刷 厚卡燙金浮雕定制 | 智印港',
   'Foil Wedding Invitations Gold Stamping Thick Cardstock Hong Kong | ZprintPro',
   '箔押し結婚式招待状 厚紙カード 香港印刷 カスタム | ZprintPro')),
 ('wedding-thank-you-cards', WED, 'wedding-thank-you-cards',
  ('婚禮感謝卡 香港結婚回謝卡印刷 厚卡定制 | 智印港',
   'Wedding Thank You Cards Custom Printing Hong Kong | ZprintPro',
   '結婚式サンキューカード 香港印刷 オーダーメイド | ZprintPro')),
]
for slug, cat, part, alts in targets:
    old_img = "images: ['/images/products/%s-1.jpg']," % slug
    assert t.count(old_img) == 1, (slug, t.count(old_img))
    new_img = "images: ['/images/products/seedream-webp/zprintpro-%s-%s-zh-hk-hero.webp']," % (cat, part)
    ins = new_img + "\n" + wiblock(cat, part, alts).rstrip('\n')
    t = t.replace(old_img, ins)
    print('inserted imagesByLocale+seoImages:', slug)

# 一致性断言
assert 'roll-stickers.jpg' not in t
assert 'foil-wedding-invitations-1.jpg' not in t
assert 'wedding-thank-you-cards-1.jpg' not in t
for d in dead5:
    assert d not in t, d  # 只断言 11 个死引用清零, 其余 -5 为存量正常图

io.open(ts_path, 'w', encoding='utf-8', newline='\n').write(t)
print('products.ts written, delta bytes:', len(t) - len(orig))
