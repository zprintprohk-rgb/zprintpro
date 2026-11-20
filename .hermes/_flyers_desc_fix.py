# -*- coding: utf-8 -*-
# flyers 类目 desc 币种本地化: en HK$0.35 -> US$0.40, ja HK$0.35 -> ¥50 (products.ts a5-flyers SSoT)
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
p = r'F:\zprintpro-nextjs\src\data\category-seo-content.ts'
t = open(p, encoding='utf-8').read()
REPL = [
    ("'Flyer printing in Hong Kong from 10 pcs — A5 single-side 128gsm gloss coated at HK$0.35/pc,",
     "'Flyer printing in Hong Kong from 10 pcs — A5 single-side 128gsm gloss coated at US$0.40/pc,"),
    ("{ label: 'Reference price', value: 'A5 128gsm single-side from HK$0.35/pc; volume pricing on request' }",
     "{ label: 'Reference price', value: 'A5 128gsm single-side from US$0.40/pc; volume pricing on request' }"),
    ("'香港のチラシ印刷は10枚から。A5片面128gコート紙がHK$0.35/枚〜、",
     "'香港のチラシ印刷は10枚から。A5片面128gコート紙が¥50/枚〜、"),
    ("{ label: '参考価格', value: 'A5 128g片面 HK$0.35/枚〜、量販は別途お見積り' }",
     "{ label: '参考価格', value: 'A5 128g片面 ¥50/枚〜、量販は別途お見積り' }"),
]
ok = 0
for old, new in REPL:
    n = t.count(old)
    if n == 1:
        t = t.replace(old, new)
        ok += 1
        print(f'OK ({n}x): {old[:44]}...')
    else:
        print(f'FAIL count={n}: {old[:44]}...')
open(p, 'w', encoding='utf-8').write(t)
print(f'done {ok}/4')
