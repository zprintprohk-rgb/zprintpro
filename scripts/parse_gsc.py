import csv

rows = []
with open('gsc_data.csv', 'r', encoding='utf-8') as f:
    r = csv.DictReader(f)
    for row in r:
        rows.append(row)

print('Total rows:', len(rows))
print('Header:', list(rows[0].keys()) if rows else 'none')
print()

# Top impressions with low CTR
high_imps = []
for r in rows:
    try:
        imps = int(r.get('展示', '0') or 0)
        clicks = int(r.get('点击次数', '0') or 0)
    except Exception:
        continue
    ctr = clicks/imps*100 if imps > 0 else 0
    rank_s = r.get('排名', '') or ''
    q = r.get('热门查询', '') or ''
    high_imps.append((imps, clicks, ctr, rank_s, q))

# Sort by impressions desc, then by CTR asc
high_imps.sort(key=lambda x: (-x[0], x[2]))

print('=== HIGH IMPRESSIONS / LOW CTR (Title opt candidates) ===')
for imps, clicks, ctr, rank, q in high_imps:
    if imps >= 30:
        rank_short = rank.split('.')[0] if rank else '?'
        print(f"imps={imps:4d} clicks={clicks:2d} ctr={ctr:5.1f}% rank={rank_short:>3} q={q[:35]}")

print()
print('=== TOP IMPRESSIONS TOTAL (regardless of CTR) ===')
for imps, clicks, ctr, rank, q in high_imps[:25]:
    rank_short = rank.split('.')[0] if rank else '?'
    print(f"imps={imps:4d} clicks={clicks:2d} ctr={ctr:5.1f}% rank={rank_short:>3} q={q[:35]}")

print()
print('=== CTAs that worked (high CTR) ===')
for imps, clicks, ctr, rank, q in high_imps:
    if clicks >= 3 and ctr >= 20:
        rank_short = rank.split('.')[0] if rank else '?'
        print(f"clicks={clicks:3d} imps={imps:3d} ctr={ctr:5.1f}% rank={rank_short:>3} q={q[:35]}")
