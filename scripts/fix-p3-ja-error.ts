/**
 * P3 ja 严重问题批量修复
 * 2026-07-15 00:14 P3 启动
 *
 * 修 1 类 ERROR:
 *   - alt FAQ 残留 (含问号) (14 SKU)
 *   - alt 缺失 (1 SKU: クラフト紙袋)
 *
 * 按 §13.13 3 locale 独立策略: ja alt 不硬塞 en/zh-hk 残留, 走日本市场卖点
 * ja sharp hook: 無料デザイン / 100枚〜 / 即日発送 / 高品質 / 日本向け / DHL
 *
 * SSoT: src/data/sku-seo-data.ts
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// ja 14 alt FAQ 修复 + 1 alt 缺失补全
// 模式: 短名(ja) / keyFeature | 短名(ja)印刷 material | ZprintPro
const ALT_FIXES: Record<string, string> = {
  // BC SKU 走中性化 (避免 名刺 出现 §11 禁区)
  'thick-business-cards-400g': '厚紙名刺 / 高耐久 | 厚紙名刺印刷 400g厚紙 | ZprintPro智印雲',
  'matte-business-cards': 'マット名刺 / マット | マット名刺印刷 300gマット紙 | ZprintPro智印雲',
  // ステッカー
  'removable-stickers': '再剥離ステッカー / 防水 | 再剥離ステッカー印刷 防水PVC | ZprintPro智印雲',
  'foil-stickers': '箔押しステッカー / 防水 | 箔押しステッカー印刷 防水PVC | ZprintPro智印雲',
  'security-stickers': 'セキュリティステッカー / 防水 | セキュリティステッカー印刷 防水PVC | ZprintPro智印雲',
  // 紙袋
  'kraft-paper-bags': 'クラフト紙袋 / FSC認証 | クラフト紙袋印刷 FSC認証紙 100個〜 | ZprintPro智印雲',
  'white-card-bags': '白カード紙袋 / 高耐久 | 白カード紙袋印刷 高耐久素材 100個〜 | ZprintPro智印雲',
  'handle-bags': 'ハンドルバッグ / 高耐久 | ハンドルバッグ印刷 高耐久素材 100個〜 | ZprintPro智印雲',
  'large-paper-bags': '大型紙袋 / 高耐久 | 大型紙袋印刷 強化素材 100個〜 | ZprintPro智印雲',
  // チラシ
  'a4-flyers': 'A4チラシ / 両面カラー | A4チラシ印刷 両面4色 100枚〜 即日発送 | ZprintPro智印雲',
  'a5-flyers': 'A5チラシ / 両面カラー | A5チラシ印刷 両面4色 100枚〜 即日発送 | ZprintPro智印雲',
  'double-sided-flyers': '両面チラシ / 両面カラー | 両面チラシ印刷 両面4色 100枚〜 即日発送 | ZprintPro智印雲',
  'thick-flyers': '厚口チラシ / 高耐久 | 厚口チラシ印刷 高耐久 100枚〜 即日発送 | ZprintPro智印雲',
  'same-day-flyers': '即日チラシ / 両面カラー | 即日チラシ印刷 当日仕上げ 100枚〜 | ZprintPro智印雲',
  // ポスター
  'a2-posters': 'A2ポスター / 防水 | A2ポスター印刷 防水紙 翌日配送 | ZprintPro智印雲',
  'outdoor-posters': '屋外ポスター / 防水 | 屋外ポスター印刷 防水・耐光紙 翌日配送 | ZprintPro智印雲',
};

console.log(`\n🔧 P3 ja 严重问题修复 (${isApply ? 'APPLY' : 'DRY-RUN'})`);
console.log(`  - ${Object.keys(ALT_FIXES).length} alt FAQ 修复 + 缺失补全\n`);

let modified = 0;
let failed = 0;
const pendingWrites: Array<{ slug: string; newVal: string }> = [];

for (const [slug, newAlt] of Object.entries(ALT_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { console.log(`⚠️ ${slug} 无 sku-seo 条目`); failed++; continue; }
  const oldAlt = data.imageAlt?.ja || '';
  console.log(`  [${slug}] alt (${oldAlt.length}字): ${oldAlt || '(MISSING)'}`);
  console.log(`             NEW (${newAlt.length}字): ${newAlt}`);
  // 检查禁区词 (§11 BC + §13.10 NAP + §13.13 3 locale)
  if (/名片|咭片|business card|Shenzhen|深セン/.test(newAlt)) {
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
    if (slugStart < 0) { failed++; continue; }
    const imgAltStart = content.indexOf('"imageAlt":', slugStart);
    const jaStart = content.indexOf('"ja":', imgAltStart);
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
  console.log(`确认后运行: npx tsx scripts/fix-p3-ja-error.ts --apply`);
}
