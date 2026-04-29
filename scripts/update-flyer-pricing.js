const fs = require('fs');

const filepath = 'src/lib/pricing.ts';
let content = fs.readFileSync(filepath, 'utf8');

// New flyer prices based on e-print.com.hk cost analysis + international shipping
const newFlyerPrices = {
  'a4-flyers': {
    en: { min: 0.55, max: 0.95, unit: 'pc' },
    ja: { min: 70, max: 120, unit: '枚' },
  },
  'a5-flyers': {
    en: { min: 0.40, max: 0.70, unit: 'pc' },
    ja: { min: 50, max: 90, unit: '枚' },
  },
  'double-sided-flyers': {
    en: { min: 0.65, max: 1.15, unit: 'pc' },
    ja: { min: 85, max: 145, unit: '枚' },
  },
  'folded-leaflets': {
    en: { min: 0.80, max: 1.55, unit: 'pc' },
    ja: { min: 110, max: 195, unit: '枚' },
  },
  'thick-paper-flyers': {
    en: { min: 0.70, max: 1.25, unit: 'pc' },
    ja: { min: 95, max: 155, unit: '枚' },
  },
  'eco-flyers': {
    en: { min: 0.60, max: 1.00, unit: 'pc' },
    ja: { min: 75, max: 125, unit: '枚' },
  },
  'same-day-flyers': {
    en: { min: 0.95, max: 1.80, unit: 'pc' },
    ja: { min: 125, max: 210, unit: '枚' },
  },
};

for (const [slug, prices] of Object.entries(newFlyerPrices)) {
  // Replace en min
  const enMinPattern = new RegExp(`('${slug}':\\s*\\{[^}]*'en':\\s*\\{\\s*min:\\s*)[\\d.]+`);
  content = content.replace(enMinPattern, `$1${prices.en.min}`);
  
  // Replace en max
  const enMaxPattern = new RegExp(`('${slug}':\\s*\\{[^}]*'en':\\s*\\{\\s*min:\\s*[\\d.]+,\\s*max:\\s*)[\\d.]+`);
  content = content.replace(enMaxPattern, `$1${prices.en.max}`);
  
  // Replace ja min
  const jaMinPattern = new RegExp(`('${slug}':\\s*\\{[^}]*'ja':\\s*\\{\\s*min:\\s*)[\\d.]+`);
  content = content.replace(jaMinPattern, `$1${prices.ja.min}`);
  
  // Replace ja max
  const jaMaxPattern = new RegExp(`('${slug}':\\s*\\{[^}]*'ja':\\s*\\{\\s*min:\\s*[\\d.]+,\\s*max:\\s*)[\\d.]+`);
  content = content.replace(jaMaxPattern, `$1${prices.ja.max}`);
}

fs.writeFileSync(filepath, content);
console.log('Updated flyer prices in pricing.ts');
