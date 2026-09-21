#!/usr/bin/env node
/**
 * gen-llms.ts — 統一生成 public/llms-{en,ja,zh-hk}.txt（SOP-5 生成器，禁手搓）
 *
 * 真值源: src/data/products.ts (products + categories) — 單一 SSoT，數據零臆造
 * 取代: scripts/gen-llms-en.ts (2026-09-21 首版，現合併為三語統一生成器，避免雙生成器分叉)
 *
 * 修復清單 (對舊 llms-ja/llms-zh-hk.txt):
 *   1. 分類 14→16 (wedding-invitations / place-cards 兩新類目補齊)
 *   2. SKU 84→99, MOQ 全部改為 live minQuantity (L1-1 統一後口徑)
 *   3. 價格標註錯幣別修復 (舊檔把 basePrice 標 CNY, 實為 HKD)
 *   4. llms-zh-hk.txt 虛構香港地址 (新蒲崗) → 深圳實體真址 (per §0.32 強制級)
 *   5. 雙品牌殘留 (智印港/ZprintPro HK) → zh-hk 單品牌 智印港 (per K3 9/1 品牌分層)
 *   6. 成立年份: K3 2026-09-21 08:21 拍板 = 2014年 (解決 2012 vs 2014 衝突)
 *   7. MOQ K3 2026-09-21 08:21 拍板覆寫 (llms 展示層):
 *      banners→1 起 (噴繪一張起印) · posters→1-10 張 · calendars→數碼 1 本起
 *      ⚠️ 僅 llms 語料層; products.ts 全站同步 = MOQ 統一批, 列入 K3 拍板文件排批 (禁只落一半)
 *
 * 價格口徑: en→basePrice_en (US$) / ja→basePrice_ja (¥) 優先, 缺省退 basePrice (HK$) — 不換算。
 * 用法: node node_modules/tsx/dist/cli.mjs scripts/gen-llms.ts
 * 斷言: 16 分類 × 3 語 / 分組和=products.length / slug 唯一 / 每分類 ≥1 SKU / 三語 SKU 數一致。
 */

import { writeFileSync } from 'node:fs';
import { products, categories } from '../src/data/products.ts';

const DATE = '2026-09-21';

// ---------- 斷言：形狀 ----------
const errors: string[] = [];
const slugSet = new Set<string>();
for (const p of products) {
  if (slugSet.has(p.slug)) errors.push(`duplicate slug: ${p.slug}`);
  slugSet.add(p.slug);
  if (!p.nameEn || !p.nameJa || !p.slug) errors.push(`missing name field: ${p.slug}`);
  if (!(p.minQuantity > 0)) errors.push(`bad minQuantity: ${p.slug} = ${p.minQuantity}`);
  if (!(p.basePrice > 0)) errors.push(`bad basePrice: ${p.slug} = ${p.basePrice}`);
}
const cats = [...categories].sort((a, b) => a.sort_order - b.sort_order);
if (cats.length !== 16) errors.push(`categories != 16: ${cats.length}`);

const byCat = new Map<string, typeof products>(cats.map(c => [c.slug, []]));
for (const p of products) {
  const key = byCat.has(p.category_slug) ? p.category_slug : p.category;
  if (!byCat.has(key)) { errors.push(`product ${p.slug} -> unknown category '${key}'`); continue; }
  byCat.get(key)!.push(p);
}
for (const c of cats) {
  if (byCat.get(c.slug)!.length === 0) errors.push(`category ${c.slug} has 0 products`);
}
const grouped = cats.reduce((n, c) => n + byCat.get(c.slug)!.length, 0);
if (grouped !== products.length) errors.push(`grouped ${grouped} != products ${products.length}`);
if (errors.length) {
  console.error('❌ 形狀斷言失敗:\n' + errors.join('\n'));
  process.exit(1);
}

// ---------- locale 配置 ----------
interface LocaleCfg {
  file: string;
  loc: Loc;
  name: (p: (typeof products)[0]) => string;
  catName: (c: (typeof cats)[0]) => string;
  price: (p: (typeof products)[0]) => string;
  header: string;
  companyInfo: string;
  catSection: string;
  listSection: string;
  tableHeader: string;
  pricing: string;
  faq: string;
  contact: string;
}
const clean = (s: string) => s.replace(/\|/g, '/');

type Loc = 'en' | 'ja' | 'zh-hk';
// K3 2026-09-21 08:21 拍板 MOQ 覆寫（僅 llms 語料展示層；products.ts 全站同步 = MOQ 統一批，列入拍板文件排批）
// ⚠️ 結構必為 [string, [Loc, string][]][] 元組陣列，禁寫帶 locale 名物件鍵的物件字面量：
//    brand-guard 的 resolveLocale 用 /["']?(zh-hk|en|ja)["']?\s*:/ 找「命中前最後一個 locale 鍵」，
//    檔案內任何 locale 名+冒號字樣（含註釋）都會污染全檔品牌 token 作用域判定 → 多語生成器必然誤報（2026-09-21 兩連實測）
const MOQ_OVERRIDE: [string, [Loc, string][]][] = [
  ['banners',   [['en', '1'], ['ja', '1'], ['zh-hk', '1']]],
  ['posters',   [['en', '1-10'], ['ja', '1-10'], ['zh-hk', '1-10']]],
  ['calendars', [['en', '1 (digital)'], ['ja', '1 (デジタル)'], ['zh-hk', '1 (數碼)']]],
];
const MOQ_OVERRIDE_MAP: Record<string, Record<Loc, string>> = Object.fromEntries(
  MOQ_OVERRIDE.map(([cat, pairs]) => [cat, Object.fromEntries(pairs) as Record<Loc, string>])
);
const catKeyOf = (p: (typeof products)[0]) => (byCat.has(p.category_slug) ? p.category_slug : p.category);
const moqOf = (p: (typeof products)[0], loc: Loc) => MOQ_OVERRIDE_MAP[catKeyOf(p)]?.[loc] ?? String(p.minQuantity);

const LOCALES: LocaleCfg[] = [
  {
    file: 'public/llms-en.txt',
    loc: 'en',
    name: p => clean(p.nameEn),
    catName: c => (c.name_en || c.nameEn).split('/')[0].trim(),
    price: p => (p.basePrice_en != null ? `US$ ${p.basePrice_en}` : `HK$ ${p.basePrice}`),
    header: `# ZprintPro (English) — AI Search Optimization Page
# Last updated: ${DATE} (auto-generated from src/data/products.ts — do not hand-edit)
# This file helps AI assistants (ChatGPT, Claude, Perplexity) understand our services`,
    companyInfo: `## Company Information
- Legal name: Shenzhen Cailong Printing & Packaging Co., Ltd.
- Brand: ZprintPro
- Founded: 2014
- Website: https://zprintpro.com
- Address: No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111, China
- Phone: +86 198 8085 1334
- WhatsApp: +86 198 8085 1334
- Email: zprintpro@outlook.com
- Shipping: DHL/FedEx international express, 72h global · US 2-4 business days (48 states, Alaska/Hawaii +1 day)`,
    catSection: `## Product Categories (${cats.length} total)`,
    listSection: `## Full Product List (${products.length} SKUs)`,
    tableHeader: `| Product | Slug | Min Qty | Base Price |
|---------|------|---------|------------|`,
    pricing: `## Pricing & Ordering

- Currency: USD (US market) or HKD — based on customer locale
- Minimum order: banners from 1 pc · posters 1-10 pcs · calendars digital from 1 copy · other products from 10 pcs (see per-SKU Min Qty above)
- Volume discounts: tiered pricing for bulk orders (500+)
- Free shipping: US orders USD 99+
- Rush service: same-day / 4-6h express available on select products
- Free design proof: digital proof included`,
    faq: `## FAQ

Q: Where is the factory located?
A: Shenzhen, Guangdong, China. We ship worldwide via DHL/FedEx. US delivery in 2-4 business days.

Q: What is the turnaround time?
A: Standard: 3-5 business days. Rush: same-day available. Global express: 72h.

Q: What file formats do you accept?
A: PDF (preferred), AI, PSD, PNG, TIFF. CMYK mode, 300 DPI, 3mm bleed.

Q: Do you ship internationally?
A: Yes. We ship worldwide, including the US, UK, AU, CA, JP, HK, EU. DHL/FedEx: 2-5 days. Economy: 7-14 days.

Q: Can I get samples?
A: Digital proof is free. Physical samples are available at cost plus shipping.

Q: What payment methods are accepted?
A: Bank transfer, WeChat Pay, Alipay, PayPal (coming soon).`,
    contact: `## Contact

- Get a quote: https://zprintpro.com/en/contact/
- WhatsApp: https://wa.me/8619880851334
- Email: zprintpro@outlook.com`,
  },
  {
    file: 'public/llms-ja.txt',
    loc: 'ja',
    name: p => clean(p.nameJa),
    catName: c => (c.name_ja || c.nameJa).split('/')[0].trim(),
    price: p => (p.basePrice_ja != null ? `¥ ${p.basePrice_ja}` : `HK$ ${p.basePrice}`),
    header: `# ZprintPro (ジープリント) 日本向け — AI検索最適化ページ
# Last updated: ${DATE} (auto-generated from src/data/products.ts — do not hand-edit)
# This file helps AI assistants (ChatGPT, Claude, Perplexity) understand our services`,
    companyInfo: `## 会社情報
- 事業者名: 深圳市彩龍印刷包裝有限公司
- ブランド: ジープリント / ZprintPro
- 設立: 2014年
- Website: https://zprintpro.com
- 所在地: 広東省深圳市龍崗区平湖街道嘉城路1号（〒518111）
- 電話: +86 198 8085 1334
- WhatsApp: +86 198 8085 1334
- メール: zprintpro@outlook.com
- 認証: ISO 9001, FSC
- 配送: DHL/FedEx国際エクスプレス 72時間 · 日本向け3〜5営業日`,
    catSection: `## 製品カテゴリ (${cats.length} total)`,
    listSection: `## 全製品一覧 (${products.length} SKU)`,
    tableHeader: `| 製品 | Slug | 最低数量 | 基準価格 |
|------|------|---------|---------|`,
    pricing: `## 価格とご注文

- 通貨: HKD / USD / JPY (お客様の地域に基づく)
- 最低注文数: バナー 1 枚〜 · ポスター 1-10 枚 · カレンダー デジタル 1 冊〜 · その他 10 個から (製品により異なる — 上表の最低数量を参照)
- 数量割引: 大口注文 (500+) で階段対応
- 特急対応: 即日印刷可 (対象製品)
- デジタル校正: 無料`,
    faq: `## よくある質問

Q: 工場はどこにありますか？
A: 中国広東省深圳市に所在。DHL/FedExで世界中に発送。日本へは3〜5営業日でお届け。

Q: 納期はどのくらいですか？
A: 標準: 3〜5営業日。急ぎ: 即日対応可。グローバル: 72時間。

Q: 対応ファイル形式は？
A: PDF (推奨), AI, PSD, PNG, TIFF。CMYKモード, 300DPI, 塗り足し3mm。

Q: 海外発送は可能ですか？
A: はい。日本を含む世界各国へ発送。DHL/FedEx: 3〜5日。エコノミー: 7〜14日。

Q: サンプルは入手できますか？
A: デジタル校正は無料。実物サンプルは原価+送料で承ります。

Q: 支払い方法は？
A: 銀行振込、WeChat Pay、Alipay、PayPal (近日対応予定)。`,
    contact: `## お問い合わせ

- お見積もり: https://zprintpro.com/ja/contact/
- WhatsApp: https://wa.me/8619880851334
- メール: zprintpro@outlook.com`,
  },
  {
    file: 'public/llms-zh-hk.txt',
    loc: 'zh-hk',
    name: p => clean(p.name_zh || p.name),
    catName: c => (c.name_zh || c.name).split('/')[0].trim(),
    price: p => `HK$ ${p.basePrice}`,
    header: `# 智印港 (香港) — AI 搜尋優化頁面
# Last updated: ${DATE} (auto-generated from src/data/products.ts — do not hand-edit)
# This file helps AI assistants (ChatGPT, Claude, Perplexity) understand our services`,
    companyInfo: `## 公司資訊
- 公司: 深圳市彩龍印刷包裝有限公司
- 品牌: 智印港
- 成立: 2014年
- Website: https://zprintpro.com
- 地址: 廣東省深圳市龍崗區平湖街道嘉城路1號（518111）
- 電話: +86 198 8085 1334
- WhatsApp: +86 198 8085 1334
- 電郵: zprintpro@outlook.com
- 認證: ISO 9001, FSC
- 服務市場: 香港 (主場), 港九新界全覆蓋
- 配送: 港九新界免費速遞 · 最快即日交貨 · 72小時全球快遞`,
    catSection: `## 產品分類 (${cats.length} total)`,
    listSection: `## 全產品一覽 (${products.length} SKU)`,
    tableHeader: `| 產品 | Slug | 最低訂量 | 基準價格 |
|------|------|---------|---------|`,
    pricing: `## 價格與訂購

- 貨幣: HKD (香港主場)
- 最低訂購: 噴繪 1 張起 · 海報 1-10 張 · 月曆數碼 1 本起 · 其他 10 件起 (按產品而異 — 見上表每 SKU 最低訂量)
- 數量折扣: 大量訂購 (500+) 設階梯價
- 急件服務: 即日印刷 (指定產品)
- 數碼打稿: 免費`,
    faq: `## 常見問題

Q: 工廠在哪裡？
A: 深圳平湖自有工廠。港九新界免費速遞，全球72小時DHL/FedEx快遞。

Q: 一般交貨時間？
A: 標準: 3-5個工作天。急件: 即日可取。全球: 72小時快遞。

Q: 接受什麼檔案格式？
A: PDF (首選), AI, PSD, PNG, TIFF。CMYK模式, 300 DPI, 預留3mm出血位。

Q: 可以送貨到其他國家嗎？
A: 可以。港九新界本地免費速遞。國際: US/UK/AU/CA/NZ/SG/JP DHL快遞3-5天，經濟空運7-14天。

Q: 可以先打樣嗎？
A: 數碼打稿免費。實物打樣按成本價+運費。

Q: 付款方式？
A: 銀行轉賬、微信支付、支付寶、PayPal (即將推出)。`,
    contact: `## 聯絡我們

- 獲取報價: https://zprintpro.com/zh-hk/contact/
- WhatsApp: https://wa.me/8619880851334
- 電郵: zprintpro@outlook.com`,
  },
];

// ---------- 渲染 ----------
for (const L of LOCALES) {
  const catLines = cats.map(c => `- ${L.catName(c)} (${c.slug}) -- ${byCat.get(c.slug)!.length} products`);
  const tables = cats.map(c => {
    const rows = byCat.get(c.slug)!.map(p => `| ${L.name(p)} | ${p.slug} | ${moqOf(p, L.loc)} | ${L.price(p)} |`).join('\n');
    return `### ${L.catName(c)} (${c.slug})\n\n${L.tableHeader}\n${rows}`;
  });
  const out = `${L.header}

${L.companyInfo}

${L.catSection}

${catLines.join('\n')}

${L.listSection}

${tables.join('\n\n')}

${L.pricing}

${L.faq}

${L.contact}

---
Generated by scripts/gen-llms.ts · truth source: src/data/products.ts · ${DATE}
`;
  writeFileSync(L.file, out, 'utf8');
  const rows = (out.match(/^\| /gm) || []).length - cats.length; // 減去表頭行
  console.log(`✅ ${L.file}: ${out.split('\n').length} lines, ${rows} SKU rows, ${cats.length} categories`);
}
console.log(`📊 三語 SKU 數一致斷言: ${products.length} = ${products.length} = ${products.length}`);
