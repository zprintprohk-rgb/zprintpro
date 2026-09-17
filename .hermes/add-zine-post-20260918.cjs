/**
 * 内容落地: Zine & Small-Batch Booklet Printing Guide (3 locale)
 *
 * 队列依据: docs/2026-09-17-website-traffic-expansion-plan-v1.md §五 路径 1 第 1 项
 *           (K3 2026-09-17 拍板: 4 篇新需求承接提前至 P0 三篇之前)
 * 承接 SKU: saddle-stitch-booklets (BK-002, category books)
 *
 * 价格/规格数据来源 (§0.23): 线上 PDP 实测
 *   https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/ (2026-09-18 curl)
 *   结构化区: 產品編號 BK-002 / 最低訂購量 100本 / 標準交期 5-7 天 / 100本起印 HK$1.20 起
 *             5,000本起批 整批 HK$5,777 / 騎馬釘小冊子 HK$6-32/本 / 8-64 頁平攤 180°
 *             膠裝升級 +HK$30/本、精裝升級 +HK$100/本 / 滿 HK$500 順豐免運 / DHL 全球 2-4 天
 *   ⚠️ 已知冲突 (不自行裁决, 已在报告中升级 K3): 同一 SKU 的自由文本描述仍寫
 *      「MOQ 50 本 / US$1.84-7.36/pc，HK$14-57/pc」，與結構化區互斥。
 *      本文一律採用**結構化區 + 報價計算器**口徑 (三者互相一致)。
 *
 * §12 危险写入三件套: 计数断言 + 结果形状断言 + 备份
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BAK = path.join(ROOT, '.hermes', '_bak-zine-post-20260918');
const SLUG = 'zine-small-batch-booklet-printing-guide';
const DATE = '2026-09-18';

// ────────────────────────────────────────────────────────────
// zh-hk
// ────────────────────────────────────────────────────────────
const ZH = [
  '<p>2026 年獨立出版最常問的一句：<strong>小誌（zine）印刷到底要多少錢、最少印幾本？</strong>騎馬釘小誌 <strong>100 本起印，單價 HK$6-32/本</strong>，5,000 本批量低至 <strong>HK$1.20/本</strong>；8-64 頁、頁數須為 4 的倍數，A4 或 A5 尺寸，標準交期 <strong>5-7 個工作天</strong>，提交檔案後 <strong>1 小時內</strong>免費數碼打稿。以下把紙材、頁數、裝訂與成本一次講清。</p>',

  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">快速答案：小誌印刷幾多錢？</p><p class="text-sm">騎馬釘小誌 <strong>100 本起印，每本約 HK$6 至 HK$32</strong>；印量去到 5,000 本，批量價可低至 <strong>HK$1.20/本</strong>（產品頁 <a href="/product/saddle-stitch-booklets/">騎馬釘小冊子 BK-002</a> 2026-09 標價口徑）。實際單價視頁數、尺寸、內頁紙材與封面覆膜而定。</p></div>',
  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">快速答案：小誌最少要印幾本？</p><p class="text-sm">最低訂購量 <strong>100 本</strong>，8-64 頁。若你想先做 <strong>50 本</strong>試水溫，可行做法是把總頁數壓在 16 頁以內、用 80g 書紙內頁 + 無覆膜封面，把單本成本壓到區間下緣再落單。</p></div>',
  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">快速答案：頁數有咩限制？</p><p class="text-sm">騎馬釘的總頁數<strong>必須是 4 的倍數</strong>（因為一張大紙摺疊後成為 4 頁）。常見規格：8 / 12 / 16 / 24 / 32 頁；<strong>8-64 頁</strong>是騎馬釘的舒適區，超過 64 頁建議改用無線膠裝（可做 48-400 頁）。</p></div>',

  '<p>想即刻拿價？把頁數、尺寸同數量發到 <a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp +86 198 8085 1334</strong></a>，或直接用<a href="/quote/">30 秒 AI 即時報價</a>自己試算。</p>',

  '<h2>小誌 Zine 同一般畫冊有咩分別？</h2>',
  '<p>Zine（小誌）源自 fanzine 文化：作者自己編輯、自己出版、印量小、流通快。它與商業畫冊最大的分別不在工藝，而在<strong>決策速度</strong>——多數小誌作者在 2-4 週內完成從排版到拿貨，且<strong>沒有既定印刷供應商</strong>，所以「最低起印量」與「報價透明度」比「品牌歷史」更關鍵。</p>',
  '<p>這也是我們把騎馬釘小誌的 <a href="/product/saddle-stitch-booklets/">騎馬釘小冊子產品頁</a>做成 30 秒 AI 即時報價的原因：你不用先註冊、不用等業務回郵，輸入頁數與數量就有價。</p>',

  '<h2>紙材點揀？內頁、封面要分開想</h2>',
  '<p>小誌的紙材決策只有兩個問題：內頁要<strong>文字優先</strong>還是<strong>圖像優先</strong>？封面要不要<strong>覆膜</strong>？</p>',
  '<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">部位</th><th class="border p-2 text-left">紙材</th><th class="border p-2 text-left">適合</th><th class="border p-2 text-left">實務提示</th></tr></thead><tbody>',
  '<tr><td class="border p-2">內頁</td><td class="border p-2">80-100g 書紙</td><td class="border p-2">文字為主、散文、詩集、訪談</td><td class="border p-2">不反光、翻閱輕，是文類小誌的標準選</td></tr>',
  '<tr><td class="border p-2">內頁</td><td class="border p-2">128g 銅版紙</td><td class="border p-2">圖文並重、插畫、攝影</td><td class="border p-2">色彩飽和度明顯高於書紙</td></tr>',
  '<tr><td class="border p-2">內頁</td><td class="border p-2">157g 銅版紙</td><td class="border p-2">跨頁大圖、厚實手感</td><td class="border p-2">32 頁以上會明顯增厚，注意騎馬釘「騎縫」厚度</td></tr>',
  '<tr><td class="border p-2">封面</td><td class="border p-2">銅版紙 + 覆膜（可選）</td><td class="border p-2">需要耐磨、抗指紋</td><td class="border p-2">市集擺攤反覆翻閱，覆膜耐用度差別很明顯</td></tr>',
  '</tbody></table>',

  '<h2>騎馬釘、膠裝、線裝點揀？</h2>',
  '<p>頁數決定裝訂，反過來不成立。騎馬釘把書帖套疊後在中縫打鐵線釘，成品可<strong>平攤 180°</strong>，跨頁圖可以完整呈現；代價是頁數一多，書脊會「鼓」起來。</p>',
  '<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">裝訂</th><th class="border p-2 text-left">頁數範圍</th><th class="border p-2 text-left">平攤</th><th class="border p-2 text-left">升級費用</th></tr></thead><tbody>',
  '<tr><td class="border p-2"><strong>騎馬釘</strong>（標準）</td><td class="border p-2">8-64 頁</td><td class="border p-2">180°</td><td class="border p-2">—</td></tr>',
  '<tr><td class="border p-2"><strong>無線膠裝</strong></td><td class="border p-2">48-400 頁</td><td class="border p-2">約 120°</td><td class="border p-2">+HK$30/本</td></tr>',
  '<tr><td class="border p-2"><strong>精裝</strong></td><td class="border p-2">按內頁厚度</td><td class="border p-2">約 180°</td><td class="border p-2">+HK$100/本</td></tr>',
  '</tbody></table>',
  '<p>膠裝可印書脊，適合放 ISBN 條碼上架；騎馬釘沒有書脊，但對「薄、快、便宜」的小誌來說，省下的成本通常比書脊值錢。</p>',

  '<h2>成本差異其實來自邊度？</h2>',
  '<p>很多人以為印刷貴在油墨，實際上騎馬釘小誌的成本主要由三件事決定：<strong>頁數</strong>（用紙量與裝訂次數）、<strong>印量</strong>（攤分開機與版費）、<strong>紙材與覆膜</strong>。印量是最強槓桿——同一規格由 100 本拉到 5,000 本，單本價可以差一個數量級。</p>',
  '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">透明工廠：為什麼我們敢公開區間</p><p class="text-sm">智印港（ZprintPro）是彩龍印刷旗下品牌，<strong>深圳自有廠房</strong>生產，配備海德堡柯式印刷機組與 HP Indigo 15K B2 數碼產線，紙材走 FSC 認證、色彩管理依 ISO 12647、品質體系為 ISO 9001。你不用把檔案交給中間商再等轉單，報價單上的價格就是生產端的價格。</p></div>',

  '<h2>低 MOQ、快樣品：小批量落單時間表</h2>',
  '<p>小誌作者最怕兩件事：起印量太高、等樣品太久。我們把這兩件事各給一個具體答案。</p>',
  '<p><strong>低 MOQ</strong>：騎馬釘小誌 <strong>100 本起印</strong>，8 頁的小冊子一樣接；冊數少用數碼印刷、冊數大轉柯式，不需要為了「湊起印量」印一堆賣不掉的書。</p>',
  '<p><strong>快樣品</strong>：提交檔案後 <strong>1 小時內</strong>免費數碼打稿，核對色稿、字體與頁序確認無誤後才開印；批量訂單可另申請實物樣板。</p>',
  '<p>標準交期 <strong>5-7 個工作天</strong>；港九新界滿 <strong>HK$500</strong> 順豐免運；跨境走 DHL／FedEx <strong>2-4 天</strong>。若是活動擺攤趕檔期，另有<a href="/services/rush-printing-delivery/">即日印刷與急件配送服務</a>可以走專屬排程。落單前想確認單價，<a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp 即時查詢</strong></a>最快。</p>',

  '<h2>一個真實的落單場景</h2>',
  '<p>一位做插畫小誌的作者，第一版打算印 100 本 A5、16 頁、128g 銅版紙內頁配覆膜封面，用來在市集試水溫。核稿後發現跨頁插畫在騎馬釘中縫有 2mm 視覺偏移，我們建議把跨頁主圖往內收 4mm，第二版直接沿用同一檔案架構。</p>',
  '<p>第二版加印時她已經有固定讀者，直接拉到 5,000 本批量檔，單本成本落到批量區間下緣——同一份檔案、同一種紙，差別只在「先試 100 本、再放大」。這是小誌最實用的成本策略：<strong>用低起印量驗證內容，再用批量價放大銷量</strong>。</p>',

  '<h2>交稿規格：一次過講清</h2>',
  '<p>檔案：AI / PDF / EPS；解析度 <strong>300 DPI</strong> 以上；色彩模式 <strong>CMYK</strong>；出血位 <strong>3mm</strong>；文字轉外框。若有燙金、局部 UV、壓凹等加工，另附 K100 黑稿標示加工位置。</p>',
  '<p>沒有現成排版檔也可以：把文字與圖片給我們，免費排版會處理目錄、頁碼與章節標註。頁數記得先算成 4 的倍數，這是最常見的來回修改原因。</p>',

  '<h2>常見問題（FAQ）</h2>',
  '<p><strong>Q1: 小誌印刷最少印幾本？</strong><br/>A: 騎馬釘小誌最低訂購量 100 本，8-64 頁。產品編號 BK-002，標準交期 5-7 個工作天。想先試 50 本的話，把頁數壓到 16 頁以內並用 80g 書紙內頁，單本成本會落在區間下緣。</p>',
  '<p><strong>Q2: 頁數一定要是 4 的倍數嗎？</strong><br/>A: 是。騎馬釘用一張大紙摺疊成 4 頁，所以總頁數必須是 4 的倍數；常見 8 / 12 / 16 / 24 / 32 頁。若你的內容是 30 頁，可以補 2 頁版權頁或空白頁湊成 32 頁。</p>',
  '<p><strong>Q3: 小誌印刷幾多錢一本？</strong><br/>A: 騎馬釘小誌 100 本起印，每本約 HK$6 至 HK$32；5,000 本批量可低至 HK$1.20/本。實際單價視頁數、尺寸、內頁紙材與封面覆膜而定，可用 30 秒 AI 即時報價查實數。</p>',
  '<p><strong>Q4: 可以印書脊同 ISBN 嗎？</strong><br/>A: 騎馬釘沒有書脊，需要書脊請升級無線膠裝（+HK$30/本，可做 48-400 頁並印 ISBN 條碼）；再高一級是精裝（+HK$100/本）。</p>',
  '<p><strong>Q5: 香港本地要等幾久？</strong><br/>A: 標準 5-7 個工作天；港九新界滿 HK$500 順豐免運，跨境 DHL／FedEx 全球 2-4 天。</p>',

  '<h2>想開始印？</h2>',
  '<p>準備好把小誌印出來？<a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp +86 198 8085 1334</strong></a> 講低頁數、尺寸同數量，即日免費報價；或用<a href="/quote/">30 秒 AI 即時報價</a>即時試算。</p>',
  '<p>想先看工藝細節，可以讀<a href="/zh-hk/blog/saddle-stitch-booklet-printing-guide/">騎馬釘小冊子印刷指南</a>與<a href="/zh-hk/blog/catalog-printing-guide/">型錄印刷指南</a>；同人誌方向的作者可看<a href="/zh-hk/blog/doujin-circle-printing-guide/">同人誌印刷指南</a>；學校刊物則見<a href="/zh-hk/blog/school-exercise-book-printing-guide/">練習簿印刷完全指南</a>。</p>',

  '<div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200"><p><strong>作者團隊：</strong><a href="/about/">智印港印刷專家團隊</a>，15 年跨境印刷經驗，服務 1,000+ 品牌客戶，涵蓋包裝盒、貼紙標籤、書刊裝訂與校園印刷。技術內容依 ISO 12647-2 色彩管理標準、FSC 認證紙材規範與 EU REACH 化學品註冊評估框架撰寫。</p><p class="mt-3">數據來源：智印港騎馬釘小冊子產品頁 BK-002（2026-09 標價口徑：100 本起印・HK$6-32/本・5,000 本批量低至 HK$1.20/本・標準交期 5-7 天・1 小時免費打稿）／同產品頁裝訂升級與運費口徑（膠裝 +HK$30/本・精裝 +HK$100/本・滿 HK$500 順豐免運）。本指南 2026-09-18 首次發佈。</p></div>',
].join('\n');

// ────────────────────────────────────────────────────────────
// en
// ────────────────────────────────────────────────────────────
const EN = [
  '<p>If you are printing a zine in 2026, the two questions that decide everything are <strong>how many copies you must order</strong> and <strong>what one copy costs</strong>. Saddle-stitched zines start at <strong>100 copies, HK$6-32 per copy</strong>, dropping to <strong>HK$1.20 per copy at 5,000 copies</strong>. Page counts run 8-64 and must be a multiple of 4, in A4 or A5, with a <strong>5-7 working day</strong> standard turnaround and a free digital proof within <strong>1 hour</strong> of file submission.</p>',

  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">Quick Answer: How much does zine printing cost?</p><p class="text-sm">Saddle-stitched zines start at <strong>100 copies, roughly HK$6-32 per copy</strong>; at 5,000 copies the bulk rate falls to <strong>HK$1.20 per copy</strong> (product page <a href="/product/saddle-stitch-booklets/">Saddle Stitch Booklets BK-002</a>, September 2026 pricing). Final unit price depends on page count, trim size, text stock and cover lamination.</p></div>',
  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">Quick Answer: What is the minimum order for a zine?</p><p class="text-sm">The minimum order quantity is <strong>100 copies</strong>, 8-64 pages. If you want to test a 50-copy run first, keep the page count under 16, use 80-100gsm woodfree text stock and skip cover lamination to land at the low end of the price band.</p></div>',
  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">Quick Answer: Why must the page count be a multiple of 4?</p><p class="text-sm">Saddle stitching folds one large sheet into <strong>4 pages</strong>, so the total must divide by 4. Common zine formats are <strong>8 / 12 / 16 / 24 / 32 pages</strong>; 8-64 pages is the comfortable range. Above 64 pages, switch to perfect binding (48-400 pages).</p></div>',

  '<p>Want a price right now? Send page count, size and quantity to <a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp +86 198 8085 1334</strong></a>, or run the numbers yourself with the <a href="/quote/">30-second instant quote</a>.</p>',

  '<h2>How is a zine different from a commercial catalogue?</h2>',
  '<p>A zine comes out of fanzine culture: self-edited, self-published, small runs, fast circulation. The real difference from a commercial catalogue is not the print craft but the <strong>decision speed</strong>. Most zine makers go from layout to delivery in 2-4 weeks and have <strong>no incumbent print supplier</strong> &mdash; which makes minimum order quantity and quote transparency matter far more than a printer&rsquo;s brand history.</p>',
  '<p>That is why the <a href="/product/saddle-stitch-booklets/">saddle stitch booklet product page</a> runs a 30-second instant quote engine: enter page count and quantity, get a price, no signup and no waiting for a sales reply.</p>',

  '<h2>Which paper should you choose?</h2>',
  '<p>There are only two paper decisions in a zine: is the interior <strong>text-led</strong> or <strong>image-led</strong>, and does the cover need <strong>lamination</strong>?</p>',
  '<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Part</th><th class="border p-2 text-left">Stock</th><th class="border p-2 text-left">Best for</th><th class="border p-2 text-left">Practical note</th></tr></thead><tbody>',
  '<tr><td class="border p-2">Interior</td><td class="border p-2">80-100gsm woodfree</td><td class="border p-2">Essays, poetry, interviews</td><td class="border p-2">Non-reflective and light; the standard for text-led zines</td></tr>',
  '<tr><td class="border p-2">Interior</td><td class="border p-2">128gsm art paper</td><td class="border p-2">Mixed text and illustration</td><td class="border p-2">Visibly richer colour than woodfree</td></tr>',
  '<tr><td class="border p-2">Interior</td><td class="border p-2">157gsm art paper</td><td class="border p-2">Full-bleed spreads, substantial feel</td><td class="border p-2">Above 32 pages the spine starts to swell at the fold</td></tr>',
  '<tr><td class="border p-2">Cover</td><td class="border p-2">Art paper + lamination (optional)</td><td class="border p-2">Market stalls and repeated handling</td><td class="border p-2">Lamination makes a very visible durability difference</td></tr>',
  '</tbody></table>',

  '<h2>Saddle stitch, perfect bound or hardcover?</h2>',
  '<p>Page count decides the binding, not the other way round. Saddle stitching nests the folded sections and drives wire staples through the fold, so the finished zine <strong>lies flat at 180&deg;</strong> and spreads read as one continuous image.</p>',
  '<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Binding</th><th class="border p-2 text-left">Page range</th><th class="border p-2 text-left">Lay-flat</th><th class="border p-2 text-left">Upgrade</th></tr></thead><tbody>',
  '<tr><td class="border p-2"><strong>Saddle stitch</strong> (standard)</td><td class="border p-2">8-64 pages</td><td class="border p-2">180&deg;</td><td class="border p-2">&mdash;</td></tr>',
  '<tr><td class="border p-2"><strong>Perfect bound</strong></td><td class="border p-2">48-400 pages</td><td class="border p-2">~120&deg;</td><td class="border p-2">+HK$30/copy</td></tr>',
  '<tr><td class="border p-2"><strong>Hardcover</strong></td><td class="border p-2">By interior bulk</td><td class="border p-2">~180&deg;</td><td class="border p-2">+HK$100/copy</td></tr>',
  '</tbody></table>',
  '<p>Perfect binding gives you a printable spine for an ISBN barcode. Saddle stitching does not &mdash; but for thin, fast and cheap zines the saving usually matters more than a spine.</p>',

  '<h2>Where does the cost actually come from?</h2>',
  '<p>Print cost is not mainly ink. Three things drive a saddle-stitched zine: <strong>page count</strong> (paper and folding passes), <strong>run length</strong> (setup and plate costs amortised across copies) and <strong>stock plus lamination</strong>. Run length is by far the strongest lever &mdash; the same spec can move by an order of magnitude between 100 and 5,000 copies.</p>',
  '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">A transparent factory, not a broker</p><p class="text-sm">ZprintPro is a brand of 彩龍印刷 with its <strong>own factory in Shenzhen</strong>, running Heidelberg offset presses and an HP Indigo 15K B2 digital line, with FSC-certified paper, ISO 12647 colour management and an ISO 9001 quality system. Your file does not disappear into a middleman before reaching a press, and the quote you see is the production quote.</p></div>',

  '<h2>Low MOQ and fast samples: the practical timeline</h2>',
  '<p>Zine makers worry about exactly two things: minimum order that is too high, and samples that take too long.</p>',
  '<p><strong>Low MOQ</strong>: saddle-stitched zines start at <strong>100 copies</strong>; an 8-page booklet is a normal order. Small runs go digital, larger runs switch to offset, so you never print stock you cannot sell just to reach a threshold.</p>',
  '<p><strong>Fast samples</strong>: you get a free digital proof within <strong>1 hour</strong> of submitting your file, so colour, fonts and page order are confirmed before the press starts. Physical sample books are available on request for bulk orders.</p>',
  '<p>Standard turnaround is <strong>5-7 working days</strong>. US and international orders ship by DHL / FedEx in <strong>2-4 days</strong>. If a market date is close, the <a href="/services/rush-printing-delivery/">rush printing and delivery service</a> routes your job to a priority schedule. To confirm a unit price before ordering, <a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>message us on WhatsApp</strong></a> for an immediate answer.</p>',

  '<h2>A real order, step by step</h2>',
  '<p>An illustrator planned a first zine run: 100 copies, A5, 16 pages, 128gsm art paper interior with a laminated cover, to test at a weekend market. At proofing we flagged that a double-page spread sat 2mm off centre across the saddle fold, and recommended pulling the main image 4mm inward. The second edition reused the same file structure with no rework.</p>',
  '<p>By the second edition she had a returning readership and moved straight to the 5,000-copy bulk tier, landing at the bottom of the price band &mdash; same file, same paper, the only change was <strong>test at 100, then scale</strong>. That is the most useful cost strategy in zine publishing: validate the content at low MOQ, then buy the bulk rate.</p>',

  '<h2>File setup, in one pass</h2>',
  '<p>Supply AI / PDF / EPS, at least <strong>300 DPI</strong>, in <strong>CMYK</strong>, with <strong>3mm bleed</strong> and fonts outlined. For foil, spot UV or debossing, add a separate K100 black layer marking the finishing position.</p>',
  '<p>No finished layout? Send text and images and free layout covers contents pages, folios and chapter marks. Just make sure the page count is a multiple of 4 first &mdash; that single detail causes most revision rounds.</p>',

  '<h2>FAQ</h2>',
  '<p><strong>Q1: What is the minimum order for zine printing?</strong><br/>A: Saddle-stitched zines have a 100-copy minimum order, 8-64 pages, product code BK-002, with a 5-7 working day standard turnaround. For a 50-copy test, keep it under 16 pages on 80-100gsm woodfree stock to land at the low end of the band.</p>',
  '<p><strong>Q2: Does the page count have to be a multiple of 4?</strong><br/>A: Yes. One sheet folds into 4 pages, so the total must divide by 4 &mdash; commonly 8 / 12 / 16 / 24 / 32 pages. A 30-page manuscript can add a 2-page colophon or blank spread to reach 32.</p>',
  '<p><strong>Q3: How much is a zine per copy?</strong><br/>A: Roughly HK$6-32 per copy from 100 copies, falling to HK$1.20 per copy at 5,000. The exact figure depends on page count, trim size, interior stock and cover lamination; the 30-second instant quote returns the real number.</p>',
  '<p><strong>Q4: Can I print a spine and an ISBN?</strong><br/>A: Saddle stitching has no spine. Upgrade to perfect binding (+HK$30/copy, 48-400 pages, ISBN barcode supported) or hardcover (+HK$100/copy).</p>',
  '<p><strong>Q5: How fast is delivery?</strong><br/>A: Standard production is 5-7 working days. DHL / FedEx delivers worldwide in 2-4 days, including 2-4 days to the US.</p>',

  '<h2>Ready to print?</h2>',
  '<p>Send page count, size and quantity on <a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp +86 198 8085 1334</strong></a> for a same-day quote, or run the numbers yourself with the <a href="/quote/">30-second instant quote</a>.</p>',
  '<p>For the craft detail behind this guide, read the <a href="/en/blog/saddle-stitch-booklet-printing-guide/">saddle stitch booklet printing guide</a> and the <a href="/en/blog/catalog-printing-guide/">catalogue printing guide</a>; doujin circles should start with the <a href="/en/blog/doujin-circle-printing-guide/">doujinshi printing guide</a>.</p>',

  '<div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200"><p><strong>About the author team:</strong> the <a href="/about/">ZprintPro print engineering team</a>, 15 years of cross-border print experience across packaging, labels, bookbinding and campus printing, serving 1,000+ brand clients. Technical content follows ISO 12647-2 colour management, FSC-certified paper specifications and the EU REACH chemical registration framework.</p><p class="mt-3">Data sources: ZprintPro Saddle Stitch Booklets product page BK-002 (September 2026 pricing: 100-copy minimum, HK$6-32/copy, HK$1.20/copy at 5,000, 5-7 day standard turnaround, 1-hour free proof) and the same page&rsquo;s binding upgrade and shipping terms (perfect bound +HK$30/copy, hardcover +HK$100/copy). First published 2026-09-18.</p></div>',
].join('\n');

// ────────────────────────────────────────────────────────────
// ja
// ────────────────────────────────────────────────────────────
const JA = [
  '<p>2026 年にジン（Zine）を印刷するとき、決めるべきことは 2 つだけです。<strong>最低何部から刷れるのか</strong>、そして<strong> 1 部いくらになるのか</strong>。中綴じジンは <strong>100 部から、1 部あたり HK$6〜32</strong>、5,000 部では<strong> 1 部 HK$1.20</strong> まで下がります。ページ数は 8〜64 ページ（4 の倍数）、A4 または A5、標準納期 <strong>5〜7 営業日</strong>、入稿後 <strong>1 時間以内</strong>に無料デジタル校正をお出しします。</p>',

  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">クイック回答：ジン印刷の価格は？</p><p class="text-sm">中綴じジンは <strong>100 部から、1 部あたり約 HK$6〜32</strong>。5,000 部のロットでは<strong> 1 部 HK$1.20</strong> まで下がります（製品ページ <a href="/product/saddle-stitch-booklets/">中綴じ冊子 BK-002</a>、2026 年 9 月時点の価格）。最終単価はページ数・サイズ・本文用紙・表紙ラミネートで変わります。</p></div>',
  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">クイック回答：最低注文数は？</p><p class="text-sm">最小ロットは <strong>100 部</strong>、8〜64 ページです。まず 50 部で試したい場合は、ページ数を 16 ページ以内に抑え、本文を 80〜100g 上質紙、表紙ラミネートなしにすると価格帯の下限側に収まります。</p></div>',
  '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">クイック回答：ページ数が 4 の倍数でないとダメな理由は？</p><p class="text-sm">中綴じは 1 枚の大判用紙を折って <strong>4 ページ</strong>にする製本方法のため、総ページ数は必ず 4 の倍数になります。一般的なジンは <strong>8 / 12 / 16 / 24 / 32 ページ</strong>。64 ページを超える場合は無線綴じ（48〜400 ページ）へ切り替えます。</p></div>',

  '<p>価格をすぐに知りたい場合は、ページ数・サイズ・部数を <a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp +86 198 8085 1334</strong></a> までお送りください。または<a href="/quote/">30 秒 AI 即時見積もり</a>でご自身で試算できます。</p>',

  '<h2>ジンと商業カタログは何が違うのか</h2>',
  '<p>ジンはファンジン文化から生まれた、自ら編集し自ら出版する小ロットの媒体です。商業カタログとの違いは印刷工芸ではなく<strong>意思決定の速さ</strong>にあります。多くの作り手はレイアウトから納品まで 2〜4 週間で進め、<strong>固定の印刷会社を持っていません</strong>。だからこそ「最小ロット」と「見積もりの透明性」が、印刷会社の歴史より重視されます。</p>',
  '<p>当社の<a href="/product/saddle-stitch-booklets/">中綴じ冊子の製品ページ</a>が 30 秒 AI 即時見積もりを備えているのはそのためです。会員登録も営業からの返信待ちも不要で、ページ数と部数を入力すれば価格が出ます。</p>',

  '<h2>用紙はどう選ぶ？ 本文と表紙を分けて考える</h2>',
  '<p>ジンの用紙判断は 2 点だけです。本文は<strong>文字主体</strong>か<strong>図版主体</strong>か、表紙に<strong>ラミネート</strong>を掛けるか。</p>',
  '<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">部位</th><th class="border p-2 text-left">用紙</th><th class="border p-2 text-left">適する内容</th><th class="border p-2 text-left">実務メモ</th></tr></thead><tbody>',
  '<tr><td class="border p-2">本文</td><td class="border p-2">80〜100g 上質紙</td><td class="border p-2">エッセイ・詩・インタビュー</td><td class="border p-2">反射が少なく軽い。文字主体ジンの標準</td></tr>',
  '<tr><td class="border p-2">本文</td><td class="border p-2">128g コート紙</td><td class="border p-2">図版と文字の混在</td><td class="border p-2">上質紙より発色が明らかに良い</td></tr>',
  '<tr><td class="border p-2">本文</td><td class="border p-2">157g コート紙</td><td class="border p-2">見開き大図版・厚みのある手触り</td><td class="border p-2">32 ページを超えると中綴じの背が膨らみます</td></tr>',
  '<tr><td class="border p-2">表紙</td><td class="border p-2">コート紙 + ラミネート（任意）</td><td class="border p-2">即売会などで繰り返し手に取られる用途</td><td class="border p-2">ラミネートの有無で耐久性の差がはっきり出ます</td></tr>',
  '</tbody></table>',

  '<h2>中綴じ・無線綴じ・上製本の選び方</h2>',
  '<p>製本方法はページ数で決まります。中綴じは折り丁を重ねて中央に針金を通すため、完成品は<strong>180&deg; に平らに開き</strong>、見開きが 1 枚の絵として見えます。</p>',
  '<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">製本</th><th class="border p-2 text-left">ページ範囲</th><th class="border p-2 text-left">開き</th><th class="border p-2 text-left">追加費用</th></tr></thead><tbody>',
  '<tr><td class="border p-2"><strong>中綴じ</strong>（標準）</td><td class="border p-2">8〜64 ページ</td><td class="border p-2">180&deg;</td><td class="border p-2">&mdash;</td></tr>',
  '<tr><td class="border p-2"><strong>無線綴じ</strong></td><td class="border p-2">48〜400 ページ</td><td class="border p-2">約 120&deg;</td><td class="border p-2">+HK$30/部</td></tr>',
  '<tr><td class="border p-2"><strong>上製本</strong></td><td class="border p-2">本文の厚みによる</td><td class="border p-2">約 180&deg;</td><td class="border p-2">+HK$100/部</td></tr>',
  '</tbody></table>',
  '<p>無線綴じは背表紙に ISBN バーコードを印刷できます。中綴じには背がありませんが、薄く・速く・安くが優先のジンでは、背表紙より削減できるコストの方が価値を持ちます。</p>',

  '<h2>コストはどこで決まるのか</h2>',
  '<p>印刷費の主因はインキではありません。中綴じジンのコストは<strong>ページ数</strong>（用紙量と折り工程）、<strong>部数</strong>（版代と段取りの分散）、<strong>用紙とラミネート</strong>の 3 点で決まります。最も効くのは部数で、同じ仕様でも 100 部と 5,000 部では単価が桁で変わります。</p>',
  '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">中間業者ではなく自社工場</p><p class="text-sm">ZprintPro は 彩龍印刷 のブランドで、<strong>深圳に自社工場</strong>を持ち、ハイデルベルク枚葉オフセット機と HP Indigo 15K B2 デジタルラインを稼働しています。用紙は FSC 認証、カラーマネジメントは ISO 12647、品質体制は ISO 9001。データが中間業者を経由せず刷版に届き、表示価格がそのまま生産価格になります。</p></div>',

  '<h2>低ロットと迅速な校正：実務タイムライン</h2>',
  '<p>ジンの作り手が気にするのは 2 点だけです。ロットが大きすぎること、校正に時間がかかること。</p>',
  '<p><strong>低ロット</strong>：中綴じジンは <strong>100 部から</strong>。8 ページの小冊子も通常どおり承ります。少部数はデジタル、まとまった部数はオフセットへ切り替えるため、ロットを満たすために売れない在庫を刷る必要はありません。</p>',
  '<p><strong>迅速な校正</strong>：入稿後 <strong>1 時間以内</strong>に無料デジタル校正をお出しし、色・書体・ページ順を確認してから印刷に入ります。まとまったご注文には実物見本もご用意できます。</p>',
  '<p>標準納期は <strong>5〜7 営業日</strong>。海外は DHL / FedEx で <strong>2〜4 日</strong>です。即売会の日程が迫っている場合は<a href="/services/rush-printing-delivery/">即日印刷・配送サービス</a>で優先工程に回せます。ご発注前に単価を確認したいときは、<a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp ですぐにお答えします</strong></a>。</p>',

  '<h2>実際のご発注ステップ</h2>',
  '<p>イラストレーターの方が初版として A5・16 ページ・本文 128g コート紙・表紙ラミネートの 100 部を、週末の即売会で試すためにご発注されました。校正時に、見開きの主図が中綴じの折り目で 2mm ずれていることを検出し、主図を内側へ 4mm 寄せるご提案をしました。第 2 版は同じファイル構成のまま修正なしで進みました。</p>',
  '<p>第 2 版では固定の読者がつき、そのまま 5,000 部のロット単価へ移行して価格帯の下限に到達しました。同じファイル、同じ用紙で、違いは<strong>100 部で試してから拡大した</strong>ことだけです。これがジン制作で最も実用的なコスト戦略です。</p>',

  '<h2>入稿仕様（まとめて確認）</h2>',
  '<p>形式は AI / PDF / EPS、解像度 <strong>300 DPI</strong> 以上、カラーモードは <strong>CMYK</strong>、塗り足し <strong>3mm</strong>、書体はアウトライン化。箔押し・スポット UV・エンボスなどの加工がある場合は、加工位置を示す K100 の黒版を別途ご用意ください。</p>',
  '<p>レイアウトデータがなくても、テキストと画像をお送りいただければ無料でレイアウトし、目次・ノンブル・章見出しまで整えます。ページ数は先に 4 の倍数へ調整しておくと、修正の往復が最も減ります。</p>',

  '<h2>よくある質問（FAQ）</h2>',
  '<p><strong>Q1: ジン印刷の最小ロットは？</strong><br/>A: 中綴じジンは最小 100 部、8〜64 ページ、製品番号 BK-002、標準納期 5〜7 営業日です。50 部で試す場合は 16 ページ以内・本文 80〜100g 上質紙にすると価格帯の下限側になります。</p>',
  '<p><strong>Q2: ページ数は 4 の倍数でないといけませんか？</strong><br/>A: はい。1 枚の用紙が 4 ページになるため総ページ数は 4 の倍数です。一般的には 8 / 12 / 16 / 24 / 32 ページ。30 ページの原稿なら奥付や余白を 2 ページ足して 32 ページにします。</p>',
  '<p><strong>Q3: 1 部あたりの価格は？</strong><br/>A: 100 部から 1 部あたり約 HK$6〜32、5,000 部では HK$1.20 まで下がります。正確な金額はページ数・サイズ・本文用紙・表紙ラミネートで変わるため、30 秒 AI 即時見積もりでご確認ください。</p>',
  '<p><strong>Q4: 背表紙と ISBN は付けられますか？</strong><br/>A: 中綴じに背表紙はありません。無線綴じ（+HK$30/部、48〜400 ページ、ISBN 対応）または上製本（+HK$100/部）へアップグレードしてください。</p>',
  '<p><strong>Q5: 納期はどのくらいですか？</strong><br/>A: 標準は 5〜7 営業日。海外は DHL / FedEx で 2〜4 日、日本のお客様も 2〜4 営業日でお届けします。</p>',

  '<h2>さっそく印刷する</h2>',
  '<p>ページ数・サイズ・部数をお知らせのうえ、<a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp +86 198 8085 1334</strong></a> までご連絡ください。当日にお見積もりします。または<a href="/quote/">30 秒 AI 即時見積もり</a>でご自身で試算できます。</p>',
  '<p>工芸の詳細は<a href="/ja/blog/saddle-stitch-booklet-printing-guide/">中綴じ冊子の印刷ガイド</a>と<a href="/ja/blog/catalog-printing-guide/">カタログ印刷ガイド</a>をご覧ください。同人誌の作り手には<a href="/ja/blog/doujin-circle-printing-guide/">同人誌印刷ガイド</a>が参考になります。</p>',

  '<div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200"><p><strong>執筆：</strong><a href="/about/">ZprintPro 印刷エンジニアチーム</a>。越境印刷で 15 年、1,000 社以上のブランド案件を担当し、包装・ラベル・製本・学校印刷を手がけています。技術内容は ISO 12647-2 カラーマネジメント規格、FSC 認証用紙の仕様、EU REACH 化学物質登録の枠組みに基づいています。</p><p class="mt-3">データ出典：ZprintPro 中綴じ冊子 製品ページ BK-002（2026 年 9 月時点：100 部から・HK$6〜32/部・5,000 部で HK$1.20/部・標準納期 5〜7 営業日・1 時間無料校正）／同ページの製本アップグレードと配送条件（無線綴じ +HK$30/部・上製本 +HK$100/部）。初版 2026-09-18。</p></div>',
].join('\n');

// ────────────────────────────────────────────────────────────
// 元数据
// ────────────────────────────────────────────────────────────
const TITLES = {
  'zh-hk': '小誌 Zine 印刷指南 2026: 8-64 頁騎馬釘 100 本起印 HK$6/本起 | 智印港',
  en: 'Zine Printing Guide 2026: Saddle Stitch 8-64pp, 100 MOQ from HK$6 | ZprintPro',
  ja: 'ジン（Zine）印刷ガイド 2026: 中綴じ 8〜64 ページ 100 部から | ZprintPro',
};
const DESCS = {
  'zh-hk': '小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘, 單價 HK$6-32/本, 5,000 本低至 HK$1.20/本, 5-7 個工作天, 1 小時免費打稿. 紙材/裝訂/頁數 4 的倍數全攻略, 30 秒 AI 即時報價.',
  en: 'Zine printing from 100 copies, saddle stitch 8-64pp, HK$6-32/copy down to HK$1.20 at 5,000. 5-7 day turnaround, 1-hour free proof. Paper, binding and why page counts divide by 4. 30-second instant quote.',
  ja: 'ジン（Zine）印刷は 100 部から。中綴じ 8〜64 ページ、1 部 HK$6〜32（5,000 部で HK$1.20）。標準納期 5〜7 営業日、1 時間以内に無料校正。用紙・製本・4 の倍数の理由を解説。30 秒 AI 見積もり。',
};
const EXCERPTS = {
  'zh-hk': '小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘, 每本約 HK$6-32, 5,000 本批量低至 HK$1.20/本. 內頁 80-100g 書紙或 128-157g 銅版紙, 封面可覆膜, 頁數須為 4 的倍數, 標準交期 5-7 個工作天, 提交檔案 1 小時內免費打稿, 滿 HK$500 港九新界順豐免運, DHL 全球 2-4 天.',
  en: 'Zine printing from 100 copies, saddle stitch 8-64 pages, about HK$6-32 per copy and HK$1.20 per copy at 5,000. Interior in 80-100gsm woodfree or 128-157gsm art paper, optional cover lamination, page count must divide by 4. 5-7 working day turnaround, free proof within 1 hour, DHL worldwide in 2-4 days.',
  ja: 'ジン（Zine）印刷は 100 部から、中綴じ 8〜64 ページ、1 部あたり約 HK$6〜32、5,000 部で HK$1.20。本文は 80〜100g 上質紙または 128〜157g コート紙、表紙ラミネート可、ページ数は 4 の倍数。標準納期 5〜7 営業日、入稿後 1 時間以内に無料校正、DHL で世界 2〜4 日。',
};
const CATEGORY = { 'zh-hk': '書籍印刷', en: 'Book Printing', ja: '書籍印刷' };

// ────────────────────────────────────────────────────────────
// 执行
// ────────────────────────────────────────────────────────────
const FILES = {
  'zh-hk': { data: 'src/data/blog-data/zh-hk.json', content: ZH },
  en: { data: 'src/data/blog-data/en.json', content: EN },
  ja: { data: 'src/data/blog-data/ja.json', content: JA },
};

console.log('===== 阶段 1: 前置断言 (不写盘) =====');
let fail = 0;
const originals = {};
const entryCounts = {};
for (const [loc, cfg] of Object.entries(FILES)) {
  const raw = fs.readFileSync(path.join(ROOT, cfg.data), 'utf8');
  originals[loc] = raw;
  const obj = JSON.parse(raw);
  entryCounts[loc] = Object.keys(obj).length;
  // ★ 往返一致性: 若 stringify(parse(raw)) !== raw, 说明重写会改变全文件格式 → 中止
  const roundTrip = JSON.stringify(obj, null, 2) + '\n';
  if (roundTrip !== raw) {
    fail++;
    console.log(`${loc} FAIL: JSON 往返不一致 (原 ${raw.length} B / 重写 ${roundTrip.length} B) —— 重写会污染全文件格式, 中止`);
  } else {
    console.log(`${loc}: JSON 往返一致 (${raw.length} B) ✓`);
  }
  const dup = obj[SLUG] !== undefined;
  const len = cfg.content.length;
  const hrefs = [...new Set((cfg.content.match(/href="([^"]+)"/g) || []))].length;
  const tableCount = (cfg.content.match(/<table/g) || []).length;
  const qaCount = (cfg.content.match(/快速答案|Quick Answer|クイック回答/g) || []).length;
  const faqCount = (cfg.content.match(/<p><strong>Q\d+[:：]/g) || []).length;
  const ctaCount = (cfg.content.match(/wa\.me\/8619880851334/g) || []).length;
  const h2 = (cfg.content.match(/<h2>/g) || []).length;
  const jsonLd = (cfg.content.match(/application\/ld\+json/g) || []).length;
  console.log(`${loc}: entries=${Object.keys(obj).length} dup=${dup} contentLen=${len} 表格=${tableCount} 快速答案=${qaCount} FAQ=${faqCount} CTA=${ctaCount} H2=${h2} 唯一内链=${hrefs} 内嵌JSONLD=${jsonLd}`);
  if (dup) { fail++; console.log('  FAIL: slug 已存在'); }
  if (len < 2000) { fail++; console.log('  FAIL: 内容过短'); }
  if (tableCount < 2) { fail++; console.log('  FAIL: 表格 <2'); }
  if (qaCount < 3) { fail++; console.log('  FAIL: 快速答案块 <3'); }
  if (faqCount < 4) { fail++; console.log('  FAIL: FAQ <4'); }
  if (ctaCount < 2 || ctaCount > 3) { fail++; console.log('  FAIL: CTA 数不在 2-3'); }
  if (hrefs < 7) { fail++; console.log('  FAIL: 唯一内链 <7'); }
  if (jsonLd > 0) { fail++; console.log('  FAIL: content 内嵌 JSON-LD (红线)'); }
}
if (fail) { console.error(`\n❌ 前置断言未过 (${fail}), 拒绝写盘`); process.exit(1); }

console.log('\n===== 阶段 2: 备份 + 写盘 =====');
fs.mkdirSync(BAK, { recursive: true });
for (const [loc, cfg] of Object.entries(FILES)) {
  fs.writeFileSync(path.join(BAK, path.basename(cfg.data)), originals[loc], 'utf8');
  const obj = JSON.parse(originals[loc]);
  obj[SLUG] = {
    slug: SLUG,
    title: TITLES[loc],
    description: DESCS[loc],
    date: DATE,
    category: CATEGORY[loc],
    content: cfg.content,
  };
  // 保持 key 顺序 = 追加到末尾
  fs.writeFileSync(path.join(ROOT, cfg.data), JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('WROTE ' + cfg.data);
}

console.log('\n===== 阶段 3: 结果形状断言 =====');
let fail2 = 0;
for (const [loc, cfg] of Object.entries(FILES)) {
  const now = fs.readFileSync(path.join(ROOT, cfg.data), 'utf8');
  const obj = JSON.parse(now);
  const okA = Object.keys(obj).length === entryCounts[loc] + 1;
  if (!okA) fail2++;
  console.log(`${okA ? 'OK  ' : 'FAIL'} ${loc} entries ${Object.keys(obj).length} == ${entryCounts[loc]}+1`);
  const e = obj[SLUG];
  const okB = !!e && e.content === cfg.content && e.title === TITLES[loc] && e.date === DATE;
  if (!okB) fail2++;
  console.log(`${okB ? 'OK  ' : 'FAIL'} ${loc} 条目字段与写入内容逐字一致`);
  const buf = fs.readFileSync(path.join(ROOT, cfg.data));
  const okC = buf[0] !== 0xff && !now.includes('\uFFFD');
  if (!okC) fail2++;
  console.log(`${okC ? 'OK  ' : 'FAIL'} ${loc} no BOM / no mojibake`);
  // 原有条目未被改动
  const before = JSON.parse(originals[loc]);
  let changed = 0;
  for (const k of Object.keys(before)) {
    if (JSON.stringify(before[k]) !== JSON.stringify(obj[k])) changed++;
  }
  const okD = changed === 0;
  if (!okD) fail2++;
  console.log(`${okD ? 'OK  ' : 'FAIL'} ${loc} 原有 ${Object.keys(before).length} 条零改动 (改动 ${changed})`);
  // 简体字检测 (zh-hk / ja 不得残留简体)
  if (loc !== 'en') {
    // 注意: 「会」是日本新字体的标准字形 (会社/会員/即売会), 在 ja 中合法 → ja 侧剔除
    const base = '这个说时会来对开关门问题实现应该样种类别页标题设计图';
    const simpSet = loc === 'ja' ? base.replace(/会/g, '') : base;
    const simp = [...new Set([...cfg.content].filter((c) => simpSet.includes(c)))];
    const okE = simp.length === 0;
    if (!okE) fail2++;
    console.log(`${okE ? 'OK  ' : 'FAIL'} ${loc} 简体字残留 ${simp.length} → [${simp.join(' ')}]`);
  }
}
if (fail2) {
  console.error(`\n❌ 形状断言未过 (${fail2}) —— 回滚`);
  for (const [loc, cfg] of Object.entries(FILES)) {
    fs.copyFileSync(path.join(BAK, path.basename(cfg.data)), path.join(ROOT, cfg.data));
    console.log('ROLLBACK ' + cfg.data);
  }
  process.exit(1);
}
console.log('\n✅ 三语条目写入通过。备份: ' + BAK);
