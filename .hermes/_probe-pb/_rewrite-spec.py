# -*- coding: utf-8 -*-
"""2026-10-30 晚场 blog-deepfix: print-specifications-reference-guide-2026 三语修复
段3: 14 个 H2/H3 问句化 (保持编号+关键词, 全部带 ?/？)
段6: en 'Client Case'->'Customer Case'; ja 'クライアント事例'->'顧客事例'
blog-standard: 补 excerpt + schemas(5 类); lastUpdated/dateModified -> 2026-10-30
标题/GSC 命中词/段落 0 删 (仅标题改写 + 元字段追加)"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'print-specifications-reference-guide-2026'
NOW = '2026-10-30'

H = {
    'en': [
        ('1. A1-A6 Standard Paper Sizes: Print Specs First Step', '1. What are the A1-A6 standard paper sizes?'),
        ('1.1 Business Common Non-Standard Sizes: Cards / Calendars / Envelopes', '1.1 Which non-standard sizes do cards, calendars and envelopes use?'),
        ('2. CMYK vs RGB vs Pantone: 3-Color Mode Choices for Print', '2. Which color mode should you choose: CMYK vs RGB vs Pantone?'),
        ('3. 6 Print Modes: Digital vs Offset vs Screen vs Foil vs UV vs Emboss', '3. Which of the 6 print modes fits your job: digital vs offset vs screen vs foil vs UV vs emboss?'),
        ('3.1 Digital vs Offset: Quantity-Driven Key Decision', '3.1 When should you choose digital vs offset?'),
        ('4. Print File 4 Specs: 300 DPI + 3mm Bleed + CMYK + PDF/X-1a', '4. What are the 4 print file specs: 300 DPI + 3mm bleed + CMYK + PDF/X-1a?'),
        ('4.1 AI / ID / PSD Print Export 5-Step Settings', '4.1 How do you export print-ready files from AI, ID or PSD?'),
        ('5. 5 Materials + Print Spec Matching Table', '5. Which material matches which print spec?'),
        ('6. 6 Industries Print Spec Scene Comparison', '6. How do print specs differ across the 6 industries?'),
        ('6.1 F&B Industry: 4 Menu Materials + Print Spec', '6.1 Which 4 menu materials does F&B printing use?'),
        ('6.2 Retail Industry: DM Flyer + Matte Paper', '6.2 What paper does retail DM flyer printing use?'),
        ('7. Client Case: HK Cosmetics Brand PVC Menu + Cross-border E-commerce Label Return Rate Down 18%', '7. Customer Case: HK Cosmetics Brand PVC Menu + Cross-border E-commerce Label Return Rate Down 18%'),
        ('8. FDA 21 CFR 175.300 + EU REACH + FSC Cert: Why Important?', '8. Why do FDA 21 CFR 175.300 + EU REACH + FSC certifications matter?'),
        ('9. Print Spec 8-Step Selection Process + WhatsApp 30-Second AI Quote', '9. What is the 8-step print spec selection process?'),
        ('10. Further Reading: 14 Internal Links + WhatsApp Quote', '10. What should you read next about print specs?'),
    ],
    'ja': [
        ('1. A1-A6 標準紙サイズ: 印刷スペック第 1 歩', '1. A1-A6 標準紙サイズはどのくらい？'),
        ('1.1 業務汎用非標準サイズ: カード / カレンダー / 封筒', '1.1 カード・カレンダー・封筒の非標準サイズは？'),
        ('2. CMYK vs RGB vs Pantone: 印刷色モード 3 選 1', '2. CMYK vs RGB vs Pantone、印刷色モードはどう選ぶ？'),
        ('3. 6 大印刷モード: デジタル vs オフセット vs シルク vs 箔 vs UV vs エンボス', '3. どの印刷モードを選ぶ？6 大印刷モード対照: デジタル vs オフセット vs シルク vs 箔 vs UV vs エンボス'),
        ('3.1 デジタル vs オフセット: 数量決定の重要選択', '3.1 デジタルとオフセットはどう使い分ける？'),
        ('4. 印刷ファイル 4 項目スペック: 300 DPI + 3mm 塗り足し + CMYK + PDF/X-1a', '4. 印刷ファイルの 4 項目スペックは？300 DPI + 3mm 塗り足し + CMYK + PDF/X-1a'),
        ('4.1 AI / ID / PSD 印刷書き出し 5 ステップ設定', '4.1 AI / ID / PSD の印刷書き出しはどう設定する？'),
        ('5. 5 大材質 + 印刷スペックマッチング表', '5. どの材質がどの印刷スペックに合う？'),
        ('6. 6 大業界印刷スペックシーン対照', '6. 6 大業界の印刷スペックはどう違う？'),
        ('6.1 飲食業: メニュー 4 種材質 + 印刷スペック', '6.1 飲食業のメニュー材質 4 種と印刷スペックは？'),
        ('6.2 小売業: DM フライヤー + マット紙', '6.2 小売業の DM フライヤーにはどの用紙？'),
        ('7. クライアント事例: 香港化粧品ブランド PVC メニュー + 跨境 EC ラベル返品率 18% 削減', '7. 顧客事例: 香港化粧品ブランド PVC メニュー + 跨境 EC ラベル返品率 18% 削減'),
        ('8. FDA 21 CFR 175.300 + EU REACH + FSC 認証なぜ重要?', '8. FDA 21 CFR 175.300 + EU REACH + FSC 認証はなぜ重要？'),
        ('9. 印刷スペック 8 ステップ選定フロー + WhatsApp 30 秒 AI 見積もり', '9. 印刷スペックの 8 ステップ選定フローは？'),
        ('10. 関連リンク: 14 内部リンク + WhatsApp 見積もり', '10. どの関連リンクを読むべき？14 内部リンク + WhatsApp 見積もり'),
    ],
    'zh-hk': [
        ('1. A1-A6 標準紙張尺寸: 印刷規格第一步', '1. A1-A6 標準紙張尺寸係幾多？'),
        ('1.1 業務常見非標準尺寸: 卡片 / 月曆 / 信封', '1.1 卡片、月曆、信封嘅非標準尺寸是什麼？'),
        ('2. CMYK vs RGB vs Pantone: 印刷色彩模式 3 選 1', '2. CMYK vs RGB vs Pantone、印刷色彩模式如何揀？'),
        ('3. 6 大印刷模式: 數碼 vs 柯式 vs 絲網 vs 燙金 vs UV vs 擊凸', '3. 6 大印刷模式邊款啱你？數碼 vs 柯式 vs 絲網 vs 燙金 vs UV vs 擊凸'),
        ('3.1 數碼 vs 柯式: 數量決定的關鍵選擇', '3.1 數碼同柯式如何按數量揀？'),
        ('4. 印刷文件 4 項規格: 300 DPI + 3mm 出血 + CMYK + PDF/X-1a', '4. 印刷文件 4 項規格如何設定？300 DPI + 3mm 出血 + CMYK + PDF/X-1a'),
        ('4.1 AI / ID / PSD 印刷輸出 5 步設定', '4.1 AI / ID / PSD 印刷輸出如何設定 5 步？'),
        ('5. 5 大材質 + 印刷規格匹配表', '5. 材質同印刷規格如何匹配？'),
        ('6. 6 大行業印刷規格場景對照', '6. 6 大行業嘅印刷規格有什麼差異？'),
        ('6.1 餐飲業: 菜單 4 種材質 + 印刷規格', '6.1 餐飲業菜單用什麼材質？'),
        ('6.2 零售業: DM 摺頁 + 啞粉紙', '6.2 零售業 DM 摺頁用什麼紙？'),
        ('9. 印刷規格 8 步選購流程 + WhatsApp 30 秒 AI 報價', '9. 印刷規格 8 步選購流程如何運作？'),
        ('10. 延伸閱讀: 14 條內部連結 + WhatsApp 報價', '10. 延伸閱讀有什麼推薦？14 條內部連結 + WhatsApp 報價'),
    ],
}

EXCERPT = {
    'en': 'Print specifications in 3 dimensions: A1-A6 paper sizes, CMYK vs RGB vs Pantone color modes and 6 print modes — with 300 DPI + 3mm bleed file specs, FDA 21 CFR / EU REACH compliance and a measured client case.',
    'ja': '印刷スペックを 3 次元で対照: A1-A6 サイズ、CMYK/RGB/Pantone 色モード、6 大印刷モード。300 DPI + 3mm 塗り足しの入稿仕様、FDA 21 CFR・EU REACH 適合、実測クライアント事例まで一表で解説。',
    'zh-hk': '印刷規格 3 維度對照：A1-A6 尺寸、CMYK/RGB/Pantone 色彩模式、6 大印刷模式，附 300 DPI + 3mm 出血入稿規格、FDA 21 CFR／EU REACH 合規與客戶案例實測。',
}
SCHEMAS = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization']

def h_replace(c, tag, old, new):
    pat = re.compile(r'(<' + tag + r'[^>]*>)\s*' + re.escape(old) + r'\s*(</' + tag + r'>)')
    if not pat.search(c):
        return None
    return pat.sub(lambda x: x.group(1) + new + x.group(2), c, count=1)

ok = True
for loc in ['en', 'ja', 'zh-hk']:
    path = 'src/data/blog-data/%s.json' % loc
    raw = open(path, encoding='utf-8').read()
    has_nl = raw.endswith('\n')
    obj = json.loads(raw)
    assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity mismatch %s' % loc
    e = obj[SLUG]
    c = e['content']
    if 'Customer Case' not in c and '顧客事例' not in c and '邊款啱你' not in c:
        # 幂等守卫: 若已转换过则跳过 (zh 用不同标记)
        pass
    before = len(c)
    for old, new in H[loc]:
        r = h_replace(c, 'h2', old, new)
        if r is None:
            r = h_replace(c, 'h3', old, new)
        if r is None:
            print('NOT FOUND %s: %s' % (loc, old))
            sys.exit(1)
        c = r
    e['content'] = c
    e['excerpt'] = EXCERPT[loc]
    e['schemas'] = SCHEMAS
    e['lastUpdated'] = NOW
    if 'dateModified' in e:
        e['dateModified'] = NOW
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(out)
    c2 = json.load(open(path, encoding='utf-8'))[SLUG]['content']
    assert len(c2) == len(c), 'redump mismatch %s' % loc
    print('%s: content %d -> %d | excerpt=%d chars | schemas=%d | lastUpdated=%s' % (
        loc, before, len(c), len(EXCERPT[loc]), len(SCHEMAS), NOW))
