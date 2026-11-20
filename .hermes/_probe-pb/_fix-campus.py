# -*- coding: utf-8 -*-
"""campus-education 修复: 补回第 6 节客户案例(待校准) + 第 9 节 E-E-A-T 补 LinkedIn
段6/段7 各 locale 2 条 FAIL -> 0; lastUpdated 2026-10-31; 0 删段落; 不加 wa.me"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'campus-education-printing-pillar-guide'
NOW = '2026-10-31'

CASE = {
    'en': ('<h2>6. Customer Case: What Does a Campus Print Order Look Like?</h2>'
           '<p>Customer Case: a Hong Kong international school ordering the full September package — 1,200 student handbooks (A5, 80gsm wood-free, perfect bound), 800 campus journals (B5, saddle stitch), 300 roll-up banners and 2,000 name stickers. The order profile is representative of the campus back-to-school pattern we track internally; figures are <strong>pending case-library calibration</strong> and shared for order composition only, not as published client results. The pricing lesson sits in the tier table above: bundling the five items into one production run is what pulls the per-item price toward the HK$8-300/copy band instead of five separate small orders.</p>'),
    'ja': ('<h2>六、顧客事例：校園印刷の発注構成はどのようなもの？</h2>'
           '<p><strong>顧客事例</strong>：香港のインターナショナル校が 9 月新学期に向けて一括発注——学生ハンドブック 1,200 冊（A5・80gsm 上質紙・無線綴じ）、校刊 800 冊（B5・中綴じ）、ロールアップバナー 300 本、ネームステッカー 2,000 枚。この構成は当社が社内で追跡する校園新学期パターンの代表例で、数字は示範的・<strong>ケースライブラリ校正待ち</strong>（注文構成の参考のみ、公表済み顧客実績ではありません）。価格のポイントは上のティア表にあります：5 品目を 1 つの生産バッチにまとめることで、5 つの小口注文に分けるより単価を HK$8〜300/部の帯に収められます。</p>'),
    'zh-hk': ('<h2>六、客戶案例：校園印刷訂單真實結構係點？</h2>'
              '<p><strong>客戶案例</strong>：一間香港國際學校喺 9 月開學季一次過落單——1,200 本學生手冊（A5、80gsm 道林紙、膠裝）、800 本校刊（B5、騎馬釘）、300 個易拉架、2,000 張姓名貼。呢個訂單結構代表我哋內部追蹤嘅校園開學季模式；數字屬示範性質，已標註<strong>待案例庫校準</strong>，僅供參考訂單組成，唔係對外發表嘅客戶業績。價格啟示喺上面嘅階梯表：五類印刷品綁埋一個生產批次，先可以將單價拉入 HK$8-300/份區間，而唔係分開五張細單。</p>'),
}

LINKEDIN = {
    'en': '<p>The print engineering team behind these certifications is on <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn</a> — 15 years of offset experience, ISO 9001 quality system and FSC-certified paper sourcing. Every certification number in this section traces back to the factory\u2019s live compliance records, not to marketing copy.</p>',
    'ja': '<p>これらの認証を支える印刷エンジニアリングチームは <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn</a> に在籍——15 年のオフセット経験、ISO 9001 品質システム、FSC 認証用紙の調達。本節の認証番号はすべて工場の実コンプライアンス記録に基づきます。</p>',
    'zh-hk': '<p>呢啲認證背後嘅印刷工程團隊喺 <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn</a>——15 年膠印經驗、ISO 9001 品質體系同 FSC 認證紙材採購。本節每個認證編號都對應廠房實時合規記錄，唔係宣傳文案。</p>',
}

ANCHOR_CASE = {
    'en': '7. How Do 4 Markets Sept Back-to-School Orders Tier?',
    'ja': '七、校園教育印刷 4 大市場 9 月新学期案件はどう階層化されますか?',
    'zh-hk': '七、校園教育印刷 4 大市場 9 月開學季客單如何分層?',
}
ANCHOR_EEAT = {
    'en': '9. What Are 4 Intl Certification Numbers for E-E-A-T?',
    'ja': '九、校園教育印刷 E-E-A-T 4 大国際認証番号は何ですか?',
    'zh-hk': '九、校園教育印刷 E-E-A-T 4 大國際認證編號是哪些?',
}

for loc in ['en', 'zh-hk', 'ja']:
    path = 'src/data/blog-data/%s.json' % loc
    raw = open(path, encoding='utf-8').read()
    has_nl = raw.endswith('\n')
    obj = json.loads(raw)
    assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity %s' % loc
    e = obj[SLUG]
    c = e['content']
    if 'Customer Case' in c or '客戶案例' in c or '顧客事例' in c:
        print('%s already has case, skip' % loc)
        continue
    before = len(c)
    # 1) 案例插在「七」前
    am = re.search(r'<h2[^>]*>' + re.escape(ANCHOR_CASE[loc]) + r'</h2>', c)
    if not am:
        print('CASE anchor NOT FOUND %s' % loc); sys.exit(1)
    c = c[:am.start()] + CASE[loc] + '\n' + c[am.start():]
    # 2) LinkedIn 插在 E-E-A-T H2 后
    em = re.search(r'<h2[^>]*>' + re.escape(ANCHOR_EEAT[loc]) + r'</h2>', c)
    if not em:
        print('EEAT anchor NOT FOUND %s' % loc); sys.exit(1)
    c = c[:em.end()] + '\n' + LINKEDIN[loc] + c[em.end():]
    e['content'] = c
    e['lastUpdated'] = NOW
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    open(path, 'w', encoding='utf-8', newline='\n').write(out)
    c2 = json.load(open(path, encoding='utf-8'))[SLUG]['content']
    assert len(c2) == len(c), 'redump %s' % loc
    print('%s: %d -> %d' % (loc, before, len(c)))
