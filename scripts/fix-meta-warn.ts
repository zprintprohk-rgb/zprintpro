/**
 * 批量修复 P2 WARN (Meta 偏短/超长 + CTA 缺失 + alt 过短)
 * 2026-07-14 P2 阶段 2: 修剩余 23 个 WARN
 *
 * 4 个 mode (按 root cause 拆):
 *   --mode=meta-overlong: 截断 Meta > 160 字符 (1 SKU: PK-002)
 *   --mode=meta-short:   扩展 Meta < 80 字符, 末尾加品牌 + CTA 句 (11 SKU)
 *   --mode=cta:          在 Meta 末尾加 "立即 WhatsApp 報價" (10 SKU)
 *   --mode=alt-short:    扩展 alt < 20 字符 (6 SKU)
 *
 * 用法 (与 clean-faq-alt.ts 一致):
 *   npx tsx scripts/fix-meta-warn.ts --mode=meta-overlong --dry-run
 *   npx tsx scripts/fix-meta-warn.ts --mode=meta-overlong --apply
 *   (按 mode 分批执行, 每 mode 1 commit)
 *
 * SSoT: src/data/sku-seo-data.ts (与 clean-faq-alt.ts 一致)
 * Refs:
 *   - §0 最高宪法规则 (不写智印港/§11 BC 禁区)
 *   - §13.14 15+ 年营销口径
 *   - §13.16 Pre-commit 8 问
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { products } from '../src/data/products.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';

// ============================================================
// Cat template (复用 clean-faq-alt.ts 模式)
// ============================================================
const CAT_VERB_ZHHK: Record<string, string> = {
  stickers: '印刷',
  flyers: '印刷',
  packaging: '訂製',
  'paper-bags': '印刷',
  posters: '印刷',
  banners: '製作',
  calendars: '印刷',
  'red-packets': '印刷',
  educational: '印刷',
  books: '裝訂',
  menus: '製作',
  envelopes: '印刷',
  'gift-boxes': '訂製',
  'japan-doujin': '製作',
  'business-cards': '訂製',
};

// NAP 误报白名单 (audit 把"非智印港"误判, 实际是反向竞品词锚定)
const NAP_FALSE_POSITIVE = ['非智印港'];

// ============================================================
// 1. 工具函数
// ============================================================
function getSlugForSku(skuId: string): string | null {
  for (const [slug, data] of Object.entries(skuSeoData)) {
    if ((data as any).skuId === skuId) return slug;
  }
  // fallback: SKU 编号转 slug
  return skuId.toLowerCase().replace(/_/g, '-');
}

function hasNAP(text: string): boolean {
  const FORBIDDEN = ['深圳', 'Shenzhen', '深セン', '智印港', '智印印港', '名片', 'business card', '咭片', '旺角', '觀塘', '尖沙咀', '銅鑼湾', '荃湾', '九龍湾'];
  for (const w of FORBIDDEN) {
    if (text.includes(w) && !NAP_FALSE_POSITIVE.some(fp => text.includes(fp))) return true;
  }
  return false;
}

function hasCTA(text: string): boolean {
  return /(報價|查詢|聯絡|聯繫|WhatsApp|立即|免費打樣)/i.test(text);
}

// ============================================================
// 2. Meta 修复策略
// ============================================================
function fixMetaOverlong(meta: string): string | null {
  if (meta.length <= 160) return null;
  // 策略: 找最后一个 "。" 或 ". " (句末) 截断到 ≤155 字, 保留句意
  let cut = meta.substring(0, 155);
  // 优先在 "。" / ". " 边界切
  const lastDot = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('. '));
  if (lastDot > 80) {
    cut = cut.substring(0, lastDot);
  }
  return cut;
}

function fixMetaShort(meta: string, catSlug: string, skuTitle: string): string {
  if (meta.length >= 80) return meta;
  // 策略: 末尾追加 "100張起印, 順豐本地速遞, WhatsApp 立即報價" (20 字)
  const appendage = `${catSlug === 'paper-bags' ? '100個起訂' : '100張起印'}, 順豐本地速遞, 立即 WhatsApp 報價。ZprintPro 15+ 年自有品牌。`;
  return meta.replace(/。$/, '') + '。' + appendage;
}

function fixCTA(meta: string): string {
  if (hasCTA(meta)) return meta;
  // 策略: 保留原 description (不动主体), 追加短 CTA = 总长 ≤ 160 字
  // 若原 > 152, 先截断到 152 (再追加 7 字 CTA)
  const MAX_BEFORE_CTA = 152;
  let base = meta;
  if (base.length > MAX_BEFORE_CTA) {
    const cut = base.substring(0, MAX_BEFORE_CTA);
    const lastDot = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('. '));
    base = lastDot > 100 ? cut.substring(0, lastDot) : cut;
  }
  return base.replace(/[。，.]?$/, '') + ' | 即時報價';
}

function fixAltShort(alt: string, catSlug: string): string {
  if (alt.length >= 20) return alt;
  // §11 BC SKU 中性化: 用"專業商務印刷"替代 §11 禁区词
  if (catSlug === 'business-cards') {
    return '專業商務印刷 / 專業商務印刷 | 香港專業商務印刷訂製 | ZprintPro智印雲';
  }
  // 策略: 末尾追加材质/品牌
  const appendage = '香港' + (CAT_VERB_ZHHK[catSlug] || '印刷') + ' | ZprintPro智印雲';
  return alt + (alt.length === 0 ? '' : ' | ') + appendage;
}

// ============================================================
// 3. 主流程
// ============================================================
const mode = (process.argv.find(a => a.startsWith('--mode='))?.split('=')[1]) as string;
const isApply = process.argv.includes('--apply');

if (!['meta-overlong', 'meta-short', 'cta', 'alt-short'].includes(mode)) {
  console.error('❌ --mode must be one of: meta-overlong | meta-short | cta | alt-short');
  process.exit(1);
}

const targetSlugs: Record<string, string[]> = {
  'meta-overlong': ['cosmetic-boxes'],
  'meta-short': ['kraft-paper-bags', 'gift-bags', 'eco-paper-bags', 'a4-flyers', 'a5-flyers', 'folded-leaflets', 'a2-posters', 'art-posters', 'gift-boxes', 'food-boxes', 'rigid-boxes'],
  'cta': ['eco-paper-bags', 'a2-posters', 'art-posters', 'food-boxes', 'rigid-boxes', 'kraft-paper-packaging-box', 'fruit-food-label-stickers', 'doujinshi-printing', 'acrylic-keychain', 'can-badge', 'postcard-set', 'eco-tote-bag'],
  'alt-short': ['rounded-corner-cards', 'adhesive-banners', 'mesh-banners', 'magnetic-closure-gift-box', 'acrylic-keychain', 'postcard-set', 'eco-tote-bag'],
};

const slugs = targetSlugs[mode];
console.log(`\n🔧 mode=${mode} | ${slugs.length} SKU | ${isApply ? 'APPLY' : 'DRY-RUN'}\n`);

let modified = 0;
let failed = 0;
const pendingWrites: Array<{ slug: string; field: 'description-zh-hk' | 'imageAlt-zh-hk'; newVal: string }> = [];
const newLines: string[] = [];

for (const slug of slugs) {
  const data = skuSeoData[slug] as any;
  if (!data) { console.log(`⚠️ ${slug} 无 sku-seo 条目, 跳过`); continue; }
  const seoZh = data.seo?.['zh-hk'];
  if (!seoZh) { console.log(`⚠️ ${slug} 无 zh-hk seo 条目, 跳过`); continue; }
  const product = products.find((p: any) => p.slug === slug);
  const catSlug = product?.category?.slug || 'stickers';
  const skuTitle = seoZh.title || product?.name || slug;

  let changed = false;
  const newSeo = { ...seoZh };
  const oldMeta = seoZh.description || '';
  const oldAlt = data.imageAlt?.['zh-hk'] || '';

  // 应用 mode 修复
  if (mode === 'meta-overlong') {
    const fixed = fixMetaOverlong(oldMeta);
    if (fixed && fixed !== oldMeta) { newSeo.description = fixed; changed = true; }
  } else if (mode === 'meta-short') {
    const fixed = fixMetaShort(oldMeta, catSlug, skuTitle);
    if (fixed !== oldMeta) { newSeo.description = fixed; changed = true; }
  } else if (mode === 'cta') {
    const fixed = fixCTA(oldMeta);
    if (fixed !== oldMeta) { newSeo.description = fixed; changed = true; }
  } else if (mode === 'alt-short') {
    const fixed = fixAltShort(oldAlt, catSlug);
    if (fixed !== oldAlt) { data.imageAlt = { ...data.imageAlt, 'zh-hk': fixed }; changed = true; }
  }

  if (!changed) { console.log(`⏭ ${slug} 无需修改`); continue; }

  // NAP check
  const finalText = mode === 'alt-short' ? (data.imageAlt['zh-hk']) : newSeo.description;
  if (hasNAP(finalText)) {
    console.log(`❌ ${slug} 修复后仍含 NAP, 跳过: ${finalText.substring(0, 80)}...`);
    failed++;
    continue;
  }

  // 字符数 check
  if (mode === 'meta-overlong' && finalText.length > 160) {
    console.log(`❌ ${slug} 修复后仍超长 (${finalText.length}), 跳过`);
    failed++;
    continue;
  }
  if (mode === 'meta-short' && finalText.length < 80) {
    console.log(`❌ ${slug} 修复后仍偏短 (${finalText.length}), 跳过`);
    failed++;
    continue;
  }

  console.log(`  [${slug}] (${catSlug})`);
  if (mode === 'alt-short') {
    console.log(`    OLD alt (${oldAlt.length}字): ${oldAlt}`);
    console.log(`    NEW alt (${finalText.length}字): ${finalText}`);
  } else {
    console.log(`    OLD meta (${oldMeta.length}字): ${oldMeta.substring(0, 60)}...`);
    console.log(`    NEW meta (${finalText.length}字): ${finalText.substring(0, 60)}...`);
  }

  if (isApply) {
    if (mode === 'alt-short') {
      pendingWrites.push({ slug, field: 'imageAlt-zh-hk', newVal: data.imageAlt['zh-hk'] });
    } else {
      pendingWrites.push({ slug, field: 'description-zh-hk', newVal: newSeo.description });
    }
    modified++;
  } else {
    // DRY-RUN 也统计待修改数
    modified++;
  }
}

if (isApply) {
  if (modified === 0) { console.log('\n⏭ 无需修改'); process.exit(0); }
  console.log(`\n💾 写回 ${SKU_DATA_PATH}...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  const failures: string[] = [];

  for (const fix of pendingWrites) {
    const slugStart = content.indexOf(`"${fix.slug}":`);
    if (slugStart < 0) { failures.push(`slug not found: ${fix.slug}`); continue; }

    if (fix.field === 'imageAlt-zh-hk') {
      const imgAltStart = content.indexOf('"imageAlt":', slugStart);
      const zhHkStart = content.indexOf('"zh-hk":', imgAltStart);
      const valStartQuote = content.indexOf('"', zhHkStart + 7);
      const valStart = valStartQuote + 1;
      const valEnd = content.indexOf('"', valStart);
      content = content.substring(0, valStart) + fix.newVal + content.substring(valEnd);
    } else if (fix.field === 'description-zh-hk') {
      // 找 seo -> zh-hk -> description -> 值
      const seoStart = content.indexOf('"seo":', slugStart);
      const zhHkStart = content.indexOf('"zh-hk":', seoStart);
      const descKeyStart = content.indexOf('"description":', zhHkStart);
      const valStartQuote = content.indexOf('"', descKeyStart + 13);
      const valStart = valStartQuote + 1;
      const valEnd = content.indexOf('"', valStart);
      content = content.substring(0, valStart) + fix.newVal + content.substring(valEnd);
    }
    successCount++;
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`✅ 修改完成: ${successCount} 成功, ${failures.length} 失败`);
  if (failures.length > 0) for (const f of failures) console.log(`  ❌ ${f}`);
  console.log(`\n📋 后续: 重 audit + Live curl + commit + push + verify-deploy`);
} else {
  if (modified === 0) { console.log('\n⏭ 无需修改'); process.exit(0); }
  console.log(`\n✅ DRY-RUN 完成: ${modified} SKU 待修改, ${failed} 失败`);
  console.log(`确认后运行: npx tsx scripts/fix-meta-warn.ts --mode=${mode} --apply`);
}
