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

function getBlock(startLabel, nextLabel) {
  const start = data.indexOf(startLabel);
  const end = data.indexOf(nextLabel, start + 1);
  return data.slice(start, end > 0 ? end : data.length);
}

function countBlock(block, name) {
  const contentIdx = block.indexOf('content:');
  const contentBrace = block.indexOf('{', contentIdx);
  let depth = 1;
  let pos = contentBrace + 1;
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
  const contentBlock = block.slice(contentIdx, pos);
  const en = extractString(contentBlock, "'en':");
  const words = en.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 0 && /[a-zA-Z]/.test(w));
  return { name, enWords: words.length, enEnd: en.slice(-50) };
}

const clusters = [
  ['sticker-materials', 'export const stickerMaterialsCluster', 'export const stickerPackagingDesignCluster'],
];

for (const [name, start, next] of clusters) {
  const block = getBlock(start, next);
  const r = countBlock(block, name);
  console.log(r);
}
