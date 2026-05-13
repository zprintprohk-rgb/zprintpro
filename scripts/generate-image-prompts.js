/**
 * AI 生图标准指令生成器
 * 为所有缺失/错配图片生成标准提示词
 */

const fs = require('fs');
const path = require('path');

const locales = ['zh-hk', 'en', 'ja'];
const localeConfig = {
  'zh-hk': { lang: 'Chinese', currency: 'HK$', label: '中文' },
  'en': { lang: 'English', currency: '$', label: '英文' },
  'ja': { lang: 'Japanese', currency: '¥', label: '日文' }
};

const NO_GARBAGE = 'NO #DC2626, NO 2048x2048, NO PingFang HK Bold, NO 3px';

function productCardPrompt(productName, locale, priceHint) {
  const cfg = localeConfig[locale];
  return `Professional e-commerce product photography, ${productName} displayed on clean wooden table with soft natural lighting, top-right red badge showing price in ${cfg.lang}, subtle shadow, high-end print shop aesthetic, 8k quality, ${NO_GARBAGE}`;
}

function blogCoverPrompt(topic, locale) {
  const cfg = localeConfig[locale];
  const scenes = {
    'company-intro': 'Modern printing factory interior with Heidelberg presses, professional workspace, clean industrial aesthetic',
    'sticker-guide': 'Flat lay of various stickers on white background, holographic and foil stickers, die-cut shapes, clean minimalist composition',
    'business-card-design': 'Elegant business cards spread on marble surface, gold foil details, minimalist branding mockup',
    'packaging-trends': 'Premium gift boxes and packaging on neutral background, sustainable materials, unboxing scene',
    'hong-kong-printing-guide': 'Hong Kong skyline with printing materials overlay, urban commercial aesthetic',
    'design-file-specs': 'Designer workspace with CMYK color charts, Illustrator interface on monitor, creative studio',
    'brand-materials-checklist': 'Complete brand identity kit laid out on desk, business cards, letterhead, envelopes, cohesive design',
    'mtr-advertising-specs': 'Hong Kong MTR subway station with advertising posters, urban transit environment',
    'cmyk-guide': 'Colorful ink droplets and printing rollers, macro photography of CMYK pigments mixing',
    'paper-materials': 'Various paper textures and samples fanned out, tactile material study, warm lighting',
    'eco-printing': 'Recycled paper products with green leaves, sustainable packaging, nature-inspired design',
  };
  return `${scenes[topic] || 'Professional printing industry photography'}, ${cfg.lang} aesthetic, no text overlay on image, clean composition, 8k, photorealistic, ${NO_GARBAGE}`;
}

function heroScenePrompt(category, locale) {
  const cfg = localeConfig[locale];
  const scenes = {
    'paper-bags': 'Kraft paper shopping bags on boutique store counter, retail environment, warm natural light',
    'flyers': 'Colorful flyers and brochures on cafe table, marketing materials, bright daylight',
    'stickers': 'Vibrant sticker sheets and rolls on white desk, product labels, clean studio light',
    'packaging': 'Luxury gift boxes and product packaging on marble surface, premium unboxing scene',
    'posters': 'Large format posters on city wall display, vivid advertising, urban setting',
    'business-cards': 'Elegant business cards on leather desk pad, executive office, soft ambient light',
    'banners': 'Outdoor vinyl banners at event venue, trade show environment, professional setup',
    'books': 'Cozy bookstore interior with wooden shelves, hardcover books on reading table, warm lighting',
    'menus': 'Restaurant menu on dining table with cutlery, food photography backdrop, appetizing setting',
    'envelopes': 'Premium envelopes and letterhead on mahogany desk, corporate correspondence aesthetic',
    'calendars': 'Desk calendar and planner on organized workspace, morning coffee, productivity scene',
    'red-packets': 'Traditional red envelopes with gold details, festive Lunar New Year decoration, celebratory mood',
    'educational': 'Modern classroom with textbooks and certificates, bright natural light from window, academic setting',
  };
  return `${scenes[category] || 'Professional printing service photography'}, ${cfg.lang === 'Japanese' ? 'subtle Japanese aesthetic' : cfg.lang === 'Chinese' ? 'subtle Chinese brand elements' : 'Western commercial aesthetic'}, no text overlay on image, clean composition, 8k, photorealistic, ${NO_GARBAGE}`;
}

// ===== 读取缺失图片清单 =====
const auditPath = path.join(__dirname, '../image-audit-report.json');
let audit = { missing: [], wrongLocale: [] };
try {
  audit = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));
} catch {
  console.log('Warning: image-audit-report.json not found, using empty list');
}

const tasks = [];
let taskId = 1;

// ===== 1. Hero 图任务 =====
const heroCategoryMap = {
  'paper-bags': 'hero-kraft-bag',
  'flyers': 'hero-flyer',
  'stickers': 'hero-sticker',
  'packaging': 'hero-gift-box',
  'posters': 'hero-poster',
  'business-cards': 'hero-business-cards',
  'banners': 'hero-banners',
  'books': 'hero-books',
  'menus': 'hero-menus',
  'envelopes': 'hero-envelopes',
  'calendars': 'hero-calendars',
  'red-packets': 'hero-red-packets',
  'educational': 'hero-educational',
};

Object.entries(heroCategoryMap).forEach(([cat, base]) => {
  locales.forEach((loc) => {
    const filename = `${base}-${loc}.webp`;
    const filePath = path.join('public/images/hero', filename);
    if (!fs.existsSync(filePath)) {
      tasks.push({
        id: taskId++,
        type: 'hero',
        locale: loc,
        category: cat,
        reason: `Hero 图缺失`,
        filename,
        dimensions: '1320x400',
        prompt: heroScenePrompt(cat, loc),
        alt: `${cat} ${loc} hero banner`,
      });
    }
  });
});

// ===== 2. Blog 图任务 =====
const blogTopics = [
  'company-intro', 'sticker-guide', 'business-card-design', 'packaging-trends',
  'hong-kong-printing-guide', 'design-file-specs', 'brand-materials-checklist',
  'mtr-advertising-specs', 'cmyk-guide', 'paper-materials', 'eco-printing',
];

blogTopics.forEach((topic) => {
  locales.forEach((loc) => {
    const subdirPath = path.join('public/images/blog', loc, `${topic}.webp`);
    if (!fs.existsSync(subdirPath)) {
      tasks.push({
        id: taskId++,
        type: 'blog-cover',
        locale: loc,
        topic,
        reason: `Blog 封面图缺失`,
        filename: `${topic}-${loc}.webp`,
        dimensions: '800x450',
        prompt: blogCoverPrompt(topic, loc),
        alt: `${topic} ${loc} blog cover`,
      });
    }
  });
});

// ===== 3. 产品图任务（基于缺失 EN/JA imagesByLocale） =====
const missingProductsEn = [
  'stickers', 'flyers', 'packaging', 'posters', 'paper-bags',
  'business-cards', 'banners', 'books', 'menus', 'envelopes', 'calendars',
  'electronics-packaging-box', 'kraft-paper-packaging-box', 'drawer-slide-gift-box',
  'fruit-food-label-stickers'
];

const missingProductsJa = [
  'red-packets', 'educational', 'premium-business-cards', 'thick-business-cards-400g',
  'waterproof-stickers', 'removable-stickers', 'small-batch-stickers',
  'fluorescent-stickers', 'large-bags', 'outdoor-posters', 'display-posters',
  'art-posters', 'adhesive-posters', 'food-boxes', 'folding-boxes',
  'desk-calendars', 'vehicle-wraps', 'mesh-banners'
];

// EN 产品图
missingProductsEn.forEach((slug) => {
  tasks.push({
    id: taskId++,
    type: 'product-card',
    locale: 'en',
    product: slug,
    reason: 'EN 页面缺失英文标签产品图，当前 fallback 到中文图',
    filename: `${slug}-en-card.webp`,
    dimensions: '800x600',
    prompt: productCardPrompt(slug, 'en', 'From $'),
    alt: `${slug} English product card`,
  });
});

// JA 产品图
missingProductsJa.forEach((slug) => {
  tasks.push({
    id: taskId++,
    type: 'product-card',
    locale: 'ja',
    product: slug,
    reason: 'JA 页面缺失日文标签产品图',
    filename: `${slug}-ja-card.webp`,
    dimensions: '800x600',
    prompt: productCardPrompt(slug, 'ja', '¥'),
    alt: `${slug} Japanese product card`,
  });
});

// ===== 输出 =====
const output = {
  generatedAt: new Date().toISOString(),
  totalTasks: tasks.length,
  priorityP0: tasks.filter(t => t.locale === 'en' && t.type === 'product-card').length,
  priorityP1: tasks.filter(t => t.type === 'hero').length,
  priorityP2: tasks.filter(t => t.type === 'blog-cover').length,
  tasks,
};

const outputPath = path.join(__dirname, '../image-generation-tasks.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

console.log(`===== 生图任务清单 =====`);
console.log(`总任务数: ${tasks.length}`);
console.log(`P0 (EN产品图): ${output.priorityP0}`);
console.log(`P1 (Hero图): ${output.priorityP1}`);
console.log(`P2 (Blog封面): ${output.priorityP2}`);
console.log(`\n输出文件: ${outputPath}`);
