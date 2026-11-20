# -*- coding: utf-8 -*-
"""B1c cluster 6a: a1-posters + a2-posters x3 locales (strategy W3.1 named pair).
Family N-corner: display/art/adhesive remain templated (0.95-0.98 en/ja) -> registered as cluster 6b for lane.
Price war (CSV 9/45 vs products title_zh 12.9 vs basePrice 16/20 vs hub 6-9/10-16) -> K3 escalation; new content uses NO absolute prices.
Verify-first; apply on green."""
import io, json, os, re, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
MODE = "apply" if "--apply" in sys.argv else "verify"
BAK = os.path.join(ROOT, ".hermes", "_bak-b1c6a-20261015")
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

csv_raw = io.open(CSV_PATH, encoding="utf-8", newline="").read()
csv_lines = csv_raw.split("\n")
trailing = csv_raw.endswith("\n")
header = csv_lines[0].split("\t")
COL = {n: i for i, n in enumerate(header)}
row_i = {}
for i, ln in enumerate(csv_lines):
    c = ln.split("\t")
    if len(c) > COL["Slug"] and c[COL["Slug"]] in ("a1-posters", "a2-posters"):
        row_i[c[COL["Slug"]]] = i
check(len(row_i) == 2, "CSV rows: %s" % sorted(row_i))

# ---------------- CSV edits (desc x3, h1 x3, alt x3, kw ja x1 per SKU; titles untouched) ----------------
csv_edits = [
 # ---- a2-posters: desc x3 (MOQ 10 truth; no absolute price), h1 x3 (ja English killed), alt x3, kw ja
 ("a2-posters", "SEO描述(ZH)",
  "智印港A2海報印刷：標準 420×594mm 零售推廣規格，10 張起印，157g 銅版紙可升 200g 或相紙，柯式或高品數碼輸出。門店推廣、商場快閃、教育培訓與藝廊展覽首選，免費數碼打稿，滿 HK$500 港九新界順豐免運，30 秒 AI 報價。",
  None),  # old filled below
]
# simpler: define as (slug, col, old_exact, new)
csv_edits = [
 ("a2-posters", "SEO描述(ZH)",
  "A2 海報印刷 1 張起印、HK$9 起/張，200g 銅版紙 / PP 防水合成紙，Giclée 級 1200 DPI。展覽/門店/地產推廣適用，即日打稿 2 小時。滿 HK$500 免費順豐，30 秒 AI 報價。",
  "智印港A2海報印刷：標準 420×594mm 零售推廣規格，10 張起印，157g 銅版紙可升 200g 或相紙，柯式或高品數碼輸出，色彩鮮明。門店推廣、商場快閃、教育培訓與藝廊展覽首選，免費數碼打稿，滿 HK$500 港九新界順豐免運，30 秒 AI 報價。"),
 ("a2-posters", "SEO描述(EN)",
  "A2 poster printing from $2.30, 50 MOQ. 200gsm coated or waterproof PP, giclée-quality 1200 DPI. Free design mockup in 2 hours, DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote.",
  "A2 poster printing at the standard 420x594mm retail size, 10-piece MOQ on 157g coated stock with 200gsm or photo-paper upgrades, offset or premium digital output. Ideal for store promos, mall pop-ups, education and gallery displays. Free digital proof, free SF shipping over HK$500, 30-second AI quote."),
 ("a2-posters", "SEO描述(JA)",
  "A2 ポスター印刷 1 枚から、¥300〜。200g コート紙 / 防水 PP 合成紙、1200 DPI 高精彩フルカラー。無料デザイン校正 2 時間、最短即日発送、日本全国 DHL 2-4 日配送。ISO 9001 認証品質。30 秒 AI 無料見積もり。",
  "A2ポスター印刷は標準420×594mmの小売プロモ规格、10枚から。157gコート紙を200g・写真紙にグレードアップ可能、オフセットまたは高品質デジタル出力。店舗プロモ、モールPOP、教育・ギャラリー展示に最適。無料デジタル校正、日本全国送料対応、30秒AI見積り。"),
 ("a2-posters", "H1标题(JA)",
  "Standard A2 size",
  "A2ポスター印刷 10枚〜：420×594mm 標準・157gコート紙"),
 ("a2-posters", "图片Alt标签(EN)",
  "A2 Posters wall art for home decor, gallery walls — ZprintPro",
  "A2 Poster Printing / Standard Retail Size | A2 Posters 420x594mm 157g Coated, 10 MOQ | ZprintPro"),
 ("a2-posters", "SEO关键词(JA)",
  "A2 ポスター,A2 ポスター 印刷,a2 posters,ポスター印刷,A1ポスター,A2ポスター,屋外ポスター,展示会ポスター,大判出力,防水ポスター",
  "A2ポスター,A2ポスター 印刷,ポスター印刷,店舗ポスター,展示ポスター,大判ポスター,A1ポスター,防水ポスター"),
 # ---- a1-posters: desc x3 (MOQ 1 truth; no absolute price), h1 x3, alt x3, kw ja
 ("a1-posters", "SEO描述(ZH)",
  "A1 大幅海報/海報印刷 1 張起。採用 157g-300g 銅版紙/PP 紙/相紙 高品質材質，支援 A1/A2/A3/A4 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計。即日-3 個工作天交貨，港九新界免費速遞，順豐速遞上門。專業團隊、價格透明，企業活動、店舖推廣首選。",
  "智印港A1大幅海報印刷：594×841mm 大尺寸視覺衝擊，1 張起印，157–200g 銅版紙或相紙，柯式為主、急件數碼，PP 護膜或泡沫板裱貼可選。展覽會場、零售櫥窗、演唱會與地產推廣首選，免費數碼打稿，港九新界免費速遞，30 秒 AI 報價。"),
 ("a1-posters", "SEO描述(EN)",
  "A1 posters (594x841mm) for retail and trade shows, from 1 poster (no minimum order). Yupo / eco poster inkjet or photo paper, matte art paper 200-300g. Free US shipping over $100, DHL Express | Free Design",
  "A1 large-format posters at 594x841mm, single-piece MOQ on 157-200g coated or photo stock, offset as standard with digital for rush jobs. PP lamination or foam-board mounting optional. Built for exhibitions, storefronts, concerts and property campaigns. Free digital proof, free SF shipping across HK, 30-second AI quote."),
 ("a1-posters", "SEO描述(JA)",
  "A1 ポスターのA1 ポスターは ZprintPro にお任せ。157g-300g コート紙/PP/写真用紙 高品質用紙、A1/A2/A3/A4 各種対応。4色 CMYK 印刷、デザイン自由。10枚〜、翌日-3営業日で全国配送。30秒無料見積もり、深夜対応OK。自社工場直結の安心感。",
  "A1ポスター印刷は594×841mmの大判サイズ、1枚から。157-200gコート紙または写真用紙、オフセット標準・納期急ぎはデジタル対応、PPラミネート・発泡ボード装着も選択可。展示会、店頭ウィンドウ、コンサート、不動産キャンペーンに最適。無料デジタル校正、30秒AI見積り。"),
 ("a1-posters", "H1标题(ZH)",
  "A1大幅海報",
  "A1大幅海報印刷 — 594×841mm 展覽級視覺衝擊，1 張起印"),
 ("a1-posters", "H1标题(JA)",
  "A1 large size",
  "A1ポスター印刷 1枚〜：594×841mm 大判展示・157-200g"),
 ("a1-posters", "图片Alt标签(EN)",
  "A1 Posters wall art for home decor, gallery walls — ZprintPro",
  "A1 Large Poster Printing / Exhibition Display | A1 Posters 594x841mm 157-200g, 1 MOQ | ZprintPro"),
 ("a1-posters", "图片Alt标签(JA)",
  "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
  "A1ポスター / 大判展示 | A1ポスター印刷 594×841mm・157-200g・1枚から | ZprintPro"),
 ("a1-posters", "SEO关键词(JA)",
  "A1 ポスター,A1 ポスター 印刷,a1 posters,ポスター印刷,A1ポスター,A2ポスター,屋外ポスター,展示会ポスター,大判出力,防水ポスター",
  "A1ポスター,A1ポスター 印刷,ポスター印刷,大判ポスター,展示会ポスター,大型ポスター,A2ポスター,防水ポスター"),
]

print("=== CSV edits ===")
csv_cell_edits = []
for slug, col, old, new in csv_edits:
    i = row_i[slug]
    cells = csv_lines[i].split("\t")
    ci = COL[col]
    cell = cells[ci]
    if cell == old:
        pass
    else:
        check(False, "CSV %s.%s exact mismatch (len %d)" % (slug, col, len(cell)))
        print("       actual: %r" % cell[:130]); continue
    csv_cell_edits.append((i, ci, cell, new))
    if col.startswith("H1标题"):
        check(equiv(new) <= 90, "h1 equiv %s.%s = %d (<=90)" % (slug, col, equiv(new)))
    if "Alt" in col:
        check("pet" not in new and "custom拼接" not in new and "我們支持" not in new, "alt disease purged %s.%s" % (slug, col))

# ---------------- ts bodies: 6 line replacements ----------------
raw_ts = io.open(TS_PATH, encoding="utf-8", newline="").read()
ts_lines = raw_ts.split("\n")

A2_ZH = ('"body": "A2 海報印刷是零售與活動推廣的標準規格選擇：420×594mm 的比例在門店櫥窗、商場快閃與教育走廊都剛好夠大又不搶位，10 張起印，157g 銅版紙為標準，按場景可升級 200g 或相紙。提交設計檔案即有免費數碼打稿確認色彩，30 秒 AI 報價即時試算。\\n\\n規格決策先看張貼環境：室內門店與走廊用 157g 銅版紙性價比最高；需要更挺身或長期展示，升 200g；展示級細節（藝廊、婚慶迎賓）選相紙。柯式或高品數碼依數量自動安排，四色全彩輸出色域飽滿。\\n\\n場景錦囊：零售精品店用 A2 出新品海報配櫥窗；商場快閃以 A2 陣列牆營造節奏；教育培訓機構做課程招生；藝廊展覽配 A2 導覽與作品縮圖；餐廳菜單推廣、咖啡店每季主題亦常用。需要更大衝擊力升級 [A1 大幅海報](/zh-hk/product/a1-posters/)，櫥窗貼面與短期促銷看 [自粘海報](/zh-hk/product/adhesive-posters/)，配 X 展架使用見 [展架海報](/zh-hk/product/display-posters/)，規格總覽見 [海報印刷類目](/zh-hk/category/posters/)。\\n\\n交稿規範：300 DPI、CMYK、3mm 出血、字體外框化；免費數碼打稿確認後投產；10 張起印，滿 HK$500 港九新界順豐免運。\\n\\n**常見問題**\\n\\n**Q1: A2 海報最少印幾多張？**\\n10 張起印；500 張或以上詢問階梯價更優。\\n\\n**Q2: 紙材可以升級嗎？**\\n可以，157g 銅版紙為標準，可升 200g 或相紙，展示級場景建議相紙。\\n\\n**Q3: 可以加 PP 裱貼或泡沫板嗎？**\\n可以，PP 裱貼與泡沫板裱貼都是常見加配，適合長期展示與活動重複使用。\\n\\n**Q4: 同系列要 A1 同 A2 點安排？**\\n主視覺統一、尺寸分工：A1 佔場（展覽/櫥窗），A2 走量（門店/走廊），兩款同一稿件出。\\n\\n準備好就落單——免費數碼打稿 + 30 秒 AI 報價，WhatsApp +86 198 8085 1334。",')

A2_EN = ('"body": "A2 posters are the standard retail-size workhorse: at 420x594mm they read clearly in storefronts, mall pop-ups and education corridors without overwhelming the space. ZprintPro A2 posters run from 10 pieces on 157g coated stock, upgradeable to 200gsm or photo paper by scene. Free digital proof on every file; the 30-second AI quote prices options instantly.\\n\\nStock decision by environment: 157g coated paper is the value standard for indoor promos; step up to 200gsm when the poster needs stiffness or a longer run; choose photo paper for gallery-level detail such as exhibitions and wedding welcome walls. Offset or premium digital output is assigned by quantity, always full CMYK colour.\\n\\nScene playbook: boutiques drop new-arrival A2s into the window; mall pop-ups build rhythm with an A2 array wall; education providers run enrolment campaigns; galleries pair A2 guides with artwork thumbnails; restaurants and cafes refresh seasonal themes quarterly. Need more impact? Move up to [A1 large posters](/en/product/a1-posters/). Short-term window promos belong on [adhesive posters](/en/product/adhesive-posters/); paired with stands, see [display posters](/en/product/display-posters/); the full range lives at [poster printing](/en/category/posters/).\\n\\nSpecs: 300 DPI, CMYK, 3mm bleed, outlined fonts; free digital proof before production; 10-piece MOQ; free SF shipping over HK$500 across Hong Kong.\\n\\n**FAQ**\\n\\n**Q1: What is the minimum order for A2 posters?**\\n10 pieces; volume tiers get better rates at 500 and above.\\n\\n**Q2: Can I upgrade the paper?**\\nYes — 157g coated is standard, with 200gsm and photo-paper upgrades for stiffer, longer-running or display-grade use.\\n\\n**Q3: Are mounting options available?**\\nYes — PP lamination and foam-board mounting are common add-ons for repeated or long-term display.\\n\\n**Q4: How do I split a campaign between A1 and A2?**\\nSame artwork, two jobs: A1 for impact spots (exhibitions, windows), A2 for volume coverage (stores, corridors).\\n\\nReady when you are — free digital proof and the 30-second AI quote, or WhatsApp +86 198 8085 1334.",')

A2_JA = ('"body": "A2ポスターは小売・イベント宣伝の標準サイズです。420×594mmは店舗のウィンドウやモールPOP、教育機関の廊下でも存在感と収まりのバランスが良く、10枚から、157gコート紙を標準に、用途で200g・写真紙へグレードアップできます。データ提出で無料デジタル校正、30秒AI見積りで即時試算。\\n\\n紙の選定は設置環境で：屋内の店舗・廊下は157gコート紙がコスパ標準。剛性や長期展示なら200g、ギャラリーレベルの細部には写真紙。数量に応じてオフセットまたは高品質デジタルで、常にフルCMYK出力です。\\n\\nシーン別の使い分け：セレクトショップは新商品A2をウィンドウに、モールPOPはA2の配列でリズムを作る、教育機関は募集キャンペーン、ギャラリーは作品サムネイルの案内に。インパクトを上げるなら [A1ポスター](/ja/product/a1-posters/)、短期のウィンドウ貼りは [粘着ポスター](/ja/product/adhesive-posters/)、スタンド併用は [展示用ポスター](/ja/product/display-posters/)、全体は [ポスター印刷](/ja/category/posters/) へ。\\n\\n入稿仕様：300 DPI・CMYK・3mm塗り足し・フォントアウトライン化、無料デジタル校正後に生産、10枚から、香港本地はHK$500以上でSF Express無料。\\n\\n**よくある質問**\\n\\n**Q1: 最小注文数は？**\\n10枚から。500枚以上は段階的なレートをご相談ください。\\n\\n**Q2: 紙のグレードアップは可能？**\\n可能です。157gコート紙が標準、200g・写真紙へ対応します。\\n\\n**Q3: 装着オプションは？**\\nPPラミネートと発泡ボード装着が定番の追加オプションです。\\n\\n**Q4: A1とA2の使い分けは？**\\n同じ原稿で2仕事：A1は存在感（展示・ウィンドウ）、A2は量（店舗・廊下）。\\n\\nご注文は無料デジタル校正＋30秒AI見積りから、WhatsApp +86 198 8085 1334 でも承ります。",')

A1_ZH = ('"body": "A1 大幅海報是展覽與櫥窗的衝擊力首選：594×841mm 的畫面在會場動線與街鋪玻璃前自帶氣場，1 張起印，157–200g 銅版紙或相紙輸出，柯式為主、急件走數碼，PP 護膜與泡沫板裱貼可選。免費數碼打稿確認色彩，30 秒 AI 報價即時試算。\\n\\n大幅面的決策要點：展覽會場與路演主背板選 200g 配 PP 護膜，耐反覆搬運；零售櫥窗與電影海報牆常用 157g 加裱貼，平整度優先；婚慶迎賓與學院招生用相紙出細節。泡沫板裱貼後可直接立架或掛牆，免框即展。\\n\\n場景錦囊：展覽開幕以 A1 打主視覺、A2 走量派發；演唱會與活動以 A1 陣列造勢；地產推廣在櫥窗以 A1 出樓盤主圖；文創與藝術複製以相紙保留層次。需要貼玻璃或短期促銷用 [自粘海報](/zh-hk/product/adhesive-posters/)，配展架常駐展示見 [展架海報](/zh-hk/product/display-posters/)，量販標準規格回落 [A2 海報](/zh-hk/product/a2-posters/)，總覽見 [海報印刷類目](/zh-hk/category/posters/)。\\n\\n交稿規範：300 DPI、CMYK、3mm 出血、字體外框化；免費數碼打稿確認後投產；1 張起印，港九新界免費速遞。\\n\\n**常見問題**\\n\\n**Q1: A1 真的 1 張起印？**\\n是，單張起訂；批量自然有階梯價。\\n\\n**Q2: 需要裱板可以嗎？**\\n可以，PP 護膜與泡沫板裱貼都是常規加配，裱好即可立架或掛牆。\\n\\n**Q3: 急件可以嗎？**\\n可以，柯式為主、急件走數碼，先出免費數碼打稿確認再投產。\\n\\n**Q4: A1 同 A2 應該點分？**\\n主視覺與路徑節點用 A1，派發與走廊用 A2，同稿雙尺寸最省設計費。\\n\\n準備好就落單——免費數碼打稿 + 30 秒 AI 報價，WhatsApp +86 198 8085 1334。",')

A1_EN = ('"body": "A1 posters are the impact choice for exhibitions and windows: at 594x841mm the format carries its own presence in venue traffic and storefront glass. ZprintPro A1 posters run from a single piece on 157-200g coated or photo stock, offset as standard with digital handling rush jobs, and PP lamination or foam-board mounting is available. Free digital proof before production; the 30-second AI quote prices options instantly.\\n\\nLarge-format decisions: exhibition back panels and roadshow boards take 200g with PP lamination for repeated handling; storefront and movie-poster walls usually pair 157g with mounting for flatness; wedding welcomes and school admissions show fine detail on photo paper. Foam-board mounting stands or hangs without a frame.\\n\\nScene playbook: exhibitions lead with A1 visuals and hand out A2; concerts and events build momentum with A1 arrays; property campaigns run development hero shots in windows; art reproduction keeps its gradation on photo paper. Window or short-run promo belongs on [adhesive posters](/en/product/adhesive-posters/); stand-mounted shows live at [display posters](/en/product/display-posters/); volume sizes drop back to [A2 posters](/en/product/a2-posters/); the map is at [poster printing](/en/category/posters/).\\n\\nSpecs: 300 DPI, CMYK, 3mm bleed, outlined fonts; free digital proof; single-piece MOQ; free SF shipping across Hong Kong.\\n\\n**FAQ**\\n\\n**Q1: Is it really 1-piece MOQ?**\\nYes — single posters welcome; volume tiers apply naturally.\\n\\n**Q2: Can I get it mounted?**\\nYes — PP lamination and foam-board mounting are standard add-ons; mounted boards stand or hang frameless.\\n\\n**Q3: Rush jobs?**\\nYes — offset is standard and digital handles rush; a free digital proof confirms colour before production.\\n\\n**Q4: A1 or A2 — how to split?**\\nA1 on impact points and traffic nodes, A2 for distribution and corridors; same artwork in two sizes saves design cost.\\n\\nReady when you are — free digital proof and the 30-second AI quote, or WhatsApp +86 198 8085 1334.",')

A1_JA = ('"body": "A1ポスターは展示会とウィンドウのインパクト担当です。594×841mmの画面は会場の動線や街のガラス前で自ら存在感を放ち、1枚から、157-200gコート紙または写真紙で出力、オフセットが標準で納期急ぎはデジタルが対応。PPラミネートや発泡ボード装着も選択できます。無料デジタル校正で色を確認、30秒AI見積りで即時試算。\\n\\n大判の決めどころ：展示会のメインパネルやロードショーボードは200g+PPラミネートで搬送に強く、店頭や映画ポスターウォールは157g+装着で平面性を優先、ブライダルのウェルカムや学校募集は写真紙で細部を。発泡ボード装着ならフレームなしで立てる・掛けられる状態でお届けします。\\n\\nシーンの振り分け：展示会はA1で主視覚、A2を配布。コンサートやイベントはA1の配列で勢いを作る。不動産はウィンドウに物件主図をA1で。アート複製は写真紙で階調を。ガラス貼りや短期プロモは [粘着ポスター](/ja/product/adhesive-posters/)、スタンド常設は [展示用ポスター](/ja/product/display-posters/)、量産サイズは [A2ポスター](/ja/product/a2-posters/)、全体は [ポスター印刷](/ja/category/posters/) へ。\\n\\n入稿仕様：300 DPI・CMYK・3mm塗り足し・フォントアウトライン化、無料デジタル校正、1枚から、香港本地はSF Express無料。\\n\\n**よくある質問**\\n\\n**Q1: 本当に1枚から？**\\nはい、単枚から注文できます。数量による段階レートも自然に適用されます。\\n\\n**Q2: ボード装着は可能？**\\n可能です。PPラミネートと発泡ボード装着は定番オプションで、装着済みならフレームなしで設置できます。\\n\\n**Q3: 急ぎは対応できますか？**\\n可能です。オフセット標準、急ぎはデジタル対応。無料デジタル校正後に生産へ。\\n\\n**Q4: A1とA2の振り分けは？**\\nA1はインパクト点と動線ノード、A2は配布と廊下。同じ原稿の2サイズでデザイン費を節約。\\n\\nご注文は無料デジタル校正＋30秒AI見積りから、WhatsApp +86 198 8085 1334 でもどうぞ。",')

BODIES = [
    ("a2-posters", "zh-hk", A2_ZH), ("a2-posters", "en", A2_EN), ("a2-posters", "ja", A2_JA),
    ("a1-posters", "zh-hk", A1_ZH), ("a1-posters", "en", A1_EN), ("a1-posters", "ja", A1_JA),
]
print("=== ts body line edits ===")
ts_line_edits = []
for slug, loc, new_line in BODIES:
    si = raw_ts.find('"%s": {' % slug)
    ei = raw_ts.find('\n  "', si + 4)
    seg_start = raw_ts[:si].count("\n")
    seg_end = raw_ts[:ei].count("\n") if ei > 0 else len(ts_lines)
    li = raw_ts.find('"%s": {' % loc, si)
    hits = [k for k in range(seg_start, seg_end + 1) if ts_lines[k].strip().startswith('"body": "') and (raw_ts[:sum(len(x)+1 for x in ts_lines[:k])].rfind('"%s": {' % loc) > si)]
    # simpler robust: within [seg_start, seg_end], find the body line that appears AFTER the locale marker line
    loc_line = None
    for k in range(seg_start, seg_end + 1):
        if ts_lines[k].strip().startswith('"%s": {' % loc):
            loc_line = k
            break
    loc_end = seg_end
    if loc_line is not None:
        for k in range(loc_line + 1, seg_end + 1):
            s2 = ts_lines[k].strip()
            if s2.startswith('"zh-hk": {') or s2.startswith('"en": {') or s2.startswith('"ja": {'):
                loc_end = k - 1
                break
    hits = [k for k in range(loc_line, loc_end + 1) if ts_lines[k].strip().startswith('"body": "')] if loc_line is not None else []
    check(len(hits) == 1, "ts %s.%s body line unique (hit=%d)" % (slug, loc, len(hits)))
    if len(hits) == 1:
        k = hits[0]
        ts_line_edits.append((k, ts_lines[k], new_line))
        for u in re.findall(r"\]\((/[^)]+)\)", new_line):
            check(u.startswith("/en/") or u.startswith("/ja/") or u.startswith("/zh-hk/"), "link prefix %s" % u)
        if loc == "zh-hk":
            bad = [c for c in new_line if c in "们后发这说时实现对开页买张东丝乐针让贝见车转换运远设图风络"]
            check(not bad, "zh body no simplified (found %s)" % "".join(sorted(set(bad))))
        if loc == "ja":
            bad = [c for c in new_line if c in "裝內"]
            check(not bad, "ja body no traditional-only (found %s)" % "".join(sorted(set(bad))))
        check("GSC" not in new_line and "pos " not in new_line, "gsc-leak safe")

# ---------------- products.ts faqSchema x2 ----------------
prod_lines = io.open(PROD_PATH, encoding="utf-8", newline="").read().split("\n")
pstarts = {}
for i, ln in enumerate(prod_lines):
    for s in ("a1-posters", "a2-posters"):
        if ("slug: '%s'" % s) in ln:
            pstarts[s] = i
TPL = 'What is the best paper weight for posters?'
FAQ_NEW = {
 "a2-posters": '[{"question": "What is the MOQ for A2 posters?", "answer": "10 pieces standard, with better volume rates from 500 pieces upward."}, {"question": "What paper weights are available for A2 posters?", "answer": "157g coated paper is standard, upgradeable to 200gsm or photo paper when the display needs stiffness or gallery-level detail."}, {"question": "Can A2 posters be laminated or mounted?", "answer": "Yes — PP lamination and foam-board mounting are common add-ons for long-term or repeated display."}, {"question": "Which finish suits shop windows vs exhibitions?", "answer": "Retail windows run 157g coated for frequent refreshes; exhibition and wedding displays take 200gsm or photo paper with mounting."}]',
 "a1-posters": '[{"question": "Is there a minimum order for A1 posters?", "answer": "Single-piece MOQ — one poster is welcome, with natural volume tiers at higher quantities."}, {"question": "What stock works for A1 posters?", "answer": "157-200g coated or photo paper: 200g with PP lamination for back panels that travel, 157g with mounting for flat storefront walls, photo paper for fine detail."}, {"question": "Can A1 posters be foam-board mounted?", "answer": "Yes — foam-board mounting is a standard option; mounted boards stand or hang without a frame."}, {"question": "How do rush A1 orders work?", "answer": "Offset is the standard process and digital handles rush jobs; a free digital proof confirms colour before production starts."}]',
}
print("=== products.ts faqSchema ===")
prod_line_edits = []
for slug, newfaq in FAQ_NEW.items():
    st = pstarts[slug]
    hit = next((i for i in range(st, st + 100) if "faqSchema:" in prod_lines[i]), None)
    check(hit is not None, "faqSchema line for %s" % slug)
    if hit is None:
        continue
    old_line = prod_lines[hit]
    check(TPL in old_line, "%s old faqSchema = posters template" % slug)
    try:
        check(len(json.loads(newfaq)) == 4, "%s new faqSchema 4 QA" % slug)
    except Exception as ex:
        check(False, "%s faqSchema JSON: %s" % (slug, ex))
    prod_line_edits.append((hit, old_line, "    faqSchema: " + newfaq + ","))

# ---------------- write ----------------
if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    for src in (CSV_PATH, TS_PATH, PROD_PATH):
        shutil.copy2(src, os.path.join(BAK, os.path.basename(src) + ".bak"))
    for i, ci, oldc, newc in csv_cell_edits:
        cells = csv_lines[i].split("\t"); assert cells[ci] == oldc; cells[ci] = newc
        csv_lines[i] = "\t".join(cells)
    io.open(CSV_PATH, "w", encoding="utf-8", newline="").write("\n".join(csv_lines) + ("\n" if trailing else ""))
    for k, oldl, newl in ts_line_edits:
        assert ts_lines[k] == oldl; ts_lines[k] = newl
    io.open(TS_PATH, "w", encoding="utf-8", newline="").write("\n".join(ts_lines))
    for i, oldl, newl in prod_line_edits:
        assert prod_lines[i] == oldl; prod_lines[i] = newl
    io.open(PROD_PATH, "w", encoding="utf-8", newline="").write("\n".join(prod_lines))
    for p in (CSV_PATH, TS_PATH, PROD_PATH):
        check(open(p, "rb").read(2)[0] != 0xFF, "no BOM %s" % os.path.basename(p))
    print("\nWROTE: CSV %d cells / ts %d bodies / products.ts %d lines" % (len(csv_cell_edits), len(ts_line_edits), len(prod_line_edits)))
else:
    print("\nVERIFY: %d csv cells, %d ts bodies, %d prod lines pending." % (len(csv_cell_edits), len(ts_line_edits), len(prod_line_edits)))
print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
