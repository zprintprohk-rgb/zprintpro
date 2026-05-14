const fs = require('fs');

// 任务定义
const tasks = [
  // Blog covers (24)
  { id: 1, type: 'blog-cover', locale: 'zh-hk', topic: 'packaging-trends', filename: 'packaging-trends-zh-hk.webp' },
  { id: 2, type: 'blog-cover', locale: 'en', topic: 'packaging-trends', filename: 'packaging-trends-en.webp' },
  { id: 3, type: 'blog-cover', locale: 'ja', topic: 'packaging-trends', filename: 'packaging-trends-ja.webp' },
  { id: 4, type: 'blog-cover', locale: 'zh-hk', topic: 'hong-kong-printing-guide', filename: 'hong-kong-printing-guide-zh-hk.webp' },
  { id: 5, type: 'blog-cover', locale: 'en', topic: 'hong-kong-printing-guide', filename: 'hong-kong-printing-guide-en.webp' },
  { id: 6, type: 'blog-cover', locale: 'ja', topic: 'hong-kong-printing-guide', filename: 'hong-kong-printing-guide-ja.webp' },
  { id: 7, type: 'blog-cover', locale: 'zh-hk', topic: 'design-file-specs', filename: 'design-file-specs-zh-hk.webp' },
  { id: 8, type: 'blog-cover', locale: 'en', topic: 'design-file-specs', filename: 'design-file-specs-en.webp' },
  { id: 9, type: 'blog-cover', locale: 'ja', topic: 'design-file-specs', filename: 'design-file-specs-ja.webp' },
  { id: 10, type: 'blog-cover', locale: 'zh-hk', topic: 'brand-materials-checklist', filename: 'brand-materials-checklist-zh-hk.webp' },
  { id: 11, type: 'blog-cover', locale: 'en', topic: 'brand-materials-checklist', filename: 'brand-materials-checklist-en.webp' },
  { id: 12, type: 'blog-cover', locale: 'ja', topic: 'brand-materials-checklist', filename: 'brand-materials-checklist-ja.webp' },
  { id: 13, type: 'blog-cover', locale: 'zh-hk', topic: 'mtr-advertising-specs', filename: 'mtr-advertising-specs-zh-hk.webp' },
  { id: 14, type: 'blog-cover', locale: 'en', topic: 'mtr-advertising-specs', filename: 'mtr-advertising-specs-en.webp' },
  { id: 15, type: 'blog-cover', locale: 'ja', topic: 'mtr-advertising-specs', filename: 'mtr-advertising-specs-ja.webp' },
  { id: 16, type: 'blog-cover', locale: 'zh-hk', topic: 'cmyk-guide', filename: 'cmyk-guide-zh-hk.webp' },
  { id: 17, type: 'blog-cover', locale: 'en', topic: 'cmyk-guide', filename: 'cmyk-guide-en.webp' },
  { id: 18, type: 'blog-cover', locale: 'ja', topic: 'cmyk-guide', filename: 'cmyk-guide-ja.webp' },
  { id: 19, type: 'blog-cover', locale: 'zh-hk', topic: 'paper-materials', filename: 'paper-materials-zh-hk.webp' },
  { id: 20, type: 'blog-cover', locale: 'en', topic: 'paper-materials', filename: 'paper-materials-en.webp' },
  { id: 21, type: 'blog-cover', locale: 'ja', topic: 'paper-materials', filename: 'paper-materials-ja.webp' },
  { id: 22, type: 'blog-cover', locale: 'zh-hk', topic: 'eco-printing', filename: 'eco-printing-zh-hk.webp' },
  { id: 23, type: 'blog-cover', locale: 'en', topic: 'eco-printing', filename: 'eco-printing-en.webp' },
  { id: 24, type: 'blog-cover', locale: 'ja', topic: 'eco-printing', filename: 'eco-printing-ja.webp' },
  // EN product cards (15)
  { id: 25, type: 'product-card', locale: 'en', product: 'stickers', filename: 'stickers-en-card.webp' },
  { id: 26, type: 'product-card', locale: 'en', product: 'flyers', filename: 'flyers-en-card.webp' },
  { id: 27, type: 'product-card', locale: 'en', product: 'packaging', filename: 'packaging-en-card.webp' },
  { id: 28, type: 'product-card', locale: 'en', product: 'posters', filename: 'posters-en-card.webp' },
  { id: 29, type: 'product-card', locale: 'en', product: 'paper-bags', filename: 'paper-bags-en-card.webp' },
  { id: 30, type: 'product-card', locale: 'en', product: 'business-cards', filename: 'business-cards-en-card.webp' },
  { id: 31, type: 'product-card', locale: 'en', product: 'banners', filename: 'banners-en-card.webp' },
  { id: 32, type: 'product-card', locale: 'en', product: 'books', filename: 'books-en-card.webp' },
  { id: 33, type: 'product-card', locale: 'en', product: 'menus', filename: 'menus-en-card.webp' },
  { id: 34, type: 'product-card', locale: 'en', product: 'envelopes', filename: 'envelopes-en-card.webp' },
  { id: 35, type: 'product-card', locale: 'en', product: 'calendars', filename: 'calendars-en-card.webp' },
  { id: 36, type: 'product-card', locale: 'en', product: 'electronics-packaging-box', filename: 'electronics-packaging-box-en-card.webp' },
  { id: 37, type: 'product-card', locale: 'en', product: 'kraft-paper-packaging-box', filename: 'kraft-paper-packaging-box-en-card.webp' },
  { id: 38, type: 'product-card', locale: 'en', product: 'drawer-slide-gift-box', filename: 'drawer-slide-gift-box-en-card.webp' },
  { id: 39, type: 'product-card', locale: 'en', product: 'fruit-food-label-stickers', filename: 'fruit-food-label-stickers-en-card.webp' },
  // JA product cards (18)
  { id: 40, type: 'product-card', locale: 'ja', product: 'red-packets', filename: 'red-packets-ja-card.webp' },
  { id: 41, type: 'product-card', locale: 'ja', product: 'educational', filename: 'educational-ja-card.webp' },
  { id: 42, type: 'product-card', locale: 'ja', product: 'premium-business-cards', filename: 'premium-business-cards-ja-card.webp' },
  { id: 43, type: 'product-card', locale: 'ja', product: 'thick-business-cards-400g', filename: 'thick-business-cards-400g-ja-card.webp' },
  { id: 44, type: 'product-card', locale: 'ja', product: 'waterproof-stickers', filename: 'waterproof-stickers-ja-card.webp' },
  { id: 45, type: 'product-card', locale: 'ja', product: 'removable-stickers', filename: 'removable-stickers-ja-card.webp' },
  { id: 46, type: 'product-card', locale: 'ja', product: 'small-batch-stickers', filename: 'small-batch-stickers-ja-card.webp' },
  { id: 47, type: 'product-card', locale: 'ja', product: 'fluorescent-stickers', filename: 'fluorescent-stickers-ja-card.webp' },
  { id: 48, type: 'product-card', locale: 'ja', product: 'large-bags', filename: 'large-bags-ja-card.webp' },
  { id: 49, type: 'product-card', locale: 'ja', product: 'outdoor-posters', filename: 'outdoor-posters-ja-card.webp' },
  { id: 50, type: 'product-card', locale: 'ja', product: 'display-posters', filename: 'display-posters-ja-card.webp' },
  { id: 51, type: 'product-card', locale: 'ja', product: 'art-posters', filename: 'art-posters-ja-card.webp' },
  { id: 52, type: 'product-card', locale: 'ja', product: 'adhesive-posters', filename: 'adhesive-posters-ja-card.webp' },
  { id: 53, type: 'product-card', locale: 'ja', product: 'food-boxes', filename: 'food-boxes-ja-card.webp' },
  { id: 54, type: 'product-card', locale: 'ja', product: 'folding-boxes', filename: 'folding-boxes-ja-card.webp' },
  { id: 55, type: 'product-card', locale: 'ja', product: 'desk-calendars', filename: 'desk-calendars-ja-card.webp' },
  { id: 56, type: 'product-card', locale: 'ja', product: 'vehicle-wraps', filename: 'vehicle-wraps-ja-card.webp' },
  { id: 57, type: 'product-card', locale: 'ja', product: 'mesh-banners', filename: 'mesh-banners-ja-card.webp' },
];

const NEGATIVE = 'NO text, NO watermark, NO logo, NO #DC2626, NO 2048x2048, NO PingFang HK Bold, NO 3px red border, NO Chinese characters, NO Japanese characters, NO brand names on products';

const NEGATIVE_JA = 'NO text, NO watermark, NO logo, NO #DC2626, NO 2048x2048, NO PingFang HK Bold, NO 3px red border, NO Chinese characters, NO Japanese characters, NO English text, NO brand names on products';

const blogPrompts = {
  'packaging-trends': {
    'zh-hk': 'Premium gift boxes and sustainable packaging materials arranged on a neutral beige background, unboxing scene with tissue paper and ribbon, modern Chinese retail aesthetic, warm studio lighting, clean editorial composition | blog header, 1200x630, editorial, warm studio |',
    'en': 'Premium gift boxes and sustainable packaging materials arranged on a neutral beige background, unboxing scene with tissue paper and ribbon, modern Western retail aesthetic, warm studio lighting, clean editorial composition | blog header, 1200x630, editorial, warm studio |',
    'ja': 'Minimalist Japanese gift boxes and sustainable packaging on light wood surface, furoshiki wrapping cloth beside, Muji-inspired aesthetic, soft natural window light, extremely clean zen composition | blog header, 1200x630, Japanese minimalist, soft natural |',
  },
  'hong-kong-printing-guide': {
    'zh-hk': 'Victoria Harbour skyline at golden hour with printing materials subtly composited, Hong Kong urban commercial atmosphere, modern business district background, warm sunset lighting, inspiring cityscape | blog header, 1200x630, cityscape, golden hour |',
    'en': 'Victoria Harbour skyline at golden hour with printing materials subtly composited, Hong Kong urban commercial atmosphere, modern business district background, warm sunset lighting, inspiring cityscape | blog header, 1200x630, cityscape, golden hour |',
    'ja': 'Clean modern Tokyo bay skyline blended with printing materials, Japanese urban commercial aesthetic, soft morning light, minimalist composition with generous negative space | blog header, 1200x630, urban morning, minimalist |',
  },
  'design-file-specs': {
    'zh-hk': 'Designer workspace with color swatches, pantone books, and printing samples spread across white desk, iMac showing design software, creative studio atmosphere, bright overhead lighting, organized chaos | blog header, 1200x630, creative studio, bright overhead |',
    'en': 'Designer workspace with color swatches, pantone books, and printing samples spread across white desk, iMac showing design software, creative studio atmosphere, bright overhead lighting, organized chaos | blog header, 1200x630, creative studio, bright overhead |',
    'ja': 'Immaculate Japanese designer workspace with minimal tools, single pantone book and printing sample on white desk, MacBook with clean screen, extremely tidy zen studio, soft diffused daylight | blog header, 1200x630, zen studio, soft diffused |',
  },
  'brand-materials-checklist': {
    'zh-hk': 'Complete brand identity kit laid flat on marble surface, business cards, letterhead, envelopes, and stickers arranged in a perfect grid, cohesive luxury branding, soft dramatic side lighting | blog header, 1200x630, flat lay, dramatic soft |',
    'en': 'Complete brand identity kit laid flat on marble surface, business cards, letterhead, envelopes, and stickers arranged in a perfect grid, cohesive luxury branding, soft dramatic side lighting | blog header, 1200x630, flat lay, dramatic soft |',
    'ja': 'Minimalist Japanese brand identity set on washi paper background, single business card and envelope with subtle texture, refined simplicity, soft side lighting, artisan craftsmanship feel | blog header, 1200x630, artisan, soft side |',
  },
  'mtr-advertising-specs': {
    'zh-hk': 'Hong Kong MTR subway station platform with advertising posters on wall, commuters walking by motion blur, urban transit advertising environment, fluorescent tube lighting, dynamic city energy | blog header, 1200x630, urban transit, fluorescent |',
    'en': 'Modern metro station platform with advertising posters on wall, commuters walking by motion blur, urban transit advertising environment, fluorescent tube lighting, dynamic city energy | blog header, 1200x630, urban transit, fluorescent |',
    'ja': 'Clean Tokyo metro station with minimal advertising poster display, few commuters in distance, quiet orderly Japanese transit environment, soft even lighting, calm urban atmosphere | blog header, 1200x630, Japanese transit, soft even |',
  },
  'cmyk-guide': {
    'zh-hk': 'Macro photography of CMYK ink droplets splashing and mixing on white surface, colorful pigment explosion, printing press rollers in soft focus background, vibrant studio lighting, high detail texture | blog header, 1200x630, macro splash, vibrant studio |',
    'en': 'Macro photography of CMYK ink droplets splashing and mixing on white surface, colorful pigment explosion, printing press rollers in soft focus background, vibrant studio lighting, high detail texture | blog header, 1200x630, macro splash, vibrant studio |',
    'ja': 'Delicate Japanese ink drops on ceramic plate, subtle color gradients, traditional Japanese printing aesthetic meets modern design, soft natural light, contemplative minimal composition | blog header, 1200x630, Japanese ink, soft natural |',
  },
  'paper-materials': {
    'zh-hk': 'Various paper textures and material samples fanned out in overlapping arrangement, tactile surface study, kraft paper, glossy art paper, matte cardstock, warm material photography lighting | blog header, 1200x630, material study, warm material |',
    'en': 'Various paper textures and material samples fanned out in overlapping arrangement, tactile surface study, kraft paper, glossy art paper, matte cardstock, warm material photography lighting | blog header, 1200x630, material study, warm material |',
    'ja': 'Carefully arranged Japanese paper samples on light wood tray, washi paper, cotton paper, and recycled stock, refined material curation, soft natural window light, wabi-sabi aesthetic | blog header, 1200x630, paper curation, natural window |',
  },
  'eco-printing': {
    'zh-hk': 'Recycled paper products with fresh green leaves and natural elements, sustainable packaging on wooden surface, eco-friendly printing concept, nature-inspired design, bright natural daylight | blog header, 1200x630, eco nature, bright natural |',
    'en': 'Recycled paper products with fresh green leaves and natural elements, sustainable packaging on wooden surface, eco-friendly printing concept, nature-inspired design, bright natural daylight | blog header, 1200x630, eco nature, bright natural |',
    'ja': 'Minimalist eco-friendly paper products with single green stem in ceramic vase, Japanese sustainable design, clean white and natural wood palette, serene daylight, peaceful environmental aesthetic | blog header, 1200x630, Japanese eco, serene daylight |',
  },
};

const enProductPrompts = {
  'stickers': 'Various die-cut stickers in different shapes scattered on a silver laptop surface, glossy waterproof PVC material, macro photography showing print detail, bright cheerful lighting, clean white background | commercial photography, 800x600, macro, bright |',
  'flyers': 'A stack of colorful A4 flyers printed on glossy art paper, fanned out on a modern white office desk, professional product photography, soft natural lighting from left, shallow depth of field, warm tones, clean minimalist background, high detail print texture visible | commercial photography, 800x600, warm lighting, shallow DOF |',
  'packaging': 'Custom printed rigid gift boxes with magnetic closure, stacked elegantly on dark wood surface, luxury packaging showcase, soft studio lighting, premium unboxing feel, high detail paper texture | commercial photography, 800x600, premium lighting |',
  'posters': 'Rolled up A2 posters with vibrant colors standing next to an unrolled poster on a light wooden floor, professional printing showcase, soft studio lighting, warm ambiance, high detail paper texture | commercial photography, 800x600, warm tones |',
  'paper-bags': 'Brown kraft paper bags with custom printing handles, standing upright on retail store counter, eco-friendly packaging showcase, natural lighting, warm earthy tones, clean store background | product photography, 800x600, retail setting, natural light |',
  'business-cards': 'Elegant business cards with foil stamping and embossing texture, fanned out on dark marble surface, luxury print finish showcase, dramatic side lighting, shallow DOF, premium feel | commercial photography, 800x600, dramatic lighting, premium |',
  'banners': 'Aluminum roll-up banner stand with colorful display graphic, placed in modern exhibition hall background, professional trade show display, wide angle, bright ambient lighting | commercial photography, 800x600, wide angle, exhibition setting |',
  'books': 'Saddle-stitched booklet opened to show colorful inner pages, lying on white desk with coffee cup nearby, professional catalog showcase, natural window lighting, warm cozy atmosphere | lifestyle product photography, 800x600, natural light |',
  'menus': 'Laminated waterproof restaurant menu standing on cafe table, showing food photography layout, glossy finish, warm restaurant ambient lighting, realistic dining scene | lifestyle photography, 800x600, restaurant setting |',
  'envelopes': 'Various custom printed envelopes in different sizes, arranged in a fan pattern on white linen background, elegant stationery showcase, soft diffused lighting, clean professional look | product photography, 800x600, soft light, clean |',
  'calendars': 'Desktop calendar with colorful monthly pages standing on modern office desk, clean minimalist workspace, bright natural lighting, organized professional atmosphere | product photography, 800x600, office bright, organized |',
  'electronics-packaging-box': 'Sleek smartphone packaging box with minimalist design, unboxing scene with phone beside box on white surface, tech product photography, cool blue accent lighting, modern aesthetic | tech product photography, 800x600, modern, cool lighting |',
  'kraft-paper-packaging-box': 'Natural kraft paper gift boxes with twine ribbon, eco-friendly packaging, arranged on wooden table with dried flowers, rustic aesthetic, warm natural lighting | lifestyle product photography, 800x600, rustic, warm |',
  'drawer-slide-gift-box': 'Elegant drawer-slide gift box partially open revealing velvet interior, luxury jewelry packaging, dramatic spotlight lighting, dark premium background | luxury product photography, 800x600, dramatic spotlight, premium |',
  'fruit-food-label-stickers': 'Colorful fruit and food label stickers on clear containers and bottles, grocery retail setting, bright supermarket lighting, clean commercial product display | commercial photography, 800x600, retail bright, clean |',
};

const jaProductPrompts = {
  'red-packets': 'Traditional Chinese red envelopes with gold embossing, arranged on dark lacquer tray with gold ingot decoration, festive Lunar New Year aesthetic, dramatic soft lighting, prestigious ceremonial feel | Japanese ceremonial photography, 800x600, lacquer, dramatic soft |',
  'educational': 'Cute Japanese-style exercise books and textbooks with simple cover designs, stacked on clean school desk with wooden pencils, Japanese classroom aesthetic, bright cheerful natural light | Japanese educational photography, 800x600, classroom, cheerful |',
  'premium-business-cards': 'Minimalist Japanese business cards with subtle texture, placed on washi paper background, traditional meets modern aesthetic, soft side lighting, extremely refined composition | Japanese commercial photography, 800x600, washi texture, refined |',
  'thick-business-cards-400g': 'Ultra-thick 400g Japanese business cards with substantial weight feel, clean white edges, placed on dark slate surface, premium Japanese stationery aesthetic, soft diffused light | Japanese stationery photography, 800x600, premium weight, soft diffused |',
  'waterproof-stickers': 'Cute kawaii-style waterproof stickers on a clean white MacBook, Japanese stationery aesthetic, soft studio lighting, extremely clean background, pastel color palette | Japanese product photography, 800x600, kawaii aesthetic, soft light |',
  'removable-stickers': 'Clean removable stickers on glass surface, showing easy peel corner, Japanese organizational aesthetic, bright soft lighting, minimalist white background | Japanese product photography, 800x600, organizational, bright soft |',
  'small-batch-stickers': 'Small batch of artisan Japanese stickers on craft paper, handmade quality feel, warm natural lighting, cozy workshop atmosphere | Japanese artisan photography, 800x600, handmade, warm natural |',
  'fluorescent-stickers': 'Vibrant fluorescent stickers glowing under blacklight on dark background, Japanese nightlife aesthetic, dramatic UV lighting, vivid neon colors | Japanese creative photography, 800x600, UV dramatic, vivid neon |',
  'large-bags': 'Large Japanese paper bags with simple handles, displayed in a Tokyo boutique shop window, clean retail aesthetic, soft daylight, extremely minimal | Japanese retail photography, 800x600, boutique, soft daylight |',
  'outdoor-posters': 'Japanese outdoor advertising posters on city building wall, urban Tokyo street aesthetic, overcast soft lighting, realistic city environment | Japanese urban photography, 800x600, city outdoor, overcast soft |',
  'display-posters': 'Clean Japanese display poster in modern gallery frame, white wall background, museum-quality presentation, precise even lighting, sophisticated minimalist aesthetic | Japanese gallery photography, 800x600, gallery frame, precise even |',
  'art-posters': 'Japanese art poster reproduction on white gallery wall, minimalist art print, clean museum environment, soft museum lighting, refined cultural aesthetic | Japanese art photography, 800x600, gallery wall, museum light |',
  'adhesive-posters': 'Japanese adhesive poster smoothly applied to clean white wall, no wrinkles, professional installation look, soft even lighting, commercial interior aesthetic | Japanese interior photography, 800x600, clean wall, soft even |',
  'food-boxes': 'Clean Japanese bento-style food packaging boxes, arranged on light wood surface, minimalist food presentation, soft natural lighting, appetizing commercial aesthetic | Japanese food photography, 800x600, bento style, soft natural |',
  'folding-boxes': 'Japanese folding gift boxes in collapsed flat state and assembled form, clever origami-inspired packaging design, clean white background, bright even lighting | Japanese design photography, 800x600, origami, bright even |',
  'desk-calendars': 'Simple Japanese desk calendar on minimal workspace, single pen beside it, extremely tidy composition, soft morning light, serene office aesthetic | Japanese workspace photography, 800x600, minimal desk, soft morning |',
  'vehicle-wraps': 'Japanese delivery van with colorful partial wrap design, parked on clean Tokyo street, professional vehicle branding, overcast soft lighting, urban commercial aesthetic | Japanese automotive photography, 800x600, van wrap, overcast soft |',
  'mesh-banners': 'Japanese mesh banner on construction site fence, wind-permeable material texture visible, urban development background, bright daylight, industrial commercial aesthetic | Japanese industrial photography, 800x600, construction, bright daylight |',
};

let output = '=== ZprintPro Seedream 4.5 Batch Prompts (2026-05-15) ===\n';
output += '=== NO text, NO watermark, NO logo, NO #DC2626, NO 2048x2048, NO PingFang HK Bold, NO 3px ===\n\n';

for (const task of tasks) {
  let prompt = '';
  let negative = task.locale === 'ja' ? NEGATIVE_JA : NEGATIVE;
  
  if (task.type === 'blog-cover') {
    const p = blogPrompts[task.topic][task.locale];
    prompt = `${p} ${negative}`;
  } else if (task.type === 'product-card' && task.locale === 'en') {
    const p = enProductPrompts[task.product];
    prompt = `${p} ${negative}`;
  } else if (task.type === 'product-card' && task.locale === 'ja') {
    const p = jaProductPrompts[task.product];
    prompt = `${p} ${negative}`;
  }
  
  output += `--- ${task.id} | ${task.type} | ${task.locale} | ${task.product || task.topic} ---\n`;
  output += `Filename: ${task.filename}\n`;
  output += `Prompt:\n${prompt}\n\n`;
}

fs.writeFileSync('seedream-prompts-batch-20260515.txt', output, 'utf8');
console.log('Generated seedream-prompts-batch-20260515.txt with', tasks.length, 'prompts');
