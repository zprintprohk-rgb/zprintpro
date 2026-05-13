/**
 * 全站图片审计脚本
 * 扫描 public/images/ 下所有关键图片，输出缺失/错配报告
 */

const fs = require('fs');
const path = require('path');

const locales = ['zh-hk', 'en', 'ja'];
const baseDir = 'public/images';
const report = {
  missing: [],
  wrongLocale: [],
  uiIssues: [],
  heroAudit: [],
  productAudit: [],
  blogAudit: [],
  recommendations: [],
};

function fileExists(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

// ===== 1. Hero 图审计（13 分类 × 3 语言） =====
const heroCategories = [
  { slug: 'paper-bags', base: 'hero-kraft-bag' },
  { slug: 'flyers', base: 'hero-flyer' },
  { slug: 'stickers', base: 'hero-sticker' },
  { slug: 'packaging', base: 'hero-gift-box' },
  { slug: 'posters', base: 'hero-poster' },
  { slug: 'business-cards', base: 'hero-business-cards' },
  { slug: 'banners', base: 'hero-banners' },
  { slug: 'books', base: 'hero-books' },
  { slug: 'menus', base: 'hero-menus' },
  { slug: 'envelopes', base: 'hero-envelopes' },
  { slug: 'calendars', base: 'hero-calendars' },
  { slug: 'red-packets', base: 'hero-red-packets' },
  { slug: 'educational', base: 'hero-educational' },
];

heroCategories.forEach(({ slug, base }) => {
  locales.forEach((loc) => {
    const filename = `${base}-${loc}.webp`;
    const filePath = path.join(baseDir, 'hero', filename);
    const exists = fileExists(filePath);
    report.heroAudit.push({ slug, locale: loc, filename, exists });
    if (!exists) {
      report.missing.push({ type: 'hero', category: slug, locale: loc, path: filePath, suggestion: `生成 ${filename} (1320x400)` });
    }
  });
});

// ===== 2. Blog 图审计 =====
const blogTopics = [
  'company-intro', 'sticker-guide', 'business-card-design', 'packaging-trends',
  'hong-kong-printing-guide', 'design-file-specs', 'brand-materials-checklist',
  'mtr-advertising-specs', 'cmyk-guide', 'paper-materials', 'eco-printing',
];

// 检查子目录图 /images/blog/{locale}/{slug}.webp
blogTopics.forEach((topic) => {
  locales.forEach((loc) => {
    const filePath = path.join(baseDir, 'blog', loc, `${topic}.webp`);
    const exists = fileExists(filePath);
    report.blogAudit.push({ topic, locale: loc, path: filePath, exists });
    if (!exists) {
      report.missing.push({ type: 'blog', topic, locale: loc, path: filePath, suggestion: `生成 blog/${loc}/${topic}.webp` });
    }
  });
});

// ===== 3. 产品图审计（读取 products.ts 中的 imagesByLocale） =====
// 由于 products.ts 是 TypeScript 且很大，我们用正则提取 imagesByLocale 块
const productsPath = path.join(__dirname, '../src/data/products.ts');
let productsContent = '';
try {
  productsContent = fs.readFileSync(productsPath, 'utf-8');
} catch {
  console.error('无法读取 products.ts');
}

// 提取每个产品的 slug 和 imagesByLocale
const productBlocks = productsContent.match(/slug:\s*['"]([^'"]+)['"][\s\S]*?imagesByLocale\?:\s*\{[\s\S]*?\n  \}/g) || [];

// 更简单的方法：提取所有 slug 和对应的 imagesByLocale 内容
const slugMatches = [...productsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const productSlugs = slugMatches.map(m => m[1]);

// 检查 /images/products/seedream-webp/ 下是否有各 locale 文件
const seedreamDir = path.join(baseDir, 'products', 'seedream-webp');
let seedreamFiles = [];
if (fs.existsSync(seedreamDir)) {
  seedreamFiles = fs.readdirSync(seedreamDir);
}

// 按 slug 分组检查各 locale 图片数量
productSlugs.forEach((slug) => {
  locales.forEach((loc) => {
    const pattern = new RegExp(`zprintpro-.*-${slug}-${loc}-\\d+\\.webp`);
    const hasFile = seedreamFiles.some(f => pattern.test(f));
    if (!hasFile) {
      // 只记录关键产品，避免太多噪音
      if (['white-card-bags', 'gift-bags', 'kraft-paper-bags', 'eco-paper-bags',
           'premium-business-cards', 'foil-business-cards', 'thick-business-cards-400g',
           'a5-flyers', 'a4-flyers', 'transparent-stickers', 'waterproof-stickers',
           'a2-posters', 'magnetic-closure-gift-box', 'cosmetic-boxes'].includes(slug)) {
        report.missing.push({
          type: 'product',
          product: slug,
          locale: loc,
          path: `${seedreamDir}/*${slug}-${loc}-*.webp`,
          suggestion: `生成 ${slug} 的 ${loc} 产品图`,
        });
      }
    }
  });
});

// ===== 4. 检查是否有中文图被 EN/ja 使用（通过文件名关键词） =====
// 如果 EN 文件数量远少于 zh-hk，说明存在 fallback 问题
const zhFiles = seedreamFiles.filter(f => f.includes('-zh-hk-'));
const enFiles = seedreamFiles.filter(f => f.includes('-en-'));
const jaFiles = seedreamFiles.filter(f => f.includes('-ja-'));

report.productAudit.push({
  summary: `seedream-webp: zh-hk=${zhFiles.length}, en=${enFiles.length}, ja=${jaFiles.length}`,
  risk: enFiles.length < zhFiles.length * 0.8 ? 'EN 图片数量不足，存在 fallback 到中文图风险' : 'OK',
});

// ===== 5. UI Issues =====
// 检查轮播图第三张是否为渐变（通过 HeroBanner.tsx 内容判断）
const heroBannerPath = path.join(__dirname, '../src/components/home/HeroBanner.tsx');
let heroBannerContent = '';
try {
  heroBannerContent = fs.readFileSync(heroBannerPath, 'utf-8');
} catch {}

if (heroBannerContent.includes('gradient') && heroBannerContent.includes('slide')) {
  report.uiIssues.push({
    type: 'hero-slider',
    issue: '首页轮播图可能包含渐变背景 slide',
    file: 'src/components/home/HeroBanner.tsx',
    recommendation: '将第三张替换为真实场景图（书店/教室/办公室）',
  });
}

// ===== 6. 输出报告 =====
const reportPath = path.join(__dirname, '../image-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

console.log('===== 图片审计报告 =====');
console.log(`Hero 图: ${report.heroAudit.filter(h => h.exists).length}/${report.heroAudit.length} 存在`);
console.log(`Blog 图: ${report.blogAudit.filter(b => b.exists).length}/${report.blogAudit.length} 存在`);
console.log(`缺失总数: ${report.missing.length}`);
console.log(`UI 问题: ${report.uiIssues.length}`);
console.log(`\n详细报告: ${reportPath}`);
