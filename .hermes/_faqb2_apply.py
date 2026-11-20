# -*- coding: utf-8 -*-
"""FAQ batch 2: 6 SKUs x 4Q x 3 locales -> skuMoneyFAQs (40 -> 46/83)."""
import io, re, sys, shutil, os

P = r"F:\zprintpro-nextjs\src\data\product-faqs.ts"
BAK = r"F:\zprintpro-nextjs\.hermes\_bak-faqb2-20261024.ts.bak"
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

BLOCKS["magnetic-calendars"] = "".join([
    Q("磁石年曆幾多錢？", "How much do magnetic calendars cost?", "マグネットカレンダーの価格は？",
      "磁石年曆 1 本起印，HK$3-8/本（視尺寸與磁石厚度）；標準 5-7 個工作天。",
      "Magnetic calendars start at HK$3-8 each from 1 piece, depending on size and magnet thickness; standard 5-7 business days.",
      "マグネットカレンダーは1枚から、HK$3-8/枚（サイズ・磁石厚みによる）。標準5-7営業日。"),
    Q("磁石年曆用咩材質？貼得穩嗎？", "What material is used — will it stay on?", "素材は？しっかり貼れますか？",
      "軟磁片材質，可穩貼雪櫃、辦公室白板與金屬門面；表面過膠防刮，全年高頻曝光。",
      "Flexible magnetic sheet holds firmly on fridges, office whiteboards and metal surfaces; laminated face resists scratches for year-round exposure.",
      "柔軟マグネット素材で冷蔵庫・ホワイトボード・金属面にしっかり貼付。表面ラミネートで傷に強く、年間を通して露出できます。"),
    Q("磁石年曆最低訂幾多？", "What is the MOQ for magnetic calendars?", "マグネットカレンダーの最小ロットは？",
      "1 本起印；派發量大的企業禮品可按量階梯報價。",
      "From 1 piece; volume tiers available for large corporate giveaways.",
      "1枚から。大量の企業ノベルティは数量段階でお見積もりします。"),
    Q("尺寸同版面可以自訂嗎？", "Can size and layout be customised?", "サイズやレイアウトはカスタマイズ可能？",
      "可以。尺寸、月曆版式（年曆/月曆格）與企業 LOGO 均可自訂，落單時提供 AI/PDF 稿。",
      "Yes — size, calendar grid (year or monthly) and company logo are fully customisable; submit AI/PDF artwork at order.",
      "可能です。サイズ、暦グリッド（年間・月間）、社名ロゴとも自由に設計可。AI/PDFデータをご入稿ください。"),
])

BLOCKS["photo-frame-calendars"] = "".join([
    Q("相框年曆幾多錢？", "How much do photo-frame calendars cost?", "フォトフレームカレンダーの価格は？",
      "相框年曆 1 本起印，HK$3-8/本；標準 7-10 個工作天。",
      "Photo-frame calendars start at HK$3-8 each from 1 piece; standard 7-10 business days.",
      "フォトフレームカレンダーは1個から、HK$3-8/個。標準7-10営業日。"),
    Q("相框年曆特別在邊度？", "What makes photo-frame calendars special?", "フォトフレームカレンダーの特長は？",
      "硬紙板相架結構，年曆與相框二合一——照片區可換自家產品圖或客戶照，桌面長期展示。",
      "Greyboard easel frame combines calendar and photo frame in one — swap in your product or client photos for lasting desk presence.",
      "グレーボードイーゼル構造でカレンダーとフォトフレームを兼用。商品写真やお客様写真に差し替え可能、机の上に長期展示。"),
    Q("照片可以自己換嗎？", "Can the photo be replaced by the user?", "写真は差し替えできますか？",
      "可以。相框開口位按標準相片比例預留，客戶可自行替換照片或卡片。",
      "Yes — the frame opening follows standard photo ratios, so users can swap photos or cards themselves.",
      "はい。フレーム開口は標準写真比率で、お客様ご自身で写真やカードを差し替えられます。"),
    Q("適合咩場合送？", "What occasions suit photo-frame calendars?", "どんな贈り物に向いていますか？",
      "企業年末答謝、婚攝與攝影工作室客戶禮、母親節/聖誕個人禮品；建議 Q4 提前 3-4 週落單。",
      "Corporate year-end thank-yous, wedding/photography studio client gifts, Mother's Day and Christmas keepsakes; order 3-4 weeks ahead in Q4.",
      "企業の年末挨拶、婚約・撮影スタジオの顧客ギフト、母の日・クリスマス記念品に最適。Q4は3-4週間前のご注文を。"),
])

BLOCKS["laminated-menus"] = "".join([
    Q("過膠餐牌幾多錢？", "How much do laminated menus cost?", "ラミネートメニューの価格は？",
      "過膠餐牌 10 張起印，HK$5-22/張（視尺寸與膠膜厚度）；標準 5-7 個工作天。",
      "Laminated menus start at 10 pieces, HK$5-22 each depending on size and lamination thickness; standard 5-7 business days.",
      "ラミネートメニューは10枚から、HK$5-22/枚（サイズ・ラミネート厚みによる）。標準5-7営業日。"),
    Q("過膠同 PVC 餐牌點揀？", "Laminated or PVC menus — which to choose?", "ラミネートとPVCメニューの違いは？",
      "過膠紙質成本較低、適合每季改版；PVC 全防水可濕擦，適合高翻枱率或戶外座位。預算與更換頻率決定選型。",
      "Laminated paper costs less and suits seasonal menu changes; PVC is fully waterproof and wipeable for high-turnover or outdoor seating. Budget and replacement frequency decide.",
      "ラミネート紙は安価で季節改版向け。PVCは完全防水・拭き取り可能で、回転率の高い店や屋外席向け。予算と更新頻度で選択を。"),
    Q("最低訂幾多張？", "What is the MOQ for laminated menus?", "ラミネートメニューの最小ロットは？",
      "10 張起印；多店分發可按店數分開包裝。",
      "10 pieces minimum; multi-store chains can have packs split per location.",
      "10枚から。チェーン店の複数店舗分は店舗別梱包も可能。"),
    Q("防水防油效果點？", "How water and oil resistant is it?", "防水・耐油性能は？",
      "過膠層防水防油，濕布可直接擦拭；邊位全封邊工藝更耐洗碗水氣，落單時註明。",
      "The lamination layer is water and oil resistant, wipeable with a damp cloth; sealed-edge finishing adds dishwasher-steam durability — specify at order.",
      "ラミネート層は防水・耐油で湿布で拭き取れます。全縁シール加工で蒸気にも強くなります。ご注文時にご指定ください。"),
])

BLOCKS["spiral-notebooks"] = "".join([
    Q("線圈筆記本幾多錢？", "How much do spiral notebooks cost?", "スパイラルノートの価格は？",
      "線圈筆記本 10 本起印，HK$8-40/本（視頁數、尺寸與封面）；標準 5-10 個工作天。",
      "Spiral notebooks start at 10 pieces, HK$8-40 each depending on pages, size and cover; standard 5-10 business days.",
      "スパイラルノートは10冊から、HK$8-40/冊（ページ数・サイズ・表紙による）。標準5-10営業日。"),
    Q("線圈筆記本有咩特點？", "What are the features of spiral binding?", "スパイラル製本の特長は？",
      "金屬或塑膠 YO 環圈裝訂，可 360 度攤平、頁面可整頁撕除或更換；企業內訓與課堂筆記常用。",
      "Metal or plastic YO-ring binding lays flat 360° and allows full-page tear-out or replacement — common for corporate training and classroom notes.",
      "金属またはプラスチックのYOリングで360度開き、ページの全抜き・差し替えが可能。社内研修や授業ノートに人気。"),
    Q("最低訂幾多本？", "What is the MOQ for spiral notebooks?", "スパイラルノートの最小ロットは？",
      "10 本起印；封面可印企業 LOGO，適合採用活動與展會禮品。",
      "10 pieces minimum; covers can carry your company logo — popular for onboarding kits and trade-show gifts.",
      "10冊から。表紙に社名ロゴ印刷可能。採用キットや展示会ノベルティに人気です。"),
    Q("封面同紙材有咩選擇？", "What cover and paper options exist?", "表紙・用紙の選択肢は？",
      "封面 250g 銅版紙過膠或灰板裱紙；內頁 80-120g 道林紙/銅版紙，頁數 40-120 頁可選。",
      "Covers: 250gsm art board laminated or greyboard wrapped; inner pages 80-120gsm woodfree or art paper, 40-120 pages.",
      "表紙は250gコート紙ラミネートまたはグレーボード貼り。本文は80-120gの上質紙・コート紙、40-120ページから選択。"),
])

BLOCKS["colored-envelopes"] = "".join([
    Q("彩色信封幾多錢？", "How much do colored envelopes cost?", "カラーナーブ封筒の価格は？",
      "彩色信封 100 個起印，HK$0.38-2.60/個（視尺寸、紙材與印刷）；標準 3-5 個工作天。",
      "Colored envelopes start at 100 pieces, HK$0.38-2.60 each depending on size, stock and printing; standard 3-5 business days.",
      "カラーナーブ封筒は100枚から、HK$0.38-2.60/枚（サイズ・用紙・印刷による）。標準3-5営業日。"),
    Q("彩色信封最低訂幾多個？", "What is the MOQ for colored envelopes?", "カラーナーブ封筒の最小ロットは？",
      "100 個起印；特殊顏色或材質批量要求較高，落單前先確認。",
      "100 pieces minimum; special colors or stocks require larger runs — confirm before ordering.",
      "100枚から。特殊色・特殊用紙はより大きいロットが必要な場合があります。ご注文前にご確認ください。"),
    Q("有咩顏色同紙材？", "What colors and stocks are available?", "色・用紙の選択肢は？",
      "多款彩色紙材（粉彩/深色系）與牛皮紙可選；可單色 LOGO 或全彩印刷，配搭請柬與卡片套裝。",
      "Multiple colored stocks (pastel and deep tones) plus kraft; single-color logo or full-color print, pairs with invitation and card sets.",
      "パステル・濃色系などのカラーやクラフト紙を複数ご用意。単色ロゴからフルカラー印刷まで、招待状やカードとのセットにも。"),
    Q("交期幾耐？", "What is the lead time?", "納期はどのくらい？",
      "標準 3-5 個工作天；節日檔期（聖誕/新年卡套）建議提前 2-3 週落單。",
      "Standard 3-5 business days; for holiday seasons (Christmas/New Year card sets) order 2-3 weeks ahead.",
      "標準3-5営業日。ホリデーシーズン（クリスマス・年賀セット）は2-3週間前のご注文を推奨。"),
])

BLOCKS["vehicle-wraps"] = "".join([
    Q("車身貼印刷幾多錢？", "How much does vehicle wrap printing cost?", "車両ラッピングの価格は？",
      "車身貼 1 平方米起，HK$28-120/平方米（視材質與覆膜）；標準 3-5 個工作天。",
      "Vehicle wraps start from 1 sqm at HK$28-120 per sqm depending on material and lamination; standard 3-5 business days.",
      "車両ラッピングは1平米から、HK$28-120/平米（素材・ラミネートによる）。標準3-5営業日。"),
    Q("車貼材質防水耐曬嗎？", "Is the wrap material waterproof and UV-safe?", "素材は防水・耐UVですか？",
      "車貼專用膜防水抗 UV，戶外日曬雨淋不褪色翹邊；長期車隊可選鑄造級膜。",
      "Dedicated wrap film is waterproof and UV-stable — no fading or lifting under daily weather; cast-grade film for long-term fleets.",
      "専用ラッピングフィルムは防水・UV対応で、日常の天候でも色褪せや浮きが起きにくい。長期フリートにはキャストフィルムをご選択ください。"),
    Q("最低訂幾多？按乜計價？", "What is the MOQ and pricing basis?", "最小ロットと価格計算は？",
      "1 平方米起，按實際貼膜面積計價；車身丈量圖確認後落單。",
      "From 1 sqm, priced by actual wrapped area; order after confirming the vehicle measurement template.",
      "1平米から、実際の貼付面積で計算。車両採寸テンプレート確認後にご発注ください。"),
    Q("包唔包安裝？", "Is installation included?", "施工は含まれますか？",
      "印刷與出貨含；貼膜施工由客戶自行或指定車坊處理，可提供施工指引文件。",
      "Printing and shipping are included; wrapping is done by the customer or an appointed workshop — installation guidance documents available.",
      "印刷・出荷までを含みます。貼付施工はお客様側または指定業者で実施。施工ガイド資料をご提供できます。"),
])

src = io.open(P, encoding="utf-8", newline="").read()

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

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
covered_before_unq = re.findall(r"\n  ([a-z0-9-]+): \[", span)
check(len(covered_before) == 40, "covered before = 40 (got %d)" % len(covered_before))
for slug in BLOCKS:
    check(slug not in covered_before and slug not in covered_before_unq, "%s not already present (both forms)" % slug)

insert = "".join("  '%s': [\n%s  ],\n" % (slug, body) for slug, body in BLOCKS.items())
new_src = src[:end] + "\n" + insert + src[end:]
covered_after = len(covered_before) + len(BLOCKS)
check(covered_after == 46, "covered after = 46 (computed %d)" % covered_after)

for slug, body in BLOCKS.items():
    check("份" not in body, "%s no 份" % slug)
    import unicodedata
    simp = [ch for ch in body if ch in "哑蚀滥纹级photographic"]
    simp = [ch for ch in body if ch in "哑"]
    check(not simp, "%s no 哑 (simplified)" % slug)

if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(P, BAK)
    io.open(P, "w", encoding="utf-8", newline="").write(new_src)
    check(open(P, "rb").read(2)[0] != 0xFF, "no BOM")
    print("WROTE 6 SKU blocks (40 -> %d)" % covered_after)
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
