/**
 * v9.3 任务 K (P0): 食品包装意图澄清 (A/B/C → 选 B 意图澄清卡位)
 * 落点:
 *  1) src/lib/seo.ts — packaging PLP title + description (3 locale), 首屏明确「紙質食品包裝」
 *  2) src/app/[locale]/category/[slug]/page.tsx — customH1Map['packaging'] H1 (3 locale)
 *  3) src/data/sku-seo-data.ts — food-boxes (食品 PDP) seo title/h1/description + FAQ 加「做唔做膠袋」
 *  4) src/data/category-seo-content.ts — packaging PLP faq 加同一 FAQ (3 locale)
 *  5) src/data/product-faqs.ts — packagingBoxesFAQs 加同一 FAQ (PDP FAQ + schema, 3 locale)
 * 原则: 不改 slug / 不砍页; 文案为新增意图澄清, 事实与业务边界以 §11 主营（纸质）为准
 */
import fs from 'fs';

const ROOT = 'F:\\zprintpro-nextjs';
let total = 0;
function rep(file: string, pairs: Array<[string, string]>) {
  const p = `${ROOT}\\${file}`;
  let t = fs.readFileSync(p, 'utf8');
  for (const [from, to] of pairs) {
    const n = t.split(from).length - 1;
    if (n !== 1) { console.log(`  ❌ [${file}] 匹配 ${n} 次, 跳过: ${from.slice(0, 70)}`); continue; }
    t = t.replace(from, to);
    total++;
    console.log(`  ✅ [${file}] ${from.slice(0, 46)}… → ${to.slice(0, 46)}…`);
  }
  fs.writeFileSync(p, t, 'utf8');
}

// 1) PLP title + description
rep('src/lib/seo.ts', [
  ["'zh-hk': '紙盒訂製 100個起 | 食品包裝盒 + 結構設計 + 燙金 + DHL 全球 | 智印港',",
   "'zh-hk': '紙質食品包裝盒印刷 100個起 | 食品紙盒/紙袋 | 智印港',"],
  ["en: 'Custom Packaging Boxes from $0.85 | 100 MOQ + Free 3D + Made for USA | ZprintPro',",
   "en: 'Paper Food Packaging Boxes from $0.85 | Food-Safe Box/Bag, Made for USA | ZprintPro',"],
  ["ja: 'クラフト紙 パッケージ印刷 100個〜 | 構造設計 + 箔押し + 全国送料 + 短納期 | ZprintPro',",
   "ja: '紙製食品パッケージ印刷 100個〜 | 食品用紙箱・紙袋・耐油カード | ZprintPro',"],
  ["'zh-hk': '包裝盒訂製 100 個起印，HK$1.5 起/個。食品包裝 / 化妝品包裝 / 茶葉 / 電子產品通用，結構設計 / 燙金 / UV / 啞膠亮膜 / 內襯 / 開窗。免費 3D 打稿 6 小時，DHL 全球 2-4 天配送，滿 HK$500 順豐香港免運費。WhatsApp 30 秒即時報價，ISO 9001 + FSC 認證。',",
   "'zh-hk': '紙質食品包裝訂製 100 個起印，HK$1.5 起/個。食品紙盒 / 食品紙袋 / 防油紙卡（FDA 食品級 + FSC 認證紙，唔做膠袋）；亦可做化妝品 / 茶葉 / 電子產品包裝，結構設計 / 燙金 / UV / 內襯 / 開窗。免費 3D 打稿 6 小時，DHL 全球 2-4 天，滿 HK$500 順豐香港免運。WhatsApp 30 秒即時報價，ISO 9001 認證。',"],
  ["en: 'Custom packaging boxes from $0.85, 100 MOQ. Food safe / cosmetic / tea / electronics packaging, structural design + foil + UV + matte/glossy + inserts + windows. Free 3D proof in 6 hours, DHL 2-4 day USA delivery, free shipping $99+. Made for USA, perfect for e-commerce and retail brands. 30-second AI quote, ISO 9001 + FSC certified.',",
   "en: 'Paper food packaging from $0.85, 100 MOQ — food-safe paper boxes / paper bags / greaseproof cards (FDA food-grade + FSC certified paper, no plastic bags); also cosmetic / tea / electronics packaging. Structural design + foil + UV + inserts + windows. Free 3D proof in 6 hours, DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote, ISO 9001 + FSC certified.',"],
  ["ja: 'パッケージ箱印刷 100 個から、¥120〜。食品対応 / 化粧品 / 茶 / 電子機器向け、構造設計・箔押し・UV・マット/光沢・内装・窓開け。無料 3D 校正 6 時間、日本全国 DHL 2-4 日配送、沖縄・北海道対応。30 秒 AI 無料見積もり、ISO 9001 認証品質。',",
   "ja: '紙製食品パッケージ印刷 100 個から、¥120〜。食品用紙箱 / 紙袋 / 耐油紙カード（FDA 適合 + FSC 認証紙、ビニール袋は非対応）；化粧品 / 茶 / 電子機器向けも対応。構造設計・箔押し・UV・内装・窓開け。無料 3D 校正 6 時間、日本全国 DHL 2-4 日配送、沖縄・北海道対応。30 秒 AI 無料見積もり。',"],
]);

// 2) PLP H1
rep('src/app/[locale]/category/[slug]/page.tsx', [
  ["'zh-hk': '香港紙盒訂製 食品包裝 — 禮盒 / 化妝品盒 / 食品盒 / 快遞盒 / 天地蓋盒',",
   "'zh-hk': '香港紙質食品包裝訂製 — 食品紙盒 / 食品紙袋 / 防油紙卡 / 禮盒 / 彩盒',"],
  ["'en': 'Custom Packaging Boxes Made in USA · 100 MOQ Free Shipping over $99 · Small Batch Custom Boxes',",
   "'en': 'Paper Food Packaging Made for USA · Food-Safe Paper Boxes / Bags / Greaseproof Cards',"],
  ["'ja': 'クラフト紙 パッケージ印刷 カスタム — ギフト / 化粧 / 食品 / メール便 / 組み立て',",
   "'ja': '紙製食品パッケージ印刷 — 食品用紙箱 / 紙袋 / 耐油紙カード / ギフト箱',"],
]);

// 3) 食品 PDP (food-boxes) seo + FAQ
rep('src/data/sku-seo-data.ts', [
  ['"title": "食品包裝印刷 禮盒訂製 100個起 HK$4起 100起印 | 智印港",',
   '"title": "紙質食品包裝印刷 100個起 | 食品紙盒/防油紙卡 | 智印港",'],
  ['"h1": "食品包裝印刷訂製｜FDA 級材質・100 個起印・3-5 天交貨",',
   '"h1": "紙質食品包裝印刷訂製｜食品紙盒・食品紙袋・防油紙卡｜FDA 食品級",'],
  ['"title": "Custom Food Packaging Boxes Clear + Foil | ZprintPro",',
   '"title": "Paper Food Packaging Printing 100+ | Food-Safe Boxes & Bags | ZprintPro",'],
  ['"h1": "Food Boxes 100+ | Food-Grade | ZprintPro",',
   '"h1": "Paper Food Packaging 100+ | Food-Grade Paper Boxes, Bags & Greaseproof Cards",'],
  ['"title": "食品パッケージ印刷 透明・箔押し・100枚〜 | ZprintPro",',
   '"title": "紙製食品パッケージ印刷 100個〜 | 食品用紙箱・紙袋・耐油カード | ZprintPro",'],
]);

console.log(`\n替换完成: ${total} 处`);
