/**
 * Phase 6: 完整性检查脚本
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'F:\\新网站压缩后的图片';
const PROJECT_DIR = 'F:\\zprintpro-nextjs';

function getFiles(dir, pattern) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => pattern.test(f));
}

function fileSizeKB(filepath) {
  const stats = fs.statSync(filepath);
  return stats.size / 1024;
}

function parsePromptFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const matches = content.match(/Filename:\s*(.+\.jpg|.+\.png)/gi);
  return matches ? matches.length : 0;
}

function checkMetaJson(metaPath) {
  if (!fs.existsSync(metaPath)) return { exists: false, has3Lang: false };
  const data = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  const hasAlt = data.alt && data.alt['zh-hk'] && data.alt['en'] && data.alt['ja'];
  const hasTitle = data.title && data.title['zh-hk'] && data.title['en'] && data.title['ja'];
  return { exists: true, has3Lang: !!(hasAlt && hasTitle) };
}

function readFileContent(filepath) {
  if (!fs.existsSync(filepath)) return '';
  return fs.readFileSync(filepath, 'utf-8');
}

let passCount = 0;
let failCount = 0;

function check(name, condition, detail = '') {
  if (condition) {
    console.log(`[PASS] ${name}`);
    passCount++;
  } else {
    console.log(`[FAIL] ${name}${detail ? ' -> ' + detail : ''}`);
    failCount++;
  }
}

console.log('=== ZPrintPro Integrity Check ===\n');

// 1. Blog图检查
const bSourceFiles = fs.readdirSync(SOURCE_DIR).filter(f => /^b/i.test(f));
const blogPromptCount = parsePromptFile(path.join(PROJECT_DIR, 'seedream-blog-prompts.txt'));
const blogWebps = getFiles(path.join(PROJECT_DIR, 'public', 'images', 'blog'), /^blog-.*\.webp$/i);
check('1. Blog source files count', bSourceFiles.length >= 1, `found ${bSourceFiles.length}`);
check('1. Blog prompt file entries', blogPromptCount >= 1, `found ${blogPromptCount}`);
check('1. Blog output webp count', blogWebps.length === bSourceFiles.length, `expected ${bSourceFiles.length}, got ${blogWebps.length}`);

// 2. Hero图检查
const hSourceFiles = fs.readdirSync(SOURCE_DIR).filter(f => /^h/i.test(f));
const heroPromptCount = parsePromptFile(path.join(PROJECT_DIR, 'seedream-hero-prompts.txt'));
const heroWebps = getFiles(path.join(PROJECT_DIR, 'public', 'images', 'hero'), /^hero-.*\.webp$/i);
check('2. Hero source files count', hSourceFiles.length >= 1, `found ${hSourceFiles.length}`);
check('2. Hero prompt file entries', heroPromptCount >= 1, `found ${heroPromptCount}`);
check('2. Hero output webp count matches source', heroWebps.length === hSourceFiles.length, `expected ${hSourceFiles.length}, got ${heroWebps.length}`);
check('2. Hero output webp count matches prompts', heroWebps.length === heroPromptCount, `expected ${heroPromptCount}, got ${heroWebps.length}`);

// 3. Webp体积检查
let blogSizeOk = true;
let heroSizeOk = true;
for (const f of blogWebps) {
  const kb = fileSizeKB(path.join(PROJECT_DIR, 'public', 'images', 'blog', f));
  if (kb < 30 || kb > 150) {
    blogSizeOk = false;
    console.log(`  [WARN] Blog ${f}: ${kb.toFixed(1)}KB (expected 80-100KB)`);
  }
}
for (const f of heroWebps) {
  const kb = fileSizeKB(path.join(PROJECT_DIR, 'public', 'images', 'hero', f));
  if (kb < 60 || kb > 250) {
    heroSizeOk = false;
    console.log(`  [WARN] Hero ${f}: ${kb.toFixed(1)}KB (expected ~180KB)`);
  }
}
check('3. Blog webp sizes reasonable', blogSizeOk);
check('3. Hero webp sizes reasonable', heroSizeOk);

// 4. .meta.json检查
let blogMetaOk = true;
let heroMetaOk = true;
for (const f of blogWebps) {
  const metaPath = path.join(PROJECT_DIR, 'public', 'images', 'blog', f.replace('.webp', '.meta.json'));
  const r = checkMetaJson(metaPath);
  if (!r.exists || !r.has3Lang) {
    blogMetaOk = false;
    console.log(`  [WARN] Blog meta missing/incomplete: ${f}`);
  }
}
for (const f of heroWebps) {
  const metaPath = path.join(PROJECT_DIR, 'public', 'images', 'hero', f.replace('.webp', '.meta.json'));
  const r = checkMetaJson(metaPath);
  if (!r.exists || !r.has3Lang) {
    heroMetaOk = false;
    console.log(`  [WARN] Hero meta missing/incomplete: ${f}`);
  }
}
check('4. Blog .meta.json valid', blogMetaOk);
check('4. Hero .meta.json valid', heroMetaOk);

// 5. 导航下拉组件引用检查
const headerContent = readFileContent(path.join(PROJECT_DIR, 'src', 'components', 'layout', 'Header.tsx'));
check('5. Header uses /images/categories/{locale}/', headerContent.includes('/images/categories/${locale}/'));

// 6. 轮播图引用和透明度检查
const heroBannerContent = readFileContent(path.join(PROJECT_DIR, 'src', 'components', 'home', 'HeroBanner.tsx'));
check('6. HeroBanner references /images/hero/', heroBannerContent.includes("/images/hero/"));
check('6. HeroBanner overlay opacity 30%', heroBannerContent.includes('bg-black/30'));

// 7. 印刷知识下拉路径检查
check('7. Header blog dropdown uses /images/blog/{locale}/', headerContent.includes('/images/blog/${locale}/'));

// 8. 各语言目录无中文图残留
const catDir = path.join(PROJECT_DIR, 'public', 'images', 'categories');
let noZhResidue = true;
for (const loc of ['en', 'ja']) {
  const files = getFiles(path.join(catDir, loc), /\.webp$/i);
  for (const f of files) {
    // 检查文件内容/名称是否明显是中文图（简单启发式：文件名包含zh-hk）
    if (f.includes('zh-hk')) {
      noZhResidue = false;
      console.log(`  [WARN] Chinese image residue in ${loc}: ${f}`);
    }
  }
}
check('8. No Chinese image residue in en/ja categories', noZhResidue);

// Extra: Eco Paper Bags EN
const ecoFiles = getFiles(path.join(PROJECT_DIR, 'public', 'images', 'products', 'seedream-webp'), /zprintpro-paper-bags-eco-paper-bags-en-1\d\.webp$/);
check('Extra: Eco Paper Bags EN 11-14 exist', ecoFiles.length === 4, `found ${ecoFiles.length}`);

// Extra: ProductGallery default first image
const galleryContent = readFileContent(path.join(PROJECT_DIR, 'src', 'components', 'ProductGallery.tsx'));
check('Extra: ProductGallery defaults to first image', galleryContent.includes('const defaultIndex = 0'));

console.log(`\n=== RESULT: ${passCount} passed, ${failCount} failed ===`);
process.exit(failCount > 0 ? 1 : 0);
