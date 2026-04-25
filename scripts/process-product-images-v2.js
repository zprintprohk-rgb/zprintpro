const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_BASE = 'F:/网站/产品主图';
const TARGET_DIR = 'F:/zprintpro-nextjs/public/images/products';
const BACKUP_DIR = 'F:/zprintpro-nextjs/public/images/products-backup';

// Extended keyword synonyms for all 79 SKUs
const keywordSynonyms = {
  // Business cards
  'premium-business-cards': ['premium', 'business', 'card', 'name-card', 'corporate'],
  'thick-business-cards-400g': ['thick', '400g', 'business', 'card', 'name-card'],
  'foil-business-cards': ['foil', 'gold', 'silver', 'business', 'card', 'name-card'],
  'spot-uv-business-cards': ['spot-uv', 'uv', 'business', 'card', 'name-card'],
  'matte-business-cards': ['matte', 'business', 'card', 'name-card'],
  'rounded-corner-cards': ['rounded', 'corner', 'card', 'name-card'],
  'same-day-business-cards': ['same-day', 'express', 'business', 'card', 'name-card'],
  'double-sided-cards': ['double-sided', 'business', 'card', 'name-card'],
  'eco-business-cards': ['eco', 'recycled', 'business', 'card', 'name-card'],
  // Stickers
  'waterproof-stickers': ['waterproof', 'sticker', 'label'],
  'transparent-stickers': ['transparent', 'clear', 'sticker', 'label'],
  'removable-stickers': ['removable', 'sticker', 'label'],
  'small-batch-stickers': ['small-batch', 'sticker', 'label'],
  'die-cut-stickers': ['die-cut', 'custom', 'sticker', 'label'],
  'foil-stickers': ['foil', 'gold', 'sticker', 'label'],
  'security-stickers': ['security', 'tamper', 'sticker', 'label'],
  'fluorescent-stickers': ['fluorescent', 'neon', 'sticker', 'label'],
  'fruit-food-label-stickers': ['fruit', 'food', 'label', 'sticker'],
  // Paper bags
  'kraft-paper-bags': ['kraft', 'paper-bag', 'tote', 'bag'],
  'white-card-bags': ['white', 'card-bag', 'bag'],
  'white-bag': ['white', 'bag'],
  'gift-bags': ['gift', 'bag', 'favor'],
  'eco-paper-bags': ['eco', 'non-woven', 'bag'],
  'handle-bags': ['handle', 'paper-bag', 'bag'],
  'large-bags': ['large', 'bag', 'tote'],
  'small-bags': ['small', 'mini', 'bag'],
  // Flyers
  'a4-flyers': ['a4', 'flyer', 'leaflet'],
  'a5-flyers': ['a5', 'flyer', 'leaflet'],
  'double-sided-flyers': ['double-sided', 'flyer', 'leaflet'],
  'folded-leaflets': ['folded', 'leaflet', 'brochure'],
  'thick-paper-flyers': ['thick', 'flyer', 'leaflet'],
  'eco-flyers': ['eco', 'flyer', 'leaflet'],
  'same-day-flyers': ['same-day', 'flyer', 'leaflet'],
  // Posters
  'a1-posters': ['a1', 'poster', '24hour'],
  'a2-posters': ['a2', 'poster', '24hour'],
  'outdoor-posters': ['outdoor', 'poster'],
  'display-posters': ['display', 'poster', 'event'],
  'art-posters': ['art', 'photo', 'poster'],
  'adhesive-posters': ['adhesive', 'poster'],
  // Packaging
  'gift-boxes': ['gift-box', 'box', 'packaging'],
  'cosmetic-boxes': ['cosmetic', 'box', 'packaging'],
  'food-boxes': ['food', 'box', 'packaging'],
  'mailer-boxes': ['mailer', 'box', 'packaging'],
  'folding-boxes': ['folding', 'box', 'packaging'],
  'rigid-boxes': ['rigid', 'box', 'packaging'],
  'magnetic-closure-gift-box': ['magnetic', 'gift-box', 'box'],
  'electronics-packaging-box': ['electronics', 'box', 'packaging'],
  'kraft-paper-packaging-box': ['kraft', 'packaging', 'box'],
  'drawer-slide-gift-box': ['drawer', 'slide', 'gift-box'],
  // Red packets
  'foil-red-packets': ['foil', 'red-packet', 'lai-see', 'red-envelope', 'chinese-new-year'],
  'embossed-red-packets': ['embossed', 'red-packet', 'lai-see', 'red-envelope'],
  'custom-red-packets': ['custom', 'red-packet', 'lai-see', 'red-envelope'],
  'cartoon-red-packets': ['cartoon', 'red-packet', 'lai-see', 'red-envelope'],
  'eco-red-packets': ['eco', 'red-packet', 'lai-see', 'red-envelope'],
  'large-red-packets': ['large', 'red-packet', 'lai-see', 'red-envelope'],
  // Calendars
  'wall-calendars': ['wall', 'calendar'],
  'desk-calendars': ['desk', 'calendar'],
  'custom-calendars': ['custom', 'calendar'],
  'mini-calendars': ['mini', 'calendar'],
  'photo-frame-calendars': ['photo', 'frame', 'calendar'],
  'magnetic-calendars': ['magnetic', 'calendar'],
  // Menus
  'pvc-menus': ['pvc', 'menu'],
  'laminated-menus': ['laminated', 'menu'],
  'hardcover-menus': ['hardcover', 'menu'],
  'drink-menus': ['drink', 'menu'],
  'disposable-menus': ['disposable', 'menu'],
  // Banners
  'outdoor-vinyl-banners': ['outdoor', 'vinyl', 'banner'],
  'roll-up-banners': ['roll-up', 'banner', 'stand'],
  'adhesive-banners': ['adhesive', 'banner'],
  'vehicle-wraps': ['vehicle', 'wrap', 'car'],
  'mesh-banners': ['mesh', 'banner'],
  // Books
  'catalog-printing': ['catalog', 'book', 'brochure', 'enterprise-brochure'],
  'saddle-stitch-booklets': ['saddle-stitch', 'booklet', 'book'],
  'perfect-bound-books': ['perfect-bound', 'book'],
  'hardcover-books': ['hardcover', 'book'],
  'spiral-notebooks': ['spiral', 'notebook', 'book'],
  // Envelopes
  'business-envelopes': ['business', 'envelope'],
  'colored-envelopes': ['colored', 'envelope'],
  'large-envelopes': ['large', 'envelope'],
  'pearl-envelopes': ['pearl', 'envelope'],
  // Educational
  'exercise-books': ['exercise', 'book', 'notebook'],
  'certificates': ['certificate', 'award'],
  'school-flyers': ['school', 'flyer', 'educational'],
  'textbooks': ['textbook', 'book'],
};

// Category folder patterns
const categoryFolders = [
  'poster-printing', 'business-card-printing', 'packaging-box-printing',
  'paper-bag-printing', 'flyer-printing', 'label-sticker-printing',
  'large-format-printing', 'envelope-printing', 'calendar-printing',
  'red-packet-wedding-invitation-printing', 'School-Educational-Printing',
  'enterprise-brochure-printing', 'folder-printing', 'digital-printing',
  'design-printing', 'brochure-knowledge', 'packaging-box-knowledge',
  'sticker-knowledge', 'printing-techniques', 'faq-printing'
];

function scanAllImages() {
  const images = [];
  
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      const s = fs.statSync(p);
      if (s.isDirectory()) {
        scanDir(p);
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(f) && s.size > 1024) {
        images.push({ path: p, name: f, baseName: f.toLowerCase().replace(/\.[^.]+$/, ''), size: s.size });
      }
    });
  }
  
  scanDir(SOURCE_BASE);
  return images;
}

function scoreMatch(slug, baseName) {
  const synonyms = keywordSynonyms[slug] || slug.split('-');
  let score = 0;
  for (const kw of synonyms) {
    if (baseName.includes(kw.toLowerCase())) score += 3;
    const parts = kw.toLowerCase().split(/[-\s]+/);
    for (const part of parts) {
      if (part.length > 2 && baseName.includes(part)) score += 1;
    }
  }
  return score;
}

function findBestImage(slug, allImages) {
  let best = null;
  let bestScore = 0;
  
  for (const img of allImages) {
    const score = scoreMatch(slug, img.baseName);
    if (score > bestScore) {
      bestScore = score;
      best = img;
    }
  }
  
  // If no good match, try fuzzy matching with category keywords
  if (!best || bestScore < 2) {
    const categoryKeywords = {
      'red-packet': ['red-packet', 'red-envelope', 'lai-see', 'chinese-new-year'],
      'calendar': ['calendar'],
      'menu': ['menu'],
      'banner': ['banner'],
      'book': ['book', 'brochure', 'catalog', 'notebook', 'booklet'],
      'envelope': ['envelope'],
      'certificate': ['certificate'],
      'school': ['school', 'educational'],
      'textbook': ['textbook'],
    };
    
    for (const [cat, kws] of Object.entries(categoryKeywords)) {
      if (slug.includes(cat)) {
        for (const img of allImages) {
          for (const kw of kws) {
            if (img.baseName.includes(kw)) {
              const score = 1;
              if (score > bestScore) {
                bestScore = score;
                best = img;
              }
            }
          }
        }
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
  const arrayStart = content.indexOf('export const products: Product[] = [');
  const arrayEnd = content.indexOf('];\n\n//', arrayStart);
  const arrayContent = content.substring(arrayStart, arrayEnd);
  
  const blocks = arrayContent.split('{\n    id:');
  const products = [];
  
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
    const imgMatch = block.match(/images:\s*\[\s*([^\]]*)\s*\]/);
    if (slugMatch && imgMatch) {
      const slug = slugMatch[1];
      const imgContent = imgMatch[1].trim();
      const images = imgContent.split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
      if (images.length > 0 && !products.find(p => p.slug === slug)) {
        products.push({ slug, currentImage: images[0].split('/').pop() });
      }
    }
  }
  
  return products;
}

async function main() {
  console.log('Scanning ALL source images...');
  const allImages = scanAllImages();
  console.log(`Found ${allImages.length} source images total`);
  
  const products = extractProducts();
  console.log(`Found ${products.length} unique products`);
  
  // Filter to only products that need updating
  const pendingProducts = products.filter(p => {
    const imgPath = path.join(TARGET_DIR, p.currentImage);
    if (!fs.existsSync(imgPath)) return true;
    const size = fs.statSync(imgPath).size;
    return size < 100000;
  });
  
  console.log(`Products needing update: ${pendingProducts.length}`);
  
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  
  let processed = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const product of pendingProducts) {
    const bestImage = findBestImage(product.slug, allImages);
    
    if (!bestImage) {
      console.log(`  SKIP: No source image for ${product.slug}`);
      skipped++;
      continue;
    }
    
    const targetPath = path.join(TARGET_DIR, product.currentImage);
    const backupPath = path.join(BACKUP_DIR, product.currentImage);
    
    if (fs.existsSync(targetPath)) {
      fs.copyFileSync(targetPath, backupPath);
    }
    
    const result = await processImage(bestImage.path, targetPath);
    if (result.success) {
      const sizeKB = Math.round(result.size / 1024);
      console.log(`  OK: ${product.slug} <- ${bestImage.name} (${sizeKB}KB, score=${bestImage.score || '?'})`);
      processed++;
    } else {
      console.log(`  FAIL: ${product.slug} - ${result.error}`);
      failed++;
    }
  }
  
  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch(console.error);
