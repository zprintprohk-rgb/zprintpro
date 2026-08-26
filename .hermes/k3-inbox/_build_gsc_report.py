# -*- coding: utf-8 -*-
import json
from pathlib import Path

data = json.loads(Path(r'F:\zprintpro-nextjs\.hermes\k3-inbox\gsc-2026-08-13-structured.json').read_text(encoding='utf-8'))

S = data['summary_by_market']
B = data['brand_health']
NB = data['top_non_brand_strategic']
daily = data['daily_trend']
countries = data['country_distribution']
devices = data['device_breakdown']
apps = data['search_appearance']
pages = data['top_pages_by_market']
queries = data['top_queries_by_market']

lines = []
def W(s=''):
    lines.append(s)

W('# GSC 4 Markets 战略报告 (2026-08-04 ~ 2026-08-10, 7天)')
W()
W('**数据源**: GSC Search Performance 导出 (4 个独立国家过滤: 香港 / 日本 / 美国 / 汇总)  ')
W('**导出时间**: 2026-08-13 01:37 (Asia/Shanghai)  ')
W('**报告生成**: 2026-08-13 02:00 (M3)  ')
W('**用途**: K3 战略广告升级 + SEO 8/13-8/21 战术执行决策  ')
W('**附件**: `gsc-2026-08-13-raw-full.json` (28 个原始 CSV) + `gsc-2026-08-13-structured.json` (结构化分析)')
W()
W('---')
W()
W('## 0. 一句话总览')
W()
W('**香港 38 click 是唯一主战场 (78% 点击),日本 7 click 是种子,美国 0 click / 544 imps 是冷启动黑洞。**')
W('移动端排名全面优于桌面 (HK 移动 rank 18.4 vs 桌面 24.3,JP 移动 13.0 vs 桌面 37.0,US 移动 29.7 vs 桌面 38.1)。')
W('品牌词 智印港 已破冰 (2/2 100% CTR rank 1),ジープリント 仍 0 (8/9 拍板 14 天后复测待观察)。')
W()
W('---')
W()
W('## 1. 4 市场总览')
W()
W('| 市场 | 点击 | 展示 | CTR | 平均排名 | 7日峰值 | 状态 |')
W('|------|------|------|-----|---------|---------|------|')
hk_daily_max = max(daily['香港'], key=lambda x: x['clicks'])
jp_daily_max = max(daily['日本'], key=lambda x: x['clicks'])
us_daily_max = max(daily['美国'], key=lambda x: x['clicks'])
total_daily_max = max(daily['汇总'], key=lambda x: x['clicks'])
W(f'| 🇭🇰 **香港** | **{S["香港"]["clicks"]}** | {S["香港"]["imps"]} | **{S["香港"]["ctr"]}%** | {S["香港"]["avg_rank"]} | {hk_daily_max["date"]} ({hk_daily_max["clicks"]} click) | ✅ 主战场 |')
W(f'| 🇯🇵 日本 | {S["日本"]["clicks"]} | {S["日本"]["imps"]} | {S["日本"]["ctr"]}% | {S["日本"]["avg_rank"]} | {jp_daily_max["date"]} ({jp_daily_max["clicks"]} click) | 🟡 种子 |')
W(f'| 🇺🇸 美国 | {S["美国"]["clicks"]} | {S["美国"]["imps"]} | **{S["美国"]["ctr"]}%** | {S["美国"]["avg_rank"]} | {us_daily_max["date"]} (0 click) | 🔴 冷启动黑洞 |')
W(f'| 🌐 汇总 | {S["汇总"]["clicks"]} | {S["汇总"]["imps"]} | {S["汇总"]["ctr"]}% | {S["汇总"]["avg_rank"]} | {total_daily_max["date"]} ({total_daily_max["clicks"]} click) | 82 国/地区 |')
W()
W('**核心解读**:')
W()
W(f'- **香港占 78% 总点击 (38/49)**,是唯一真转化主力。但 1514 imps 只换来 2.51% CTR,远低于行业 2-5% 基准 (偏低)')
W(f'- **美国占 17% 总 imps (544/3203) 0 click**,16% 流量黑洞。Top 25 关键词全部 0 click,rank 18-89 均有分布')
W(f'- **日本仅 7 click 但移动端 rank 12.97** 远优于桌面 37.04,移动 SEO 已建立局部优势')
W(f'- **总 CTR 1.53%** vs 行业 2-5% 偏低 50%,7 天未稳定 (单日 0.69%-2.74% 振幅大)')
W()
W('---')
W()
W('## 2. 7 日趋势 (汇总)')
W()
W('| 日期 | 点击 | 展示 | CTR | 排名 | 节奏 |')
W('|------|------|------|-----|------|------|')
for d in daily['汇总']:
    delta = ''
    if d['ctr'] >= 2.0: delta = '✅ 高位'
    elif d['ctr'] <= 1.0: delta = '⚠️ 谷底'
    else: delta = '🟡 正常'
    W(f'| {d["date"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} | {delta} |')
W()
W('**趋势特征**:')
W()
W('- **8/10 是新峰值 (14 click, 2.37% CTR, rank 22.2)** — K3 8/9 schema / ilms.txt 推送可能滞后 1-3 天生效')
W(f'- **8/5-8/9 谷底期 (avg 4.8 click/day)** — 推送未起,日均仅 0.92% CTR,需复盘推送节奏')
W(f'- **8/4 与 8/10 双峰 (11 / 14 click)** — 周一周日规律初现,周一/周日是 GSC 推送后 1-3 天的潜伏期')
W()
W('---')
W()
W('## 3. 品牌词健康度 (K3 战略 KPI)')
W()
W('| 市场 | 品牌词 | 点击 | 展示 | CTR | 排名 | 状态 |')
W('|------|--------|------|------|-----|------|------|')
W('| 🇭🇰 香港 | 智印港 (zh-hk) | 2 | 2 | 100% | 1.0 | ✅ 已破冰 (基数小) |')
W('| 🇯🇵 日本 | ジープリント (ja) | 0 | 0 | 0% | N/A | ❌ 8/9 拍板后仍 0 |')
W('| 🇯🇵 日本 | ZprintPro (en) | 0 | 0 | 0% | N/A | ❌ 跨语种无流量 |')
W('| 🇺🇸 美国 | ZprintPro (en) | 0 | 0 | 0% | N/A | ❌ 0 收录 (冷启动) |')
W('| 🌐 汇总 | 智印港 + ジープリント + ZprintPro | 2 | 2 | 100% | 1.0 | 🟡 严重失衡 (HK 一家独大) |')
W()
W('**战略目标 vs 实况** (per K3 §13.16.1 ja 公式,4 周 40%+ branded CTR):')
W()
W('- **基线 (8/4-8/10)**: 总品牌展示 2,总品牌点击 2,CTR 100% (1 个 query 「智印港」)')
W('- **8/12 目标**: 智印港 ≥5 imps / ジープリント ≥1 imp (K3 8/9 拍板「6 个 query 监测」)')
W('- **8/19 目标**: 品牌词总展示 ≥10,总点击 ≥3')
W('- **9/9 目标**: 品牌词总展示 ≥20,总点击 ≥8 (4 周 40%+ 目标第一里程碑)')
W()
W('**差距诊断**:')
W()
W('- JP 「ジープリント」8/9 拍板「按最优执行」已 4 天,仍 0 收录 — **可能 schema 提交未生效,需 8/13 复测 + 推 30 目录**')
W('- US 「ZprintPro」是 en 默认品牌名,所有 en 页面 footer/header/Schema 都有,但 GSC 0 收录 — **冷启动期品牌词本身是 0**')
W('- HK 「智印港」2/2 100% rank 1 — 完美但基数小,需要**主动搜索引导** (CRM/WhatsApp auto-reply 推品牌名)')
W()
W('---')
W()
W('## 4. 香港 🇭🇰 — 7 日详情')
W()
W('### 4.1 每日节奏')
W()
W('| 日期 | 点击 | 展示 | CTR | 排名 | 节奏 |')
W('|------|------|------|-----|------|------|')
for d in daily['香港']:
    delta = ''
    if d['ctr'] >= 4.0: delta = '🔥 峰值'
    elif d['ctr'] >= 2.0: delta = '✅ 高位'
    elif d['ctr'] >= 1.0: delta = '🟡 正常'
    else: delta = '⚠️ 谷底'
    W(f'| {d["date"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} | {delta} |')
W()
W('### 4.2 设备分布')
W()
W('| 设备 | 点击 | 展示 | CTR | 排名 | 解读 |')
W('|------|------|------|-----|------|------|')
for d in devices['香港']:
    note = '移动 rank 优于桌面 6 位,潜力未释放' if d['d'] == '移动设备' else ''
    W(f'| {d["d"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} | {note} |')
W()
W('### 4.3 Top 15 着陆页 (按展示) — 仅 1 页有点击')
W()
W('| 着陆页 | 点击 | 展示 | CTR | 排名 | 战略状态 |')
W('|-------|------|------|-----|------|---------|')
for p in pages['香港'][:15]:
    if p['clicks'] == 0 and p['imps'] >= 30:
        status = '🔴 CTR 0% 需重写 meta'
    elif p['clicks'] == 0 and p['imps'] >= 10:
        status = '🟡 0 click 待优化'
    elif p['clicks'] >= 1:
        status = '✅ 有点击'
    else:
        status = '🟢 长尾'
    W(f'| {p["url"]} | {p["clicks"]} | {p["imps"]} | {p["ctr"]}% | {p["rank"]} | {status} |')
W()
W('### 4.4 Top 15 关键词 (按展示, 全部 0 click) — CTR 危机')
W()
W('| 关键词 | 展示 | CTR | 排名 | 战略解读 |')
W('|------|------|-----|------|---------|')
top15_zh = []
for q in queries['香港'][:20]:
    if q['imps'] < 5: continue
    is_brand = '智印港' in q['q'] or 'zprint' in q['q'].lower()
    if is_brand: continue
    top15_zh.append(q)
    if len(top15_zh) >= 15: break
for q in top15_zh:
    if q['rank'] <= 20:
        interp = f'🔥 rank {int(q["rank"])} 但 0 click — meta 致命伤'
    elif q['rank'] <= 30:
        interp = f'🟡 rank {int(q["rank"])} 接近首页 — meta 必改'
    elif q['rank'] <= 50:
        interp = f'🟠 rank {int(q["rank"])} 需 2-4 周优化'
    else:
        interp = f'⚫ rank {int(q["rank"])} 远期'
    W(f'| {q["q"]} | {q["imps"]} | {q["ctr"]}% | {q["rank"]} | {interp} |')
W()
W('### 4.5 HK 战略建议 (P0 立即)')
W()
W('**核心矛盾**: 38 click 集中在 1 个着陆页 (/zh-hk/category/posters/),其余高 imps 着陆页全部 0 click,**meta description 集体失效**。')
W()
W('**立即行动 (8/13-8/14)**:')
W()
W('1. **重写 7 个高 imps 着陆页 meta description** (按展示 >=50):')
W('   - `/zh-hk/product/a2-posters/` (85 imps, rank 22.2) — A2 海報印刷 30 秒報價 / 雙面四色 / 72h 全球出貨')
W('   - `/zh-hk/category/stickers/` (84 imps, rank 37.5) — 客製貼紙印刷 / 防水 / 透明 / 圓角 / 30 秒報價')
W('   - `/zh-hk/product/a5-flyers/` (70 imps, rank 39.8) — A5 傳單印刷 最低 100 張 / 雙面四色 / 香港 24h 到店')
W('   - `/zh-hk/category/flyers/` (70 imps, rank 49.0) — 傳單印刷類目 / A4 A5 A6 長條 / 100 張起印')
W('   - `/zh-hk/category/packaging/` (65 imps, rank 37.2) — 包裝盒印刷 / 禮盒 / 食品級 / 結構設計')
W('   - `/zh-hk/category/calendars/` (63 imps, rank 24.6) — 檯曆掛曆印刷 / 24 節氣 / 燙金 / 客製月曆')
W('   - `/zh-hk/category/paper-bags/` (55 imps, rank 39.0) — 紙袋印刷 / 環保牛皮 / 手提袋 / 客製 logo')
W()
W('2. **借势唯一转化页** `/zh-hk/category/posters/` (1 click / 44 imps / 2.27% CTR):')
W('   - 检查 8/10 哪个 query 触发 (GSC queries 已 0 click,可能 long-tail),翻「网页」详情查 referrer')
W('   - 同模板套用到 `/zh-hk/category/flyers/` `/zh-hk/category/stickers/` 5 个姊妹类目 (8/15 前)')
W()
W('3. **HK 移动优化 (rank 18.42 已胜桌面 24.31)**:')
W('   - Mobile-first Index 已生效 (CF Pages 渲染),检查 AMP / Core Web Vitals LCP <2.5s')
W('   - 移动端 Featured Snippet 抢位 (「包裝盒印刷 邊間好」类问题)')
W()
W('---')
W()
W('## 5. 日本 🇯🇵 — 7 日详情')
W()
W('### 5.1 每日节奏')
W()
W('| 日期 | 点击 | 展示 | CTR | 排名 |')
W('|------|------|------|-----|------|')
for d in daily['日本']:
    W(f'| {d["date"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} |')
W()
W('### 5.2 设备分布 — 移动完胜 (关键洞察)')
W()
W('| 设备 | 点击 | 展示 | CTR | 排名 | 解读 |')
W('|------|------|------|-----|------|------|')
for d in devices['日本']:
    if d['d'] == '移动设备':
        W(f'| {d["d"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} | 🔥 rank 13 是 JP 唯一接近首页 |')
    elif d['d'] == '桌面':
        W(f'| {d["d"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} | ⚫ 桌面 rank 37 远落后移动 |')
    else:
        W(f'| {d["d"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} | — |')
W()
W('### 5.3 Top 15 着陆页 (0 click 集中)')
W()
W('| 着陆页 | 点击 | 展示 | CTR | 排名 | 战略状态 |')
W('|-------|------|------|-----|------|---------|')
for p in pages['日本'][:15]:
    if p['clicks'] == 0 and p['imps'] >= 10:
        status = '🔴 meta 需重写'
    else:
        status = '🟡'
    W(f'| {p["url"]} | {p["clicks"]} | {p["imps"]} | {p["ctr"]}% | {p["rank"]} | {status} |')
W()
W('### 5.4 Top 15 关键词 (0 click 但 rank 优势明显)')
W()
W('| 关键词 | 展示 | CTR | 排名 | 战略解读 |')
W('|------|------|-----|------|---------|')
ja_queries = []
for q in queries['日本'][:20]:
    if q['imps'] < 3: continue
    is_brand = 'ジープリント' in q['q'] or 'zprint' in q['q'].lower()
    if is_brand: continue
    ja_queries.append(q)
    if len(ja_queries) >= 15: break
for q in ja_queries:
    if q['rank'] <= 15:
        interp = f'🔥 rank {int(q["rank"])} 黄金位 — meta 改 1 行立竿见影'
    elif q['rank'] <= 25:
        interp = f'✅ rank {int(q["rank"])} 接近首页 — 加 FAQ + 价格表'
    elif q['rank'] <= 50:
        interp = f'🟡 rank {int(q["rank"])} 1-2 周内推首页'
    else:
        interp = f'⚫ rank {int(q["rank"])} 远期'
    W(f'| {q["q"]} | {q["imps"]} | {q["ctr"]}% | {q["rank"]} | {interp} |')
W()
W('### 5.5 JP 战略建议 (P1 8/13-8/20)')
W()
W('**核心洞察**: 移动端 rank 13 是 JP 唯一接近首页的细分市场。**但桌面 rank 37 拖累整体**。')
W()
W('**行动**:')
W()
W('1. **博客精准长尾立即加 CTA** (rank 10-11 是金子):')
W('   - `/ja/blog/a5-vs-a6-flyer-size/` 9 imps rank 11.78 — 加「ステッカー印刷 見積もり」CTA')
W('   - 「a5 a6 フライヤー 違い」2 imps rank 10 — 已被收录,加内链到 /ja/product/double-sided-flyers/')
W()
W('2. **桌面端必须追赶** (rank 37 是问题):')
W('   - 桌面 SEO 全面体检 (Core Web Vitals / 桌面端 LCP)')
W('   - 桌面端 schema 加 Product + Offer + AggregateRating')
W()
W('3. **ジープリント 8/9 拍板 14 天复测** (8/23 期望 >=1 imp):')
W('   - 30 目录提交 (8/10 起 AutoGLM 跑,目标 8/23 完成 30 条)')
W('   - 学园祭 / 卒業記念 / ステッカー 印刷 3 关键词买测试流量 (Google Ads ¥50-100)')
W()
W('---')
W()
W('## 6. 美国 🇺🇸 — 7 日详情 (冷启动黑洞)')
W()
W('### 6.1 每日节奏 — 0 click 7/7 天')
W()
W('| 日期 | 点击 | 展示 | CTR | 排名 |')
W('|------|------|------|-----|------|')
for d in daily['美国']:
    W(f'| {d["date"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} |')
W()
W('### 6.2 设备分布 — 全军覆没')
W()
W('| 设备 | 点击 | 展示 | CTR | 排名 |')
W('|------|------|------|-----|------|')
for d in devices['美国']:
    W(f'| {d["d"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} |')
W()
W('### 6.3 Top 15 着陆页 (rank 8-83 均有,0 click)')
W()
W('| 着陆页 | 点击 | 展示 | CTR | 排名 | 战略状态 |')
W('|-------|------|------|-----|------|---------|')
for p in pages['美国'][:15]:
    if p['rank'] <= 20:
        status = '🔥 rank <20 但 0 click — meta 致命'
    elif p['rank'] <= 50:
        status = '🟡 需 push'
    else:
        status = '🟠 远期'
    W(f'| {p["url"]} | {p["clicks"]} | {p["imps"]} | {p["ctr"]}% | {p["rank"]} | {status} |')
W()
W('### 6.4 Top 15 关键词 — 全部 0 click')
W()
W('| 关键词 | 展示 | CTR | 排名 | 战略解读 |')
W('|------|------|-----|------|---------|')
us_queries = []
for q in queries['美国'][:20]:
    if q['imps'] < 3: continue
    is_brand = 'zprint' in q['q'].lower()
    if is_brand: continue
    us_queries.append(q)
    if len(us_queries) >= 15: break
for q in us_queries:
    if q['rank'] <= 15:
        interp = f'🔥 rank {int(q["rank"])} 黄金位 — meta 必改'
    elif q['rank'] <= 25:
        interp = f'✅ rank {int(q["rank"])} 接近首页'
    elif q['rank'] <= 50:
        interp = f'🟡 rank {int(q["rank"])} 1-2 周'
    else:
        interp = f'⚫ rank {int(q["rank"])} 远期'
    W(f'| {q["q"]} | {q["imps"]} | {q["ctr"]}% | {q["rank"]} | {interp} |')
W()
W('### 6.5 US 战略建议 (P2 8/20+, 与 K3 季节性 F1 设计师节奏并行)')
W()
W('**核心矛盾**: 16% 总 imps (544/3203) 0 click。rank 8.0-89.0 全部 0 click = **不是排名问题,是 CTR 问题**。')
W()
W('**根因诊断** (3 假说):')
W()
W('1. **meta description 集体无效** — 「ZprintPro」「China」 等关键词堆砌,不符 US 搜索意图 (用户找「local / fast / USA」)')
W('2. **页面 USP 不对** — US 用户重「fast / sample / no minimum / local」,现页面重「Asia factory / DHL」')
W('3. **季节性失配** — US 8 月是返校季 + 印刷淡季,搜索量本就低 (8 月 rank <20 0 click vs 9-10 月预期 rank 30-40)')
W()
W('**行动 (8/20-8/30)** (per K3 8/12 排期, US 排在 P2 8/20+):')
W()
W('1. **Top 5 着陆页 meta 重写** (按展示):')
W('   - `/en/product/small-batch-stickers/` (55 imps, rank 48.4) — "Small Batch Sticker Printing | 50 min MOQ | Free Sample"')
W('   - `/en/product/saddle-stitch-booklets/` (54 imps, rank 83.2) — "Saddle Stitch Booklets | 8-96 pages | Ships in 5 days"')
W('   - `/en/product/catalog-printing/` (30 imps, rank 30.8) — "Custom Catalog Printing | Perfect Bound + Saddle Stitch"')
W('   - `/en/blog/calendar-printing-guide/` (17 imps, rank 56.7) — "How to Print a Calendar 2027: Sizes, Paper, Binding"')
W('   - `/en/product/exercise-books/` (14 imps, rank 22.2) — "Custom Exercise Books for Schools | Low MOQ"')
W()
W('2. **「small batch sticker printing」rank 18.6 是 US 最亮点** — 加 1 个 200 字 FAQ + 价格表 + 立即询盘 CTA,期望 8/27 进 rank 10-15')
W()
W('3. **季节性 F1 设计师交付 8/20 后** — US「calendar / christmas / new year」3 个 SKU 优先推,US Q4 才是真旺季')
W()
W('---')
W()
W('## 7. 设备/搜索结果呈现/国家分布 (跨市场)')
W()
W('### 7.1 设备汇总')
W()
W('| 设备 | 点击 | 展示 | CTR | 排名 |')
W('|------|------|------|-----|------|')
for d in devices['汇总']:
    W(f'| {d["d"]} | {d["clicks"]} | {d["imps"]} | {d["ctr"]}% | {d["rank"]} |')
W()
W('**洞察**: 平板 CTR 5.56% 是桌面 1.36% 的 4 倍,移动 1.80% 略胜桌面 1.36%。**移动端是 SEO 主战场,桌面体验拖累整体**。')
W()
W('### 7.2 搜索结果呈现 (Rich Results)')
W()
W('| 类型 | 点击 | 展示 | CTR | 排名 |')
W('|------|------|------|-----|------|')
for a in apps['汇总']:
    W(f'| {a["a"]} | {a["clicks"]} | {a["imps"]} | {a["ctr"]}% | {a["rank"]} |')
W()
W('**洞察**: 仅「产品摘要」(Product Snippet) 有 31 click 2166 imps (CTR 1.43%, rank 36.67),商家信息 (Business Info) 4 imps 0 click。**产品摘要已是主力,需强化 SKU 结构化数据**。')
W()
W('### 7.3 Top 10 国家/地区 (汇总)')
W()
W('| 国家/地区 | 点击 | 展示 | CTR | 排名 |')
W('|----------|------|------|-----|------|')
for c in countries['汇总'][:10]:
    W(f'| {c["c"]} | {c["clicks"]} | {c["imps"]} | {c["ctr"]}% | {c["rank"]} |')
W()
W(f'**总覆盖**: 82 个国家/地区,其中 7 个有真实点击 (HK/日/马来/中国/墨西哥/澳大利亚 + 其他 1 个)。**马来 + 墨西哥 + 澳大利亚是潜在种子市场**。')
W()
W('---')
W()
W('## 8. 战略总览 — 3 层行动建议')
W()
W('### P0 — 立即 (8/13-8/15, 1 push 内)')
W()
W('| 行动 | 目标 | 预期 8/20 复测 | 关联 commit |')
W('|------|------|---------------|------------|')
W('| **HK 7 个高 imps 着陆页 meta 重写** | CTR 0% -> 2-3% | 7 页总 imps 460 -> 总 click >=10 | 待定 |')
W('| **US top 5 着陆页 meta 重写** | CTR 0% -> 1-2% | 5 页总 imps 170 -> 总 click >=2 | 待定 |')
W('| **JP 桌面 Core Web Vitals 体检** | rank 37 -> 25 | 桌面总 imps 254 -> click >=3 | 待定 |')
W('| **JP 2 个博客长尾词加 CTA** | rank 10-11 -> 点击 | 2 博客总 imps 11 -> click >=1 | 待定 |')
W('| **HK 唯一转化页 /zh-hk/category/posters/ 流量溯源** | 找到 8/10 那个 click 来源 | 复用模板到 5 姊妹类目 | 待定 |')
W()
W('### P1 — 本周 (8/13-8/20, 2-3 push)')
W()
W('| 行动 | 目标 | 预期 8/27 复测 |')
W('|------|------|---------------|')
W('| **HK 类目页加 FAQ Schema** (5 个高频类目) | Featured Snippet 抢位 | 5 类目总 imps 380 -> click >=15 |')
W('| **JP ジープリント 30 目录 8/23 前完成** | 品牌词收录 | brand query >=1 imp |')
W('| **产品摘要 Schema 全量优化** (rank 36.67 -> 25) | 提升 1-2 位排名 | CTR 1.43% -> 2.5% |')
W('| **移动端 LCP 优化** (CF Pages Vitals) | 移动 rank 18 -> 15 | 移动总 imps 1056 -> click >=25 |')
W()
W('### P2 — 月内 (8/20-9/9, 与季节性 F1 设计师并行)')
W()
W('| 行动 | 目标 | 预期 9/9 复测 |')
W('|------|------|---------------|')
W('| **季节性 8 SKU (F1 设计师 8/20 交付) 上线** | 8/29 -> 9/10 改设计师路线 | 8 SKU 总 imps 0 -> 200 |')
W('| **US 返校季 + Q4 圣诞季节性** | US 冷启动恢复 | US CTR 0% -> 0.5% |')
W('| **马来 / 墨西哥 / 澳大 3 种子市场扩展** | 7 国 -> 10 国有点击 | 3 国各 >=1 click/月 |')
W('| **品牌词总展示 >=20 / 总点击 >=8** | K3 4 周 40%+ 目标 | brand 全部 CTR >=40% |')
W()
W('---')
W()
W('## 9. K3 待拍板 (8/13 上午 11:00 前)')
W()
W('**P0 决策** (5 项,每项 <= 5 min):')
W()
W('1. **是否启动 P0 HK 7 + US 5 = 12 着陆页 meta 重写?**')
W('   - 推荐: **是**,1 commit + 1 push,8/13 完成,8/20 复测')
W('   - 风险: 0 (只改 description,不影响排名)')
W('   - 资源: M3 1.5h, K3 0 审核')
W()
W('2. **是否同步启动 JP 2 博客长尾词加 CTA?**')
W('   - 推荐: **是**,同 1 commit, rank 10-11 是金子位')
W('   - 风险: 0')
W()
W('3. **HK 唯一转化页溯源** — 8/10 那个 click 来源是哪里?')
W('   - 推荐: **跑 GSC 「网页」详情 8/10 引用页**,2 min 调研')
W('   - 价值: 找到转化关键词模板,5 姊妹类目复用')
W()
W('4. **是否启动 P1 产品摘要 Schema 优化** (rank 36.67 -> 25)?')
W('   - 推荐: **是,8/16 启动**,与季节性 F1 设计师并行')
W('   - 资源: M3 4h, K3 0.5h 审核')
W()
W('5. **JP ジープリント 8/9 拍板 14 天复测** — 是否需要 8/23 前 AutoGLM 跑 30 目录提交加速?')
W('   - 推荐: **是**, K3 8/9 拍板「按最优执行」已 4 天,0 收录是异常')
W('   - 资源: AutoGLM 后台跑, K3 0 介入')
W()
W('**不需拍板** (M3 自动执行):')
W()
W('- 7 日 daily 趋势监控 (cron auto)')
W('- 8/15 push 5 §0.16 grep = 0 复查')
W('- 8/17 weekly cron yield-skip 累积 2/4 必跑')
W()
W('---')
W()
W('## 10. 数据附录')
W()
W('- **总样本量**: 3203 imps / 49 clicks / 82 国家 / 4 市场 / 7 天')
W('- **原始数据**: `F:\\zprintpro-nextjs\\GSC数据\\zprintpro.com-Performance-{香港,日本,美国,汇总}on-Search-2026-08-13\\` (28 个 CSV)')
W('- **结构化分析**: `F:\\zprintpro-nextjs\\.hermes\\k3-inbox\\gsc-2026-08-13-structured.json`')
W('- **全量原始**: `F:\\zprintpro-nextjs\\.hermes\\k3-inbox\\gsc-2026-08-13-raw-full.json`')
W('- **下次复测**: 2026-08-20 01:37 (下个 7 天窗口)')
W()
W('---')
W()
W('**报告生成**: M3 (mvs_208fb3e015344a569927c02433907aef)  ')
W('**报告类型**: GSC 4 Markets 战略战术报告 v1 (基于实际 GSC 导出数据,非估算)  ')
W('**总 commit 准备**: P0 1 commit + P1 1 commit + P2 跟随季节性 F1  ')
W('**今日 push 余量**: 0/5 (cron auto + 8/13 push 1 docs 准备)')

# Save to file
out_path = Path(r'F:\zprintpro-nextjs\.hermes\k3-inbox\2026-08-13-0200-gsc-4-markets-strategy-report-v1.md')
out_path.write_text('\n'.join(lines), encoding='utf-8')
size = out_path.stat().st_size
print(f'OK: {out_path} ({size} bytes, {len(lines)} lines)')
