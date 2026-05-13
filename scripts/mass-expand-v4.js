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

const enAdd = '<h2>Working with ZPrintPro</h2><p>Partnering with ZPrintPro means gaining access to Hong Kong\'s most comprehensive printing ecosystem. Our online quotation system provides instant pricing for standard products, while our dedicated account managers handle complex custom projects from concept to delivery. We maintain transparent pricing with no hidden fees—every quote includes material costs, setup fees, and delivery charges upfront. Our quality guarantee ensures that if any product fails to meet agreed specifications, we will reprint at no additional cost. With over a decade of experience serving Hong Kong businesses, we understand the local market\'s unique demands for speed, quality, and reliability.</p>';

expandBlock("export const stickerGuidePillar", "export const flyerGuidePillar", enAdd);
expandBlock("export const flyerGuidePillar", "export const packagingGuidePillar", enAdd);
expandBlock("export const packagingGuidePillar", "export const stickerMaterialsCluster", enAdd);

// eco-paper-bag-gsm needs +3 en words
expandBlock("export const ecoPaperBagGsmCluster", "export const packagingColorPsychologyCluster",
  '<h2>Why Choose ZPrintPro for Paper Bags</h2><p>Our commitment to quality extends across every aspect of paper bag production. From precise GSM selection guidance to professional design consultation, we ensure each bag reflects your brand values while meeting functional requirements.</p>');

fs.writeFileSync('src/data/pillar-content.ts', data);
console.log('Mass expansion v4 complete.');
