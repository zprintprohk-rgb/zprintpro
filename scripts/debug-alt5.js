const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');

const productsStart = content.indexOf('export const products');
let pos = productsStart;
let iter = 0;

while (iter < 3) {
  const slugMatch = content.slice(pos).match(/slug:\s*'([^']+)'/);
  if (!slugMatch) { console.log('no more slugs'); break; }
  const slug = slugMatch[1];
  const slugAbsPos = pos + slugMatch.index;
  console.log('Found slug:', slug, 'at', slugAbsPos);

  const nextSlugMatch = content.slice(slugAbsPos + 10).match(/slug:\s*'/);
  let blockEnd = nextSlugMatch ? slugAbsPos + 10 + nextSlugMatch.index : content.length;
  const block = content.slice(slugAbsPos, blockEnd);

  const nameEnMatch = block.match(/nameEn:\s*'([^']+)'/);
  const nameJaMatch = block.match(/nameJa:\s*'([^']+)'/);
  const catMatch = block.match(/category_slug:\s*'([^']+)'/);

  console.log('  nameEn:', nameEnMatch ? nameEnMatch[1] : 'NOT FOUND');
  console.log('  nameJa:', nameJaMatch ? nameJaMatch[1] : 'NOT FOUND');
  console.log('  cat:', catMatch ? catMatch[1] : 'NOT FOUND');

  const altIdx = block.indexOf('alt:');
  console.log('  altIdx:', altIdx);

  if (altIdx !== -1) {
    const altBlockStart = slugAbsPos + altIdx;
    const altOpenBrace = content.indexOf('{', altBlockStart);
    let braceDepth = 1;
    let altCloseBrace = altOpenBrace + 1;
    while (braceDepth > 0 && altCloseBrace < content.length) {
      if (content[altCloseBrace] === '{') braceDepth++;
      else if (content[altCloseBrace] === '}') braceDepth--;
      altCloseBrace++;
    }
    const altBlock = content.slice(altBlockStart, altCloseBrace);
    const enMatch = altBlock.match(/['"]en['"]\s*:\s*['"]([^'"]*)['"]/);
    const jaMatch = altBlock.match(/['"]ja['"]\s*:\s*['"]([^'"]*)['"]/);
    if (enMatch && jaMatch) {
      console.log('  en:', enMatch[1].slice(0, 60));
      console.log('  en hasChinese:', /[\u4e00-\u9fff]/.test(enMatch[1]));
      console.log('  ja hasChinese:', /[\u4e00-\u9fff]/.test(jaMatch[1]));
    }
  }

  pos = slugAbsPos + 10;
  iter++;
}
