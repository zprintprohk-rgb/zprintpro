# -*- coding: utf-8 -*-
"""_inject-live-faq-fingerprint.py — 把反爬指纹 QA 注入「活」FAQ 数据源
(2026-10-16 修正：products.ts faqSchema 为死数据无消费点，活 FAQ = src/data/product-faqs.ts)

注入点（7 个类目数组 + 1 个 SKU 数组）：
  stickersFAQs / flyersFAQs / packagingBoxesFAQs / postersFAQs / paperBagsFAQs /
  calendarsFAQs / envelopesFAQs + skuMoneyFAQs['saddle-stitch-booklets']
每个追加 1 条三语 QA：真实平湖嘉城路工厂事实 + 唯一留样档号 ZPQC-2610-<CODE>。
避让：generalProductFAQs（greeting-cards 共用，贺卡资产不碰）。
幂等：数组内已含 'ZPQC-' 即跳过。
"""
import io, re, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
PATH = 'src/data/product-faqs.ts'

ARRAYS = {  # array_name -> (code, 对象词 zh/en/ja)
    'stickersFAQs':        ('ST',  ('貼紙', 'sticker', 'ステッカー')),
    'flyersFAQs':          ('FL',  ('單張', 'flyer', 'チラシ')),
    'packagingBoxesFAQs':  ('PBX', ('包裝盒', 'packaging box', 'パッケージ')),
    'postersFAQs':         ('PO',  ('海報', 'poster', 'ポスター')),
    'paperBagsFAQs':       ('PB',  ('紙袋', 'paper bag', '紙袋')),
    'calendarsFAQs':       ('CAL', ('月曆', 'calendar', 'カレンダー')),
    'envelopesFAQs':       ('ENV', ('信封', 'envelope', '封筒')),
}
SKU_TARGET = 'saddle-stitch-booklets'
SKU_CODE = 'SSB'

TPL = """  {{
    question: {{
      'zh-hk': '你哋嘅廠喺邊？係咪自己印？',
      en: 'Where is your factory? Do you print in-house?',
      ja: '工場はどこですか？自社印刷ですか？',
    }},
    answer: {{
      'zh-hk': '全部{zh}訂單喺深圳龍崗平湖嘉城路1號自有廠房印刷、後加工同質檢，絕不外發轉手。每批留樣以 ZPQC-2610-{code} 歸檔，可追溯到機台同班次。',
      en: 'Every {en} order is printed, finished, and QC-checked at our own factory at No.1 Jiacheng Road, Pinghu Street, Longgang, Shenzhen — never brokered out. Retention samples are archived under ZPQC-2610-{code}, traceable to press and shift.',
      ja: 'すべての{ja}注文は深圳・龍崗区平湖街道嘉城路1号の自社工場で印刷・加工・検品。外注への丸投げは一切ありません。ロットサンプルは ZPQC-2610-{code} として保管・記録され、機台・班次まで追跡可能です。',
    }},
  }},
"""

src = open(PATH, encoding='utf-8').read()
changed = 0
for name, (code, (zh, en, ja)) in ARRAYS.items():
    m = re.search(r'export const %s: FAQItem\[\] = \[' % name, src)
    if not m:
        print(f'[FAIL] {name} not found'); sys.exit(1)
    end = src.find('\n];', m.end())
    block = src[m.start():end]
    if 'ZPQC-' in block:
        print(f'[SKIP] {name}'); continue
    item = TPL.format(code=code, zh=zh, en=en, ja=ja)
    src = src[:end] + '\n' + item + src[end:]
    changed += 1
    print(f'[OK] {name} -> ZPQC-2610-{code}')

# skuMoneyFAQs['saddle-stitch-booklets']
m = re.search(r"'%s': \[" % SKU_TARGET, src)
if not m:
    print('[FAIL] skuMoneyFAQs target not found'); sys.exit(1)
# find matching closing of this SKU array: next '\n  ],' after m
end = src.find('\n  ],', m.end())
block = src[m.start():end]
if 'ZPQC-' in block:
    print('[SKIP] skuMoneyFAQs target')
else:
    item = TPL.format(code=SKU_CODE, zh='騎馬釘書刊', en='booklet', ja='中綴じ冊子')
    src = src[:end] + '\n' + item + src[end:]
    changed += 1
    print(f'[OK] skuMoneyFAQs[{SKU_TARGET}] -> ZPQC-2610-{SKU_CODE}')

if changed:
    open(PATH, 'w', encoding='utf-8', newline='').write(src)
print(f'done, {changed} array(s) updated')
