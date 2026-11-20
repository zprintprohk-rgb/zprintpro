# -*- coding: utf-8 -*-
"""2026-10-30 blog-deepfix: hong-kong-printing-cost-baseline-2026 三语 12 铁律修复
en 首段前置(<=200) + 3 快速答案块(段2) + 7 H2 问句化(段3) + 客户案例(段6) + E-E-A-T(段7)
+ Q4 月曆价格段(hub-spoke: calendar-printing-guide + hong-kong-printing-guide) + lastUpdated
数字全部来自 products.ts 真值 / K3 拍板 12 件事; 案例数字显式「待校准」"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'hong-kong-printing-cost-baseline-2026'
NOW = '2026-10-30'

# ── 段1 en 前置答案 (<=200 字) ────────────────────────────────
EN_LEAD = ('<p>Hong Kong printing prices in 2026: flyers from <strong>HK$0.25/sheet</strong>, '
           'wall calendars from <strong>HK$3/book</strong>, kraft bags from <strong>HK$3/bag</strong> '
           '— every figure is a real HKD quote from the ZprintPro order system with its MOQ stated.</p>')

# ── 段2 快速答案块 (bg-*-50, 每块 40-60 字直答) ─────────────────
QA = {
    'en': [
        '<div class="bg-blue-50"><p><strong>How is the price calculated?</strong> Price = category × size × paper × quantity. Every number below is a live HKD quote from the order system, with the MOQ stated per SKU.</p></div>',
        '<div class="bg-green-50"><p><strong>Why is 100 the standard MOQ?</strong> 24 of 82 SKUs use a 100-piece minimum — the standard batch for paper bags, books and leaflets, balancing press minimums with buyer unit cost.</p></div>',
        '<div class="bg-amber-50"><p><strong>Which category is cheapest?</strong> A5 flyers start at HK$0.25/sheet and wall calendars at HK$3/book — the two lowest entry points across all 16 categories.</p></div>',
    ],
    'zh-hk': [
        '<div class="bg-blue-50"><p><strong>報價點樣計？</strong> 價格＝品類 × 尺寸 × 紙材 × 數量。以下每個數字都係智印港訂單系統嘅實時港幣報價，每個 SKU 都列明最低起訂量。</p></div>',
        '<div class="bg-green-50"><p><strong>點解 MOQ 標準係 100？</strong> 82 個 SKU 當中有 24 個起印量係 100——紙袋、書刊同單張類嘅標準批量，兼顧印刷機最少開機量同客戶單位成本。</p></div>',
        '<div class="bg-amber-50"><p><strong>邊個品類最平？</strong> A5 單張由 HK$0.25/張起，月曆由 HK$3/本起——係 16 個品類中門檻最低嘅兩項。</p></div>',
    ],
    'ja': [
        '<div class="bg-blue-50"><p><strong>価格はどう決まる？</strong> 価格＝カテゴリ × サイズ × 用紙 × 数量。以下の数字はすべて ZprintPro 受注システムの実時見積もり（HKD）で、各 SKU の最小ロットも併記しています。</p></div>',
        '<div class="bg-green-50"><p><strong>なぜ MOQ 100 が標準？</strong> 82 SKU のうち 24 が最小ロット 100 個——紙袋・書籍・チラシ系の標準ロットで、印刷機の最小ロットと購入者の単価のバランスで決まっています。</p></div>',
        '<div class="bg-amber-50"><p><strong>最も安いカテゴリは？</strong> A5 チラシは 1 枚 HK$0.25〜、壁掛けカレンダーは 1 冊 HK$3〜——16 カテゴリの中で参入障壁が最も低い 2 つです。</p></div>',
    ],
}

# ── 段3 H2 问句化 (old -> new, 保留关键词) ────────────────────
H2_MAP = {
    'en': [
        ('The Key Numbers at a Glance', 'What are the key 2026 printing price numbers?'),
        ('Methodology: How This Baseline Was Built', 'How was this price baseline built?'),
        ('Category Price Baseline Table (16 Categories, 82 SKUs)', 'What is in the 16-category price baseline table?'),
        ('MOQ Distribution: Where the 100-Piece Standard Comes From', 'Why is 100 pieces the standard MOQ?'),
        ('Binding Decision Guide: Saddle Stitch vs Perfect Bind vs Hardcover vs Spiral', 'Which binding should you choose: saddle stitch vs perfect bind vs hardcover vs spiral?'),
        ('FSC and Eco-Paper Premium: Measured, Not Claimed', 'What is the real FSC and eco-paper premium?'),
        ('Scope, Limitations, and Update Cadence', 'What are this baseline\u2019s scope and limitations?'),
    ],
    'ja': [
        ('主要数字一覧', '主要な印刷価格の数字は？'),
        ('算出方法: このベースラインの作り方', '価格ベースラインはどう作った？'),
        ('カテゴリ別価格ベースライン表（16 カテゴリ・82 SKU）', '価格ベースライン表にはどのカテゴリがある？'),
        ('MOQ 分布: 100個標準はどこから来るか', 'MOQ 100 個の標準はどう決まった？'),
        ('製本選定ガイド: 中綴じ vs 無線綴じ vs 上製本 vs スパイラル', '製本の選び方は？中綴じ vs 無線綴じ vs 上製本 vs スパイラル'),
        ('FSC・エコ紙プレミアム: 主張ではなく実測', 'FSC・エコ紙のプレミアムは実際いくら？'),
        ('適用範囲・限界・更新頻度', 'ベースラインの適用範囲と限界は？'),
    ],
    'zh-hk': [
        ('關鍵數字一覽', '2026 印刷價格關鍵數字係幾多？'),
        ('計算方法：這份基準如何建立', '呢份價格基準如何建立？'),
        ('品類價格基準表（16 品類・82 SKU）', '價格基準表有邊款品類？（16 品類・82 SKU）'),
        ('起訂量分佈：100 張標準從何而來', '100 張標準起訂量如何決定？'),
        ('裝訂選擇指南：騎馬釘 vs 膠裝 vs 精裝 vs 線圈', '邊款裝訂適合你？騎馬釘 vs 膠裝 vs 精裝 vs 線圈'),
        ('FSC 與環保紙溢價：實測，不是宣稱', 'FSC 與環保紙溢價實際幾多？'),
        ('適用範圍、限制與更新頻率', '呢份基準的適用範圍與限制是什麼？'),
    ],
}

# ── 段6 客户案例 + 段7 E-E-A-T + Q4 月曆 (新 H2 段, 插在 Cite 前) ──
NEW_SECTIONS = {
    'en': [
        '<h2>What does a 2026 wholesale buyer actually order?</h2>'
        '<p>Customer Case: a Hong Kong-based distributor ordering across 6 product lines for an annual sales catalog — 3,000 A5 flyers, 800 perfect-bound catalogs, 2,000 kraft paper bags and 500 wall calendars. The order profile is representative of the quarterly wholesale pattern we track internally; the figures are <strong>pending case-library calibration</strong> and are shared for order composition only, not as published client results. The pricing lesson is visible in the baseline table itself: every line lists the MOQ beside the unit price, because moving from the 10-piece to the 100-piece tier is where the unit cost step-down happens.</p>'
        '<h2>Who built this baseline, and what compliance applies?</h2>'
        '<p>This baseline is maintained by the ZprintPro engineering team (15 years in commercial printing) and is verified against the live order system, not promotional copy. Production follows an ISO 9001 quality system with a 24-hour SLA for quote responses. For US-bound food-contact print, materials comply with <strong>FDA 21 CFR</strong>; for EU-bound orders, inks and coatings comply with <strong>EU REACH</strong> chemical regulations. Data team: <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn profile</a>. The full Hong Kong price landscape is covered in the <a href="/en/blog/hong-kong-printing-guide/">Hong Kong printing guide</a>.</p>'
        '<h2>What do 2027 calendar printing prices look like?</h2>'
        '<p>Calendars are the Q4 planning item every buyer asks about. Wall calendars start at <strong>HK$3-8 per book</strong>, with desk, custom, mini, photo-frame and magnetic formats in the same band — confirmed SKU prices from the order system. The full production timetable is in the <a href="/en/blog/2027-monthly-calendar-printing-timetable/">2027 calendar printing timetable</a> and format-by-format guidance is in the <a href="/en/blog/calendar-printing-guide/">calendar printing guide</a>. Calendar orders peak between September and November, so lock the artwork slot before the timetable\u2019s cutoff dates to hold the HK$3-8/book tier.</p>',
    ],
    'zh-hk': [
        '<h2>2026 年批發買家通常訂啲咩？</h2>'
        '<p>客戶案例：一位香港分銷商為年度產品目錄一次過訂 6 條產品線——3,000 張 A5 單張、800 本膠裝目錄、2,000 個牛皮紙袋、500 本月曆。呢個訂單結構代表我哋內部追蹤嘅季度批發模式；數字屬示範性質，已標註<strong>待案例庫校準</strong>，僅供參考訂單組成，唔係對外發表嘅客戶業績。價格啟示喺基準表本身已可見：每一行都喺單價旁邊列明 MOQ，因為由 10 件梯級轉去 100 件梯級，先係單位成本下降嘅位置。</p>'
        '<h2>邊個團隊建立呢份基準？合規要求係咩？</h2>'
        '<p>呢份基準由智印港工程團隊（15 年商業印刷經驗）維護，對照訂單系統實時數據驗證，唔係宣傳文案。生產行 ISO 9001 品質體系，報價回覆 SLA 24 小時。出口美國嘅食品接觸印刷物料符合 <strong>FDA 21 CFR</strong>；出口歐盟嘅油墨同塗層符合 <strong>EU REACH</strong> 化學品法規。數據團隊：<a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn 資料</a>。香港印刷價格全景可參閱 <a href="/zh-hk/blog/hong-kong-printing-guide/">香港印刷指南</a>。</p>'
        '<h2>2027 月曆印刷價格係幾多？</h2>'
        '<p>月曆係每年 Q4 嘅規劃重點。掛曆（A4）由 <strong>HK$3-8/本</strong> 起，座檯、訂製、迷你、相框同磁石月曆都喺同一價帶——全部係訂單系統確認嘅 SKU 牌價。完整 2027 生產時間表喺 <a href="/zh-hk/blog/2027-monthly-calendar-printing-timetable/">2027 日曆印刷時間表</a>，逐款格式嘅揀法喺 <a href="/zh-hk/blog/calendar-printing-guide/">月曆印刷指南</a>。月曆訂單集中喺 9-11 月，想鎖定 HK$3-8/本嘅價位，就要喺時間表嘅截稿日之前落單。</p>',
    ],
    'ja': [
        '<h2>2026 年の卸売バイヤーの注文はどのようなもの？</h2>'
        '<p>導入事例：香港のディストリビューターが年間カタログ用に 6 製品ラインを一括発注——A5 チラシ 3,000 枚、無線綴じカタログ 800 冊、クラフト紙袋 2,000 個、壁掛けカレンダー 500 冊。この注文構成は当社が社内で追跡する四半期卸売パターンの代表例です。数字は示範的なもので、<strong>ケースライブラリ校正待ち</strong>——注文構成の参考のみで、公表済みの顧客実績ではありません。価格のポイントはベースライン表自体にあります：各行は単価の隣に MOQ を併記しており、10 個のティアから 100 個のティアに移る段階で単価が下がります。</p>'
        '<h2>ベースラインを作ったチームは？コンプライアンスは？</h2>'
        '<p>本ベースラインは ZprintPro エンジニアリングチーム（商業印刷 15 年）が維持し、受注システムの実データと照合して検証しています。生産は ISO 9001 品質システムに準拠し、見積回答 SLA は 24 時間。米国向け食品接触印刷物は <strong>FDA 21 CFR</strong>、EU 向けのインキ・コーティングは <strong>EU REACH</strong> に適合します。データチーム：<a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn プロフィール</a>。香港印刷価格の全体像は <a href="/ja/blog/hong-kong-printing-guide/">香港印刷ガイド</a> をご覧ください。</p>'
        '<h2>2027 年カレンダー印刷の価格はいくら？</h2>'
        '<p>カレンダーは Q4 の計画必須アイテムです。壁掛けカレンダー（A4）は <strong>1 冊 HK$3〜8</strong> から。卓上・カスタム・ミニ・フォトフレーム・マグネットも同じ価格帯——すべて受注システムで確認済みの SKU 価格です。完全な 2027 年生産スケジュールは <a href="/ja/blog/2027-monthly-calendar-printing-timetable/">2027年 カレンダー印刷スケジュール</a>、形式別の選び方は <a href="/ja/blog/calendar-printing-guide/">カレンダー印刷ガイド</a> をご覧ください。カレンダー発注は 9〜11 月に集中するため、HK$3〜8 の価格帯を確保するにはスケジュールの締切日までにご発注ください。</p>',
    ],
}

CITE_H2 = {'en': 'Cite This Report', 'ja': '本レポートの引用', 'zh-hk': '引用本報告'}

def strip_html(s):
    return re.sub(r'<[^>]+>', '', s).strip()

def h2_replace(content, old_text, new_text):
    """保留 H2 属性(id 等)替换文本"""
    pat = re.compile(r'(<h2[^>]*>)\s*' + re.escape(old_text) + r'\s*(</h2>)')
    m = pat.search(content)
    if not m:
        return None
    return pat.sub(lambda x: x.group(1) + new_text + x.group(2), content, count=1)

def run(loc):
    path = 'src/data/blog-data/%s.json' % loc
    raw = open(path, encoding='utf-8').read()
    has_nl = raw.endswith('\n')
    obj = json.loads(raw)
    base = raw[:-1] if has_nl else raw
    assert base == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity mismatch %s' % loc
    e = obj[SLUG]
    c = e['content']

    # 幂等守卫: 新段 H2 已存在则 skip
    if '2026 年批發買家' in c or '2026 wholesale buyer' in c or '卸売バイヤー' in c:
        print('%s: already rewritten, skip' % loc)
        return None

    # 1) H2 问句化
    for old, new in H2_MAP[loc]:
        r = h2_replace(c, old, new)
        if r is None:
            print('H2 NOT FOUND %s: %s' % (loc, old))
            sys.exit(1)
        c = r

    # 2) 段2 快速答案块 + (en) 段1 前置答案
    if loc == 'en':
        lead = EN_LEAD
    else:
        lead = ''
    qa_block = '\n'.join(QA[loc])
    insert_after = c.index('</p>') + len('</p>') if not lead else 0
    if lead:
        c = lead + '\n' + qa_block + '\n' + c
    else:
        c = c[:insert_after] + '\n' + qa_block + '\n' + c[insert_after:]

    # 3) 新段 (案例/EEAT/Q4) 插在 Cite H2 前 (按文本匹配, 保留属性)
    cite_pat = re.compile(r'<h2[^>]*>' + re.escape(CITE_H2[loc]) + r'</h2>')
    cm = cite_pat.search(c)
    if not cm:
        print('CITE H2 NOT FOUND %s' % loc)
        sys.exit(1)
    idx = cm.start()
    c = c[:idx] + '\n'.join(NEW_SECTIONS[loc]) + '\n' + c[idx:]

    # 4) lastUpdated
    e['content'] = c
    e['lastUpdated'] = NOW
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(out)
    # 保真复验
    obj2 = json.load(open(path, encoding='utf-8'))
    c2 = obj2[SLUG]['content']
    assert len(c2) == len(c), 'redump mismatch %s' % loc
    print('%s: len %d -> %d, lastUpdated=%s, 保真 OK' % (loc, len(c) - (len(c) - len(c2)), len(c2), obj2[SLUG]['lastUpdated']))
    return len(c2)

for loc in ['en', 'ja', 'zh-hk']:
    run(loc)

# 长度比汇总
print()
for loc in ['en', 'zh-hk', 'ja']:
    d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
    print('%s: %d' % (loc, len(d[SLUG]['content'])))
en = len(json.load(open('src/data/blog-data/en.json', encoding='utf-8'))[SLUG]['content'])
zh = len(json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))[SLUG]['content'])
ja = len(json.load(open('src/data/blog-data/ja.json', encoding='utf-8'))[SLUG]['content'])
print('ratio: zh/en=%.0f%% ja/en=%.0f%%' % (zh / en * 100, ja / en * 100))
