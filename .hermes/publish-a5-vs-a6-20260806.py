# -*- coding: utf-8 -*-
"""2026-08-06 daily SEO cron: publish a5-vs-a6-flyer-size (3 locale)"""
import json, os, re, sys

ROOT = r'F:\zprintpro-nextjs'
os.chdir(ROOT)

SLUG = 'a5-vs-a6-flyer-size'
DATE = '2026-08-06'
CAT = {'zh-hk': '傳單印刷', 'en': 'Flyer Printing', 'ja': 'チラシ印刷'}

TITLE = {
    'zh-hk': 'A5 定 A6 傳單？尺寸對照・用途揀法・印刷成本全攻略 | 智印港 ZprintPro',
    'en': 'A5 vs A6 Flyer Size: Dimensions, Use Cases & Print Cost Comparison | ZprintPro',
    'ja': 'A5 と A6 チラシのサイズ比較：寸法・用途・印刷コスト | ZprintPro',
}

DESC = {
    'zh-hk': 'A5（148×210mm）定 A6（105×148mm）傳單點揀？本文整理尺寸對照表（mm/cm/吋）、餐飲外賣・零售・展會派發場景建議、印刷成本差距同摺疊方案，附 4 條 FAQ，協助 50-10,000 張精準落單，3-5 個工作天交付。',
    'en': 'A5 vs A6 flyer size: exact dimensions in mm & inches, use cases for restaurants, retail and direct mail, cost gap, folding options, 4 FAQs, 50-10k piece runs.',
    'ja': 'A5 と A6 チラシのサイズを徹底比較。寸法（mm / インチ）早見表、飲食・小売・イベントでの用途別選び方、印刷コスト差と折り加工、よくある質問 4 件、50〜10,000 枚の小〜大ロット対応。',
}

CONTENT = {}
CONTENT['zh-hk'] = '''<p>A5 定 A6 傳單？香港餐飲外賣、零售派發、展會活動都要面對呢個選擇——傳單印得太大，派發成本高、浪費紙張；印得太細，資訊又放唔落。本文用 A5（148 × 210 mm）同 A6（105 × 148 mm）做完整對比：尺寸對照表、唔同場景揀法、紙材摺疊與印刷成本差距，附 4 條 FAQ，協助 50-10,000 張小至大批量精準落單。</p>
<div class="bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-4 my-4"><strong>關鍵數據：</strong>A6 面積只有 A5 嘅一半（A4 嘅四分之一），印刷費一般比 A5 平 20-30%；但 A5 三摺後係 DL 尺寸（99 × 210 mm），可免信封直接入郵筒，係直郵宣傳最常用嘅規格。</div>
<h3>一、A5 與 A6 標準尺寸對照表</h3>
<table class="w-full text-sm border-collapse my-6"><thead><tr class="bg-gray-100"><th class="border p-3 text-left">尺寸</th><th class="border p-3 text-left">毫米（mm）</th><th class="border p-3 text-left">厘米（cm）</th><th class="border p-3 text-left">英吋（in）</th><th class="border p-3 text-left">面積比例</th></tr></thead><tbody><tr><td class="border p-3"><strong>A5</strong></td><td class="border p-3">148 × 210</td><td class="border p-3">14.8 × 21.0</td><td class="border p-3">5.83 × 8.27</td><td class="border p-3">A4 嘅 1/2</td></tr><tr><td class="border p-3"><strong>A6</strong></td><td class="border p-3">105 × 148</td><td class="border p-3">10.5 × 14.8</td><td class="border p-3">4.13 × 5.83</td><td class="border p-3">A4 嘅 1/4</td></tr><tr><td class="border p-3"><strong>A5 三摺（DL）</strong></td><td class="border p-3">99 × 210</td><td class="border p-3">9.9 × 21.0</td><td class="border p-3">3.90 × 8.27</td><td class="border p-3">免信封入郵筒</td></tr></tbody></table>
<p>記憶方法：A 系列每大一級，面積加倍。A6 → A5 → A4 對應 1/4、1/2、1 張 A4；換句話講，兩張 A6 併埋就係一張 A5，兩張 A5 併埋就係一張 A4。</p>
<h3>二、唔同場景點樣揀：A5 定 A6？</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>餐飲外賣單張 / 外賣平台拉客</strong>：A5 為主，放得落餐牌精選 + 優惠碼 + 地址電話，枱面派發易吸引目光</li><li><strong>街頭派發（人手上身派）</strong>：A6 更輕更細，100 張一疊輕鬆攞得晒，成本低派得密</li><li><strong>直郵 / 入信箱</strong>：A5 三摺成 DL 尺寸免信封直入郵筒，閱讀體驗最好</li><li><strong>展會 / 講座枱面</strong>：A5 放枱面資訊量足，A6 適合做單張補充或紀念卡</li><li><strong>零售店收銀枱 / 貨架掛牌</strong>：A6 細細張啱尺寸，配合掛繩或支架展示</li></ul>
<h3>三、紙材、摺疊與印刷成本對比</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>紙材</strong>：常用 128g-200g 銅版紙（光面色彩鮮艷）或 100g-120g 書紙（輕身易派）；高級可選 250g 啞粉紙</li><li><strong>摺疊</strong>：A5 可三摺（DL 直郵）、對摺（四頁內容）；A6 可對摺變雙面卡片</li><li><strong>成本</strong>：A6 用紙量係 A5 一半，印刷費一般平 20-30%；但數量越大差距越細（上機費攤分後）</li><li><strong>後加工</strong>：過啞膠 / 光膠防水防污、圓角裁切、打孔掛繩，按派發場景選擇</li></ul>
<h3>四、訂製流程與交期</h3>
<ol class="list-decimal pl-5 my-3 space-y-1"><li>提供設計稿（PDF/X-1a，含 3mm 出血位）或使用免費設計服務</li><li>揀 A5 / A6、紙材、摺疊與數量，30 秒 AI 報價即時出單</li><li>數碼打樣確認色彩（RGB 螢幕與 CMYK 印刷色差需打樣確認）</li><li>生產：50-10,000 張小至大批量，常規 3-5 個工作天，急單可選即日印刷</li><li>順豐本地配送或 DHL 全球 2-4 天送達</li></ol>
<p>相關閱讀：<a href="/zh-hk/category/flyers/">傳單印刷類目</a> · <a href="/zh-hk/product/a5-flyers/">A5 傳單印刷</a> · <a href="/zh-hk/product/a4-flyers/">A4 傳單印刷</a> · <a href="/zh-hk/product/folded-leaflets/">摺頁傳單</a> · <a href="/zh-hk/blog/flyer-printing-guide/">傳單印刷完整指南</a></p>
<p><strong>Q: A5 同 A6 邊個大啲？實際尺寸係幾多？</strong><br/>A: A5（148 × 210 mm）比 A6（105 × 148 mm）大一倍面積。A5 約等於半張 A4，A6 約等於一張明信片大小。</p>
<p><strong>Q: 街頭派傳單應該揀 A5 定 A6？</strong><br/>A: 人手上身派發建議 A6——輕身細張，派發效率高；A5 適合枱面陳列、餐牌推介同直郵，資訊量多一倍。</p>
<p><strong>Q: A5 傳單可以直接入郵筒寄嗎？</strong><br/>A: 可以。A5 三摺後係 DL 尺寸（99 × 210 mm），免信封直接入郵筒，郵費低；如需雙面 4 頁內容，可揀 A5 對摺。</p>
<p><strong>Q: 傳單印刷最低數量同交期？</strong><br/>A: 智印港 50 張起印，數碼印刷適合 50-1,000 張急單（即日 / 24 小時選項），1,000 張以上轉柯式印刷，單張成本可降低 40% 以上，常規交期 3-5 個工作天。</p>
<p><strong>WhatsApp 即時報價</strong>：+86 181 2638 0255（香港時間 9:00-21:00）</p>'''

CONTENT['en'] = '''<p>Choosing between A5 and A6 flyer sizes is one of the first decisions in any print campaign — A5 (148 × 210 mm) gives you room for a full offer, while A6 (105 × 148 mm) keeps cost and weight down for hand-to-hand distribution. This guide compares exact dimensions in mm and inches, best use cases for restaurants, retail and direct mail, paper and folding options, plus real print cost differences — with 4 FAQs for buyers ordering 50-10,000 piece runs.</p>
<div class="bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-4 my-4"><strong>Key fact:</strong> A6 is exactly half the area of A5 (one quarter of A4). A5 tri-folded becomes DL size (99 × 210 mm) — mailable without an envelope; A6 is roughly a 4 × 6 in postcard. Expect A6 to run about 20-30% cheaper per piece than A5 on short runs.</div>
<h3>1. A5 vs A6 Standard Size Chart</h3>
<table class="w-full text-sm border-collapse my-6"><thead><tr class="bg-gray-100"><th class="border p-3 text-left">Size</th><th class="border p-3 text-left">mm</th><th class="border p-3 text-left">inches</th><th class="border p-3 text-left">US reference</th><th class="border p-3 text-left">Area ratio</th></tr></thead><tbody><tr><td class="border p-3"><strong>A5</strong></td><td class="border p-3">148 × 210</td><td class="border p-3">5.83 × 8.27</td><td class="border p-3">~half letter (5.5 × 8.5)</td><td class="border p-3">1/2 of A4</td></tr><tr><td class="border p-3"><strong>A6</strong></td><td class="border p-3">105 × 148</td><td class="border p-3">4.13 × 5.83</td><td class="border p-3">~4 × 6 in postcard</td><td class="border p-3">1/4 of A4</td></tr><tr><td class="border p-3"><strong>A5 tri-fold (DL)</strong></td><td class="border p-3">99 × 210</td><td class="border p-3">3.90 × 8.27</td><td class="border p-3">fits #10 envelope</td><td class="border p-3">mailable</td></tr></tbody></table>
<p>Rule of thumb: every A-series step up doubles the area — two A6 sheets equal one A5, and two A5 sheets equal one A4. A5 also pairs with US half-letter rack sizes, while A6 matches common postcard slots.</p>
<h3>2. Choosing by Use Case</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>Restaurant / takeout menus</strong>: A5 fits a menu highlight + promo code + address in one glance; great for countertop and table display</li><li><strong>Street handouts</strong>: A6 is lighter and smaller — 100 sheets in one hand, cheaper to print, faster to distribute</li><li><strong>Direct mail / mailbox drops</strong>: A5 tri-folded to DL slips into mailboxes without an envelope, best reading experience</li><li><strong>Trade shows / seminars</strong>: A5 on tables carries full details; A6 works as a follow-up card or handout supplement</li><li><strong>Retail counters / shelf tags</strong>: A6 fits tight display spots with a hanger or stand</li></ul>
<h3>3. Paper, Folding & Print Cost Comparison</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>Paper</strong>: 128-200 gsm art paper (gloss for vivid color) or 100-120 gsm offset for light handouts; 250 gsm silk for premium feel</li><li><strong>Folding</strong>: A5 tri-fold to DL for direct mail or half-fold for a 4-page leaflet; A6 half-fold becomes a double-sided card</li><li><strong>Cost</strong>: A6 uses half the paper of A5 — typically 20-30% cheaper per piece; the gap narrows on larger runs as setup costs amortize</li><li><strong>Finishing</strong>: matte/gloss lamination, rounded corners, grommet holes for hanging</li></ul>
<h3>4. Ordering Process & Turnaround</h3>
<ol class="list-decimal pl-5 my-3 space-y-1"><li>Submit print-ready PDF/X-1a with 3 mm bleed, or use free design service</li><li>Pick A5 or A6, paper, folding and quantity — 30-second AI quote</li><li>Digital proof to confirm color (RGB screen vs CMYK print)</li><li>Production: 50-10,000 piece runs, standard 3-5 business days, same-day option for rush orders</li><li>Free Shipping over $99 USA; DHL Express 2-4 days worldwide from Asia factory</li></ol>
<p>Related: <a href="/en/category/flyers/">Flyer Printing Category</a> · <a href="/en/product/a5-flyers/">A5 Flyers</a> · <a href="/en/product/a4-flyers/">A4 Flyers</a> · <a href="/en/product/folded-leaflets/">Folded Leaflets</a> · <a href="/en/blog/flyer-printing-guide/">Complete Flyer Printing Guide</a></p>
<p><strong>Q: Which is bigger — A5 or A6?</strong><br/>A: A5 (148 × 210 mm / 5.83 × 8.27 in) is twice the area of A6 (105 × 148 mm / 4.13 × 5.83 in). A5 is roughly half-letter size; A6 is close to a 4 × 6 in postcard.</p>
<p><strong>Q: Should I hand out A5 or A6 flyers on the street?</strong><br/>A: For hand-to-hand distribution, A6 wins — lighter, smaller and cheaper, so you can print and distribute more. Use A5 when the message needs room: countertop displays, menus and direct mail.</p>
<p><strong>Q: Can A5 flyers be mailed without an envelope?</strong><br/>A: Yes. A5 tri-folded becomes DL size (99 × 210 mm), which fits standard mail slots and #10 envelopes — no envelope needed, lower postage. For a 4-page leaflet, half-fold A5 instead.</p>
<p><strong>Q: What are the minimum order and turnaround for flyers?</strong><br/>A: ZprintPro starts at 50 pieces. Digital printing suits 50-1,000 piece rush jobs (same-day / 24-hour options); 1,000+ pieces switch to offset for 40%+ lower unit cost. Standard turnaround is 3-5 business days with Free Shipping over $99 USA.</p>
<p><strong>WhatsApp instant quote</strong>: +86 181 2638 0255</p>'''

CONTENT['ja'] = '''<p>A5 と A6 チラシのサイズ選びに迷っていませんか？A5（148 × 210 mm）は情報量が多く、A6（105 × 148 mm）は軽くて安い——飲食テイクアウト、街頭配布、ダイレクトメールでどちらを選ぶべきか。本ガイドでは正確な寸法（mm / インチ）、用途別の選び方、用紙・折り加工・印刷コストの比較を解説し、発注前の FAQ 4 件も収録。50〜10,000 枚の小〜大ロットに対応します。</p>
<div class="bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-4 my-4"><strong>重要な事実：</strong>A6 は A5 のちょうど半分の面積（A4 の 4 分の 1）。A5 を三つ折りにすると DL サイズ（99 × 210 mm）になり、封筒なしで郵便受けに投函可能。短納期ロットでは A6 の単価が A5 より約 20〜30% 安くなります。</div>
<h3>1. A5 と A6 の標準サイズ早見表</h3>
<table class="w-full text-sm border-collapse my-6"><thead><tr class="bg-gray-100"><th class="border p-3 text-left">サイズ</th><th class="border p-3 text-left">mm</th><th class="border p-3 text-left">インチ</th><th class="border p-3 text-left">参考</th><th class="border p-3 text-left">面積比</th></tr></thead><tbody><tr><td class="border p-3"><strong>A5</strong></td><td class="border p-3">148 × 210</td><td class="border p-3">5.83 × 8.27</td><td class="border p-3">B5 よりひと回り小さい</td><td class="border p-3">A4 の 1/2</td></tr><tr><td class="border p-3"><strong>A6</strong></td><td class="border p-3">105 × 148</td><td class="border p-3">4.13 × 5.83</td><td class="border p-3">ハガキサイズに近い</td><td class="border p-3">A4 の 1/4</td></tr><tr><td class="border p-3"><strong>A5 三つ折り（DL）</strong></td><td class="border p-3">99 × 210</td><td class="border p-3">3.90 × 8.27</td><td class="border p-3">長形 3 号封筒に収まる</td><td class="border p-3">郵便投函可</td></tr></tbody></table>
<p>覚え方：A シリーズは 1 つ上がるごとに面積 2 倍。A6 2 枚で A5、A5 2 枚で A4 になります。日本のチラシ定番は A4・B5・A5、A6 はカード・メニュー表・短冊チラシ向けです。</p>
<h3>2. 用途別の選び方：A5 か A6 か</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>飲食テイクアウト / デリバリー集客</strong>：A5 が主力——メニュー厳選・クーポンコード・住所電話を 1 枚に収め、テーブルやカウンターに置きやすい</li><li><strong>街頭配布</strong>：A6 は軽くて小さく、100 枚でも片手で持て、単価が安いので多く配れる</li><li><strong>ダイレクトメール / ポスティング</strong>：A5 三つ折りで DL サイズ、封筒なしで郵便受けに投函でき読みやすい</li><li><strong>展示会・セミナー</strong>：A5 はテーブルで詳細を伝え、A6 は記念カードや補助資料に</li><li><strong>小売カウンター / 棚札</strong>：A6 は狭いスペースにも収まり、紐通しやスタンドに対応</li></ul>
<h3>3. 用紙・折り加工・印刷コスト比較</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>用紙</strong>：コート紙 128〜200 gsm（グロスは発色良好）または上質紙 100〜120 gsm（軽くて配布向き）、高級感ならマット紙 250 gsm</li><li><strong>折り加工</strong>：A5 は三つ折り（DL 郵送用）または二つ折り（4 ページ）、A6 は二つ折りで両面カードに</li><li><strong>コスト</strong>：A6 は A5 の半分の紙量、短納期ロットでは単価が約 20〜30% 安い。数量が増えるとセットアップ費の分散で差は縮まります</li><li><strong>後加工</strong>：マット / グロスラミネート、角丸加工、吊り下げ用ハトメ穴</li></ul>
<h3>4. 発注フローと納期</h3>
<ol class="list-decimal pl-5 my-3 space-y-1"><li>入稿データ（PDF/X-1a、3 mm 塗り足し）を用意、または無料デザインサービスを利用</li><li>A5 / A6・用紙・折り・数量を選び、30 秒 AI 見積もりで即時発注</li><li>デジタル校正で色を確認（RGB モニターと CMYK 印刷の差）</li><li>生産：50〜10,000 枚小〜大ロット、標準 3〜5 営業日、急ぎは即日対応オプション</li><li>日本全国配送（ヤマト運輸・佐川急便）、DHL 国際配送 2〜4 日</li></ol>
<p>関連リンク：<a href="/ja/category/flyers/">チラシ印刷カテゴリ</a> · <a href="/ja/product/a5-flyers/">A5 チラシ印刷</a> · <a href="/ja/product/a4-flyers/">A4 チラシ印刷</a> · <a href="/ja/product/folded-leaflets/">折りパンフレット</a> · <a href="/ja/blog/flyer-printing-guide/">チラシ印刷完全ガイド</a></p>
<p><strong>Q: A5 と A6 はどちらが大きい？正確な寸法は？</strong><br/>A: A5（148 × 210 mm / 5.83 × 8.27 インチ）は A6（105 × 148 mm / 4.13 × 5.83 インチ）の 2 倍の面積です。A5 は B5 よりひと回り小さく、A6 はハガキサイズに近い寸法です。</p>
<p><strong>Q: 街頭配布には A5 と A6 どちらを選ぶ？</strong><br/>A: 手渡し配布なら A6 が最適——軽くて小さく安いので多く配れます。情報量が必要なカウンター展示・メニュー・DM には A5 を選んでください。</p>
<p><strong>Q: A5 チラシは封筒なしで郵送できますか？</strong><br/>A: できます。A5 三つ折りで DL サイズ（99 × 210 mm）になり、長形 3 号封筒や郵便受けに収まります。4 ページのパンフレットにするなら A5 二つ折りです。</p>
<p><strong>Q: チラシの最小ロットと納期は？</strong><br/>A: 50 枚から受注可能。デジタル印刷は 50〜1,000 枚の急ぎ小ロット向け（即日 / 24 時間オプション）、1,000 枚以上はオフセット印刷で単価 40% 以上ダウン。標準納期 3〜5 営業日です。</p>
<p><strong>WhatsApp 即時見積もり</strong>：+86 181 2638 0255</p>'''

# ---------- 1. blog-posts.ts: meta const + array ----------
bp_path = os.path.join('src', 'data', 'blog-posts.ts')
bp = open(bp_path, encoding='utf-8').read()
assert bp.count('  lpPosterSizeGuide,\n];') == 1, 'array anchor not unique'

meta_block = '''const lpA5VsA6FlyerSize: BlogPostMeta = {
  slug: 'a5-vs-a6-flyer-size',
  categoryKey: 'flyers',
  source: 'daily',
  date: '2026-08-06',
  title: {
    'zh-hk': 'A5 定 A6 傳單？尺寸對照・用途揀法・印刷成本全攻略 | 智印港 ZprintPro',
    en: 'A5 vs A6 Flyer Size: Dimensions, Use Cases & Print Cost Comparison | ZprintPro',
    ja: 'A5 と A6 チラシのサイズ比較：寸法・用途・印刷コスト | ZprintPro',
  },
  excerpt: {
    'zh-hk': 'A5（148×210mm）定 A6（105×148mm）傳單點揀？本文整理尺寸對照表（mm/cm/吋）、餐飲外賣・零售・展會派發場景建議、印刷成本差距同摺疊方案，附 4 條 FAQ，協助 50-10,000 張精準落單，3-5 個工作天交付。',
    en: 'A5 vs A6 flyer size: exact dimensions in mm & inches, use cases for restaurants, retail and direct mail, cost gap, folding options, 4 FAQs, 50-10k piece runs.',
    ja: 'A5 と A6 チラシのサイズを徹底比較。寸法（mm / インチ）早見表、飲食・小売・イベントでの用途別選び方、印刷コスト差と折り加工、よくある質問 4 件、50〜10,000 枚の小〜大ロット対応。',
  },
};
'''

# insert const after lpPosterSizeGuide block (anchor: its ja excerpt line + closing)
anchor_ja = "ja: 'A1・A2・A3 ポスターサイズを徹底比較。寸法（mm / cm / インチ）早見表、小売・展示会・屋外での用途別選び方、用紙と防水加工の選び方、よくある質問 4 件、10-1,000 枚小〜大ロット、3-5 営業日生産。',\n  },\n};"
assert bp.count(anchor_ja) == 1, 'lpPosterSizeGuide end anchor not unique'
bp = bp.replace(anchor_ja, anchor_ja + '\n' + meta_block, 1)

# array entry
bp = bp.replace('  lpPosterSizeGuide,\n];', '  lpPosterSizeGuide,\n  lpA5VsA6FlyerSize,\n];', 1)
open(bp_path, 'w', encoding='utf-8', newline='\n').write(bp)
print('blog-posts.ts updated, size', len(bp))

# ---------- 2. blog-data JSON ----------
for loc in ['zh-hk', 'en', 'ja']:
    jp = os.path.join('src', 'data', 'blog-data', loc + '.json')
    j = json.load(open(jp, encoding='utf-8'))
    assert SLUG not in j, 'slug already in ' + loc
    j[SLUG] = {
        'slug': SLUG,
        'title': TITLE[loc],
        'description': DESC[loc],
        'date': DATE,
        'category': CAT[loc],
        'content': CONTENT[loc],
    }
    open(jp, 'w', encoding='utf-8', newline='\n').write(json.dumps(j, ensure_ascii=False, indent=2) + '\n')
    print(loc, 'json updated, keys:', len(j))

# ---------- 3. page.tsx: 3 locale posts entries + articleSlugs ----------
pt_path = os.path.join('src', 'app', '[locale]', 'blog', '[slug]', 'page.tsx')
pt = open(pt_path, encoding='utf-8').read()

markers = {
    'zh-hk': "description: 'A1 / A2 / A3 海報尺寸點樣揀？",
    'en': "description: 'A1, A2 and A3 poster sizes compared",
    'ja': "description: 'A1・A2・A3 ポスターサイズを徹底比較",
}
for loc, marker in markers.items():
    idx = pt.find(marker)
    assert idx != -1, 'marker missing for ' + loc
    close = pt.find('    },\n', idx)
    assert close != -1, 'entry close missing for ' + loc
    entry = ("    'a5-vs-a6-flyer-size': {\n"
             "      title: '" + TITLE[loc] + "',\n"
             "      description: '" + DESC[loc] + "',\n"
             "      date: '2026-08-06', category: '" + CAT[loc] + "',\n"
             "      content: '',\n"
             "    },\n")
    pt = pt[:close + len('    },\n')] + entry + pt[close + len('    },\n'):]
    print(loc, 'entry inserted')

# articleSlugs
assert pt.count("  'poster-size-guide',\n];") == 1, 'articleSlugs anchor not unique'
pt = pt.replace("  'poster-size-guide',\n];",
                "  'poster-size-guide',\n  'a5-vs-a6-flyer-size', // 2026-08-06 v8 daily: A5 vs A6 傳單尺寸\n];", 1)
open(pt_path, 'w', encoding='utf-8', newline='\n').write(pt)
print('page.tsx updated, size', len(pt))

# ---------- 4. verify counts ----------
final_bp = open(bp_path, encoding='utf-8').read()
final_pt = open(pt_path, encoding='utf-8').read()
print('blog-posts.ts slug count:', final_bp.count("slug: 'a5-vs-a6-flyer-size'"))
print('page.tsx slug count:', final_pt.count("'a5-vs-a6-flyer-size'"))
print('page.tsx articleSlugs count:', final_pt.count("  'a5-vs-a6-flyer-size', // 2026-08-06"))
for loc in ['zh-hk', 'en', 'ja']:
    j = json.load(open(os.path.join('src', 'data', 'blog-data', loc + '.json'), encoding='utf-8'))
    c = j[SLUG]['content']
    faq = c.count('<strong>Q:')
    links = c.count('<a href=')
    print(loc, 'content chars:', len(c), '| FAQ:', faq, '| links:', links)
print('DONE')
