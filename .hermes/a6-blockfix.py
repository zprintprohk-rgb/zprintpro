# -*- coding: utf-8 -*-
"""A6 fix: move 易拉架+車身廣告 FAQ from posters block to banners block; add posters same-day FAQ"""
import io

P = r'F:\zprintpro-nextjs\src\data\category-seo-content.ts'
lines = io.open(P, encoding='utf-8').read().split('\n')

YILAJIA = "      { q: '易拉架印刷幾錢？幾時交貨？', a: '標準 850×2000mm 套價 HK$85-300（視布料同後加工），10 套起印，5-7 個工作天交貨，1 小時免費數碼打稿。最大 1200×3000mm，布料三選：防水帆布／網孔布／旗幟布。' },"
CAR = None
POSTERS_NEW = "      { q: '海報印刷即日交貨得唔得？', a: '得。A3/A2 數碼大圖最快即日出貨（18:00 前落單），A1 / MTR 12-sheet 特急 24-48 小時，加急費 +30%。1 張起印，免費打稿。' },"

# 1. extract the two misplaced entries from posters zh faq
yi_idx = car_idx = None
for i, l in enumerate(lines):
    if '易拉架印刷幾錢' in l:
        yi_idx = i
    if '車身廣告貼紙價錢幾多' in l and car_idx is None:
        car_idx = i
assert yi_idx is not None and car_idx is not None
CAR = lines[car_idx].rstrip()
assert lines[yi_idx].rstrip() == YILAJIA
del lines[car_idx]
del lines[yi_idx]
print('extracted from posters block: 易拉架 L%d, 車身廣告 L%d' % (yi_idx + 1, car_idx + 1))

# 2. insert into banners zh faq (block starts L416; faq head at L501 pre-shift; find by anchor)
ban_faq = None
for i, l in enumerate(lines):
    if l.strip() == 'faq: [' and i > 400 and i < 560:
        ban_faq = i
        break
assert ban_faq is not None, 'banners zh faq not found'
lines.insert(ban_faq + 1, YILAJIA)
lines.insert(ban_faq + 2, CAR)
print('inserted into banners zh faq at L%d' % (ban_faq + 1))

# 3. add posters same-day FAQ into posters zh faq (find by neighbour entry anchor)
post_faq = None
for i, l in enumerate(lines):
    if '海報印刷最低多少張起' in l:
        post_faq = i
        break
assert post_faq is not None
lines.insert(post_faq, POSTERS_NEW)
print('posters same-day FAQ inserted before L%d' % (post_faq + 1))

io.open(P, 'w', encoding='utf-8', newline='\n').write('\n'.join(lines))
print('fix written OK')
