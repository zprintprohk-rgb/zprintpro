// .hermes/_b5b6_integrate_20261016.mjs — B5/B6 深度 blog 三语集成 (v2 方案 §4)
// §12 三件套: slug 冲突断言 + 标题当量断言 (50-57) + meta desc 长度断言 (138-163) + 备份
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { equiv } = require(path.join(process.cwd(), 'scripts/guards/title-equiv.js'));
const REPO = process.cwd();
const BAK = path.join(REPO, '.hermes/_bak-b5b6-20261016');
fs.mkdirSync(BAK, { recursive: true });

const B5 = 'corporate-calendar-customization-2027';
const B6 = 'calendar-sizes-print-reference';
const DATE = '2026-10-16';

const META = {
[B5]: {
  zh: { title: '月曆印刷訂製：尺寸×掛裝×紙材速查 1 本起 HK$3-8 | 智印港',
        desc: '企業月曆訂製 2027 全攻略：座檯 150×180/200×230mm、掛牆 A3/A2、迷你 85×55mm、磁石 0.5/1mm，1 本起印 HK$3-8/本，免費排版與節慶標註。Q4 旺季 10 月底前確認檔期，港九新界免費速遞，DHL 全球 2-4 天，企業禮品首選。',
        excerpt: '企業月曆訂製指南：六款類型（座檯/掛牆/訂製/迷你/相框/磁石）規格×紙材×檔期一次講清，1 本起印 HK$3-8/本，Q4 旺季 10 月底前確認，附 6 條 FAQ。' },
  en: { title: 'Custom Calendars 2027: Sizes, Binding, Papers | ZprintPro',
        desc: 'Custom corporate calendars for 2027 from US$0.40 — desk, wall, card, mini and magnetic types, 1-copy MOQ, free layout, Q4 slots by late October, DHL 2-4 days.',
        excerpt: 'A practical guide to corporate calendar printing for 2027: six calendar types compared, paper and binding choices, single-copy MOQ from US$0.40, volume tips and the Q4 production window.' },
  ja: { title: '企業カレンダー印刷 2027：サイズ・製本 1部〜 | ZprintPro',
        desc: '企業カレンダー印刷 2027 完全ガイド：卓上 150×180/200×230mm、壁掛け A3/A2、カード 100×150mm、ミニ 85×55mm、マグネット 0.5/1mm。1部から、無料レイアウト、Q4 は10月底までに確認、DHL 2-4日、沖縄・北海道も追加料金なし。',
        excerpt: '企業カレンダー印刷の発注ガイド。6 タイプの規格比較、用紙と製本の選び方、1部からの小ロット、Q4 繁忙期のスケジュールまで、6 つの FAQ とともに解説します。' },
  categoryKey: 'printing',
  targetKeywords: { primary: 'custom calendar printing', secondary: ['月曆訂製', '企業年曆印刷', 'corporate calendar printing 2027', 'desk calendar printing', 'wall calendar printing'] },
},
[B6]: {
  zh: { title: '月曆尺寸大全 2027：座檯/掛牆/磁石尺寸表 1 本起 | 智印港',
        desc: '2027 月曆尺寸速查表：座檯 150×180/200×230mm、掛牆 A3 297×420mm/A2 420×594mm、年曆卡 100×150mm、迷你 85×55mm、磁石 0.5/1mm 軟磁片，附紙重與裝訂對照。1 本起印 HK$3-8/本，30 秒 AI 報價，港九新界免費速遞。',
        excerpt: '月曆尺寸速查：座檯/掛牆/年曆卡/迷你/磁石五類規格表、紙重與裝訂對照、價格帶同落單檔期，1 本起印，AEO 速查設計。' },
  en: { title: 'Calendar Sizes 2027: Complete Print Reference | ZprintPro',
        desc: '2027 calendar size reference: desk 150×180mm & 200×230mm, wall A3/A2, card 100×150mm, mini 85×55mm, magnetic 0.5/1mm. 1-copy MOQ from US$0.40, DHL 2-4 days.',
        excerpt: 'The complete 2027 calendar size reference: exact dimensions for desk, wall, card, mini and magnetic calendars, paper weights, binding options, pricing floor and production windows.' },
  ja: { title: 'カレンダーサイズ一覧 2027：卓上・壁掛け・磁石 | ZprintPro',
        desc: 'カレンダーサイズ一覧 2027：卓上 150×180/200×230mm、壁掛け A3 297×420mm/A2 420×594mm、カード 100×150mm、ミニ 85×55mm、マグネット 0.5/1mm、用紙と製本の対照表付き。1部から 1冊約50円（HK$3-8）、30秒AI見積り、DHL 2-4日。',
        excerpt: 'カレンダーサイズの完全リファレンス。卓上・壁掛け・カード・ミニ・マグネットの寸法、用紙と製本、価格帯と発注タイミングを一覧表で整理しました。' },
  categoryKey: 'printing',
  targetKeywords: { primary: 'calendar sizes', secondary: ['calendar size guide', 'a3 calendar size', 'desk calendar size', 'wall calendar dimensions', 'magnetic calendar size'] },
},
};

const CONTENT = {
[B5]: {
'zh-hk': `<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 快速答案 (40 秒讀完)</p><p>企業月曆訂製 <strong>1 本起印</strong>，價格 <strong>HK$3-8/本</strong>（按尺寸與工藝浮動）。六大類型：座檯曆 150×180 / 200×230mm（三角座架）、掛牆曆 A3/A2 13 頁（金屬圈）、訂製年曆（十二版面 + 燙金可選）、年曆卡 100×150mm、迷你年曆 85×55mm（錢包尺寸）、磁石年曆（0.5/1mm 軟磁片貼雪櫃）。Q4 係企業禮品旺季，<strong>建議 10 月底前確認設計</strong>鎖定檔期；免費排版同節慶標註，港九新界滿 HK$500 免費速遞，DHL 全球 2-4 天。</p></div>
<p>呢篇係寫俾採購、行政同市場部睇嘅 2027 企業月曆訂製指南：六款類型點揀、紙材同工藝點配、價格帶同批量策略、Q4 檔期時間表，一次過講清。所有規格同價格帶以產品資料庫真值為準，附 6 條常見問題。</p>
<h2>企業月曆訂製點樣開始？八步流程一次講清</h2>
<p>企業月曆訂製唔複雜，跟住八步走：<strong>(1) 揀類型</strong>（座檯/掛牆/訂製/卡/迷你/磁石）→ <strong>(2) 確認尺寸</strong> → <strong>(3) 揀紙張同底板</strong>（200-300g 銅版紙 + 1-2mm 灰板）→ <strong>(4) 揀工藝</strong>（燙金/局部 UV/圓環/打孔）→ <strong>(5) 設計</strong>（12 個月模板 + 企業 LOGO + 品牌色）→ <strong>(6) 早鳥預訂鎖定產能</strong> → <strong>(7) 生產 3-7 天</strong>（數碼快、柯式平）→ <strong>(8) 順豐本地 + DHL 全球配送</strong>。每一步都有免費排版支援，唔使擔心設計檔唔齊。</p>
<h2>邊種月曆類型啱你？六款規格對比</h2>
<table><thead><tr><th>類型</th><th>尺寸</th><th>結構</th><th>最適合</th></tr></thead><tbody>
<tr><td><a href="/zh-hk/product/desk-calendars/">座檯年曆</a></td><td>150×180 / 200×230mm</td><td>三角座架 + 灰板底座</td><td>收銀位、接待處、辦公桌</td></tr>
<tr><td><a href="/zh-hk/product/wall-calendars/">掛牆年曆</a></td><td>A3 297×420 / A2 420×594mm</td><td>13 頁 + 金屬圈/騎馬釘</td><td>會議室、門店牆面、企業送禮</td></tr>
<tr><td><a href="/zh-hk/product/custom-calendars/">訂製年曆</a></td><td>按需訂製</td><td>十二版面 + 燙金/UV 可選</td><td>品牌深度定制、可變數據</td></tr>
<tr><td><a href="/zh-hk/product/mini-calendars/">迷你年曆</a></td><td>85×55mm</td><td>騎馬釘或單張</td><td>大量派發、夾寄、活動手信</td></tr>
<tr><td><a href="/zh-hk/product/photo-frame-calendars/">相框年曆</a></td><td>A5/A4</td><td>硬紙板相架、可換照片</td><td>家品禮品、溫馨手信</td></tr>
<tr><td><a href="/zh-hk/product/magnetic-calendars/">磁石年曆</a></td><td>A5/A4</td><td>0.5/1mm 軟磁片</td><td>雪櫃高頻曝光、社區派發</td></tr>
</tbody></table>
<p>揀類型的快速口訣：<strong>要曝光量揀掛牆</strong>（大版面 + 全年可見）、<strong>要日常觸達揀座檯</strong>（桌面 365 天）、<strong>要大量派發揀迷你</strong>（單價最低）、<strong>要貼住唔跌揀磁石</strong>（雪櫃位一年 365 日都喺眼前面）。</p>
<h2>紙材同工藝點配先唔嘥預算？</h2>
<table><thead><tr><th>紙材</th><th>重量</th><th>適合</th></tr></thead><tbody>
<tr><td>銅版紙</td><td>200-300g</td><td>色彩鮮明，企業月曆主力</td></tr>
<tr><td>啞粉紙</td><td>200-300g</td><td>不反光，攝影同藝術類月曆</td></tr>
<tr><td>相紙</td><td>200-260g</td><td>相框年曆、攝影作品集</td></tr>
<tr><td>合成紙</td><td>150-250g</td><td>磁石年曆面材、防水耐用</td></tr>
</tbody></table>
<p>工藝方面：燙金年份係企業禮品最常見加項（金/銀/玫瑰金），局部 UV 強化 LOGO，金屬圈裝訂方便掛牆翻頁。月曆每頁背面可以印企業資訊或者優惠日程，一張紙兩個用途。訂製年曆仲支援<strong>可變數據印刷</strong>——每頁印唔同分店或者員工資訊，一次性解決多分店品牌需求。</p>
<h2>企業月曆印刷價錢幾多？點樣批量慳得更多？</h2>
<p>全部六款年曆 <strong>1 本起印，HK$3-8/本</strong>，價格按尺寸、紙重同工藝浮動，實價以 30 秒 AI 報價為準。慳錢三招：<strong>(1) 數量上大批量轉柯式印刷</strong>，單價明顯再落；(2) 揀檯曆或者年曆卡，單價低過大版面掛曆；(3) 早鳥預訂連免費設計，設計費直接慳起。銀行、保險、地產呢類 Q4 送禮大戶，建議按客戶分層報數量——A 級客戶送掛牆精裝、B 級客戶送座檯、大量基礎客戶用年曆卡，一個預算覆蓋三層。</p>
<h2>幾時落單最穩陣？Q4 旺季檔期時間表</h2>
<table><thead><tr><th>時間</th><th>動作</th><th>原因</th></tr></thead><tbody>
<tr><td>8-9 月</td><td>設計定稿 + 報價</td><td>避開 11-12 月印刷高峰</td></tr>
<tr><td>10 月底前</td><td>確認設計鎖定檔期</td><td>旺季前排產最穩陣</td></tr>
<tr><td>11-12 月</td><td>生產 + 企業分發</td><td>紙張同物流都緊張，早落單早安心</td></tr>
</tbody></table>
<p>11-12 月係印刷業全年最旺季：紙張同工廠排期都緊張，DHL 跨境都可能延誤。提前落單享三重優勢——紙價平啲、交期穩陣啲、設計修改時間充裕啲。</p>
<h2>點樣令企業月曆更加「品牌」？</h2>
<p>三個實用技巧：<strong>(1) 每頁一個賣點</strong>——12 個月對應 12 個產品或者服務場景，月曆變成全年產品日曆；<strong>(2) 節慶標註自家促銷日</strong>——除了公眾假期，將公司週年慶、會員日印上去；<strong>(3) 背面做有用資訊</strong>——分行地址、預約電話或者小食譜，令客戶捨得唔扔。免費排版團隊可以按品牌色出 12 個月模板，確認顏色先上機。</p>
<h2>常見問題 FAQ</h2>
<p><strong>Q1：企業月曆最少訂幾多本？</strong><br/>1 本起印（數碼印刷），大批量上印刷機更經濟，500 本以上柯式單價更低。</p>
<p><strong>Q2：月曆印刷價錢幾多？</strong><br/>全部類型 HK$3-8/本，按尺寸、紙重同工藝浮動；燙金、局部 UV 等後加工按工藝另計，30 秒 AI 報價即時睇到。</p>
<p><strong>Q3：可以每頁印唔同內容嗎？</strong><br/>可以。可變數據印刷支援每頁唔同分店、員工或者產品資訊，適合多分店企業。</p>
<p><strong>Q4：12 月先落單趕得切嗎？</strong><br/>數碼短單可以，但旺季排期緊張，交期唔保證；想 12 月中前收貨，建議 10 月底前確認。</p>
<p><strong>Q5：有免費設計嗎？</strong><br/>有。免費排版（12 個月模板 + 節慶標註 + 企業 LOGO），有設計檔就免費打稿校色。</p>
<p><strong>Q6：可以同其他印刷品一齊落單慳運費嗎？</strong><br/>可以。月曆可以同賀卡、利是封等季節印刷品同一批生產同一批出貨，參考<a href="/zh-hk/blog/corporate-holiday-cards-printing-guide/">企業聖誕卡訂製指南</a>嘅季節組合策略。</p>
<p><a href="https://wa.me/8619880851334?text=%E6%83%B3%E5%B9%AB%E5%85%AC%E5%8F%B8%E8%A8%82%E8%A3%BD%202027%20%E6%9C%88%E6%9B%86%EF%BC%8C%E8%AB%8B%E5%A0%B1%E5%83%B9#src=blog-corporate-calendar-2027&sku=custom-calendars" target="_blank" rel="noopener noreferrer"><strong>WhatsApp 查詢企業月曆報價 →</strong></a>　或用 <a href="/zh-hk/quote/">30 秒 AI 報價</a>即刻睇價。</p>`,
'en': `<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ Quick Answer (40-second read)</p><p>Custom corporate calendars for 2027 print <strong>from a single copy at US$0.40-1.00 per unit</strong>. Six types: desk calendars on triangular easels (150×180 / 200×230mm), wall calendars A3/A2 with 13 pages and wire-o binding, fully custom 12-layout editions with optional foil, calendar cards 100×150mm, wallet-size minis 85×55mm, and magnetic calendars on 0.5/1mm magnet sheets. <strong>Q4 is peak season — confirm artwork by late October</strong> to lock production slots. Free layout, DHL worldwide in 2-4 days.</p></div>
<p>This guide is written for procurement, admin and marketing teams planning 2027 corporate gifting: how to choose between the six calendar types, which papers and finishes fit which budget, and how to sequence orders through the Q4 rush. All specs come from our product database; a 30-second AI quote prices your exact configuration.</p>
<h2>How does corporate calendar ordering work?</h2>
<p>Eight steps: <strong>(1) pick the type</strong>, <strong>(2) confirm size</strong>, <strong>(3) choose stock and base</strong> (200-300g coated plus 1-2mm greyboard), <strong>(4) pick finishes</strong> (foil, spot UV, wire-o, drilling), <strong>(5) design</strong> (12-month template with your logo and brand colors), <strong>(6) pre-order to lock capacity</strong>, <strong>(7) production in 3-7 days</strong> (digital for speed, offset for volume), <strong>(8) delivery</strong> — DHL worldwide in 2-4 days. Free layout support runs through the whole flow.</p>
<h2>Which calendar type fits your program?</h2>
<table><thead><tr><th>Type</th><th>Size</th><th>Structure</th><th>Best for</th></tr></thead><tbody>
<tr><td><a href="/en/product/desk-calendars/">Desk calendars</a></td><td>150×180 / 200×230mm</td><td>Triangular easel + greyboard</td><td>Counters, receptions, desks</td></tr>
<tr><td><a href="/en/product/wall-calendars/">Wall calendars</a></td><td>A3 297×420 / A2 420×594mm</td><td>13 pages, wire-o or saddle</td><td>Meeting rooms, storefronts, gifting</td></tr>
<tr><td><a href="/en/product/custom-calendars/">Custom calendars</a></td><td>Custom</td><td>12 layouts, foil/spot-UV optional</td><td>Deep brand programs, variable data</td></tr>
<tr><td><a href="/en/product/mini-calendars/">Mini calendars</a></td><td>85×55mm</td><td>Saddle-stitch or flat cut</td><td>Mass handouts, mail inserts</td></tr>
<tr><td><a href="/en/product/photo-frame-calendars/">Photo-frame calendars</a></td><td>A5/A4</td><td>Hardboard easel, swappable photo</td><td>Family gifts</td></tr>
<tr><td><a href="/en/product/magnetic-calendars/">Magnetic calendars</a></td><td>A5/A4</td><td>0.5/1mm magnet sheet</td><td>Fridge visibility, community drops</td></tr>
</tbody></table>
<p>Quick rule of thumb: <strong>wall for reach</strong> (big canvas, visible all year), <strong>desk for daily touch</strong> (365 days at eye level), <strong>mini for volume</strong> (lowest unit cost), <strong>magnetic for stickiness</strong> — literally.</p>
<h2>Which papers and finishes pair well?</h2>
<p>Coated paper at 200-300gsm is the corporate workhorse; matte stock suits photography-led designs; photo paper lifts photo-frame editions; synthetic stock backs magnetic versions. Foil-stamped year numbers (gold/silver/rose) are the most popular gifting upgrade, and spot UV sharpens logos. The back of every month can carry company info or promo dates — one sheet, two jobs. Variable-data printing can put a different branch or staff message on each page.</p>
<h2>How much do corporate calendars cost?</h2>
<p>All six types run <strong>from 1 copy at US$0.40-1.00 per unit</strong> depending on size, stock and finish; the 30-second AI quote prices your exact spec. Three ways to stretch the budget: move large volumes to offset for lower unit costs; choose card or mini formats over large wall formats; combine pre-ordering with free design support. Tiered gifting works well — premium wall editions for A-list clients, desk calendars for B-list, calendar cards for volume bases.</p>
<h2>When should you order for the 2027 season?</h2>
<p>Finalize designs in August-September, <strong>confirm by late October</strong> to lock production ahead of the November-December rush, then distribute through Q4. Ordering early means better paper pricing, stable lead times and slack for design revisions.</p>
<h2>FAQ</h2>
<p><strong>Q1: What is the minimum order?</strong><br/>Single-copy MOQ — digital printing; offset rates improve at volume.</p>
<p><strong>Q2: Can each month be different?</strong><br/>Yes — variable data printing supports per-page branches, products or staff messages.</p>
<p><strong>Q3: Is design help free?</strong><br/>Yes — free 12-month templates with holiday marking and your logo; free digital proof before production.</p>
<p><strong>Q4: Do you ship internationally?</strong><br/>Yes — DHL worldwide in 2-4 days from our Asia facility.</p>
<p><strong>Q5: How do premiums like foil affect price?</strong><br/>Finishes are quoted by process on top of the base band; the AI quote shows the combined figure instantly.</p>
<p><strong>Q6: Can calendars be combined with other seasonal print?</strong><br/>Yes — pair with holiday cards (see our <a href="/en/blog/corporate-holiday-cards-printing-guide/">corporate holiday cards guide</a>) on one production run and one shipment.</p>
<p><a href="https://wa.me/8619880851334?text=Hi%2C%20I%27d%20like%20a%20quote%20for%202027%20corporate%20calendars#src=blog-corporate-calendar-2027&sku=custom-calendars" target="_blank" rel="noopener noreferrer"><strong>WhatsApp us for a calendar quote →</strong></a>　or get an instant <a href="/en/quote/">30-second AI quote</a>.</p>`,
'ja': `<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ クイック回答 (40秒で読めます)</p><p>企業カレンダー印刷は<strong>1部から</strong>、<strong>1冊あたり約50円（HK$3-8）</strong>の価格帯。6タイプ：卓上（三角スタンド、150×180/200×230mm）、壁掛け（A3/A2、13ページ+リング綴じ）、オーダーメイド（12レイアウト+箔押し可）、カード 100×150mm、ミニ 85×55mm、マグネット（0.5/1mm）。Q4は繁忙期——<strong>10月底までにデザイン確定</strong>がおすすめ。無料レイアウト、DHL 2-4日。</p></div>
<p>購買・総務・マーケ担当向けの2027年企業カレンダー発注ガイド。6タイプの選び方、用紙と加工の組み合わせ、Q4のスケジュールを、製品データベースの実値に基づいて解説します。</p>
<h2>発注の流れは？8ステップで解説</h2>
<p>タイプ選定 → サイズ確認 → 用紙・台紙（200-300gコート+1-2mm灰板）→ 加工（箔押し・局部UV・リング）→ デザイン（12ヶ月テンプレ+社ロゴ）→ 早期予約で生産枠確保 → 生産3-7日（デジタルは速い、オフセットは量産向け）→ DHLで2-4日配送。無料レイアウト対応。</p>
<h2>どのタイプを選ぶ？6タイプ比較</h2>
<table><thead><tr><th>タイプ</th><th>サイズ</th><th>構造</th><th>最適な用途</th></tr></thead><tbody>
<tr><td><a href="/ja/product/desk-calendars/">卓上カレンダー</a></td><td>150×180 / 200×230mm</td><td>三角スタンド+灰板台座</td><td>レジ・受付・オフィス</td></tr>
<tr><td><a href="/ja/product/wall-calendars/">壁掛けカレンダー</a></td><td>A3/A2</td><td>13ページ+リング綴じ</td><td>会議室・店舗・ギフト</td></tr>
<tr><td><a href="/ja/product/custom-calendars/">オリジナルカレンダー</a></td><td>オーダー</td><td>12レイアウト+箔押し可</td><td>ブランド特注・可変データ</td></tr>
<tr><td><a href="/ja/product/mini-calendars/">ミニカレンダー</a></td><td>85×55mm</td><td>中綴じ/カット</td><td>大量配布・DM同封</td></tr>
<tr><td><a href="/ja/product/photo-frame-calendars/">フォトフレームカレンダー</a></td><td>A5/A4</td><td>硬紙板スタンド</td><td>家庭ギフト</td></tr>
<tr><td><a href="/ja/product/magnetic-calendars/">マグネットカレンダー</a></td><td>A5/A4</td><td>0.5/1mm磁石</td><td>冷蔵庫・地域配布</td></tr>
</tbody></table>
<h2>企業カレンダーの価格は？</h2>
<p>全タイプ<strong>1部から、1冊あたり約50円（HK$3-8）</strong>。サイズ・用紙・加工で変動し、30秒AI見積りで即確認。数量をまとめるとオフセットがお得、カード・ミニタイプはさらに低単価、早期予約で無料デザイン。</p>
<h2>いつ発注すべき？</h2>
<p>8-9月にデザイン確定、<strong>10月底までに発注確定</strong>で11-12月の繁忙期を回避。早めの発注は紙価・納期・修正余裕の三つで有利です。</p>
<h2>よくある質問</h2>
<p><strong>Q1：最少発注数は？</strong><br/>1部から（デジタル印刷）。数量がまとまるとオフセットが経済的。</p>
<p><strong>Q2：ページごとに内容を変えられる？</strong><br/>はい。可変データ印刷で支店・従業員ごとの情報を印刷可能。</p>
<p><strong>Q3：デザイン支援は無料？</strong><br/>はい。12ヶ月テンプレート+祝日マーク+社ロゴの無料レイアウト、デジタル校正も無料。</p>
<p><strong>Q4：納期は？</strong><br/>標準3-5日（デジタル）、5-7日（オフセット）。DHL国際配送2-4日。</p>
<p><a href="https://wa.me/8619880851334?text=2027%E5%B9%B4%E4%BC%81%E6%A5%AD%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AE%E8%A6%8B%E7%A9%8D%E3%82%92%E4%BE%9D%E9%A0%BC%E3%81%97%E3%81%9F%E3%81%84#src=blog-corporate-calendar-2027&sku=custom-calendars" target="_blank" rel="noopener noreferrer"><strong>WhatsAppで見積もり依頼 →</strong></a>　または <a href="/ja/quote/">30秒AI見積り</a>へ。</p>`,
},
[B6]: {
'en': `<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ Quick Answer (40-second read)</p><p>2027 calendar sizes at a glance: <strong>desk calendars 150×180mm and 200×230mm</strong> on triangular easels; <strong>wall calendars A3 (297×420mm) and A2 (420×594mm)</strong> as 13-page wire-o editions; <strong>calendar cards 100×150mm</strong>; <strong>mini calendars 85×55mm</strong> (credit-card); <strong>magnetic calendars A5/A4 on 0.5/1mm magnet sheets</strong>. Every format prints <strong>from 1 copy at US$0.40</strong>. Full dimension tables below.</p></div>
<p>This is the complete 2027 calendar size reference — exact dimensions, paper weights and binding options for every calendar type we print. Bookmark it for procurement specs, and price any size instantly with the 30-second AI quote.</p>
<h2>Master size table: every calendar type compared</h2>
<table><thead><tr><th>Type</th><th>Dimensions</th><th>Structure</th><th>Typical use</th></tr></thead><tbody>
<tr><td>Desk calendar (easel)</td><td>150×180mm / 200×230mm</td><td>Triangular easel, 1-2mm greyboard</td><td>Office desks, counters</td></tr>
<tr><td>Wall calendar</td><td>A3 297×420mm / A2 420×594mm</td><td>13 pages (cover + 12 months), wire-o or saddle stitch</td><td>Walls, meeting rooms, gifting</td></tr>
<tr><td>Calendar card</td><td>100×150mm</td><td>Flat single card</td><td>Mail inserts, mass distribution</td></tr>
<tr><td>Mini calendar</td><td>85×55mm</td><td>Saddle-stitch or flat cut</td><td>Wallets, event giveaways</td></tr>
<tr><td>Photo-frame calendar</td><td>A5 148×210mm / A4 210×297mm</td><td>Hardboard easel, swappable photo</td><td>Home and desk gifts</td></tr>
<tr><td>Magnetic calendar</td><td>A5 / A4</td><td>0.5mm or 1mm magnet sheet</td><td>Fridges, whiteboards</td></tr>
</tbody></table>
<p>Custom dimensions are cut to order on any format — send the spec and a free size check comes back before production.</p>
<h2>Wall calendar sizes: A3 or A2?</h2>
<p>A3 (297×420mm) is the standard office wall format — big enough for a month grid with notes, light enough for standard mailers. A2 (420×594mm) doubles the visual area for retail windows and venues where the calendar doubles as a poster. Both ship as 13-page editions (cover + 12 months) with wire-o binding that hangs flat, or saddle stitch for a slimmer, mail-friendly profile. The back of each month can carry company information.</p>
<h2>Desk calendar sizes and bases</h2>
<p>The two desk workhorses are 150×180mm (compact, fits crowded counters) and 200×230mm (more branding room per page). Both sit on a triangular easel with a 1-2mm greyboard base that keeps them upright all year. Tent-style single-sheet desk calendars are also available for ultra-short runs.</p>
<h2>Card, mini and magnetic formats</h2>
<p>Calendar cards at 100×150mm are the classic mail-insert format — postcard-sized, light, cheap at volume. Minis at 85×55mm match credit cards so they live in wallets; they are the go-to for event giveaways. Magnetic calendars pair A5/A4 faces with 0.5mm or 1mm flexible magnet sheets — the 0.5mm suits flat fridge surfaces, the 1mm adds substance for heavier handling; rounded corners are standard.</p>
<h2>Paper weights and binding options</h2>
<table><thead><tr><th>Component</th><th>Options</th><th>Notes</th></tr></thead><tbody>
<tr><td>Face stock</td><td>150-300gsm coated / matte / photo / synthetic</td><td>Match to design: coated for volume, photo for galleries</td></tr>
<tr><td>Base</td><td>1-2mm greyboard or card</td><td>Desk easels and photo-frame stands</td></tr>
<tr><td>Binding</td><td>Wire-o, saddle stitch, perfect, flat cut</td><td>Wire-o hangs flat; saddle stays slim</td></tr>
<tr><td>Finish</td><td>Foil year numbers, spot UV, lamination, rounded corners</td><td>Gift upgrades; rounded corners standard on magnets</td></tr>
</tbody></table>
<h2>How much do custom calendars cost?</h2>
<p>Every size in this reference prints <strong>from 1 copy at US$0.40 per unit</strong> (the band scales with size, stock and finish). Volume tiers improve unit economics, and offset becomes economical on larger runs. The 30-second AI quote prices exact configurations — size, stock, finish and quantity.</p>
<h2>When should 2027 artwork be locked?</h2>
<p>Q4 is peak season. Finalize designs in August-September and <strong>confirm by late October</strong> so production and delivery land before the gifting window; later orders compete for paper and press time.</p>
<h2>FAQ</h2>
<p><strong>Q1: What size is a standard wall calendar?</strong><br/>A3 (297×420mm) closed is the most common; A2 (420×594mm) for high-visibility walls.</p>
<p><strong>Q2: What size is a desk calendar?</strong><br/>150×180mm and 200×230mm are standard, both on easel bases.</p>
<p><strong>Q3: What size is a magnetic calendar?</strong><br/>A5 or A4 faces on 0.5/1mm magnet sheets.</p>
<p><strong>Q4: Can I order a custom size?</strong><br/>Yes — any dimension is cut to order after a free size check.</p>
<p><strong>Q5: What is the smallest calendar size?</strong><br/>85×55mm — credit-card mini calendars.</p>
<p><strong>Q6: What resolution for large wall calendars?</strong><br/>100-150dpi at print size is sufficient at viewing distance; 200dpi for close-up detail.</p>
<p><a href="https://wa.me/8619880851334?text=Hi%2C%20I%27d%20like%20calendar%20size%20specs%20and%20a%20quote#src=blog-calendar-sizes-2027&sku=wall-calendars" target="_blank" rel="noopener noreferrer"><strong>WhatsApp us for size specs →</strong></a>　or run the <a href="/en/quote/">30-second AI quote</a>.</p>`,
'zh-hk': `<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 快速答案 (40 秒讀完)</p><p>2027 月曆尺寸速查：<strong>座檯曆 150×180 / 200×230mm</strong>（三角座架）；<strong>掛牆曆 A3 297×420mm / A2 420×594mm</strong>（13 頁金屬圈）；<strong>年曆卡 100×150mm</strong>；<strong>迷你年曆 85×55mm</strong>（信用卡尺寸）；<strong>磁石年曆 A5/A4 + 0.5/1mm 軟磁片</strong>。全部 <strong>1 本起印，HK$3-8/本</strong>。逐類尺寸表如下。</p></div>
<p>呢篇係 2027 月曆尺寸速查頁：每款類型的精確尺寸、紙重同裝訂選項一覽表，採購落規格或者對設計稿都用得着。任何尺寸即刻用 30 秒 AI 報價計價。</p>
<h2>月曆尺寸總表：六款類型一覧</h2>
<table><thead><tr><th>類型</th><th>尺寸</th><th>結構</th><th>適用場景</th></tr></thead><tbody>
<tr><td><a href="/zh-hk/product/desk-calendars/">座檯曆</a></td><td>150×180 / 200×230mm</td><td>三角座架 + 1-2mm 灰板</td><td>辦公桌、收銀位</td></tr>
<tr><td><a href="/zh-hk/product/wall-calendars/">掛牆曆</a></td><td>A3 297×420 / A2 420×594mm</td><td>13 頁，金屬圈/騎馬釘</td><td>牆面、會議室、送禮</td></tr>
<tr><td>年曆卡</td><td>100×150mm</td><td>單張平卡</td><td>夾寄、大量派發</td></tr>
<tr><td><a href="/zh-hk/product/mini-calendars/">迷你年曆</a></td><td>85×55mm</td><td>騎馬釘或單張</td><td>錢包、活動手信</td></tr>
<tr><td><a href="/zh-hk/product/photo-frame-calendars/">相框曆</a></td><td>A5 148×210 / A4 210×297mm</td><td>硬紙板相架、可換照片</td><td>家居、桌面</td></tr>
<tr><td><a href="/zh-hk/product/magnetic-calendars/">磁石曆</a></td><td>A5 / A4</td><td>0.5/1mm 軟磁片</td><td>雪櫃、白板</td></tr>
</tbody></table>
<p>訂製尺寸全部做到——交規格先做免費尺寸核對，確認先落生產。</p>
<h2>掛牆曆揀 A3 定 A2？</h2>
<p>A3（297×420mm）係標準辦公牆面規格——月曆格加備註位啱啱好，郵寄都輕身；A2（420×594mm）視覺面積大一倍，適合零售櫥窗同場館當海報用。兩款都係 13 頁設計（封面+12 個月），金屬圈掛牆翻頁順暢，騎馬釘版輕身啲方便寄。每個月背面可以印企業資訊。</p>
<h2>座檯曆尺寸同底座點揀？</h2>
<p>兩個主力規格：150×180mm（慳位，適合人多擠迫的櫃面）同 200×230mm（每頁品牌位更多）。都係三角座架 + 1-2mm 灰板底座，企得穩陣。超短單可以揀單張帳蓬式座檯卡。</p>
<h2>卡、迷你同磁石規格</h2>
<p>年曆卡 100×150mm 係經典夾寄規格——明信片尺寸、輕身、量大單價平。迷你年曆 85×55mm 跟信用卡一樣大，入錢包放衫袋，活動派發首選。磁石年曆 A5/A4 面材配 0.5mm 或者 1mm 軟磁片——0.5mm 適合平面雪櫃門，1mm 手感更紮實；圓角裁切係標準配置。</p>
<h2>紙重同裝訂對照</h2>
<table><thead><tr><th>部位</th><th>選項</th><th>備註</th></tr></thead><tbody>
<tr><td>面紙</td><td>150-300g 銅版/啞粉/相紙/合成紙</td><td>量產用銅版、攝影用相紙</td></tr>
<tr><td>底板</td><td>1-2mm 灰板或卡紙</td><td>座檯座架、相框底座</td></tr>
<tr><td>裝訂</td><td>金屬圈/騎馬釘/膠裝/單張</td><td>金屬圈掛牆平服、騎馬釘輕身</td></tr>
<tr><td>加工</td><td>燙金年份/局部UV/過膠/圓角</td><td>禮品升級；磁石款標準圓角</td></tr>
</tbody></table>
<h2>月曆印刷幾多錢？</h2>
<p>本頁所有尺寸 <strong>1 本起印，HK$3-8/本</strong>（按尺寸、紙重、工藝浮動），大批量轉柯式單價更平。30 秒 AI 報價即時計價：尺寸 + 紙重 + 加工 + 數量一次過報。</p>
<h2>2027 檔案幾時要鎖定？</h2>
<p>Q4 係旺季。8-9 月定稿、<strong>10 月底前確認</strong>，生產同配送先趕得切送禮檔期；遲落單就要同紙價同排期鬥搶。</p>
<h2>常見問題</h2>
<p><strong>Q1：標準掛牆月曆尺寸係幾多？</strong><br/>A3（297×420mm）最常見；高曝光牆面用 A2（420×594mm）。</p>
<p><strong>Q2：座檯月曆標準尺寸？</strong><br/>150×180mm 同 200×230mm，都配座架底座。</p>
<p><strong>Q3：磁石月曆用幾厚磁石？</strong><br/>0.5mm 或者 1mm 軟磁片，A5/A4 面材。</p>
<p><strong>Q4：可以訂做尺寸嗎？</strong><br/>可以，任何尺寸先免費核對再裁切生產。</p>
<p><strong>Q5：大尺寸月曆解像度要幾多？</strong><br/>觀看距離 100-150dpi 已足夠清晰，近距離細節建議 200dpi。</p>
<p><a href="https://wa.me/8619880851334?text=%E6%83%B3%E5%95%8F%E6%9C%88%E6%9B%86%E5%B0%BA%E5%AF%B8%E8%A6%8F%E6%A0%BC%E5%90%8C%E5%A0%B1%E5%83%B9#src=blog-calendar-sizes-2027&sku=wall-calendars" target="_blank" rel="noopener noreferrer"><strong>WhatsApp 查詢月曆規格 →</strong></a>　或用 <a href="/zh-hk/quote/">30 秒 AI 報價</a>。</p>`,
'ja': `<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ クイック回答 (40秒で読めます)</p><p>2027 カレンダーサイズ一覧：<strong>卓上 150×180 / 200×230mm</strong>（三角スタンド）、<strong>壁掛け A3 297×420mm / A2 420×594mm</strong>（13ページ+リング綴じ）、<strong>カード 100×150mm</strong>、<strong>ミニ 85×55mm</strong>（カードサイズ）、<strong>マグネット A5/A4 + 0.5/1mm</strong>。全タイプ<strong>1部から、1冊約50円（HK$3-8）</strong>。尺寸表は以下。</p></div>
<p>2027年カレンダーのサイズ早見表。タイプごとの正確な寸法・用紙・製本オプションを一覧化しました。発注仕様の確認やデザイン入稿前のチェックにご利用ください。</p>
<h2>カレンダーサイズ総覧表</h2>
<table><thead><tr><th>タイプ</th><th>サイズ</th><th>構造</th><th>主な用途</th></tr></thead><tbody>
<tr><td><a href="/ja/product/desk-calendars/">卓上カレンダー</a></td><td>150×180 / 200×230mm</td><td>三角スタンド+1-2mm灰板</td><td>オフィス・レジ</td></tr>
<tr><td><a href="/ja/product/wall-calendars/">壁掛けカレンダー</a></td><td>A3 297×420 / A2 420×594mm</td><td>13ページ+リング綴じ</td><td>壁面・会議室・ギフト</td></tr>
<tr><td>カレンダーカード</td><td>100×150mm</td><td>フラットカード</td><td>DM同封・大量配布</td></tr>
<tr><td><a href="/ja/product/mini-calendars/">ミニカレンダー</a></td><td>85×55mm</td><td>中綴じ/カット</td><td>財布・イベント</td></tr>
<tr><td><a href="/ja/product/photo-frame-calendars/">フォトフレーム</a></td><td>A5 148×210 / A4 210×297mm</td><td>硬紙板スタンド</td><td>家庭・デスク</td></tr>
<tr><td><a href="/ja/product/magnetic-calendars/">マグネットカレンダー</a></td><td>A5 / A4</td><td>0.5/1mm磁石シート</td><td>冷蔵庫・ホワイトボード</td></tr>
</tbody></table>
<h2>壁掛けはA3？A2？</h2>
<p>A3（297×420mm）は標準オフィス判。月グリッド+メモ欄が収まり、郵送も軽量。A2（420×594mm）は視覚面積が倍で、店舗ウィンドウや会場のポスター代わりに。どちらも13ページ構成（表紙+12ヶ月）で、リング綴じなら壁掛け時に平らにフィット。裏面に会社情報を印刷可能。</p>
<h2>用紙・製本オプション</h2>
<table><thead><tr><th>部位</th><th>選択肢</th><th>メモ</th></tr></thead><tbody>
<tr><td>面材</td><td>150-300g コート/マット/写真紙/合成紙</td><td>量産はコート、写真は写真紙</td></tr>
<tr><td>台座</td><td>1-2mm灰板またはカートン</td><td>卓上スタンド・フォトフレーム</td></tr>
<tr><td>製本</td><td>リング/中綴じ/無線綴じ/カット</td><td>リングは平貼り、中綴じはスリム</td></tr>
<tr><td>加工</td><td>箔押し年号/局部UV/ラミネート/丸角</td><td>ギフト向上。マグネットは丸角標準</td></tr>
</tbody></table>
<h2>価格と発注タイミング</h2>
<p>全サイズ<strong>1部から、1冊あたり約50円（HK$3-8）</strong>。サイズ・用紙・加工で変動、数量まとめるとオフセットがお得。Q4は繁忙期——8-9月にデザイン確定、<strong>10月底までに発注確定</strong>でギフトシーズンに間に合わせましょう。</p>
<h2>よくある質問</h2>
<p><strong>Q1：標準的な壁掛けサイズは？</strong><br/>A3（297×420mm）が最一般的。高視認性ならA2。</p>
<p><strong>Q2：卓上カレンダーのサイズは？</strong><br/>150×180mmと200×230mm、どちらもスタンド付き。</p>
<p><strong>Q3：マグネットの厚さは？</strong><br/>0.5mmまたは1mmのソフト磁石シート。</p>
<p><strong>Q4：特大サイズの解像度は？</strong><br/>視認距離で100-150dpiで十分、至近ディテールは200dpi。</p>
<p><a href="https://wa.me/8619880851334?text=%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AE%E3%82%B5%E3%82%A4%E3%82%BA%E4%BB%95%E6%A7%98%E3%82%92%E7%9B%B8%E8%AB%87%E3%81%97%E3%81%9F%E3%81%84#src=blog-calendar-sizes-2027&sku=wall-calendars" target="_blank" rel="noopener noreferrer"><strong>WhatsAppで仕様相談 →</strong></a>　または <a href="/ja/quote/">30秒AI見積り</a>へ。</p>`,
},
};

// ---------- ① 冲突断言 ----------
for (const slug of [B5, B6]) {
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const j = JSON.parse(fs.readFileSync(path.join(REPO, `src/data/blog-data/${loc}.json`), 'utf8'));
    if (j[slug]) console.log(`note: ${slug} 已在 ${loc}.json (上次部分运行, 幂等覆盖)`);
  }
  const bp = fs.readFileSync(path.join(REPO, 'src/data/blog-posts.ts'), 'utf8');
  if (bp.includes(`'${slug}'`)) { console.error(`FAIL: ${slug} 已存在于 blog-posts.ts`); process.exit(2); }
}
// ---------- ② 标题当量 + meta desc 长度断言 ----------
for (const slug of [B5, B6]) {
  for (const loc of ['zh', 'en', 'ja']) {
    const e = equiv(META[slug][loc].title);
    if (e < 50 || e > 57) { console.error(`FAIL: ${slug}/${loc} title 当量 ${e} (需 50-57): ${META[slug][loc].title}`); process.exit(2); }
    const dl = META[slug][loc].desc.length;
    if (dl < 138 || dl > 163) { console.error(`FAIL: ${slug}/${loc} desc 长度 ${dl} (需 138-163)`); process.exit(2); }
    console.log(`OK ${slug}/${loc}: title=${e} desc=${dl}`);
  }
}
// ---------- ③ 写入 blog-data JSON ×3 ----------
for (const loc of ['zh-hk', 'en', 'ja']) {
  const fp = path.join(REPO, `src/data/blog-data/${loc}.json`);
  const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
  for (const slug of [B5, B6]) {
    const m = META[slug][loc === 'zh-hk' ? 'zh' : loc];
    j[slug] = { slug, title: m.title, description: m.desc, date: DATE, category: loc === 'zh-hk' ? '月曆印刷' : loc === 'en' ? 'Calendar Printing' : 'カレンダー印刷', content: CONTENT[slug][loc], lastUpdated: DATE };
  }
  fs.copyFileSync(fp, path.join(BAK, `${loc}.json.before`));
  fs.writeFileSync(fp, JSON.stringify(j, null, 2) + '\n', 'utf-8');
  console.log(`written ${loc}.json`);
}
// ---------- ④ 注册 blog-posts.ts ----------
const bpPath = path.join(REPO, 'src/data/blog-posts.ts');
let bp = fs.readFileSync(bpPath, 'utf8');
const constBlock = `
// 2026-10-16 v2 方案 §4: B5 企業月曆訂製速查 (zh-lead, 月曆印刷 102 展承接) + B6 calendar sizes fact-table (en AEO 摘要目标)
const dcCorporateCalendar2027: BlogPostMeta = {
  slug: '${B5}',
  categoryKey: '${META[B5].categoryKey}',
  source: 'daily',
  date: '${DATE}',
  title: {
    'zh-hk': ${JSON.stringify(META[B5].zh.title)},
    en: ${JSON.stringify(META[B5].en.title)},
    ja: ${JSON.stringify(META[B5].ja.title)},
  },
  excerpt: {
    'zh-hk': ${JSON.stringify(META[B5].zh.excerpt)},
    en: ${JSON.stringify(META[B5].en.excerpt)},
    ja: ${JSON.stringify(META[B5].ja.excerpt)},
  },
  targetKeywords: ${JSON.stringify(META[B5].targetKeywords, null, 2).replace(/"([a-zA-Z]+)":/g, "'$1':").replace(/"/g, "'")},
};

const dcCalendarSizesReference: BlogPostMeta = {
  slug: '${B6}',
  categoryKey: '${META[B6].categoryKey}',
  source: 'daily',
  date: '${DATE}',
  title: {
    'zh-hk': ${JSON.stringify(META[B6].zh.title)},
    en: ${JSON.stringify(META[B6].en.title)},
    ja: ${JSON.stringify(META[B6].ja.title)},
  },
  excerpt: {
    'zh-hk': ${JSON.stringify(META[B6].zh.excerpt)},
    en: ${JSON.stringify(META[B6].en.excerpt)},
    ja: ${JSON.stringify(META[B6].ja.excerpt)},
  },
  targetKeywords: ${JSON.stringify(META[B6].targetKeywords, null, 2).replace(/"([a-zA-Z]+)":/g, "'$1':").replace(/"/g, "'")},
};

`;
const anchor = 'export const blogPosts: BlogPostMeta[] = [';
if (!bp.includes(anchor)) { console.error('FAIL: blogPosts anchor 未找到'); process.exit(2); }
bp = bp.replace(anchor, constBlock + anchor);
const lastRef = '  // 2026-07-04 v2: 純文字深度博客上線';
if (!bp.includes(lastRef)) { console.error('FAIL: array 注释锚未找到'); process.exit(2); }
// 在数组末尾追加注册 (找 blogPosts 数组的闭合 ]; — 从 anchor 起第一个 "\n];")
const arrStart = bp.indexOf(anchor);
const arrEnd = bp.indexOf('\n  ];', arrStart);
if (arrEnd < 0) { console.error('FAIL: blogPosts 数组闭合未找到'); process.exit(2); }
bp = bp.slice(0, arrEnd) + '\n  dcCorporateCalendar2027,\n  dcCalendarSizesReference,' + bp.slice(arrEnd);
fs.copyFileSync(bpPath, path.join(BAK, 'blog-posts.ts.before'));
fs.writeFileSync(bpPath, bp, 'utf-8');
console.log('blog-posts.ts registered: dcCorporateCalendar2027 + dcCalendarSizesReference');
console.log('ALL PASS');
