const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const categoryNames = {
  'business-cards': { en: 'Business Cards', ja: '名刺' },
  'stickers': { en: 'Stickers', ja: 'ステッカー' },
  'flyers': { en: 'Flyers', ja: 'チラシ' },
  'posters': { en: 'Posters', ja: 'ポスター' },
  'packaging': { en: 'Packaging', ja: 'パッケージ' },
  'paper-bags': { en: 'Paper Bags', ja: '紙袋' },
  'books': { en: 'Books', ja: '書籍' },
  'menus': { en: 'Menus', ja: 'メニュー' },
  'banners': { en: 'Banners', ja: 'バナー' },
  'envelopes': { en: 'Envelopes', ja: '封筒' },
  'calendars': { en: 'Calendars', ja: 'カレンダー' },
  'red-packets': { en: 'Red Packets', ja: 'ポチ袋' },
  'educational': { en: 'Educational', ja: '教育印刷' },
};

function hasChinese(str) {
  return /[\u4e00-\u9fff]/.test(str);
}

function generateAlt(nameEn, nameJa, categorySlug, locale) {
  const cat = categoryNames[categorySlug] || { en: 'Printing', ja: '印刷' };
  if (locale === 'en') {
    return `${nameEn} | Professional ${cat.en} Hong Kong`;
  }
  if (locale === 'ja') {
    return `${nameJa} | 香港プロ${cat.ja}`;
  }
  return null;
}

function extractLastQuoted(str, key) {
  const regex = new RegExp(`${key}:\\s*'([^']+)'`, 'g');
  let match;
  let last = null;
  while ((match = regex.exec(str)) !== null) {
    last = match[1];
  }
  return last;
}

const productsStart = content.indexOf('export const products');
let changes = 0;

const seoImagesRegex = /seoImages:\s*\{[\s\S]*?alt:\s*\{[\s\S]*?\},?[\s\S]*?\},?/g;
let match;
let matchCount = 0;

while ((match = seoImagesRegex.exec(content)) !== null) {
  matchCount++;
  const fullMatch = match[0];
  const matchStart = match.index;
  const matchEnd = matchStart + fullMatch.length;

  const searchStart = Math.max(productsStart, matchStart - 6000);
  const preamble = content.slice(searchStart, matchStart);

  const nameEn = extractLastQuoted(preamble, 'nameEn');
  const nameJa = extractLastQuoted(preamble, 'nameJa');
  const catSlug = extractLastQuoted(preamble, 'category_slug');

  if (!nameEn || !nameJa || !catSlug) {
    console.log('Skip', matchCount, 'at', matchStart, 'missing:', {nameEn:!!nameEn, nameJa:!!nameJa, cat:!!catSlug});
    continue;
  }

  const altMatch = fullMatch.match(/alt:\s*\{([\s\S]*?)\}/);
  if (!altMatch) {
    console.log('Skip', matchCount, 'no alt match');
    continue;
  }

  const altBody = altMatch[1];
  const enMatch = altBody.match(/en\s*:\s*'([^']*)'/);
  const jaMatch = altBody.match(/ja\s*:\s*'([^']*)'/);

  if (!enMatch || !jaMatch) {
    console.log('Skip', matchCount, 'no en/ja match');
    continue;
  }

  const currentEn = enMatch[1];
  const currentJa = jaMatch[1];

  const needFixEn = hasChinese(currentEn);
  const needFixJa = hasChinese(currentJa);

  if (!needFixEn && !needFixJa) {
    if (matchCount <= 3) console.log('Skip', matchCount, 'no chinese needed');
    continue;
  }

  console.log('Fix', matchCount, 'en:', currentEn.slice(0,40), 'ja:', currentJa.slice(0,40));

  const newEn = needFixEn ? generateAlt(nameEn, nameJa, catSlug, 'en') : currentEn;
  const newJa = needFixJa ? generateAlt(nameEn, nameJa, catSlug, 'ja') : currentJa;
  const zhMatch = altBody.match(/['"]zh-hk['"]\s*:\s*'([^']*)'/);
  const newZh = zhMatch ? zhMatch[1] : currentEn;

  const newAltInner = `'zh-hk': '${newZh.replace(/'/g, "\\'")}',\n      en: '${newEn.replace(/'/g, "\\'")}',\n      ja: '${newJa.replace(/'/g, "\\'")}'`;

  const oldAlt = altMatch[0];
  const newAlt = `alt: {\n      ${newAltInner}\n    }`;
  const newFullMatch = fullMatch.replace(oldAlt, newAlt);

  content = content.slice(0, matchStart) + newFullMatch + content.slice(matchEnd);
  seoImagesRegex.lastIndex = matchStart + newFullMatch.length;
  changes++;
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Matched ${matchCount}, Fixed ${changes} product alt blocks.`);
