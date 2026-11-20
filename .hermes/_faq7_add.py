# -*- coding: utf-8 -*-
"""skuMoneyFAQs 扩编 7 SKU x 4 问 x 3 语（覆盖 18 -> 25/83），答案锚 products.ts 真值"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "product-faqs.ts")
B = os.path.join(REPO, ".hermes", "_bak-faq7-20261022")
os.makedirs(B, exist_ok=True)

# slug -> (minQ, range, 单价展示, 单位)
SKU = {
    "transparent-stickers": (10, "HK$0.38-1.50/張", "HK$0.38-1.50", "張"),
    "removable-stickers": (10, "HK$0.45-1.60/張", "HK$0.45-1.60", "張"),
    "foil-stickers": (10, "HK$0.78-2.80/張", "HK$0.78-2.80", "張"),
    "security-stickers": (10, "HK$1.15-4.00/張", "HK$1.15-4.00", "張"),
    "a4-flyers": (10, "HK$0.35-0.95/張", "HK$0.35-0.95", "張"),
    "a5-flyers": (10, "HK$0.25-0.65/張", "HK$0.25-0.65", "張"),
    "wall-calendars": (1, "HK$3-8/本", "HK$3-8", "本"),
}

# 每 SKU: 4 组 (q_zh, q_en, q_ja, a_zh, a_en, a_ja)
DATA = {
 "transparent-stickers": [
  ("透明貼紙最少印幾多？價錢點計？",
   "What is the minimum order and price for transparent stickers?",
   "透明ステッカーの最小ロットと価格は？",
   "10 張起印，HK$0.38-1.50/張（按尺寸與數量）。檔案確認後標準 3-5 個工作天。",
   "From 10 pieces at HK$0.38-1.50 each depending on size and quantity; 3-5 business days after artwork approval.",
   "10枚から、HK$0.38-1.50/枚（サイズ・数量による）。データ確定後、標準3〜5営業日。"),
  ("透明貼紙用咩材質？貼上後會唔會擋住產品？",
   "What material is used, and will it hide the product underneath?",
   "素材は何ですか。貼っても下の商品は見えますか。",
   "透明 PET 材質，貼合後近乎無感，LOGO 與圖案直接呈現，不會遮住瓶身或包裝本身的顏色。",
   "Clear PET film reads almost invisible once applied, so logos show without blocking the bottle or pack colour.",
   "透明PET素材で、貼った後はほぼ見えず、ロゴや図柄だけが浮かびます。ボトルやパッケージの色を隠しません。"),
  ("透明貼紙適合咩產品？",
   "Which products suit transparent stickers?",
   "透明ステッカーはどんな商品に向いていますか。",
   "化妝品、食品與酒類、飲品瓶身、香水、玻璃容器，以及不想加標籤感的高端包裝。",
   "Cosmetics, food and beverage bottles, perfume, glass containers, and premium packs where a label edge would look wrong.",
   "化粧品、食品・酒類、飲料ボトル、香水、ガラス容器、ラベル感を出したくない高級パッケージ。"),
  ("交期幾耐？可以打稿先睇效果嗎？",
   "How long is production, and can I see a proof first?",
   "納期はどのくらいですか。校正はできますか。",
   "標準 3-5 個工作天；1 小時內免費數碼打稿，透明材質的實際透度以打稿為準。",
   "Standard 3-5 business days; a free digital proof within 1 hour shows how the clear film reads on your artwork.",
   "標準3〜5営業日。1時間以内に無料デジタル校正をお出しし、透明感は校正で確認できます。"),
 ],
 "removable-stickers": [
  ("可移貼紙最少印幾多？價錢點計？",
   "Minimum order and price for removable stickers?",
   "再剥離ステッカーの最小ロットと価格は？",
   "10 張起印，HK$0.45-1.60/張（按尺寸與數量）。標準 3-5 個工作天。",
   "From 10 pieces at HK$0.45-1.60 each by size and quantity; 3-5 business days standard.",
   "10枚から、HK$0.45-1.60/枚（サイズ・数量による）。標準3〜5営業日。"),
  ("移除之後會唔會留膠？",
   "Will it leave residue when removed?",
   "剥がした後に糊が残りませんか。",
   "特殊背膠設計，正常貼附與移除後不留殘膠，適合玻璃、車窗等光滑表面。",
   "The adhesive is built to release cleanly from smooth surfaces such as glass and car windows.",
   "特殊粘着設計で、ガラスや車窓などの平滑面からは糊残りなく剥がせます。"),
  ("可移貼紙適合咩場景？",
   "Where are removable stickers normally used?",
   "再剥離ステッカーの主な用途は？",
   "季節性推廣、短期展覽、試用品包裝、櫥窗裝飾、學校活動、餐廳當日告示、零售促銷。",
   "Seasonal promotions, short exhibitions, sample packs, window dressing, school events, daily restaurant notices and retail promos.",
   "季節キャンペーン、短期展示、サンプル包装、ショーウィンドウ装飾、学校イベント、店頭の当日案内、小売プロモーション。"),
  ("大量採購交期會唔會更長？",
   "Does a large order take longer?",
   "大量発注だと納期は延びますか。",
   "常規 3-5 個工作天；數量特別大或需要多款分袋時，落單前先確認檔期比較穩。",
   "Normally 3-5 business days; for very large runs or multi-design packing, confirm the slot before ordering.",
   "通常3〜5営業日。極端に多い部数や複数デザインの分封が必要な場合は、発注前に枠を確認してください。"),
 ],
 "foil-stickers": [
  ("燙金貼紙最少印幾多？價錢點計？",
   "Minimum order and price for foil stickers?",
   "箔押しステッカーの最小ロットと価格は？",
   "10 張起印，HK$0.78-2.80/張（按尺寸、箔色與數量）。標準 3-5 個工作天。",
   "From 10 pieces at HK$0.78-2.80 each by size, foil colour and quantity; 3-5 business days.",
   "10枚から、HK$0.78-2.80/枚（サイズ・箔色・数量による）。標準3〜5営業日。"),
  ("有咩箔色可以揀？",
   "Which foil colours are available?",
   "箔の色は選べますか。",
   "金、銀為常規色；其他金屬色與特殊箔按批次查詢，落單時註明即可。",
   "Gold and silver are standard; other metallic and speciality foils are quoted per run — just note the colour on the order.",
   "金・銀が標準です。その他のメタリック箔・特殊箔はロットごとにご相談ください。"),
  ("燙金貼紙適合貼在邊度？",
   "Where do foil stickers work best?",
   "箔押しステッカーはどこに使えますか。",
   "高端產品標籤、禮品包裝封口、VIP 標識、酒類與美妝瓶身，需要金屬光澤的位置。",
   "Premium product labels, gift-box seals, VIP marks, wine and beauty bottles — anywhere a metallic highlight helps.",
   "高級品ラベル、ギフト包装の封緘、VIP表示、酒類・化粧品ボトルなど、金属の輝きが効く場所。"),
  ("燙金效果同屏幕色一樣嗎？",
   "Will the foil match what I see on screen?",
   "箔の色は画面と同じですか。",
   "不完全一樣——同一款箔壓在不同紙材上會有色差，所以以打稿實樣為準，不要只看屏幕。",
   "Not exactly: the same foil shifts on different stocks, so judge from the physical proof rather than the screen.",
   "画面と完全には一致しません。同じ箔でも紙によって色味が変わるため、校正の実物でご確認ください。"),
 ],
 "security-stickers": [
  ("防偽貼紙最少印幾多？價錢點解偏高？",
   "Minimum order and why is the unit price higher?",
   "偽造防止ステッカーの最小ロットと価格が高めな理由は？",
   "10 張起印，HK$1.15-4.00/張。單價較高是因為防偽工藝（雷射、易碎紙等）本身有材料與工序成本。",
   "From 10 pieces at HK$1.15-4.00 each — the higher unit price reflects the security material and process (laser, fragile paper).",
   "10枚から、HK$1.15-4.00/枚。価格が高めなのは、レーザーや脆弱紙など偽造防止の素材と工程にコストがかかるためです。"),
  ("有邊幾種防偽工藝？",
   "Which security features are available?",
   "どんな偽造防止加工がありますか。",
   "雷射標籤（光變圖案）、易碎紙（撕即破、無法完整轉移）等，可按品牌需要組合。",
   "Laser labels with optical patterns and fragile paper that tears instead of peeling cleanly — combined to suit the brand.",
   "光学的なパターンのレーザーラベル、剥がすと破れる脆弱紙などを組み合わせられます。"),
  ("咩行業最常用防偽貼紙？",
   "Which industries use security stickers most?",
   "どの業種で多く使われますか。",
   "美妝護膚、食品酒類、電子配件、藥品與保健品，以及需要封口證明的跨境電商。",
   "Beauty, food and beverage, electronics accessories, health products, and cross-border sellers who need a tamper seal.",
   "化粧品、食品・酒類、電子アクセサリー、健康食品、封緘証明が必要な越境EC。"),
  ("交期同普通貼紙一樣嗎？",
   "Is lead time the same as standard stickers?",
   "納期は通常のステッカーと同じですか。",
   "標準 3-5 個工作天；特殊防偽材料需先確認庫存，落單前問一句最穩。",
   "3-5 business days standard; speciality security stock should be confirmed before ordering.",
   "標準3〜5営業日。特殊な偽造防止素材は在庫確認を先に行うと確実です。"),
 ],
 "a4-flyers": [
  ("A4 傳單最少印幾多？價錢點計？",
   "Minimum order and price for A4 flyers?",
   "A4チラシの最小ロットと価格は？",
   "10 張起印，HK$0.35-0.95/張（按紙材、數量與加工）。標準 3-5 個工作天。",
   "From 10 sheets at HK$0.35-0.95 each by stock, quantity and finishing; 3-5 business days.",
   "10枚から、HK$0.35-0.95/枚（用紙・数量・加工による）。標準3〜5営業日。"),
  ("用咩紙？可唔可以雙面印？",
   "What paper, and can it print double-sided?",
   "用紙と両面印刷は？",
   "157g 銅版紙雙面四色為標準配置，手感挺括、色彩還原好；需要更厚或啞面可另行查詢。",
   "157g art paper with four-colour both sides is the standard build: firm in hand and colour-accurate. Thicker or matte stocks on request.",
   "157gコート紙の両面4色が標準。手触りがしっかりして発色も良好です。厚手やマット紙はご相談ください。"),
  ("設計稿要唔要自己準備？",
   "Do I need to supply finished artwork?",
   "デザインデータは必要ですか。",
   "可以自備 AI／PDF 稿；如果只有文字與圖片，也可以走免費設計排版，打稿確認後才開印。",
   "Supply AI or PDF if you have it; if not, free layout service is available and print starts only after you approve the proof.",
   "AI／PDFがあればそのまま入稿できます。無い場合は無料レイアウトも可能で、校正承認後に印刷します。"),
  ("急件可以幾快？",
   "How fast can a rush job run?",
   "急ぎの場合はどれくらいで出来ますか。",
   "標準 3-5 個工作天；檔期許可下可安排急件，請先提供數量與交稿日，我們回覆實際可行時間。",
   "3-5 business days standard; where the schedule allows we take rush jobs — send quantity and artwork date and we confirm the real turnaround.",
   "標準3〜5営業日。枠が空いていれば特急も可能です。部数と入稿日をお知らせいただければ実際の納期をお答えします。"),
 ],
 "a5-flyers": [
  ("A5 傳單最少印幾多？價錢點計？",
   "Minimum order and price for A5 flyers?",
   "A5チラシの最小ロットと価格は？",
   "10 張起印，HK$0.25-0.65/張（按紙材、數量與加工）。標準 3-5 個工作天。",
   "From 10 sheets at HK$0.25-0.65 each by stock, quantity and finishing; 3-5 business days.",
   "10枚から、HK$0.25-0.65/枚（用紙・数量・加工による）。標準3〜5営業日。"),
  ("A5 同 A4 有咩分別？點揀？",
   "A5 or A4 — how do I choose?",
   "A5とA4はどう選びますか。",
   "A5 面積是 A4 一半，適合街頭派發與隨手翻閱；A4 版面大、資訊多，適合店內張貼或夾報。",
   "A5 is half the area of A4: better for hand-outs and quick reading. A4 carries more information, better for in-store posting or inserts.",
   "A5はA4の半分の面積で、手渡しやさっと読む用途に向きます。A4は情報量が多く、店頭掲示や折込に向きます。"),
  ("紙材同印刷規格係點？",
   "What are the paper and print specs?",
   "用紙と印刷仕様は？",
   "157g 銅版紙、雙面四色為標準；需要單面、啞膜或摺頁加工可另議。",
   "157g art paper with four-colour both sides as standard; single-sided, matte lamination or folding available on request.",
   "157gコート紙・両面4色が標準。片面、マット加工、折り加工もご相談ください。"),
  ("交期幾耐？可以打稿嗎？",
   "Lead time and proofing?",
   "納期と校正は？",
   "標準 3-5 個工作天，1 小時內免費數碼打稿；確認後才開印，避免整批重做。",
   "3-5 business days standard with a free digital proof within 1 hour, so the run starts only after you approve.",
   "標準3〜5営業日、1時間以内に無料デジタル校正。承認後に印刷を開始します。"),
 ],
 "wall-calendars": [
  ("掛曆最少印幾多？價錢點計？",
   "Minimum order and price for wall calendars?",
   "壁掛けカレンダーの最小ロットと価格は？",
   "1 本起印，HK$3-8/本（按尺寸、頁數、紙材與數量）。標準 3-5 個工作天。",
   "From 1 copy at HK$3-8 each by size, page count, stock and quantity; 3-5 business days.",
   "1部から、HK$3-8/部（サイズ・ページ数・用紙・数量による）。標準3〜5営業日。"),
  ("有咩尺寸同頁數？",
   "Which sizes and page counts?",
   "サイズとページ数は？",
   "標準 A3 或 A2 掛牆，13 頁設計（封面＋12 個月）；需要 A4 或自訂尺寸可查詢。",
   "A3 or A2 wall format with 13 pages (cover plus 12 months); A4 and custom sizes on request.",
   "A3またはA2の壁掛け、13ページ構成（表紙＋12か月）。A4や特殊サイズもご相談ください。"),
  ("適合咩用途？",
   "What are wall calendars used for?",
   "どんな用途に向いていますか。",
   "家庭與辦公室自用、企業年終送客戶、店舖全年品牌曝光；企業版可加 12 個月獨立宣傳版面。",
   "Home and office use, year-end client gifting and year-round brand presence in shops; corporate versions can carry a different message on each month.",
   "家庭・オフィス用途、年末の法人ギフト、店舖での通年ブランド露出。法人版は月ごとに訴求を変えられます。"),
  ("旺季幾時要落單？",
   "When should I order for the peak season?",
   "繁忙期はいつ発注すべきですか。",
   "年曆旺季集中在第四季，建議 11 月前定稿、11 月中前落單，避開 12 月排隊。",
   "Calendar demand peaks in Q4: approve artwork before November and order by mid-November to avoid the December queue.",
   "カレンダー需要は第4四半期に集中します。11月前に校了、11月中までに発注すると12月の混雑を避けられます。"),
 ],
}

def ts_entry(slug, rows):
    out = [f"  '{slug}': ["]
    for (qz, qe, qj, az, ae, aj) in rows:
        out.append("    {")
        out.append("      question: {")
        out.append(f"        'zh-hk': {json_dumps(qz)},")
        out.append(f"        en: {json_dumps(qe)},")
        out.append(f"        ja: {json_dumps(qj)},")
        out.append("      },")
        out.append("      answer: {")
        out.append(f"        'zh-hk': {json_dumps(az)},")
        out.append(f"        en: {json_dumps(ae)},")
        out.append(f"        ja: {json_dumps(aj)},")
        out.append("      },")
        out.append("    },")
    out.append("  ],")
    return "\n".join(out)

def json_dumps(s):
    # 单引号字符串（TS 风格），转义单引号与反斜杠
    assert "'" not in s, s
    return "'" + s.replace("\\", "\\\\") + "'"

t = io.open(P, encoding="utf-8", newline="").read()
n0 = len(t)

# 断言：7 个 slug 尚未存在
for slug in SKU:
    assert f"'{slug}': [" not in t, f"{slug} already present"

# 找最后一个已有 key 的数组结束位置（'gift-bags'）
anchor = "'gift-bags': ["
ai = t.index(anchor)
depth = 0
k = t.index("[", ai)
end = None
for idx in range(k, len(t)):
    ch = t[idx]
    if ch == "[":
        depth += 1
    elif ch == "]":
        depth -= 1
        if depth == 0:
            end = idx
            break
assert end, "gift-bags array end not found"
# 该数组后面应紧跟 ","
assert t[end + 1] == ",", "unexpected char after array"

blocks = [ts_entry(slug, DATA[slug]) for slug in DATA]
insert = "\n" + "\n".join(blocks)
t2 = t[:end + 2] + insert + t[end + 2:]

# 断言：7 keys 出现、总 key 数 25
for slug in DATA:
    assert t2.count(f"'{slug}': [") == 1, slug
keys = re.findall(r"^  '([a-z0-9-]+)': \[", t2, re.M)
assert len(keys) == 25, f"keys={len(keys)}"
# 每 SKU 4 问
for slug, rows in DATA.items():
    assert len(rows) == 4
# ja 禁「份」/ 中文价格口径检查
for slug, rows in DATA.items():
    for r in rows:
        assert "份" not in r[2] + r[5], f"{slug} ja 含 份"
    assert "HK$" in rows[0][3], f"{slug} 首问无价格锚"

bp = os.path.join(B, "product-faqs.ts.before")
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t2)
print(f"[OK] skuMoneyFAQs: {n0} -> {len(t2)} bytes | keys 18 -> {len(keys)} | +{len(DATA)} SKU x 4 Q x 3 locales")
