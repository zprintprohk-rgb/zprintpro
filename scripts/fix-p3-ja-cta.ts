/**
 * P3 ja WARN 批量修复 - CTA sharp hook
 * 2026-07-15 00:28 P3 收尾
 *
 * 修 1 类 WARN: meta CTA 缺失 (37 SKU)
 * 修法: 末尾追加 sharp hook (無料デザイン / 即日発送 / 100枚〜)
 *
 * §13.13 ja 日本市場賣點:
 *   - 即日発送 / 短納期 (物流速度)
 *   - 無料デザイン (设计免费)
 *   - 100枚〜 (低起订)
 *   - 高品質 (质量)
 *
 * SSoT: src/data/sku-seo-data.ts
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// P0 cat 强 sharp hook (ja 跨境主力)
const P0_HOOK = '無料デザイン | 100枚〜 | 即日発送';
// P1/P2 cat 标准
const STD_HOOK = '無料デザイン | 100枚〜';

const P0_CATS = new Set(['stickers', 'flyers', 'packaging', 'paper-bags']);

// ja CTA triggers
const CTA_TRIGGERS = ['無料', '即日', '短納期', '100枚', '高品質', 'デザイン', 'ご注文', '見積もり', 'FSC認証', '日本向け'];

console.log(`\n🔧 P3 ja WARN 修复 (${isApply ? 'APPLY' : 'DRY-RUN'})`);

let modified = 0;
let skipped = 0;
let failed = 0;
const pendingWrites: Array<{ slug: string; newVal: string }> = [];

for (const [slug, data] of Object.entries(skuSeoData)) {
  const d = data as any;
  const seo = d.seo?.ja;
  if (!seo) { skipped++; continue; }
  const oldMeta = seo.description || '';
  if (CTA_TRIGGERS.some(t => oldMeta.includes(t))) { skipped++; continue; }
  const hook = P0_CATS.has(d.cat) ? P0_HOOK : STD_HOOK;
  let newMeta = oldMeta.replace(/[。.!?]?$/, '');
  const candidate = newMeta + ' | ' + hook;
  if (candidate.length > 160) {
    // 截断到 140 字 + hook
    const cut = newMeta.substring(0, 140);
    const lastDot = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('. '), cut.lastIndexOf('!'));
    newMeta = lastDot > 80 ? cut.substring(0, lastDot) : cut;
    newMeta = newMeta + ' | ' + hook;
  } else {
    newMeta = candidate;
  }
  if (/深圳|Shenzhen|深セン|智印港|名片|咭片|名刺|中国/.test(newMeta)) {
    console.log(`❌ ${slug} 含 NAP/禁区词, 跳过`); failed++; continue;
  }
  if (newMeta.length > 160) {
    console.log(`❌ ${slug} 超长 (${newMeta.length}), 跳过`); failed++; continue;
  }
  console.log(`  [${slug}] (${oldMeta.length}→${newMeta.length}字)`);
  if (isApply) pendingWrites.push({ slug, newVal: newMeta });
  modified++;
}

console.log(`\n📊 总览: ${modified} 待修, ${skipped} 跳过, ${failed} 失败`);

if (isApply && pendingWrites.length > 0) {
  console.log(`\n💾 写回 ${SKU_DATA_PATH}...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  for (const w of pendingWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    if (slugStart < 0) { failed++; continue; }
    const seoStart = content.indexOf('"seo":', slugStart);
    const jaStart = content.indexOf('"ja":', seoStart);
    const descKeyStart = content.indexOf('"description":', jaStart);
    const valStartQuote = content.indexOf('"', descKeyStart + 13);
    const valStart = valStartQuote + 1;
    const valEnd = content.indexOf('"', valStart);
    content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    successCount++;
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`✅ 修改完成: ${successCount} 成功, ${failed} 失败`);
} else {
  console.log(`\n确认后运行: npx tsx scripts/fix-p3-ja-cta.ts --apply`);
}
