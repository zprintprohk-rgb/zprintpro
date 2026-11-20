# -*- coding: utf-8 -*-
# category-seo-content.ts price-truth patch: paper-bags + posters in-page prices -> SSoT/live anchors
# SSoT anchors: kraft zh8/en1.84/ja240 | white-card zh12/en2/ja360 | gift zh20/en4/ja600
# posters: A2 157g HK$9起/张 | A1 HK$45起/张 (live PDP headlines)
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
P = r'F:\zprintpro-nextjs\src\data\category-seo-content.ts'
t = open(P, encoding='utf-8').read()

edits = [
    # ---- paperBagsContent ----
    # L3598 zh featuredSnippet
    ("牛皮紙袋 HK$1.5/個起 (200g 自帶環保文創感)", "牛皮紙袋 HK$8/個起 (200g 自帶環保文創感)"),
    ("白卡紙袋 HK$1.8/個起 (250g 印刷精細)", "白卡紙袋 HK$12/個起 (250g 印刷精細)"),
    ("珠光燙金升級款 HK$3.5/個起 (婚禮回禮適用)", "珠光燙金升級款 HK$20/個起 (婚禮回禮適用)"),
    # L3616 zh coreAdvantages
    ("1,000 個以上柯式印刷，單價低至 HK$1.5/個，適合零售連鎖和大型活動", "1,000 個以上柯式印刷，單價低至 HK$3/個，適合零售連鎖和大型活動"),
    # L3679 zh buyingGuide
    ("四色柯式印刷 1,000 個以上最抵，單價低至 HK$1.5/個；", "四色柯式印刷 1,000 個以上最抵，單價低至 HK$3/個；"),
    # L3694 zh FAQ
    ("100 個起訂（數碼印刷）。1,000 個以上柯式印刷更經濟，單價低至 HK$1.5/個。", "100 個起訂（數碼印刷）。1,000 個以上柯式印刷更經濟，單價低至 HK$3/個。"),
    # L3705 zh FAQ full
    ("a: '數碼印刷 100 個起印，HK$1.8-3.5/個；柯式印刷 1,000 個以上 HK$1.5/個 起，5,000 個以上階梯折扣 15-25%。具體報價看尺寸、材質、提手。'",
     "a: '數碼印刷 100 個起印，HK$8 起/個；柯式印刷 1,000 個以上單價可低至 HK$3/個，大量訂單另有階梯折扣。具體報價看尺寸、材質、提手。'"),
    # L3708 zh FAQ
    ("牛皮紙 (200g) 自帶環保文創感，HK$1.5/個 起最經濟，適合咖啡店、手作品牌；白卡紙 (250g) 印刷精細 HK$1.8/個 起，服裝美妝首選；珠光紙 + 燙金升級款 HK$3.5/個 起，婚禮回禮適用。",
     "牛皮紙 (200g) 自帶環保文創感，HK$8/個 起最經濟，適合咖啡店、手作品牌；白卡紙 (250g) 印刷精細 HK$12/個 起，服裝美妝首選；珠光紙 + 燙金升級款 HK$20/個 起，婚禮回禮適用。"),
    # L3712 en featuredSnippet
    ("kraft paper bags from US$0.19 each (200g eco-friendly kraft)", "kraft paper bags from US$1.84 each (200g eco-friendly kraft)"),
    ("white card bags from US$0.23 each (250g premium print)", "white card bags from US$2 each (250g premium print)"),
    ("pearl foil gift bags from US$0.45 each (wedding favor upgrade)", "pearl foil gift bags from US$4 each (wedding favor upgrade)"),
    # L3730 en coreAdvantages
    ("1,000+ pcs offset printing, unit price as low as US$0.19/pc for retail chains and large events.",
     "1,000+ pcs offset printing, unit price from US$1.84/pc for retail chains and large events."),
    # L3805 en FAQ
    ("100 pcs (digital printing). 1,000+ pcs recommended for offset, as low as US$0.19/pc.",
     "100 pcs (digital printing). 1,000+ pcs recommended for offset, from US$1.84/pc."),
    # L3816 en FAQ full
    ("Digital printing from 100 pcs starts at US$0.23/pc. Offset runs of 1,000+ drop to US$0.19/pc. 5,000+ volumes unlock 15-25% tier discounts. Final price depends on size, paper, and handle.",
     "Digital printing from 100 pcs starts at US$2/pc. Offset runs of 1,000+ from US$1.84/pc. 5,000+ volumes unlock additional tier discounts. Final price depends on size, paper, and handle."),
    # L3819 en FAQ
    ("200gsm kraft paper is the most economical at US$0.19/pc for 1,000+ — perfect for coffee shops, eco brands, and handmade goods. White card (250gsm) at US$0.23/pc suits fashion/beauty retail. Pearl paper + foil stamping (US$0.45/pc) is the wedding favor upgrade.",
     "200gsm kraft paper is the most economical from US$1.84/pc for 1,000+ — perfect for coffee shops, eco brands, and handmade goods. White card (250gsm) from US$2/pc suits fashion/beauty retail. Pearl paper + foil stamping (US$4/pc) is the wedding favor upgrade."),
    # L3823 ja featuredSnippet
    ("クラフト紙袋 1個 ¥22 から", "クラフト紙袋 1個 ¥240 から"),
    ("白カード紙袋 1個 ¥28 から", "白カード紙袋 1個 ¥360 から"),
    ("パール箔押し 1個 ¥55 から", "パール箔押し 1個 ¥600 から"),
    # L3841 ja coreAdvantages
    ("1,000個以上はオフセット印刷で、単価HK$1.5／個までお得。小売チェーンや大規模イベントに最適。",
     "1,000個以上はオフセット印刷で、単価¥240〜。小売チェーンや大規模イベントに最適。"),
    # L3915 ja FAQ
    ("100個から（デジタル印刷）。1,000個以上はオフセット印刷がお得で、単価HK$1.5／個まで。",
     "100個から（デジタル印刷）。1,000個以上はオフセット印刷がお得で、単価¥240〜。"),
    # L3926 ja FAQ full
    ("デジタル印刷100個から HK$1.8/個〜。オフセット印刷1,000個以上はHK$1.5/個〜、5,000個以上は15-25%の段階割引あり。最終単価はサイズ・材質・取っ手により異なります。",
     "デジタル印刷100個から ¥240〜。オフセット印刷1,000個以上は¥240〜、5,000個以上は段階割引あり。最終単価はサイズ・材質・取っ手により異なります。"),
    # L3929 ja FAQ
    ("200gクラフト紙が一番お得で HK$1.5/個〜（1,000個以上）、カフェ・エコブランド・手作り商品に最適。白カード紙（250g）は HK$1.8/個〜でアパレル・美容小売向け。パール紙 + 箔押しアップグレード版は HK$3.5/個〜でブライダルギフト適用。",
     "200gクラフト紙が一番お得で ¥240〜（1,000個以上）、カフェ・エコブランド・手作り商品に最適。白カード紙（250g）は ¥360〜でアパレル・美容小売向け。パール紙 + 箔押しアップグレード版は ¥600〜でブライダルギフト適用。"),
    # ---- postersContent ----
    # L3298 zh featuredSnippet (distinct: followed by ，標準)
    ("A2 128g 銅版紙 HK$6-9/張，A1 HK$10-16/張，標準 3-5", "A2 157g 銅版紙 HK$9 起/張，A1 HK$45 起/張，標準 3-5"),
    # L3360 zh techSpecs
    ("A2 128g 銅版紙 HK$6-9/張，A1 HK$10-16/張起", "A2 157g 銅版紙 HK$9 起/張，A1 HK$45 起/張"),
    # L3396 en featuredSnippet
    ("A2 128gsm coated at HK$6-9/pc, A1 at HK$10-16/pc", "A2 157gsm coated from HK$9/pc, A1 from HK$45/pc"),
    # L3458 en techSpecs
    ("A2 128gsm coated HK$6-9/pc; A1 HK$10-16/pc", "A2 157gsm coated from HK$9/pc; A1 from HK$45/pc"),
    # L3494 ja featuredSnippet
    ("A2・128gコート紙がHK$6-9/枚、A1がHK$10-16/枚", "A2・157gコート紙がHK$9/枚から、A1がHK$45/枚から"),
    # L3556 ja techSpecs
    ("A2・128gコート紙 HK$6-9/枚、A1 HK$10-16/枚", "A2・157gコート紙 HK$9/枚から、A1 HK$45/枚から"),
]

failed = []
for old, new in edits:
    n = t.count(old)
    if n != 1:
        failed.append((old[:60], n))
        continue
    t = t.replace(old, new)

if failed:
    print('FAILED MATCHES:')
    for frag, n in failed:
        print(f'  count={n} :: {frag}')
    sys.exit(1)

open(P, 'w', encoding='utf-8', newline='\n').write(t)
print('ALL', len(edits), 'EDITS APPLIED OK')

# verification: no residue of old price family
for bad in ['HK$1.5/個', 'HK$1.8', 'HK$3.5', 'US$0.19', 'US$0.23', 'US$0.45', '¥22', '¥28', '¥55', 'HK$6-9', 'HK$10-16', '128g', '128gsm', '15-25%']:
    c = t.count(bad)
    if c:
        print(f'  RESIDUE {bad}: {c}')
print('residue check done')
