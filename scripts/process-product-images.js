const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_BASE = 'F:/网站/产品主图';
const TARGET_DIR = 'F:/zprintpro-nextjs/public/images/products';
const BACKUP_DIR = 'F:/zprintpro-nextjs/public/images/products-backup';

// Category folder -> product slug patterns
const categoryMapping = {
  'poster-printing': ['posters', 'a1-posters', 'a2-posters', 'outdoor-posters', 'display-posters', 'art-posters', 'adhesive-posters'],
  'business-card-printing': ['business-cards', 'premium-business-cards', 'thick-business-cards-400g', 'foil-business-cards', 'spot-uv-business-cards', 'matte-business-cards', 'rounded-corner-cards', 'same-day-business-cards', 'double-sided-cards', 'eco-business-cards'],
  'packaging-box-printing': ['packaging', 'gift-boxes', 'cosmetic-boxes', 'food-boxes', 'mailer-boxes', 'folding-boxes', 'rigid-boxes', 'magnetic-closure-gift-box', 'electronics-packaging-box', 'kraft-paper-packaging-box', 'drawer-slide-gift-box'],
  'paper-bag-printing': ['paper-bags', 'kraft-paper-bags', 'white-card-bags', 'white-bag', 'gift-bags', 'eco-paper-bags', 'handle-bags', 'large-bags', 'small-bags'],
  'flyer-printing': ['flyers', 'a4-flyers', 'a5-flyers', 'double-sided-flyers', 'folded-leaflets', 'thick-paper-flyers', 'eco-flyers', 'same-day-flyers'],
  'label-sticker-printing': ['stickers', 'waterproof-stickers', 'transparent-stickers', 'removable-stickers', 'small-batch-stickers', 'die-cut-stickers', 'foil-stickers', 'security-stickers', 'fluorescent-stickers', 'fruit-food-label-stickers'],
  'large-format-printing': ['banners', 'outdoor-vinyl-banners', 'roll-up-banners', 'adhesive-banners', 'vehicle-wraps', 'mesh-banners'],
  'envelope-printing': ['envelopes', 'business-envelopes', 'colored-envelopes', 'large-envelopes', 'pearl-envelopes'],
  'calendar-printing': ['calendars', 'wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars'],
  'red-packet-wedding-invitation-printing': ['red-packets', 'foil-red-packets', 'embossed-red-packets', 'custom-red-packets', 'cartoon-red-packets', 'eco-red-packets', 'large-red-packets'],
  'School-Educational-Printing': ['educational', 'exercise-books', 'certificates', 'school-flyers', 'textbooks'],
  'enterprise-brochure-printing': ['books', 'catalog-printing', 'saddle-stitch-booklets', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks'],
  'folder-printing': ['menus', 'pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'disposable-menus'],
  'digital-printing': ['digital', 'digital-print'],
};

// Keyword synonyms for matching
const keywordSynonyms = {
  'business-cards': ['business', 'card', 'name-card', 'corporate', 'express', 'designer'],
  'premium-business-cards': ['premium', 'business', 'card', 'name-card', 'corporate'],
  'thick-business-cards-400g': ['thick', '400g', 'business', 'card', 'name-card'],
  'foil-business-cards': ['foil', 'gold', 'silver', 'business', 'card', 'name-card'],
  'spot-uv-business-cards': ['spot-uv', 'uv', 'business', 'card', 'name-card'],
  'matte-business-cards': ['matte', 'business', 'card', 'name-card'],
  'rounded-corner-cards': ['rounded', 'corner', 'card', 'name-card'],
  'same-day-business-cards': ['same-day', 'express', 'business', 'card', 'name-card'],
  'double-sided-cards': ['double-sided', 'business', 'card', 'name-card'],
  'eco-business-cards': ['eco', 'recycled', 'business', 'card', 'name-card'],
  'waterproof-stickers': ['waterproof', 'sticker', 'label'],
  'transparent-stickers': ['transparent', 'clear', 'sticker', 'label'],
  'removable-stickers': ['removable', 'sticker', 'label'],
  'small-batch-stickers': ['small-batch', 'sticker', 'label'],
  'die-cut-stickers': ['die-cut', 'custom', 'sticker', 'label'],
  'foil-stickers': ['foil', 'gold', 'sticker', 'label'],
  'security-stickers': ['security', 'tamper', 'sticker', 'label'],
  'fluorescent-stickers': ['fluorescent', 'neon', 'sticker', 'label'],
  'kraft-paper-bags': ['kraft', 'paper-bag', 'tote', 'bag'],
  'white-card-bags': ['white', 'card-bag', 'bag'],
  'white-bag': ['white', 'bag'],
  'gift-bags': ['gift', 'bag', 'favor'],
  'eco-paper-bags': ['eco', 'non-woven', 'bag'],
  'handle-bags': ['handle', 'paper-bag', 'bag'],
  'large-bags': ['large', 'bag', 'tote'],
  'small-bags': ['small', 'mini', 'bag'],
  'a4-flyers': ['a4', 'flyer', 'leaflet'],
  'a5-flyers': ['a5', 'flyer', 'leaflet'],
  'double-sided-flyers': ['double-sided', 'flyer', 'leaflet'],
  'folded-leaflets': ['folded', 'leaflet', 'brochure'],
  'thick-paper-flyers': ['thick', 'flyer', 'leaflet'],
  'eco-flyers': ['eco', 'flyer', 'leaflet'],
  'same-day-flyers': ['same-day', 'flyer', 'leaflet'],
  'a1-posters': ['a1', 'poster', '24hour'],
  'a2-posters': ['a2', 'poster', '24hour'],
  'outdoor-posters': ['outdoor', 'poster'],
  'display-posters': ['display', 'poster', 'event'],
  'art-posters': ['art', 'photo', 'poster'],
  'adhesive-posters': ['adhesive', 'poster'],
  'gift-boxes': ['gift-box', 'box', 'packaging'],
  'cosmetic-boxes': ['cosmetic', 'box', 'packaging'],
  'food-boxes': ['food', 'box', 'packaging'],
  'mailer-boxes': ['mailer', 'box', 'packaging'],
  'folding-boxes': ['folding', 'box', 'packaging'],
  'rigid-boxes': ['rigid', 'box', 'packaging'],
  'outdoor-vinyl-banners': ['outdoor', 'vinyl', 'banner'],
  'roll-up-banners': ['roll-up', 'banner', 'stand'],
  'adhesive-banners': ['adhesive', 'banner'],
  'vehicle-wraps': ['vehicle', 'wrap', 'car'],
  'mesh-banners': ['mesh', 'banner'],
  'business-envelopes': ['business', 'envelope'],
  'colored-envelopes': ['colored', 'envelope'],
  'large-envelopes': ['large', 'envelope'],
  'pearl-envelopes': ['pearl', 'envelope'],
  'wall-calendars': ['wall', 'calendar'],
  'desk-calendars': ['desk', 'calendar'],
  'custom-calendars': ['custom', 'calendar'],
  'mini-calendars': ['mini', 'calendar'],
  'photo-frame-calendars': ['photo', 'frame', 'calendar'],
  'magnetic-calendars': ['magnetic', 'calendar'],
  'foil-red-packets': ['foil', 'red-packet', 'lai-see'],
  'embossed-red-packets': ['embossed', 'red-packet', 'lai-see'],
  'custom-red-packets': ['custom', 'red-packet', 'lai-see'],
  'cartoon-red-packets': ['cartoon', 'red-packet', 'lai-see'],
  'eco-red-packets': ['eco', 'red-packet', 'lai-see'],
  'large-red-packets': ['large', 'red-packet', 'lai-see'],
  'exercise-books': ['exercise', 'book', 'notebook'],
  'certificates': ['certificate', 'award'],
  'school-flyers': ['school', 'flyer', 'educational'],
  'textbooks': ['textbook', 'book'],
  'catalog-printing': ['catalog', 'book', 'brochure'],
  'saddle-stitch-booklets': ['saddle-stitch', 'booklet', 'book'],
  'perfect-bound-books': ['perfect-bound', 'book'],
  'hardcover-books': ['hardcover', 'book'],
  'spiral-notebooks': ['spiral', 'notebook', 'book'],
  'pvc-menus': ['pvc', 'menu'],
  'laminated-menus': ['laminated', 'menu'],
  'hardcover-menus': ['hardcover', 'menu'],
  'drink-menus': ['drink', 'menu'],
  'disposable-menus': ['disposable', 'menu'],
};

// Build reverse mapping: slug -> source folders
const slugToFolders = {};
for (const [folder, slugs] of Object.entries(categoryMapping)) {
  for (const slug of slugs) {
    if (!slugToFolders[slug]) slugToFolders[slug] = [];
    slugToFolders[slug].push(folder);
  }
}

function scanSourceImages() {
  const images = {};
  
  function scanDir(dir, folderName) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    for (const file of files) {
      const filePath = path.join(dir, file);
      const baseName = file.toLowerCase().replace(/\.[^.]+$/, '');
      if (!images[folderName]) images[folderName] = [];
      images[folderName].push({ path: filePath, name: file, baseName });
    }
  }
  
  for (const folder of Object.keys(categoryMapping)) {
    scanDir(path.join(SOURCE_BASE, folder, '没有压缩的JPG'), folder);
    scanDir(path.join(SOURCE_BASE, folder, folder), folder);
    scanDir(path.join(SOURCE_BASE, folder), folder);
  }
  
  // Also scan 生成原图汇总
  const genDir = path.join(SOURCE_BASE, '生成原图汇总');
  if (fs.existsSync(genDir)) {
    scanDir(genDir, 'generated');
    // Scan subdirectories
    fs.readdirSync(genDir).forEach(sub => {
      const subDir = path.join(genDir, sub);
      if (fs.statSync(subDir).isDirectory()) {
        scanDir(subDir, 'generated');
      }
    });
  }
  
  return images;
}

function scoreMatch(slug, baseName) {
  const synonyms = keywordSynonyms[slug] || slug.split('-');
  let score = 0;
  for (const kw of synonyms) {
    if (baseName.includes(kw.toLowerCase())) score += 2;
    // Also check partial matches
    const parts = kw.toLowerCase().split(' ');
    for (const part of parts) {
      if (part.length > 2 && baseName.includes(part)) score += 1;
    }
  }
  return score;
}

function findBestImage(slug, sourceImages) {
  const folders = slugToFolders[slug] || [];
  let best = null;
  let bestScore = 0;
  
  // Search in relevant folders first
  for (const folder of folders) {
    const candidates = sourceImages[folder] || [];
    for (const img of candidates) {
      const score = scoreMatch(slug, img.baseName);
      if (score > bestScore) {
        bestScore = score;
        best = img;
      }
    }
  }
  
  // If no good match, search in generated images
  if (!best || bestScore < 3) {
    const generated = sourceImages['generated'] || [];
    for (const img of generated) {
      const score = scoreMatch(slug, img.baseName);
      if (score > bestScore) {
        bestScore = score;
        best = img;
      }
    }
  }
  
  // If still no match, pick any image from relevant folders
  if (!best) {
    for (const folder of folders) {
      const candidates = sourceImages[folder] || [];
      if (candidates.length > 0) {
        // Pick a random one or the first one
        best = candidates[Math.floor(Math.random() * candidates.length)];
        break;
      }
    }
  }
  
  return best;
}

async function processImage(sourcePath, targetPath) {
  try {
    await sharp(sourcePath)
      .resize(1200, 1200, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .jpeg({ quality: 90, progressive: true })
      .toFile(targetPath);
    
    const stats = fs.statSync(targetPath);
    return { success: true, size: stats.size };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function extractProducts() {
  const content = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
  
  // Find the products array
  const arrayStart = content.indexOf('export const products: Product[] = [');
  const arrayEnd = content.indexOf('];\n\n//', arrayStart);
  const arrayContent = content.substring(arrayStart, arrayEnd);
  
  const products = [];
  const seenSlugs = new Set();
  
  // Find all product objects in the array
  const slugMatches = [...arrayContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  const imgMatches = [...arrayContent.matchAll(/images:\s*\[\s*['"]([^'"]+)['"]/g)];
  
  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i][1];
    const img = imgMatches[i] ? imgMatches[i][1] : null;
    if (img && !seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      products.push({
        slug,
        currentImage: img.split('/').pop()
      });
    }
  }
  
  return products;
}

async function main() {
  console.log('Scanning source images...');
  const sourceImages = scanSourceImages();
  
  const totalSource = Object.values(sourceImages).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`Found ${totalSource} source images`);
  
  const products = extractProducts();
  console.log(`Found ${products.length} unique products with images`);
  
  // Create backup dir
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  
  let processed = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const product of products) {
    const bestImage = findBestImage(product.slug, sourceImages);
    
    if (!bestImage) {
      console.log(`  SKIP: No source image for ${product.slug}`);
      skipped++;
      continue;
    }
    
    const targetPath = path.join(TARGET_DIR, `${product.slug}.jpg`);
    const backupPath = path.join(BACKUP_DIR, `${product.slug}.jpg`);
    
    // Backup existing image
    if (fs.existsSync(targetPath)) {
      fs.copyFileSync(targetPath, backupPath);
    }
    
    const result = await processImage(bestImage.path, targetPath);
    if (result.success) {
      const sizeKB = Math.round(result.size / 1024);
      console.log(`  OK: ${product.slug} <- ${bestImage.name} (${sizeKB}KB)`);
      processed++;
    } else {
      console.log(`  FAIL: ${product.slug} - ${result.error}`);
      failed++;
    }
  }
  
  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Failed: ${failed}`);
  console.log(`Backup saved to: ${BACKUP_DIR}`);
}

main().catch(console.error);
