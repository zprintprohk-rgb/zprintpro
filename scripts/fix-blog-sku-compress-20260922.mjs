/**
 * fix-blog-sku-compress-20260922.mjs — blog-data 三语同步: 7 SKU 下架内容维护
 *
 * 背景: apply-sku-compress-20260922.mjs 下架 7 SKU (99→92)。
 * 本脚本修定价基準博文 (16 品類 99 SKU) + 易拉寶指南博文:
 *   1) 99→92 全口径 (title/description/excerpt/content/h2)
 *   2) 5 个受影响类目 SKU 计数: 餐牌/橫額/婚禮請柬/席位卡/日本同人
 *   3) 婚礼 TWD 句去具体数 (剩余 SKU 结构已变, 改诚实模糊口径)
 *   4) 死链解除: disposable-menus / mesh-banners 锚点 → 纯文本 (301 存在但内链应指活页)
 *
 * 每个替换断言 count≥1, 任一失败不写盘。用法: --check | --apply
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'F:/zprintpro-nextjs';
const APPLY = process.argv.includes('--apply');
const BAK = path.join(ROOT, '.hermes/_bak-sku-compress-20260922');

const OPS = {
  'zh-hk.json': [
    ['16 品類 99 SKU 價格數據', '16 品類 92 SKU 價格數據'],
    ['16 品類 99 個在售 SKU', '16 品類 92 個在售 SKU'],
    ['16 個品類、99 個在售 SKU', '16 個品類、92 個在售 SKU'],
    ['16 個品類、99 個 SKU', '16 個品類、92 個 SKU'],
    ['16 品類・99 SKU', '16 品類・92 SKU'],
    ['16 品類 99 SKU 香港印刷價格基準', '16 品類 92 SKU 香港印刷價格基準'],
    ['餐牌（5）', '餐牌（4）'],
    ['橫額（5）', '橫額（4）'],
    ['婚禮請柬（6）', '婚禮請柬（4）'],
    ['席位卡（6）', '席位卡（4）'],
    ['日本同人（5）', '日本同人（4）'],
    ['婚禮請柬與席位卡（6+6）', '婚禮請柬與席位卡（4+4）'],
    ['六個婚禮請柬 SKU 中有四個面向日本市場渠道以台幣（TWD）標價', '部分婚禮請柬 SKU 面向日本市場渠道以台幣（TWD）標價'],
    ['<a href=\\"/zh-hk/product/disposable-menus/\\">disposable-menus</a>', '即棄餐牌'],
    ['<a href=\\"/zh-hk/product/mesh-banners/\\">網孔 Mesh banner</a>', '網孔 Mesh banner'],
    ['與 <a href=\\"/product/mesh-banners/\\">網孔橫幅</a> 兩個產品頁', '產品頁（圍欄與沙灘場景可配網孔橫幅）'],
  ],
  'en.json': [
    ['Hong Kong Printing Cost Report 2026: 99 SKU | ZprintPro', 'Hong Kong Printing Cost Report 2026: 92 SKU | ZprintPro'],
    ['99 live SKUs across 16 categories', '92 live SKUs across 16 categories'],
    ['99 live SKUs across 16 product categories', '92 live SKUs across 16 product categories'],
    ['99-SKU Hong Kong printing price baseline', '92-SKU Hong Kong printing price baseline'],
    ['Menus (5)', 'Menus (4)'],
    ['Banners (5)', 'Banners (4)'],
    ['Wedding invitations (6)', 'Wedding invitations (4)'],
    ['Place cards (6)', 'Place cards (4)'],
    ['Japan doujin (5)', 'Japan doujin (4)'],
    ['cards (6 + 6), graduation yearbooks (1)', 'cards (4 + 4), graduation yearbooks (1)'],
    ['four of six wedding-invitation SKUs list base prices in TWD', 'some wedding-invitation SKUs list base prices in TWD'],
    ['<a href=\\"/en/product/disposable-menus/\\">disposable-menus</a>', 'disposable menus'],
    ['<a href=\\"/en/product/mesh-banners/\\">mesh banners</a>', 'mesh banners'],
    ['</a> and <a href=\\"/product/mesh-banners/\\">mesh banner</a> product pages for those formats', '</a> product page for those formats (mesh banner material suits fence and beach events too)'],
  ],
  'ja.json': [
    ['香港印刷コスト 2026: 99 SKU 価格データ', '香港印刷コスト 2026: 92 SKU 価格データ'],
    ['16 カテゴリ 99 実 SKU', '16 カテゴリ 92 実 SKU'],
    ['16 製品カテゴリ・99 の実 SKU', '16 製品カテゴリ・92 の実 SKU'],
    ['16 カテゴリ 99 SKU の香港印刷価格ベースライン', '16 カテゴリ 92 SKU の香港印刷価格ベースライン'],
    ['メニュー（5）', 'メニュー（4）'],
    ['バナー（5）', 'バナー（4）'],
    ['婚礼招待状（6）', '婚礼招待状（4）'],
    ['席札（6）', '席札（4）'],
    ['日本の同人（5）', '日本の同人（4）'],
    ['婚礼招待状と席札（6+6）', '婚礼招待状と席札（4+4）'],
    ['婚礼招待状 6 SKU のうち 4 つは日本市場チャネル向けに TWD 建ての basePrice を掲載しており', '一部の婚礼招待状 SKU は日本市場チャネル向けに TWD 建ての basePrice を掲載しており'],
    ['<a href=\\"/ja/product/disposable-menus/\\">disposable-menus</a>', '使い捨てメニュー'],
    [' と <a href=\\"/product/mesh-banners/\\">メッシュバナー</a> の製品ページもご覧ください。', ' の製品ページもご覧ください（メッシュバナーも同系の屋外向けです）。'],
  ],
};

const errors = [];
const report = [];
for (const [file, ops] of Object.entries(OPS)) {
  const fp = path.join(ROOT, 'src/data/blog-data', file);
  let text = fs.readFileSync(fp, 'utf8');
  for (const [oldS, newS] of ops) {
    const count = text.split(oldS).length - 1;
    if (count < 1) { errors.push(`${file}: pattern not found: ${oldS.slice(0, 60)}`); continue; }
    if (count > 1) report.push(`${file}: ⚠ pattern ×${count}, 全部替换: ${oldS.slice(0, 44)}`);
    text = text.split(oldS).join(newS);
    report.push(`${file}: OK ${oldS.slice(0, 44)} → ${newS.slice(0, 44)}`);
  }
  if (APPLY && !errors.length) {
    fs.mkdirSync(BAK, { recursive: true });
    fs.writeFileSync(path.join(BAK, file + '.bak'), fs.readFileSync(fp, 'utf8'), 'utf8');
    fs.writeFileSync(fp, text, 'utf8');
    report.push(`${file}: 写盘`);
  }
}
console.log('══════ 报告 ══════');
report.forEach(r => console.log(r));
if (errors.length) {
  console.error('\n══════ 错误 ══════');
  errors.forEach(e => console.error(e));
  process.exit(2);
}
console.log(APPLY ? '\n[apply] 完成' : '\n[dry-run] OK, --apply 写盘');
