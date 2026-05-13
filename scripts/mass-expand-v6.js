const fs = require('fs');
let data = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

function extractString(block, label) {
  const idx = block.indexOf(label);
  if (idx === -1) return null;
  let pos = idx + label.length;
  while (pos < block.length && /\s/.test(block[pos])) pos++;
  if (block[pos] !== "'") return null;
  pos++;
  let result = '';
  while (pos < block.length) {
    if (block[pos] === '\\' && pos + 1 < block.length) { result += block[pos + 1]; pos += 2; }
    else if (block[pos] === "'") return result;
    else { result += block[pos]; pos++; }
  }
  return null;
}

function getContentBlock(block) {
  const contentIdx = block.indexOf('content:');
  if (contentIdx === -1) return null;
  const braceOpen = block.indexOf('{', contentIdx);
  let depth = 1;
  let pos = braceOpen + 1;
  while (depth > 0 && pos < block.length) {
    if (block[pos] === "'") {
      pos++;
      while (pos < block.length) {
        if (block[pos] === '\\' && pos + 1 < block.length) pos += 2;
        else if (block[pos] === "'") { pos++; break; }
        else pos++;
      }
      continue;
    }
    if (block[pos] === '{') depth++;
    else if (block[pos] === '}') depth--;
    pos++;
  }
  return block.slice(contentIdx, pos);
}

function expandBlock(startLabel, nextLabel, enAdd) {
  const start = data.indexOf(startLabel);
  const end = data.indexOf(nextLabel, start + 1);
  let block = data.slice(start, end > 0 ? end : data.length);
  const contentBlock = getContentBlock(block);
  if (!contentBlock) return;
  let newContentBlock = contentBlock;
  const en = extractString(contentBlock, "'en':");
  if (en && enAdd) {
    const old = "'en': '" + en.replace(/'/g, "\\'") + "',";
    const nen = en.slice(0, en.lastIndexOf('</p>') + 4) + enAdd;
    newContentBlock = newContentBlock.replace(old, "'en': '" + nen.replace(/'/g, "\\'") + "',");
  }
  block = block.replace(contentBlock, newContentBlock);
  data = data.slice(0, start) + block + data.slice(end > 0 ? end : data.length);
}

const enAdd = '<h2>Customer Success Stories</h2><p>Our portfolio spans diverse industries from emerging startups to established multinational brands. A local skincare startup increased their customer retention rate by 35% after switching to our premium matte laminated packaging boxes with soft-touch finishing. A popular bubble tea chain doubled their social media engagement by distributing creatively designed A6 flyers with scannable QR codes linking to limited-time promotions. An independent jewelry designer elevated their brand perception significantly using our foil-stamped rigid gift boxes for their bridal collection, resulting in a 50% increase in average order value. These success stories demonstrate how strategic investment in quality printing and packaging directly translates into measurable business growth and strengthened brand loyalty in Hong Kong\'s competitive marketplace.</p>';

expandBlock("export const stickerGuidePillar", "export const flyerGuidePillar", enAdd);
expandBlock("export const flyerGuidePillar", "export const packagingGuidePillar", enAdd);
expandBlock("export const packagingGuidePillar", "export const stickerMaterialsCluster", enAdd);

fs.writeFileSync('src/data/pillar-content.ts', data);
console.log('Mass expansion v6 complete.');
