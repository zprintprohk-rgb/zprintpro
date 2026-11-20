#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GSC 决策数据 2026-09-10 — 今天 12 份 xlsx → K3 决策报告
口径: 总量用「图表」sheet (未采样真值); 查询/页面 sheet 为 GSC 采样子集 (已标注)
基线: gsc-fresh-2026-09-03.json stats (K3 9/3 派活包校准)
输出: .hermes/logs/2026-09-10-gsc-decision-data.md
"""
import openpyxl, os, json, re, sys, datetime
sys.stdout.reconfigure(encoding='utf-8')

DIR = r'F:\zprintpro-nextjs\GSC数据'
OUT = r'F:\zprintpro-nextjs\.hermes\logs\2026-09-10-gsc-decision-data.md'
BASELINE = os.path.join(DIR, 'gsc-fresh-2026-09-03.json')
MARKETS = {'香港': 'hk', '美国': 'en', '日本': 'ja'}

def clean_key(k):
    k = str(k)
    rules = [
        ('点击率', 'ctr'), ('点击次数', 'clicks'), ('热门查询', 'query'), ('搜索查询', 'query'),
        ('排名靠前的网页', 'page'), ('着陆页面', 'page'), ('国家/地区', 'country'),
        ('点击', 'clicks'), ('展示', 'imp'), ('排名', 'pos'), ('网页', 'page'), ('页面', 'page'),
        ('查询', 'query'), ('搜索类型', 'searchtype'), ('日期', 'date'), ('国家', 'country'),
        ('地区', 'country'), ('设备', 'device'), ('日期范围', 'range'), ('值', 'value'), ('指标', 'metric'),
    ]
    for src, dst in rules:
        if src in k: return dst
    return k

def load_xlsx(path):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    out = {}
    for sn in wb.sheetnames:
        ws = wb[sn]
        rows = list(ws.iter_rows(values_only=True))
        if not rows: continue
        header = [clean_key(h) for h in rows[0]]
        data = []
        for r in rows[1:]:
            if not any(c is not None for c in r): continue
            d = {}
            for i, h in enumerate(header):
                if i < len(r): d[h] = r[i]
            data.append(d)
        out[sn] = data
    wb.close()
    return out

def find_sheet(d, keys):
    for sn, rows in d.items():
        for k in keys:
            if k in sn: return rows
    return []

def date_totals(rows):
    """图表(日期)sheet 未采样真总量"""
    clicks = imp = 0
    for r in rows:
        c = r.get('clicks') or 0; im = r.get('imp') or 0
        clicks += int(c) if isinstance(c, (int, float)) else 0
        imp += int(im) if isinstance(im, (int, float)) else 0
    return clicks, imp

def page_type(url):
    u = str(url).strip().replace('https://zprintpro.com', '').replace('http://zprintpro.com', '')
    for pre in ('/zh-hk/', '/en/', '/ja/'):
        if u.startswith(pre):
            u = '/' + u[len(pre):]
            break
    if u in ('/', ''): return '首页'
    if u.startswith('/product/'): return '产品PDP'
    if u.startswith('/category/'): return '分类PLP'
    if u.startswith('/blog/'): return '博客'
    if u.startswith('/services/'): return '服务页'
    if u.startswith('/quote/'): return '报价页'
    if u.startswith('/contact'): return '联系页'
    if u.startswith('/faq'): return 'FAQ页'
    if u.startswith('/legal') or u.startswith('/privacy') or u.startswith('/terms'): return '法务页'
    return '其他'

def baseline_xlsx_totals(win, mkt):
    """9/3 基线 xlsx (真对真): 读对应 9/3 文件的图表 sheet"""
    win_zh = {'24h': '24小时', '7d': '7天', '28d': '28天'}[win]
    mkt_zh = {'hk': '香港', 'en': '美国', 'ja': '日本', 'all': '汇总'}[mkt]
    cands = []
    for fn in os.listdir(DIR):
        if not fn.endswith('2026-09-03.xlsx'): continue
        if win_zh not in fn: continue
        if mkt == 'all':
            if '汇总' in fn: cands.append(fn)
        else:
            if f'{mkt_zh}' in fn and '汇总' not in fn: cands.append(fn)
    for fn in cands:
        d = load_xlsx(os.path.join(DIR, fn))
        rows = find_sheet(d, ['图表', '图'])
        if rows:
            return date_totals(rows)
    return None

def main():
    today = {}
    for fn in os.listdir(DIR):
        if not fn.endswith('2026-09-10.xlsx'): continue
        win = '24h' if '24小时' in fn else ('7d' if '7天' in fn else ('28d' if '28天' in fn else None))
        if not win: continue
        mkt = 'all'
        for zh, en in MARKETS.items():
            if zh in fn: mkt = en; break
        today.setdefault(win, {})[mkt] = load_xlsx(os.path.join(DIR, fn))

    base = json.load(open(BASELINE, encoding='utf-8')) if os.path.exists(BASELINE) else None
    L = []
    L.append('# GSC 决策数据 · 2026-09-10（今日 12 份 xlsx）')
    L.append('')
    L.append('> 生成: ' + datetime.datetime.now().strftime('%Y-%m-%d %H:%M'))
    L.append('> 数据来源: `GSC数据/` 今日 12 份 xlsx (24小时/7天/28天 × 香港/美国/日本/三站点汇总, 18:31-18:36 下载) + `gsc-fresh-2026-09-03.json` (K3 9/3 派活包校准) + `git log 8/31-9/10` 改动对照')
    L.append('> 口径: 「总量」= 图表(日期)sheet 未采样真值; 「查询/页面」= GSC 采样子集 (28d 真值点击 349 vs 采样 48) — 决策看总量列')
    L.append('> ⚠️ **8/31 至今 SKU/Blog 大规模改动 → 任何环比必须先读「八、改动影响」**')
    L.append('')

    # ============ 一、一页速览 ============
    L.append('## 一、一页速览（28 天真总量，环比 9/3 基线）')
    L.append('')
    L.append('| 市场 | 点击 | 展示 | CTR | 平均排名 | 环比点击 | 环比展示 | 环比排名 |')
    L.append('|---|---|---|---|---|---|---|---|')
    for mkt in ['hk', 'en', 'ja', 'all']:
        c, im = date_totals(find_sheet(today['28d'][mkt], ['图表', '图']))
        ctr = c / im if im else 0
        pos = 0
        b = baseline_xlsx_totals('28d', mkt)
        if b:
            bcl, bim = b
        else:
            bcl = bim = None
        # pos 用查询 sheet 加权近似
        qrows = find_sheet(today['28d'][mkt], ['查询'])
        pa = pn = 0
        for r in qrows:
            p = r.get('pos'); im2 = r.get('imp') or 0
            if isinstance(p, (int, float)) and im2: pa += p * im2; pn += im2
        pos = round(pa / pn, 1) if pn else 0
        dcl = f"{c - bcl:+,}" if bcl is not None else '—'
        dimp = f"{im - bim:+,}" if bim is not None else '—'
        dpos = ''  # 基线 pos 用 JSON stats 加权 (同口径近似)
        if base and mkt in base['data']['28d']:
            bpos = (base['data']['28d'][mkt].get('stats') or {}).get('weighted_pos')
            if bpos: dpos = f"{pos - bpos:+.1f}"
        L.append(f"| {mkt} | {c:,} | {im:,} | {ctr*100:.2f}% | {pos} | {dcl} | {dimp} | {dpos} |")
    L.append('')
    L.append('> 环比口径: 今日与 9/3 均读各自 xlsx「图表」sheet 未采样真值 (真对真)；排名 Δ 为查询采样加权近似。窗口不同 (9/3: 8/7-9/3 vs 今日: 8/14-9/10) → Δ 含改版效应, 只读方向, 见「八」。')
    L.append('')

    # ============ 二、总体趋势 ============
    L.append('## 二、总体趋势（三站点汇总真总量）')
    L.append('')
    L.append('| 窗口 | 点击 | 展示 | CTR |')
    L.append('|---|---|---|---|')
    for win in ['24h', '7d', '28d']:
        c, im = date_totals(find_sheet(today[win]['all'], ['图表', '图']))
        L.append(f"| {win} | {c:,} | {im:,} | {(c/im*100 if im else 0):.2f}% |")
    L.append('')

    # ============ 三、分市场 Top 查询 ============
    L.append('## 三、Top 查询（28 天，采样；决策需回看总量列）')
    L.append('')
    for mkt in ['hk', 'en', 'ja']:
        qrows = find_sheet(today['28d'][mkt], ['查询'])
        out = []
        for r in qrows:
            q = str(r.get('query', '')).strip()
            if not q: continue
            c = int(r.get('clicks') or 0); im = int(r.get('imp') or 0)
            p = r.get('pos'); p = round(p, 1) if isinstance(p, (int, float)) else None
            out.append((q, c, im, (c / im if im else 0), p))
        out.sort(key=lambda x: -x[2])
        L.append(f"### {mkt} — Top 12（按展示）")
        L.append('')
        L.append('| 查询 | 点击 | 展示 | CTR | 排名 |')
        L.append('|---|---|---|---|---|')
        for q, c, im, ctr, p in out[:12]:
            L.append(f"| {q} | {c} | {im:,} | {ctr*100:.1f}% | {p} |")
        L.append('')

    # ============ 四、高潜词（排名 20-50 + 展示≥50）============
    L.append('## 四、高潜攻坚词（排名 20-50 且 28d 展示 ≥50；升排名即提 CTR）')
    L.append('')
    for mkt in ['hk', 'en', 'ja']:
        qrows = find_sheet(today['28d'][mkt], ['查询'])
        pot = []
        for r in qrows:
            q = str(r.get('query', '')).strip()
            if not q: continue
            im = int(r.get('imp') or 0); c = int(r.get('clicks') or 0)
            p = r.get('pos')
            if isinstance(p, (int, float)) and 20 <= p <= 50 and im >= 50:
                pot.append((q, c, im, (c / im if im else 0), round(p, 1)))
        pot.sort(key=lambda x: -x[2])
        if pot:
            L.append(f"### {mkt} — {len(pot)} 词")
            L.append('')
            L.append('| 查询 | 点击 | 展示 | CTR | 排名 |')
            L.append('|---|---|---|---|---|')
            for q, c, im, ctr, p in pot[:15]:
                L.append(f"| {q} | {c} | {im:,} | {ctr*100:.1f}% | {p} |")
            L.append('')
        else:
            L.append(f"### {mkt} — 无（展示≥50 且排名 20-50）")
            L.append('')

    # ============ 五、Top 页面 ============
    L.append('## 五、Top 页面（28 天采样）+ 类型 + 改版标记')
    L.append('')
    for mkt in ['hk', 'en', 'ja']:
        prows = find_sheet(today['28d'][mkt], ['网页', '页面'])
        if not prows:
            L.append(f"### {mkt} — 无页面数据")
            L.append('')
            continue
        out = []
        for r in prows:
            u = str(r.get('page', '')).strip()
            if not u: continue
            c = int(r.get('clicks') or 0); im = int(r.get('imp') or 0)
            p = r.get('pos'); p = round(p, 1) if isinstance(p, (int, float)) else None
            out.append((u, page_type(u), c, im, (c / im if im else 0), p))
        out.sort(key=lambda x: -x[3])
        L.append(f"### {mkt} — Top 10")
        L.append('')
        L.append('| 页面 | 类型 | 点击 | 展示 | CTR | 排名 |')
        L.append('|---|---|---|---|---|---|')
        for u, t, c, im, ctr, p in out[:10]:
            L.append(f"| {u} | {t} | {c} | {im:,} | {ctr*100:.1f}% | {p} |")
        L.append('')
        agg = {}
        for u, t, c, im, ctr, p in out:
            a = agg.setdefault(t, {'n': 0, 'clicks': 0, 'imp': 0})
            a['n'] += 1; a['clicks'] += c; a['imp'] += im
        L.append(f"### {mkt} — 类型汇总（采样 {len(out)} 页）")
        L.append('')
        L.append('| 类型 | 页面数 | 点击 | 展示 |')
        L.append('|---|---|---|---|')
        for t, a in sorted(agg.items(), key=lambda x: -x[1]['imp']):
            L.append(f"| {t} | {a['n']} | {a['clicks']:,} | {a['imp']:,} |")
        L.append('')

    # ============ 六、设备 / 国家 ============
    L.append('## 六、设备 / 国家（28 天汇总）')
    L.append('')
    d = find_sheet(today['28d']['all'], ['设备'])
    if d:
        L.append('### 设备')
        L.append('')
        L.append('| 设备 | 点击 | 展示 | CTR |')
        L.append('|---|---|---|---|')
        for r in d:
            dv = str(r.get('device', '')); c = int(r.get('clicks') or 0); im = int(r.get('imp') or 0)
            L.append(f"| {dv} | {c:,} | {im:,} | {(c/im*100 if im else 0):.2f}% |")
        L.append('')
    d = find_sheet(today['28d']['all'], ['国家'])
    if d:
        L.append('### 国家/地区 Top 8')
        L.append('')
        L.append('| 国家/地区 | 点击 | 展示 | CTR | 排名 |')
        L.append('|---|---|---|---|---|')
        for r in d[:8]:
            co = str(r.get('country', '')); c = int(r.get('clicks') or 0); im = int(r.get('imp') or 0)
            p = r.get('pos'); p = round(p, 1) if isinstance(p, (int, float)) else ''
            L.append(f"| {co} | {c:,} | {im:,} | {(c/im*100 if im else 0):.2f}% | {p} |")
        L.append('')

    # ============ 七、品牌词追踪 ============
    L.append('## 七、品牌词追踪（智印港 / ジープリント / ZprintPro）')
    L.append('')
    for mkt, brand_words in [('hk', ['智印港', '智印', '印港']), ('ja', ['ジープリント', 'zprintpro']), ('en', ['zprintpro'])]:
        qrows = find_sheet(today['28d'][mkt], ['查询'])
        hits = []
        for r in qrows:
            q = str(r.get('query', '')).strip().lower()
            if any(b in q for b in brand_words):
                c = int(r.get('clicks') or 0); im = int(r.get('imp') or 0)
                p = r.get('pos'); p = round(p, 1) if isinstance(p, (int, float)) else None
                hits.append((str(r.get('query')), c, im, (c / im if im else 0), p))
        if hits:
            L.append(f"### {mkt}")
            L.append('')
            L.append('| 查询 | 点击 | 展示 | CTR | 排名 |')
            L.append('|---|---|---|---|---|')
            for q, c, im, ctr, p in hits:
                L.append(f"| {q} | {c} | {im:,} | {ctr*100:.1f}% | {p} |")
            L.append('')
    L.append('> 智印港 CTR 目标: 基线 10% → 4 周 40%+（K3 §7 口径）；本窗口命中条数少 → 品牌认知仍弱, 需持续埋点。')
    L.append('')

    # ============ 八、8.31 至今改动影响 ============
    L.append('## 八、8/31 至今 SKU/Blog 大规模改动 → 数据解读影响（必读）')
    L.append('')
    L.append('**本次 28d 窗口(8/11-9/10)最后 ~10 天(9/1-9/10)恰逢站内大规模内容改版；7d 窗口(9/4-9/10)基本全是改版后；24h(9/10)为 v9.2 全量后。以下改动按 git log 8/31→9/10 提取：**')
    L.append('')
    L.append('### 8.1 Blog 层（改动最大, 直接改 SERP 展示 → CTR）')
    L.append('')
    L.append('| 时点 | commit | 改动 | 对数据影响 |')
    L.append('|---|---|---|---|')
    L.append('| 9/1 | be744435 | 全站 239 blog / 508 处硬数据撤除(数据诚信 sweep) | 含数字的 snippet 消失 → CTR/排名波动 |')
    L.append('| 9/3 | 5 Pillar×3 locale (6c2f4a94 等) | 包裝盒/防水貼紙/校園/燙金 Pillar 12,000+ 字重写 | URL 不变但 title/meta 变 → 28d CTR 混合值 |')
    L.append('| 9/1-9/5 | f2b325e2 等 | blog-deepfix: 菜單/食品包裝等 12 段深度升级 | 头号词页 title/结构变 → 展示/CTR 大动 |')
    L.append('| 9/5 | 1f6f85c5 | W5 香港印刷成本报告三语上线(新 blog) | 新 URL 无历史, 只给绝对量 |')
    L.append('| 9/8 | f8c194a0 | 食品包裝印刷指南 12 段深度升级 | 头号词页改版效应 |')
    L.append('| 9/9 | 819f3189 | 月曆印刷指南 12 段 + 姊妹篇 | 月曆季(9/15 死线)提前布局 |')
    L.append('')
    L.append('### 8.2 SKU 层（URL 未变, SERP 字段/页面内容变）')
    L.append('')
    L.append('| 时点 | commit | 改动 | 对数据影响 |')
    L.append('|---|---|---|---|')
    L.append('| 9/2 | 54c675c0 | 贺卡 6 SKU v26.0 (72 webp + 90 字符串替换) | 6 产品页展示内容大改 |')
    L.append('| 9/6 | 4bf2c124 | 6 贺卡 SKU 三语 SEO + 名片流量全量导流 stickers | 贺卡/stickers 页 title/meta 变 + 302 承接 |')
    L.append('| 9/9 | d5d1c240 | 标题规则 v4 + 50 SKU 补词批1(写满区 50-54) | **最后 1 天进窗口** → 影响 28d 甚微, 看下窗口 |')
    L.append('')
    L.append('### 8.3 PLP/PDP 改版（v9 模板, 9/9-9/10 上线）')
    L.append('')
    L.append('| 时点 | commit | 改动 | 对数据影响 |')
    L.append('|---|---|---|---|')
    L.append('| 9/5 | 31d0f3ce/c02efd8a | 7+5 category × 3 locale 转化区块 | 分类页页面结构大改 → CTR 混窗口 |')
    L.append('| 9/9 | aa5ff1f1 | v9.1 样板: 貼紙 PLP + 防水 PDP (zh-hk) | 2 页 v9 改版 |')
    L.append('| 9/10 | f24daac6/d2984a0e/7bf3913b/3c726ed8 | **v9.2: B1 zh-hk 16 品类 + B2 en + B3 ja + C1 zh-hk PDP 115 SKU** | 全站类目/产品页渲染大改, 上线当日数据全为改版后 |')
    L.append('')
    L.append('### 8.4 结论 → 数据解读三原则')
    L.append('')
    L.append('1. **28d 环比 = 改版混合值**（~1/3 窗口是改版后）——只读方向, 不读精确 Δ')
    L.append('2. **7d/24h 才是改版后真值**——下个 GSC 窗口(9/17)才有干净的改版后周环比')
    L.append('3. **新 URL(新 blog/新页)只给绝对量**；title 已变 URL 未变者按「改版效应」看待, 不判定内容好坏')
    L.append('')

    # ============ 九、决策建议 ============
    L.append('## 九、K3 决策建议（基于本数据, 待 K3 拍板）')
    L.append('')
    L.append('1. **高潜词攻坚（排名 20-50 + 展示≥50）**: 见「四」逐市场清单 → 建议列入下轮 title/内容优化队列, 目标先冲进前 20')
    L.append('2. **月曆季 9/15 死线**: ja `コミケ 印刷`(52) + hk `月曆印刷`(132, 19.3 位) 展示已起 → 确认 Pillar/目录/内链 9/15 前收尾')
    L.append('3. **包装盒主战场**: hk `食品包裝印刷`(145, pos 12.9) 排名优但 0 点击 → 检查 SERP 摘要/内容是否匹配意图; Pillar 升级已上线待观察')
    L.append('4. **en `small batch label printing`(78, pos 36.7) + `china catalog printing`(69, pos 17.2)**: 高展示低点击 → 与既有 small-batch 定位一致, 建议内容加深')
    L.append('5. **品牌词(七)**: 智印港/ジープリント/ZprintPro 命中仍稀 → 品牌认知弱, 维持埋点 + 目录建设, 下窗口看品牌词 CTR 是否向 10%→40% 目标靠')
    L.append('6. **改版验收**: 因 8/31-9/10 改动密集, 本次不做「增长/下滑」定性判定; 待 9/17 数据出后按「改动→URL 对照」做干净前后对比')
    L.append('')

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(L))
    print('WROTE', OUT, '| 行数', len(L))

if __name__ == '__main__':
    main()
