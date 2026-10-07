# -*- coding: utf-8 -*-
"""Money-keyword mining: GSC 10/5 exports (us/jp/hk) -> transactional query inventory"""
import io, os, re, json, glob
from openpyxl import load_workbook

MONEY_EN = re.compile(r'(price|cost|cheap|bulk|wholesale|quote|no minimum|discount|affordable|budget|rush|same day|next day|overnight|fast |deal|from \$|\$\d|how much|near me|free shipping|moq)', re.I)
MONEY_JA = re.compile(r'(料金|激安|格安|相場|見積|価格|早割|安い|比較|即日|最短|特急|送料|割引|円|〜|から|枚|個|部|冊|注文|発注)')
MONEY_ZH = re.compile(r'(價錢|幾錢|多少錢|價格|報價|優惠|批發|大量|起|免費|即日|急件|HK\$|\$|錢|抵|平)')

def rows_from(path):
    wb = load_workbook(path, read_only=True)
    ws = wb.worksheets[1]
    out = []
    for r in ws.iter_rows(min_row=2, values_only=True):
        q = r[0]
        if not q: continue
        try:
            out.append((str(q), float(r[1] or 0), float(r[2] or 0), float(r[4] or 0) if r[4] is not None else 0))
        except Exception:
            pass
    return out

base = r'F:\zprintpro-nextjs\GSC数据'
files = sorted(glob.glob(os.path.join(base, '*.xlsx')))
print('xlsx files:', len(files))
result = {}
for f in files:
    name = os.path.basename(f)
    if '1005' not in name and '10-05' not in name and '2026-10-05' not in name:
        # 10/5 exports naming per checkpoint: 港 11:57-11:58 / 汇总 11:54-11:55 / 美 17:21-17:22 / 日 17:23-17:32
        pass
    rows = rows_from(f)
    tag = None
    if re.search(r'美|us|USA|United', name, re.I): tag = 'us'
    elif re.search(r'日|jp|Japan', name, re.I): tag = 'jp'
    elif re.search(r'港|hk|HK|香港', name, re.I): tag = 'hk'
    else: tag = 'sum'
    result.setdefault(tag, []).extend(rows)

for tag, rows in result.items():
    money = [r for r in rows if (MONEY_EN.search(r[0]) if tag == 'us' else MONEY_JA.search(r[0]) if tag == 'jp' else MONEY_ZH.search(r[0]))]
    money.sort(key=lambda r: -r[2])
    print('\n== %s: %d total queries, %d money queries ==' % (tag, len(rows), len(money)))
    for q, c, im, pos in money[:22]:
        print('  %-46s c=%-4g im=%-5g pos=%g' % (q[:46], c, im, pos))

json.dump({t: [{'q': r[0], 'clicks': r[1], 'imps': r[2], 'pos': r[3]} for r in sorted(v, key=lambda x: -x[2])] for t, v in result.items()},
          io.open(r'F:\zprintpro-nextjs\.hermes\money-kw-20261005.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('\nsaved .hermes/money-kw-20261005.json')
