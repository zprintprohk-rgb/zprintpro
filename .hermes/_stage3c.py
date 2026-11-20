# -*- coding: utf-8 -*-
# 修 roll 行: en/ja 标题入带 + ja 描述整卷措辞
import io

OLD_EN = 'Roll Labels | Custom Roll Stickers 4cm Core | 10 MOQ $0.03 | ZprintPro'
NEW_EN = 'Roll Labels | Applicator-Ready | 10 MOQ $0.03 | ZprintPro'
OLD_JA = 'ロールラベル | 巻芯4cm ラベラー対応 | 10枚〜¥4.1〜 | ZprintPro'
NEW_JA = 'ロールラベル | 巻芯4cm 食品対応 | 10枚〜¥4〜 | ZprintPro'
OLD_JA_DESC = 'ロールラベル 10枚〜¥4.1〜、3,000枚の場合¥12,200／巻。巻芯径4cm・繰り出し方向指定可・1巻1,000枚、ホットメルトアート紙でラベラーにそのまま対応。無料校正、5-7営業日発送。今すぐ見積。'
NEW_JA_DESC = 'ロールラベル 10枚〜¥4〜、3,000枚の場合¥12,200（3巻分）。巻芯径4cm・繰り出し方向指定可・1巻1,000枚、ホットメルトアート紙でラベラーにそのまま対応。無料校正、5-7営業日発送。今すぐ見積。'

for p in ('zprintpro-sku-seo-data.csv', 'src/data/sku-seo-data.ts'):
    t = io.open(p, encoding='utf-8').read()
    for o, n in ((OLD_EN, NEW_EN), (OLD_JA, NEW_JA), (OLD_JA_DESC, NEW_JA_DESC)):
        k = t.count(o)
        assert k == 1, '%s: count=%d for %s' % (p, k, o[:30])
        t = t.replace(o, n)
    io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
    print('fixed:', p)
