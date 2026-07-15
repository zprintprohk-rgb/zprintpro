/**
 * en SEO 主题关键词富化 (2026-07-15)
 * 3 主题 × 39 SKU × 4 字段批量注入
 *
 * 主题:
 * 1. PET (31 SKU: 7 ST + 6 PO + 10 PK + 8 PB) - pet food label, pet brand, pet portrait, pet memorial
 * 2. WALL ART (6 PO) - custom poster printing, wall art, gallery wall, nursery art
 * 3. HOLIDAY (8 SKU: 5 FL + 3 RP) - custom holiday card, Mother's Day, wedding invitation
 *
 * 字段更新 (en locale):
 * 1. seo.en.title (50-60 chars) - 加 1 主关键词
 * 2. seo.en.description (150-160 chars) - 加 1 长尾 + 1 CTA
 * 3. seo.en.keywords[] - 增 4-6 主题词 (总 8-10)
 * 4. imageAlt.en (60-80 chars) - 加 1 sharp hook
 *
 * 不改动: h1 (V8 已优化), body, faqs
 *
 * 引用 §11 主营约束: 不新增 SKU/类目, 主题词作为"适配行业"融入
 * 引用 §13.10 NAP 脱钩: en 标题 100% 过滤 Shenzhen/China/中国
 * 引用 §13.15 美国集中: en sharp hook 优先 Free Shipping / Free Design
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

interface ThemeUpdate {
  title: string;
  description: string;
  alt: string;
  newKeywords: string[];
}

// ===== 主题配置 (3 主题) =====
const PET_UPDATE: ThemeUpdate = {
  title: 'Custom {SHORT} for Pet Brands | ZprintPro',
  description: 'Custom {SHORT} for pet food and brand labels. FDA-compliant, 100 MOQ, Free Shipping $99+, 4-day USA delivery. | ZprintPro',
  alt: 'Custom {SHORT} for pet food and brand labels — ZprintPro智印雲',
  newKeywords: [
    'pet food label', 'pet brand label', 'custom pet label',
    'pet portrait', 'pet memorial', 'pet lover gift',
    'dog mom gift', 'cat dad gift', 'pet treat label',
  ],
};

const WALL_ART_UPDATE: ThemeUpdate = {
  title: '{SHORT} Wall Art & Gallery Print | ZprintPro',
  description: '{SHORT} custom printing for home decor and gallery walls. 50 MOQ, Free Shipping $99+, 4-day USA delivery. | ZprintPro',
  alt: '{SHORT} wall art for home decor, gallery walls — ZprintPro智印雲',
  newKeywords: [
    'custom poster printing', 'wall art print', 'gallery wall set',
    'home decor print', 'nursery art', 'minimalist wall art',
    'boho wall decor', 'art reproduction', 'museum quality print',
  ],
};

const HOLIDAY_UPDATE: ThemeUpdate = {
  title: '{SHORT} for Holiday Cards | ZprintPro',
  description: '{SHORT} for custom holiday cards, Mother\'s Day, wedding invitations. 100 MOQ, Free Shipping $99+, 4-day USA delivery. | ZprintPro',
  alt: '{SHORT} for holiday cards, wedding invitations — ZprintPro智印雲',
  newKeywords: [
    'custom holiday card', 'personalized greeting card', 'Mother\'s Day card',
    'wedding invitation', 'save the date', 'business holiday card',
    'photo greeting card', 'foil greeting card', 'luxury invitation card',
  ],
};

// ===== SKU 分类 → 主题映射 =====
const SKU_THEMES: Record<string, { theme: 'pet' | 'wall_art' | 'holiday'; short: string }> = {
  // ST (stickers) - 7 + fruit-food-label-stickers
  'waterproof-stickers': { theme: 'pet', short: 'Waterproof Stickers' },
  'transparent-stickers': { theme: 'pet', short: 'Transparent Stickers' },
  'removable-stickers': { theme: 'pet', short: 'Removable Stickers' },
  'small-batch-stickers': { theme: 'pet', short: 'Small Batch Stickers' },
  'die-cut-stickers': { theme: 'pet', short: 'Die-Cut Stickers' },
  'foil-stickers': { theme: 'pet', short: 'Foil Stickers' },
  'security-stickers': { theme: 'pet', short: 'Security Stickers' },
  'fluorescent-stickers': { theme: 'pet', short: 'Fluorescent Stickers' },
  'fruit-food-label-stickers': { theme: 'pet', short: 'Food Label Stickers' },
  // PO (posters) - 6 → 双主题: pet + wall_art
  'a2-posters': { theme: 'wall_art', short: 'A2 Posters' },
  'a1-posters': { theme: 'wall_art', short: 'A1 Posters' },
  'outdoor-posters': { theme: 'wall_art', short: 'Outdoor Posters' },
  'display-posters': { theme: 'wall_art', short: 'Display Posters' },
  'art-posters': { theme: 'wall_art', short: 'Art Posters' },
  'adhesive-posters': { theme: 'wall_art', short: 'Adhesive Posters' },
  // PK (packaging) - 10
  'gift-boxes': { theme: 'pet', short: 'Gift Boxes' },
  'cosmetic-boxes': { theme: 'pet', short: 'Cosmetic Boxes' },
  'mailer-boxes': { theme: 'pet', short: 'Mailer Boxes' },
  'folding-boxes': { theme: 'pet', short: 'Folding Boxes' },
  'magnetic-closure-gift-box': { theme: 'pet', short: 'Magnetic Closure Gift Box' },
  'kraft-paper-packaging-box': { theme: 'pet', short: 'Kraft Paper Packaging Box' },
  'drawer-slide-gift-box': { theme: 'pet', short: 'Drawer Slide Gift Box' },
  'electronics-packaging-box': { theme: 'pet', short: 'Electronics Packaging Box' },
  'rigid-boxes': { theme: 'pet', short: 'Rigid Boxes' },
  'food-boxes': { theme: 'pet', short: 'Food Boxes' },
  // PB (paper-bags) - 7
  'kraft-paper-bags': { theme: 'pet', short: 'Kraft Paper Bags' },
  'eco-paper-bags': { theme: 'pet', short: 'Eco Paper Bags' },
  'large-bags': { theme: 'pet', short: 'Large Paper Bags' },
  'handle-bags': { theme: 'pet', short: 'Handle Bags' },
  'white-card-bags': { theme: 'pet', short: 'White Card Bags' },
  'small-bags': { theme: 'pet', short: 'Small Paper Bags' },
  'gift-bags': { theme: 'pet', short: 'Gift Paper Bags' },
  // FL (flyers) - 5 → holiday
  'a4-flyers': { theme: 'holiday', short: 'A4 Flyers' },
  'a5-flyers': { theme: 'holiday', short: 'A5 Flyers' },
  'double-sided-flyers': { theme: 'holiday', short: 'Double-Sided Flyers' },
  'thick-paper-flyers': { theme: 'holiday', short: 'Thick Paper Flyers' },
  'same-day-flyers': { theme: 'holiday', short: 'Same-Day Flyers' },
  // RP (red-packets) - 3 → holiday (CNY luxury card angle)
  'foil-red-packets': { theme: 'holiday', short: 'Foil Red Packets' },
  'embossed-red-packets': { theme: 'holiday', short: 'Embossed Red Packets' },
  'custom-red-packets': { theme: 'holiday', short: 'Custom Red Packets' },
};

const THEME_CONFIG: Record<string, ThemeUpdate> = {
  pet: PET_UPDATE,
  wall_art: WALL_ART_UPDATE,
  holiday: HOLIDAY_UPDATE,
};

console.log(`\n🔧 en SEO 3 主题富化 (${isApply ? 'APPLY' : 'DRY-RUN'})`);
console.log(`  - 目标 ${Object.keys(SKU_THEMES).length} SKU × 4 字段 (title/desc/keywords/alt)\n`);

let modified = 0;
let failed = 0;
const pendingWrites: Array<{ slug: string; field: string; oldVal: string; newVal: string; newKeywords?: string[] }> = [];

for (const [slug, mapping] of Object.entries(SKU_THEMES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { console.log(`  ⚠️ ${slug}: NOT FOUND`); failed++; continue; }
  const config = THEME_CONFIG[mapping.theme];
  const fillTpl = (tpl: string) => tpl.replace(/\{SHORT\}/g, mapping.short);

  const newTitle = fillTpl(config.title);
  const newDesc = fillTpl(config.description);
  const newAlt = fillTpl(config.alt);

  // 长度校验
  const titleWarn = newTitle.length > 60;
  const descWarn = newDesc.length > 160 || newDesc.length < 100;
  // NAP 校验
  const napWarn = /Shenzhen|智印港|深セン|China factory|printed in china/i.test(newTitle + newDesc + newAlt);
  // 关键词堆砌
  const combinedText = newTitle + ' ' + newDesc;
  const tokens = combinedText.toLowerCase().match(/[a-z]{4,}/g) || [];
  const freq = new Map<string, number>();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  const topFreq = [...freq.entries()].sort((a, b) => b[1] - a[1])[0];

  const oldTitle = data.seo?.en?.title || '';
  const oldDesc = data.seo?.en?.description || '';
  const oldAlt = data.imageAlt?.en || '';
  const oldKw = data.seo?.en?.keywords || [];

  console.log(`  [${slug}] theme=${mapping.theme}`);
  console.log(`    title (${oldTitle.length}→${newTitle.length}): ${newTitle.slice(0, 80)}`);
  console.log(`    desc  (${oldDesc.length}→${newDesc.length}): ${newDesc.slice(0, 80)}...`);
  console.log(`    alt   (${oldAlt.length}→${newAlt.length}): ${newAlt.slice(0, 80)}`);
  console.log(`    +kw   (${oldKw.length}→${oldKw.length + config.newKeywords.length}): +${config.newKeywords.slice(0, 3).join(', ')}, ...`);

  if (titleWarn) { console.log(`    ❌ title >60 chars`); failed++; continue; }
  if (descWarn) { console.log(`    ❌ desc 长度异常 ${newDesc.length}`); failed++; continue; }
  if (napWarn) { console.log(`    ❌ NAP 词污染`); failed++; continue; }
  if (topFreq && topFreq[1] >= 4) { console.log(`    ❌ 关键词堆砌: "${topFreq[0]}" x${topFreq[1]}`); failed++; continue; }

  if (isApply) {
    pendingWrites.push({ slug, field: 'title', oldVal: oldTitle, newVal: newTitle });
    pendingWrites.push({ slug, field: 'description', oldVal: oldDesc, newVal: newDesc });
    pendingWrites.push({ slug, field: 'alt', oldVal: oldAlt, newVal: newAlt });
    pendingWrites.push({ slug, field: 'keywords', oldVal: JSON.stringify(oldKw), newVal: JSON.stringify([...oldKw, ...config.newKeywords]) });
  }
  modified++;
}

if (isApply && pendingWrites.length > 0) {
  console.log(`\n💾 写回 ${SKU_DATA_PATH}...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  // 按 (slug, field) 分组, 每组只 search 一次定位
  const bySlug = new Map<string, typeof pendingWrites>();
  for (const w of pendingWrites) {
    if (!bySlug.has(w.slug)) bySlug.set(w.slug, []);
    bySlug.get(w.slug)!.push(w);
  }
  for (const [slug, writes] of bySlug) {
    const slugStart = content.indexOf(`"${slug}":`);
    if (slugStart < 0) { console.log(`  ! ${slug}: slug not found`); failed += writes.length; continue; }
    for (const w of writes) {
      let fieldStart: number;
      let prefixLen: number;
      let valEndMarker: string;
      if (w.field === 'title') {
        const seoStart = content.indexOf('"seo":', slugStart);
        const enStart = content.indexOf('"en":', seoStart);
        fieldStart = content.indexOf('"title":', enStart);
        prefixLen = 9;
        valEndMarker = '"';
      } else if (w.field === 'description') {
        const seoStart = content.indexOf('"seo":', slugStart);
        const enStart = content.indexOf('"en":', seoStart);
        fieldStart = content.indexOf('"description":', enStart);
        prefixLen = 14;
        valEndMarker = '"';
      } else if (w.field === 'alt') {
        const imgAltStart = content.indexOf('"imageAlt":', slugStart);
        const enStart = content.indexOf('"en":', imgAltStart);
        fieldStart = enStart;
        prefixLen = 6; // "en":
        valEndMarker = '"';
      } else if (w.field === 'keywords') {
        // keywords 是 array of string, 需要重写整个 array
        const seoStart = content.indexOf('"seo":', slugStart);
        const enStart = content.indexOf('"en":', seoStart);
        const kwStart = content.indexOf('"keywords":', enStart);
        const arrayStart = content.indexOf('[', kwStart);
        const arrayEnd = content.indexOf(']', arrayStart);
        const newArr = w.newVal; // 含 [ ]
        // BUG fix 2026-07-15: newArr 已经含 ], 必须 substring(arrayEnd + 1) 跳过旧 ] 否则双 ]]
        content = content.substring(0, arrayStart) + newArr + content.substring(arrayEnd + 1);
        successCount++;
        continue;
      } else {
        continue;
      }
      // 找值的开始位置: fieldStart + prefixLen = 字段名后第一个字符 (= ":")
      //   title:  fieldStart + 9 = ": " + 第一个 '"' 后位置, 跳过 ": \"" 共 3 字符 → fieldStart + 10 = 值第一字符
      //   description: fieldStart + 14 = 跳过 ": \"" → fieldStart + 15 = 值第一字符
      //   alt: enStart + 6 = ": \"" 之后 → enStart + 7 = 值第一字符
      // 简化: valStart = fieldStart + prefixLen + 1 即可 (跳过 ": \"" 三字符)
      const valStart = fieldStart + prefixLen + 1;
      // sanity check: valStart-1 应该是 " (值的开始引号)
      if (content[valStart - 1] !== '"') {
        console.log(`  ! ${slug} ${w.field}: 位置异常 (expected " at pos ${valStart - 1}, got ${JSON.stringify(content[valStart - 1])})`);
        failed++; continue;
      }
      // 找值的结束引号
      const valEnd = content.indexOf(valEndMarker, valStart);
      if (valEnd < 0) { failed++; continue; }
      // 替换: substring(0, valStart) 包含值的开始 ", valEnd 指向结束 ", substring(valEnd) 包含结束 " + 后续 (, 换行, etc)
      // BUG fix 2026-07-15 v3: 之前 valEnd + 1 跳过结束 ", 但 newVal 不带引号, 拼接后缺结尾 " — 改回 valEnd (保留结束 ")
      content = content.substring(0, valStart) + w.newVal.replace(/"/g, '\\"') + content.substring(valEnd);
      successCount++;
    }
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`✅ 完成: ${successCount} 字段成功, ${failed} 失败`);
} else {
  console.log(`\n✅ DRY-RUN: ${modified} SKU 准备就绪 (${pendingWrites.length} 字段)`);
  console.log(`\n确认后运行: npx tsx scripts/enrich-en-themes.ts --apply`);
}
