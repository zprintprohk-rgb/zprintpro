const fs = require('fs');
const content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

function countEnglishWords(str) {
  return str.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 0 && /[a-zA-Z]/.test(w)).length;
}

function extractString(block, label) {
  const idx = block.indexOf(label);
  if (idx === -1) return null;
  let pos = idx + label.length;
  while (pos < block.length && /\s/.test(block[pos])) pos++;
  if (block[pos] !== "'") return null;
  pos++;
  let result = '';
  while (pos < block.length) {
    if (block[pos] === '\\' && pos + 1 < block.length) {
      result += block[pos + 1];
      pos += 2;
    } else if (block[pos] === "'") {
      return result;
    } else {
      result += block[pos];
      pos++;
    }
  }
  return null;
}

const clusters = ['flyer-sizes-compared', 'flyer-distribution-strategy', 'foil-flyers-industry'];
for (const slug of clusters) {
  const start = content.indexOf(`slug: '${slug}'`);
  const end = content.indexOf(`slug: '`, start + 10);
  const block = content.slice(start, end > 0 ? end : start + 10000);
  const contentIdx = block.indexOf('content:');
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
  const contentBlock = block.slice(contentIdx, pos);
  const en = extractString(contentBlock, "'en':");
  console.log(slug, 'en words:', countEnglishWords(en));
}
