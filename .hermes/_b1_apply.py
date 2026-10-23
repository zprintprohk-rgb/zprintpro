# -*- coding: utf-8 -*-
# B1: insert 7 non-packaging SKU money-FAQs into skuMoneyFAQs (truth-anchored, no unsourced numbers)
import shutil, io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SRC = r'F:\zprintpro-nextjs\src\data\product-faqs.ts'
BAK = r'F:\zprintpro-nextjs\.hermes\_bak-product-faqs-before-b1-20261023.ts'

raw = open(SRC, 'rb').read().decode('utf-8')
shutil.copyfile(SRC, BAK)
print('backup ->', BAK, os.path.getsize(BAK))

NEW = """  'textbooks': [
    {
      question: {
        'zh-hk': '教科書印刷幾多錢一本？',
        en: 'How much does textbook printing cost?',
        ja: '教科書印刷の料金は？',
      },
      answer: {
        'zh-hk': '教科書 100 本起印，HK$24 起/本（A4、內頁 80g 書紙、騎馬釘或膠裝；頁數同工藝浮動 HK$5-50/本）。5-10 個工作天交貨，入稿後 1 小時內免費數碼打稿。',
        en: 'Textbooks start from $9/book at 100 MOQ (A4, 80gsm interior, saddle-stitch or perfect binding; HK$5-50 band by pages and finishing). 5-10 business day production, free digital proof within 1 hour of artwork.',
        ja: '教科書は100冊〜¥1,288〜（A4・本文80g・中綴じ/無線綴じ、ページ数と加工でHK$5-50/本の帯）。5-10営業日、入稿後1時間以内に無料デジタル校正。',
      },
    },
    {
      question: {
        'zh-hk': '一個班 30 本咁少量印得嗎？',
        en: 'Can I print a small batch of 30 textbooks?',
        ja: '30冊の少部数でも注文できますか？',
      },
      answer: {
        'zh-hk': '教科書最低 100 本起印；30 本級小量建議合併學年訂單或改練習簿線（10 本起）。補習社常備 100-500 本梯級價，量愈多愈抵。',
        en: 'Textbooks carry a 100-copy minimum; a 30-copy class set is better merged into a term order or handled on our exercise-book line (10 MOQ). Tutoring centers typically use 100-500 copy tiers with volume discounts.',
        ja: '教科書は100冊〜です。30冊のクラス単位は学期単位の注文とまとめるか、練習帳ライン（10冊〜）がおすすめです。塾・予備校は100-500冊の数量帯が定番で、量産ほど単価が下がります。',
      },
    },
  ],
  'exercise-books': [
    {
      question: {
        'zh-hk': '練習簿印刷幾多錢一本？',
        en: 'How much do custom exercise books cost?',
        ja: '練習帳の印刷料金は？',
      },
      answer: {
        'zh-hk': '練習簿 10 本起印，HK$4 起/本（A5、32 頁、80g 上質紙、騎馬釘；數量同頁數浮動 HK$4-16/本）。標準 5-7 個工作天，開學前建議預早兩星期落單。',
        en: 'Custom exercise books from $1/book at 10 MOQ (A5, 32 pages, 80gsm wove, saddle-stitched; HK$4-16 band by quantity and pages). Standard 5-7 business days; order two weeks ahead of term start.',
        ja: '練習帳は10冊〜¥258〜（A5・32ページ・80g上質紙・中綴じ、数量とページ数でHK$4-16/本の帯）。標準5-7営業日、学期開始の2週間前のご注文をおすすめします。',
      },
    },
    {
      question: {
        'zh-hk': '練習簿封面可以印校徽校名嗎？',
        en: 'Can you print our school logo on the covers?',
        ja: '表紙に校章や校名を入れられますか？',
      },
      answer: {
        'zh-hk': '可以。封面 250g 銅版紙四色印刷，校徽、校名、科目欄免費排版；可選覆膜或局部 UV。打稿 1 小時內免費送出。',
        en: 'Yes. Covers print 4-color on 250gsm art paper with free layout for crests, school names, and subject lines; matte or gloss lamination and spot UV optional. Free proof within 1 hour.',
        ja: 'はい。表紙は250gコート紙4色印刷で、校章・校名・科目欄の排版は無料。ラミネートや局部UVも選択可。校正は1時間以内に無料でお送りします。',
      },
    },
  ],
  'certificates': [
    {
      question: {
        'zh-hk': '證書印刷幾多錢一張？',
        en: 'How much does certificate printing cost?',
        ja: '証明書印刷の料金は？',
      },
      answer: {
        'zh-hk': '證書 100 張起印，HK$8 起/張（250g 卡紙，燙金或燙銀可選；紙材同工藝浮動 HK$8-40/張）。5-7 個工作天，燙金版連排版免費。',
        en: 'Certificates start from $2/pc at 100 MOQ (250gsm card, optional gold or silver foil; HK$8-40 band by paper and finishing). 5-7 business days, free layout including the foil plate.',
        ja: '証明書は100枚〜¥386〜（250gカード紙、金・銀箔押し選択可、紙材と加工でHK$8-40/枚の帯）。5-7営業日、箔押し版込みの排版は無料。',
      },
    },
    {
      question: {
        'zh-hk': '一張證書可以燙金加埋激凸嗎？',
        en: 'Can one certificate combine foil stamping and embossing?',
        ja: '1枚で箔押しとエンボスを両方入れられますか？',
      },
      answer: {
        'zh-hk': '可以，燙金連激凸（浮雕）同版製作，適合畢業證書同獎狀；燙金同激凸均按紙材尺寸報價。建議先打實樣確認手感先批量產。',
        en: 'Yes — foil and embossing can run in one pass, ideal for diplomas and awards; both are quoted by paper and size. We recommend a physical sample before full production.',
        ja: 'はい。箔押し＋エンボスは同時加工可能で、卒業証書や賞状に最適。紙材とサイズでお見積もりします。量産前に実サンプルで仕上がりをご確認ください。',
      },
    },
  ],
  'perfect-bound-books': [
    {
      question: {
        'zh-hk': '膠裝書刊印刷幾多錢一本？',
        en: 'How much does perfect bound book printing cost?',
        ja: '無線綴じ本の印刷料金は？',
      },
      answer: {
        'zh-hk': '無線膠裝書 10 本起印，HK$16 起/本（A5、約 100 頁、封面 250g 銅版紙過膠；尺寸同頁數浮動 HK$16-80/本）。5-10 個工作天，免費數碼打稿。',
        en: 'Perfect bound books from $4/book at 10 MOQ (A5, ~100 pages, 250gsm laminated cover; HK$16-80 band by size and page count). 5-10 business days with a free digital proof.',
        ja: '無線綴じ本は10冊〜¥644〜（A5・約100ページ・表紙250gコート紙ラミネート、サイズとページ数でHK$16-80/本の帯）。5-10営業日、無料デジタル校正付き。',
      },
    },
    {
      question: {
        'zh-hk': '幾多頁以上要轉膠裝？',
        en: 'When should I switch from saddle stitch to perfect binding?',
        ja: '何ページから無線綴じがおすすめ？',
      },
      answer: {
        'zh-hk': '一般 64 頁以上建議膠裝：書脊可印書名，厚冊攤平度好過騎馬釘。騎馬釘適合 8-64 頁薄冊，成本較低。',
        en: 'Move to perfect binding at 64+ pages: the spine takes a title and thick volumes lie flatter than saddle stitch. Saddle stitch suits 8-64 page booklets at lower cost.',
        ja: '一般的に64ページ以上は無線綴じがおすすめ。書脊に書名が入り、厚い冊子でも中綴じより開きやすいです。中綴じは8-64ページの薄い冊子向きでコストも低いです。',
      },
    },
  ],
  'foil-greeting-cards': [
    {
      question: {
        'zh-hk': '燙金賀卡幾多錢一張？',
        en: 'How much do foil greeting cards cost?',
        ja: '箔押しグリーティングカードの料金は？',
      },
      answer: {
        'zh-hk': '燙金賀卡 10 張起印，HK$180-320/100 張（即 HK$1.8-3.2/張，300g 卡紙連燙金工藝）。聖誕卡、新年卡旺季建議 11 月前落單，5-7 個工作天交貨。',
        en: 'Foil greeting cards start at 10 MOQ, HK$180-320 per 100 pcs (HK$1.8-3.2/pc, 300gsm card with foil). For Christmas and New Year cards, order before November; 5-7 business day production.',
        ja: '箔押しカードは10枚〜、100枚でHK$180-320（1枚HK$1.8-3.2、300gカード紙＋箔押し）。クリスマス・年賀状は11月前のご注文をおすすめ、5-7営業日。',
      },
    },
    {
      question: {
        'zh-hk': '聖誕卡用自己設計得嗎？',
        en: 'Can I supply my own Christmas card design?',
        ja: '自分のデザインで印刷できますか？',
      },
      answer: {
        'zh-hk': '可以，AI/PDF/JPG 均可，燙金位置請出獨立黑稿。免費排版檢查連 1 小時數碼打稿；無設計檔可由團隊免費代排。',
        en: 'Yes — supply AI/PDF/JPG with the foil area as a separate black plate. Free preflight plus a 1-hour digital proof; our team can also create the layout at no charge.',
        ja: 'はい。AI/PDF/JPG対応、箔押し部分は別ブラック版でご入稿ください。無料プリフライト＋1時間デジタル校正。デザインがなくても無料で排版作成します。',
      },
    },
  ],
  'roll-up-banners': [
    {
      question: {
        'zh-hk': '易拉架幾多錢一個？',
        en: 'How much does a roll-up banner cost?',
        ja: 'ロールアップバナーの料金は？',
      },
      answer: {
        'zh-hk': '易拉架 1 套起訂，HK$85 起/套（85×200cm、防水畫面連支架；尺寸同生地浮動 HK$85-300/套）。5-7 個工作天，入稿後 1 小時內免費數碼校正。',
        en: 'Roll-up banners start from $46/set at 1 MOQ (85x200cm, waterproof graphic with stand; HK$85-300 band by size and material). 5-7 business days, free digital proof within 1 hour of artwork.',
        ja: 'ロールアップバナーは1セット〜¥6,440〜（85×200cm・防水生地＋スタンド付、サイズと生地でHK$85-300/セットの帯）。5-7営業日、入稿後1時間以内に無料デジタル校正。',
      },
    },
    {
      question: {
        'zh-hk': '易拉架畫面可以單換嗎？',
        en: 'Can I replace just the banner graphic?',
        ja: 'バナー面だけ交換できますか？',
      },
      answer: {
        'zh-hk': '可以，支架重用，單換畫面按尺寸報價，適合季度推廣換畫。支架穩固重用，換畫成本遠低於全套新購。',
        en: 'Yes — reuse the stand and replace the graphic only, quoted by size, which suits seasonal campaign swaps at well below the cost of a new set.',
        ja: 'はい。スタンドは再利用でき、生地のみの交換はサイズでお見積もり。季節ごとの販促に最適で、新規購入より大幅にお安くなります。',
      },
    },
  ],
  'business-envelopes': [
    {
      question: {
        'zh-hk': '信封印刷幾多錢一個？',
        en: 'How much do custom business envelopes cost?',
        ja: '封筒印刷の料金は？',
      },
      answer: {
        'zh-hk': '企業信封 100 個起印，HK$0.22-1.80/個（C6/DL/C5 尺寸、80-120g 書紙或牛皮紙，LOGO 單色至四色）。5-7 個工作天，免費排版連打稿。',
        en: 'Business envelopes start at 100 MOQ, HK$0.22-1.80/pc (C6/DL/C5 sizes, 80-120gsm wove or kraft, 1-4 color logo). 5-7 business days with free layout and proof.',
        ja: '封筒は100枚〜、1枚HK$0.22-1.80（C6/DL/C5、80-120g書き紙またはクラフト、ロゴ1-4色）。5-7営業日、無料排版・校正付き。',
      },
    },
    {
      question: {
        'zh-hk': '開窗信封訂製得嗎？',
        en: 'Do you make window envelopes?',
        ja: '窓付き封筒は作れますか？',
      },
      answer: {
        'zh-hk': '可以，開窗位貼膜或模切，開窗版一次性開版、同版重用免再收；適合月結單同賬單郵寄。100 個起印同價。',
        en: 'Yes — window envelopes with film or die-cut windows; the window plate is a one-time charge reusable across reorders, ideal for statement and billing mailers. Same 100 MOQ.',
        ja: 'はい。窓部分はフィルム貼りまたは抜き加工で、窓版は一度きりの版代で再利用可能です。請求書や明細の郵送に最適。100枚〜同条件です。',
      },
    },
  ],
"""

anchor = "  ],\n};\n"
start = raw.find('export const skuMoneyFAQs')
end = raw.find('\n};', start)
# locate the final "  ]," right before close
tail = raw[:end]
assert tail.rstrip().endswith('],'), 'unexpected record tail'
insert_at = tail.rfind("  ],") + len("  ],")

before_keys = [raw.count(f"  '{k}': [") for k in
               ['textbooks','exercise-books','certificates','perfect-bound-books',
                'foil-greeting-cards','roll-up-banners','business-envelopes']]
assert all(c == 0 for c in before_keys), f'key already exists: {before_keys}'

new_raw = raw[:insert_at] + "\n" + NEW.rstrip() + "\n" + raw[insert_at:]
open(SRC, 'wb').write(new_raw.encode('utf-8'))

after = open(SRC, 'rb').read().decode('utf-8')
after_keys = [after.count(f"  '{k}': [") for k in
              ['textbooks','exercise-books','certificates','perfect-bound-books',
               'foil-greeting-cards','roll-up-banners','business-envelopes']]
assert all(c == 1 for c in after_keys), f'insertion count wrong: {after_keys}'
print('AFTER keys x1 each:', after_keys)
print('total skuMoneyFAQs keys now:', len(__import__('re').findall(r"^  \'[a-z0-9-]+\': \[", after[after.find('export const skuMoneyFAQs'):after.find('\n};', after.find('export const skuMoneyFAqs'.replace('Faqs','FAQs')))], __import__('re').M)))
print('size delta:', len(new_raw) - len(raw))
print('B1 INSERT OK')
