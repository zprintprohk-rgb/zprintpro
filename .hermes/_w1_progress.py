# -*- coding: utf-8 -*-
# 更新 B1c 进度总账: 簇2/簇3 实况 + W1 CTR 批记录
import io, json
F = r'F:\zprintpro-nextjs\.hermes\logs\b1c-queue-progress.json'
d = json.load(io.open(F, encoding='utf-8'))
d['updated_at'] = '2026-10-15T01:55:00+08:00'
d['updated_by'] = 'manual session (deepseek hermes, W1 CTR batch night)'
cls = d['clusters']
# 簇2: 完成度修正
for c in cls:
    if c['cluster'] == 'red-packets-family':
        c['status'] = 'IN_PROGRESS'
        c['pages_done'] = ['embossed-red-packets (lane 10-13)', 'foil-red-packets (manual 10-14)', 'custom-red-packets (manual 10-14)', 'red-packets hub category block (manual 10-14)']
        c['pages_pending'] = ['cartoon-red-packets', 'eco-red-packets', 'large-red-packets']
        c['note'] = '车道 10-13 完成 embossed; 人手 10-14 完成 hub 类目块整换 + foil/custom 双 PDP (commit ea8ed3c1, 探针 9/9)。余 3 SKU 长尾。'
cls.append({
    'order': 3,
    'cluster': 'flyers-posters-leaflet (千问 B1c 簇3 指令)',
    'slugs': ['category:flyers', 'category:posters', 'folded-leaflets'],
    'status': 'DONE',
    'claimed_by': 'manual session (deepseek hermes)',
    'claimed_at': '2026-10-14T00:10:00+08:00',
    'completed_at': '2026-10-14T12:25:00+08:00',
    'ssot': 'docs/2026-10-14-b1c-cluster3-flyers-posters-leaflets.md',
    'verdict': {
        'scope': 'flyers/posters 类目块整换 ×3语 + folded-leaflets PDP body×3 + faqSchema×4 + title/desc/h1/keywords 3槽',
        'similarity': 'worst 0.418 (ja) < 0.55 红线, 5-gram max 0.030',
        'guards': 'tsc 54=54 / title-v5 3槽 hard=0 / brand A0 / gsc-leak 0 / audit-sku-locale 0 / landmine 83×4×3 0 不一致',
        'bonus_fix': 'folded-leaflets imageAlt 三层嵌套历史伤 + MOQ100 假 alt 修复; eco-flyers 同款 (962e28e9)',
        'evidence': 'commit 54eee706, probes 9/9'
    },
    'note': '千问3.8max B1c 簇3 指令直接委派; 派发场景 vs 展示环境 vs 摺疊結構三分工'
})
cls.append({
    'order': 4,
    'cluster': 'w1-ctr-batch (战略 W1.2 四词承接页)',
    'slugs': ['category:paper-bags', 'category:menus', 'category:packaging'],
    'status': 'DONE',
    'claimed_by': 'manual session (deepseek hermes)',
    'claimed_at': '2026-10-15T01:40:00+08:00',
    'completed_at': '2026-10-15T01:55:00+08:00',
    'ssot': 'docs/2026-10-15-w1-ctr-batch-paper-bags-menus-packaging.md',
    'verdict': {
        'root_cause': '0点击根因重定位: 非钩子缺失而是 title 超长截断 (paper-bags 78/124/108 当量, 价格钩+品牌被截掉) + menus/packaging 价格假值 (HK$0.22/$0.14/¥20/$0.85 无 SKU 支撑)',
        'slots': '8 titles 全进 50-57 当量带 (52-57) + 8 descs 真值化+截断合规 (138-163 字符)',
        'guards': 'tsc 54=54 / brand A0 / 编造 lint 0',
        'evidence': '.hermes/_w1_ctr_final_equiv2.mjs 文件级回读 9/9 BAND-OK'
    },
    'note': '战略 §3 W1.2 CTR 歼灭批; 验证窗 7-10 天后用 GSC 28d 档对账 CTR'
})
io.open(F, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
print('progress json updated, clusters:', len(cls))
