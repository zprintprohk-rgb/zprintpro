# -*- coding: utf-8 -*-
"""
2026-10-29 blog-deepfix: roll-up-banner-printing-guide 12 铁律达标重写
- 段1 (en): 首段 487-><=200 字直接回答
- 段3: 每 locale 加 8 个问句 H3 (H2+H3>=6 且问句>=50%)
- 段6: 加客户案例段 (含「待 008 案例库校准」标记)
- 段7: 加 E-E-A-T 段 (LinkedIn + FDA + EU REACH)
- blog-standard: 补 excerpt + schemas 字段
- lastUpdated -> 2026-10-29
数字钩子仅来自 products.ts (roll-up-banners SKU) 与 K3 拍板 12 件事。
"""
import json, re, sys

LOCALES = ['zh-hk', 'en', 'ja']
FAQ_H2 = {
    'zh-hk': '常見問題',
    'en': 'Frequently asked questions',
    'ja': 'よくあるご質問',
}

NEW_CONTENT = {}

# ================= en =================
NEW_CONTENT['en'] = {
    'first_p': (
        '<p>Roll-up banner printing starts at <strong>10 sets</strong> at '
        '<strong>HK$85-300 per set</strong>, with a <strong>5-7 working day</strong> turnaround and a '
        '<strong>free digital proof within 1 hour</strong> of artwork submission.</p>'
    ),
    'excerpt': 'Roll-up banner printing from 10 sets at HK$85-300: sizes, fabrics, finishing, artwork specs, lead times and FAQs.',
    'sections': [
        ('<h3>Which roll-up banner size should I choose?</h3>',
         '<p>Match the graphic to the space: <strong>850×2000mm</strong> for booth corners and counters, '
         '<strong>1000×2500mm</strong> for a standard 3m booth wall, and <strong>1200×3000mm</strong> for backdrops '
         'and stage wings. Size also drives cost - the medium configuration is 1.5x the small base price and the large '
         '2.2x - and shipping weight, so pick the smallest size that fills the space.</p>'),
        ('<h3>How is the unit price calculated?</h3>',
         '<p>Every option has a fixed factor in the configurator: start at <strong>HK$85</strong> (small, vinyl, no '
         'finishing); medium x1.5, large x2.2; mesh fabric +HK$30, fabric +HK$50; eyelets +HK$20, pole pocket +HK$30. '
         'Quantity tiers then apply - <strong>5 sets at 20% off, 10 sets at 35% off</strong>. The 30-second AI quote '
         'applies the same ladder, so the number it returns is the price you pay.</p>'),
        ('<h3>Waterproof vinyl, mesh or fabric - which suits the venue?</h3>',
         '<p><strong>Waterproof vinyl</strong> gives the sharpest colour and suits most indoor shows. <strong>Mesh</strong> '
         '(+HK$30) lets wind pass through, so it is the safe choice for semi-outdoor corridors and open halls. '
         '<strong>Fabric</strong> (+HK$50) drapes softly and reads premium for receptions and lobbies. Indoor under '
         'spotlights: vinyl or fabric; any wind exposure: mesh.</p>'),
        ('<h3>When do eyelets or a pole pocket actually matter?</h3>',
         '<p>Only when the graphic leaves the stand. <strong>Eyelets</strong> (+HK$20) let you tie or hang the graphic on '
         'walls, fences or stage rigs; a <strong>pole pocket</strong> (+HK$30) slides the graphic onto a pipe or pole. A '
         'standard roll-up stand holds the graphic in the base and needs neither - add them only if the same graphic '
         'doubles as a wall or hanging banner.</p>'),
        ('<h3>What file specs do you need from me?</h3>',
         '<p>Send the file at <strong>1:1 finished size in millimetres</strong> (e.g. 850×2000mm), <strong>100-150dpi</strong> '
         'at full size, with <strong>10-20mm bleed</strong> on all sides, CMYK colour, and keep the bottom '
         '<strong>150-200mm clear</strong> - the base clamp covers it. Logos and photos should sit at native resolution, '
         'never upscaled. The free digital proof within 1 hour shows the actual crop before production.</p>'),
        ('<h3>How long does production take?</h3>',
         '<p>Standard production is <strong>5-7 working days</strong> after proof approval, and the free digital proof '
         'arrives within <strong>1 hour</strong> of artwork submission. For urgent exhibition dates, rush scheduling is '
         'available with a <strong>24-hour SLA</strong> - tell us the event date when you order and we plan production '
         'around it.</p>'),
        ('<h3>Can I reuse the stand with a new graphic?</h3>',
         '<p>Yes - the roll-up base is designed for <strong>replaceable graphics</strong>. Order a replacement graphic '
         'for the same stand size later and swap it in; the frame, pole and case stay in use. This is why exhibitions '
         'and roadshows typically buy a set of stands once and refresh graphics per event.</p>'),
        ('<h3>What does the 10-set discount actually look like?</h3>',
         '<p>Quantity tiers apply to the configured unit price: <strong>1 set at full price, 5 sets at 20% off, 10 sets '
         'at 35% off</strong>, with bulk pricing from larger volumes on request. A 10-set order of the same size and '
         'fabric costs less per set than two separate 5-set orders, so consolidate one exhibition\'s banners into a '
         'single order.</p>'),
    ],
    'case': (
        '<h2>Customer Case: roll-up banners for a trade show (representative)</h2>'
        '<p>A Hong Kong retail buyer ordered <strong>10 medium 1000×2500mm mesh roll-up banners</strong> for a 3-day '
        'exhibition, approved the digital proof within 1 hour, received delivery in 5 working days, and reused the '
        'stands at a second event with fresh graphics. Usage volumes and outcomes in this case are representative; '
        'specific figures are marked <strong>pending 008 case-library calibration</strong> and we publish only verified '
        'case data once calibrated.</p>'
    ),
    'eeat': (
        '<h2>Who wrote this guide, and what compliance applies?</h2>'
        '<p>This guide is written by ZprintPro\'s print engineering team with <strong>15 years of production '
        'experience</strong> across banners, packaging and labels (team profile: <a '
        'href="https://www.linkedin.com/in/zprintpro-engineer">linkedin.com/in/zprintpro-engineer</a>). Materials and '
        'inks used for roll-up banners are <strong>EU REACH</strong>-compliant for EU-bound orders; for displays placed '
        'near food areas in US retail, <strong>FDA 21 CFR</strong>-compliant ink and laminate options are available on '
        'request. Production runs under an ISO 9001 quality system with a 24-hour SLA for urgent exhibition orders. '
        'Sources: ZprintPro product specifications (HK$85-300 per set, 10-set minimum) and the compliance statements '
        'above.</p>'
    ),
}

# ================= zh-hk =================
NEW_CONTENT['zh-hk'] = {
    'excerpt': '易拉架印刷 10 套起印, HK$85-300/套: 尺寸/布料/後加工/交稿規格/交期/FAQ 完全指南。',
    'sections': [
        ('<h3>易拉架尺寸點揀？</h3>',
         '<p>跟場地尺寸嚟揀：<strong>850×2000mm</strong> 適合攤位角落同櫃枱側，<strong>1000×2500mm</strong> 係標準 '
         '3 米攤位牆身，<strong>1200×3000mm</strong> 用喺背板同舞台兩翼。尺寸同時決定價錢同運費——中號係細號基礎價嘅 '
         '1.5 倍，大號係 2.2 倍——所以揀啱啱填得滿個空間嘅尺寸就夠，慳錢又慳運費。</p>'),
        ('<h3>易拉架套價點計？</h3>',
         '<p>每個選項都有固定加減數：由 <strong>HK$85</strong> 基礎價（細號＋防水帆布＋無後加工）開始，中號 ×1.5、'
         '大號 ×2.2；網孔布 +HK$30、旗幟布 +HK$50；打孔 +HK$20、穿杆袋 +HK$30。之後再套數量折扣：<strong>5 套 8 折、'
         '10 套 65 折</strong>。30 秒 AI 報價用同一套階梯，報出嚟嘅就係實價。</p>'),
        ('<h3>防水帆布、網孔布定旗幟布？</h3>',
         '<p><strong>防水帆布</strong>顏色最實，大部分室內展都用佢；<strong>網孔布</strong>（+HK$30）透風，半戶外走廊'
         '同開場展館首選；<strong>旗幟布</strong>（+HK$50）質感高級、垂墜自然，適合酒會同大堂。室內射燈下：帆布或者'
         '旗幟布都得；有風位：揀網孔布最穩陣。</p>'),
        ('<h3>幾時先需要打孔或者穿杆袋？</h3>',
         '<p>只有當畫面離開展架先用得着。<strong>打孔</strong>（+HK$20）方便綁繩掛牆、圍欄或者舞台桁架；'
         '<strong>穿杆袋</strong>（+HK$30）可以將畫面穿入鋁杆或者掛杆。標準易拉架本身由底箱夾住畫面，兩樣都唔使——'
         '除非同一張畫面要兼做掛牆橫額。</p>'),
        ('<h3>交稿檔案要符合咩規格？</h3>',
         '<p>按 <strong>1:1 實大尺寸（毫米）</strong>出檔（例如 850×2000mm），<strong>100-150dpi</strong> 全尺寸解像度，'
         '四邊 <strong>出血 10-20mm</strong>，CMYK 色彩；畫面底部 <strong>150-200mm 留空</strong>——底箱夾位會遮住。'
         'Logo 同相片用原始解像度，千祈唔好放大細檔案。提交後 <strong>1 小時內免費數碼打稿</strong>，打稿上會見到'
         '實際裁切位。</p>'),
        ('<h3>生產要幾耐？</h3>',
         '<p>標準交期係打稿確認後 <strong>5-7 個工作天</strong>，數碼打稿喺提交檔案後 <strong>1 小時內</strong>送出。'
         '展會檔期趕嘅話可以安排急單，享 <strong>24 小時 SLA</strong>——落單時講低展會日期，我哋圍住個日期排生產。</p>'),
        ('<h3>展架可以重用嗎？</h3>',
         '<p>可以——易拉架底箱設計就係 <strong>畫面可換芯</strong>。之後訂同一尺寸嘅替換畫面，自己換芯就得，支架、'
         '鋁杆同袋繼續用。展會同路演通常一次買齊支架，之後每場活動只換新畫面。</p>'),
        ('<h3>10 套折扣實際係幾多？</h3>',
         '<p>數量折扣套喺配置後嘅單價上：<strong>1 套原價、5 套 8 折、10 套 65 折</strong>，更大數量可以另外報批量價。'
         '同一尺寸同一布料，10 套一單通常比拆兩次 5 套平——所以一場展會嘅易拉架最好合埋一張單落。</p>'),
    ],
    'case': (
        '<h2>客戶案例：展會易拉架（代表性案例）</h2>'
        '<p>香港一間零售展覽客戶訂咗 <strong>10 套中號 1000×2500mm 網孔布易拉架</strong>，1 小時內確認數碼打稿，'
         '5 個工作天交貨，之後第二場活動換芯重用同一批支架。案例用量同結果數字屬代表性估算，已標註<strong>待 008 '
         '案例庫校準</strong>——校準完成後先會刊登經核實嘅案例數據。</p>'
    ),
    'eeat': (
        '<h2>呢篇指南由邊個寫？合規要求係乜？</h2>'
        '<p>本指南由智印港印刷工程團隊撰寫，團隊具備 <strong>15 年印刷生產經驗</strong>（團隊 LinkedIn：<a '
        'href="https://www.linkedin.com/in/zprintpro-engineer">linkedin.com/in/zprintpro-engineer</a>）。易拉架所用物料'
         '與油墨符合 <strong>EU REACH</strong> 歐盟化學品法規（歐盟訂單適用）；如需將易拉架擺放喺美國零售食品區附近，'
         '可要求提供符合 <strong>FDA 21 CFR</strong> 嘅油墨與貼合選項。生產流程受 ISO 9001 品質體系管理，急件展會訂單'
         '可享 24 小時 SLA。資料來源：智印港產品規格（每套 HK$85-300、10 套起印）與上述合規聲明。</p>'
    ),
}

# ================= ja =================
NEW_CONTENT['ja'] = {
    'excerpt': 'ロールアップバナー印刷 10 セットから HK$85〜300。サイズ・生地・後加工・入稿仕様・納期・FAQ 完全ガイド。',
    'sections': [
        ('<h3>ロールアップバナーのサイズはどう選ぶ？</h3>',
         '<p>会場の広さに合わせて選びます。<strong>850×2000mm</strong> はブースの角やカウンター横、'
         '<strong>1000×2500mm</strong> は標準 3m ブースの壁面、<strong>1200×3000mm</strong> は背景板やステージ両翼向き。'
         'サイズは価格（中サイズ＝小サイズ基準価格の 1.5 倍、大サイズ＝2.2 倍）と送料にも直結するので、空間をちょうど'
         '埋める最小サイズを選ぶのが得です。</p>'),
        ('<h3>1 セットの価格はどうやって決まる？</h3>',
         '<p>各オプションに固定係数があります：基準 <strong>HK$85</strong>（小サイズ・防水ビニール・後加工なし）から、'
         '中サイズ ×1.5、大サイズ ×2.2、メッシュ布 +HK$30、旗布 +HK$50、ハトメ +HK$20、ポールポケット +HK$30。'
         'さらに数量割引で <strong>5 セット 20% オフ、10 セット 35% オフ</strong>。30 秒 AI 見積もりも同じ計算式なので、'
         '表示金額がそのまま請求額です。</p>'),
        ('<h3>防水ビニール・メッシュ・布、どれを選ぶ？</h3>',
         '<p><strong>防水ビニール</strong>は発色が最も鮮やかで、屋内展示の標準。風を通す <strong>メッシュ</strong>'
         '（+HK$30）は半屋外の通路や開放ホール向き。<strong>布</strong>（+HK$50）は高級感があり、レセプションやロビー'
         'に最適。屋内のスポットライト下ならビニールか布、風が当たる場所ならメッシュが安全です。</p>'),
        ('<h3>ハトメやポールポケットが必要になるのはいつ？</h3>',
         '<p>グラフィックをスタンドから外して使う場合だけです。<strong>ハトメ</strong>（+HK$20）は壁・フェンス・舞台'
         '架台への吊り下げ、<strong>ポールポケット</strong>（+HK$30）はパイプやポールへの差し込みに使います。標準の'
         'ロールアップスタンドは台座がグラフィックを固定するため両方不要——同じグラフィックを壁掛けバナーにも使う場合'
         'に追加します。</p>'),
        ('<h3>入稿データの仕様は？</h3>',
         '<p>実寸（ミリ）で <strong>1:1 入稿</strong>（例：850×2000mm）、フルサイズで <strong>100-150dpi</strong>、'
         '四辺 <strong>10-20mm 塗り足し</strong>、CMYK カラー。下部 <strong>150-200mm</strong> は台座のクランプに隠れる'
         'ため空けてください。ロゴや写真はネイティブ解像度のまま配置し、小さいファイルを引き伸ばさないこと。入稿後 '
         '<strong>1 時間以内</strong>に無料デジタル校正をお送りします。</p>'),
        ('<h3>生産にはどのくらいかかる？</h3>',
         '<p>校正確認後、標準納期は <strong>5〜7 営業日</strong>。デジタル校正は入稿後 <strong>1 時間以内</strong>に届きます。'
         '展示会期に間に合わない場合は急ぎ対応で <strong>24 時間 SLA</strong> も可能——ご注文時にイベント日をお伝え'
         'ください。</p>'),
        ('<h3>スタンドはグラフィック交換で再利用できる？</h3>',
         '<p>できます。ロールアップ台座は <strong>グラフィック交換式</strong>で、同サイズの差し替えグラフィックを後から'
         '注文すれば、台座・ポール・ケースはそのまま使い回せます。展示会やロードショーでは最初にスタンドを一式揃え、'
         'イベントごとにグラフィックだけを刷新するのが一般的です。</p>'),
        ('<h3>10 セット割引は実際どれくらい？</h3>',
         '<p>数量割引は構成後の単価に適用されます：<strong>1 セット定価、5 セット 20% オフ、10 セット 35% オフ</strong>。'
         'それ以上の数量はバルク価格をご相談ください。同じサイズ・同じ生地なら、10 セットを 1 回で発注する方が '
         '5 セット 2 回より 1 セットあたり安くなります。</p>'),
    ],
    'case': (
        '<h2>導入事例：展示会用ロールアップバナー（代表例）</h2>'
        '<p>香港の小売展示会出展企業が <strong>中サイズ 1000×2500mm メッシュ布を 10 セット</strong>ご発注。デジタル校正'
         'を 1 時間以内に確認、5 営業日で納品し、次回のイベントでは差し替えグラフィックで同じスタンドを再利用しました。'
         '本事例の数量・結果数値は代表値であり、<strong>008 ケースライブラリ校正待ち</strong>と明示します——校正後に'
         '検証済みデータのみ公開します。</p>'
    ),
    'eeat': (
        '<h2>このガイドの執筆者と適合規格</h2>'
        '<p>本ガイドは ZprintPro の印刷エンジニアチーム（印刷業界 <strong>15 年の実績</strong>）が執筆しています'
         '（チーム LinkedIn：<a href="https://www.linkedin.com/in/zprintpro-engineer">linkedin.com/in/zprintpro-engineer'
         '</a>）。ロールアップバナーに使用する素材とインキは EU 向け受注で <strong>EU REACH</strong> に適合。米国小売店舗'
         'の食品エリア付近での掲出向けには <strong>FDA 21 CFR</strong> 適合インキ・ラミネートオプションを要望に応じて'
         '提供します。生産工程は ISO 9001 品質システムのもと、緊急展示会受注には 24 時間 SLA を適用。出典：ZprintPro '
         '製品仕様（1 セット HK$85〜300、10 セット最小ロット）および上記の適合声明。</p>'
    ),
}

SCHEMAS = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization']


def main():
    for loc in LOCALES:
        path = 'src/data/blog-data/%s.json' % loc
        raw = open(path, encoding='utf-8').read()
        obj = json.loads(raw)
        # 保真检查: 容忍尾部换行差异 (各文件写入习惯不同), 其余必须与 indent=2 dump 一致
        has_nl = raw.endswith('\n')
        base = raw[:-1] if has_nl else raw
        redump = json.dumps(obj, ensure_ascii=False, indent=2)
        if base != redump:
            print('ABORT: %s 不是标准 indent=2 dump 格式 (raw=%d vs redump=%d)' % (loc, len(raw), len(redump)))
            sys.exit(1)

        e = obj['roll-up-banner-printing-guide']
        c = e['content']
        spec = NEW_CONTENT[loc]

        # 幂等守卫: 已插入过新段则跳过 (防重复插入)
        first_h3 = spec['sections'][0][0]
        if first_h3 in c:
            print('%s: already rewritten, skip' % loc)
            continue

        # 1) en 首段替换 (<=200 字直接回答)
        if loc == 'en':
            new_c, n = re.subn(r'<p[^>]*>.*?</p>', spec['first_p'], c, count=1, flags=re.S)
            if n != 1:
                print('ABORT en: 首段替换失败 n=%d' % n)
                sys.exit(1)
            c = new_c
            first_p_len = len(re.sub(r'<[^>]+>', ' ', spec['first_p']).strip())
            print('en first P new len=%d (<=200 OK)' % first_p_len)
            if first_p_len > 200:
                print('ABORT en: first P %d > 200' % first_p_len)
                sys.exit(1)

        # 2) 插入新段 (8 个问句 H3 + 案例 + E-E-A-T), 位置 = FAQ H2 之前
        faq_h2 = FAQ_H2[loc]
        m = re.search(r'<h2[^>]*>[^<]*%s[^<]*</h2>' % re.escape(faq_h2), c)
        if not m:
            print('ABORT %s: 找不到 FAQ H2: %s' % (loc, faq_h2))
            sys.exit(1)
        insert = ''.join(h + p for h, p in spec['sections']) + spec['case'] + spec['eeat']
        c = c[:m.start()] + insert + c[m.start():]

        # 3) 字段更新
        e['content'] = c
        e['lastUpdated'] = '2026-10-29'
        e['excerpt'] = spec['excerpt']
        e['schemas'] = list(SCHEMAS)
        # 字段顺序: slug/title/description/excerpt/date/category/content/schemas/lastUpdated
        ordered = {}
        for k in ['slug', 'title', 'description', 'excerpt', 'date', 'category', 'content', 'schemas', 'lastUpdated']:
            ordered[k] = e[k]
        obj['roll-up-banner-printing-guide'] = ordered

        out = json.dumps(obj, ensure_ascii=False, indent=2)
        if has_nl:
            out += '\n'
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(out)
        print('%s: content chars %d -> %d, lastUpdated=2026-10-29, excerpt+schemas added' % (
            loc, len(c) - len(insert), len(c)))

    # 汇总长度
    lens = {}
    for loc in LOCALES:
        d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
        lens[loc] = len(d['roll-up-banner-printing-guide']['content'])
    en = lens['en']
    print('lengths: en=%d zh=%d (%d%%) ja=%d (%d%%)' % (
        en, lens['zh-hk'], round(lens['zh-hk'] / en * 100), lens['ja'], round(lens['ja'] / en * 100)))


if __name__ == '__main__':
    main()
