# -*- coding: utf-8 -*-
"""doujin-circle-printing-guide 三语重写: 12 段 + 真值(10 冊/10 本/10 copies, ¥7,500〜/部, 5-7 営業日, DHL 2-4日)
+ desc/excerpt 三层同步修 (blog-data JSON ×3 + blog-posts.ts excerpt ×3)
"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(REPO, ".hermes", "_bak-doujin-rewrite-20261022")
os.makedirs(B, exist_ok=True)

def build(loc, qa, secs, faq_h, faqs, cta):
    parts = [f'<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">{qa[0]}</p><p class="text-sm">{qa[1]}</p></div>']
    for h, body in secs:
        parts.append(f"<h2>{h}</h2>")
        parts.append(body)
    parts.append(f"<h2>{faq_h}</h2>")
    for q, a in faqs:
        parts.append(f"<p><strong>{q}</strong><br/>{a}</p>")
    parts.append("<h2>" + cta[0] + "</h2>")
    parts.append(f"<p>{cta[1]}</p>")
    return "\n".join(parts)

def P(txt): return f"<p>{txt}</p>"
def UL(items): return '<ul class="list-disc pl-5 my-3 space-y-1">' + "".join(f"<li>{x}</li>" for x in items) + "</ul>"
def TABLE(head, rows):
    h = "".join(f'<th class="text-left p-2">{x}</th>' for x in head)
    r = "".join("<tr>" + "".join(f'<td class="p-2">{c}</td>' for c in row) + "</tr>" for row in rows)
    return f'<table class="w-full text-sm my-4"><thead><tr>{h}</tr></thead><tbody>{r}</tbody></table>'

# ============ JA ============
ja_secs = [
    ("同人誌印刷の基本スペック",
     P("ZprintPro の同人誌印刷は <strong>10 冊から</strong>発注できます。判型は同人誌の二大規格である <strong>A5（148×210mm）</strong>と <strong>B5（182×257mm）</strong>を標準に、画集やポートフォリオには A4 も選択できます。標準構成は <strong>表紙フルカラー＋本文モノクロ</strong>で、イラスト主体の作品は全ページカラーへもグレードアップできます。")
     + UL(["最少部数：10 冊から", "判型：A5・B5 標準（A4 はご相談）", "標準構成：表紙カラー＋本文モノクロ", "校正：印刷前に無料デジタル校正で面付けと色味を確認"])),
    ("価格はどう決まる",
     P("単価は製品ページの価格表どおり <strong>1 冊 ¥7,500 起</strong>。実際の価格は、ページ数・部数・用紙・製本・カラー範囲の 5 つの要素で変動します。仕様が固まっていなくても、部数とページ数が決まれば <a href=\"/ja/quote/\">30 秒 AI 見積り</a>でおおよそをつかめます。")
     + UL(["ページ数：本文の頁が増えると用紙代と製本費が増えます", "部数：100 冊以上は単価が下がりやすい", "製本：中綴じがもっとも経済的", "カラー：表紙のみカラーが標準、本文フルカラーはアップグレード"])
     + P("単価が下がる仕組みはシンプルで、製版と機械調整のような固定費を部数で割るためです。同じ誌面を 30 冊で一度刷って、反応を見てから 100 冊で増刷する方が、最初から 100 冊刷るより総額は高くてもリスクは小さくて済みます。")),
    ("製本の選び方",
     TABLE(["製本", "ページ目安", "向いている本"],
           [["中綴じ（ステープル）", "8-64 ページ", "コミック・zine・ミニカタログ"],
            ["無線綴じ", "60-300 ページ", "小説・イラスト集・アンソロジー"],
            ["上製本", "100 ページ以上", "限定版・画集・記念本"],
            ["折り加工", "1 枚もの", "告知紙・フライヤー"]])
     + P("迷ったら中綴じです。ページ数が 60 を超えるなら無線綴じ、記念性を重視するなら上製本が選ばれます。価格帯は <a href=\"/ja/product/saddle-stitch-booklets/\">中綴じ小冊子</a>と <a href=\"/ja/product/perfect-bound-books/\">無線綴じ本</a>の製品ページで比べられます。")),
    ("紙の選び方",
     P("本文は <strong>FSC 認証の道林紙 90g</strong> を標準にしています。モノクロ印刷でもにじみにくく、手元が白すぎないので長く読んで疲れにくい紙です。表紙は 90g コート紙が標準で、箔押しやマットラミネートなどの加工に対応します。")
     + UL(["本文：FSC 認証 道林紙 90g（標準）", "表紙：コート紙 90g（標準）", "環境対応：FSC 認証紙・大豆油墨オプションあり（ご相談）"])),
    ("表紙の加工",
     UL(["<strong>箔押し</strong>：金・銀の箔でタイトルやサークルロゴを立てる", "<strong>スポット UV</strong>：タイトル部分だけ光らせて対比を作る", "<strong>マットラミネート</strong>：表紙全体を落ち着いた指先の質感に"])
     + P("加工は 1 種類で十分目立ちます。箔押しとスポット UV の併用は、表紙デザインがシンプルな場合に限るのがおすすめです。仕上がりは無料デジタル校正で確認できます。")),
    ("部数の決め方",
     P("10 冊から発注できるので、初版は小さく始めて反応を見るのが基本です。")
     + UL(["<strong>10-30 冊</strong>：初めての自作本、テスト頒布", "<strong>30-50 冊</strong>：既刊があり読者がついているサークル", "<strong>50-100 冊</strong>：告知が伸びている、売り切れを避けたい", "<strong>100 冊以上</strong>：複数イベントで頒布する前提"])
     + P("増刷は同じデータで何度でもできます。初版が売り切れても、入稿データを残しておけば 2 周目は早く動けます。")
     + P("部数を決めるときは、手元に残る冊数を実際より少なく見積もってください。輸送中の隅摺れ、関係者への配布、自分用の保管を差し引くと、頒布に回せるのは発注部数の 9 割程度が目安です。")),
    ("納期と特急",
     TABLE(["項目", "目安"],
           [["標準生産", "5-7 営業日（入稿確認後）"],
            ["特急", "24 時間（データ完成が前提）"],
            ["国際配送（DHL）", "2-4 日"]])
     + P("余裕を持つなら「生産 7 日＋配送 4 日＋校正の往復 3 日」で 2 週間を見ておくと安心です。締切が迫っている場合は、<a href=\"/ja/blog/comiket-printing-prep-guide/\">コミケ印刷準備ガイド</a>の逆算表を参考にしてください。")),
    ("入稿チェックリスト",
     UL(["CMYK で入稿する（RGB のままは色が沈みます）", "四周 3mm の塗り足しを入れる", "フォントはアウトライン化する", "画像は仕上がりサイズで 300dpi 以上", "表紙と本文は別ファイルにする", "背幅はページ数×用紙の厚みで算出する"])
     + P("共通の入稿仕様は <a href=\"/ja/blog/print-specifications-reference-guide-2026/\">印刷規格リファレンス 2026</a> にまとめています。")),
    ("年間のイベントに合わせる",
     P("同人誌は冬のイベントだけのものではありません。春の即売会、夏の大型イベント、地元のミニコミ展まで、年間を通じて頒布の機会があります。リズムとしては「イベントの 2 か月前に仕様を固める、1 か月前に入稿を終える」——これが全年共通の型です。")
     + P("コミケ C109（2026 年 12 月 29-31 日）に向けた締切逆算は、<a href=\"/ja/comiket-c109/\">C109 特設ページ</a>に 1 枚にまとめています。")
     + P("イベントの種類によって、用意する物も変わります。即売会なら本が中心、展示型のイベントならポスターやパンフレットの比率が上がります。どんな場でも、頒布物の構成を先に決めてから部数を割り当てると、発注がぶれません。")),
    ("配送と受け取り",
     P("生産完了後は DHL で 2-4 日で配送します。梱包は背表紙を保護する剛性メーラーボックス＋1 円ずつのシュリンク（仕様による）で、輸送中の角折れに備えます。")
     + UL(["お届け先は自宅・ホテル・倉庫いずれも指定できます", "追跡番号で到着を管理", "イベント会場への直送は要相談"])
     + P("海外イベント向けは、通関で半日〜1 日程度かかることがあります。開幕日に間に合わせるなら、到着希望日の 2-3 日前には荷物が動いている状態を目安にしてください。")),
]
ja_faq = [
    ("Q1: 何冊から注文できますか？", "10 冊からです。まず紙質と仕上がりだけ確認したい場合は、ご相談ください。"),
    ("Q2: 表紙だけカラーで本文はモノクロにできますか？", "はい、それが標準構成です。イラスト主体の本は本文フルカラーへアップグレードできます。"),
    ("Q3: 納期はどのくらいですか？", "標準 5-7 営業日＋DHL 2-4 日です。イベント直前の 24 時間特急は、データが完成していることが前提です。"),
    ("Q4: 同じデータで増刷できますか？", "可能です。複数イベントで同じ誌面を使い回すケースは多いです。"),
]
ja = build("ja",
    ("クイック回答：同人誌印刷はいくらから？", "同人誌は <strong>10 冊から</strong>。A5／B5 標準、表紙フルカラー＋本文モノクロ、単価は <strong>1 冊 ¥7,500 起</strong>（製品ページ価格表どおり・ページ数/部数/仕様で変動）、標準 <strong>5-7 営業日</strong>、DHL 2-4 日、無料デジタル校正付き。"),
    ja_secs, "よくあるご質問", ja_faq,
    ("ご相談・見積り",
     "仕様が固まっていない段階のご相談も無料です。部数と締切から逆算して、現実的なスケジュールを一緒に組みます。<a href=\"/ja/product/doujinshi-printing/\">同人誌印刷の製品ページ</a>と<a href=\"/ja/category/japan-doujin/\">同人グッズ印刷カテゴリ</a>（<a href=\"/ja/product/die-cut-stickers/\">ステッカー</a>など）からどうぞ。"))

# ============ EN ============
en_secs = [
    ("Core specs at a glance",
     P("ZprintPro prints doujinshi from <strong>10 copies</strong>. The two standard trim sizes are <strong>A5 (148×210mm)</strong> and <strong>B5 (182×257mm)</strong>, with A4 available for art books and portfolios. The standard build is a <strong>full-colour cover with monochrome text pages</strong>; illustration-heavy books can upgrade to full colour throughout.")
     + UL(["Minimum order: 10 copies", "Trim sizes: A5 and B5 standard (A4 on request)", "Standard build: colour cover + mono text", "Proofing: free digital proof checks imposition and colour before print"])),
    ("How pricing works",
     P("The product page lists <strong>from ¥7,500 per copy</strong>. The final number moves on five factors: page count, quantity, paper stock, binding and colour coverage. Even at concept stage, the <a href=\"/en/quote/\">30-second AI quote</a> gives you a working estimate from quantity and page count alone.")
     + UL(["Page count: more text pages means more paper and binding cost", "Quantity: unit price drops as runs pass 100 copies", "Binding: saddle stitch is the most economical", "Colour: colour cover + mono text is standard; full-colour interiors are an upgrade"])
     + P("The mechanics are simple: fixed costs such as plates and press setup get divided across the run. Printing 30 copies first and reprinting 100 after the response is clearer often costs slightly more in total than one 100-copy run — but the risk is far smaller.")),
    ("Choosing a binding",
     TABLE(["Binding", "Page range", "Best for"],
           [["Saddle stitch", "8-64 pages", "Comics, zines, mini catalogues"],
            ["Perfect binding", "60-300 pages", "Novels, illustration collections, anthologies"],
            ["Hardcover", "100+ pages", "Limited editions, art books, keepsakes"],
            ["Folding", "Single sheet", "Announcements, flyers"]])
     + P("When in doubt, saddle stitch. Past 60 pages, move to perfect binding; for keepsake value, hardcover. Compare price bands on the <a href=\"/en/product/saddle-stitch-booklets/\">saddle stitch booklets</a> and <a href=\"/en/product/perfect-bound-books/\">perfect bound books</a> product pages.")),
    ("Paper selection",
     P("Text pages run on <strong>FSC-certified 90g dailin stock</strong> as standard. It holds monochrome cleanly without show-through and reads comfortably for long sessions. Covers use 90g coated stock, which takes foil, spot UV and lamination well.")
     + UL(["Text: FSC-certified dailin 90g (standard)", "Cover: coated 90g (standard)", "Sustainability: FSC paper and soy-ink options on request"])),
    ("Cover finishing",
     UL(["<strong>Foil stamping</strong>: gold or silver foil lifts the title and circle logo", "<strong>Spot UV</strong>: gloss on selected areas creates contrast", "<strong>Matte lamination</strong>: a calm, soft-touch finish across the whole cover"])
     + P("One finish is usually enough. Combining foil with spot UV works best when the cover design is already simple. Every finish is confirmed on the free digital proof.")),
    ("How many copies to print",
     P("With a 10-copy minimum, the sensible play is a small first run and a fast reprint when it sells.")
     + UL(["<strong>10-30 copies</strong>: first book, test run", "<strong>30-50 copies</strong>: you have a backlist and returning readers", "<strong>50-100 copies</strong>: promotion is gaining traction", "<strong>100+ copies</strong>: selling at multiple events"])
     + P("Reprints use the same files, so keep your print-ready data. A second run is always faster than the first.")
     + P("Budget for what actually reaches the table: transit scuffs, staff copies and your own archive typically take 10% off the order, so the sellable count is around nine copies out of every ten ordered.")),
    ("Lead time and rush",
     TABLE(["Stage", "Typical"],
           [["Standard production", "5-7 business days after artwork approval"],
            ["Rush", "24 hours (finished file required)"],
            ["International delivery (DHL)", "2-4 days"]])
     + P("A comfortable budget is two weeks: 7 days production, 4 days shipping, 3 days for a proof round. For event deadlines, the countdown table in the <a href=\"/en/blog/comiket-printing-prep-guide/\">Comiket printing prep guide</a> is the reference.")),
    ("Artwork checklist",
     UL(["Supply CMYK files (RGB colours sink on press)", "3 mm bleed on all four sides", "Outline all fonts", "300 dpi images at final size", "Cover and text as separate files", "Spine width from page count × paper bulk"])
     + P("The shared specifications live in the <a href=\"/en/blog/print-specifications-reference-guide-2026/\">2026 print specifications reference</a>.")),
    ("Fitting the event calendar",
     P("Doujinshi is not a December-only product. Spring fairs, summer conventions and local mini-comic shows run all year, and the rhythm is always the same: lock the spec two months out, finish artwork one month out.")
     + P("For Comiket C109 (December 29-31, 2026), the deadline countdown is on the <a href=\"/en/comiket-c109/\">C109 event page</a>.")
     + P("Different events need different line-ups: sales-focused fairs are book-centred, while display-style events push posters and programmes. Decide the mix first, then assign quantities — it keeps the order coherent.")),
    ("Delivery and receiving",
     P("After production, DHL delivers in 2-4 days. Cartons are rigid mailer boxes that protect the spines, with shrink wrapping per copy depending on spec.")
     + UL(["Deliver to home, hotel or warehouse", "Track arrival with the tracking number", "Direct-to-venue delivery is possible on request"])
     + P("For international events, allow half a day to a day for customs. To have stock on opening morning, aim for the parcels to be moving 2-3 days before your target arrival date.")),
]
en_faq = [
    ("Q1: What is the minimum order?", "10 copies. If you only want to check paper and finish first, message us and we will arrange it."),
    ("Q2: Can the cover be colour and the text monochrome?", "Yes — that is the standard build. Full-colour interiors are available as an upgrade."),
    ("Q3: How long does it take?", "5-7 business days of production plus 2-4 days by DHL. The 24-hour rush before events assumes the file is finished."),
    ("Q4: Can I reprint the same book later?", "Yes. Reprints from the same files are common between events."),
]
en = build("en",
    ("Quick Answer", "Doujinshi printing from <strong>10 copies</strong>. A5/B5 standard, colour cover with mono text, <strong>from ¥7,500 per copy</strong> (product-page pricing; varies with page count, quantity and spec), <strong>5-7 business days</strong> standard, DHL 2-4 days, free digital proof."),
    en_secs, "Frequently asked questions", en_faq,
    ("Get a quote",
     "Spec reviews are free even at concept stage — we work backwards from your copy count and deadline into a schedule that holds. Start from the <a href=\"/en/product/doujinshi-printing/\">doujinshi printing product page</a> or the <a href=\"/en/category/japan-doujin/\">doujin goods category</a> (stickers included)."))

# ============ ZH-HK ============
zh_secs = [
    ("同人誌印刷基本規格",
     P("智印港同人誌印刷 <strong>10 本起印</strong>。標準開度係同人誌兩大規格 <strong>A5（148×210mm）</strong>同 <strong>B5（182×257mm）</strong>，畫集或者 portfolio 可以揀 A4。標準配置係 <strong>封面全彩＋內頁單色</strong>，插畫為主嘅本子可以升級全彩內頁。")
     + UL(["起印量：10 本", "開度：A5、B5 標準（A4 可商議）", "標準配置：封面彩色＋內頁單色", "打稿：印刷前免費數碼打稿，確認裝版同色準"])
     + P("呢套規格適合嘅對象好闊：第一次出本嘅個人作者、想將連載結集成書嘅社團、或者想細批量試印嘅畫集、作品集都行。規格未諗清楚之前，最實際係先決定頁數同部數兩個數，其餘參數都可以後補。")),
    ("價格點計",
     P("單價按產品頁價格表 <strong>每本 ¥7,500 起</strong>。實際價錢由五個因素決定：頁數、部數、紙材、裝訂、彩色範圍。規格未定都唔緊要，知道部數同頁數就可以用 <a href=\"/zh-hk/quote/\">30 秒 AI 報價</a>攞個大概。")
     + UL(["頁數：內頁越多，紙價同裝訂費越高", "部數：100 本以上單價通常再落", "裝訂：騎馬釘最經濟", "彩色：封面彩色＋內頁單色係標準，全彩內頁係升級"])
     + P("單價會跌嘅原理好簡單：製版同開機調色呢類固定成本，由全部本數攤分。同一本誌面先印 30 本試反應，然後先 100 本補印，總額或者貴過一開始印 100 本，但風險細好多。")),
    ("裝訂點揀",
     TABLE(["裝訂", "頁數範圍", "適合"],
           [["騎馬釘", "8-64 頁", "漫畫、zine、小冊子"],
            ["膠裝（無線）", "60-300 頁", "小說、畫集、合輯"],
            ["精裝", "100 頁以上", "限定版、畫集、紀念本"],
            ["摺頁", "單張", "宣傳紙、flyer"]])
     + P("唔識揀就騎馬釘。超過 60 頁轉膠裝，講紀念價值就精裝。<a href=\"/zh-hk/product/saddle-stitch-booklets/\">騎馬釘小冊子</a>同 <a href=\"/zh-hk/product/perfect-bound-books/\">膠裝書</a>產品頁有價格帶可以直接比較。")
     + P("外觀上嘅分別：騎馬釘可以完全攤平，跨頁插畫友好；膠裝有書脊，可以印書名，放喺書架更加似『一本書』；精裝就係紀念性優先。跨頁多揀騎馬釘、文字多揀膠裝，係最常見配搭。")),
    ("紙材點揀",
     P("內頁標準用 <strong>FSC 認證道林紙 90g</strong>。單色印刷唔滲墨，紙色唔會白到刺眼，長時間閱讀都舒服。封面標準 90g 銅版紙，承接燙金、啞膜等工藝。")
     + UL(["內頁：FSC 認證道林紙 90g（標準）", "封面：銅版紙 90g（標準）", "環保：FSC 認證紙、大豆油墨可選（落單註明）"])
     + P("實際選紙時，先問自己兩條：這本會被人用螢光筆劃嗎（會選林紙）、封面需不需要耐磨（需要就上啞膜或過油）。這兩個答案定下來，紙材基本就定了。")),
    ("封面工藝",
     UL(["<strong>燙金</strong>：金、銀箔托起書名同社團 Logo", "<strong>局部 UV</strong>：書名位局部過光油，做出亮啞對比", "<strong>啞膠</strong>：成張封面啞面質感，低調耐用"])
     + P("工藝揀一種已經夠搶眼。燙金加局部 UV 嘅組合，建議留俾封面設計本身好簡潔嘅本子。所有工藝效果以免費數碼打稿確認。")
     + P("工藝唔係質感嘅唯一來源：內頁紙揀得啱、單色印刷嘅墨色控制得好，一本文本身已經有手感。工藝係錦上添花，紙同印刷先係底。")
     + P("另一個細節：同一款金箔壓在不同紙上，顏色會不一樣；所以燙金效果一定要以打稿實樣為準，唔好只用屏幕色去想像。")),
    ("部數規劃",
     P("10 本起印，所以第一次印小量試水溫係最穩陣策略。")
     + UL(["<strong>10-30 本</strong>：第一本作品、測試市場反應", "<strong>30-50 本</strong>：已經有舊刊、有固定讀者", "<strong>50-100 本</strong>：宣傳有聲量、唔想完售", "<strong>100 本以上</strong>：預備跑幾個活動"])
     + P("補印用同一批檔案就得，所以交稿檔案記得保存。第一版完售，第二版可以好快開動。")
     + P("計部數時記住：實際攞去賣嘅本數會比訂單少——運送壓角、俾同行、自己留底，加加大約蝕 10%，即係訂 100 本大約得 90 本可以攞去檯面。")),
    ("交期同特急",
     TABLE(["項目", "時間"],
           [["標準生產", "5-7 個工作天（檔案確認後）"],
            ["特急", "24 小時（檔案完成為前提）"],
            ["國際配送（DHL）", "2-4 天"]])
     + P("想穩陣就預「生產 7 日＋配送 4 日＋打稿來回 3 日」，合共兩星期。趕活動檔期嘅話，<a href=\"/zh-hk/blog/comiket-printing-prep-guide/\">コミケ印刷備戰指南</a>有完整逆算表。")
     + P("特急唔係萬能：它需要檔案已經完成、而且不等打稿修改。所以真正決定成敗嘅係你交稿前嘅準備，而不是臨門一腳加錢。")),
    ("交稿檢查清單",
     UL(["用 CMYK 交稿（RGB 會偏色）", "四邊預留 3mm 出血", "文字轉外框", "圖像以成品尺寸計 300dpi 以上", "封面同內頁分開檔案", "書脊闊度按頁數×紙厚計算"])
     + P("通用入稿規格可睇 <a href=\"/zh-hk/blog/print-specifications-reference-guide-2026/\">印刷規格參考 2026</a>。")
     + P("最多人出事嘅三個位：RGB 冇轉 CMYK（印出嚟偏灰）、出血唔夠（裁完有白邊）、書脊位冇預（厚本封面文字會跌入書脊）。免費打稿就係用嚟捉呢啲問題——交稿前自己先檢查一次，可以挽返一轮來回嘅時間。")),
    ("全年活動節奏",
     P("同人誌唔係得冬天先印。春季即售會、夏季大型活動、在地 mini comi，全年都有頒布機會。節奏永遠一樣：<strong>活動前兩個月定規格、前一個月交稿</strong>。")
     + P("Comiket C109（2026 年 12 月 29-31 日）嘅截稿逆算，已經整理喺 <a href=\"/zh-hk/comiket-c109/\">C109 特設頁</a>。")
     + P("唔同活動要帶嘅嘢都唔同：以賣嘢為主嘅即售會本子係主角，展示型活動就會多咗海報同場刊。先定組合，再分配部數，落單就唔會亂。")
     + P("一個實用嘅做法：建立一份自己的「入稿檢查表」，每次交稿前逐項打勾。第二次、第三次出本嘅時候，你會發現大部分退稿原因都係同一幾個，檢查表可以將它們預先堵住。")),
    ("配送同收貨",
     P("生產完成後 DHL 配送 2-4 天。包裝用硬質 mailer box 保護書脊，按規格每本收縮膜，防止運送角摺。")
     + UL(["收貨地址：住宅、酒店、倉庫都得", "追蹤編號跟進到貨", "活動會場直送可商議"])
     + P("跨境活動要預通關時間，通常半日至一日。想開幕朝早有貨，最好喺目標到貨日前兩三日包裹已經在途。")
     + P("收到貨第一件事係點數同看外箱：箱角有明顯壓損就先拍相再拆，並喺 24 小時內通知我哋，補印或補發都可以商量——拖到活動前一日才發現，時間就唔夠用。")),
]
zh_faq = [
    ("Q1: 最少印幾多本？", "10 本起印。想先確認紙質同效果，可以 WhatsApp 我哋傾。"),
    ("Q2: 封面彩色、內頁單色得唔得？", "得，呢個係標準配置。插畫為主嘅本子可以升級全彩內頁。"),
    ("Q3: 交期要幾耐？", "標準 5-7 個工作天生產，加 DHL 2-4 天配送。活動前 24 小時特急以檔案完成為前提。"),
    ("Q4: 之後可以補印嗎？", "可以。同一批檔案補印好常見，跨活動重複用同一版都冇問題。"),
]
zh = build("zh-hk",
    ("快速答案（40 秒讀完）", "同人誌印刷 <strong>10 本起印</strong>。A5／B5 標準、封面全彩＋內頁單色，單價 <strong>每本 ¥7,500 起</strong>（產品頁價格表口徑，按頁數／部數／規格浮動），標準 <strong>5-7 個工作天</strong>，DHL 2-4 天，免費數碼打稿。"),
    zh_secs, "常見問題", zh_faq,
    ("查詢同報價",
     "規格未定都可以免費傾——我哋按部數同截稿日倒推，畫一個行得通嘅時間表。由 <a href=\"/zh-hk/product/doujinshi-printing/\">同人誌印刷產品頁</a>或者 <a href=\"/zh-hk/category/japan-doujin/\">同人周邊印刷類目</a>（包括<a href=\"/zh-hk/product/die-cut-stickers/\"> die-cut 貼紙</a>）開始。"))

CONTENT = {"ja": ja, "en": en, "zh-hk": zh}
NEW_DESC = {
    "ja": "同人作家・zine 作家・イベント出展者向け。同人誌印刷は 10 冊から・A5/B5・表紙フルカラー＋本文モノクロ・標準 5-7 営業日・コミケ前 24 時間特急・DHL 2-4 日・無料デジタル校正。製本・紙・加工の選び方を解説。",
    "en": "Indie comic and zine creators: doujinshi printing from 10 copies, A5/B5, colour cover with mono text, 5-7 business day production, 24-hour pre-event rush, DHL 2-4 day delivery, free digital proof. Binding, paper and finishing guide.",
    "zh-hk": "插畫師、漫畫家、同人社團、文創品牌必睇。同人誌印刷 10 本起印，A5／B5，封面全彩＋內頁單色，標準 5-7 個工作天，活動前 24 小時特急，DHL 2-4 天，免費數碼打稿；裝訂、紙材、封面工藝一次講清。",
}

# ---------- 写入 ----------
for loc, content in CONTENT.items():
    # 断言质量
    stripped = re.sub(r"<[^>]+>", "", content)
    h2n = len(re.findall(r"<h2>", content))
    links = set(re.findall(r'href="([^"]+)"', content))
    assert h2n == 12, f"{loc} h2={h2n}"
    assert len(stripped) >= 2600, f"{loc} stripped={len(stripped)}"
    assert len(links) >= 6, f"{loc} links={len(links)}"
    for bad in ["GSC", "智印印港", "C107", "30 部", "30-copy", "30 本起印"]:
        assert bad not in content, f"{loc} contains {bad}"
    if loc == "ja":
        assert "份" not in content, "ja contains 份"
    # 校验内链 slug 存在
    for u in links:
        m = re.match(r"^/(zh-hk|en|ja)/(?:blog|product|category|quote)/", u) or re.match(r"^/(zh-hk|en|ja)/comiket-c109/", u)
        assert m, f"{loc} bad href {u}"
    print(f"{loc}: stripped={len(stripped)} h2={h2n} links={len(links)}")

# blog-data JSON ×3（content + description）
for loc, content in CONTENT.items():
    P = os.path.join(REPO, "src", "data", "blog-data", f"{loc}.json")
    raw = io.open(P, encoding="utf-8", newline="").read()
    j = json.loads(raw)
    slug = "doujin-circle-printing-guide"
    old = j[slug]["content"]
    assert j[slug].get("date") == "2026-07-10"
    j[slug]["content"] = content
    j[slug]["description"] = NEW_DESC[loc]
    # 用字符串级替换保安全（content 值替换）
    si = raw.find('"%s": {' % slug)
    assert si > 0
    ci = raw.find('"content"', si)
    vi = raw.find(':', ci) + 1
    while raw[vi] in ' \t\r\n':
        vi += 1
    k = vi + 1
    while k < len(raw):
        ch = raw[k]
        if ch == '\\':
            k += 2; continue
        if ch == '"':
            break
        k += 1
    out = raw[:vi] + json.dumps(content, ensure_ascii=False) + raw[k + 1:]
    # description 替换
    di = out.find('"description"', si)
    vj = out.find(':', di) + 1
    while out[vj] in ' \t\r\n':
        vj += 1
    k2 = vj + 1
    while k2 < len(out):
        ch = out[k2]
        if ch == '\\':
            k2 += 2; continue
        if ch == '"':
            break
        k2 += 1
    out = out[:vj] + json.dumps(NEW_DESC[loc], ensure_ascii=False) + out[k2 + 1:]
    json.loads(out)  # 形状断言
    bp = os.path.join(B, f"{loc}.json.before")
    if not os.path.exists(bp):
        shutil.copy2(P, bp)
    io.open(P, "w", encoding="utf-8", newline="").write(out)
    print(f"[OK] {loc}.json content {len(old)} -> {len(content)}, desc updated")

# blog-posts.ts excerpt ×3（30 错值修正）
PB = os.path.join(REPO, "src", "data", "blog-posts.ts")
t = io.open(PB, encoding="utf-8", newline="").read()
reps = [
    ("智印港為香港同人市場提供 30 本起印 + 5 大裝訂 + 燙金封面 + 5-7 個工作天交付,DHL 全球 2-4 天配送至 Comiket、Anime Expo 等國際活動會場。",
     "智印港同人誌印刷 10 本起印，A5／B5，封面全彩＋內頁單色，標準 5-7 個工作天，活動前 24 小時特急，DHL 2-4 天；裝訂、紙材、封面工藝一次講清。"),
    ("premium small-batch doujin booklet printing with 30-copy MOQ, 5-7 business day production, free design mockup, and DHL Express global shipping.",
     "doujinshi printing from 10 copies, A5/B5, colour cover with mono text, 5-7 business day production, 24-hour pre-event rush, and DHL 2-4 day delivery."),
    ("プレミアム同人誌印刷 30 部 MOQ・5-7 営業日生産・無料デザインモックアップ・DHL Express 国際配送対応。",
     "同人誌印刷は 10 冊から・A5/B5・表紙フルカラー＋本文モノクロ・標準 5-7 営業日・24 時間特急・DHL 2-4 日・無料デジタル校正。"),
]
applied = 0
for a, b in reps:
    n = t.count(a)
    assert n == 1, f"excerpt anchor {n}: {a[:40]}"
    t = t.replace(a, b)
    applied += 1
bp2 = os.path.join(B, "blog-posts.ts.before")
if not os.path.exists(bp2):
    shutil.copy2(PB, bp2)
io.open(PB, "w", encoding="utf-8", newline="").write(t)
print(f"[OK] blog-posts.ts excerpts fixed ({applied}/3)")
print("[DONE] 3-locale rewrite complete")
