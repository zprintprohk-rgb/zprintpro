# -*- coding: utf-8 -*-
"""2026-10-30 夜场3: school-exercise-book-printing-guide 深度修复 (15 FAIL -> 0)
段1 en 首段<=200 / 段2 3 快速答案块 / 段3 H2 问句化(>=50%) / 段4 2 表格(真值)
段6 en/ja 案例标题匹配 / 段7 LinkedIn 原子 / 新段: EEAT + 文件规格 + Q4 时间线
blog-standard: excerpt + schemas; lastUpdated 2026-10-30; 0 删段落"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'school-exercise-book-printing-guide'
NOW = '2026-10-30'

# ── 段1 en 首段 (<=200) ──
EN_LEAD = ('<p>Schools dread 3 pain points: MOQ too high (5,000+), paper too thin (60gsm), '
           'lead time too long (4 weeks). ZprintPro answers with 100 MOQ, 80gsm wood-free, '
           '6PM cutoff next-day 12PM SF delivery.</p>')

# ── 段2 快速答案块 ──
QA = {
    'en': [
        '<div class="bg-blue-50"><p><strong>What is the minimum order?</strong> 100 copies. HK$3.5-5.5/book at 100 copies, HK$2.8-4.0 at 1,000 and HK$2.2-3.5 at 5,000 on the shared-plate ladder.</p></div>',
        '<div class="bg-green-50"><p><strong>Which paper should schools use?</strong> 80gsm wood-free is the default (75% of schools, HK$3.5/book); 70gsm book paper cuts cost about 20% for short-term mass runs.</p></div>',
        '<div class="bg-amber-50"><p><strong>How fast can an order ship?</strong> 5-7 working days standard, 3-day rush +30%, and a 6PM cutoff for next-day 12PM SF Express.</p></div>',
    ],
    'zh-hk': [
        '<div class="bg-blue-50"><p><strong>最少印幾多本？</strong> 100 本起印。100 本 HK$3.5-5.5/本、1,000 本 HK$2.8-4.0/本、5,000 本 HK$2.2-3.5/本（共用版面階梯）。</p></div>',
        '<div class="bg-green-50"><p><strong>學校應該揀邊種紙？</strong> 80gsm 道林紙係 75% 學校首選（HK$3.5/本）；70gsm 書紙適合短期大量派發，成本低約 20%。</p></div>',
        '<div class="bg-amber-50"><p><strong>交期可以有幾快？</strong> 標準 5-7 個工作天，急件 3 天 +30%，18:00 截單翌日 12:00 順豐到。</p></div>',
    ],
    'ja': [
        '<div class="bg-blue-50"><p><strong>最低数量は？</strong> 100 冊から。100 冊 HK$3.5〜5.5/冊、1,000 冊 HK$2.8〜4.0/冊、5,000 冊 HK$2.2〜3.5/冊（版共有ティア）。</p></div>',
        '<div class="bg-green-50"><p><strong>学校はどの用紙を選ぶ？</strong> 80gsm 上質紙が既定（学校の 75%、HK$3.5/冊）。短期大量配布なら 70gsm 書籍用紙で約 20% 安価。</p></div>',
        '<div class="bg-amber-50"><p><strong>納期はどのくらい？</strong> 標準 5〜7 営業日、特急 3 日 +30%、18:00 締切で翌日 12:00 順豊便。</p></div>',
    ],
}

# ── 段3 H2 问句化 ──
H2 = {
    'en': [
        ('Back-to-School 2026 Market', 'What does the 2026 back-to-school market look like?'),
        ('4 Paper Stocks', 'Which paper stock should school exercise books use?'),
        ('3 Bindings + 4 Sizes', 'Which binding and size fit your school order?'),
        ('4 Print Modes + Pricing', 'How much do exercise books cost by print mode and quantity?'),
        ('3 Real Cases 2025-2026', 'Customer Cases: what do 3 real school orders look like?'),
    ],
    'ja': [
        ('4 用紙', '4 用紙はどう選ぶ？'),
        ('3 製本 + 4 規格', '製本と規格はどう選ぶ？'),
        ('4 印刷 + 価格', '印刷モードと価格はいくら？'),
        ('3 実例', '顧客事例 3 選：実際の学校案件は？'),
    ],
    'zh-hk': [
        ('2026 Q3-Q4 開學季市場概況', '2026 Q3-Q4 開學季市場有什麼重點？'),
        ('4 種紙材點揀', '4 種紙材如何揀？'),
        ('3 種裝訂 + 4 種規格', '3 種裝訂同 4 種規格如何配合？'),
        ('4 種印刷工藝 + 12 條產品線', '4 種印刷工藝有什麼分別？'),
        ('起印量 + Q4 開學季價格梯度', 'Q4 開學季起印量同價格梯度如何分？'),
    ],
}

# ── 段4 表格1: 紙材對比 (插入紙材段 P 之後) ──
TABLE_PAPER = {
    'en': '<table class="w-full text-sm my-4 border-collapse"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Stock</th><th class="border p-2 text-left">Weight</th><th class="border p-2 text-left">Price from</th><th class="border p-2 text-left">Best for</th></tr></thead><tbody><tr><td class="border p-2">Wood-free (道林紙)</td><td class="border p-2">80gsm</td><td class="border p-2">HK$3.5/book</td><td class="border p-2">75% of schools; eye-comfort, 95% CIE whiteness</td></tr><tr><td class="border p-2">Book paper</td><td class="border p-2">70gsm</td><td class="border p-2">HK$2.8/book</td><td class="border p-2">Short-term + mass distribution; 20% cheaper</td></tr><tr><td class="border p-2">Cream wood-free</td><td class="border p-2">80gsm</td><td class="border p-2">HK$4.2/book</td><td class="border p-2">International schools + tutoring; reduced glare</td></tr><tr><td class="border p-2">Recycled FSC</td><td class="border p-2">80gsm</td><td class="border p-2">HK$4.5/book</td><td class="border p-2">ESG brands; 100% recycled, chlorine-free</td></tr></tbody></table>',
    'zh-hk': '<table class="w-full text-sm my-4 border-collapse"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">紙材</th><th class="border p-2 text-left">克重</th><th class="border p-2 text-left">起價</th><th class="border p-2 text-left">最啱場景</th></tr></thead><tbody><tr><td class="border p-2">道林紙</td><td class="border p-2">80gsm</td><td class="border p-2">HK$3.5/本</td><td class="border p-2">75% 學校首選；護眼、白度 95% CIE</td></tr><tr><td class="border p-2">書紙</td><td class="border p-2">70gsm</td><td class="border p-2">HK$2.8/本</td><td class="border p-2">短期練習＋大量派發；平 20%</td></tr><tr><td class="border p-2">米黃道林紙</td><td class="border p-2">80gsm</td><td class="border p-2">HK$4.2/本</td><td class="border p-2">國際學校＋補習社；降低反光</td></tr><tr><td class="border p-2">再生紙 FSC</td><td class="border p-2">80gsm</td><td class="border p-2">HK$4.5/本</td><td class="border p-2">ESG 品牌；100% 回收、無氯漂白</td></tr></tbody></table>',
    'ja': '<table class="w-full text-sm my-4 border-collapse"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">用紙</th><th class="border p-2 text-left">坪量</th><th class="border p-2 text-left">開始価格</th><th class="border p-2 text-left">最適シーン</th></tr></thead><tbody><tr><td class="border p-2">上質紙</td><td class="border p-2">80gsm</td><td class="border p-2">HK$3.5/冊</td><td class="border p-2">学校の 75%；目に優しい 95% CIE 白色度</td></tr><tr><td class="border p-2">書籍用紙</td><td class="border p-2">70gsm</td><td class="border p-2">HK$2.8/冊</td><td class="border p-2">短期＋大量配布；約 20% 安価</td></tr><tr><td class="border p-2">クリーム上質紙</td><td class="border p-2">80gsm</td><td class="border p-2">HK$4.2/冊</td><td class="border p-2">インターナショナル校＋塾；反射低減</td></tr><tr><td class="border p-2">再生紙 FSC</td><td class="border p-2">80gsm</td><td class="border p-2">HK$4.5/冊</td><td class="border p-2">ESG ブランド；100% 再生・無塩素漂白</td></tr></tbody></table>',
}
# ── 段4 表格2: 裝訂+規格對比 (插入裝訂段 P 之後) ──
TABLE_BIND = {
    'en': '<table class="w-full text-sm my-4 border-collapse"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Binding / Size</th><th class="border p-2 text-left">Page range</th><th class="border p-2 text-left">Surcharge</th><th class="border p-2 text-left">Best for</th></tr></thead><tbody><tr><td class="border p-2">Saddle stitch</td><td class="border p-2">8-32 pp</td><td class="border p-2">+HK$0.30/book</td><td class="border p-2">Quiz sheets, short practice books</td></tr><tr><td class="border p-2">PUR perfect</td><td class="border p-2">32-200 pp</td><td class="border p-2">+HK$0.80/book</td><td class="border p-2">Year workbooks; 180° flat, -20°C to +80°C</td></tr><tr><td class="border p-2">Wire-O</td><td class="border p-2">8-500 pp</td><td class="border p-2">+HK$1.20/book</td><td class="border p-2">Notebooks, art books; 360° flat</td></tr><tr><td class="border p-2">Sizes A4 / B5 / A5 / 16K</td><td class="border p-2">—</td><td class="border p-2">—</td><td class="border p-2">Mainstream / international+tuition / pocket / simplified-textbook</td></tr></tbody></table>',
    'zh-hk': '<table class="w-full text-sm my-4 border-collapse"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">裝訂 / 規格</th><th class="border p-2 text-left">頁數</th><th class="border p-2 text-left">加幅</th><th class="border p-2 text-left">最啱場景</th></tr></thead><tbody><tr><td class="border p-2">騎馬釘</td><td class="border p-2">8-32 頁</td><td class="border p-2">+HK$0.30/本</td><td class="border p-2">測驗卷、短期練習</td></tr><tr><td class="border p-2">PUR 膠裝</td><td class="border p-2">32-200 頁</td><td class="border p-2">+HK$0.80/本</td><td class="border p-2">學年練習簿；翻平 180°、-20°C 至 +80°C</td></tr><tr><td class="border p-2">線圈裝</td><td class="border p-2">8-500 頁</td><td class="border p-2">+HK$1.20/本</td><td class="border p-2">筆記本、美術簿；翻平 360°</td></tr><tr><td class="border p-2">規格 A4 / B5 / A5 / 16K</td><td class="border p-2">—</td><td class="border p-2">—</td><td class="border p-2">主流／國際學校＋補習／口袋／簡體教材</td></tr></tbody></table>',
    'ja': '<table class="w-full text-sm my-4 border-collapse"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">製本 / 規格</th><th class="border p-2 text-left">ページ数</th><th class="border p-2 text-left">加算</th><th class="border p-2 text-left">最適シーン</th></tr></thead><tbody><tr><td class="border p-2">中綴じ</td><td class="border p-2">8〜32 ページ</td><td class="border p-2">+HK$0.30/冊</td><td class="border p-2">テスト用紙・短期練習</td></tr><tr><td class="border p-2">PUR 無線綴じ</td><td class="border p-2">32〜200 ページ</td><td class="border p-2">+HK$0.80/冊</td><td class="border p-2">学年ワークブック；180° フラット・-20°C〜+80°C</td></tr><tr><td class="border p-2">ワイヤー綴じ</td><td class="border p-2">8〜500 ページ</td><td class="border p-2">+HK$1.20/冊</td><td class="border p-2">ノート・美術帳；360° フラット</td></tr><tr><td class="border p-2">規格 A4 / B5 / A5 / 16K</td><td class="border p-2">—</td><td class="border p-2">—</td><td class="border p-2">主流／インターナショナル＋塾／ポケット／簡体教科書</td></tr></tbody></table>',
}

# ── 新段 (EEAT + 文件规格 + Q4 时间线), 插入 Internal Links H2 前 ──
NEW = {
    'en': [
        '<h2>What file specs do exercise books need?</h2>'
        '<p>Send print-ready PDF/X-1a at <strong>300 DPI</strong> with <strong>3mm bleed</strong> on all four sides and CMYK colour; spot colours must reference Pantone numbers. Inside pages can be ruled, squared (graph) or blank — the case, grid and margin are set per grade level. Covers print CMYK on 200gsm art paper with optional lamination. Files under 500MB go through WhatsApp or WeTransfer; our prepress team checks resolution, bleed and colour profile before the digital proof.</p>'
        '<h2>Who prints the order, and what compliance applies?</h2>'
        '<p>School orders run on Heidelberg Speedmaster 5-colour presses with soy ink in our Pinghu, Shenzhen factory, led by 15-year offset engineers. Paper is FSC-certified and production follows an ISO 9001 quality system; food-contact lines meet <strong>FDA 21 CFR 175.300</strong> and EU-bound orders follow <strong>EU REACH</strong> on inks and coatings. The print engineering team is on <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn</a> — every quote in this guide traces back to the live order system, not to promotional copy.</p>'
        '<h2>When should schools place the Q4 order?</h2>'
        '<p>Back-to-school demand peaks from <strong>September to October</strong> with 10-20% bulk discounts, while orders placed after November face 5-7 extra days of lead time. For January-term schools the safe window is <strong>October to mid-November</strong>: artwork approval, 5-7 working days of production and 2-4 days of DHL delivery must all fit before the first class day. Rush lanes (3-day +30%, next-day 12PM +60%) exist, but they cost more than planning ahead — book the artwork slot before the peak week.</p>',
    ],
    'zh-hk': [
        '<h2>練習簿要交咩印刷檔案規格？</h2>'
        '<p>交 <strong>PDF/X-1a、300 DPI、四邊 3mm 出血、CMYK</strong> 色彩模式；專色要標 Pantone 編號。內頁可以揀橫線、方格或空白——行距、格仔同邊界按年級設定。封面用 200gsm 銅版紙四色印刷，可加覆膜。檔案 500MB 以下經 WhatsApp 或 WeTransfer 交；印前團隊喺數碼打稿前會逐項檢查解析度、出血同色彩設定。</p>'
        '<h2>邊個負責印，有咩合規認證？</h2>'
        '<p>學校訂單喺深圳平湖自有廠房用海德堡 Speedmaster 五色機 + 大豆油墨印，由 15 年膠印工程師帶隊。紙材全部 FSC 認證，生產行 ISO 9001 品質體系；食品接觸線符合 <strong>FDA 21 CFR 175.300</strong>，出口歐盟訂單嘅油墨同塗層符合 <strong>EU REACH</strong>。印刷工程團隊喺 <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn</a>——本指南每個報價都追溯到訂單系統實時數據，唔係宣傳文案。</p>'
        '<h2>Q4 開學季應該幾時落單？</h2>'
        '<p>開學季需求喺 <strong>9-10 月</strong>見頂，落單有 -10% 至 -20% 批量折扣；11 月後落單要多 5-7 個工作天。1 月新學期嘅學校，安全窗口係 <strong>10 月至 11 月中</strong>：打稿確認 + 5-7 個工作天生產 + 2-4 天 DHL 配送，全部要喺第一堂之前搞掂。急件通道（3 天 +30%、翌日 12:00 +60%）有，但貴過提早規劃——旺季前一週就要鎖定打稿位。</p>',
    ],
    'ja': [
        '<h2>練習帳の入稿仕様は？</h2>'
        '<p><strong>PDF/X-1a・300 DPI・四辺 3mm 塗り足し・CMYK</strong> で入稿してください。スポットカラーは Pantone 番号を明記。内側は罫線・方眼・無地から選べ、行間・マス目・余白は学年別に設定します。表紙は 200gsm アート紙に CMYK 印刷、ラミネートも可能。500MB 以下のファイルは WhatsApp または WeTransfer で送付。プリプレスチームが解像度・塗り足し・カラープロファイルを確認してからデジタル校正に進みます。</p>'
        '<h2>誰が印刷し、どんなコンプライアンスがありますか？</h2>'
        '<p>学校案件は深圳平湖の自社工場で Heidelberg Speedmaster 5 色機＋大豆インキにて印刷、15 年のオフセットエンジニアが率います。用紙はすべて FSC 認証、生産は ISO 9001 品質システムに準拠。食品接触ラインは <strong>FDA 21 CFR 175.300</strong>、EU 向け注文のインキ・コーティングは <strong>EU REACH</strong> に適合します。印刷エンジニアリングチームは <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn</a> に在籍——本ガイドの価格はすべて受注システムの実データに基づきます。</p>'
        '<h2>Q4 新学期の注文はいつ出すべき？</h2>'
        '<p>新学期需要は <strong>9〜10 月</strong>にピークを迎え、一括発注で 10〜20% 割引。11 月以降は納期が 5〜7 営業日延びます。1 月学期の学校なら <strong>10 月〜11 月中旬</strong>が安全圏：校正承認＋生産 5〜7 営業日＋DHL 2〜4 日を初日に間に合わせる必要があります。特急レーン（3 日 +30%、翌日 12:00 +60%）はありますが、計画的な発注より割高です——ピーク週の前に校正枠を押さえてください。</p>',
    ],
}

EXCERPT = {
    'en': 'School exercise book printing 2026: 4 paper stocks, 3 bindings, 4 sizes and the 100-copy MOQ ladder — with Q4 back-to-school pricing, rush options and FDA/EU REACH compliance.',
    'zh-hk': '2026 學校練習簿印刷指南：4 種紙材、3 種裝訂、4 種規格同 100 本起印階梯，附 Q4 開學季價格、急件通道同 FDA／EU REACH 合規。',
    'ja': '2026 年学校練習帳印刷ガイド：4 用紙・3 製本・4 規格・100 冊からの MOQ ティア、Q4 新学期価格、特急対応、FDA・EU REACH 適合まで。',
}
SCHEMAS = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization']

def h2_replace(c, old, new):
    pat = re.compile(r'(<h2[^>]*>)\s*' + re.escape(old) + r'\s*(</h2>)')
    if not pat.search(c):
        return None
    return pat.sub(lambda x: x.group(1) + new + x.group(2), c, count=1)

def after_first_p(c, block):
    """在第一个非 byline <p> 后插入"""
    for m in re.finditer(r'<p([^>]*)>[\s\S]*?</p>', c):
        cls = m.group(1) or ''
        txt = re.sub(r'<[^>]+>', '', m.group(0))
        if 'text-gray-600' in cls or 'text-sm text-gray' in cls or '作者' in txt or 'Last updated' in txt:
            continue
        return c[:m.end()] + '\n' + block + '\n' + c[m.end():]
    return c

ok = True
for loc in ['en', 'zh-hk', 'ja']:
    path = 'src/data/blog-data/%s.json' % loc
    raw = open(path, encoding='utf-8').read()
    has_nl = raw.endswith('\n')
    obj = json.loads(raw)
    assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity %s' % loc
    e = obj[SLUG]
    c = e['content']
    if 'Answer the market' in c or '快速答案' in c:
        print('%s already rewritten, skip' % loc)
        continue
    before = len(c)
    # 1) en 首段替换
    if loc == 'en':
        m = re.search(r'<p>Schools dread 3 pain points:[\s\S]*?</p>', c)
        if not m:
            print('EN lead NOT FOUND'); sys.exit(1)
        c = c[:m.start()] + EN_LEAD + c[m.end():]
    # 2) 段2 快速答案块
    c = after_first_p(c, '\n'.join(QA[loc]))
    # 3) H2 问句化
    for old, new in H2[loc]:
        r = h2_replace(c, old, new)
        if r is None:
            print('H2 NOT FOUND %s: %s' % (loc, old)); ok = False; continue
        c = r
    # 4) 表格插入: 紙材段 P 後 / 裝訂段 P 後
    anchors = {'en': ['4 Paper Stocks', '3 Bindings + 4 Sizes'], 'zh-hk': ['4 種紙材點揀', '3 種裝訂 + 4 種規格'], 'ja': ['4 用紙', '3 製本 + 4 規格']}
    # 用新问句后的 heading 文本定位后续 P
    heads = {k: v for k, v in H2[loc]}
    for idx, (orig, tblock) in enumerate(zip(anchors[loc], [TABLE_PAPER[loc], TABLE_BIND[loc]])):
        newh = heads.get(orig, orig)
        hm = re.search(r'<h2[^>]*>' + re.escape(newh) + r'</h2>', c)
        if not hm:
            print('TABLE anchor NOT FOUND %s: %s' % (loc, newh)); ok = False; continue
        pm = re.search(r'<p[^>]*>[\s\S]*?</p>', c[hm.end():])
        if not pm:
            print('TABLE p NOT FOUND %s' % loc); ok = False; continue
        insert_at = hm.end() + pm.end()
        c = c[:insert_at] + '\n' + tblock + c[insert_at:]
    # 5) 新段 (EEAT/文件规格/Q4) 插在 Internal Links H2 前
    il = {'en': '5 Internal Links', 'zh-hk': '相關閱讀 + 5 條內部連結', 'ja': '5 内部リンク'}[loc]
    im = re.search(r'<h2[^>]*>' + re.escape(il) + r'</h2>', c)
    if not im:
        print('IL anchor NOT FOUND %s' % loc); ok = False
    else:
        c = c[:im.start()] + '\n'.join(NEW[loc]) + '\n' + c[im.start():]
    e['content'] = c
    e['excerpt'] = EXCERPT[loc]
    e['schemas'] = SCHEMAS
    e['lastUpdated'] = NOW
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    open(path, 'w', encoding='utf-8', newline='\n').write(out)
    c2 = json.load(open(path, encoding='utf-8'))[SLUG]['content']
    assert len(c2) == len(c), 'redump %s' % loc
    print('%s: %d -> %d | excerpt=%d | schemas=%d' % (loc, before, len(c), len(EXCERPT[loc]), len(SCHEMAS)))

if not ok:
    sys.exit(1)
print()
for loc in ['en', 'zh-hk', 'ja']:
    d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
    print('%s: %d' % (loc, len(d[SLUG]['content'])))
en = len(json.load(open('src/data/blog-data/en.json', encoding='utf-8'))[SLUG]['content'])
zh = len(json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))[SLUG]['content'])
ja = len(json.load(open('src/data/blog-data/ja.json', encoding='utf-8'))[SLUG]['content'])
print('ratio: zh/en=%.0f%% ja/en=%.0f%%' % (zh / en * 100, ja / en * 100))
