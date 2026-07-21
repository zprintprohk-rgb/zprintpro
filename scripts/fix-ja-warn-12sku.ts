/**
 * P3 ja WARN 收尾 (rev 2)
 * 2026-07-15 10:35 启动
 *
 * 修 12 SKU 残 WARN:
 *   - 3 alt 过短 (BC-001, BC-006, BN-001)
 *   - 5 meta 过短 <80 字 (PKG-007/008/009/010, ST-009)
 *   - 3 meta 偏短 110-120 字 (ED-002, DJ-001/002/003) → 120-160
 *
 * ja sharp hook: 無料デザイン / 100枚〜 / 即日発送 / 高品質 / 日本向け / DHL
 *
 * SSoT: src/data/sku-seo-data.ts
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// 3 alt 过短修复
const ALT_FIXES: Record<string, string> = {
  'premium-business-cards': 'プレミアム名刺 / 高級紙 | プレミアム名刺印刷 プレミアム紙 100枚〜 日本向け | ZprintPro智印雲',
  'rounded-corner-cards': '角丸名刺 / 角丸加工 | 角丸名刺印刷 角丸加工 100枚〜 即日発送 | ZprintPro智印雲',
  'outdoor-vinyl-banners': '屋外ビニールバナー / 防水 | 屋外ビニールバナー印刷 防水・耐光 翌日配送 | ZprintPro智印雲',
};

// 5 meta 过短 + 3 meta 偏短 (含 CTA sharp hook)
const META_FIXES: Record<string, string> = {
  'magnetic-closure-gift-box': 'マグネット式ギフトボックス印刷、高品質紙採用。日本向け短納期DHL対応、100個〜少量対応、ギフトブランド向け高級パッケージ。無料デザイン対応。| ZprintPro智印雲',
  'electronics-packaging-box': '電子製品パッケージボックス印刷、静電気防止加工。日本向けDHL短納期、100個〜少量対応、EC・D2Cブランド向け。無料サンプル対応。| ZprintPro智印雲',
  'kraft-paper-packaging-box': 'クラフト紙パッケージボックス印刷、FSC認証紙採用。エコ志向ブランド向け、100個〜即日発送対応、日本向けDHL配送。無料デザイン対応。| ZprintPro智印雲',
  'drawer-slide-gift-box': '引き出し式ギフトボックス印刷、高級紙採用。ギフトブランド向け短納期対応、100個〜少量対応、日本向けDHL配送。無料デザイン対応。| ZprintPro智印雲',
  'fruit-food-label-stickers': 'フルーツ食品ラベルステッカー印刷、食品FDA認証。果物・食品ブランド向け、100枚〜即日発送、日本向けDHL配送。無料デザイン対応。| ZprintPro智印雲',
  'certificates': '賞状印刷サービス、高品質紙に金箔オプション可能。学校・企業向け表彰状、50枚〜即日発送、日本向けDHL配送対応。無料デザインサポート。日本語縦書き対応。| ZprintPro智印雲',
  'doujinshi-printing': '同人誌印刷サービス、無線綴じ・中綴じ対応。日本同人イベント向け、50冊〜少部数対応、即日発送オプション、日本全国DHL配送。無料デザインサポート。| ZprintPro智印雲',
  'acrylic-keychain': 'アクリルキーホルダー印刷、高透明アクリル採用。日本同人・アニメブランド向け、50個〜即日発送、日本向けDHL配送。無料デザインサポート。| ZprintPro智印雲',
  'can-badge': '缶バッジ印刷サービス、高品質アルミ採用。日本同人・アニメ・推し活向け、50個〜即日発送、日本向けDHL配送。無料デザインサポート。| ZprintPro智印雲',
};

console.log(`\n🔧 P3 ja WARN 12 收尾 (${isApply ? 'APPLY' : 'DRY-RUN'})`);
console.log(`  - ${Object.keys(ALT_FIXES).length} alt 过短 + ${Object.keys(META_FIXES).length} meta 短\n`);

let modified = 0;
let failed = 0;
const altWrites: Array<{ slug: string; newVal: string }> = [];
const metaWrites: Array<{ slug: string; newVal: string }> = [];

for (const [slug, newAlt] of Object.entries(ALT_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { console.log(`  ⚠️ ${slug} 无 sku-seo 条目`); failed++; continue; }
  const oldAlt = (data.imageAlt && data.imageAlt.ja) || '';
  console.log(`  [${slug}] alt (${oldAlt.length}字): ${oldAlt}`);
  console.log(`             NEW (${newAlt.length}字): ${newAlt}`);
  if (newAlt.length > 120) { console.log(`  ❌ 超长, 跳过`); failed++; continue; }
  if (isApply) altWrites.push({ slug, newVal: newAlt });
  modified++;
}

for (const [slug, newMeta] of Object.entries(META_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { console.log(`  ⚠️ ${slug} 无 sku-seo 条目`); failed++; continue; }
  const oldMeta = (data.seo && data.seo.ja && data.seo.ja.description) || '';
  console.log(`  [${slug}] meta (${oldMeta.length}字): ${oldMeta}`);
  console.log(`             NEW (${newMeta.length}字): ${newMeta}`);
  if (/名片|咭片|business card|Shenzhen|深セン/.test(newMeta)) {
    console.log(`  ❌ 含禁区词, 跳过`); failed++; continue;
  }
  if (newMeta.length > 180 || newMeta.length < 50) {
    console.log(`  ❌ 长度异常, 跳过`); failed++; continue;
  }
  if (isApply) metaWrites.push({ slug, newVal: newMeta });
  modified++;
}

if (isApply && (altWrites.length > 0 || metaWrites.length > 0)) {
  console.log(`\n💾 写回 ${SKU_DATA_PATH}...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  for (const w of altWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    if (slugStart < 0) { failed++; continue; }
    const imgAltStart = content.indexOf('"imageAlt":', slugStart);
    const jaStart = content.indexOf('"ja":', imgAltStart);
    const valStartQuote = content.indexOf('"', jaStart + 5);
    const valStart = valStartQuote + 1;
    const valEnd = content.indexOf('"', valStart);
    content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    successCount++;
  }
  for (const w of metaWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    if (slugStart < 0) { failed++; continue; }
    // find the seo block for this slug, then find ja block, then description
    const seoStart = content.indexOf('"seo":', slugStart);
    const jaBlockStart = content.indexOf('"ja":', seoStart);
    const descStart = content.indexOf('"description":', jaBlockStart);
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
  console.log(`确认后运行: npx tsx scripts/fix-ja-warn-12sku.ts --apply`);
}
