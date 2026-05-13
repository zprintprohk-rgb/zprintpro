const fs = require('fs');
const content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');
const dataStart = content.indexOf('export const stickerGuidePillar');
const data = content.slice(dataStart);

function stripHtmlTagsOnly(str) {
  return str.replace(/<[^>]+>/g, ' ');
}

function countChineseChars(str) {
  const cleaned = stripHtmlTagsOnly(str).replace(/\s+/g, '');
  return (cleaned.match(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;
}

function countJapaneseChars(str) {
  const cleaned = stripHtmlTagsOnly(str).replace(/\s+/g, '');
  return (cleaned.match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;
}

function countEnglishWords(str) {
  const cleaned = stripHtmlTagsOnly(str);
  return cleaned.split(/\s+/).filter(w => w.length > 0 && /[a-zA-Z]/.test(w)).length;
}

// Extract quoted string handling escaped quotes
function extractString(data, startLabel) {
  const idx = data.indexOf(startLabel);
  if (idx === -1) return null;
  let pos = idx + startLabel.length;
  // Skip whitespace
  while (pos < data.length && /\s/.test(data[pos])) pos++;
  if (data[pos] !== "'") return null;
  pos++; // skip opening quote
  let result = '';
  while (pos < data.length) {
    if (data[pos] === '\\' && pos + 1 < data.length) {
      result += data[pos + 1];
      pos += 2;
    } else if (data[pos] === "'") {
      pos++; // skip closing quote
      break;
    } else {
      result += data[pos];
      pos++;
    }
  }
  return result;
}

// Find all content blocks
const contentPositions = [];
let pos = 0;
while (true) {
  const idx = data.indexOf('content:', pos);
  if (idx === -1) break;
  const lineStart = data.lastIndexOf('\n', idx);
  const prefix = data.slice(lineStart + 1, idx + 8);
  if (/^\s+content:/.test(prefix)) {
    contentPositions.push(idx);
  }
  pos = idx + 1;
}

const pillars = ['sticker-guide', 'flyer-guide', 'packaging-guide'];
const clusters = [
  'sticker-materials', 'sticker-packaging-design', 'clear-vs-matte-stickers',
  'flyer-sizes-compared', 'flyer-distribution-strategy', 'foil-flyers-industry',
  'rigid-vs-folding-boxes', 'eco-paper-bag-gsm', 'packaging-color-psychology'
];
const allItems = [...pillars, ...clusters];

console.log('=== Content Word Count ===\n');
console.log('Item                          | zh-hk chars | en words | ja chars | Status');
console.log('------------------------------|-------------|----------|----------|--------');

for (let i = 0; i < contentPositions.length; i++) {
  const start = contentPositions[i];
  // Find end of this content block using brace depth
  let braceOpen = data.indexOf('{', start);
  let depth = 1;
  let end = braceOpen + 1;
  while (depth > 0 && end < data.length) {
    if (data[end] === "'") {
      // skip string literal
      end++;
      while (end < data.length) {
        if (data[end] === '\\' && end + 1 < data.length) {
          end += 2;
        } else if (data[end] === "'") {
          end++;
          break;
        } else {
          end++;
        }
      }
      continue;
    }
    if (data[end] === '{') depth++;
    else if (data[end] === '}') depth--;
    end++;
  }
  const block = data.slice(start, end);

  const zh = extractString(block, "'zh-hk':");
  const en = extractString(block, "'en':");
  const ja = extractString(block, "'ja':");

  if (!zh || !en || !ja) {
    console.log('Failed to parse block', i, {zh:!!zh, en:!!en, ja:!!ja});
    continue;
  }

  const name = allItems[i] || `unknown-${i}`;
  const zhCount = countChineseChars(zh);
  const enCount = countEnglishWords(en);
  const jaCount = countJapaneseChars(ja);
  const isPillar = i < 3;
  const zhReq = isPillar ? 2000 : 800;
  const enReq = isPillar ? 1500 : 500;
  const jaReq = isPillar ? 2000 : 800;
  const status = (zhCount >= zhReq && enCount >= enReq && jaCount >= jaReq) ? 'OK' : 'NEED_FILL';
  console.log(`${name.padEnd(30)}| ${zhCount.toString().padStart(11)} | ${enCount.toString().padStart(8)} | ${jaCount.toString().padStart(8)} | ${status}`);
}

console.log('\nRequirements: Pillars zh>=2000 en>=1500 ja>=2000 | Clusters zh>=800 en>=500 ja>=800');
