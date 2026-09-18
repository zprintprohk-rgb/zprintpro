"""GSC 数据抽取: 2026-09-18 全部 12 档 + 2026-09-10 对照档 -> JSON + 可读摘要
输出: .hermes/gsc-2026-09-18/extract.json
"""
import openpyxl, glob, os, json, sys, warnings
warnings.filterwarnings('ignore')
sys.stdout.reconfigure(encoding='utf-8')

D = r'F:\zprintpro-nextjs\GSC数据'
OUT = r'F:\zprintpro-nextjs\.hermes\gsc-2026-09-18'
os.makedirs(OUT, exist_ok=True)


def load(path):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    out = {}
    for ws in wb.worksheets:
        rows = list(ws.iter_rows(values_only=True))
        if not rows:
            continue
        hdr = rows[0]
        out[ws.title] = [dict(zip(hdr, r)) for r in rows[1:] if r and r[0] is not None]
    wb.close()
    return out


def pick(files, *keys):
    for f in files:
        b = os.path.basename(f)
        if all(k in b for k in keys):
            return f
    return None


NEW = sorted(glob.glob(os.path.join(D, '*2026-09-18.xlsx')))
OLD = sorted(glob.glob(os.path.join(D, '*2026-09-10.xlsx')))
res = {'new': {}, 'old': {}}

MAP_NEW = {
    'combo_28d': ('28天三站点汇总',),
    'combo_7d': ('7天三站点汇总',),
    'combo_24h': ('24小时三站点汇总',),
    'hk_28d': ('香港站点28天',),
    'hk_7d': ('香港站点7天',),
    'hk_24h': ('香港站点24小时',),
    'jp_28d': ('日本站点28天',),
    'jp_7d': ('日本站点7天',),
    'jp_24h': ('日本站点24小时',),
    'us_28d': ('美国站点28天',),
    'us_7d': ('美国站点7天',),
    'us_24h': ('美国站点24小时',),
}
for key, keys in MAP_NEW.items():
    f = pick(NEW, *keys)
    if f:
        res['new'][key] = load(f)

MAP_OLD = {
    'combo_28d': ('28天三站点汇总',),
    'combo_7d': ('7天三站点汇总',),
    'hk_28d': ('28天香港站点',),
    'us_28d': ('28天美国站点',),
    'jp_28d': ('28天日本站点',),
}
for key, keys in MAP_OLD.items():
    f = pick(OLD, *keys)
    if f:
        res['old'][key] = load(f)

with open(os.path.join(OUT, 'extract.json'), 'w', encoding='utf-8') as fh:
    json.dump(res, fh, ensure_ascii=False)

# ---------- 可读摘要 ----------
def daily(block, sheet='图表'):
    rows = block.get(sheet, [])
    out = []
    for r in rows:
        k = list(r.keys())
        out.append({'date': str(r[k[0]]), 'clicks': r[k[1]], 'imps': r[k[2]], 'ctr': r[k[3]], 'pos': r[k[4]]})
    return out


print('=' * 100)
print('【A】28 天日序列 — 三站点汇总 (新旧对照拼接)')
print('=' * 100)
both = {}
for label, key in (('09-18档', 'combo_28d'), ('09-10档', 'combo_28d')):
    blk = res['new'].get(key) if label == '09-18档' else res['old'].get(key)
    if not blk:
        print(label + ': 缺')
        continue
    ds = daily(blk)
    for d in ds:
        both.setdefault(d['date'], {})[label] = d
print('%-12s %28s %28s' % ('日期', '09-18档 (点/展/CTR/位)', '09-10档 (点/展/CTR/位)'))
for date in sorted(both):
    a = both[date].get('09-18档')
    b = both[date].get('09-10档')
    fa = ('%4s %6s %6s %5s' % (a['clicks'], a['imps'], (str(round(a['ctr']*100, 2)) + '%'), round(a['pos'], 1))) if a else ' ' * 24
    fb = ('%4s %6s %6s %5s' % (b['clicks'], b['imps'], (str(round(b['ctr']*100, 2)) + '%'), round(b['pos'], 1))) if b else ' ' * 24
    print('%-12s %28s %28s' % (date, fa, fb))

for key in ('combo_28d', 'hk_28d', 'jp_28d', 'us_28d'):
    blk = res['new'].get(key)
    if not blk:
        continue
    ds = daily(blk)
    tc = sum(d['clicks'] for d in ds); ti = sum(d['imps'] for d in ds)
    print('\n%s: 28d 合计 clicks=%s imps=%s 平均CTR=%.2f%% 平均位=%.1f  (天数=%d)' % (
        key, tc, ti, (tc / ti * 100 if ti else 0),
        sum(d['pos'] * d['imps'] for d in ds) / ti if ti else 0, len(ds)))

# 分半对比 (前14天 vs 后14天)
print('\n' + '=' * 100)
print('【B】28 天窗前半 vs 后半 (加权限平均)')
print('=' * 100)
for key in ('combo_28d', 'hk_28d', 'jp_28d', 'us_28d'):
    blk = res['new'].get(key)
    if not blk:
        continue
    ds = daily(blk)
    if len(ds) < 20:
        continue
    h = len(ds) // 2
    for label, part in (('前半', ds[:h]), ('后半', ds[h:])):
        c = sum(d['clicks'] for d in part); i = sum(d['imps'] for d in part)
        pos = sum(d['pos'] * d['imps'] for d in part) / i if i else 0
        print('  %-10s %-6s clicks=%-6s imps=%-7s CTR=%-6s pos=%.1f' % (key, label, c, i, (str(round(c/i*100, 2)) + '%' if i else '-'), pos))

print('\n' + '=' * 100)
print('【C】Top 40 查询 (28d, 按展示) — 三站点汇总')
print('=' * 100)
q = res['new']['combo_28d'].get('查询数', [])
qs = sorted(q, key=lambda r: -(r.get('展示') or 0))[:40]
print('%-42s %6s %7s %8s %7s' % ('query', '点击', '展示', 'CTR', '排名'))
for r in qs:
    k = list(r.keys())
    print('%-42s %6s %7s %8s %7s' % (str(r[k[0]])[:42], r[k[1]], r[k[2]], (str(round((r[k[3]] or 0)*100, 2)) + '%'), round(r[k[4]] or 0, 1)))

print('\n' + '=' * 100)
print('【D】Top 30 网页 (28d, 按展示)')
print('=' * 100)
pg = res['new']['combo_28d'].get('网页', [])
pgs = sorted(pg, key=lambda r: -(r.get('展示') or 0))[:30]
for r in pgs:
    k = list(r.keys())
    print('%-70s %5s %6s %8s %6s' % (str(r[k[0]]).replace('https://zprintpro.com', '')[:70], r[k[1]], r[k[2]], (str(round((r[k[3]] or 0)*100, 2)) + '%'), round(r[k[4]] or 0, 1)))

print('\n' + '=' * 100)
print('【E】设备 / 搜索结果呈现 (28d 汇总)')
print('=' * 100)
for sheet in ('设备', '搜索结果呈现'):
    for r in res['new']['combo_28d'].get(sheet, []):
        k = list(r.keys())
        print('  %-10s %-24s clicks=%-5s imps=%-7s CTR=%-7s pos=%s' % (sheet, str(r[k[0]])[:24], r[k[1]], r[k[2]], (str(round((r[k[3]] or 0)*100, 2)) + '%'), round(r[k[4]] or 0, 1)))

print('\n' + '=' * 100)
print('【F】Top 15 国家 (28d)')
print('=' * 100)
ct = sorted(res['new']['combo_28d'].get('国家_地区', []), key=lambda r: -(r.get('展示') or 0))[:15]
for r in ct:
    k = list(r.keys())
    print('  %-20s clicks=%-5s imps=%-7s CTR=%-7s pos=%s' % (str(r[k[0]])[:20], r[k[1]], r[k[2]], (str(round((r[k[3]] or 0)*100, 2)) + '%'), round(r[k[4]] or 0, 1)))

print('\n提取完成 -> ' + os.path.join(OUT, 'extract.json'))
