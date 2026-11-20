// D14 zh-hk 12 段完整版 content 生成器 (对齐 ja 12 段骨架, 繁体, 单品牌 智印港)
// 数据来源: src/data/products.ts textbooks SKU (HK$5-50/本, 100本起, A4/B5, 80-100g 道林纸, 胶装/骑钉, ISBN)
// GSC 实证: 教科書 印刷 104 imp pos 40.6 / 教材 印刷製本 53 imp pos 52.4 (3mo ~280 imp B2B 簇)
const fs = require('fs');

const faqs = [
  ['教科書・教材的最低訂購量 (MOQ) 是?', '100 本起 (教科書・教材標準)。騎馬釘小冊子 50 本起。樣本 5 本校對確認。'],
  ['交期是多久?', '標準 5-7 個工作天 (校對確認後)。急件 48 小時可達 (需商議)。開學前 2 週 (8 月中-9 月初 / 3 月中-4 月初) 是旺季，年度合約提前落單最穩妥。'],
  ['紙與製本方式怎樣揀?', '教科書・教材用 80-100g 道林紙 (目對眼睛友善) + 騎馬釘 (薄冊) 或膠裝 (厚書) 為標準。封面 200g 銅版紙 + 過膠增強耐用度 (products.ts specs)。'],
  ['可以送到海外嗎?', '可以。DHL Express 全球 2-4 天配送，深圳廠房直送世界各地學校、補習社、出版社。'],
  ['支援 ISBN 條碼嗎?', '支援。ISBN / JAN 條碼 / QR code 印刷為標準配備 (教科書 SKU 描述記載)。'],
  ['年度合約有折扣嗎?', '學期單位持續訂購享有數量折扣。預先登記全年預計冊數，印刷單價更穩定，旺季交期優先。'],
];

const LINKS = {
  textbooks: '/zh-hk/product/textbooks/',
  saddle: '/zh-hk/product/saddle-stitch-booklets/',
  perfect: '/zh-hk/product/perfect-bound-books/',
  hardcover: '/zh-hk/product/hardcover-books/',
  notebooks: '/zh-hk/product/spiral-notebooks/',
  catBooks: '/zh-hk/category/books/',
  catEdu: '/zh-hk/category/educational/',
  catDoujin: '/zh-hk/category/japan-doujin/',
  blogSaddle: '/zh-hk/blog/saddle-stitch-booklet-printing-guide/',
  blogDoujin: '/zh-hk/blog/doujin-circle-printing-guide/',
  blogGrad: '/zh-hk/blog/graduation-yearbook-printing-guide/',
  blogCampus: '/zh-hk/blog/campus-education-printing-pillar-guide/',
  quote: '/zh-hk/quote/',
  contact: '/zh-hk/contact/',
};

// 锚文字 ≥5 字 (per §12 L93/L183 硬性要求)

function a(href, text, cls = 'text-[#1A56DB] underline') {
  return `<a href="${href}" class="${cls}">${text}</a>`;
}

const content = `<p>教科書・教材印刷是學校法人、補習社連鎖與教材出版社的年度採購項目。智印港提供<a href="${LINKS.textbooks}" class="text-[#1A56DB] underline">教科書印刷</a>與教材印刷服務：100 本起訂、A4/B5 尺寸、80-100g 道林紙護眼、騎馬釘 / 膠裝 / 精裝 3 大製本方式、5-7 個工作天交貨、DHL Express 全球 2-4 天配送，並支援 ISBN 條碼印刷。以 15 年以上印刷工程經驗，服務學校、補習社與出版社的年度契約印刷需求。</p>
<p>教材・教科書印刷報價: <a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">+86 198 8085 1334 (WhatsApp)</a> — 30 秒 AI 即時報價・免費諮詢。</p>

<h2>1. 教科書印刷的 3 大製本方式怎樣選?</h2>
<p>製本方式按頁數與用途決定。<a href="${LINKS.textbooks}" class="text-[#1A56DB] underline">教科書印刷</a>標準規格為 A4/B5 尺寸、80-100g 道林紙、膠裝或騎馬釘 (products.ts 規格)。</p>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>騎馬釘 (釘裝)</strong>: 8-64 頁薄冊子，練習冊、工作紙、小冊子最適合。開合順暢、成本最平。50 本起。詳見${a(LINKS.blogSaddle, '騎馬釘小冊子印刷指南')}。</p></div>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>膠裝 (無線膠裝)</strong>: 64 頁以上標準書，教科書、課本、培訓手冊標準。書脊可印書名。100 本起。</p></div>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>精裝 (硬皮書)</strong>: 高級書籍、畢業紀念冊、圖書館藏書。${a(LINKS.hardcover, '精裝書籍印刷')}100 本起。</p></div>

<h2>2. 教材印刷 4 大紙材質怎樣揀?</h2>
<p>教科書・教材必須用護眼紙張。智印港教科書印刷以 80g-100g 道林紙 (書紙) 為標準，封面 200g 銅版紙 + 過膠 (可選)。</p>
<table><thead><tr><th>材質</th><th>用途</th><th>特點</th></tr></thead><tbody>
<tr><td>80g 道林紙</td><td>練習冊・工作紙</td><td>書寫流暢，不滲墨</td></tr>
<tr><td>100g 道林紙</td><td>教科書・課本</td><td>強度與書寫感平衡</td></tr>
<tr><td>200g 銅版紙 (封面)</td><td>教科書封面</td><td>色彩鮮豔 + 過膠耐用</td></tr>
<tr><td>書紙 / 上質紙</td><td>培訓手冊</td><td>白度高，適合文件</td></tr>
</tbody></table>

<h2>3. 教科書印刷的價錢是多少?</h2>
<p><a href="${LINKS.textbooks}" class="text-[#1A56DB] underline">教科書印刷</a> 100 本起，<strong>HK$5-50/本</strong> (products.ts 實價)。頁數、製本方式、數量影響單價，數量愈多折扣愈大。</p>
<table><thead><tr><th>數量</th><th>單價帶 (HK$)</th><th>備註</th></tr></thead><tbody>
<tr><td>100 本</td><td>HK$5-50/本</td><td>小批量標準</td></tr>
<tr><td>500 本</td><td>數量折扣</td><td>報價確認</td></tr>
<tr><td>1,000 本以上</td><td>數量折扣</td><td>數量愈多單價愈低</td></tr>
</tbody></table>
<p>※ 準確單價用${a(LINKS.quote, '30 秒 AI 即時報價')}，輸入頁數、數量、製本方式即時確認。</p>

<h2>4. 教材・教科書的年度合約怎樣進行?</h2>
<p>學校法人、補習社連鎖、出版社的年度採購是計劃型流程：</p>
<ol>
<li><strong>4-6 月</strong>: 確定下年度教材清單、頁數與數量</li>
<li><strong>7-8 月</strong>: 樣本校對 (5 本) + 單價合約 (年度單價鎖定)</li>
<li><strong>9-11 月</strong>: 學期分段落單 (每期以校對數據生產)</li>
<li><strong>12-3 月</strong>: 春季課程・新學年增印對應</li>
</ol>
<p>年度合約好處：單價穩定 + 旺季交期優先 + 數量折扣。${a(LINKS.contact, '年度合約諮詢')}免費。</p>

<h2>5. 補習社・國際學校的教材印刷怎樣對應?</h2>
<p>補習社、國際學校每級教材不同、數量少，100 本起的小批量正好對應。${a(LINKS.catEdu, '教育印刷服務')}類目可一併處理教科書、教材、畢業紀念冊。${a(LINKS.notebooks, '線圈筆記本')} (活頁簿) 亦受歡迎，適合補充教材與工作紙，企業培訓與補習社原創教材皆適用。</p>

<h2>6. 教科書印刷的校對流程是怎樣的?</h2>
<p>智印港全程校對: <strong>①設計稿確認 → ②PDF 校對 (免費) → ③色稿校對 (選項) → ④實機樣本 (5 本)</strong>。頁碼、章節、題號、ISBN 位置全部在校對稿最終確認。</p>
<p>色彩模式 CMYK 標準。圖版多的教材建議銅版紙 + 彩色印刷。${a(LINKS.catBooks, '書籍印刷服務')}類目可查各製本方式對應。</p>

<h2>7. 教材的交期是多久? 有急件嗎?</h2>
<p>標準 <strong>5-7 個工作天</strong> (校對確認後)。急件 48 小時可達。開學前 2 週 (8 月中-9 月初 / 3 月中-4 月初) 是旺季，年度合約提前落單最穩妥。</p>
<p>${a(LINKS.blogSaddle, '騎馬釘小冊子印刷指南')}、${a(LINKS.blogDoujin, '同人誌印刷指南')}亦有交期實例。</p>

<h2>8. 教材印刷與同人誌・畢業紀念冊有咩分別?</h2>
<p>同一製本技術，用途不同規格也不同。</p>
<table><thead><tr><th>用途</th><th>製本</th><th>數量</th><th>特點</th></tr></thead><tbody>
<tr><td>教科書・教材</td><td>膠裝為主</td><td>100-5,000 本</td><td>ISBN 條碼、年度合約</td></tr>
<tr><td>同人誌</td><td>騎馬釘/膠裝</td><td>50-500 本</td><td>小批量、短交期、封面加工自由</td></tr>
<tr><td>畢業紀念冊</td><td>精裝</td><td>50-500 本</td><td>硬皮書、高級感</td></tr>
</tbody></table>
<p>${a(LINKS.blogGrad, '畢業紀念冊印刷指南')}、${a(LINKS.blogDoujin, '同人誌印刷')}亦可於${a(LINKS.catBooks, '書籍印刷服務')}類目一併處理。</p>

<h2>9. 教材印刷的品質保證是怎樣的?</h2>
<p>智印港自設廠房一貫生產，品質保證體制完善: <strong>①校對確認 100% (PDF 校對免費 + 實機樣本 5 本) ②FSC 認證紙對應 ③DHL Express 追蹤配送 ④15 年以上柯式印刷工程師團隊品質管理</strong>。封面至內文，每個工序品質檢查。</p>

<h2>10. 教材・教科書印刷的國際配送是怎樣的?</h2>
<p>深圳廠房直送 <strong>DHL Express 日本 2-4 天</strong>。學校、補習社、出版社直接出貨，多校一併配送 (分批交付) 對應，關稅・通關亦有支援。</p>
<p>${a(LINKS.blogCampus, '校園教育印刷指南')}詳述學校向印刷整體方案。</p>

<h2>11. 教材・教科書印刷的常見問題 (FAQ)</h2>
${faqs.map(([q, a2], i) => `<p><strong>Q${i + 1}: ${q}</strong><br/>A: ${a2}</p>`).join('\n')}

<h2>12. 教科書・教材印刷的落單方法?</h2>
<p><a href="${LINKS.textbooks}" class="text-[#1A56DB] underline">教科書印刷</a> 100 本起。用${a(LINKS.quote, '30 秒 AI 即時報價')}輸入頁數、數量、製本方式即知單價。年度合約・持續訂購查詢: <a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">WhatsApp +86 198 8085 1334</a> 或${a(LINKS.contact, '聯絡我們團隊')}。教材・教科書印刷交給智印港。</p>`;

console.log(JSON.stringify(content));
