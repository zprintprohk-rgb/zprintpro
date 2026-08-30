"""GSC stats for 8/27 daily review"""
import csv, io
from collections import defaultdict

q = defaultdict(lambda: {'imps': 0, 'clicks': 0, 'pos_sum': 0.0, 'n': 0})
with open(r'F:\zprintpro-nextjs\gsc_data.csv', 'r', encoding='utf-8-sig') as f:
    r = csv.DictReader(f)
    for row in r:
        try:
            i = int(row['展示'])
            c = int(row['点击次数'])
            p = float(row['排名'])
        except (ValueError, KeyError):
            continue
        k = row['热门查询']
        q[k]['imps'] += i
        q[k]['clicks'] += c
        q[k]['pos_sum'] += p
        q[k]['n'] += 1

out = io.open(r'F:\zprintpro-nextjs\.hermes\logs\_gsc_27_stats.txt', 'w', encoding='utf-8')

total_i = sum(v['imps'] for v in q.values())
total_c = sum(v['clicks'] for v in q.values())
out.write(f'TOTAL Imps: {total_i}, Clicks: {total_c}, CTR: {total_c*100/total_i:.2f}%, Unique queries: {len(q)}\n\n')

out.write('=== Top 25 by clicks ===\n')
for k, v in sorted(q.items(), key=lambda kv: -kv[1]['clicks'])[:25]:
    pos = v['pos_sum'] / v['n']
    ctr = v['clicks'] * 100 / v['imps'] if v['imps'] else 0
    out.write(f'{k:40s} imps={v["imps"]:5d} clk={v["clicks"]:3d} ctr={ctr:5.2f}% pos={pos:6.2f}\n')

out.write('\n=== Top 25 by imps ===\n')
for k, v in sorted(q.items(), key=lambda kv: -kv[1]['imps'])[:25]:
    pos = v['pos_sum'] / v['n']
    ctr = v['clicks'] * 100 / v['imps'] if v['imps'] else 0
    out.write(f'{k:40s} imps={v["imps"]:5d} clk={v["clicks"]:3d} ctr={ctr:5.2f}% pos={pos:6.2f}\n')

out.write('\n=== Striking distance (zero click, imps >= 10, pos <= 50) ===\n')
for k, v in sorted(q.items(), key=lambda kv: -kv[1]['imps']):
    if v['clicks'] == 0 and v['imps'] >= 10:
        pos = v['pos_sum'] / v['n']
        if pos <= 50:
            out.write(f'{k:40s} imps={v["imps"]:5d} pos={pos:6.2f}\n')

out.write('\n=== Pos 1-10 winners (clicks > 0) ===\n')
winners = []
for k, v in q.items():
    pos = v['pos_sum'] / v['n'] if v['n'] else 999
    if v['clicks'] > 0 and pos <= 10:
        winners.append((k, v, pos))
winners.sort(key=lambda x: -x[1]['clicks'])
for k, v, pos in winners:
    ctr = v['clicks'] * 100 / v['imps'] if v['imps'] else 0
    out.write(f'{k:40s} imps={v["imps"]:5d} clk={v["clicks"]:3d} ctr={ctr:5.2f}% pos={pos:6.2f}\n')

out.close()
print('OK')
