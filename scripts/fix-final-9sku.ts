/**
 * P3 final final: en 4 + ja 5 = 9 SKU meta 收尾
 * 2026-07-15 11:00
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// en 4 meta
const EN_META: Record<string, string> = {
  'cosmetic-boxes': 'Cosmetic Boxes, premium rigid paperboard. Free Design, 100 MOQ, Free Shipping $99+. 4-day USA delivery for beauty & skincare brands. | ZprintPro',
  'graduation-yearbook': 'Graduation Yearbook, hardcover & softcover binding. Free Design, 50 MOQ, Free Shipping $99+. 4-day USA delivery for schools. | ZprintPro',
  'fruit-food-label-stickers': 'Fruit Food Label Stickers, FDA-compliant. Free Design, 100 MOQ, Free Shipping $99+. 4-day USA delivery for food brands. | ZprintPro',
  'acrylic-keychain': 'Acrylic Keychain, 2mm/3mm clear acrylic. Free Design, 50 MOQ, Free Shipping $99+. 4-day USA delivery for anime & creator brands. | ZprintPro',
};

// ja 5 meta
const JA_META: Record<string, string> = {
  'certificates': '賞状印刷サービス、高品質紙に金箔・銀箔オプション可能。学校・企業・スポーツ大会向け表彰状・感謝状、50枚〜即日発送対応、縦書き横書き両対応可能。日本向けDHL配送2-4日追跡番号付き。無料デザインサポート、複数回修正対応、深夜受付OK。| ZprintPro智印雲',
  'electronics-packaging-box': '電子製品パッケージボックス印刷サービス、静電気防止加工オプション標準装備。EC・D2Cブランド・精密機器メーカー向け、100個〜少量対応、日本向けDHL短納期配送2-4日追跡番号付き。無料デザインサポート、安全素材採用で商品保護強化、複数回修正OK。| ZprintPro智印雲',
  'fruit-food-label-stickers': 'フルーツ食品ラベルステッカー印刷サービス、食品FDA認証素材採用で果物・食品ブランドに最適。防水・耐油加工で冷蔵庫保管対応、剥がしやすく糊残なし特殊粘着、100枚〜即日発送対応、日本向けDHL配送2-4日追跡番号付き。無料デザインサポート、複数回修正OK。| ZprintPro智印雲',
  'doujinshi-printing': '同人誌印刷サービス、無線綴じ・中綴じ・PUR製本対応。A5/B5サイズ表紙フルカラー本文モノクロ印刷。コミケ・即売会向け50冊〜少部数対応、即日発送オプション、日本全国DHL配送2-4日追跡番号付き。無料デザインサポート、24時間特急対応可能。| ZprintPro智印雲',
  'acrylic-keychain': 'アクリルキーホルダー印刷サービス、高透明2mm/3mmアクリル採用で完全カスタム形状対応。日本同人・アニメ・VTuber・推し活ブランド向け、50個〜即日発送対応、日本向けDHL配送2-4日追跡番号付き。無料デザインサポート、複数回修正OK、安全ピンオプション。| ZprintPro智印雲',
};

console.log(`\n🔧 P3 final final: 4 en + 5 ja meta (${isApply ? 'APPLY' : 'DRY-RUN'})\n`);

let modified = 0, failed = 0;
const enW: Array<{slug:string; newVal:string}> = [];
const jaW: Array<{slug:string; newVal:string}> = [];

for (const [slug, v] of Object.entries(EN_META)) {
  const data = skuSeoData[slug] as any;
  const oldMeta = (data?.seo?.en?.description) || '';
  console.log(`  [${slug}] en (${oldMeta.length}→${v.length})`);
  if (v.length > 160 || v.length < 100) { console.log(`  ❌ 长度异常, 跳过`); failed++; continue; }
  if (isApply) enW.push({slug, newVal: v});
  modified++;
}

for (const [slug, v] of Object.entries(JA_META)) {
  const data = skuSeoData[slug] as any;
  const oldMeta = (data?.seo?.ja?.description) || '';
  console.log(`  [${slug}] ja (${oldMeta.length}→${v.length})`);
  if (v.length > 180 || v.length < 100) { console.log(`  ❌ 长度异常, 跳过`); failed++; continue; }
  if (isApply) jaW.push({slug, newVal: v});
  modified++;
}

if (isApply && (enW.length > 0 || jaW.length > 0)) {
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  for (const w of enW) {
    const s = content.indexOf(`"${w.slug}":`);
    const seo = content.indexOf('"seo":', s);
    const en = content.indexOf('"en":', seo);
    const desc = content.indexOf('"description":', en);
    const q1 = content.indexOf('"', desc + 14);
    const vs = q1 + 1;
    const ve = content.indexOf('"', vs);
    content = content.substring(0, vs) + w.newVal + content.substring(ve);
    successCount++;
  }
  for (const w of jaW) {
    const s = content.indexOf(`"${w.slug}":`);
    const seo = content.indexOf('"seo":', s);
    const ja = content.indexOf('"ja":', seo);
    const desc = content.indexOf('"description":', ja);
    const q1 = content.indexOf('"', desc + 14);
    const vs = q1 + 1;
    const ve = content.indexOf('"', vs);
    content = content.substring(0, vs) + w.newVal + content.substring(ve);
    successCount++;
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`\n✅ 完成: ${successCount} 成功`);
} else {
  console.log(`\n✅ DRY-RUN: ${modified} 待修改`);
}
