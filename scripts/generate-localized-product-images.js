/**
 * 生成三语本地化产品促销图片
 * 
 * 流程：
 * 1. 从 products.ts 提取产品数据
 * 2. 为每个产品生成中文/英文/日文促销文案
 * 3. 用 SVG 生成红色 burst 促销标签
 * 4. 用 sharp 将标签叠加到产品底图上
 * 5. 输出到 public/images/products/{locale}/
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'F:/zprintpro-nextjs/public/images/products';
const OUTPUT_DIR = 'F:/zprintpro-nextjs/public/images/products-localized';
const LOCALES = ['zh-hk', 'en', 'ja'];

// 从 products.ts 提取产品数据
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
    const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
    const nameEnMatch = block.match(/nameEn:\s*['"]([^'"]+)['"]/);
    const nameJaMatch = block.match(/nameJa:\s*['"]([^'"]+)['"]/);
    const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/);
    const descEnMatch = block.match(/descriptionEn:\s*['"]([^'"]+)['"]/);
    const descJaMatch = block.match(/descriptionJa:\s*['"]([^'"]+)['"]/);
    const priceMatch = block.match(/price_range:\s*['"]([^'"]+)['"]/);
    const imgMatch = block.match(/images:\s*\[\s*['"]([^'"]+)['"]/);
    const hotMatch = block.match(/isHot:\s*(true|false)/);
    const newMatch = block.match(/isNew:\s*(true|false)/);
    
    if (slugMatch && imgMatch) {
      const slug = slugMatch[1];
      if (!products.find(p => p.slug === slug)) {
        products.push({
          slug,
          name: nameMatch ? nameMatch[1] : slug,
          nameEn: nameEnMatch ? nameEnMatch[1] : slug,
          nameJa: nameJaMatch ? nameJaMatch[1] : slug,
          description: descMatch ? descMatch[1] : '',
          descriptionEn: descEnMatch ? descEnMatch[1] : '',
          descriptionJa: descJaMatch ? descJaMatch[1] : '',
          price: priceMatch ? priceMatch[1] : '',
          image: imgMatch[1].split('/').pop(),
          isHot: hotMatch ? hotMatch[1] === 'true' : false,
          isNew: newMatch ? newMatch[1] === 'true' : false,
        });
      }
    }
  }
  
  return products;
}

// 生成促销卖点（基于描述提取关键词）
function generateSellingPoints(product, locale) {
  const points = {
    'zh-hk': [],
    'en': [],
    'ja': [],
  };
  
  const descMap = {
    'zh-hk': product.description,
    'en': product.descriptionEn,
    'ja': product.descriptionJa,
  };
  
  // 通用卖点关键词映射
  const keywordPoints = {
    'zh-hk': {
      '高級': '高級質感',
      '防水': '防水耐用',
      '環保': '環保材質',
      '燙金': '奢華燙金',
      '啞膠': '啞膠質感',
      'UV': 'UV光油',
      '即日': '即日交貨',
      '快印': '快速印刷',
      '厚': '厚實手感',
      '透明': '高透材質',
      '可移除': '可重複撕貼',
      '食品級': '食品級安全',
      '磁石': '磁吸設計',
      '硬皮': '精裝硬皮',
      '無線': '無線膠裝',
    },
    'en': {
      'premium': 'Premium Quality',
      'waterproof': 'Waterproof',
      'eco': 'Eco-Friendly',
      'foil': 'Luxury Foil',
      'matte': 'Matte Finish',
      'UV': 'UV Coating',
      'same-day': 'Same Day',
      'fast': 'Fast Printing',
      'thick': 'Thick & Sturdy',
      'clear': 'Crystal Clear',
      'removable': 'Removable',
      'food-grade': 'Food Safe',
      'magnetic': 'Magnetic',
      'hardcover': 'Hardcover',
      'perfect': 'Perfect Bound',
    },
    'ja': {
      '高級': '高級仕上げ',
      '防水': '防水加工',
      '環保': 'エコ素材',
      '燙金': '豪華箔押し',
      '啞膠': 'マット仕上げ',
      'UV': 'UVコーティング',
      '即日': '即日発送',
      '快印': '高速印刷',
      '厚': '厚手質感',
      '透明': '高透明度',
      '可移除': '繰り返し使用可',
      '食品級': '食品衛生対応',
      '磁石': 'マグネット式',
      '硬皮': 'ハードカバー',
      '無線': 'ワイヤー綴じ',
    },
  };
  
  for (const locale of LOCALES) {
    const desc = descMap[locale] || '';
    const kwPoints = keywordPoints[locale];
    const found = [];
    for (const [kw, point] of Object.entries(kwPoints)) {
      if (desc.toLowerCase().includes(kw.toLowerCase()) || product.name.toLowerCase().includes(kw.toLowerCase())) {
        found.push(point);
      }
    }
    // 如果没有找到关键词，使用默认卖点
    if (found.length === 0) {
      if (locale === 'zh-hk') found.push('專業印刷', '品質保證');
      else if (locale === 'en') found.push('Professional', 'High Quality');
      else found.push('プロ品質', '高品質印刷');
    }
    points[locale] = found.slice(0, 3);
  }
  
  return points;
}

// 生成促销文案
function generatePromoText(product, locale) {
  const points = generateSellingPoints(product, locale);
  const price = product.price;
  
  // 提取最低价格
  const priceMatch = price.match(/HK\$?([\d,]+)/);
  const minPrice = priceMatch ? priceMatch[1].replace(',', '') : '';
  
  const texts = {
    'zh-hk': {
      title: product.name,
      points: points['zh-hk'].join(' | '),
      price: minPrice ? `HK$${minPrice}起` : '優惠價格',
      cta: '免費設計・即日交貨',
    },
    'en': {
      title: product.nameEn,
      points: points['en'].join(' • '),
      price: minPrice ? `From HK$${minPrice}` : 'Best Price',
      cta: 'Free Design • Same Day',
    },
    'ja': {
      title: product.nameJa,
      points: points['ja'].join('・'),
      price: minPrice ? `HK$${minPrice}〜` : '特別価格',
      cta: '無料デザイン・即日発送',
    },
  };
  
  return texts[locale];
}

// 生成红色 burst SVG 标签
function generateBurstSVG(width, height, text, fontSize, subText, subFontSize) {
  // 简化的红色圆角矩形标签（替代复杂burst形状以确保渲染稳定）
  const padding = 20;
  const cornerRadius = 16;
  const starPoints = [];
  const cx = width / 2;
  const cy = height / 2;
  const outerR = Math.min(width, height) / 2 - 5;
  const innerR = outerR * 0.65;
  const spikes = 16;
  
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / spikes - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    starPoints.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
    <linearGradient id="burstGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff4444"/>
      <stop offset="50%" style="stop-color:#ff0000"/>
      <stop offset="100%" style="stop-color:#cc0000"/>
    </linearGradient>
  </defs>
  
  <!-- Star burst shape -->
  <polygon points="${starPoints.join(' ')}" fill="url(#burstGrad)" filter="url(#shadow)" stroke="#ffffff" stroke-width="3"/>
  
  <!-- White outline -->
  <polygon points="${starPoints.join(' ')}" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
  
  <!-- Main text -->
  <text x="${cx}" y="${cy - 5}" text-anchor="middle" dominant-baseline="middle"
        font-family="'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif"
        font-size="${fontSize}" font-weight="900" fill="#ffffff"
        style="text-shadow: 2px 2px 4px rgba(0,0,0,0.4);">
    ${text}
  </text>
  
  <!-- Sub text -->
  ${subText ? `
  <text x="${cx}" y="${cy + fontSize * 0.9}" text-anchor="middle" dominant-baseline="middle"
        font-family="'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif"
        font-size="${subFontSize}" font-weight="700" fill="#ffffff"
        style="text-shadow: 1px 1px 3px rgba(0,0,0,0.4);">
    ${subText}
  </text>
  ` : ''}
</svg>`;
}

// 生成底部横幅 SVG
function generateBottomBannerSVG(width, height, lines, locale) {
  const fontFamily = locale === 'ja' 
    ? "'Hiragino Sans', 'Noto Sans JP', 'Meiryo', sans-serif"
    : locale === 'en'
    ? "'Helvetica Neue', 'Arial', 'Segoe UI', sans-serif"
    : "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif";
  
  const lineHeight = height / (lines.length + 1);
  let textElements = '';
  
  lines.forEach((line, i) => {
    const y = lineHeight * (i + 1);
    const fontSize = i === 0 ? Math.min(height * 0.35, 48) : Math.min(height * 0.25, 32);
    const fontWeight = i === 0 ? '900' : '700';
    textElements += `
    <text x="${width / 2}" y="${y}" text-anchor="middle" dominant-baseline="middle"
          font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="#ffffff"
          style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
      ${line}
    </text>`;
  });
  
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6600;stop-opacity:0.95"/>
      <stop offset="100%" style="stop-color:#ff3300;stop-opacity:0.95"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${width}" height="${height}" rx="12" fill="url(#bannerGrad)"/>
  <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="10" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  ${textElements}
</svg>`;
}

// 主处理函数
async function processProduct(product, locale) {
  const sourcePath = path.join(SOURCE_DIR, product.image);
  if (!fs.existsSync(sourcePath)) {
    console.log(`  SKIP: Source image not found for ${product.slug}`);
    return false;
  }
  
  const promo = generatePromoText(product, locale);
  const localeDir = path.join(OUTPUT_DIR, locale);
  if (!fs.existsSync(localeDir)) fs.mkdirSync(localeDir, { recursive: true });
  
  const outputPath = path.join(localeDir, product.image);
  
  // 获取原图尺寸
  const meta = await sharp(sourcePath).metadata();
  const imgWidth = meta.width;
  const imgHeight = meta.height;
  
  // 生成右上角促销标签 SVG (400x400)
  const tagWidth = 380;
  const tagHeight = 380;
  const tagLines = [promo.price, promo.points.split(/[|•・]/)[0]];
  const tagSVG = generateBurstSVG(tagWidth, tagHeight, tagLines[0], 42, tagLines[1], 22);
  
  // 生成底部横幅 SVG (覆盖底部30%)
  const bannerHeight = Math.round(imgHeight * 0.22);
  const bannerWidth = imgWidth - 40;
  const bannerLines = [promo.title, promo.cta];
  const bannerSVG = generateBottomBannerSVG(bannerWidth, bannerHeight, bannerLines, locale);
  
  try {
    // 将 SVG 转为 buffer
    const tagBuffer = Buffer.from(tagSVG);
    const bannerBuffer = Buffer.from(bannerSVG);
    
    // 使用 composite 叠加
    await sharp(sourcePath)
      .composite([
        {
          input: await sharp(tagBuffer).png().toBuffer(),
          left: imgWidth - tagWidth - 10,
          top: 10,
        },
        {
          input: await sharp(bannerBuffer).png().toBuffer(),
          left: 20,
          top: imgHeight - bannerHeight - 10,
        }
      ])
      .jpeg({ quality: 92, progressive: true })
      .toFile(outputPath);
    
    const size = fs.statSync(outputPath).size;
    console.log(`  OK: ${locale}/${product.slug} (${Math.round(size/1024)}KB)`);
    return true;
  } catch (err) {
    console.log(`  FAIL: ${locale}/${product.slug} - ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('Extracting product data...');
  const products = extractProducts();
  console.log(`Found ${products.length} products`);
  
  let total = 0;
  let success = 0;
  
  for (const product of products) {
    for (const locale of LOCALES) {
      total++;
      const ok = await processProduct(product, locale);
      if (ok) success++;
    }
  }
  
  console.log(`\nDone! Total: ${total}, Success: ${success}, Failed: ${total - success}`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
