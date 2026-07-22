#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
yate98 工厂成本价 → ZprintPro price-tables JSON 生成器 (2026-07-23 K3)
输入: F:\\yate98报价截图\\*.docx + *.xlsx
输出: src/data/price-tables/*.json
定价规则 (user 拍板 2026-07-21/23):
  - Word 档 (yate98 工厂成本 RMB) ×1.3 → HKD 卖价锚 (与 intuan 专版规则一致, 待 user 最终确认)
  - xlsx (e-print 对标特殊尺寸折页 HKD) ×0.95 → 我们的 HKD 价
  - 每档保留 cost_rmb + weight_kg (运费引擎输入)
红线: 这些是报价台内部锚点数据, 不对客直接展示; 对客报价 = 本表 + 运费 +  margin 判断
"""
import json, re, io
from pathlib import Path
from docx import Document
import openpyxl

SRC = Path(r'F:\yate98报价截图')
OUT = Path(r'F:\zprintpro-nextjs\src\data\price-tables')
TODAY = '2026-07-23'
MARKUP = 1.5  # yate98 RMB cost → HKD sell anchor (user 2026-07-23 拍板: 含税毛利, 否决 1.3)

PAT = re.compile(
    r'^(?P<product>.+?)-(?P<material>[^-]+(?:\[[^\]]+\])?)-(?P<rest>.+?)-(?P<qty>\d+)张-1款总价(?P<price>[\d.]+)元-理论重量(?P<kg>[\d.]+)千')

def parse_docx(fname):
    rows = []
    doc = Document(str(SRC / fname))
    for p in doc.paragraphs:
        t = p.text.strip().rstrip('.')
        if not t or '总价' not in t:
            continue
        # fix truncated weight (e.g. "40.89千" ok; some truncated at "73.")
        m = re.search(r'(?P<qty>\d+)张-1款总价(?P<price>[\d.]+)元-理论重量(?P<kg>[\d.]+)千', t)
        if not m:
            m2 = re.search(r'(?P<qty>\d+)张-1款总价(?P<price>[\d.]+)元', t)
            if not m2:
                continue
            qty, price, kg = int(m2['qty']), float(m2['price']), None
        else:
            qty, price, kg = int(m['qty']), float(m['price']), float(m['kg'])
        head = t[:t.find(f'-{qty}张-')]
        rows.append({'config': head, 'qty': qty, 'cost_rmb': price, 'weight_kg': kg})
    # group by config
    groups = {}
    for r in rows:
        groups.setdefault(r['config'], []).append(
            {'qty': r['qty'], 'cost_rmb': r['cost_rmb'], 'sell_hkd': round(r['cost_rmb'] * MARKUP), 'weight_kg': r['weight_kg']})
    for g in groups.values():
        g.sort(key=lambda x: x['qty'])
    return groups

def emit(fname, sku, name_zh, name_en, name_ja, category, source, groups, note=''):
    doc = {
        'sku': sku, 'category': category,
        'name': {'zh-hk': name_zh, 'en': name_en, 'ja': name_ja},
        'currency_anchor': 'HKD',
        'markup_rule': f'cost_rmb × {MARKUP} → sell_hkd',
        'src': source, 'anchor': True, 'anchorType': 'factory-cost',
        'calibratedAt': TODAY, 'note': note,
        'configs': [{'config': k, 'tiers': v} for k, v in groups.items()],
    }
    (OUT / fname).write_text(json.dumps(doc, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'{fname}: {len(groups)} configs, {sum(len(v) for v in groups.values())} tiers')

# 1. 拼版白卡彩盒
emit('gang-run-card-boxes.json', 'gang-run-card-boxes', '拼版白卡彩盒', 'Gang-Run White Card Boxes', '合版白カードボックス',
     'packaging', 'yate98-factory-2026-07', parse_docx('拼版白卡彩盒对应价格.docx'),
     '香港市场空白品类; 固定刀模标准盒型; 交期承诺 7-10 天(凑版)')

# 2. 专版坑盒瓦楞盒
emit('corrugated-boxes-cost.json', 'corrugated-boxes', '瓦楞彩盒(专版)', 'Corrugated Boxes (Custom)', '段ボール箱(専版)',
     'packaging', 'yate98-factory-2026-07', parse_docx('专版坑盒瓦楞盒对应价格.docx'))

# 3. 专版数码贴纸
emit('digital-stickers-cost.json', 'digital-stickers', '数码贴纸(专版)', 'Digital Stickers (Custom)', 'デジタルステッカー(専版)',
     'stickers', 'yate98-factory-2026-07', parse_docx('专版数码贴纸对应价格.docx'))

# 4. 专版白卡手提袋
emit('white-card-bags-cost.json', 'white-card-bags', '白卡手提袋(专版)', 'White Card Bags (Custom)', '白カード手提げ袋(専版)',
     'paper-bags', 'yate98-factory-2026-07', parse_docx('专版白卡手提袋对应价格.docx'))

# 5. 专版宣传单张 (与已有 e-print anchor 的 flyers.json 并存, 作成本参考)
emit('flyers-cost-yate98.json', 'custom-flyers', '宣传单张(专版成本)', 'Custom Flyers (Factory Cost)', 'チラシ(専版コスト)',
     'flyers', 'yate98-factory-2026-07', parse_docx('专版宣传单张对应价格.docx'),
     '成本参考表; 对客价仍以 flyers.json (e-print anchor ×0.95) 为准, 两表差价=毛利空间')

# 6. xlsx: e-print 特殊尺寸折页 (已是 HKD) ×0.95
wb = openpyxl.load_workbook(SRC / '参考e-print价格确认可以95折做的港币价.xlsx', data_only=True)
ws = wb['打印']
qtys, cols = [], {}
for row in ws.iter_rows(min_row=1, values_only=True):
    if isinstance(row[0], (int, float)):
        q = int(row[0])
        qtys.append(q)
        for ci in range(20, 24):  # 右端 4 列 = 特殊折页价格
            v = row[ci] if ci < len(row) else None
            if isinstance(v, (int, float)):
                cols.setdefault(ci, {})[q] = v
fold_names = {
    20: '風琴摺 594x210→A5 3條骨 光粉紙157g 雙面',
    21: '風琴摺 210x444→A5 2條骨 光粉紙157g 雙面',
    22: '風琴摺 210x444→A5 2條骨 光粉紙128g 雙面',
    23: '風琴摺 210x444→A5 2條骨 書紙100g 雙面',
}
groups = {}
for ci, prices in cols.items():
    groups[fold_names.get(ci, f'col{ci}')] = [
        {'qty': q, 'eprint_hkd': p, 'sell_hkd': round(p * 0.95), 'weight_kg': None}
        for q, p in sorted(prices.items())]
doc = {
    'sku': 'special-fold-leaflets', 'category': 'flyers',
    'name': {'zh-hk': '特殊尺寸宣傳摺頁(風琴摺)', 'en': 'Special-Fold Leaflets (Accordion)', 'ja': '特殊折りチラシ'},
    'currency_anchor': 'HKD', 'markup_rule': 'eprint_hkd × 0.95 → sell_hkd',
    'src': 'e-print-benchmark-2026-07', 'anchor': True, 'anchorType': 'competitor-benchmark',
    'calibratedAt': TODAY,
    'note': 'e-print 特殊尺寸風琴摺公开价 ×0.95; 运费规则见 shipping-rules.json',
    'configs': [{'config': k, 'tiers': v} for k, v in groups.items()],
}
(OUT / 'special-fold-leaflets.json').write_text(json.dumps(doc, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'special-fold-leaflets.json: {len(groups)} configs')

# 7. 运费规则引擎配置
shipping = {
    'version': TODAY, 'currency': 'HKD',
    'fx': {'CNY_to_HKD': 1.09, 'note': '2026-07 参考汇率, 报价台可用 fx-rates.json 覆盖'},
    'rules': [
        {'id': 'sf-express', 'name_zh': '順豐快遞', 'condition': 'sf_fee <= 200',
         'note': '默认渠道; sf_fee 按顺丰收方价估算, 阈值 200 HKD'},
        {'id': 'logistics-fold', 'name_zh': '物流派送(特殊折页)', 'applies_to': ['special-fold-leaflets'],
         'condition': 'sf_fee > 200', 'fee_formula': '200',
         'note': 'e-print 对标折页: 固定 200 HKD 派送费 (人工核算已含, user 2026-07-23 确认)'},
        {'id': 'logistics-general', 'name_zh': '物流园+派送(yate98 品类)',
         'applies_to': ['gang-run-card-boxes', 'corrugated-boxes', 'digital-stickers', 'white-card-bags', 'custom-flyers'],
         'condition': 'sf_fee > 200',
         'fee_formula': '(0.7 * weight_kg + first_leg_rmb) * CNY_to_HKD + 200',
         'params': {'per_kg_rmb': 0.7, 'first_leg_rmb': 100, 'delivery_hkd': 200},
         'note': '0.7 RMB/kg 是香港物流园段成本(不含送货到物流点); first_leg_rmb=100 是深圳工厂→物流点头程估值, 待 user 确认实际值后修正'},
    ],
    'sf_rate_reference': {'first_kg': 30, 'per_kg_after': 8,
        'note': '估算用: 200 阈值 ≈ 22-25kg; 实际以顺丰当日报价为准, 报价台显示"运费另计/到付"兜底'},
}
(OUT / 'shipping-rules.json').write_text(json.dumps(shipping, ensure_ascii=False, indent=2), encoding='utf-8')
print('shipping-rules.json written')
