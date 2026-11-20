# -*- coding: utf-8 -*-
# Stage 3b: sku-seo-data.ts 删 9 块 + 插 roll-stickers 块 (body 直写) + regen --apply
import io, re

RETIRE = ['fluorescent-stickers','drink-tokens','cafe-table-cards','wedding-place-cards','save-the-date-cards','wedding-seating-charts','wedding-suite-bundle','eco-tote-bag','postcard-set']

BODY_ZH = """卷裝貼紙（Roll Labels）是產線貼標的標準形態：出貨已按貼標機規格復卷，拆箱上機即用。標配卷芯直徑 4cm，出標方向可選（如橫版左出標），每卷 1,000 張；面材為銅板紙配熱熔膠、格仔底紙，貼附牢、出標順，專為食品飲料、美妝護膚、日化用品的瓶罐產線而設。10 張起印、無開版費；3,000 張低至 HK$0.20/張。試產與量產同一條數碼線，打樣色即量產色。\\n\\n卷裝與片裝怎麼選：\\n· 上貼標機量產 → 卷裝：貼標速度由機台決定，人手只補料不剝離\\n· 手貼／零售小包裝 → 片裝：逐張取用方便\\n· 試產 10-99 張 → 卷裝小批量檔同樣 10 張起，規格與大貨一致\\n材質對照可參閱[食品標籤貼紙](/zh-hk/product/fruit-food-label-stickers/)與[防水貼紙](/zh-hk/product/waterproof-stickers/)兩頁。\\n\\n規格真值（報價引擎直出）：常用 150×100mm 級距，任意尺寸可報；異形模切（啤）任意形狀，品牌輪廓標籤亦可上機；熱熔膠初粘強，貼 PET／PP／玻璃瓶罐不易翹邊。卷裝標配為銅板紙不覆膜，需要防水或覆膜卷裝請 WhatsApp 查詢。可變資料支援序號、QR Code、條碼逐張不同，適合食品批次管理、防竄貨與會員碼。\\n\\n交稿規範：300 DPI、CMYK 色彩模式、3mm 出血、字體外框化。提交檔案後 1 小時內提供免費數碼打稿，最多免費修改 2 次。量產前建議先跑 10-99 張試產檔，驗證貼標機走位、出標方向與剝離角度。\\n\\n收費透明：10 張 HK$55、25 張 HK$57.5、50 張 HK$61、75 張 HK$65.5、99 張 HK$70、3,000 張 HK$610（合 HK$0.20/張）。無開版費、無製版費。標準生產 5-7 個工作天；港九新界 HK$500 以上免費順豐速遞。\\n\\n**常見問題**\\n\\n**Q1: 卷芯直徑和出標方向可以指定嗎？**\\n可以。標配卷芯直徑 4cm，出標方向可選（如橫版左出標）；下單時告知貼標機型號，我們按機台規格復卷對位。\\n\\n**Q2: 最小起訂量是多少？**\\n10 張起印，無開版費。10-99 張為小批量試產檔，規格與大貨一致；量產檔至 3,000 張。\\n\\n**Q3: 卷裝標籤可以印序號或 QR Code 嗎？**\\n可以。數碼可變資料支援每張不同的序號、QR Code 或條碼，適合批次管理與防竄貨。\\n\\n**Q4: 可以啤異形（任意形狀）嗎？**\\n可以。任意形狀模切，品牌輪廓標籤亦可上機貼標；複雜形狀建議先打樣驗證剝離角度。\\n\\n準備落單？1 小時免費打稿 — WhatsApp 客服 +86 198 8085 1334 或點擊頁面「30 秒 AI 報價」按鈕。"""

BODY_EN = """Roll labels are the standard format for production-line labeling: shipped pre-wound to applicator spec, ready to mount out of the box. Standard core diameter 4cm, unwind direction options (e.g. landscape left unwind), 1,000 labels per roll; art paper with hot-melt adhesive on grid backing - strong tack, smooth dispensing - built for food, beverage, beauty and FMCG bottle-and-jar lines. 10 pcs MOQ, no plate fees; from HK$0.20 per label at 3,000 pcs. Pilot runs and mass production share the same digital line, so the proof color is the production color.\\n\\nRoll vs sheet - how to choose:\\n- Machine-applied production → rolls: labeling speed is set by your machine, staff only reload\\n- Hand application / retail packs → sheets: easy peel one by one\\n- Pilot run 10-99 pcs → the roll small-batch tier starts at 10 with full production specs\\nFor material comparisons see [food label stickers](/en/product/fruit-food-label-stickers/) and [waterproof stickers](/en/product/waterproof-stickers/).\\n\\nSpec sheet (straight from the quote engine): common 150x100mm class, any size quotable; die-cut to any shape including brand silhouettes; hot-melt adhesive sticks firmly to PET, PP, glass bottles and jars. Standard roll stock is unlaminated art paper - waterproof or laminated rolls available via WhatsApp. Variable data supported: a different serial, QR code or barcode on every label for batch tracking, anti-diversion and membership codes.\\n\\nFile requirements: 300 DPI, CMYK, 3mm bleed, outlined fonts. Free digital proof within 1 hour of file submission, up to 2 free revisions. Before mass production, we recommend a 10-99 pc pilot run to verify applicator tracking, unwind direction and peel angle.\\n\\nTransparent pricing: 10 pcs HK$55, 25 pcs HK$57.5, 50 pcs HK$61, 75 pcs HK$65.5, 99 pcs HK$70, 3,000 pcs HK$610 (HK$0.20/pc). No setup or plate fees. Standard production 5-7 business days.\\n\\n**FAQ**\\n\\n**Q1: Can I specify core size and unwind direction?**\\nYes. 4cm core diameter is standard and unwind direction is optional (e.g. landscape left unwind); send us your applicator model and we will match the winding spec.\\n\\n**Q2: What is the minimum order?**\\n10 pcs with no plate fees. The 10-99 pc small-batch tier shares full production specs; volume tiers go up to 3,000 pcs.\\n\\n**Q3: Can roll labels carry serials or QR codes?**\\nYes. Digital variable-data printing gives every label a unique serial, QR code or barcode for batch tracking and anti-diversion.\\n\\n**Q4: Can shapes be die-cut?**\\nYes - any shape, including brand silhouettes, is die-cuttable and machine-applicable; complex shapes benefit from a proof run first.\\n\\nReady to order? Free 1-hour proofing - WhatsApp +86 198 8085 1334 or hit the 30-second AI quote button."""

BODY_JA = """ロールラベルはライン貼付の標準形態です。出荷時点でラベラー仕様に巻き取り済み、箱から出してセットするだけ。標準の巻芯径は4cm、繰り出し方向は指定可能（横左繰り出しなど）、1巻1,000枚。アート紙（ホットメルト）+グリッド台紙で、食品・飲料・化粧品・日用品のボトル・ジャーラインに強く貼り付き、滑らかに繰り出せます。10枚から、版代なし。3,000枚で1枚¥4.1〜。試作と量産が同じデジタルラインのため、校正色＝量産色です。\\n\\nロールとシートの選び方：\\n· ラベラー量産 → ロール：貼付速度は機械次第。人手は補給だけ\\n· 手貼り／小売パック → シート：1枚ずつ剥がしやすい\\n· 10-99枚の試作 → ロール小ロットも10枚から、量産と同仕様\\n素材対照は[食品ラベルステッカー](/ja/product/fruit-food-label-stickers/)と[防水ステッカー](/ja/product/waterproof-stickers/)もご覧ください。\\n\\n仕様の真値（見積エンジン直出し）：標準は150×100mm級、任意サイズ見積可能。型抜き（ダイカット）で任意形状対応、ブランドシルエットラベルもラベラーで貼付可能。ホットメルトはPET・PP・ガラス瓶に対して初期粘着が強く、端のめくれにくい仕様です。標準はラミなしアート紙。防水・ラミ仕様のロールはLINEでご相談ください。可変データ対応：連番・QR・バーコードを1枚ごとに可変印刷。ロット管理・転売防止・会員コードに。\\n\\n入稿仕様：300 DPI、CMYKモード、3mm塗り足し、フォントはアウトライン化。データ提出から1時間以内に無料デジタル校正、無料修正は2回まで。量産前に10-99枚の試作ロットで、ラベラーの走行・繰り出し方向・剥離角度を確認するのがおすすめです。\\n\\n料金は透明：10枚HK$55、25枚HK$57.5、50枚HK$61、75枚HK$65.5、99枚HK$70、3,000枚HK$610（1枚HK$0.20）。版代・型代ゼロ。標準納期5-7営業日。\\n\\n**よくある質問**\\n\\n**Q1: 巻芯径と繰り出し方向は指定できますか？**\\nはい。標準は巻芯径4cm、繰り出し方向は指定可能（横左繰り出しなど）。ご注文時にラベラー機種をお知らせいただければ、機械仕様に合わせて巻き取ります。\\n\\n**Q2: 最小注文数は？**\\n10枚から、版代なし。10-99枚は小ロット試作枠で量産と同仕様、量産枠は3,000枚まで。\\n\\n**Q3: 連番やQRコードは対応ですか？**\\n対応しています。デジタル可変印刷で1枚ごとに異なる連番・QR・バーコードを印刷可能。ロット管理や転売防止に。\\n\\n**Q4: 型抜き（任意形状）はできますか？**\\nはい。任意形状のダイカットに対応し、ブランドシルエットラベルも機械貼付可能です。複雑な形状は事前の校正をおすすめします。\\n\\nご注文はこちら — 1時間で無料デジタル校正、LINEお問い合わせ または商品ページの「30秒AI見積もり」ボタンから。"""

ROLL_BLOCK = """  "roll-stickers": {
    "name": {
      "zh-hk": "卷裝貼紙",
      "en": "Roll Labels",
      "ja": "ロールラベル"
    },
    "seo": {
      "zh-hk": {
        "title": "卷裝貼紙 卷裝標籤 貼標機適用 10張起 HK$0.20起 | 智印港",
        "description": "卷裝貼紙 10 張起印，HK$0.20 起/張，3,000 張整批 HK$610。卷芯 4cm、出標方向可選、每卷 1,000 張，銅板熱熔膠格仔底，貼標機上機即用。免費打稿，5-7 個工作天交貨。立即報價。",
        "h1": "卷裝貼紙 | 卷芯4cm 貼標機適用 每卷1,000張",
        "keywords": ["卷裝貼紙","卷裝標籤","標籤貼紙","貼標機標籤","roll labels","不干膠標籤","定制標籤","食品標籤","瓶貼標籤","小批量標籤"],
        "body": "%(ZH)s"
      },
      "en": {
        "title": "Roll Labels | Custom Roll Stickers 4cm Core | 10 MOQ $0.03 | ZprintPro",
        "description": "Custom roll labels from 10 pcs, $0.03 per label at 3,000 pcs ($78 per batch). 4cm cores, unwind direction options, 1,000 per roll, hot-melt art paper on grid backing - applicator-ready. Free proof, 5-7 business days. Get a quote.",
        "h1": "Roll Labels | 4cm Cores for Label Applicators | ZprintPro",
        "keywords": ["roll labels","custom roll labels","roll stickers","label rolls","product labels","bottle labels","food labels","custom labels","stickers on a roll","label printing"],
        "body": "%(EN)s"
      },
      "ja": {
        "title": "ロールラベル | 巻芯4cm ラベラー対応 | 10枚〜¥4.1〜 | ZprintPro",
        "description": "ロールラベル 10枚〜¥4.1〜、3,000枚の場合¥12,200／巻。巻芯径4cm・繰り出し方向指定可・1巻1,000枚、ホットメルトアート紙でラベラーにそのまま対応。無料校正、5-7営業日発送。今すぐ見積。",
        "h1": "ロールラベル｜巻芯4cm・ラベラー対応｜ZprintPro",
        "keywords": ["ロールラベル","ロールシール","ラベル印刷","シール印刷","巻きラベル","ラベラー","食品ラベル","ボトルラベル","オリジナルシール","ステッカー印刷"],
        "body": "%(JA)s"
      }
    },
    "faqs": [],
    "imageAlt": {
      "zh-hk": "卷裝貼紙 / 卷裝標籤 | 香港卷裝標籤印刷 卷芯4cm 貼標機適用 每卷1,000張 | 智印港",
      "en": "Custom Roll Labels on 4cm cores, 1,000 per roll for label applicators | ZprintPro",
      "ja": "ロールラベル 印刷 | 巻芯径4cm・1巻1,000枚・ラベラー対応 | ZprintPro"
    }
  },
""" % {'ZH': BODY_ZH, 'EN': BODY_EN, 'JA': BODY_JA}

p = 'src/data/sku-seo-data.ts'
lines = io.open(p, encoding='utf-8').read().split('\n')

def find_block(lines, slug):
    key = '  "%s": {' % slug
    s = None
    for i, ln in enumerate(lines):
        if ln == key:
            s = i
            break
    if s is None:
        return None
    e = s + 1
    while e < len(lines):
        if len(lines[e]) - len(lines[e].lstrip(' ')) <= 2 and lines[e].strip() in ('}', '},'):
            break
        e += 1
    assert e < len(lines), 'no block end for ' + slug
    return s, e

# 1) 删 9 块 (从后往前)
spans = []
for slug in RETIRE:
    r = find_block(lines, slug)
    assert r, 'block not found: ' + slug
    spans.append((r[0], r[1], slug))
for s, e, slug in sorted(spans, reverse=True):
    del lines[s:e+1]
    print('ts block deleted:', slug)

# 2) 插 roll 块到 waterproof 之前
anchor = None
for i, ln in enumerate(lines):
    if ln == '  "waterproof-stickers": {':
        anchor = i
        break
assert anchor is not None
lines = lines[:anchor] + ROLL_BLOCK.split('\n') + lines[anchor:]
io.open(p, 'w', encoding='utf-8', newline='\n').write('\n'.join(lines))

t = io.open(p, encoding='utf-8').read()
for slug in RETIRE:
    assert '"%s"' % slug not in t, 'still in ts: ' + slug
assert t.count('"roll-stickers"') == 1
print('sku-seo-data.ts: 9 blocks deleted, roll-stickers block inserted')
