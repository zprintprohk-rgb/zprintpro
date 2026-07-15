/**
 * P3 final fix: ja 9 meta 偏短 + en 20 CTA 缺失
 * 2026-07-15 10:40
 *
 * 修 9 + 20 = 29 字段
 * 目标: ja meta 120-160字, en meta 80-160字 含 CTA sharp hook
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// ja 9 meta 偏短 (扩到 120-160)
const JA_META_FIXES: Record<string, string> = {
  'magnetic-closure-gift-box': 'マグネット式ギフトボックス印刷サービス、高品質特殊紙採用でマグネット蓋がピタッと閉まる高級感。ギフトブランド・アパレル向け短納期対応、100個〜少量対応、日本向けDHL配送2-4日。無料デザインサポート、複数回修正OK。| ZprintPro智印雲',
  'electronics-packaging-box': '電子製品パッケージボックス印刷サービス、静電気防止加工オプション。EC・D2Cブランド・精密機器メーカー向け、100個〜少量対応、日本向けDHL短納期配送2-4日。無料サンプル対応、安全素材採用で商品保護強化。| ZprintPro智印雲',
  'kraft-paper-packaging-box': 'クラフト紙パッケージボックス印刷サービス、FSC認証クラフト紙採用でエコ志向ブランドに最適。100個〜即日発送対応、ナチュラル・北欧・カフェブランド向けカスタム印刷、日本向けDHL配送2-4日。無料デザインサポート。| ZprintPro智印雲',
  'drawer-slide-gift-box': '引き出し式ギフトボックス印刷サービス、高級特殊紙採用でスルスル引き心地滑らか。ギフトブランド・ジュエリー・化粧品向け短納期対応、100個〜少量対応、日本向けDHL配送2-4日。無料デザインサポート、複数回修正OK。| ZprintPro智印雲',
  'fruit-food-label-stickers': 'フルーツ食品ラベルステッカー印刷サービス、食品FDA認証素材採用で果物・食品ブランドに最適。防水・耐油加工、剥がしやすく糊残なし、100枚〜即日発送対応、日本向けDHL配送2-4日。無料デザインサポート。| ZprintPro智印雲',
  'certificates': '賞状印刷サービス、高品質紙に金箔・銀箔オプション可能。学校・企業・スポーツ大会向け表彰状・感謝状、50枚〜即日発送対応、日本語縦書き対応、日本向けDHL配送2-4日。無料デザインサポート、複数回修正OK。| ZprintPro智印雲',
  'doujinshi-printing': '同人誌印刷サービス、無線綴じ・中綴じ・PUR製本対応。A5/B5サイズ表紙フルカラー本文モノクロ。コミケ・即売会向け50冊〜少部数対応、即日発送オプション、日本全国DHL配送2-4日。無料デザインサポート。| ZprintPro智印雲',
  'acrylic-keychain': 'アクリルキーホルダー印刷サービス、高透明2mm/3mmアクリル採用で完全カスタム形状対応。日本同人・アニメ・VTuber・推し活ブランド向け、50個〜即日発送、日本向けDHL配送2-4日。無料デザインサポート。| ZprintPro智印雲',
  'can-badge': '缶バッジ印刷サービス、高品質アルミ素材採用で57mm標準+76mm大判+44mmミニ対応。安全ピン付き、フルカラー印刷、日本同人・アニメ・推し活・物販ブランド向け、50個〜即日発送、日本向けDHL配送2-4日。無料デザインサポート。| ZprintPro智印雲',
};

// en 20 meta CTA 缺失
const EN_META_FIXES: Record<string, string> = {
  'premium-business-cards': 'Premium Business Cards custom printing, 350gsm premium paper. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for small business. | ZprintPro',
  'thick-business-cards-400g': 'Thick Business Cards 400gsm custom printing, ultra-thick premium paper. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery. | ZprintPro',
  'foil-business-cards': 'Foil Business Cards custom printing with gold/silver foil stamping. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA turnaround for premium brands. | ZprintPro',
  'spot-uv-business-cards': 'Spot UV Business Cards custom printing, glossy UV coating on logos. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for DTC brands. | ZprintPro',
  'matte-business-cards': 'Matte Business Cards custom printing, 300gsm matte paper stock. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA turnaround for premium brands. | ZprintPro',
  'rounded-corner-cards': 'Rounded Corner Cards custom printing, smooth 4-corner radius finishing. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for small business. | ZprintPro',
  'waterproof-stickers': 'Waterproof Stickers custom printing, PVC material with UV-resistant coating. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for DTC brands. | ZprintPro',
  'transparent-stickers': 'Transparent Stickers custom printing, clear PET material. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for premium product labels. | ZprintPro',
  'small-batch-stickers': 'Small Batch Stickers custom printing, low 50 MOQ. Free design mockup, free shipping $99+. Fast 4-day USA delivery for small business & startups. | ZprintPro',
  'die-cut-stickers': 'Die-Cut Stickers custom printing, any shape cutting. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for creative brands. | ZprintPro',
  'security-stickers': 'Security Stickers custom printing, VOID tamper-evident material. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for asset tracking. | ZprintPro',
  'fluorescent-stickers': 'Fluorescent Stickers custom printing, UV-reactive neon colors. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for event marketing. | ZprintPro',
  'a2-posters': 'A2 Posters custom printing, 200gsm coated paper. Free design mockup, 50 MOQ, free shipping $99+. Fast 4-day USA delivery for event & retail display. | ZprintPro',
  'art-posters': 'Art Posters custom printing, premium matte art paper. Free design mockup, 50 MOQ, free shipping $99+. Fast 4-day USA delivery for artists & galleries. | ZprintPro',
  'cosmetic-boxes': 'Cosmetic Boxes custom printing, premium rigid paperboard. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for beauty & skincare brands. | ZprintPro',
  'folding-boxes': 'Folding Boxes custom printing, eco-friendly kraft paper. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for retail packaging. | ZprintPro',
  'graduation-yearbook': 'Graduation Yearbook custom printing, hardcover & softcover binding. Free design mockup, 50 book MOQ, free shipping $99+. Fast 4-day USA delivery for schools. | ZprintPro',
  'magnetic-closure-gift-box': 'Magnetic Closure Gift Box custom printing, premium rigid board. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for premium brands. | ZprintPro',
  'fruit-food-label-stickers': 'Fruit Food Label Stickers custom printing, FDA-compliant material. Free design mockup, 100 MOQ, free shipping $99+. Fast 4-day USA delivery for food brands. | ZprintPro',
  'acrylic-keychain': 'Acrylic Keychain custom printing, 2mm/3mm clear acrylic. Free design mockup, 50 MOQ, free shipping $99+. Fast 4-day USA delivery for anime & creator brands. | ZprintPro',
};

console.log(`\n🔧 P3 final fix (${isApply ? 'APPLY' : 'DRY-RUN'})`);
console.log(`  - ja ${Object.keys(JA_META_FIXES).length} meta 偏短 → 120+`);
console.log(`  - en ${Object.keys(EN_META_FIXES).length} meta CTA 缺失\n`);

let modified = 0;
let failed = 0;
const jaWrites: Array<{ slug: string; newVal: string }> = [];
const enWrites: Array<{ slug: string; newVal: string }> = [];

for (const [slug, newMeta] of Object.entries(JA_META_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { console.log(`  ⚠️ ${slug} ja`); failed++; continue; }
  const oldMeta = (data.seo && data.seo.ja && data.seo.ja.description) || '';
  console.log(`  [${slug}] ja meta (${oldMeta.length}→${newMeta.length}字)`);
  if (/名片|咭片|business card|智印港|Shenzhen|深セン/.test(newMeta)) {
    console.log(`  ❌ ja 含禁区词, 跳过`); failed++; continue;
  }
  if (newMeta.length > 180 || newMeta.length < 100) {
    console.log(`  ❌ ja 长度异常 ${newMeta.length}, 跳过`); failed++; continue;
  }
  if (isApply) jaWrites.push({ slug, newVal: newMeta });
  modified++;
}

for (const [slug, newMeta] of Object.entries(EN_META_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { console.log(`  ⚠️ ${slug} en`); failed++; continue; }
  const oldMeta = (data.seo && data.seo.en && data.seo.en.description) || '';
  console.log(`  [${slug}] en meta (${oldMeta.length}→${newMeta.length}字)`);
  if (/智印港|Shenzhen|深セン/.test(newMeta)) {
    console.log(`  ❌ en 含 NAP 词, 跳过`); failed++; continue;
  }
  if (newMeta.length > 180 || newMeta.length < 100) {
    console.log(`  ❌ en 长度异常 ${newMeta.length}, 跳过`); failed++; continue;
  }
  if (isApply) enWrites.push({ slug, newVal: newMeta });
  modified++;
}

if (isApply && (jaWrites.length > 0 || enWrites.length > 0)) {
  console.log(`\n💾 写回 ${SKU_DATA_PATH}...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  // 写 ja meta
  for (const w of jaWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    if (slugStart < 0) { failed++; continue; }
    const seoStart = content.indexOf('"seo":', slugStart);
    const jaBlockStart = content.indexOf('"ja":', seoStart);
    const descStart = content.indexOf('"description":', jaBlockStart);
    const valStartQuote = content.indexOf('"', descStart + 14);
    const valStart = valStartQuote + 1;
    const valEnd = content.indexOf('"', valStart);
    content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    successCount++;
  }
  // 写 en meta
  for (const w of enWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    if (slugStart < 0) { failed++; continue; }
    const seoStart = content.indexOf('"seo":', slugStart);
    const enBlockStart = content.indexOf('"en":', seoStart);
    const descStart = content.indexOf('"description":', enBlockStart);
    const valStartQuote = content.indexOf('"', descStart + 14);
    const valStart = valStartQuote + 1;
    const valEnd = content.indexOf('"', valStart);
    content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    successCount++;
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`✅ 修改完成: ${successCount} 成功, ${failed} 失败`);
} else {
  console.log(`\n✅ DRY-RUN 完成: ${modified} 字段待修改`);
  console.log(`确认后运行: npx tsx scripts/fix-meta-final-9plus20.ts --apply`);
}
