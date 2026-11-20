# -*- coding: utf-8 -*-
# Stage 3: CSV 删9行 + 加 roll-stickers 行
import io

RETIRE = ['fluorescent-stickers','drink-tokens','cafe-table-cards','wedding-place-cards','save-the-date-cards','wedding-seating-charts','wedding-suite-bundle','eco-tote-bag','postcard-set']

lines = io.open('zprintpro-sku-seo-data.csv', encoding='utf-8').read().split('\n')
hdr = lines[0]
rows = lines[1:]
keep = []
removed = 0
for r in rows:
    if not r.strip():
        continue
    c = r.split('\t')
    if len(c) > 3 and c[3] in RETIRE:
        removed += 1
        continue
    keep.append(r)
assert removed == 9, 'expected 9 removals, got %d' % removed

# roll-stickers 新行 (31 列 TAB)
body_zh = ('卷裝貼紙（Roll Labels）是產線貼標的標準形態：出貨已成卷，上貼標機即用。'
    '標配卷芯直徑 4cm、出標方向可選（如橫版左出標）、每卷 1,000 張；面材為銅板紙（熱熔膠）配格仔底紙，'
    '貼附牢、出標順，通用於食品飲料、美妝護膚、日化瓶罐與外箱標識。'
    '10 張起印、無版費，試產與量產同線；3,000 張低至 HK$0.20/張，量產成本逐檔遞減。'
    '數碼可變資料支援序號、QR Code、條碼逐張不同，配合批次管理與防竄貨。'
    '與片裝貼紙相比，卷裝省去逐張剝離、對位與停機，貼標速度由機台決定而非人手；'
    '小批量試產仍可用片裝，大貨建議直接上卷。詳情參閱[食品標籤貼紙](/zh-hk/product/fruit-food-label-stickers/)與[防水貼紙](/zh-hk/product/waterproof-stickers/)的材質對照。')
body_en = ('Roll labels are the standard format for production-line labeling: shipped pre-wound and applicator-ready. '
    'Standard 4cm core diameter, unwind direction options (e.g. landscape left unwind), 1,000 labels per roll; '
    'art paper with hot-melt adhesive on grid backing gives strong tack and smooth dispensing for food, beverage, '
    'beauty and FMCG bottles, jars and cartons. 10 pcs MOQ with no plate fees - pilot runs and mass production use the same line; '
    'from HK$0.20 per label at 3,000 pcs. Variable-data printing gives every label a unique serial, QR code or barcode for batch tracking. '
    'Versus sheet labels, rolls remove hand-peeling and stoppages - labeling speed is set by your machine, not your staff. '
    'See [food label stickers](/en/product/fruit-food-label-stickers/) and [waterproof stickers](/en/product/waterproof-stickers/) for material comparisons.')
body_ja = ('ロールラベルはライン貼り付けの標準形態です。出荷時点で巻き取り済み、ラベラーにセットするだけ。'
    '標準の巻芯径は4cm、繰り出し方向は指定可能（横左繰り出しなど）、1巻1,000枚。'
    'アート紙（ホットメルト）+グリッド台紙で、食品・飲料・化粧品・日用品のボトルや箱に強く貼り付き、滑らかに繰り出せます。'
    '10枚から版料なし、3,000枚で1枚¥4.1〜。可変データ印刷でシリアル・QR・バーコードを1枚ごとに可変対応し、ロット管理や転売防止に。'
    'シートラベルと比べ、手剥がしとライン停止が不要になり、貼付速度は機械次第。'
    '材質対照は[食品ラベルステッカー](/ja/product/fruit-food-label-stickers/)と[防水ステッカー](/ja/product/waterproof-stickers/)もご覧ください。')

row = [
 '卷裝貼紙', 'Roll Labels', 'ロールラベル',
 'roll-stickers', '80',
 '卷裝貼紙 卷裝標籤 貼標機適用 10張起 HK$0.20起 | 智印港',
 'Roll Labels | Custom Roll Stickers 4cm Core | 10 MOQ $0.03 | ZprintPro',
 'ロールラベル | 巻芯4cm ラベラー対応 | 10枚〜¥4.1〜 | ZprintPro',
 '卷裝貼紙,卷裝標籤,標籤貼紙,貼標機標籤,roll labels,不干膠標籤,定制標籤,食品標籤,瓶貼標籤,小批量標籤',
 'roll labels,custom roll labels,roll stickers,label rolls,product labels,bottle labels,food labels,custom labels,stickers on a roll,label printing',
 'ロールラベル,ロールシール,ラベル印刷,シール印刷,巻きラベル,ラベラー,食品ラベル,ボトルラベル,オリジナルシール,ステッカー印刷',
 '卷裝貼紙 10 張起印，HK$0.20 起/張，3,000 張整批 HK$610。卷芯 4cm、出標方向可選、每卷 1,000 張，銅板熱熔膠格仔底，貼標機上機即用。免費打稿，5-7 個工作天交貨。立即報價。',
 'Custom roll labels from 10 pcs, $0.03 per label at 3,000 pcs ($78 per batch). 4cm cores, unwind direction options, 1,000 per roll, hot-melt art paper on grid backing - applicator-ready. Free proof, 5-7 business days. Get a quote.',
 'ロールラベル 10枚〜¥4.1〜、3,000枚の場合¥12,200／巻。巻芯径4cm・繰り出し方向指定可・1巻1,000枚、ホットメルトアート紙でラベラーにそのまま対応。無料校正、5-7営業日発送。今すぐ見積。',
 '卷裝貼紙 | 卷芯4cm 貼標機適用 每卷1,000張',
 'Roll Labels | 4cm Cores for Label Applicators | ZprintPro',
 'ロールラベル｜巻芯4cm・ラベラー対応｜ZprintPro',
 body_zh, body_en, body_ja,
 '卷裝貼紙的卷芯和出標方向可以指定嗎？',
 '可以。標配卷芯直徑 4cm，出標方向可選（如橫版左出標），每卷 1,000 張；下單時告知貼標機型號即可對位復卷。',
 '最小訂購量是多少？',
 '10 張起印，無版費。量產檔位至 3,000 張，單張低至 HK$0.20；10 張檔適合試產打樣。',
 '卷裝標籤可以印序號或 QR Code 嗎？',
 '可以。數碼可變資料支援序號、QR Code、條碼逐張不同，配合食品批次管理、會員碼與防竄貨需求。',
 'zprintpro-stickers-roll-stickers.jpg',
 '卷裝貼紙 / 卷裝標籤 | 香港卷裝標籤印刷 卷芯4cm 貼標機適用 每卷1,000張 | 智印港',
 'Custom Roll Labels on 4cm cores, 1,000 per roll for label applicators | ZprintPro',
 'ロールラベル 印刷 | 巻芯径4cm・1巻1,000枚・ラベラー対応 | ZprintPro',
 '食品標籤→/product/fruit-food-label-stickers/ | 防水貼紙→/product/waterproof-stickers/ | 安全標籤→/product/security-stickers/',
]
assert len(row) == 31, 'row cols = %d' % len(row)
keep.append('\t'.join(row))
out = hdr + '\n' + '\n'.join(keep)
io.open('zprintpro-sku-seo-data.csv', 'w', encoding='utf-8', newline='\n').write(out)
print('CSV: removed 9, added roll-stickers; total data rows = %d' % len(keep))
