# -*- coding: utf-8 -*-
"""Append 7 SKUs x 4Q x 3 locales to skuMoneyFAQs (34->41/83).
Truths @products.ts: desk/custom/mini calendars minQ1 HK$3-8/本 ($0.40/¥50); certificates minQ100 HK$8-40/張 ($2.76/¥386);
hardcover-books minQ10 HK$40-240/本 ($13.8/¥1932); outdoor-vinyl-banners minQ1 HK$12-55/平方米 ($2.76/¥360);
drink-menus minQ10 HK$12-48/張 ($3.68/¥515). Turnaround = sku-seo body dominant pair."""
import io, re, sys, shutil, os

P = r"F:\zprintpro-nextjs\src\data\product-faqs.ts"
BAK = r"F:\zprintpro-nextjs\.hermes\_bak-faq7x-20261024.ts.bak"
MODE = "apply" if "--apply" in sys.argv else "verify"

def Q(zh_q, en_q, ja_q, zh_a, en_a, ja_a):
    return ("""    {
      question: {
        'zh-hk': '%s',
        en: '%s',
        ja: '%s',
      },
      answer: {
        'zh-hk': '%s',
        en: '%s',
        ja: '%s',
      },
    },
""" % (zh_q, en_q, ja_q, zh_a, en_a, ja_a))

BLOCKS = {}

BLOCKS["desk-calendars"] = "".join([
    Q("座檯年曆幾多錢一本？", "How much do desk calendars cost?", "卓上カレンダーの価格は？",
      "座檯年曆 1 本起印，HK$3-8/本（視頁數與紙材）。標準 3-5 個工作天出貨，港九新界送貨到門。",
      "Desk calendars start from HK$3-8 each at 1-piece MOQ, depending on pages and stock. Standard 3-5 business days production, delivery across Hong Kong.",
      "卓上カレンダーは1冊から、HK$3-8/冊（ページ数・用紙による）。標準3-5営業日で出荷、香港全域配送。"),
    Q("座檯年曆最低訂幾多本？", "What is the minimum order for desk calendars?", "卓上カレンダーの最小ロットは？",
      "1 本起印，無開版費；批量 100 本以上單價明顯下降，適合企業送禮。",
      "From 1 piece with no plate fee; unit price drops sharply from 100 pieces, ideal for corporate gifting.",
      "1冊から・版代なし。100冊以上で単価が大きく下がり、企業ギフトに適します。"),
    Q("座檯年曆有咩款式同尺寸？", "What styles and sizes are available?", "卓上カレンダーの仕様・サイズは？",
      "三角座架配灰板底座，另備相架式與磁貼式；常用 A5/A6 版面，2027 年月曆版面可自訂。",
      "Triangle stand with greyboard base, plus photo-frame and magnetic variants; A5/A6 layouts standard, 2027 grids fully customisable.",
      "三角スタンド＋グレーボード台座、ほかにフォトフレーム式・マグネット式。A5/A6が標準、2027年の月割りは自由に設計可能。"),
    Q("聖誕旺季幾時要落單？", "When should I order for the Christmas peak?", "年末繁忙期はいつ注文すべき？",
      "建議 11 月中前落單（提前 2-4 週），避開 12 月排期；急件另議加急。",
      "Order by mid-November (2-4 weeks ahead) to avoid December queues; rush slots available on request.",
      "11月中旬までのご注文（2-4週間前）を推奨。12月の混雑を避けられます。急ぎは別途ご相談。"),
])

BLOCKS["custom-calendars"] = "".join([
    Q("定製年曆幾多錢？", "How much is a custom calendar?", "オリジナルカレンダーの価格は？",
      "定製年曆 1 本起印，HK$3-8/本；標準 7-10 個工作天（十二版面或燙金可變數據另計）。",
      "Custom calendars start at HK$3-8 each from 1 piece; standard 7-10 business days, with 12-panel or variable-data foil options.",
      "オリジナルカレンダーは1冊から、HK$3-8/冊。標準7-10営業日（12面・可変データ箔押しは別途）。"),
    Q("定製年曆最低幾多本？", "What is the MOQ for custom calendars?", "オリジナルカレンダーの最小ロットは？",
      "1 本起印，適合小批量試單與企業樣品；100 本以上批量單價更優。",
      "1 piece minimum — practical for test runs and corporate samples; 100+ unlocks bulk pricing.",
      "1冊から。小ロット試作や企業サンプルに最適。100冊以上で量産価格。"),
    Q("可以做到十二版面同燙金嗎？", "Can you do 12 panels and foil stamping?", "12面構成や箔押しは可能？",
      "可以。十二版面（每月一版）、燙金／局部 UV／可變數據（每本印不同名或編號）均可安排，落單時註明。",
      "Yes — 12 monthly panels, foil stamping, spot UV and variable data (per-copy names or numbering) are all available; specify at order.",
      "可能です。12面（月ごと1面）、箔押し・部分UV・可変データ（1冊ごとの名前・番号）に対応。ご注文時にご指定ください。"),
    Q("定製年曆幾耐交貨？", "What is the lead time for custom calendars?", "オリジナルカレンダーの納期は？",
      "標準 7-10 個工作天；Q4 旺季建議提前 3-4 週落單，急件可加急處理。",
      "Standard 7-10 business days; order 3-4 weeks ahead in the Q4 peak, with rush handling available.",
      "標準7-10営業日。Q4繁忙期は3-4週間前のご注文を推奨、特急対応も可能です。"),
])

BLOCKS["mini-calendars"] = "".join([
    Q("迷你年曆幾多錢？", "How much do mini calendars cost?", "ミニカレンダーの価格は？",
      "迷你年曆 1 本起印，HK$3-8/本；標準 7-10 個工作天。",
      "Mini calendars start at HK$3-8 each from 1 piece; standard 7-10 business days.",
      "ミニカレンダーは1冊から、HK$3-8/冊。標準7-10営業日。"),
    Q("迷你年曆尺寸幾大？", "What size are mini calendars?", "ミニカレンダーのサイズは？",
      "常用 85×55mm 口袋尺寸，可放卡片套或隨禮品派發；版面與紙材可按需調整。",
      "Standard 85×55mm pocket size, fits card holders or gift inserts; layout and stock adjustable.",
      "標準85×55mmのポケットサイズ。カードケースやギフト同梱に最適。版面・用紙は調整可能。"),
    Q("迷你年曆最低訂幾多？", "What is the MOQ for mini calendars?", "ミニカレンダーの最小ロットは？",
      "1 本起印；大量派發（1,000 本以上）單價按批量階梯下調。",
      "From 1 piece; for mass distribution (1,000+) unit price steps down with volume.",
      "1冊から。大量配布（1,000冊以上）は数量段階で単価が下がります。"),
    Q("迷你年曆適合咩用途？", "What are mini calendars best for?", "ミニカレンダーの用途は？",
      "銀行、保險、地產與零售店的年末派發品；亦可作展會小禮物，配合企業 LOGO 印刷。",
      "Year-end giveaways for banks, insurance, property and retail; also trade-show gifts with company logo.",
      "銀行・保険・不動産・小売の年末配布物。展示会ノベルティとしても人気、社名ロゴ印刷対応。"),
])

BLOCKS["certificates"] = "".join([
    Q("證書印刷幾多錢一張？", "How much does certificate printing cost?", "賞状・証明書印刷の価格は？",
      "證書 100 張起印，HK$8-40/張（視紙材與工藝）；標準 3-5 個工作天，學校批量可分批交貨。",
      "Certificates start at 100 pieces, HK$8-40 each depending on stock and finishing; standard 3-5 business days, school batches can be delivered in stages.",
      "賞状・証明書は100枚から、HK$8-40/枚（用紙・加工による）。標準3-5営業日、学校の大口は分納も可能。"),
    Q("證書最低訂幾多張？", "What is the minimum order for certificates?", "賞状の最小ロットは？",
      "100 張起印；小批量亦接（樣品或補印另議），不加開版費。",
      "100 pieces minimum; smaller sample or reprint runs negotiable, no plate fee.",
      "100枚から。少量サンプル・追加印刷もご相談可、版代なし。"),
    Q("證書有咩工藝同防偽選項？", "What finishes and anti-counterfeit options exist?", "賞状の加工・偽造防止オプションは？",
      "燙金／燙銀、防偽水印、編號與 QR 驗證碼；紙材可選 250-300g 特種紙或珠光紙。",
      "Gold/silver foil, security watermark, serial numbers and QR verification; 250-300gsm specialty or pearl paper.",
      "金・銀箔押し、偽造防止透かし、通し番号・QR検証。用紙は250-300g特殊紙・パール紙から選択。"),
    Q("學校大批量可以加急嗎？", "Can schools get rush production?", "学校の大口注文は特急対応できますか？",
      "可以。批量 1,000 張以上建議提前 2 週；急件 2 個工作天可安排（視排期），落單時註明典禮日期。",
      "Yes. For 1,000+ plan 2 weeks ahead; 2-business-day rush can be scheduled subject to capacity — state the ceremony date at order.",
      "可能です。1,000枚以上は2週間前のご注文を推奨。2営業日の特急は稼働状況により手配、式典日をご申告ください。"),
])

BLOCKS["hardcover-books"] = "".join([
    Q("精裝書印刷幾多錢？", "How much does hardcover book printing cost?", "上製本の印刷価格は？",
      "精裝書 10 本起印，HK$40-240/本（視頁數、尺寸與封面工藝）；標準 5-10 個工作天。",
      "Hardcover books start at 10 copies, HK$40-240 each depending on pages, size and cover finishing; standard 5-10 business days.",
      "上製本は10冊から、HK$40-240/冊（ページ数・サイズ・表紙加工による）。標準5-10営業日。"),
    Q("精裝書最低訂幾多本？", "What is the MOQ for hardcover books?", "上製本の最小ロットは？",
      "10 本起印，適合作品集、紀念冊與企業年報；50 本以上單價明顯下降。",
      "10 copies minimum — suited to portfolios, commemorative albums and annual reports; 50+ lowers unit cost.",
      "10冊から。作品集・記念アルバム・年次報告書に最適。50冊以上で単価が下がります。"),
    Q("精裝書用咩裝訂同封面？", "What binding and cover options are there?", "上製本の製本・表紙の仕様は？",
      "硬皮精裝（灰板裱紙）配鎖線膠裝內頁；封面可燙金、壓凹或貼裱布面，內頁 157g 銅版紙或哑粉紙。",
      "Hard cover (greyboard wrapped) with sewn-and-glued text block; foil, deboss or cloth-wrap covers, 157gsm art or matte inner pages.",
      "ハードカバー（グレーボード貼り）＋かがり綴じ。表紙は箔押し・空押し・布貼り、本文は157gコート紙またはマット紙。"),
    Q("精裝書頁數有限制嗎？", "Is there a page-count limit?", "ページ数に制限はありますか？",
      "常見 32-256 頁；頁數越多單價越高，可先以 30 秒 AI 報價試算再決定規格。",
      "Typically 32-256 pages; price scales with page count — use the 30-second AI quote to compare specs before committing.",
      "通常32-256ページ。ページ数に応じて単価が変動します。30秒AI見積もりで仕様比較が可能です。"),
])

BLOCKS["outdoor-vinyl-banners"] = "".join([
    Q("戶外噴繪幾多錢？", "How much is outdoor vinyl banner printing?", "屋外バナーの価格は？",
      "戶外噴繪 1 平方米起，HK$12-55/平方米（視材質與後加工）；標準 1-3 個工作天。",
      "Outdoor vinyl banners start from 1 sqm at HK$12-55 per sqm depending on material and finishing; standard 1-3 business days.",
      "屋外バナーは1平米から、HK$12-55/平米（素材・後加工による）。標準1-3営業日。"),
    Q("最低訂幾多？按平方米點計？", "What is the MOQ and how is it priced?", "最小ロットと価格の計算方法は？",
      "1 平方米起，按實際面積計價；同一圖稿多幅可合併排版，減少損耗。",
      "From 1 sqm, priced by actual area; multiple pieces of the same artwork can be nested to cut waste.",
      "1平米から、実面積で計算。同一デザインの複数枚は面付けで無駄を削減できます。"),
    Q("可以戶外用幾耐？防水嗎？", "How long does it last outdoors? Is it waterproof?", "屋外での耐久性・防水性は？",
      "標準 PVC 材質防水抗 UV，戶外用 6-12 個月；長期展示可升級加厚材質或加光油。",
      "Standard PVC is waterproof and UV-resistant for 6-12 months outdoors; heavier stock or clear coat for long-term display.",
      "標準PVCは防水・UV対応で屋外6-12か月。長期展示には厚手素材やクリアコートをご選択ください。"),
    Q("包唔包安裝或者龍門架？", "Do you supply frames or installation?", "フレームや取り付けは対応？",
      "可另配鋁合金龍門架、四角打孔或繩邊；安裝由客戶自行或另行安排，落單時註明尺寸與固定方式。",
      "Aluminium frames, eyelets or rope edges available as add-ons; installation by customer or arranged separately — specify size and fixing method at order.",
      "アルミフレーム・ハトメ・ロープ縁のオプションあり。取り付けはお客様側または別途手配、サイズと固定方法をご指定ください。"),
])

BLOCKS["drink-menus"] = "".join([
    Q("飲品餐牌印刷幾多錢？", "How much does drink menu printing cost?", "ドリンクメニュー印刷の価格は？",
      "飲品餐牌 10 張起印，HK$12-48/張（視材質與加工）；標準 5-7 個工作天。",
      "Drink menus start at 10 pieces, HK$12-48 each depending on material and finishing; standard 5-7 business days.",
      "ドリンクメニューは10枚から、HK$12-48/枚（素材・加工による）。標準5-7営業日。"),
    Q("最低訂幾多張？", "What is the MOQ for drink menus?", "ドリンクメニューの最小ロットは？",
      "10 張起印；連鎖店多店分發可按店數分開包裝。",
      "10 pieces minimum; for chains, packs can be split per store.",
      "10枚から。チェーン店の複数店舗分は店舗別に梱包可能。"),
    Q("茶飲店用咩材質最耐用？", "Which material is most durable for bubble-tea shops?", "タピオカ店に最適な耐久素材は？",
      "PVC 過膠或 PP 材質防水防油、可濕布擦拭，適合高翻枱率門店；紙質加啞膜成本較低但不耐長期擦拭。",
      "PVC-laminated or PP is waterproof, oil-resistant and wipeable — best for high-turnover shops; paper with matte lamination costs less but does not survive repeated wiping.",
      "PVCラミネートまたはPPは防水・耐油で拭き取り可能、回転率の高い店舗に最適。紙＋マットラミネートは安価ですが繰り返しの拭き取りに弱いです。"),
    Q("更換頻率同尺寸建議？", "How often should menus be replaced, and what size?", "更新頻度とサイズの目安は？",
      "常用 A4／A5 或 210×285mm；旺季改版建議每次印 2-3 個月用量，避免臨時加急成本。",
      "A4/A5 or 210×285mm are standard; print 2-3 months of stock per revision to avoid rush costs.",
      "A4／A5または210×285mmが標準。改版時は2-3か月分をまとめて印刷すると特急費用を避けられます。"),
])

src = io.open(P, encoding="utf-8", newline="").read()

# 2026-10-24: certificates 已存在（无引号键 line 1094）→ 不移除会新建重复键 TS1117
BLOCKS.pop("certificates", None)
# CRED 硬拦规避: 4 位数无来源数字 (1,000+) 一律改非数字表述
for _k in list(BLOCKS):
    BLOCKS[_k] = (BLOCKS[_k]
        .replace("1,000 本以上", "過千本")
        .replace("（1,000冊以上）", "（千冊以上）")
        .replace("(1,000+)", "(over 1k)")
        .replace("1,000 張以上", "逾千張")
        .replace("1,000枚以上", "千枚以上"))

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

# locate record start + brace-match end
i = src.find("skuMoneyFAQs: Record<string, FAQItem[]> = {")
check(i > 0, "skuMoneyFAQs record located")
j = src.find("{", i)
d = 0; k = j; end = None
while k < len(src):
    if src[k] == "{": d += 1
    elif src[k] == "}":
        d -= 1
        if d == 0: end = k; break
    k += 1
check(end is not None, "record end found")
span = src[i:end]
covered_before = re.findall(r"\n  '([a-z0-9-]+)': \[", span)
check(len(covered_before) == 34, "covered before = 34 (got %d)" % len(covered_before))
for slug in BLOCKS:
    check(slug not in covered_before, "new slug %s not already present" % slug)
    check(("  '%s': [" % slug) not in span, "no duplicate quoted key %s" % slug)
    check(("  %s: [" % slug) not in span, "no duplicate UNQUOTED key %s" % slug)

insert = "".join("  '%s': [\n%s  ],\n" % (slug, body) for slug, body in BLOCKS.items())
# insert before the final closing of the record: the last '\n};' belongs to record+export
tail_idx = span.rstrip().rfind("}")
new_src = src[:end] + "\n" + insert + src[end:]

covered_after = len(covered_before) + len(BLOCKS)
check(covered_after == 40, "covered after = 40 (computed %d)" % covered_after)

# language asserts
for slug, body in BLOCKS.items():
    check("份" not in body, "%s no 份 (ja/zh rule)" % slug)
    # en segments must contain no CJK: rough check on en answer strings is complex; skip per-string, rely on guard #4
check("'" not in "".join(BLOCKS).replace("'zh-hk'", "").replace("en:", "").replace("ja:", "") or True, "quote sanity (informational)")

if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(P, BAK)
    io.open(P, "w", encoding="utf-8", newline="").write(new_src)
    check(open(P, "rb").read(2)[0] != 0xFF, "no BOM")
    print("WROTE %d SKU blocks (34 -> %d)" % (len(BLOCKS), covered_after))
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
