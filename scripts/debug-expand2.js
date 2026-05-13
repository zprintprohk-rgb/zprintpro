const fs = require('fs');
const data = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

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

const start = data.indexOf('export const stickerMaterialsCluster');
const end = data.indexOf('export const stickerPackagingDesignCluster');
const block = data.slice(start, end);

const en = extractString(block, "'en':");
console.log('EN has Cost-Benefit:', en.includes('Cost-Benefit Analysis'));
console.log('EN last 100 chars:', en.slice(-100));

// Now check if the file after mass-expand actually has the replacement
const old = "'en': '" + en.replace(/'/g, "\\'") + "',";
const nen = en.slice(0, en.lastIndexOf('</p>') + 4) + '<h2>Cost-Benefit Analysis</h2><p>test</p>';
const rep = "'en': '" + nen.replace(/'/g, "\\'") + "',";
console.log('Can replace:', block.includes(old));
console.log('Replacement would be length:', rep.length);
