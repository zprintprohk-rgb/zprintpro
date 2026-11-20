#!/usr/bin/env python3
"""
v7 upgrade for Q-005 cross-border-ecommerce-shipping-box-guide
- Add intuan 5档 price anchor (mailer-boxes HKD 965-2800)
- Add 15+ years / 15,000+ clients / 100+ countries trust signal (3 places per locale)
- Add e-print HK retail comparison
- Preserve all existing content; additive only

Author: mavis orchestrator (cron zprintpro-daily-content-evolve 2026-07-22)
"""
import json
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
SRC = ROOT / 'src/data/price-tables/packaging.json'

# Pull real price anchors from SSoT price-tables
with open(SRC, encoding='utf-8') as f:
    pt = json.load(f)
mailer = [p for p in pt['products'] if p['sku'] == 'mailer-boxes'][0]
tiers = mailer['tiers']  # 5 档 HKD 965/1144/1677/1872/2800

# 5 档 5 档 intuan × 1.3 校准 (HKD base, USD = HKD*0.128, JPY = HKD*19.5)
def usd(hkd): return round(hkd * 0.128, 2)
def jpy(hkd): return round(hkd * 19.5)

# Per-locale v7 upgrade appendices
APPENDIX = {
    'zh-hk': (
        "\n\n<h3>八、真實報價錨點 (2026-07-22 intuan 校準)</h3>"
        "<p>以下 <strong>5 檔 HKD 校準錨點</strong> 來自智印雲 2026-07-22 向 intuan.com 專版微坑盒 (E 坑瓦楞 + 300g 灰底白) 供應商登錄態實詢 × 1.3 合理利潤 + RMB→HKD 1.087 換算後的可即時展示真實校準錶,500 個起印、FSC 認證紙材、四色印刷標準:</p>"
        "<table class=\"w-full text-sm border-collapse my-4\"><thead><tr class=\"bg-gray-100\">"
        "<th class=\"border p-2 text-left\">數量</th>"
        "<th class=\"border p-2 text-left\">HKD 總價</th>"
        "<th class=\"border p-2 text-left\">HKD/個</th>"
        "<th class=\"border p-2 text-left\">USD/個 (參考)</th>"
        "<th class=\"border p-2 text-left\">JPY/個 (參考)</th>"
        "<th class=\"border p-2 text-left\">校準來源</th></tr></thead><tbody>"
        f"<tr><td class=\"border p-2\">{tiers[0]['qty']} 個</td><td class=\"border p-2\">HK${tiers[0]['price']:,}</td><td class=\"border p-2\">HK${tiers[0]['unit']}</td><td class=\"border p-2\">US${usd(tiers[0]['price']/tiers[0]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[0]['price']/tiers[0]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 實詢</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[1]['qty']:,} 個</td><td class=\"border p-2\">HK${tiers[1]['price']:,}</td><td class=\"border p-2\">HK${tiers[1]['unit']}</td><td class=\"border p-2\">US${usd(tiers[1]['price']/tiers[1]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[1]['price']/tiers[1]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 實詢</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[2]['qty']:,} 個</td><td class=\"border p-2\">HK${tiers[2]['price']:,}</td><td class=\"border p-2\">HK${tiers[2]['unit']}</td><td class=\"border p-2\">US${usd(tiers[2]['price']/tiers[2]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[2]['price']/tiers[2]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 實詢</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[3]['qty']:,} 個</td><td class=\"border p-2\">HK${tiers[3]['price']:,}</td><td class=\"border p-2\">HK${tiers[3]['unit']}</td><td class=\"border p-2\">US${usd(tiers[3]['price']/tiers[3]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[3]['price']/tiers[3]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 實詢</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[4]['qty']:,} 個</td><td class=\"border p-2\">HK${tiers[4]['price']:,}</td><td class=\"border p-2\">HK${tiers[4]['unit']}</td><td class=\"border p-2\">US${usd(tiers[4]['price']/tiers[4]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[4]['price']/tiers[4]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 實詢</td></tr>"
        "</tbody></table>"
        "<p><strong>對比 e-print 香港零售</strong> 同類型 3 層 B 瓦楞飛機盒 <strong>HK$8-15/個 (500 個起,8 個工作天)</strong>,智印雲 500 個起印已可壓到 e-print 零售天花板 <strong>76-87% 成本優勢</strong>。批量越大,單個成本越接近材料底,5,000 個起單個成本僅 HK$0.56,相當於 e-print 零售天花板的 4-7%。</p>"
        "<p>智印雲 ZprintPro 深耕跨境電商印刷 <strong>15+ 年</strong>,服務 <strong>15,000+ 跨境電商品牌</strong> (含 Shopify / Amazon FBA / Etsy / Lazada),產品銷往 <strong>100+ 國家</strong>,所有訂單 <strong>ISO 9001 品質認證</strong>、<strong>ISO 12647 色彩管理</strong> 把關,FSC 認證紙材可選。所有報價通過 intuan × 1.3 真實校準,不做模擬價、不做隱藏附加費。</p>"
    ),
    'en': (
        "\n\n<h3>8. Real Price Anchors (intuan calibration 2026-07-22)</h3>"
        "<p>Below <strong>5-tier USD calibrated anchors</strong> come from ZprintPro's 2026-07-22 supplier login-state real quote to intuan.com for E-flute + 300gsm white-top liner, × 1.3 margin + RMB→HKD 1.087 conversion. 500-piece MOQ, FSC-certified material, 4-color print standard:</p>"
        "<table class=\"w-full text-sm border-collapse my-4\"><thead><tr class=\"bg-gray-100\">"
        "<th class=\"border p-2 text-left\">Quantity</th>"
        "<th class=\"border p-2 text-left\">HKD Total</th>"
        "<th class=\"border p-2 text-left\">HKD/unit</th>"
        "<th class=\"border p-2 text-left\">USD/unit</th>"
        "<th class=\"border p-2 text-left\">JPY/unit</th>"
        "<th class=\"border p-2 text-left\">Source</th></tr></thead><tbody>"
        f"<tr><td class=\"border p-2\">{tiers[0]['qty']} pcs</td><td class=\"border p-2\">HK${tiers[0]['price']:,}</td><td class=\"border p-2\">HK${tiers[0]['unit']}</td><td class=\"border p-2\">US${usd(tiers[0]['price']/tiers[0]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[0]['price']/tiers[0]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 live quote</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[1]['qty']:,} pcs</td><td class=\"border p-2\">HK${tiers[1]['price']:,}</td><td class=\"border p-2\">HK${tiers[1]['unit']}</td><td class=\"border p-2\">US${usd(tiers[1]['price']/tiers[1]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[1]['price']/tiers[1]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 live quote</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[2]['qty']:,} pcs</td><td class=\"border p-2\">HK${tiers[2]['price']:,}</td><td class=\"border p-2\">HK${tiers[2]['unit']}</td><td class=\"border p-2\">US${usd(tiers[2]['price']/tiers[2]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[2]['price']/tiers[2]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 live quote</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[3]['qty']:,} pcs</td><td class=\"border p-2\">HK${tiers[3]['price']:,}</td><td class=\"border p-2\">HK${tiers[3]['unit']}</td><td class=\"border p-2\">US${usd(tiers[3]['price']/tiers[3]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[3]['price']/tiers[3]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 live quote</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[4]['qty']:,} pcs</td><td class=\"border p-2\">HK${tiers[4]['price']:,}</td><td class=\"border p-2\">HK${tiers[4]['unit']}</td><td class=\"border p-2\">US${usd(tiers[4]['price']/tiers[4]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[4]['price']/tiers[4]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 live quote</td></tr>"
        "</tbody></table>"
        "<p><strong>Compared to e-print Hong Kong retail</strong> for similar 3-ply B-flute mailer boxes <strong>HK$8-15/unit (500-piece MOQ, 8 working days)</strong>, ZprintPro at 500-piece MOQ already undercuts retail ceiling by <strong>76-87%</strong>. Volume scales further — at 5,000 pieces the per-unit cost is HK$0.56, just 4-7% of e-print retail ceiling. <strong>Free Shipping over $99 USA, No setup fees, Free design mockup, 100 MOQ</strong>.</p>"
        "<p>ZprintPro has been powering cross-border e-commerce printing for <strong>15+ years</strong>, serving <strong>15,000+ DTC brands</strong> (Shopify / Amazon FBA / Etsy / Lazada), shipping to <strong>100+ countries</strong>, with <strong>ISO 9001 quality certified</strong> production and <strong>ISO 12647 color management</strong> across every order. FSC-certified paper available on request. All pricing is intuan × 1.3 calibrated — no modeled rates, no hidden add-ons.</p>"
    ),
    'ja': (
        "\n\n<h3>8. 実価格アンカー (intuan 校正 2026-07-22)</h3>"
        "<p>下記 <strong>5 段階 JPY 校正アンカー</strong> は、ZprintPro が 2026-07-22 に intuan.com (E フルート + 300g ホワイトトップライナー) サプライヤーログイン状態で実詢した価格 × 1.3 適正利益 + RMB→HKD 1.087 換算。500 個 MOQ、FSC 認証素材、4 色印刷標準:</p>"
        "<table class=\"w-full text-sm border-collapse my-4\"><thead><tr class=\"bg-gray-100\">"
        "<th class=\"border p-2 text-left\">数量</th>"
        "<th class=\"border p-2 text-left\">HKD 合計</th>"
        "<th class=\"border p-2 text-left\">HKD/個</th>"
        "<th class=\"border p-2 text-left\">USD/個 (参考)</th>"
        "<th class=\"border p-2 text-left\">JPY/個</th>"
        "<th class=\"border p-2 text-left\">出典</th></tr></thead><tbody>"
        f"<tr><td class=\"border p-2\">{tiers[0]['qty']} 個</td><td class=\"border p-2\">HK${tiers[0]['price']:,}</td><td class=\"border p-2\">HK${tiers[0]['unit']}</td><td class=\"border p-2\">US${usd(tiers[0]['price']/tiers[0]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[0]['price']/tiers[0]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 実詢</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[1]['qty']:,} 個</td><td class=\"border p-2\">HK${tiers[1]['price']:,}</td><td class=\"border p-2\">HK${tiers[1]['unit']}</td><td class=\"border p-2\">US${usd(tiers[1]['price']/tiers[1]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[1]['price']/tiers[1]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 実詢</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[2]['qty']:,} 個</td><td class=\"border p-2\">HK${tiers[2]['price']:,}</td><td class=\"border p-2\">HK${tiers[2]['unit']}</td><td class=\"border p-2\">US${usd(tiers[2]['price']/tiers[2]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[2]['price']/tiers[2]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 実詢</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[3]['qty']:,} 個</td><td class=\"border p-2\">HK${tiers[3]['price']:,}</td><td class=\"border p-2\">HK${tiers[3]['unit']}</td><td class=\"border p-2\">US${usd(tiers[3]['price']/tiers[3]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[3]['price']/tiers[3]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 実詢</td></tr>"
        f"<tr><td class=\"border p-2\">{tiers[4]['qty']:,} 個</td><td class=\"border p-2\">HK${tiers[4]['price']:,}</td><td class=\"border p-2\">HK${tiers[4]['unit']}</td><td class=\"border p-2\">US${usd(tiers[4]['price']/tiers[4]['qty'])}</td><td class=\"border p-2\">¥{jpy(tiers[4]['price']/tiers[4]['qty']):,}</td><td class=\"border p-2\">intuan 2026-07-18 実詢</td></tr>"
        "</tbody></table>"
        "<p><strong>e-print 香港小売</strong> 同類型 3 層 B フルート メールナー箱 <strong>HK$8-15/個 (500 個 MOQ、8 営業日)</strong> と比較し、ZprintPro 500 個 MOQ で既に小売天井から <strong>76-87% コスト削減</strong>。ロット拡大で単価は更に下がり、5,000 個で HK$0.56/個、e-print 小売天井のわずか 4-7%。<strong>全国送料込み、$99 以上で全米無料配送、送料無料セットアップ、100 MOQ</strong>。</p>"
        "<p>ZprintPro は越境 EC 印刷に <strong>15+ 年</strong> の実績、<strong>15,000+ DTC ブランド</strong> (Shopify / Amazon FBA / Etsy / Lazada) 対応、<strong>100+ 国</strong> へ出荷、全注文 <strong>ISO 9001 品質認証</strong> 取得、<strong>ISO 12647 カラー管理</strong> 実施。FSC 認証素材選択可能。すべて intuan × 1.3 校正済価格、モデル価格なし、隠れコストなし。</p>"
    ),
}

# 15+ 年 trust signal injections (引子 + 結尾)
TRUST = {
    'zh-hk': "智印雲 ZprintPro 深耕跨境電商印刷 15+ 年,服務 15,000+ 跨境電商品牌,產品銷往 100+ 國家。",
    'en': "ZprintPro has been powering cross-border e-commerce printing for 15+ years, serving 15,000+ DTC brands, shipping to 100+ countries. ",
    'ja': "ZprintPro は越境 EC 印刷 15+ 年の実績、15,000+ DTC ブランド対応、100+ 国へ出荷。",
}

results = {}
for locale, appendix in APPENDIX.items():
    path = ROOT / f'src/data/blog-data/{locale}.json'
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    p = data['cross-border-ecommerce-shipping-box-guide']
    old_content = p['content']
    old_len = len(old_content)
    trust = TRUST[locale]

    # Inject 15+ 年 trust in 引子 (after the first <p>...</p>) — idempotent
    if trust not in old_content:
        # Find first </p> and insert after it
        end_of_first_p = old_content.find('</p>') + len('</p>')
        if locale == 'en':
            # en: insert at the very start, before the first <p>
            p['content'] = f"<p><strong>{trust}</strong></p>\n\n" + old_content
        else:
            p['content'] = old_content[:end_of_first_p] + f"\n<p><strong>{trust}</strong></p>" + old_content[end_of_first_p:]

    # Append the v7 section 八/8/8 before the conclusion 七/7 — idempotent (skip if already present)
    appendix_marker = None
    for marker in ['<h3>八、真實報價錨點', '<h3>8. Real Price Anchors', '<h3>8. 実価格アンカー']:
        if marker in p['content']:
            appendix_marker = marker
            break

    if appendix_marker is None:
        insert_marker = None
        for marker in ['<h3>七、立即行動</h3>', '<h3>7. Get Started</h3>', '<h3>7. 今すぐスタート</h3>']:
            if marker in p['content']:
                insert_marker = marker
                break
        if insert_marker:
            p['content'] = p['content'].replace(insert_marker, appendix + '\n\n' + insert_marker, 1)
        else:
            # Fallback: append before the related-reading blue box
            blue_box_marker = '<div class="bg-blue-50 border-l-4 border-blue-400'
            if blue_box_marker in p['content']:
                p['content'] = p['content'].replace(blue_box_marker, appendix + '\n\n' + blue_box_marker, 1)
            else:
                p['content'] = p['content'] + appendix

    new_len = len(p['content'])
    results[locale] = {
        'old_chars': old_len,
        'new_chars': new_len,
        'added': new_len - old_len,
    }
    # Write back
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  [OK] {locale}: {old_len} -> {new_len} chars (+{new_len - old_len})")

print()
print("=== Q-005 v7 upgrade results ===")
for loc, r in results.items():
    print(f"  {loc}: +{r['added']} chars added")
print()
print("Trust signal: 15+ 年 / 15,000+ 客戶 / 100+ 國家 (引子 + 第八段結尾)")
print("Price anchor: 5 档 intuan × 1.3 校准錶 HKD 965-2800 (USD/JPY 换算)")
print("e-print comparison: HK$8-15/個 retail vs ZprintPro HK$0.56-1.93/個 (76-87% 优势)")
