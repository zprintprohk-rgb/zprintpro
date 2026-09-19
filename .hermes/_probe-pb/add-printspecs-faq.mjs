/**
 * B3 · print-specifications-reference-guide-2026 × 3 补正文 FAQ (K3 2026-09-19 授权, 五要件)
 * 事实源 = 该篇**已发布**的内嵌 FAQPage JSON-LD (4 组) ⇒ 零新增数字、零编造
 * ⚠️ 该篇内嵌版为 4 组 < 五要件下限 5 组 ⇒ 按同篇事实拆出第 2 组(CMYK/Pantone 拆分), 共 **5 组**
 * 词数口径: en 40-80 词 (区间 40-80) / zh-hk·ja 60-120 字 / 首句 answer-first (en ≤12 词, CJK ≤21 字)
 */
import fs from 'fs';

const APPLY = process.argv.includes('--apply');
const SLUG = 'print-specifications-reference-guide-2026';

const FAQ = {
  'zh-hk': [
    ['A5 同 A6 差幾多?邊個更大?', 'A5 嘅尺寸係 148 × 210 mm,A6 係 105 × 148 mm,所以 A5 更大。A5 面積剛好係 A6 的 2 倍(長邊 1.41 倍,面積 1.98 倍)。A5 適合 DM 單張、雜誌內頁同摺頁 DM;A6 適合明信片、小冊子內頁同售貨員卡片。100 張起印 HK$0.50-2/張,以 CMYK 雙面 157g 銅版紙計算。'],
    ['印刷一定要用 CMYK 嗎?RGB 可以嗎?', '一定要用 CMYK,RGB 唔可以直接印。CMYK 係青、洋紅、黃、黑 4 色減色混色,係印刷標準;RGB 係螢幕 3 色加色,直接印出嚟會偏藍紫,同螢幕所見差 30-40%。AI / ID / PSD 輸出前必須切換 CMYK 模式,配合 300 DPI 同 3mm 出血。'],
    ['Pantone 專色幾時要用?加幾多錢?', '要品牌色統一就用 Pantone 專色。Pantone 專色適用於品牌色跨批次、跨材質保持一致,例如連鎖品牌的標準色。附加費為單色 HK$0.30-0.80/張,視數量同色數而定。一般彩色圖片同漸變用 CMYK 四色已足夠,唔需要另外加專色。'],
    ['數碼同柯式印刷邊個慳錢?', '睇數量決定:100-300 張揀數碼,500 張以上揀柯式。數碼印刷 100-500 張短版,每張 HK$0.50-3,無製版費,24-48 小時交貨;柯式印刷 500-50,000+ 張長版,每張 HK$0.20-1.50,另加製版費 HK$300-800,5-7 天交貨。500 張以上轉柯式,每張可以平 30-50%,所以數量一過 500 就應該轉柯式。'],
    ['印刷文件 DPI 同出血要幾多?', '標準係 300 DPI 加 3mm 出血,再加 3mm 安全區。完整規格係:圖片 300 DPI、出血 3mm、安全區 3mm、CMYK 色彩模式、以及 PDF/X-1a:2001 輸出格式。圖片低於 300 DPI,印出嚟會模糊;出血不足 3mm,裁切後會出現白邊;用 RGB 色彩,成品會偏藍紫。智印港提供 30 秒 AI 免費文件規格檢測,上載檔案即可即時看到 DPI、出血同色彩模式三項檢測結果,可以一次過搞掂,唔使來回試印。'],
  ],
  en: [
    ['What is the size difference between A5 and A6?', 'A5 is 148 × 210 mm; A6 is 105 × 148 mm. A5 has 2x the area of A6. A5 suits flyers, magazine inner pages and tri-fold brochures; A6 suits postcards, booklet inner pages and loyalty cards. Printing starts at 100 pieces at HK$0.50-2/sheet on CMYK double-sided 157gsm coated paper.'],
    ['Must print files use CMYK, or can I send RGB?', 'Print files must use CMYK, because RGB cannot be printed directly. CMYK is the four-colour subtractive mix of cyan, magenta, yellow and black and is the printing standard; RGB is a three-colour additive screen space, so printing it directly shifts 30-40% off what you see, usually too blue or purple. Before exporting from AI, ID or PSD, switch to CMYK with 300 DPI and 3mm bleed.'],
    ['When do I need Pantone spot colours and what do they cost?', 'Use Pantone spot colours when brand colour consistency matters. Pantone keeps one brand colour identical across batches and across materials, which is why chain brands rely on it. The surcharge is HK$0.30-0.80 per sheet in a single colour, depending on volume and the number of colours. Full-colour images and gradients are fine in CMYK four-colour, so no spot colour is needed.'],
    ['Digital or offset printing — which saves money?', 'It depends on quantity. Choose digital for 100-300 pieces and offset above 500. Digital covers short runs of 100-500 pieces at HK$0.50-3 per sheet with no plate fee and 24-48 hour delivery. Offset covers long runs of 500-50,000+ at HK$0.20-1.50 per sheet plus a HK$300-800 plate fee and 5-7 day delivery. Above 500 pieces offset saves 30-50% per sheet.'],
    ['What DPI and bleed do print files need?', 'The standard is 300 DPI and 3mm bleed. The full specification is 300 DPI images, 3mm bleed, 3mm safe zone, CMYK colour and PDF/X-1a:2001 export. Images below 300 DPI print blurry, insufficient bleed leaves a white edge after trimming, and RGB colour shifts blue or purple. ZprintPro provides a free 30-second AI file spec check.'],
  ],
  ja: [
    ['A5 と A6 のサイズ差は?どちらが大きい?', 'A5 は 148 × 210 mm、A6 は 105 × 148 mm です。A5 の面積は A6 のちょうど 2 倍(長辺 1.41 倍、面積 1.98 倍)になります。A5 は DM 単票・雑誌内ページ・三つ折り DM に、A6 はポストカード・冊子内ページ・ショップカードに適します。100 枚から HK$0.50-2/枚、CMYK 両面 157g コート紙での価格です。'],
    ['印刷は CMYK 必須ですか?RGB ではだめですか?', 'CMYK が必須で、RGB は直接印刷できません。CMYK はシアン・マゼンタ・イエロー・ブラックの 4 色減法混色で印刷の標準です。RGB は画面用の 3 色加法混色のため、そのまま印刷すると青紫に寄り、画面との差は 30-40% になります。AI・ID・PSD からの書き出し前に CMYK へ切り替え、300 DPI と 3mm 塗り足しを設定してください。'],
    ['Pantone スポットカラーはいつ必要で、いくらかかりますか?', 'ブランドカラーの統一が必要なときに使います。Pantone は同一ブランド色をロット間・素材間で一致させるため、チェーン店などが採用しています。追加費用は単色で HK$0.30-0.80/枚で、数量と色数により変わります。フルカラー画像やグラデーションは CMYK 4 色で十分なため、スポットカラーは不要です。'],
    ['デジタル印刷とオフセット印刷、どちらが安いですか?', '数量で決まります。100-300 枚はデジタル、500 枚以上はオフセットです。デジタルは 100-500 枚の短版で HK$0.50-3/枚、製版費不要、24-48 時間納品です。オフセットは 500-50,000 枚以上の長版で HK$0.20-1.50/枚に製版費 HK$300-800 が加わり、5-7 日納品です。500 枚以上なら 1 枚あたり 30-50% 安くなります。'],
    ['印刷ファイルの DPI と塗り足しはどれくらい必要ですか?', '標準は 300 DPI と 3mm の塗り足し、さらに 3mm の安全領域です。規格は画像 300 DPI、塗り足し 3mm、安全領域 3mm、CMYK 色、PDF/X-1a:2001 書き出しです。300 DPI 未満は印刷がぼやけ、塗り足し不足は断裁後に白辺が出て、RGB は青紫にずれます。ZprintPro は 30 秒の AI ファイル規格チェックを無料で提供します。'],
  ],
};

let issues = 0;
for (const loc of ['zh-hk', 'en', 'ja']) {
  const p = `src/data/blog-data/${loc}.json`;
  const data = JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
  const entry = data[SLUG];
  if (!entry) { console.log(`🔴 ${loc}: 无该 slug`); issues++; continue; }
  const before = entry.content;
  if (/<p><strong>Q[0-9]+:/.test(before)) { console.log(`✅ ${loc}: 已含目标格式 (幂等跳过)`); continue; }

  const block = '\n' + FAQ[loc].map(([q, a], i) => `<p><strong>Q${i + 1}: ${q}</strong><br/>A: ${a}</p>`).join('\n') + '\n';
  const lastDiv = before.lastIndexOf('</div>');
  const divStart = before.lastIndexOf('<div', lastDiv);
  const insertAt = divStart >= 0 ? divStart : lastDiv;
  const out = before.slice(0, insertAt) + block + before.slice(insertAt);

  if (out.replace(block, '') !== before) { console.log(`🔴 ${loc}: 断言失败, abort`); issues++; continue; }
  if (out.length !== before.length + block.length) { console.log(`🔴 ${loc}: 长度不守恒, abort`); issues++; continue; }

  console.log(`\n${APPLY ? '写入' : 'DRY-RUN'} ${loc}: content ${before.length} → ${out.length} (+${block.length}) | ${FAQ[loc].length} 组`);
  FAQ[loc].forEach(([q, a], i) => {
    const isCJK = /[\u4e00-\u9fff\u3040-\u30ff]/.test(a);
    const n = isCJK ? (a.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length : a.split(/\s+/).filter(Boolean).length;
    const lo = isCJK ? 60 : 40; const hi = isCJK ? 120 : 80;
    const fs2 = a.split(/[。.！!?？]/)[0];
    const fw = isCJK ? (fs2.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length : fs2.split(/\s+/).filter(Boolean).length;
    const fHi = isCJK ? 21 : 12;
    const okL = n >= lo && n <= hi; const okF = fw >= 3 && fw <= fHi;
    console.log(`   Q${i + 1}: 答案=${n}${isCJK ? '字' : '词'} [${lo}-${hi}] ${okL ? '✅' : '⚠️'} | 首句=${fw} ${okF ? '✅' : '⚠️'}`);
    if (!okL || !okF) issues++;
  });
  if (APPLY) { entry.content = out; fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8'); }
}
console.log(`\n模式=${APPLY ? 'APPLY' : 'DRY-RUN'} | 五要件异常=${issues}`);
