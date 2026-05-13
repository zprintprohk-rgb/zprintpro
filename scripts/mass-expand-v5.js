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

const enAdd = '<h2>Future Trends in Printing Technology</h2><p>The printing industry continues to evolve rapidly with emerging technologies reshaping production capabilities. UV-LED curing systems reduce energy consumption by 60% compared to traditional mercury lamps while enabling printing on heat-sensitive substrates. Artificial intelligence-powered color management systems achieve near-perfect color consistency across different materials and production runs. Web-to-print platforms streamline the ordering process, allowing clients to upload designs, select specifications, and receive instant quotations without manual intervention. At ZPrintPro, we continuously invest in cutting-edge technology to ensure our clients benefit from the latest innovations in printing efficiency, quality, and sustainability. Our roadmap includes expanding our digital foil capabilities, introducing biodegradable lamination options, and implementing blockchain-based supply chain transparency for eco-conscious brands.</p>';

expandBlock("export const stickerGuidePillar", "export const flyerGuidePillar", enAdd);
expandBlock("export const flyerGuidePillar", "export const packagingGuidePillar", enAdd);
expandBlock("export const packagingGuidePillar", "export const stickerMaterialsCluster", enAdd);

fs.writeFileSync('src/data/pillar-content.ts', data);
console.log('Mass expansion v5 complete.');
