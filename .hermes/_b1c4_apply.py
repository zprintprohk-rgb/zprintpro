# -*- coding: utf-8 -*-
"""
B1c cluster4: food-boxes <-> folding-boxes x3 locales.
Disease: en body 0.98 / ja body 0.94 (generic packaging template); folding zh body = mailer template;
folding desc/h1 diseases; food ja H1 template; 6 imageAlts broken (MOQ-note / pet / origin-leak);
packaging faqSchema template x2 slots (of 12 family-wide; other 10 -> cluster 8 register).
Three-piece discipline: backup + count assertions + shape assertions; verify first, apply on green.
"""
import io, json, os, re, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
MODE = "apply" if "--apply" in sys.argv else "verify"
BAK = os.path.join(ROOT, ".hermes", "_bak-b1c4-20261015")

CSV_PATH = os.path.join(ROOT, "zprintpro-sku-seo-data.csv")
TS_PATH = os.path.join(ROOT, "src", "data", "sku-seo-data.ts")
PROD_PATH = os.path.join(ROOT, "src", "data", "products.ts")

errors = []

def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond:
        errors.append(msg)

def equiv(s):
    return sum(2 if ord(c) > 0x2E80 else 1 for c in s)

def load(path):
    with io.open(path, "r", encoding="utf-8", newline="") as f:
        return f.read()

# ================================================================ CSV
raw_csv = load(CSV_PATH)
csv_lines = raw_csv.split("\n")
csv_trailing_nl = raw_csv.endswith("\n")
header = csv_lines[0].split("\t")
COL = {n: i for i, n in enumerate(header)}
SLUG_COL = COL["Slug"]
row_idx = {}
for i, ln in enumerate(csv_lines):
    c = ln.split("\t")
    if len(c) > SLUG_COL and c[COL["Slug"]] in ("food-boxes", "folding-boxes"):
        row_idx[c[COL["Slug"]]] = i
check(len(row_idx) == 2, "CSV rows: %s" % sorted(row_idx))

csv_edits = [
    # ---- food-boxes: h1 ja + keywords zh/ja + alts x3 (title/desc/h1 zh-en + kw en untouched)
    ("food-boxes", "H1标题(JA)",
     "高品質・短納期・グローバル配送。ZprintPro がプロフェッショナル印刷サービスを提供。",
     "食品パッケージ箱 100個〜：FDA食品グレード・防油内層・PET窓対応"),
    ("food-boxes", "SEO关键词(ZH)",
     "食品包裝盒,食品包裝印刷,食品包裝訂製,包裝盒印刷,瓦楞紙盒,禮品盒,定制包裝,化妝品盒,食品盒,快遞盒",
     "食品包裝盒,食品包裝印刷,食品包裝訂製,防油紙盒,食品級包裝,月餅禮盒包裝,包裝盒印刷"),
    ("food-boxes", "SEO关键词(JA)",
     "食品パッケージ,食品パッケージ 印刷,food boxes,パッケージボックス印刷,化粧箱,食品箱,ギフトボックス,メール便箱,オリジナルパッケージ,組み立て箱",
     "食品パッケージ,食品パッケージ 印刷,食品包装箱,防油パッケージ,月餅ギフト箱,食品グレード箱,オリジナルパッケージ"),
    ("food-boxes", "图片Alt标签(ZH)",
     "一般為100個起訂，定制盒型需500個起。",
     "食品包裝盒印刷 / FDA食品級 / 防油 | 香港食品包裝盒印刷 350g食品級白卡・PE/PLA防油內層 100個起印 | 智印港"),
    ("food-boxes", "图片Alt标签(EN)",
     "Custom Food Boxes for pet food and brand labels — ZprintPro",
     "Food Box Printing / FDA Food-Grade / Greaseproof | Custom Food Boxes 350g Food-Grade Card, 100 MOQ | ZprintPro"),
    ("food-boxes", "图片Alt标签(JA)",
     "食品パッケージ / 食品包裝箱 | 香港の食品パッケージ印刷 | ZprintPro",
     "食品パッケージ箱印刷 / FDA食品グレード / 防油 | 食品パッケージ箱 350gフードグレードカード 100個から | ZprintPro"),
    # ---- folding-boxes: desc x3 + h1 x3 + kw x3 + alts x3
    ("folding-boxes", "SEO描述(ZH)",
     "折疊禮盒/折疊盒 100 個起。採用 白卡/牛皮紙/灰板 高品質材質，支援 訂製尺寸 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計。7-10 個工作天交貨，港九新界免費速遞，順豐速遞上門。專業團隊、價格透明，企業活動、店舖推廣首選。",
     "智印港折疊盒印刷訂製：300g-350g 白卡或 E 坑瓦楞，自動鎖底通過 80cm 跌落測試（5kg 不開口），平板出貨節省 70% 倉儲空間。100 個起 HK$2.5 起，燙金/覆膜/局部 UV，DTC 電商與節日禮盒首選，5-7 個工作天交貨，30 秒 AI 報價。"),
    ("folding-boxes", "SEO描述(EN)",
     "Folding Boxes custom printing, eco-friendly kraft paper. Free design mockup, 100 MOQ, Free Shipping $99+. 4-day USA delivery for retail packaging. | ZprintPro",
     "Custom folding boxes that ship flat and save 70% warehouse space. Auto-lock bottom passes an 80cm drop test at 5kg. 300-350gsm card or E-flute, foil and spot UV, 100 MOQ from HK$2.5. Ideal for DTC e-commerce and festival gift boxes. 5-7 day production, 30-second AI quote."),
    ("folding-boxes", "SEO描述(JA)",
     "折り畳み箱の折り畳み箱は ZprintPro にお任せ。白カード/クラフト/グレー台紙 高品質用紙、カスタムサイズ 各種対応。4色 CMYK 印刷、デザイン自由。100個〜、7-10営業日で全国配送。30秒無料見積もり、深夜対応OK。自社工場直結の安心感。",
     "折りたたみ箱のカスタム印刷は100個から、1個¥69〜。自動ロック底は80cm落下試験・5kg耐荷重、平置き出荷で倉庫スペース70%削減。300-350gカード/Eフルート、箔押し・スポットUV対応。DTC EC・月餅ギフトに最適、納期5-7営業日、30秒AI見積り。"),
    ("folding-boxes", "H1标题(ZH)",
     "可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。智印港提供專業折疊盒服務，香港本地印刷，品質保證，價格透明。",
     "折疊盒印刷訂製 — 平板出貨省 70% 倉儲・自動鎖底 80cm 跌落測試"),
    ("folding-boxes", "H1标题(EN)",
     "Folding Boxes 100+ | Auto-Lock | ZprintPro",
     "Folding Box Printing: Flat-Shipped, Auto-Lock, 100 MOQ"),
    ("folding-boxes", "H1标题(JA)",
     "高品質・短納期・グローバル配送。ZprintPro がプロフェッショナル印刷サービスを提供。",
     "折りたたみ箱 100個〜：自動ロック底・平置き出荷で倉庫 70% 削減"),
    ("folding-boxes", "SEO关键词(ZH)",
     "折疊禮盒,折疊盒,禮盒訂製,包裝盒印刷,瓦楞紙盒,禮品盒,定制包裝,化妝品盒,食品盒,快遞盒",
     "折疊盒,折疊盒印刷,折疊禮盒,禮盒訂製,自動鎖底盒,平板包裝盒,包裝盒印刷"),
    ("folding-boxes", "SEO关键词(EN)",
     "folding boxes,folding cartons,tuck end boxes,auto lock bottom boxes,retail packaging boxes,cosmetic boxes,food boxes folding,folding boxes free shipping,bulk folding boxes,bespoke folding cartons",
     "folding boxes,folding cartons,tuck end boxes,auto lock bottom boxes,flat pack boxes,retail packaging boxes,custom folding boxes"),
    ("folding-boxes", "SEO关键词(JA)",
     "折り畳み箱,折り畳み箱 印刷,folding boxes,パッケージボックス印刷,化粧箱,食品箱,ギフトボックス,メール便箱,オリジナルパッケージ,組み立て箱",
     "折りたたみ箱,折りたたみ箱 印刷,折り畳み箱,自動ロック底箱,化粧箱,オリジナルパッケージ,組み立て箱"),
    ("folding-boxes", "图片Alt标签(ZH)",
     "一般為100個起訂，定制盒型需500個起。",
     "折疊盒印刷 / 平板出貨 / 自動鎖底 | 香港折疊盒印刷 300g-350g白卡・E坑瓦楞 100個起印 | 智印港"),
    ("folding-boxes", "图片Alt标签(EN)",
     "Custom Folding Boxes for pet food and brand labels — ZprintPro",
     "Folding Box Printing / Flat-Shipped / Auto-Lock | Custom Folding Boxes 300-350gsm Card & E-Flute, 100 MOQ | ZprintPro"),
    ("folding-boxes", "图片Alt标签(JA)",
     "折りたたみ箱 / パッケージボックス | 香港の折りたたみ箱印刷 | ZprintPro",
     "折りたたみ箱印刷 / 平置き出荷 / 自動ロック底 | 折りたたみ箱 300g-350gカード・Eフルート 100個から | ZprintPro"),
]

print("=== CSV edits ===")
csv_cell_edits = []
for slug, colname, old, new in csv_edits:
    i = row_idx[slug]
    cells = csv_lines[i].split("\t")
    ci = COL[colname]
    cell = cells[ci]
    check(cell == old, "CSV %s.%s exact (len %d)" % (slug, colname, len(cell)))
    if cell != old:
        print("       actual: %r" % cell[:140]); continue
    csv_cell_edits.append((i, ci, cell, new))
    if colname.startswith("H1标题"):
        check(equiv(new) <= 90, "h1 equiv sanity %d <=90" % equiv(new))
    if "关键词" in colname:
        arr = [w.strip() for w in new.split(",") if w.strip()]
        check(5 <= len(arr) <= 10, "kw count %d" % len(arr))
        check(any(("盒" in w) or ("箱" in w) or ("box" in w.lower()) for w in arr), "kw anchor present")
    if "图片Alt" in colname:
        check("pet food" not in new and "起訂" not in new and "香港の" not in new, "alt disease purged")

# ================================================================ ts bodies (line-level, unique prefix)
raw_ts = load(TS_PATH)
ts_lines = raw_ts.split("\n")

FOOD_EN_BODY = ('"body": "Food-safe box printing starts with matching the stock and the lining to what goes inside. '
'ZprintPro food boxes run from 100 pieces at HK$2.5-18/pc on 350g food-grade white card or 400g grey-back board, '
'with PE or PLA greaseproof, moisture-resistant linings and FDA-safe indirect food contact as standard. '
'Submit artwork and a free digital proof lands within 1 hour; the 30-second AI quote prices size, stock and finish instantly.'
'\\n\\nThe food-safety decision has two layers. Indirect contact — tea leaves, chocolate bars in foils, snack sachets, '
'supplement blister packs — clears with food-grade card, FDA-safe adhesives and food-contact-safe inks. '
'Direct contact — pastries straight on the box, candies without wrappers, fresh produce — wants the PE lining for grease and moisture, '
'or the PLA option when the brief includes compostability. Share the product type and shelf life and we match the combination, '
'with FSC-certified paper and soy-based ink across the range.'
'\\n\\nThe scenarios this box was built for: mooncake and festival gift boxes where a PET window shows the assortment, '
'tea gift boxes with foil-stamped logos on 400g board, bakery and pastry boxes for daily counter service, '
'supplement brands that need batch-traceable variable QR codes, and bubble-tea or takeaway sets that pair the box with '
'[waterproof stickers](/en/product/waterproof-stickers/) for cold-chain cup labels.'
'\\n\\nStructures follow the product: auto-lock, straight-tuck and reverse-tuck end boxes, lid-and-base setup boxes, '
'book-style and drawer boxes, plus shaped die-cuts — every standard style ships with a free dieline template. '
'PET clear windows display the contents; variable QR codes link each batch to its traceability page.'
'\\n\\nPricing and logistics: 100-piece MOQ with no plate fees (custom sizes and shaped die-cuts from 500), '
'standard production 3-5 business days, rush (24-hour proof + 2-day production) at +20%, '
'SF Express 1-2 days across HK, DHL 2-4 days worldwide with free US shipping over $99. '
'See the full range at [packaging box printing](/en/category/packaging/), or pair with [paper bags](/en/category/paper-bags/) for a one-stop festive set.'
'\\n\\n**FAQ**'
'\\n\\n**Q1: What is the MOQ and price for food boxes?**'
'\\n100 pieces from HK$2.5-18/pc depending on size, stock and finish; custom sizes and shaped die-cuts start at 500 pieces.'
'\\n\\n**Q2: Which lining should I choose — PE or PLA?**'
'\\nPE for grease and moisture at the lowest cost; PLA when compostability matters. Both work as greaseproof linings for pastries and fried snacks.'
'\\n\\n**Q3: Can food boxes carry a window or QR code?**'
'\\nYes — PET clear windows and variable-data QR codes are both supported on the same panel.'
'\\n\\n**Q4: How fast can I get food boxes?**'
'\\nStandard 3-5 business days plus SF Express 1-2 days locally; rush with 24-hour proof and 2-day production is +20%; DHL delivers worldwide in 2-4 days.'
'\\n\\nReady when you are — free digital proof in 1 hour via WhatsApp +86 198 8085 1334, or the 30-second AI quote button on this page.",')

FOOD_JA_BODY = ('"body": "食品パッケージ箱印刷は、中身に合わせて紙と防油内層を選ぶところから始まります。'
'ZprintPro の食品パッケージ箱は100個から HK$2.5-18/個、350gフードグレード白カードまたは400gグレーボード、'
'PEまたはPLA防油・防湿内層、間接食品接触対応のFDAセーフ仕様。データ提出後1時間で無料デジタル校正をお届けし、'
'30秒AI見積りでサイズ・紙・加工を即時試算できます。'
'\\n\\n食品安全の判断は2層あります。間接接触——茶葉、箔包のチョコ、スナック袋入り、サプリのPTP——は、フードグレード紙・FDAセーフ接着剤・食品接触対応インクで対応。'
'直接接触——箱に直接載せる焼き菓子、包装なしのキャンディ、生鮮——は防油・防湿のPE内層、コンポスト可能性まで求めるならPLAを選択。'
'商品種別と賞味期限をお知らせいただければ、FSC認証紙・大豆インクの範囲で最適な組み合わせをご提案します。'
'\\n\\n活用シーンは月餅・節句ギフトボックス（PET窓で中身を見せる）、茶葉ギフト箱（400g板に箔押しロゴ）、'
'ベーカリーの日常対応ボックス、バッチ追跡の可変QRが必要なサプリブランド、'
'そして[防水シール](/ja/product/waterproof-stickers/)と組み合わせるタピオカ・テイクアウトセット。'
'\\n\\n箱型式は内容物に合わせて：自動ロック・ストレートタック・リバースタックの差し込み箱、天地蓋、ブック型、引き出し式、'
'さらに型抜き形状——標準式にはすべて無料型紙テンプレートを同梱。PETクリア窓で中身を演出し、可変QRで各ロットを追跡ページへ。'
'\\n\\n価格と物流：100個から版代ゼロ（カスタムサイズ・型抜きは500個から）、標準生産3-5営業日、'
'お急ぎ便（24時間校正+2日制作）は20%増、香港本地はSF Express 1-2日、DHLで世界2-4日。'
'全体像は [パッケージボックス印刷](/ja/category/packaging/)、姉妹品の [折りたたみ箱](/ja/product/folding-boxes/) もご覧ください。'
'\\n\\n**よくある質問**'
'\\n\\n**Q1: 最小注文数と価格は？**'
'\\n100個から HK$2.5-18/個（サイズ・紙・加工により変動）。カスタムサイズ・型抜きは500個から。'
'\\n\\n**Q2: PEとPLA、どちらの内層を選べば？**'
'\\n防油・防湿を最安で抑えるならPE、コンポスト対応まで求めるならPLA。焼き菓子や揚げ物の防油ライナーとしてどちらも有効です。'
'\\n\\n**Q3: 窓やQRコードは入れられますか？**'
'\\nはい。PETクリア窓と可変データQRは同じ面板に併用できます。'
'\\n\\n**Q4: 納期はどのくらい？**'
'\\n標準3-5営業日+本地SF Express 1-2日。お急ぎ便（24時間校正+2日制作）は20%増、DHLで世界2-4日。'
'\\n\\nご入稿から1時間で無料デジタル校正——WhatsApp +86 198 8085 1334 または商品ページの「30秒AI見積り」からどうぞ。",')

FOLD_ZH_BODY = ('"body": "折疊盒印刷訂製，100 個起印、HK$2.5-15/個，300g-350g 白卡或 E 坑瓦楞可選。自動鎖底結構通過 80cm 跌落測試（5kg 載重不開口），'
'平板出貨節省 70% 以上倉儲空間——發貨時是一疊紙皮，上架時是成型硬盒。提交設計檔案 1 小時內免費數碼打稿，30 秒 AI 報價即時試算。'
'\\n\\n電商賣家的倉儲帳要這樣算：同一批包裝，成品盒佔用空間是摺平狀態的三倍以上。折疊盒以平板狀態交貨，'
'旺季前大量備貨不搶倉位，出貨前現場摺合成型即可；摺痕角度出廠前已壓好，附免費展開圖（刀模線）與組裝指引，收貨即摺即用。'
'\\n\\n材質與加固決策：300g-350g 白卡適合 1kg 內的零售裝；E 坑瓦楞加固適合較重電商產品；啞膜/光膜防刮耐磨，'
'局部 UV 點綴品牌位；燙金條碼一版兩用——金／銀箔品牌位與可變條碼物流掃描位共存同一面板。'
'\\n\\n盒型結構：自動鎖底插口盒、直插/反插、天地蓋、書型盒、抽屜式及異形切割，全部支援 CMYK 全彩；'
'需要直接接觸食品或防油防濕，轉 [食品包裝盒](/zh-hk/product/food-boxes/)（FDA 食品級 + PE/PLA 防油內層）；'
'重載運輸看 [快遞盒/飛機盒](/zh-hk/product/mailer-boxes/)；高級禮盒看 [精裝盒](/zh-hk/product/rigid-boxes/)；'
'盒型總覽見 [包裝盒印刷類目](/zh-hk/category/packaging/)。'
'\\n\\n交稿與收費：300 DPI、CMYK、3mm 出血、字體外框化，1 小時免費打稿、無開版費；'
'100 個起印（自訂尺寸/異形 500 個起），標準生產 5-7 個工作天，加急（24 小時打稿 + 2 天生產）加收 20%；'
'港九新界順豐 1-2 天送達，跨境 DHL 2-4 天，美國 $99+ 免運。'
'\\n\\n**常見問題**'
'\\n\\n**Q1: 折疊盒同精裝盒點揀？**'
'\\n平放貨品、要慳倉慳運費，摺疊盒；高級手感、結構固定、冇得摺，精裝盒。電商日常出貨用摺疊盒，年度禮盒先上精裝。'
'\\n\\n**Q2: 自動鎖底穩唔穩？**'
'\\n穩。自動鎖底插口結構通過 80cm 跌落測試，5kg 載重不開口；更重的貨升級 E 坑瓦楞。'
'\\n\\n**Q3: 可以印條碼或者加窗口嗎？**'
'\\n可以。燙金條碼（含可變數據）支援品牌與物流掃描兼顧；PET 透明窗口可展示內裝產品。'
'\\n\\n**Q4: 起訂量同交期？**'
'\\n100 個起印，標準 5-7 個工作天，加急（24 小時打稿 + 2 天生產）加收 20%；旺季建議提早 3-4 週落單。'
'\\n\\n準備好就落單——1 小時免費打稿，WhatsApp 客服 +86 198 8085 1334 或頁面「30 秒 AI 報價」按鈕。",')

FOLD_EN_BODY = ('"body": "Folding boxes earn their keep in the warehouse math: they ship flat and save 70%+ storage space, '
'then pop open into a rigid-feeling box at packing time. ZprintPro folding boxes run from 100 pieces at HK$2.5-15/pc '
'on 300-350gsm white card or E-flute corrugated, with an auto-lock bottom that passes an 80cm drop test at 5kg. '
'Free digital proof within 1 hour of file submission; the 30-second AI quote prices size, stock and finish instantly.'
'\\n\\nStock and reinforcement decisions: 300-350gsm card suits retail packs up to 1kg; E-flute corrugated takes the heavier '
'e-commerce loads; matte or gloss lamination fights scuffs, spot UV picks out the brand mark; and foil-stamped barcodes '
'— including variable data — put the brand finish and the logistics scan on the same panel.'
'\\n\\nStructures: auto-lock, straight-tuck and reverse-tuck ends, lid-and-base, book-style, drawer and shaped die-cuts, '
'all CMYK full colour with free dieline templates and assembly guides — creases are pre-scored at the plant, so boxes fold '
'and lock on arrival. Food-grade or greaseproof requirements belong on [food boxes](/en/product/food-boxes/) '
'(FDA food-grade with PE/PLA linings); heavy transport goes to [mailer boxes](/en/product/mailer-boxes/); '
'premium gifting goes to [rigid boxes](/en/product/rigid-boxes/); the full map lives at [packaging box printing](/en/category/packaging/).'
'\\n\\nSpecs and pricing: 300 DPI, CMYK, 3mm bleed, outlined fonts; 1-hour free proof, no plate fees; '
'100-piece MOQ (custom sizes and shaped die-cuts from 500), standard production 5-7 business days, '
'rush (24-hour proof + 2-day production) at +20%; SF Express 1-2 days across HK, DHL 2-4 days worldwide, free US shipping over $99.'
'\\n\\n**FAQ**'
'\\n\\n**Q1: Folding boxes or rigid boxes — which one?**'
'\\nFlat products, tight storage and lower freight: folding. Fixed structure and premium hand-feel: rigid. Daily e-commerce runs on folding; annual gift programs go rigid.'
'\\n\\n**Q2: How strong is the auto-lock bottom?**'
'\\nIt passes an 80cm drop test holding 5kg without opening; upgrade to E-flute corrugated for heavier goods.'
'\\n\\n**Q3: Can I print barcodes or add a window?**'
'\\nYes — foil-stamped barcodes with variable data are supported, and PET clear windows can display the contents.'
'\\n\\n**Q4: MOQ and turnaround?**'
'\\n100 pieces minimum, standard 5-7 business days, rush at +20%; order 3-4 weeks ahead of peak season.'
'\\n\\nReady when you are — 1-hour free proof via WhatsApp +86 198 8085 1334 or the 30-second AI quote button.",')

FOLD_JA_BODY = ('"body": "折りたたみ箱は倉庫計算で価値を出します：平置きのまま出荷して保管スペースを70%以上削減、'
'梱包時に組み立てればしっかりした箱に。ZprintPro の折りたたみ箱は100個から HK$2.5-15/個、'
'300-350gホワイトカードまたはEフルート段ボール、自動ロック底は80cm落下試験・5kg耐荷重をクリア。'
'データ提出後1時間で無料デジタル校正、30秒AI見積りでサイズ・紙・加工を即時試算。'
'\\n\\n紙と補強の判断：300-350gカードは1kgまでの小売パッケージ向き、重いEC商品はEフルート補強、'
'マット/グロスラミネートで擦れに強く、スポットUVでブランド部位を演出。'
'箔押しバーコード（可変データ対応）はブランド仕上げと物流スキャンを同じ面板に両立させます。'
'\\n\\n箱型式：自動ロック・ストレートタック・リバースタック、天地蓋、ブック型、引き出し式、型抜き形状——'
'標準式に無料型紙テンプレートと組立ガイドを同梱、折り曲げ線は工場で先行圧着済みで届いたらすぐ組めます。'
'食品グレードや防油が必要なら [食品パッケージ箱](/ja/product/food-boxes/)（FDA食品グレード+PE/PLA内層）、'
'重貨は [メーラーボックス](/ja/product/mailer-boxes/)、高級ギフトは [上製本箱](/ja/product/rigid-boxes/)、'
'全体像は [パッケージボックス印刷](/ja/category/packaging/) へ。'
'\\n\\n入稿と価格：300 DPI・CMYK・3mm塗り足し・フォントアウトライン化、1時間無料校正・版代ゼロ、'
'100個から（カスタムサイズ・型抜き500個から）、標準生産5-7営業日、お急ぎ便（24時間校正+2日制作）は20%増、'
'香港本地はSF Express 1-2日、DHLで世界2-4日。'
'\\n\\n**よくある質問**'
'\\n\\n**Q1: 折りたたみ箱と上製本箱、どっち？**'
'\\n平置き商品・保管と運費を抑えるなら折りたたみ、固定構造と高級感なら上製本箱。日常ECは折りたたみ、年次ギフトは上製が定番です。'
'\\n\\n**Q2: 自動ロック底の強度は？**'
'\\n80cm落下試験・5kgで開かないことをクリア。より重い商品はEフルートへグレードアップ。'
'\\n\\n**Q3: バーコードや窓は印刷できますか？**'
'\\nはい。箔押しバーコード（可変データ含む）とPETクリア窓の併用に対応します。'
'\\n\\n**Q4: 最小注文数と納期は？**'
'\\n100個から、標準5-7営業日、お急ぎ便は20%増。繁忙期は3-4週間前のご注文が安心です。'
'\\n\\nご入稿から1時間で無料校正——WhatsApp +86 198 8085 1334 または「30秒AI見積り」ボタンからどうぞ。",')

BODY_PREFIXES = [
    ("food-boxes", '"body": "Custom food boxes designed for US small business', FOOD_EN_BODY, "en"),
    ("food-boxes", '"body": "カスタム 食品包裝箱', FOOD_JA_BODY, "ja"),
    ("folding-boxes", '"body": "Custom folding boxes designed for US small business', FOLD_EN_BODY, "en"),
    ("folding-boxes", '"body": "カスタム 折りたたみ箱', FOLD_JA_BODY, "ja"),
]
print("=== ts body line edits ===")
ts_line_edits = []
for slug, prefix, new_line, loc in BODY_PREFIXES:
    # locate block range
    si = raw_ts.find('"%s": {' % slug)
    ei = raw_ts.find('\n  "', si + 4)
    seg = raw_ts[si:ei if ei > 0 else len(raw_ts)]
    hits = [k for k, ln in enumerate(ts_lines) if ln.strip().startswith(prefix)]
    inblock = [k for k in hits if si <= sum(len(x) + 1 for x in ts_lines[:k]) < (ei if ei > 0 else len(raw_ts))]
    check(len(inblock) == 1, "ts %s %s body line unique in block (hit=%d)" % (slug, loc, len(inblock)))
    if len(inblock) == 1:
        k = inblock[0]
        ts_line_edits.append((k, ts_lines[k], new_line))
        check('"body": "' in new_line and new_line.rstrip().endswith('",'), "new body line shape ok (%s %s)" % (slug, loc))
        for u in re.findall(r"\]\((/[^)]+)\)", new_line):
            check(u.startswith("/en/") or u.startswith("/ja/") or u.startswith("/zh-hk/"), "link prefix %s" % u)

# simplified/traditional leaks in ja new text
for slug, prefix, new_line, loc in BODY_PREFIXES:
    if loc == "ja":
        bad = [c for c in new_line if c in "裝內統結後紙張發應變現見問來對開時實長們"]
        # 裝內 are traditional-only; note: 統結後紙張發應變現見問來對開時實長們 appear in ja? no — ja uses 別/満... check only risky ones
        bad = [c for c in new_line if c in "裝內"]
        check(not bad, "%s ja body no traditional-only chars (found %s)" % (slug, "".join(set(bad))))
    if loc == "zh":
        bad = [c for c in new_line if c in "们后发这说时实现对开页买张东丝乐针让贝见车转换运远设图风络"]
        check(not bad, "%s zh body no simplified chars (found %s)" % (slug, "".join(set(bad))))

# ================================================================ products.ts faqSchema x2
raw_prod = load(PROD_PATH)
prod_lines = raw_prod.split("\n")
pstarts = {}
for i, ln in enumerate(prod_lines):
    for s in ("food-boxes", "folding-boxes"):
        if ("slug: '%s'" % s) in ln:
            pstarts[s] = i

FAQ_NEW = {
 "food-boxes": '[{"question": "What is the MOQ and price for custom food boxes?", "answer": "100 pieces standard, from HK$2.5-18/pc depending on size, stock and finish; custom sizes and shaped die-cuts start at 500 pieces."}, {"question": "Are the boxes food-safe?", "answer": "Food-grade card with FDA-safe indirect food contact as standard; PE or PLA greaseproof, moisture-resistant linings available. For direct food contact (pastry, unwrapped candy) we recommend the lining options — share your product type and we match the stock."}, {"question": "Can food boxes have windows or QR codes?", "answer": "Yes — PET clear windows showcase the contents, and variable-data QR codes support batch traceability and anti-counterfeit checks on the same panel."}, {"question": "What is the turnaround for food boxes?", "answer": "Standard 3-5 business days production plus SF Express 1-2 days locally; rush (24-hour proof + 2-day production) at +20%; DHL delivers worldwide in 2-4 days."}]',
 "folding-boxes": '[{"question": "Why do folding boxes save storage cost?", "answer": "They ship flat — folded flat they save 70%+ warehouse space versus assembled boxes, and fold up in seconds at packing time thanks to pre-scored creases and the included assembly guide."}, {"question": "How strong is the auto-lock bottom?", "answer": "The auto-lock bottom passes an 80cm drop test holding 5kg without opening; upgrade to E-flute corrugated for heavier e-commerce loads."}, {"question": "What is the MOQ for folding boxes?", "answer": "100 pieces standard, from HK$2.5-15/pc; custom sizes and shaped die-cuts from 500 pieces, with volume discounts at higher quantities."}, {"question": "Can folding boxes carry barcodes or foil?", "answer": "Yes — gold/silver foil and variable-data barcodes are both supported, so the brand finish and the logistics scan live on the same panel; PET clear windows are also available."}]',
}
print("=== products.ts faqSchema ===")
prod_line_edits = []
TPL = 'What is the MOQ for custom packaging boxes?'
for slug, newfaq in FAQ_NEW.items():
    st = pstarts[slug]
    hit = next((i for i in range(st, st + 110) if "faqSchema:" in prod_lines[i]), None)
    check(hit is not None, "faqSchema line for %s" % slug)
    if hit is None:
        continue
    old_line = prod_lines[hit]
    check(TPL in old_line, "%s old faqSchema = packaging template" % slug)
    try:
        check(len(json.loads(newfaq)) == 4, "%s new faqSchema 4 QA" % slug)
    except Exception as ex:
        check(False, "%s faqSchema JSON: %s" % (slug, ex))
    prod_line_edits.append((hit, old_line, "    faqSchema: " + newfaq + ","))

# ================================================================ write
if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    for src in (CSV_PATH, TS_PATH, PROD_PATH):
        shutil.copy2(src, os.path.join(BAK, os.path.basename(src) + ".bak"))
    for i, ci, oldc, newc in csv_cell_edits:
        cells = csv_lines[i].split("\t"); assert cells[ci] == oldc; cells[ci] = newc
        csv_lines[i] = "\t".join(cells)
    new_csv = "\n".join(csv_lines) + ("\n" if csv_trailing_nl else "")
    for k, oldl, newl in ts_line_edits:
        assert ts_lines[k] == oldl; ts_lines[k] = newl
    new_ts = "\n".join(ts_lines)
    for i, oldl, newl in prod_line_edits:
        assert prod_lines[i] == oldl; prod_lines[i] = newl
    new_prod = "\n".join(prod_lines)
    for path, content in ((CSV_PATH, new_csv), (TS_PATH, new_ts), (PROD_PATH, new_prod)):
        with io.open(path, "w", encoding="utf-8", newline="") as f:
            f.write(content)
    for path in (CSV_PATH, TS_PATH, PROD_PATH):
        check(open(path, "rb").read(2)[0] != 0xFF, "no BOM %s" % os.path.basename(path))
    print("\nWROTE: CSV %d cells / ts %d body lines / products.ts %d lines" %
          (len(csv_cell_edits), len(ts_line_edits), len(prod_line_edits)))
else:
    print("\nVERIFY: %d csv cells, %d ts lines, %d prod lines pending." %
          (len(csv_cell_edits), len(ts_line_edits), len(prod_line_edits)))
print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
