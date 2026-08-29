#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
zprintpro 关键词价值分层工具 (V1.1 落地, K3 8/29 12:37 拍板)
================================================================
基于 GSC 查询维度数据, 按 §2.4 价值分层规则将 463 词分为:
- T1 企业复购耗材词 (主营 5 头词簇 × 采购动词)
- T2 通用 B2B 采购词 (月曆/catalog/餐牌 等明确采购意图)
- T2 品类词 (防水貼紙/透明貼紙 等品类泛词, 买意中等)
- T2 SMB 事件型 (易拉架/橫額/banner 印刷, SMB 活动一次性)
- T3 个人一次性 (喜帖/doujinshi/應援, 个人买家小订单)
- T3 事件泛词 (海報/poster 泛搜, 无采购动词)
- T4 泛词信息型 (尺寸/模板/教學/免費 类, 不带钱)
- T4 其他泛词 (珠光紙/大信封/a5 a6/alipay flash collect 等)
- BRAND (智印港)

输出:
1. 控制台打印分层汇总 (词数/展示/点击/CTR/A1/striking)
2. 采购词 (T1+T2) 单独列表 + CTR 排序
3. G1 捡钱清单 (A1 采购词 CTR=0 修复) 自动识别
4. JSON 输出到 docs/keyword-value-layer-{date}.json

KPI 口径升级 (V1.1 起全站报告改用):
- ❌ 旧: 首页词数 / 全站 CTR (被泛词稀释失真)
- ✅ 新: 采购词首页数 / T1 词首页数 / 采购词 CTR / 询盘词贡献
================================================================
"""
import csv
import json
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GSC_CSV = ROOT / "gsc_data.csv"
OUTPUT_DIR = ROOT / "docs"


# === §2.4 分层规则 (K3 12:37 拍板) ===
# 采购动词 (强烈带钱信号)
PROCUREMENT_VERBS = {
    'zh': ['印刷', '訂製', '訂做', '定製', '定做', '製作', '製作公司', '製作服務', '批發', '工廠', '製造商', '供應商'],
    'en': ['printing', 'custom', 'wholesale', 'bulk', 'manufacturer', 'supplier', 'factory', 'made', 'order', 'print'],
    'ja': ['印刷', '製作', 'オーダーメイド', '卸売', '工場', '製造'],
}

# T1 企业复购耗材 (主营 5 头词簇 + 采购动词) = 真带钱主力
T1_PATTERNS = [
    r'貼紙.*?(印刷|訂製|訂做|定製|custom|printing)',
    r'標籤.*?(印刷|訂製|訂做|定製|custom|printing)',
    r'(食品|產品|商品|貨物).*?包裝.*?(印刷|訂製|訂做|定製)',
    r'包裝盒.*?(印刷|訂製|訂做|定製|custom|printing)',
    r'紙袋.*?(印刷|訂製|訂做|定製|custom|printing)',
    r'(sticker|label|box|packaging).*?(printing|custom|wholesale|bulk|manufacturer)',
    r'(食品包裝|small batch|food packaging|cosmetic box)',
]

# T2 通用 B2B 采购 (明确采购意图)
T2_GENERAL_PATTERNS = [
    r'月曆.*?印刷', r'月曆.*?訂製', r'catalog.*?printing', r'catalogue.*?printing',
    r'china.*?(printing|catalog)', r'餐牌.*?印刷', r'利是封.*?印刷', r'騎馬釘.*?印刷',
    r'即日.*?印刷', r'小冊子.*?印刷', r'摺頁.*?印刷', r'印書',
]

# T2 品类词 (品类泛词, 买意中等, 含主要品类但不带采购动词)
T2_CATEGORY_PATTERNS = [
    r'防水貼紙', r'透明貼紙', r'戶外貼紙', r'環保.*?貼紙',
    r'waterproof.*?sticker', r'transparent.*?sticker', r'vinyl.*?sticker',
    r'防水.*?ステッカー', r'透明.*?ステッカー',
]

# T2 SMB 事件型 (易拉架/橫額/banner, SMB 活动一次性)
T2_SMB_PATTERNS = [
    r'易拉架', r'橫額', r'噴繪', r'banner.*?print', r'x banner', r'roll up',
    r'バナー', r'バナースタンド',
]

# T3 个人一次性 (喜帖/doujinshi/應援, 个人买家小订单)
T3_PERSONAL_PATTERNS = [
    r'喜帖', r'同人.*?印刷', r'同人誌', r'應援', r'wedding invitation', r'doujinshi',
    r'結婚式.*?印刷', r'同人.*?ステッカー',
]

# T3 事件泛词 (海報/poster 泛搜, 无采购动词)
T3_GENERIC_EVENT = [
    r'^海報$', r'^海報印刷$', r'^印海報$', r'^poster$', r'^poster.*?print$',
    r'海報', r'印海報一張',  # 也属于泛搜
]

# T4 泛词信息型 (尺寸/模板/教學/免費 类, 不带钱)
T4_INFO_PATTERNS = [
    r'尺寸', r'大小', r'模板', r'教學', r'免費', r'下載', r'材質', r'材質比較',
    r'size', r'template', r'tutorial', r'free', r'download', r'material comparison',
    r'材質', r'仕様', r'サイズ', r'テンプレート',
]

# T4 其他泛词 (珠光紙/大信封/a5 a6/alipay flash collect)
T4_OTHER_KEYWORDS = [
    '珠光紙', '大信封', 'a5 a6 尺寸', 'a5 a6', '易拉寶', '邊度有紙袋買',
    'can badge size', 'bound exercise book', 'alipay', 'flash collect', 'alipay flash',
]


def detect_language(query: str) -> str:
    """检测查询语言: zh / en / ja"""
    # 中文 (含繁体)
    if re.search(r'[\u4e00-\u9fff]', query):
        return 'zh'
    # 日文 (含平假名/片假名)
    if re.search(r'[\u3040-\u309f\u30a0-\u30ff]', query):
        return 'ja'
    # 英文
    if re.search(r'^[a-zA-Z\s\-]+$', query):
        return 'en'
    return 'other'


def has_procurement_intent(query: str, lang: str) -> bool:
    """检查是否含采购动词"""
    q_lower = query.lower()
    for verb in PROCUREMENT_VERBS.get(lang, []):
        if verb.lower() in q_lower:
            return True
    # 跨语言也查一下
    for verbs in PROCUREMENT_VERBS.values():
        for verb in verbs:
            if verb.lower() in q_lower:
                return True
    return False


def classify_keyword(query: str) -> str:
    """按 §2.4 规则对单个查询分层
    Returns: T1 / T2 / T2_GENERAL / T2_CATEGORY / T2_SMB / T3_PERSONAL / T3_EVENT / T4_INFO / T4_OTHER / BRAND
    """
    q = query.strip()
    q_lower = q.lower()

    # BRAND 优先
    if '智印港' in q or 'zprintpro' in q_lower:
        return 'BRAND'

    # T1 企业复购耗材 (主营 5 + 采购动词) - 强带钱
    for pattern in T1_PATTERNS:
        if re.search(pattern, q, re.IGNORECASE):
            return 'T1'

    # T2 SMB 事件型 (易拉架/banner)
    for pattern in T2_SMB_PATTERNS:
        if re.search(pattern, q, re.IGNORECASE):
            return 'T2_SMB'

    # T2 通用 B2B 采购 (月曆/catalog/餐牌 等)
    for pattern in T2_GENERAL_PATTERNS:
        if re.search(pattern, q, re.IGNORECASE):
            return 'T2'

    # T2 品类词 (防水/透明/戶外 贴纸)
    for pattern in T2_CATEGORY_PATTERNS:
        if re.search(pattern, q, re.IGNORECASE):
            return 'T2_CATEGORY'

    # T3 个人一次性
    for pattern in T3_PERSONAL_PATTERNS:
        if re.search(pattern, q, re.IGNORECASE):
            return 'T3_PERSONAL'

    # T3 事件泛词
    for pattern in T3_GENERIC_EVENT:
        if re.search(pattern, q, re.IGNORECASE):
            return 'T3_EVENT'

    # T4 泛词信息型
    for pattern in T4_INFO_PATTERNS:
        if re.search(pattern, q, re.IGNORECASE):
            return 'T4_INFO'

    # T4 其他泛词 (硬编码名单)
    for kw in T4_OTHER_KEYWORDS:
        if kw.lower() in q_lower:
            return 'T4_OTHER'

    # 默认归 T4_OTHER (兜底)
    return 'T4_OTHER'


def load_gsc_data(csv_path: Path) -> list:
    """加载 GSC CSV 数据, 数值字段已转 int/float"""
    rows = []
    with open(csv_path, 'r', encoding='utf-8-sig', newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                rows.append({
                    'query': row['热门查询'].strip(),
                    'clicks': int(row['点击次数'] or 0),
                    'impressions': int(row['展示'] or 0),
                    'ctr_pct': float(row['点击率(%)'] or 0),
                    'position': float(row['排名'] or 0),
                })
            except (ValueError, KeyError) as e:
                print(f"⚠️ 跳过异常行: {row} ({e})", file=sys.stderr)
    return rows


def main():
    print("=" * 70)
    print(f"zprintpro 关键词价值分层工具 V1.1 (K3 8/29 12:37 拍板)")
    print(f"数据源: {GSC_CSV.name} ({GSC_CSV.stat().st_size} bytes)")
    print(f"运行时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    if not GSC_CSV.exists():
        print(f"❌ GSC 文件不存在: {GSC_CSV}")
        sys.exit(1)

    rows = load_gsc_data(GSC_CSV)
    print(f"\n📊 加载 {len(rows)} 行 GSC 数据")

    # 分层
    layers = {}  # layer_name -> list of rows
    for row in rows:
        layer = classify_keyword(row['query'])
        layers.setdefault(layer, []).append(row)

    # 统计
    print(f"\n{'层':<20} {'词数':>6} {'展示':>6} {'点击':>6} {'CTR':>8} {'A1':>5} {'striking':>8}")
    print("-" * 70)
    layer_order = ['T1', 'T2', 'T2_CATEGORY', 'T2_SMB', 'T3_PERSONAL', 'T3_EVENT', 'T4_INFO', 'T4_OTHER', 'BRAND']
    layer_labels = {
        'T1': 'T1 企业复购耗材',
        'T2': 'T2 通用 B2B 采购',
        'T2_CATEGORY': 'T2 品类词(buy-leaning)',
        'T2_SMB': 'T2 SMB 事件型',
        'T3_PERSONAL': 'T3 个人一次性',
        'T3_EVENT': 'T3 事件泛词',
        'T4_INFO': 'T4 泛词信息型',
        'T4_OTHER': 'T4 其他泛词',
        'BRAND': 'BRAND 品牌词',
    }
    total_imp = 0
    total_clicks = 0
    procurement_imp = 0
    procurement_clicks = 0
    procurement_a1 = 0
    t1_a1 = 0

    for layer in layer_order:
        if layer not in layers:
            continue
        lrows = layers[layer]
        words = len(lrows)
        imp = sum(r['impressions'] for r in lrows)
        clicks = sum(r['clicks'] for r in lrows)
        ctr = (clicks / imp * 100) if imp > 0 else 0
        a1_count = sum(1 for r in lrows if 1 <= r['position'] <= 10 and r['impressions'] >= 1)
        striking_count = sum(1 for r in lrows if 11 <= r['position'] <= 20 and r['impressions'] >= 1)
        total_imp += imp
        total_clicks += clicks

        is_procurement = layer in ('T1', 'T2', 'T2_CATEGORY', 'T2_SMB')
        if is_procurement:
            procurement_imp += imp
            procurement_clicks += clicks
            procurement_a1 += a1_count
        if layer == 'T1':
            t1_a1 = a1_count

        print(f"{layer_labels[layer]:<20} {words:>6} {imp:>6} {clicks:>6} {ctr:>7.2f}% {a1_count:>5} {striking_count:>8}")

    # 加权平均排名 (按展示)
    weighted_pos = sum(r['position'] * r['impressions'] for r in rows) / total_imp if total_imp > 0 else 0
    overall_ctr = (total_clicks / total_imp * 100) if total_imp > 0 else 0
    procurement_ctr = (procurement_clicks / procurement_imp * 100) if procurement_imp > 0 else 0

    print("-" * 70)
    print(f"{'全站合计':<20} {len(rows):>6} {total_imp:>6} {total_clicks:>6} {overall_ctr:>7.2f}%")
    print(f"\n📈 加权平均排名 (按展示): {weighted_pos:.2f}")
    print(f"🎯 采购词 (T1+T2全部) 合计: {procurement_imp} 展示 / {procurement_clicks} 点击 = CTR {procurement_ctr:.2f}%")
    print(f"   - 采购词首页数 (A1): {procurement_a1}")
    print(f"   - T1 首页词数: {t1_a1}")

    # G1 捡钱清单 (A1 采购词 CTR=0)
    print(f"\n{'='*70}")
    print("💰 G1 捡钱清单 (A1 采购词 CTR=0, 1-2 天工程量)")
    print(f"{'='*70}")
    g1_list = []
    for layer in ('T1', 'T2', 'T2_CATEGORY', 'T2_SMB'):
        for r in layers.get(layer, []):
            if 1 <= r['position'] <= 10 and r['impressions'] >= 1 and r['clicks'] == 0:
                g1_list.append(r)
    g1_list.sort(key=lambda x: -x['impressions'])
    print(f"{'查询':<40} {'展示':>6} {'pos':>6} {'CTR':>8}")
    print("-" * 70)
    for r in g1_list[:20]:
        print(f"{r['query']:<40} {r['impressions']:>6} {r['position']:>6.2f} {r['ctr_pct']:>7.2f}%")
    print(f"\n  总计: {len(g1_list)} 个 G1 捡钱词, 等待 Title/Meta 重写")

    # 最快胜利池 (striking 采购词 pos 11-15)
    print(f"\n{'='*70}")
    print("🎯 G2 一周推到首页 (striking 采购词 pos 11-15)")
    print(f"{'='*70}")
    g2_list = []
    for layer in ('T1', 'T2', 'T2_CATEGORY', 'T2_SMB'):
        for r in layers.get(layer, []):
            if 11 <= r['position'] <= 15 and r['impressions'] >= 1:
                g2_list.append(r)
    g2_list.sort(key=lambda x: -x['impressions'])
    print(f"{'查询':<40} {'展示':>6} {'pos':>6} {'层':<10}")
    print("-" * 70)
    for r in g2_list[:20]:
        layer = classify_keyword(r['query'])
        print(f"{r['query']:<40} {r['impressions']:>6} {r['position']:>6.2f} {layer_labels.get(layer, layer):<10}")

    # 输出 JSON
    OUTPUT_DIR.mkdir(exist_ok=True)
    output_file = OUTPUT_DIR / f"keyword-value-layer-{datetime.now().strftime('%Y-%m-%d')}.json"
    output_data = {
        'meta': {
            'source': GSC_CSV.name,
            'run_time': datetime.now().isoformat(),
            'total_rows': len(rows),
            'k3_directive': 'V1.1 词价值分层 (K3 8/29 12:37 拍板)',
        },
        'summary': {
            'total_impressions': total_imp,
            'total_clicks': total_clicks,
            'overall_ctr_pct': round(overall_ctr, 2),
            'weighted_avg_position': round(weighted_pos, 2),
            'procurement_impressions': procurement_imp,
            'procurement_clicks': procurement_clicks,
            'procurement_ctr_pct': round(procurement_ctr, 2),
            'procurement_a1_count': procurement_a1,
            't1_a1_count': t1_a1,
        },
        'layers': {
            layer_labels.get(layer, layer): {
                'count': len(layers[layer]),
                'impressions': sum(r['impressions'] for r in layers[layer]),
                'clicks': sum(r['clicks'] for r in layers[layer]),
                'ctr_pct': round(sum(r['clicks'] for r in layers[layer]) / sum(r['impressions'] for r in layers[layer]) * 100, 2) if sum(r['impressions'] for r in layers[layer]) > 0 else 0,
                'a1_count': sum(1 for r in layers[layer] if 1 <= r['position'] <= 10 and r['impressions'] >= 1),
                'striking_count': sum(1 for r in layers[layer] if 11 <= r['position'] <= 20 and r['impressions'] >= 1),
                'keywords': [{'query': r['query'], 'clicks': r['clicks'], 'impressions': r['impressions'],
                              'ctr_pct': r['ctr_pct'], 'position': r['position']} for r in layers[layer]]
            }
            for layer in layer_order if layer in layers
        },
        'g1_money_pickup': [
            {'query': r['query'], 'impressions': r['impressions'], 'position': r['position'], 'layer': classify_keyword(r['query'])}
            for r in g1_list
        ],
        'g2_striking_procurement': [
            {'query': r['query'], 'impressions': r['impressions'], 'position': r['position'], 'layer': classify_keyword(r['query'])}
            for r in g2_list
        ],
    }
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    print(f"\n✅ JSON 输出: {output_file}")
    print(f"\n{'='*70}")
    print("📊 K3 V1.1 KPI 口径升级 (替代旧首页词数/CTR):")
    print(f"   - 采购词首页数: 基线 {procurement_a1} (W6 目标 ≥55)")
    print(f"   - T1 词首页数: 基线 {t1_a1} (W6 目标 ≥12)")
    print(f"   - 采购词 CTR: 基线 {procurement_ctr:.2f}% (W6 目标 ≥3%)")
    print(f"{'='*70}")


if __name__ == '__main__':
    main()
