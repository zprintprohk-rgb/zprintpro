"""周度趋势 + 分站点 + 位置带分布"""
import json, sys, warnings
warnings.filterwarnings('ignore')
sys.stdout.reconfigure(encoding='utf-8')
D = json.load(open(r'F:\zprintpro-nextjs\.hermes\gsc-2026-09-18\extract.json', encoding='utf-8'))


def daily(key):
    blk = D['new'].get(key)
    if not blk:
        return []
    rows = blk.get('图表', [])
    out = []
    for r in rows:
        k = list(r.keys())
        out.append({'d': str(r[k[0]]), 'c': r[k[1]] or 0, 'i': r[k[2]] or 0, 'p': r[k[4]] or 0})
    return out


print('=' * 108)
print('【G】周度趋势 (周一起算, 28 天窗 = 2026-08-19 ~ 09-15; GSC 数据有 ~2-3 天滞后)')
print('=' * 108)
for key in ('combo_28d', 'hk_28d', 'jp_28d', 'us_28d'):
    ds = daily(key)
    if not ds:
        continue
    print('\n--- ' + key + ' ---')
    print('%-14s %8s %9s %9s %9s %9s' % ('周(起)', 'clicks', 'imps', 'CTR', 'avgPos', '日数'))
    # 按 7 天一档切
    for s in range(0, len(ds), 7):
        part = ds[s:s + 7]
        c = sum(x['c'] for x in part); i = sum(x['i'] for x in part)
        pos = sum(x['p'] * x['i'] for x in part) / i if i else 0
        print('%-14s %8s %9s %9s %9s %9s' % (part[0]['d'][5:] + '~' + part[-1]['d'][5:], c, i, (str(round(c / i * 100, 2)) + '%' if i else '-'), round(pos, 1), len(part)))

print('\n' + '=' * 108)
print('【H】位置带分布 (combo_28d 查询级) — 曝光/clicks 落在哪一带')
print('=' * 108)
rows = D['new']['combo_28d'].get('查询数', [])
bands = [(1, 3, '1-3 顶部'), (3.001, 10, '4-10 首页'), (10.001, 20, '11-20 第二页'), (20.001, 50, '21-50'), (50.001, 999, '51+')]
print('%-14s %8s %10s %8s %9s %8s' % ('band', '#query', 'imps', 'clicks', 'CTR', 'imps占比'))
tim = sum((r.get('展示') or 0) for r in rows)
for lo, hi, label in bands:
    sel = [r for r in rows if lo <= (r.get('排名') or 999) <= hi]
    i = sum((r.get('展示') or 0) for r in sel); c = sum((r.get('点击次数') or 0) for r in sel)
    print('%-14s %8d %10d %8d %9s %8s' % (label, len(sel), i, c, (str(round(c / i * 100, 2)) + '%' if i else '-'), (str(round(i / tim * 100, 1)) + '%' if tim else '-')))

print('\n' + '=' * 108)
print('【I】★ 高曝光 + 好位置 + 零点击 (展示>=30 且 排名<=12)')
print('=' * 108)
sel = [r for r in rows if (r.get('展示') or 0) >= 30 and (r.get('排名') or 999) <= 12]
sel.sort(key=lambda r: -(r.get('展示') or 0))
print('%-40s %6s %6s %7s %6s' % ('query', 'imps', 'clicks', 'CTR', 'pos'))
for r in sel[:30]:
    print('%-40s %6s %6s %7s %6s' % (str(r.get('热门查询'))[:40], r.get('展示'), r.get('点击次数'), str(round((r.get('点击率') or 0) * 100, 2)) + '%', round(r.get('排名') or 0, 1)))
print('  ---- 该桶合计: query=%d imps=%d clicks=%d' % (len(sel), sum((r.get('展示') or 0) for r in sel), sum((r.get('点击次数') or 0) for r in sel)))

print('\n' + '=' * 108)
print('【J】品牌词 vs 非品牌词 (combo_28d)')
print('=' * 108)
BR = ('智印港', 'zprintpro', 'ZprintPro', 'ジープリント', 'z-printpro')
def isbrand(q):
    q = q or ''
    return any(b.lower() in q.lower() for b in BR)
for label, sel in (('brand', [r for r in rows if isbrand(r.get('热门查询'))]), ('non-brand', [r for r in rows if not isbrand(r.get('热门查询'))])):
    i = sum((r.get('展示') or 0) for r in sel); c = sum((r.get('点击次数') or 0) for r in sel)
    pos = sum((r.get('排名') or 0) * (r.get('展示') or 0) for r in sel) / i if i else 0
    print('  %-10s #query=%-5d imps=%-7d clicks=%-5d CTR=%-7s pos=%.1f' % (label, len(sel), i, c, (str(round(c / i * 100, 2)) + '%' if i else '-'), pos))
    for r in sorted(sel, key=lambda r: -(r.get('展示') or 0))[:8]:
        print('      %-34s imps=%-5s clicks=%-4s CTR=%-7s pos=%.1f' % (str(r.get('热门查询'))[:34], r.get('展示'), r.get('点击次数'), str(round((r.get('点击率') or 0) * 100, 2)) + '%', r.get('排名') or 0))

print('\n' + '=' * 108)
print('【K】即日/急件 + 校园 + 書刊等带钱簇 (combo_28d 关键词匹配)')
print('=' * 108)
CLUSTERS = {
    '包裝盒/紙盒': ['包裝盒', '紙盒', '包裝盒訂製', '紙盒訂製', '盒'],
    '貼紙/標籤': ['貼紙', '標籤', 'sticker', 'label'],
    '宣傳單張/傳單': ['宣傳單張', '傳單', 'flyer'],
    '海報': ['海報', 'poster'],
    '書刊/冊子/騎馬釘': ['書刊', '冊子', '騎馬釘', '印書', 'book', 'catalog', 'booklet'],
    '月曆': ['月曆', '月歷', 'calendar'],
    '利是封/賀卡': ['利是封', '賀卡', 'card'],
    '紙袋': ['紙袋', 'paper bag'],
    '餐牌/菜單': ['餐牌', '菜單', 'menu'],
    '即日/急件': ['即日', '急件', 'same day', 'rush'],
    '校園/證書': ['校園', '證書', '練習', 'school', 'certificate'],
}
for name, kws in CLUSTERS.items():
    sel = [r for r in rows if any(k.lower() in str(r.get('热门查询') or '').lower() for k in kws)]
    if not sel:
        print('  %-18s (无)' % name)
        continue
    i = sum((r.get('展示') or 0) for r in sel); c = sum((r.get('点击次数') or 0) for r in sel)
    pos = sum((r.get('排名') or 0) * (r.get('展示') or 0) for r in sel) / i if i else 0
    best = min((r.get('排名') or 999) for r in sel)
    print('  %-18s #q=%-4d imps=%-6d clicks=%-4d CTR=%-7s pos=%-6.1f 最佳位=%.1f' % (name, len(sel), i, c, (str(round(c / i * 100, 2)) + '%' if i else '-'), pos, best))
