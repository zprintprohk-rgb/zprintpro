/**
 * P3 ja alt FAQ 残留 完整修复 (rev 2)
 * 2026-07-15 10:30 启动
 *
 * 修 23 SKU imageAlt.ja (从中文 FAQ 残留 → 日文 sharp hook 描述)
 *
 * rev 1 (9f11353) 只覆盖 15 SKU + slug mismatch (e.g. large-paper-bags vs large-bags)
 * rev 2 完整覆盖 23 SKU 按 audit-seo-meta.ts --locale=ja 报告
 *
 * 按 §13.13 3 locale 独立策略: ja alt 不硬塞 en/zh-hk 残留
 * ja sharp hook: 無料デザイン / 100枚〜 / 即日発送 / 高品質 / 日本向け / DHL
 *
 * SSoT: src/data/sku-seo-data.ts
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// 23 SKU imageAlt.ja 完整修复
// 模板: 短名(ja) / keyFeature | 短名(ja)印刷 material [sharp hook] | ZprintPro智印雲
const ALT_FIXES: Record<string, string> = {
  // 紙袋
  'large-bags': '大型紙袋 / 高耐久素材 | 大型紙袋印刷 強化素材 100個〜 即日発送 | ZprintPro智印雲',
  // 傳單
  'thick-paper-flyers': '厚口チラシ / 高耐久 | 厚口チラシ印刷 高耐久 100枚〜 即日発送 | ZprintPro智印雲',
  // 海報
  'art-posters': 'アートポスター / 防水 | アートポスター印刷 防水紙 翌日配送 | ZprintPro智印雲',
  'adhesive-posters': '粘着ポスター / 防水 | 粘着ポスター印刷 防水紙 翌日配送 | ZprintPro智印雲',
  // 包裝盒
  'gift-boxes': 'ギフトボックス / 高級感 | ギフトボックス印刷 高級紙 100個〜 日本向け | ZprintPro智印雲',
  'mailer-boxes': 'メーラーボックス / 宅配対応 | メーラーボックス印刷 厚紙 100個〜 日本向け | ZprintPro智印雲',
  // 利是封
  'foil-red-packets': '箔押し年賀状 / 箔押し | 箔押し年賀状印刷 箔押し加工 100個〜 | ZprintPro智印雲',
  'embossed-red-packets': 'エンボス年賀状 / エンボス | エンボス年賀状印刷 エンボス加工 100個〜 | ZprintPro智印雲',
  // 桌曆
  'wall-calendars': '壁掛けカレンダー / 高品質 | 壁掛けカレンダー印刷 高品質紙 翌日配送 | ZprintPro智印雲',
  'desk-calendars': 'デスクカレンダー / 高品質 | デスクカレンダー印刷 高品質紙 翌日配送 | ZprintPro智印雲',
  // 菜單
  'pvc-menus': 'PVC menu / 防水ラミネート | PVC menu印刷 防水ラミネート 翌日配送 | ZprintPro智印雲',
  'laminated-menus': 'ラミネート menu / 防水 | ラミネート menu印刷 防水加工 翌日配送 | ZprintPro智印雲',
  // 橫幅
  'roll-up-banners': 'ロールアップバナー / アルミ | ロールアップバナー印刷 アルミスタンド 高画質 | ZprintPro智印雲',
  'vehicle-wraps': '車両ラッピング / カスタム | 車両ラッピング印刷 車両フルラップ カスタム | ZprintPro智印雲',
  // 書
  'catalog-printing': 'カタログ印刷 / 高品質 | カタログ印刷 高品質オフセット 50冊〜 日本向け | ZprintPro智印雲',
  'saddle-stitch-booklets': '中綴じ冊子 / 中綴じ | 中綴じ冊子印刷 中綴じ/無線綴じ 50冊〜 即日発送 | ZprintPro智印雲',
  'spiral-notebooks': 'スパイラルノート / リング | スパイラルノート印刷 リング製本 50冊〜 | ZprintPro智印雲',
  // 信封
  'business-envelopes': '会社封筒 / 両面印刷 | 会社封筒印刷 両面4色 マルチサイズ 即日発送 | ZprintPro智印雲',
  'pearl-envelopes': 'パール封筒 / 高級感 | パール封筒印刷 パール紙 マルチサイズ 即日発送 | ZprintPro智印雲',
  // 教育
  'exercise-books': '練習帳 / 學校向け | 練習帳印刷 中綴じ/無線綴じ 50冊〜 學校向け | ZprintPro智印雲',
  'certificates': '賞状印刷 / 高品質 | 賞状印刷 高品質紙 金箔オプション 50枚〜 | ZprintPro智印雲',
  'school-flyers': '学校チラシ / 學校向け | 学校チラシ印刷 両面4色 100枚〜 學校向け | ZprintPro智印雲',
  'textbooks': '教科書 / 高品質 | 教科書印刷 高品質オフセット 50冊〜 學校向け | ZprintPro智印雲',
};

console.log(`\n🔧 P3 ja alt 23 SKU 修复 (${isApply ? 'APPLY' : 'DRY-RUN'})`);
console.log(`  - ${Object.keys(ALT_FIXES).length} alt 替换\n`);

let modified = 0;
let failed = 0;
const pendingWrites: Array<{ slug: string; newVal: string }> = [];

for (const [slug, newAlt] of Object.entries(ALT_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { console.log(`  ⚠️ ${slug} 无 sku-seo 条目`); failed++; continue; }
  const oldAlt = (data.imageAlt && data.imageAlt.ja) || '';
  console.log(`  [${slug}] alt (${oldAlt.length}字): ${oldAlt || '(MISSING)'}`);
  console.log(`             NEW (${newAlt.length}字): ${newAlt}`);
  if (/名片|咭片|business card|智印港|Shenzhen|深セン/.test(newAlt)) {
    console.log(`  ❌ NEW 含禁区词, 跳过`); failed++; continue;
  }
  if (newAlt.length > 120) {
    console.log(`  ❌ NEW 超长 (${newAlt.length}), 跳过`); failed++; continue;
  }
  if (isApply) pendingWrites.push({ slug, newVal: newAlt });
  modified++;
}

if (isApply && pendingWrites.length > 0) {
  console.log(`\n💾 写回 ${SKU_DATA_PATH}...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  for (const w of pendingWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    if (slugStart < 0) { console.log(`  ! ${w.slug}: slug not found in file`); failed++; continue; }
    const imgAltStart = content.indexOf('"imageAlt":', slugStart);
    if (imgAltStart < 0) { console.log(`  ! ${w.slug}: imageAlt field not found`); failed++; continue; }
    const jaStart = content.indexOf('"ja":', imgAltStart);
    if (jaStart < 0) { console.log(`  ! ${w.slug}: ja field not found`); failed++; continue; }
    const valStartQuote = content.indexOf('"', jaStart + 5);
    const valStart = valStartQuote + 1;
    const valEnd = content.indexOf('"', valStart);
    content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    successCount++;
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`✅ 修改完成: ${successCount} 成功, ${failed} 失败`);
} else {
  console.log(`\n✅ DRY-RUN 完成: ${modified} SKU 待修改`);
  console.log(`确认后运行: npx tsx scripts/fix-ja-alt-23sku.ts --apply`);
}
