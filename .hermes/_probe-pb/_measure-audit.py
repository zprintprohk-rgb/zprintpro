# -*- coding: utf-8 -*-
"""测量底座审计: (1) 队列 observed query×page 承接数据 (2) 28d 国家分布 top (3) 带钱词清单"""
import openpyxl, json, io, sys, glob
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 1) 队列 observed
d = json.load(open('.hermes/cron-prompts/blog-money-keyword-queue.json', encoding='utf-8'))
print('=== 队列 observed ===')
for it in d['items']:
    obs = it.get('observed')
    if obs:
        print('-', it['cluster'], '|', json.dumps(obs, ensure_ascii=False)[:300])
print()

# 2) 国家分布
f = glob.glob('GSC数据/28天三站点汇总数据*2026-10-30*.xlsx')[0]
wb = openpyxl.load_workbook(f, read_only=True, data_only=True)
ws = wb['国家_地区']
rows = list(ws.iter_rows(values_only=True))
print('=== 国家_地区 header:', rows[0], 'rows:', len(rows) - 1)
data = []
for r in rows[1:]:
    try:
        country = str(r[0] or '')
        clk = float(r[1] or 0)
        imp = float(r[2] or 0)
        pos = float(r[4] or 0)
        data.append((country, clk, imp, pos))
    except Exception:
        pass
data.sort(key=lambda x: -x[2])
total_imp = sum(x[2] for x in data)
print('total imps:', total_imp)
for x in data[:15]:
    print('  %-28s imp=%6.0f (%.1f%%) clk=%4.0f pos=%.1f' % (x[0], x[2], x[2] / total_imp * 100, x[1], x[3]))
# 按市场聚合
def bucket(c):
    c = c.lower()
    if c in ('hong kong', '香港'):
        return 'HK'
    if c in ('japan', '日本'):
        return 'JP'
    if c in ('united states', '美国', '美國'):
        return 'US'
    if c in ('united kingdom', '英国', '英國'):
        return 'UK'
    if c in ('canada', '加拿大', 'australia', '澳大利亚', '澳洲', 'new zealand', '新西兰'):
        return 'EN-other'
    if c in ('singapore', '新加坡', 'malaysia', '马来西亚', 'taiwan', '台湾', '台灣'):
        return 'APAC-other'
    return 'other'
agg = {}
for c, clk, imp, pos in data:
    b = bucket(c)
    a = agg.setdefault(b, [0, 0, 0.0])
    a[0] += imp; a[1] += clk
print('\n=== 市场聚合 ===')
for b, (imp, clk, _) in sorted(agg.items(), key=lambda x: -x[1][0]):
    print('  %-12s imp=%6.0f (%.1f%%) clk=%4.0f' % (b, imp, imp / total_imp * 100, clk))

# 3) 带钱词在 查询数 sheet 的精确匹配
ws2 = wb['查询数']
rows2 = list(ws2.iter_rows(values_only=True))
qmap = {}
for r in rows2[1:]:
    try:
        q = str(r[0] or '').strip()
        qmap[q] = (float(r[1] or 0), float(r[2] or 0), float(r[4] or 0))
    except Exception:
        pass
print('\n=== 队列带钱词精确匹配 ===')
for it in d['items']:
    for q in (it.get('money_queries') or []):
        v = qmap.get(q)
        print('  %-16s %-14s %s' % (it['cluster'], q, ('imp=%.0f clk=%.0f pos=%.1f' % v) if v else 'NO_MATCH'))
