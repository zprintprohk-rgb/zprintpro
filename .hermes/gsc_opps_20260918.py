"""机会量化模型 + 分站点词表"""
import json, sys, warnings
warnings.filterwarnings('ignore')
sys.stdout.reconfigure(encoding='utf-8')
D = json.load(open(r'F:\zprintpro-nextjs\.hermes\gsc-2026-09-18\extract.json', encoding='utf-8'))

rows = D['new']['combo_28d'].get('查询数', [])
BANDS = [(1, 3, 0.0604), (4, 10, 0.0148), (11, 20, 0.0043), (21, 50, 0.0031), (51, 999, 0.0)]

print('=' * 104)
print('【L】机会量化: 把各带词「上移一带」的理论点击增量 (用实测带内 CTR, 非估算)')
print('=' * 104)
cur = 0
for lo, hi, ctr in BANDS:
    sel = [r for r in rows if lo <= (r.get('排名') or 999) <= hi]
    i = sum((r.get('展示') or 0) for r in sel)
    c = sum((r.get('点击次数') or 0) for r in sel)
    cur += c
    print('  band %-8s #q=%-4d imps=%-6d 实测clicks=%-4d 实测CTR=%.2f%%  → 若整体达上一带 CTR 的点击' % ('%d-%d' % (lo, hi), len(sel), i, c, ctr * 100))
print('\n  实测总点击 (查询表内) = %d' % cur)
print('  说明: GSC 查询表受 1000 行上限 + 匿名化限制, 表内 imps=%d, 站点 28d 实收 imps=20833, clicks=356'
      % sum((r.get('展示') or 0) for r in rows))
print('  ⇒ 查询表外(匿名长尾)贡献 imps=%d / clicks=%d  (占全部点击 %.0f%%)'
      % (20833 - sum((r.get('展示') or 0) for r in rows), 356 - cur, (356 - cur) / 356 * 100))

print('\n' + '=' * 104)
print('【M】香港站点 28d Top 22 查询 (按展示)')
print('=' * 104)
for r in sorted(D['new']['hk_28d'].get('查询数', []), key=lambda r: -(r.get('展示') or 0))[:22]:
    print('  %-30s imps=%-5s clicks=%-4s CTR=%-7s pos=%.1f' % (str(r.get('热门查询'))[:30], r.get('展示'), r.get('点击次数'), str(round((r.get('点击率') or 0) * 100, 2)) + '%', r.get('排名') or 0))

print('\n' + '=' * 104)
print('【N】美国站点 28d Top 22 查询 (按展示)')
print('=' * 104)
for r in sorted(D['new']['us_28d'].get('查询数', []), key=lambda r: -(r.get('展示') or 0))[:22]:
    print('  %-40s imps=%-5s clicks=%-4s CTR=%-7s pos=%.1f' % (str(r.get('热门查询'))[:40], r.get('展示'), r.get('点击次数'), str(round((r.get('点击率') or 0) * 100, 2)) + '%', r.get('排名') or 0))

print('\n' + '=' * 104)
print('【O】日本站点 28d Top 15 查询')
print('=' * 104)
for r in sorted(D['new']['jp_28d'].get('查询数', []), key=lambda r: -(r.get('展示') or 0))[:15]:
    print('  %-30s imps=%-5s clicks=%-4s CTR=%-7s pos=%.1f' % (str(r.get('热门查询'))[:30], r.get('展示'), r.get('点击次数'), str(round((r.get('点击率') or 0) * 100, 2)) + '%', r.get('排名') or 0))

print('\n' + '=' * 104)
print('【P】最近 24 小时 (三站点汇总) — 最实时切片')
print('=' * 104)
blk = D['new']['combo_24h']
for r in sorted(blk.get('查询数', []), key=lambda r: -(r.get('展示') or 0))[:12]:
    print('  %-34s imps=%-5s clicks=%-4s CTR=%-7s pos=%.1f' % (str(r.get('热门查询'))[:34], r.get('展示'), r.get('点击次数'), str(round((r.get('点击率') or 0) * 100, 2)) + '%', r.get('排名') or 0))
tc = sum((r.get('点击次数') or 0) for r in blk.get('图表', []) and [])
hrs = blk.get('图表', [])
if hrs:
    k = list(hrs[0].keys())
    print('  24h 合计: clicks=%s imps=%s' % (sum(r[k[1]] or 0 for r in hrs), sum(r[k[2]] or 0 for r in hrs)))

print('\n' + '=' * 104)
print('【Q】2026-09-10 旧档 vs 09-18 新档: 查询表规模对比 (7d 窗)')
print('=' * 104)
for label, key in (('09-18', 'combo_7d'), ('09-10', 'combo_7d')):
    blk = (D['new'] if label == '09-18' else D['old']).get(key)
    if not blk:
        continue
    q = blk.get('查询数', [])
    ds = blk.get('图表', [])
    k = list(ds[0].keys()) if ds else None
    print('  %s: 查询数=%d  imps(表内)=%d  7d合计 clicks=%s imps=%s' % (
        label, len(q), sum((r.get('展示') or 0) for r in q),
        sum(r[k[1]] or 0 for r in ds) if k else '-', sum(r[k[2]] or 0 for r in ds) if k else '-'))
