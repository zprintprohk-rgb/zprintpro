import { products } from '../src/data/products';
import { getIndependentPrice } from '../src/lib/pricing';
import * as fs from 'fs';

// Generate updated Seedream prompts for all 79 SKUs
// JA prompts use English descriptions but require Japanese text in image

function getPriceForPrompt(product: any, locale: 'zh-hk' | 'en' | 'ja'): string {
  const ind = getIndependentPrice(product.slug, locale);
  if (ind) {
    if (locale === 'en') return `$${ind.min}-${ind.max}`;
    if (locale === 'ja') return `¥${ind.min}-${ind.max}`;
  }
  // Fallback: use HK price from product
  const match = product.price_range.match(/HK\$([\d.]+)/);
  if (match) {
    const base = parseFloat(match[1]);
    if (locale === 'en') return `$${(base * 0.128 * 2.5).toFixed(0)}`;
    if (locale === 'ja') return `¥${Math.round(base * 19.5 * 2.5)}`;
  }
  return product.price_range;
}

const categorySceneMap: Record<string, { zh: string; en: string; ja: string }> = {
  'business-cards': {
    zh: '现代商务办公空间，暖黄台灯与皮面记事本隐约可见，暖棕调 professional atmosphere',
    en: 'modern business office, warm yellow desk lamp and leather notebook, warm brown professional atmosphere',
    ja: 'modern business office, warm yellow desk lamp and leather notebook, warm brown professional atmosphere',
  },
  'stickers': {
    zh: '创意工作室桌面，笔记本电脑旁贴有同款贴纸，自然光线明亮清新',
    en: 'creative studio desk, laptop with same stickers applied, bright natural light',
    ja: 'creative studio desk, laptop with same stickers applied, bright natural light',
  },
  'flyers': {
    zh: '繁华商业街区或商场门口，行人手持宣传单，阳光明媚',
    en: 'busy commercial street or shopping mall entrance, pedestrians holding flyers, sunny day',
    ja: 'busy commercial street or shopping mall entrance, pedestrians holding flyers, sunny day',
  },
  'posters': {
    zh: '现代展览空间或零售店铺墙面，海报整齐张贴，射灯照射',
    en: 'modern exhibition space or retail store wall, posters neatly displayed, spotlight illumination',
    ja: 'modern exhibition space or retail store wall, posters neatly displayed, spotlight illumination',
  },
  'packaging': {
    zh: '精品零售店陈列台或电商开箱场景，灯光柔和突出包装质感',
    en: 'premium retail display shelf or unboxing scene, soft lighting highlighting packaging texture',
    ja: 'premium retail display shelf or unboxing scene, soft lighting highlighting packaging texture',
  },
  'paper-bags': {
    zh: '时尚零售店门口或咖啡店外带场景，顾客手提纸袋，街景虚化',
    en: 'fashion retail storefront or coffee shop takeaway scene, customer carrying paper bags, blurred street view',
    ja: 'fashion retail storefront or coffee shop takeaway scene, customer carrying paper bags, blurred street view',
  },
  'banners': {
    zh: '户外活动场地或商场中庭，大型横幅悬挂，人群熙攘',
    en: 'outdoor event venue or shopping mall atrium, large banner hanging, bustling crowd',
    ja: 'outdoor event venue or shopping mall atrium, large banner hanging, bustling crowd',
  },
  'books': {
    zh: '图书馆书架或书店陈列台，书本整齐排列，暖色阅读灯光',
    en: 'library bookshelf or bookstore display, books neatly arranged, warm reading light',
    ja: 'library bookshelf or bookstore display, books neatly arranged, warm reading light',
  },
  'menus': {
    zh: '高端餐厅桌面，菜单打开展示，精致餐具与美食搭配',
    en: 'upscale restaurant table, menu opened for display, exquisite tableware with gourmet food',
    ja: 'upscale restaurant table, menu opened for display, exquisite tableware with gourmet food',
  },
  'envelopes': {
    zh: '商务信函场景，信封与信纸搭配，木质桌面',
    en: 'business correspondence scene, envelope with letterhead on wooden desk',
    ja: 'business correspondence scene, envelope with letterhead on wooden desk',
  },
  'calendars': {
    zh: '办公室墙面或家庭书桌，日历展示全年规划，温馨日常氛围',
    en: 'office wall or home desk, calendar showing annual planning, cozy daily atmosphere',
    ja: 'office wall or home desk, calendar showing annual planning, cozy daily atmosphere',
  },
  'red-packets': {
    zh: '春节喜庆场景，红包与金饰搭配，红色喜庆背景',
    en: 'Chinese New Year festive scene, red packets with gold decorations, auspicious red background',
    ja: 'Chinese New Year festive scene, red packets with gold decorations, auspicious red background',
  },
  'educational': {
    zh: '学校教室或图书馆，学生使用印刷品学习，明亮自然光',
    en: 'school classroom or library, students using printed materials, bright natural light',
    ja: 'school classroom or library, students using printed materials, bright natural light',
  },
};

function generatePrompt(product: any, locale: 'zh-hk' | 'en' | 'ja'): string {
  const scene = categorySceneMap[product.category_slug] || categorySceneMap['business-cards'];
  const priceStr = getPriceForPrompt(product, locale);
  const isJa = locale === 'ja';
  
  // For JA: use English prompt body but require Japanese text display
  const promptLang = isJa ? 'en' : locale === 'zh-hk' ? 'zh' : 'en';
  
  let prompt = '';
  
  if (promptLang === 'zh') {
    prompt = `1:1比例，8K超高清电商主图。右上角固定放置单一枚大红色(#DC2626)底色、白色粗体字(PingFang HK Bold)、白色3px描边的爆炸促销标签。标签主标题：${product.name}｜${priceStr}起，副标题：熱賣中・免費設計。标签外画面内绝对不出现任何其他文字、乱码、水印、品牌名、多标签。 前景为${product.name}产品实物展示，${product.description.slice(0, 60)}...工艺细节清晰可见。背景虚化${scene.zh}。 产品占画面75%-85%，材质和工艺细节高清呈现。所有中文字符必须笔画完整准确，英文单词拼写正确、无粘连、无乱码。`;
  } else {
    // EN and JA both use English prompt body
    const productNameEn = product.nameEn || product.name;
    const descEn = product.descriptionEn || product.description;
    
    prompt = `1:1 ratio, 8K ultra-high-definition e-commerce hero image. Top-right single burst label with deep red (#DC2626) background, white bold text, white 3px stroke. `;
    
    if (isJa) {
      prompt += `Label main text MUST display accurate Japanese characters: ${product.nameJa}｜${priceStr}〜, sub: 人気商品・無料デザイン. `;
    } else {
      prompt += `Label main: ${product.nameEn}｜From ${priceStr}, sub: Hot Sale · Free Design. `;
    }
    
    prompt += `Absolutely no other text, gibberish, watermarks, brand names, or multiple labels anywhere else in the image. Foreground: ${productNameEn} product实物展示，${descEn.slice(0, 80)}... details clearly visible. Background: blurred ${scene.en}. Product occupies 75%-85% of frame, material and craftsmanship details in high definition. `;
    
    if (isJa) {
      prompt += `All Japanese text in the image must be accurately rendered with correct kanji/hiragana/katakana. No gibberish or incorrect characters. `;
    } else {
      prompt += `All English words must be spelled correctly, no粘连, no gibberish. `;
    }
  }
  
  return prompt;
}

let output = '=== ZprintPro 79 SKU Seedream 4.5 生图提示词（Updated 2026-04-26）===\n';
output += '=== 修复：JA提示词改用英文描述，要求图片显示日文 ===\n';
output += '=== 价格已更新为最新独立定价 ===\n\n';

for (const p of products) {
  const priceZh = p.price_range;
  const priceEn = getPriceForPrompt(p, 'en');
  const priceJa = getPriceForPrompt(p, 'ja');
  
  output += `\n========== ${p.sku_code} | ${p.slug} ==========\n`;
  output += `SEO Filename ZH: zprintpro-${p.category_slug}-${p.slug}-zh-hk.jpg\n`;
  output += `SEO Filename EN: zprintpro-${p.category_slug}-${p.slug}-en.jpg\n`;
  output += `SEO Filename JA: zprintpro-${p.category_slug}-${p.slug}-ja.jpg\n`;
  output += `Alt ZH: ${p.name} - ${p.description.slice(0, 40)}...\n`;
  output += `Alt EN: ${p.nameEn} - ${(p.descriptionEn || p.description).slice(0, 40)}...\n`;
  output += `Alt JA: ${p.nameJa} - ${(p.descriptionJa || p.description).slice(0, 40)}...\n`;
  output += `Prices: ZH=${priceZh}, EN=${priceEn}, JA=${priceJa}\n\n`;
  
  output += `[zh-hk]\n${generatePrompt(p, 'zh-hk')}\n\n`;
  output += `[en]\n${generatePrompt(p, 'en')}\n\n`;
  output += `[ja]\n${generatePrompt(p, 'ja')}\n\n`;
}

fs.writeFileSync('seedream-prompts-all-skus-v2.txt', output);
console.log(`Generated seedream-prompts-all-skus-v2.txt with ${products.length} SKUs × 3 locales = ${products.length * 3} prompts`);
