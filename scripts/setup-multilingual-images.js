/**
 * Phase 3: 设置多语言分类和Blog图片目录结构
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = 'F:\\zprintpro-nextjs';
const CATEGORIES_DIR = path.join(PROJECT_DIR, 'public', 'images', 'categories');
const BLOG_DIR = path.join(PROJECT_DIR, 'public', 'images', 'blog');
const PRODUCTS_DIR = path.join(PROJECT_DIR, 'public', 'images', 'products', 'seedream-webp');

const locales = ['zh-hk', 'en', 'ja'];

// Header.tsx中的featuredImages映射（zh-hk版本）
const featuredImages = {
  'kraft-paper-bags': '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-zh-hk-1.webp',
  'white-card-bags': '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-zh-hk-1.webp',
  'gift-bags': '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-zh-hk-1.webp',
  'eco-paper-bags': '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-zh-hk-1.webp',
  'handle-bags': '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-zh-hk-1.webp',
  'large-bags': '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-zh-hk-1.webp',
  'a4-flyers': '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-zh-hk-1.webp',
  'a5-flyers': '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-zh-hk-1.webp',
  'double-sided-flyers': '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-zh-hk-1.webp',
  'folded-leaflets': '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-zh-hk-1.webp',
  'thick-paper-flyers': '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-zh-hk-1.webp',
  'same-day-flyers': '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-zh-hk-1.webp',
  'waterproof-stickers': '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-zh-hk.webp',
  'transparent-stickers': '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-zh-hk-1.webp',
  'foil-stickers': '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-zh-hk-1.webp',
  'removable-stickers': '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-zh-hk-1.webp',
  'die-cut-stickers': '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-zh-hk-1.webp',
  'fruit-food-label-stickers': '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-zh-hk-1.webp',
  'gift-boxes': '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk.webp',
  'cosmetic-boxes': '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-zh-hk.webp',
  'food-boxes': '/images/products/seedream-webp/zprintpro-packaging-food-boxes-zh-hk.webp',
  'mailer-boxes': '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-zh-hk.webp',
  'folding-boxes': '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-zh-hk.webp',
  'rigid-boxes': '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-zh-hk.webp',
  'magnetic-closure-gift-box': '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-zh-hk-1.webp',
  'electronics-packaging-box': '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-zh-hk-1.webp',
  'kraft-paper-packaging-box': '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-zh-hk-1.webp',
  'drawer-slide-gift-box': '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-zh-hk-1.webp',
  'a2-posters': '/images/products/seedream-webp/zprintpro-posters-a2-posters-zh-hk-1.webp',
  'a1-posters': '/images/products/seedream-webp/zprintpro-posters-a1-posters-zh-hk-1.webp',
  'outdoor-posters': '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-zh-hk-1.webp',
  'display-posters': '/images/products/seedream-webp/zprintpro-posters-display-posters-zh-hk.webp',
  'art-posters': '/images/products/seedream-webp/zprintpro-posters-art-posters-zh-hk.webp',
  'adhesive-posters': '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-zh-hk.webp',
  'exercise-books': '/images/products/seedream-webp/zprintpro-educational-exercise-books-zh-hk-1.webp',
  'certificates': '/images/products/seedream-webp/zprintpro-educational-certificates-zh-hk-1.webp',
  'school-flyers': '/images/products/seedream-webp/zprintpro-educational-school-flyers-zh-hk-1.webp',
  'textbooks': '/images/products/seedream-webp/zprintpro-educational-textbooks-zh-hk-1.webp',
};

// Blog slug映射（Header下拉显示的前3个blog主题）
const blogFeaturedSlugs = ['company-intro', 'sticker-guide', 'business-card-design'];

function getLocalizedPath(zhPath, locale) {
  // 将zh-hk路径替换为对应locale路径
  return zhPath.replace('-zh-hk-', `-${locale}-`).replace('-zh-hk.webp', `-${locale}.webp`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

console.log('=== Setting up multilingual categories ===');
for (const locale of locales) {
  ensureDir(path.join(CATEGORIES_DIR, locale));
}

let catSuccess = 0;
let catFallback = 0;
let catMissing = 0;

for (const [slug, zhPath] of Object.entries(featuredImages)) {
  for (const locale of locales) {
    const destDir = path.join(CATEGORIES_DIR, locale);
    const destPath = path.join(destDir, `${slug}.webp`);

    // 尝试找对应locale的产品图
    const localizedPath = getLocalizedPath(zhPath, locale);
    const srcPath = path.join(PROJECT_DIR, 'public', localizedPath);
    const zhSrcPath = path.join(PROJECT_DIR, 'public', zhPath);

    if (copyFile(srcPath, destPath)) {
      catSuccess++;
    } else if (copyFile(zhSrcPath, destPath)) {
      console.log(`  [fallback] ${locale}/${slug}.webp -> copied from zh-hk`);
      catFallback++;
    } else {
      console.log(`  [missing] ${locale}/${slug}.webp -> source not found: ${zhPath}`);
      catMissing++;
    }
  }
}

console.log(`Categories: ${catSuccess} copied, ${catFallback} fallback, ${catMissing} missing`);

console.log('\n=== Setting up multilingual blog images ===');
for (const locale of locales) {
  ensureDir(path.join(BLOG_DIR, locale));
}

let blogSuccess = 0;
let blogMissing = 0;

for (const slug of blogFeaturedSlugs) {
  for (const locale of locales) {
    const srcFile = `blog-${slug}-${locale}.webp`;
    const srcPath = path.join(BLOG_DIR, srcFile);
    const destPath = path.join(BLOG_DIR, locale, `${slug}.webp`);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      blogSuccess++;
    } else {
      // 尝试找zh-hk版本作为fallback
      const zhSrcPath = path.join(BLOG_DIR, `blog-${slug}-zh-hk.webp`);
      if (fs.existsSync(zhSrcPath)) {
        fs.copyFileSync(zhSrcPath, destPath);
        console.log(`  [fallback] blog/${locale}/${slug}.webp -> from zh-hk`);
        blogSuccess++;
      } else {
        console.log(`  [missing] blog/${locale}/${slug}.webp -> source not found`);
        blogMissing++;
      }
    }
  }
}

console.log(`Blog: ${blogSuccess} copied, ${blogMissing} missing`);
