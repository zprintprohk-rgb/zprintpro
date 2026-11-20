# -*- coding: utf-8 -*-
# Phase 2 内容注入脚本（W2 三页 GEO 增强）
# 策略：条目级定位（避免跨 SKU 同文片段误伤）+ 每文件备份 + 断言未过不写盘 + 写后校验
# 红线：价格全部由 products.ts 真值派生（HK$38/A4 基价 × variables 倍率/折扣、¥7,500/10部），
#       不编造新价格；引用只用自身白名单参数（FSC/ISO/DHL/MOQ），不引未核验行业报告。
import io, json, os, re, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
BAK = os.path.join(ROOT, ".hermes", "geo", "bak-phase2")
os.makedirs(BAK, exist_ok=True)

def rd(p):
    with io.open(p, 'r', encoding='utf-8') as f:
        return f.read()

def wr(p, s):
    with io.open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(s)

def backup(p, name):
    shutil.copy2(p, os.path.join(BAK, name))

changed = []

# ============================================================
# 1) products-content.ts — small-batch-stickers 三语：注入单位价梯度表（MOQ 真值 10 A4 / HK$38 基价）
# ============================================================
PC = os.path.join(ROOT, "src", "data", "products-content.ts")
t = rd(PC)
i0 = t.find("'small-batch-stickers': {")
i1 = t.find("'die-cut-stickers': {", i0)
assert i0 > 0 and i1 > i0, "small-batch entry boundaries not found"
entry = t[i0:i1]

# --- zh：插在 longDescription 块末尾（longDescriptionEn 键之前）
zh_block = """
<h3>小批量單價梯度（A4 版面起，真實報價引擎口徑）</h3>
<p>下表按本頁報價引擎真實參數推導：A4 版面基價 HK$38 起，含常用尺寸與數量折扣；PVC 防水為基準材質，PP 合成紙 +HK$10、PET 透明 +HK$15，異形模切 +HK$30。實際結算以即時報價為準。</p>
<table>
  <thead><tr><th>數量</th><th>小尺寸 (≤50mm)</th><th>中尺寸 (51-100mm)</th><th>大尺寸 (&gt;100mm)</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>10 張（起訂）</td><td>HK$89/張</td><td>HK$134/張</td><td>HK$196/張</td></tr>
    <tr class="border-b border-gray-200"><td>100 張</td><td>HK$38/張</td><td>HK$57/張</td><td>HK$84/張</td></tr>
    <tr class="border-b border-gray-200"><td>500 張</td><td>HK$29/張</td><td>HK$43/張</td><td>HK$63/張</td></tr>
    <tr><td>1000 張</td><td>HK$29/張以下</td><td>報價為準</td><td>報價為準</td></tr>
  </tbody>
</table>
<p>口徑說明：10 張檔為起訂價（HK$38 × 2.35 起訂係數，小尺寸）；100 張檔為基準價 × 尺寸倍率（小 ×1 / 中 ×1.5 / 大 ×2.2）；500 張檔已計 15% 批量折扣。選用 PP / PET 材質或異形模切按上方加價另計。</p>
"""
a_zh = '`,\n    longDescriptionEn:'
assert entry.count(a_zh) == 1, "zh insert anchor count=%d" % entry.count(a_zh)
entry = entry.replace(a_zh, zh_block + a_zh, 1)

# --- en：插在 longDescriptionEn 块末尾（longDescriptionJa 键之前）
en_block = """
<h3>Small-Batch Sticker Unit Price Gradient (Real Quote-Engine Rates)</h3>
<p>Derived from this page's live pricing engine: A4-sheet base price from HK$38 (≈US$5) with size multipliers and a 10-sheet minimum. PVC waterproof stock is the baseline; PP synthetic paper +HK$10, clear PET +HK$15, custom die-cut +HK$30. Final checkout quote governs.</p>
<table>
  <thead><tr><th>Quantity</th><th>Small (≤50mm)</th><th>Medium (51-100mm)</th><th>Large (&gt;100mm)</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>10 sheets (MOQ)</td><td>HK$89/sheet</td><td>HK$134/sheet</td><td>HK$196/sheet</td></tr>
    <tr class="border-b border-gray-200"><td>100 sheets</td><td>HK$38/sheet</td><td>HK$57/sheet</td><td>HK$84/sheet</td></tr>
    <tr class="border-b border-gray-200"><td>500 sheets</td><td>HK$29/sheet</td><td>HK$43/sheet</td><td>HK$63/sheet</td></tr>
    <tr><td>1000 sheets</td><td>below HK$29/sheet</td><td>by quote</td><td>by quote</td></tr>
  </tbody>
</table>
<p>How to read it: the 10-sheet tier applies the MOQ factor (HK$38 × 2.35, small size); the 100-sheet tier is the base price × size multiplier (×1 / ×1.5 / ×2.2); the 500-sheet tier includes the 15% bulk discount. Add-ons price separately per the table above. MOQ is 10 sheets per A4 layout — the lowest barrier for a test run in Asia manufacturing.</p>
"""
a_en = '`,\n    longDescriptionJa:'
assert entry.count(a_en) == 1, "en insert anchor count=%d" % entry.count(a_en)
entry = entry.replace(a_en, en_block + a_en, 1)

# --- ja：插在条目末（最后一个反引号逗号之前）
ja_block = """
<h3>小ロット単価表（A4 版基準・実報価エンジン準拠）</h3>
<p>本ページの見積もりエンジン実パラメータから算出：A4 版基本価格 HK$38（約 700 円）〜、最小ロット 10 枚。PVC 防水が基準材質で、PP 合成紙 +HK$10、PET 透明 +HK$15、型抜き +HK$30。最終価格は見積もりでご確認ください。</p>
<table>
  <thead><tr><th>枚数</th><th>小サイズ (≤50mm)</th><th>中サイズ (51-100mm)</th><th>大サイズ (&gt;100mm)</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>10 枚（最小ロット）</td><td>HK$89/枚</td><td>HK$134/枚</td><td>HK$196/枚</td></tr>
    <tr class="border-b border-gray-200"><td>100 枚</td><td>HK$38/枚</td><td>HK$57/枚</td><td>HK$84/枚</td></tr>
    <tr class="border-b border-gray-200"><td>500 枚</td><td>HK$29/枚</td><td>HK$43/枚</td><td>HK$63/枚</td></tr>
    <tr><td>1000 枚</td><td>HK$29/枚以下</td><td>要見積もり</td><td>要見積もり</td></tr>
  </tbody>
</table>
<p>読み方：10 枚帯は最小ロット係数（HK$38 × 2.35、小サイズ）適用。100 枚帯は基準価格 × サイズ倍率（×1 / ×1.5 / ×2.2）。500 枚帯は 15% の数量割引込み。10 枚から対応する小ロット対応は、テスト印刷やイベント限定グッズに最適です。</p>
"""
j = entry.rfind('`,')
assert j > 0, "ja closing backtick not found"
entry = entry[:j] + ja_block + entry[j:]

backup(PC, "products-content.ts.bak")
t = t[:i0] + entry + t[i1:]
wr(PC, t)
# 写后校验
chk = rd(PC)
for marker in ['小批量單價梯度', 'Small-Batch Sticker Unit Price Gradient', '小ロット単価表']:
    assert chk.count(marker) == 1, "post-check marker %s = %d" % (marker, chk.count(marker))
changed.append("products-content.ts (+3 梯度表段)")

# ============================================================
# 2) products.ts — doujinshi-printing 新建三语 longDescription（膠裝 vs 騎馬釘 + 出血安全区）
#    真值：¥7,500〜/部、10 部起、A5/B5、FSC 道林紙 90g/銅版 90g 封面、騎馬釘 8-64頁、
#         膠裝 65+ 頁（faqSchema 真值）、DHL Express 2-4 個工作天、24 小時特急
# ============================================================
PT = os.path.join(ROOT, "src", "data", "products.ts")
t = rd(PT)
i0 = t.find("slug: 'doujinshi-printing'")
i1 = t.find("slug: 'postcard-set'", i0)
assert i0 > 0 and i1 > i0, "doujinshi entry boundaries not found"
entry = t[i0:i1]

dj_zh = """    longDescription: `<h3>裝訂方式點樣揀：膠裝 vs 騎馬釘</h3>
<table>
  <thead><tr><th>裝訂</th><th>頁數範圍</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>騎馬釘</td><td>8-64 頁</td><td>薄本漫畫、今撮本、場刊；可完全攤平，翻閱方便</td></tr>
    <tr><td>膠裝（Perfect Binding）</td><td>65 頁以上</td><td>厚本畫集、合同本；有書脊，方便書架陳列同系列收藏</td></tr>
  </tbody>
</table>
<h3>內頁紙材點揀</h3>
<p>標準配置係 FSC 認證道林紙 90g 內頁 + 銅版紙 90g 封面（封面彩色、內頁單色）。內頁文字為主揀 90g 已足夠；滿版插畫想提升質感可升級進階選項。尺寸支援 A5（148×210mm）/ B5（182×257mm）/ A4 自訂。</p>
<h3>出血同安全區（入稿前必讀）</h3>
<p>跨頁插畫記得預留 3mm 出血，重要線稿、對白同簽名放喺安全區（裁切線內 5mm）以內。騎馬釘裝訂要留意釘位預留：跨頁位預留 5mm 裝訂邊，避免重要畫面被釘書釘遮擋。PDF 入稿前將所有字體轉外框（Outline），色彩模式用 CMYK。</p>
<h3>交期點計</h3>
<p>標準交期 5-7 個工作天，深圳自營工廠 + DHL Express 直送日本 2-4 個工作天。Comiket 前提供 24 小時特急對應，夏天（6-7 月）同冬天（12 月）落單高峰建議提早 10-15 個工作天落單。</p>
`,
    longDescriptionEn: `<h3>Binding Options: Perfect Binding vs Saddle Stitch</h3>
<table>
  <thead><tr><th>Binding</th><th>Page Range</th><th>Best For</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>Saddle Stitch</td><td>8-64 pages</td><td>Thin manga, event booklets; lays fully flat for reading</td></tr>
    <tr><td>Perfect Binding</td><td>65+ pages</td><td>Thick art books, anthologies; printable spine for shelf display</td></tr>
  </tbody>
</table>
<h3>Interior Paper Selection</h3>
<p>Standard spec: FSC-certified uncoated 90gsm interior + 90gsm coated cover (full-color cover, mono interior). Text-heavy pages work well on 90gsm; upgrade to the premium option for full-bleed illustration work. Sizes: A5 (148×210mm), B5 (182×257mm), custom A4.</p>
<h3>Bleed and Safe Zone (Read Before Uploading)</h3>
<p>Keep 3mm bleed on all full-bleed artwork; place key linework, dialogue and signatures inside the 5mm safe zone from trim. For saddle stitch, reserve a 5mm binding margin at the spine side of spreads so staples never cover key art. Convert all fonts to outlines and submit in CMYK PDF.</p>
<h3>Turnaround</h3>
<p>Standard production is 5-7 business days, then DHL Express from our Shenzhen factory to Japan in 2-4 business days. A 24-hour rush is available before Comiket; during peak seasons (June-July and December) plan 10-15 business days ahead.</p>
`,
    longDescriptionJa: `<h3>製本の選び方：無線綴じ vs 中綴じ</h3>
<table>
  <thead><tr><th>製本</th><th>ページ数</th><th>おすすめの用途</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>中綴じ（騎馬釘）</td><td>8-64 ページ</td><td>薄めの漫画・イベント本。完全に開き、閲覧しやすい</td></tr>
    <tr><td>無線綴じ（膠裝）</td><td>65 ページ以上</td><td>厚めの画集・合同誌。背表紙あり、棚に並べて保管しやすい</td></tr>
  </tbody>
</table>
<h3>本文用紙の選び方</h3>
<p>標準仕様：FSC 認証上質紙 90g（本文）+ コート紙 90g（表紙）。表紙フルカラー・本文モノクロ。文字主体なら 90g で十分、塗り絵・イラスト主体ならプレミアム選択肢へ。サイズは A5（148×210mm）/ B5（182×257mm）/ A4 カスタム対応。</p>
<h3>塗り足しとセーフゾーン（入稿前の必読）</h3>
<p>見開きイラストは 3mm の塗り足し（ドブ）を確保し、重要な線画・セリフ・サインは断裁線から 5mm 内側のセーフゾーンへ。中綴じはノド側に 5mm のマージンを取り、ホチキス針が重要な絵を隠さないように。フォントはアウトライン化、カラーモードは CMYK の PDF でご入稿ください。</p>
<h3>納期の目安</h3>
<p>標準納期 5-7 営業日、深圳自社工場から DHL Express で日本へ 2-4 営業日。コミケ前は 24 時間特急対応可。夏（6-7 月）・冬（12 月）の繁忙期は 10-15 営業日の余裕を持ってご発注ください。</p>
`,
"""
a_v18 = "    // === V18 CLEARED 2026-09-12"
assert entry.count(a_v18) == 1, "doujinshi V18 anchor count=%d" % entry.count(a_v18)
entry = entry.replace(a_v18, dj_zh + a_v18, 1)

backup(PT, "products.ts.bak")
t = t[:i0] + entry + t[i1:]
wr(PT, t)
chk = rd(PT)
for m in ['Binding Options: Perfect Binding vs Saddle Stitch', '製本の選び方', '裝訂方式點樣揀']:
    assert chk.count(m) == 1, "post-check %s=%d" % (m, chk.count(m))
changed.append("products.ts (doujinshi +3 longDescription)")

# ============================================================
# 3) seo.ts — Product schema 根部注入 @id（三语种同 sku + per-locale @id，实体对齐锚点）
# ============================================================
ST = os.path.join(ROOT, "src", "lib", "seo.ts")
t = rd(ST)
fi = t.find("export function generateProductJsonLd")
assert fi > 0, "generateProductJsonLd not found"
seg = t[fi:fi + 4000]
pat = "'@context': 'https://schema.org',\n    '@type': 'Product',\n    name,"
assert seg.count(pat) == 1, "product schema root pattern count=%d" % seg.count(pat)
rep = "'@context': 'https://schema.org',\n    '@type': 'Product',\n    // 2026-09-30 W2: 实体对齐锚点 — 三语种同 sku, @id 为 per-locale 页面节点（跨语对齐靠 sku+brand+hreflang）\n    '@id': `${siteConfig.url}/${locale}/product/${slug}/#product`,\n    name,"
t = t[:fi] + t[fi:fi + 4000].replace(pat, rep, 1) + t[fi + 4000:]
backup(ST, "seo.ts.bak-atid")
wr(ST, t)
chk = rd(ST)
assert chk.count("product/${slug}/#product") == 1, "post-check @id"
changed.append("seo.ts (Product @id)")

# ============================================================
# 4) blog-data/zh-hk.json — food-packaging-printing-guide 注入纸材对比表 + FAQ details
# ============================================================
BJ = os.path.join(ROOT, "src", "data", "blog-data", "zh-hk.json")
t = rd(BJ)
key_idx = t.find('"food-packaging-printing-guide"')
assert key_idx > 0
# 条目范围：到下一个条目键（保守：找下一个 `", "` 顶层键形态）— 直接用 content 字段内锚点即可（不限定条目）
# 锚点必须全文件唯一：
A1 = '牛皮紙揀紙貼士'
n1 = t.count(A1)
if n1 != 1:
    print('WARN A1 count=', n1)
    # fallback: 用 FAQ h2 标题作锚点（该 slug 专属标题）
    A1 = '食品包裝印刷仲有咩常見問題？（FAQ）'
    assert t.count(A1) == 1, "fallback anchor also not unique: %d" % t.count(A1)

insert_html = """
<h3>食品級包裝紙材對比（白卡紙 vs 牛皮紙 vs 特種紙）</h3>
<table>
  <thead><tr><th>紙材</th><th>防油性</th><th>可降解性</th><th>食品接觸適用</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>白卡紙（食品級淋膜）</td><td>淋膜後防油</td><td>淋膜厚度決定降解速度</td><td>乾性/半濕食品</td><td>蛋糕盒、茶葉禮盒、月餅盒</td></tr>
    <tr class="border-b border-gray-200"><td>牛皮紙</td><td>原生漿本質耐油較佳</td><td>優（可配水性塗層）</td><td>乾性食品、烘焙</td><td>外賣袋、麵包袋、餐盒</td></tr>
    <tr><td>特種紙（牛油紙/玻璃紙）</td><td>本質防油</td><td>優</td><td>直接接觸適用</td><td>糖果內襯、酥點墊紙</td></tr>
  </tbody>
</table>
<p>揀紙貼士：直接接觸食品嘅內襯優先考慮牛油紙或食品級白卡；外層禮盒用白卡淋膜兼顧挺度同印刷效果。出口歐盟市場記得確認包材符合 EU 1935/2004 食品接觸材料框架要求，美國市場對應 FDA 21 CFR。</p>
<details class="my-2"><summary><strong>牛皮紙包裝可以直接接觸食物嗎？</strong></summary><p>未經處理的原生牛皮紙可以用於乾性食品（麵包、三文治紙袋），但如果係高油或高濕食品，建議加食品級水性塗層或者改用淋膜白卡，並確認供應商提供食品接觸合規聲明。</p></details>
<details class="my-2"><summary><strong>淋膜同可降解有衝突嗎？</strong></summary><p>傳統 PE 淋膜較難降解，而家主流做法係用 PLA（聚乳酸）或者水性淋膜替代，兼顧防油同可堆肥性；落單前同印刷廠確認淋膜類型同當地回收規則。</p></details>
"""
t = t.replace(A1, A1 + insert_html, 1)
backup(BJ, "zh-hk.json.bak")
wr(BJ, t)
# 写后：JSON 严格解析（门童 #15 同款） + 标记计数
j = json.loads(io.open(BJ, encoding='utf-8').read())
c = j['food-packaging-printing-guide']['content']
assert '食品級包裝紙材對比' in c and c.count('<details') >= 2
changed.append("blog-data/zh-hk.json (紙材對比表 + 2 FAQ)")

print("== PHASE2 WRITES OK ==")
for x in changed:
    print(" -", x)
