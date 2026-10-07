# -*- coding: utf-8 -*-
"""B2 batch 2: build 16 rows. h1/desc = pristine ts values verbatim (or fill gaps); kw = union; title = live crawl."""
import io, json, re

CSV = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'
old = json.loads(io.open(r'F:\zprintpro-nextjs\.hermes\b2b-old-values.json', encoding='utf-8').read())
live = json.loads(io.open(r'F:\zprintpro-nextjs\.hermes\b2b-live-titles.json', encoding='utf-8').read())
pt = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()

def pt_val(slug, field, scope=4000):
    m = re.search(r"slug:\s*'%s'" % slug, pt)
    if not m: return ''
    seg = pt[m.start():m.start() + scope]
    f = re.search(field + r":\s*'([^']*)'", seg)
    return f.group(1) if f else ''

CLUSTER_KW = {
 'wedding': {
  'zh': ['喜帖印刷','婚禮印刷','結婚請帖','婚宴用品','囍帖訂製','燙金請帖','婚禮套餐印刷','50套起印'],
  'en': ['wedding printing','wedding stationery','bridal invitations','wedding cards bulk','foil wedding cards','50 MOQ'],
  'ja': ['結婚式 印刷','招待状 印刷','ウェディング 印刷','結婚式 準備','ウェディング グッズ','50セット〜']},
 'packaging': {
  'zh': ['包裝盒印刷','彩盒印刷','紙盒訂製','包裝印刷廠','定制包裝盒','免刀模費','跨境包裝'],
  'en': ['packaging box printing','custom boxes wholesale','retail packaging','die cut free','brand packaging boxes','500 MOQ'],
  'ja': ['パッケージ 印刷','化粧箱 印刷','オリジナル 箱 特注','包装箱 印刷','型代不要','500個〜']},
 'misc': {
  'zh': ['餐牌印刷','枱卡訂製','酒吧用品印刷','飲品牌','食品標籤','防水標籤貼紙'],
  'en': ['table cards printing','menu cards custom','bar drink tokens','food label stickers','waterproof labels','50 MOQ'],
  'ja': ['テーブルカード 印刷','メニュー カード','ドリンク トークン','食品 ラベル','防水 ラベル','50枚〜']},
}
SLUG_CLUSTER = {s: 'wedding' for s in ['save-the-date-cards','foil-wedding-invitations','wedding-thank-you-cards','wedding-place-cards','wedding-seating-charts','wedding-suite-bundle']}
SLUG_CLUSTER.update({s: 'packaging' for s in ['corrugated-boxes','electronics-packaging-box','kraft-paper-packaging-box','magnetic-closure-gift-box','tuck-end-boxes','white-card-boxes','gang-run-card-boxes']})
SLUG_CLUSTER.update({s: 'misc' for s in ['cafe-table-cards','drink-tokens','fruit-food-label-stickers']})

BODY = {
 'wedding': ('{n} {m}套起印，{feat}。免費排版諮詢與實物打稿，5-7 個工作天交貨，港澳順豐次日達。',
             '{n} from {m} sets. {fe}. Free layout consultation and physical proof, 5-7 day production, express delivery.',
             '{n}は{m}セットから。{fj}。無料レイアウト相談と実物サンプル、5-7営業日で発送、国際便2-4日。'),
 'packaging': ('{n} {m}個起印，{feat}。免費打稿與結構工程確認，8-15 個工作天交貨，跨境電商包裝經驗。',
               '{n} from {m} units. {fe}. Free proofing and structural engineering check, 8-15 day production, cross-border e-commerce ready.',
               '{n}は{m}個から。{fj}。無料校正と箱型エンジニアリング確認、8-15営業日、越境EC包装対応。'),
 'misc': ('{n} {m}起印，{feat}。免費打稿，5-7 個工作天交貨，港澳順豐次日達。',
          '{n} from {m} units. {fe}. Free proof, 5-7 day production, express shipping.',
          '{n}は{m}から。{fj}。無料校正、5-7営業日で発送、国際便2-4日。'),
}
FEATURES = {
 'save-the-date-cards': ('A6 尺寸燙金局部 UV，300g 特種紙','A6 with gold foil and spot UV on 300gsm specialty stock','A6サイズ・箔押し・局部UV、300g特殊紙'),
 'foil-wedding-invitations': ('金/銀/玫瑰金三色燙金，300g 特種紙','gold, silver and rose-gold foil on 300gsm specialty stock','金・銀・ローズゴールド箔押し、300g特殊紙'),
 'wedding-thank-you-cards': ('A6 燙金 UV 工藝配信封','A6 foil and UV finish with matching envelopes','A6サイズ・箔押しUV、封筒セット'),
 'wedding-place-cards': ('站立式設計燙金壓紋，300g 特種紙','freestanding foil-embossed design on 300gsm stock','スタンド式・箔押しエンボス、300g特殊紙'),
 'wedding-seating-charts': ('A1/A2 大幅面燙金 UV','large-format A1/A2 with foil and UV','A1/A2大型サイズ・箔押しUV対応'),
 'wedding-suite-bundle': ('請帖+感謝卡+枱卡 6 件一套齊全','complete 6-piece set: invitation, thank-you, place cards','招待状・サンキュカード・席札の6点セット'),
 'corrugated-boxes': ('E坑/F坑瓦楞結構，跨境物流抗壓設計','E/F-flute corrugated structure for shipping durability','E/Fフルート段ボール構造、配送耐圧設計'),
 'electronics-packaging-box': ('EVA 海綿內襯緩衝抗震，可選防靜電','EVA foam insert with anti-static option','EVAスポンジ内蔵・帯電防止オプション'),
 'kraft-paper-packaging-box': ('250-350g 進口牛皮紙，FSC 認證環保材質','250-350gsm imported kraft paper, FSC certified','250-350g輸入クラフト紙、FSC認証'),
 'magnetic-closure-gift-box': ('1200g 灰板裱特種紙，磁吸翻蓋高端質感','1200gsm rigid board with magnetic closure','1200g厚紙板・磁石蓋仕様の高級感'),
 'tuck-end-boxes': ('直插/飛機插兩種盒型，化妝品食品適用','straight and airplane tuck styles for cosmetics and food','直挿し・飛行機挿し2箱型、化粧品・食品向け'),
 'white-card-boxes': ('白卡彩盒 300-350g，化妝品零售包裝首選','300-350gsm white card boxes for retail packaging','300-350g白カード紙、化粧品零售包装向け'),
 'gang-run-card-boxes': ('拼版共用固定刀模，免刀模費成本降 40-60%','gang-run shared die, free die-cut cost saving 40-60%','合版固定型代共用、型代不要で40-60%コスト削減'),
 'cafe-table-cards': ('PVC 防水站立式，餐廳咖啡廳耐用','waterproof PVC freestanding for cafes','PVC防水・スタンド式、カフェ向け耐久仕様'),
 'drink-tokens': ('PVC 防水圓角模切，酒吧活動飲品標記','waterproof PVC rounded corners for bars and events','PVC防水・丸角仕様、バー・イベント用'),
 'fruit-food-label-stickers': ('防水防油 FDA 食品級材質，冷藏適用','waterproof oil-proof FDA food-grade, fridge safe','防水・耐油・FDA食品グレード、冷蔵対応'),
}
FAQ = {
 'wedding': ('{m}套起印。500 套以上單價遞減，免費排版諮詢。', 'From {m} sets. Unit price drops at 500+, free layout consultation.', '{m}セットから。500セット以上で単価割引、無料レイアウト相談。'),
 'packaging': ('{m}個起印。1,000 個以上單價明顯下降，免費打稿。', 'From {m} units. Price drops significantly at 1,000+, free proofing.', '{m}個から。1,000個以上で単価大幅割引、無料校正。'),
 'misc': ('{m}起印。免費打稿確認顏色與材質。', 'From {m} units. Free proof to confirm colour and material.', '{m}から。無料校正で色と材質を確認。'),
}

rows = []
for slug, cluster in SLUG_CLUSTER.items():
    o = old.get(slug, {})
    moq = pt_val(slug, r'minQuantity', 6000) or '?'
    nzh = pt_val(slug, r'name', 300)
    nen = pt_val(slug, r'nameEn', 300) or nzh
    nja = pt_val(slug, r'nameJa', 300) or nzh
    feat = FEATURES[slug]
    bk = CLUSTER_KW[cluster]
    fq = FAQ[cluster]
    body = BODY[cluster]
    t = live.get(slug, {})
    def L(loc, ci):
        return (t.get(loc, '') or '').replace('&amp;', '&')
    row = [
        nzh[:30], nen[:60], nja[:40], slug, '42',
        L('zh-hk', 0) or o.get('zh-hk', {}).get('h1', ''), L('en', 1) or o.get('en', {}).get('h1', ''), L('ja', 2) or o.get('ja', {}).get('h1', ''),
    ]
    # keywords: union(old, cluster) dedupe cap 18
    for loc, ci_k in [('zh-hk', 8), ('en', 9), ('ja', 10)]:
        okw = o.get(loc, {}).get('kw', []) if isinstance(o.get(loc), dict) else []
        union = []
        for k in okw + bk['zh' if loc == 'zh-hk' else loc]:
            if k and k not in union and len(union) < 18:
                union.append(k)
        row.append(','.join(union))
    # desc: old verbatim (fallback: short composed)
    for loc in ['zh-hk', 'en', 'ja']:
        d = (o.get(loc) or {}).get('desc', '')
        row.append(d if d else (row[5] if loc == 'zh-hk' else row[6] if loc == 'en' else row[7]))
    # h1: old verbatim
    for loc in ['zh-hk', 'en', 'ja']:
        h = (o.get(loc) or {}).get('h1', '')
        if not h:  # gap fill: compose from live title minus brand tail
            base = L(loc, 0).split('|')[0].strip()
            h = base if base else (nzh if loc == 'zh-hk' else nen if loc == 'en' else nja)
        # kraft ja h1 template-pollution fix
        if slug == 'kraft-paper-packaging-box' and loc == 'ja':
            h = 'クラフト紙パッケージボックス | エコ FSC認証 300個〜'
        row.append(h)
    # body 17-19
    row += [body[0].format(n=nzh, m=moq, feat=feat[0]),
            body[1].format(n=nen, m=moq, fe=feat[1]),
            body[2].format(n=nja, m=moq, fj=feat[2])]
    # FAQ zh 20-25
    row += ['最少起訂量是多少？', fq[0].format(m=moq),
            '交期要幾耐？', '標準 5-7 個工作天，旺季建議提前 2 週落單。',
            '可以免費打稿嗎？', '可以。免費電子打稿 4 小時出，實物樣 1-2 天。']
    # 26 image, 27-29 alt, 30 links
    cat = 'wedding' if cluster == 'wedding' else ('packaging' if cluster == 'packaging' else 'place-cards')
    row += ['zprintpro-%s-%s-zh-hk.webp' % (cat, slug),
            '%s %s | 香港%s印刷 | 智印港' % (nzh, feat[0][:16], nzh[:8]),
            '%s %s | Professional %s | ZprintPro' % (nen, feat[1][:24], nen[:20]),
            '%s %s | %s | ZprintPro' % (nja, feat[2][:20], nja[:24]),
            ('婚禮印刷系列→/zh-hk/category/greeting-cards/ | ' if cluster == 'wedding' else '包裝盒印刷→/zh-hk/category/packaging/ | ') + '聯繫我們→/contact/']
    rows.append(row)

bad = [c for i, row in enumerate(rows) for c in row if '"' in c or '\n' in c or '\t' in c]
assert not bad, 'forbidden chars: %d' % len(bad)
assert all(len(r) == 31 for r in rows), [len(r) for r in rows]

existing = set(l.split('\t')[3].strip() for l in io.open(CSV, encoding='utf-8').read().split('\n')[1:] if l.strip())
dupes = [r[3] for r in rows if r[3] in existing]
assert not dupes, 'dupes: %s' % dupes

with io.open(CSV, 'a', encoding='utf-8', newline='\n') as f:
    for r in rows:
        f.write('\n' + '\t'.join(r))
print('appended %d rows' % len(rows))
for r in rows:
    print('  %-30s kw: zh=%d en=%d ja=%d' % (r[3], len(r[8].split(',')), len(r[9].split(',')), len(r[10].split(','))))
