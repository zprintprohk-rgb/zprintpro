# -*- coding: utf-8 -*-
"""Deep GSC analysis: sweet spots by category + brand term + opportunity ranking."""
import csv

with open('gsc_data.csv', 'r', encoding='utf-8-sig') as f:
    rows = [r for r in csv.reader(f) if r and len(r) >= 5]

data = []
for r in rows[1:]:
    try:
        q, c, i, ctr, pos = r[0], int(r[1]), int(r[2]), float(r[3]), float(r[4])
        data.append((q, c, i, ctr, pos))
    except:
        pass

# Category mapping (zprintpro 14 categories + forbidden)
CATS = {
    '貼紙': 'stickers', 'sticker': 'stickers',
    '傳單': 'flyers', 'flyer': 'flyers', 'leaflet': 'flyers',
    '包裝盒': 'packaging', 'box': 'packaging', '盒': 'packaging',
    '紙袋': 'paper-bags', 'bag': 'paper-bags',
    '海報': 'posters', 'poster': 'posters',
    '月曆': 'calendars', 'calendar': 'calendars', '月歷': 'calendars',
    '餐牌': 'menus', 'menu': 'menus',
    '書': 'books', 'book': 'books', '冊': 'books', '畫冊': 'books', 'catalog': 'books',
    '橫額': 'banners', 'banner': 'banners', '易拉寶': 'banners',
    '信封': 'envelopes', 'envelope': 'envelopes',
    '利是': 'red-packets', 'red packet': 'red-packets',
    '教材': 'educational', 'education': 'educational', 'certificate': 'educational',
    '同人': 'japan-doujin', 'doujin': 'japan-doujin', '名刺': 'japan-doujin',
    '咭片': 'FORBIDDEN', '名片': 'FORBIDDEN', 'business card': 'FORBIDDEN',
}

def cat_of(q):
    ql = q.lower()
    for k, v in CATS.items():
        if k.lower() in ql:
            return v
    return 'other'

# Sweet spot: 5+ imps, rank 5-50, 0 clicks (no landing page yet)
sweet = [x for x in data if x[2] >= 5 and 5 <= x[4] <= 50 and x[1] == 0]
sweet = sorted(sweet, key=lambda x: -x[2])

print("=== SWEET SPOT (imps>=5, pos 5-50, 0 clicks) top 30 ===")
for q, c, i, ctr, p in sweet[:30]:
    print(f"{i:4d} imp | pos {p:6.2f} | {cat_of(q):14s} | {q}")

# By category totals
from collections import defaultdict
cat_imp = defaultdict(int)
cat_cnt = defaultdict(int)
for q, c, i, ctr, p in data:
    cat = cat_of(q)
    if cat != 'FORBIDDEN' and cat != 'other':
        cat_imp[cat] += i
        cat_cnt[cat] += 1
print("\n=== IMPRESSIONS BY CATEGORY (excl forbidden/other) ===")
for cat, total in sorted(cat_imp.items(), key=lambda x: -x[1]):
    print(f"{cat:14s}: {total:4d} imps / {cat_cnt[cat]:3d} keywords")

# Brand term
brand = [x for x in data if '智印' in x[0]]
print("\n=== BRAND TERM 智印港/智印雲 ===")
for q, c, i, ctr, p in brand:
    print(f"{i} imp | {c} clk | pos {p:.2f} | {q}")
