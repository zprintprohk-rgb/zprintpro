/**
 * 批量修复 imageAlt FAQ 污染 + 缺失 + 超长
 * 2026-07-14 user 拍板: Q1=B (43 SKU 批量), Q2=A (改 sku-seo-data.ts), Q3=A (BC 仅修 alt)
 *
 * 用法:
 *   npx tsx scripts/clean-faq-alt.ts --dry-run  > fix-preview.md
 *   npx tsx scripts/clean-faq-alt.ts --apply
 *
 * 影响: 35 FAQ 残留 + 8 缺失 + 2 超长 = 43 SKU
 * 源文件: src/data/sku-seo-data.ts (SSoT)
 *
 * 不动:
 *   - en/ja alt (按 AGENTS.md §13.13 3 locale 独立)
 *   - BC SKU 的 Title/Meta/Description (§11 禁区但仅修 alt, 不删 SKU)
 *   - Body / longDescription (§11 风险 + 工程量爆炸, 留 P4)
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { products } from '../src/data/products.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';

// ============================================================
// 1. FAQ 检测 (与 audit-seo-meta.ts 同步)
// ============================================================
const FAQ_TRIGGERS_ZHHK = ['多少', '什么', '哪裡', '哪些', '如何', '怎么', '可以嗎', '嗎', '呢', '這款', '這是', '能否'];
const NAP_FORBIDDEN = ['深圳', 'Shenzhen', '深セン', '智印印港', '名片', 'business card', 'businesscards', '咭片'];

function isFAQAlt(alt: string): boolean {
  if (!alt) return false;
  if (/[?？]/.test(alt)) return true;
  for (const t of FAQ_TRIGGERS_ZHHK) {
    if (alt.includes(t)) return true;
  }
  return false;
}

function hasNAP(alt: string): string[] {
  return NAP_FORBIDDEN.filter(w => alt.includes(w));
}

// ============================================================
// 2. Alt 生成器 (按 category 模板)
// ============================================================
const CAT_KEYFEATURE: Record<string, string> = {
  stickers: '不干膠',
  flyers: '雙面四色',
  packaging: '訂製',
  'paper-bags': '環保',
  posters: '防水材質',
  banners: '高清噴繪',
  calendars: '企業禮品',
  'red-packets': '燙金 UV',
  educational: '校園印刷',
  books: '精裝膠裝',
  menus: '防水覆膜',
  envelopes: '開窗信封',
  'gift-boxes': '禮盒訂製',
  'japan-doujin': '同人誌印刷',
  'business-cards': '專業商務印刷'  // §11 禁区, 中性化 (避免 名片/business cards)
};

const CAT_VERB: Record<string, string> = {
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
  'business-cards': '訂製'  // 中性化
};

const CAT_DEFAULT_MATERIAL: Record<string, string> = {
  stickers: 'PVC 防水／PP 合成紙',
  flyers: '157g 銅版紙',
  packaging: '350g 白卡紙',
  'paper-bags': 'FSC 認證紙',
  posters: 'PP 合成紙',
  banners: '高清噴繪布',
  calendars: '銅版紙',
  'red-packets': '特種紙',
  educational: '環保紙',
  books: '銅版紙',
  menus: 'PVC 防水',
  envelopes: '牛皮紙',
  'gift-boxes': '白卡紙',
  'japan-doujin': '特殊紙',
  'business-cards': '300g 銅版紙'  // 中性化
};

function generateAlt(p: any): string {
  const cat = p.category_slug;
  let shortName = p.name.split('|')[0].trim();
  const keyFeature = CAT_KEYFEATURE[cat] || '訂製';
  const verb = CAT_VERB[cat] || '印刷';
  const defaultMaterial = CAT_DEFAULT_MATERIAL[cat] || '高級材質';

  // §11 禁区: BC SKU 的 alt 必须中性化 (避免 咭片/名片/business cards)
  if (cat === 'business-cards') {
    shortName = '專業商務印刷';  // 覆盖 product.name, 完全脱敏
  }

  // 名字太长 (BK/ED 类 110+ chars 名字): 取前 12 字
  // 例: "香港畫冊印刷 — 攝影集 / 展覽圖錄 / 產品型錄 / 藝術作品集定製" → "香港畫冊印刷"
  if (shortName.length > 12) {
    shortName = shortName.split(' — ')[0].split(' / ')[0].substring(0, 12);
  }

  // 提取 material (前 18 字, 避免超长)
  let material = defaultMaterial;
  if (p.specs?.material) {
    const m = String(p.specs.material).split(/[；;]/)[0].trim();
    if (m.length <= 24 && !hasNAP(m).length) material = m;
  }

  // 短名已含 "香港" 前缀时, 第二段不再加 "香港" (避免 香港香港xxx 重复)
  const locPrefix = shortName.startsWith('香港') ? '' : '香港';

  // 短名已含 verb 词尾时, 第二段不再加 verb (避免 印刷印刷/訂製訂製 重复)
  const needsVerb = !shortName.endsWith(verb) && !shortName.includes(verb);
  const verbPart = needsVerb ? verb : '';

  // 模板: {短名} / {keyFeature} | {locPrefix}{短名}{verbPart} [material] | ZprintPro
  let alt = `${shortName} / ${keyFeature} | ${locPrefix}${shortName}${verbPart} ${material} | ZprintPro智印雲`;

  // 截断到 100 字符 (留 20 字符 buffer, 标准 < 120)
  if (alt.length > 100) {
    alt = alt.substring(0, 92) + ' | ZprintPro';
  }
  return alt;
}

// ============================================================
// 3. 扫描 SKU 数据
// ============================================================
const fixes: Array<{
  slug: string;
  sku: string;
  category: string;
  type: 'faq' | 'missing' | 'overlong' | 'nap';
  oldAlt?: string;
  newAlt: string;
  oldLen: number;
  newLen: number;
}> = [];

let totalScanned = 0;
let totalFixed = 0;

for (const product of products) {
  const slug = product.slug;
  const entry = skuSeoData[slug];
  if (!entry) continue;

  totalScanned++;
  const oldAlt = entry.imageAlt?.['zh-hk'];
  const newAlt = generateAlt(product);

  let type: 'faq' | 'missing' | 'overlong' | 'nap' | null = null;
  if (!oldAlt || oldAlt.trim().length === 0) {
    type = 'missing';
  } else if (isFAQAlt(oldAlt)) {
    type = 'faq';
  } else if (oldAlt.length > 120) {
    type = 'overlong';
  } else if (hasNAP(oldAlt).length > 0) {
    type = 'nap';
  }

  if (type) {
    totalFixed++;
    fixes.push({
      slug, sku: product.sku_code, category: product.category_slug,
      type, oldAlt, newAlt,
      oldLen: oldAlt?.length || 0, newLen: newAlt.length
    });
  }
}

// ============================================================
// 4. CLI 参数处理
// ============================================================
const args = process.argv.slice(2);
const isApply = args.includes('--apply');
const isDryRun = args.includes('--dry-run') || !isApply;

if (isDryRun) {
  console.log('========================================');
  console.log(`🔍 DRY-RUN 模式 (共 ${totalFixed} 个 SKU 待修复)`);
  console.log('========================================\n');

  // 按类型分组
  const byType: Record<string, typeof fixes> = {};
  for (const f of fixes) {
    if (!byType[f.type]) byType[f.type] = [];
    byType[f.type].push(f);
  }

  for (const [type, list] of Object.entries(byType)) {
    console.log(`--- ${type.toUpperCase()} (${list.length} 个) ---`);
    for (const f of list) {
      console.log(`  [${f.sku}] ${f.slug} (${f.category})`);
      console.log(`    OLD (${f.oldLen}字): ${f.oldAlt || '(missing)'}`);
      console.log(`    NEW (${f.newLen}字): ${f.newAlt}`);
    }
    console.log('');
  }

  console.log('========================================');
  console.log(`💡 类型分布:`);
  for (const [type, list] of Object.entries(byType)) {
    console.log(`   ${type}: ${list.length}`);
  }
  console.log(`\n确认无问题后运行: npx tsx scripts/clean-faq-alt.ts --apply`);
  process.exit(0);
}

// ============================================================
// 5. --apply 模式: 实际修改文件
// ============================================================
console.log('========================================');
console.log(`🔧 APPLY 模式 (修改 ${totalFixed} 个 SKU)`);
console.log('========================================\n');

let content = readFileSync(SKU_DATA_PATH, 'utf8');
let successCount = 0;
let failCount = 0;
const failures: string[] = [];

for (const f of fixes) {
  // 1. 找 slug 起点
  const slugStart = content.indexOf(`"${f.slug}":`);
  if (slugStart < 0) {
    failCount++;
    failures.push(`slug not found: ${f.slug}`);
    continue;
  }

  // 2. 找 imageAlt 起点
  const imgAltStart = content.indexOf('"imageAlt":', slugStart);
  if (imgAltStart < 0) {
    failCount++;
    failures.push(`imageAlt not found: ${f.slug}`);
    continue;
  }

  // 3. 找 zh-hk 起点
  const zhHkStart = content.indexOf('"zh-hk":', imgAltStart);
  if (zhHkStart < 0) {
    failCount++;
    failures.push(`zh-hk not found in imageAlt: ${f.slug}`);
    continue;
  }

  // 4. 找值起点
  const valStartQuote = content.indexOf('"', zhHkStart + 7);
  if (valStartQuote < 0) {
    failCount++;
    failures.push(`zh-hk value start not found: ${f.slug}`);
    continue;
  }
  const valStart = valStartQuote + 1;

  // 5. 找值终点 (下一个 ")
  const valEnd = content.indexOf('"', valStart);
  if (valEnd < 0) {
    failCount++;
    failures.push(`zh-hk value end not found: ${f.slug}`);
    continue;
  }

  // 6. 替换
  const before = content.substring(0, valStart);
  const after = content.substring(valEnd);
  content = before + f.newAlt + after;
  successCount++;
}

writeFileSync(SKU_DATA_PATH, content, 'utf8');

console.log(`✅ 修改完成: ${successCount} 成功, ${failCount} 失败\n`);

if (failures.length > 0) {
  console.log('--- 失败列表 ---');
  for (const f of failures) console.log(`  ❌ ${f}`);
}

console.log('\n========================================');
console.log('📋 后续步骤:');
console.log('1. 重跑 P1 audit: npx tsx scripts/audit-seo-meta.ts');
console.log('2. Live curl 5 SKU: curl -s https://zprintpro.com/zh-hk/product/<slug>/ | grep "alt="');
console.log('3. Commit + push + verify-deploy');
console.log('========================================');
