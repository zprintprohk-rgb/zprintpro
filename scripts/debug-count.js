const fs = require('fs');
const content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

function stripHtmlTagsOnly(str) {
  return str.replace(/<[^>]+>/g, ' ');
}

function countChineseChars(str) {
  const cleaned = stripHtmlTagsOnly(str).replace(/\s+/g, '');
  return (cleaned.match(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;
}

function countEnglishWords(str) {
  const cleaned = stripHtmlTagsOnly(str);
  return cleaned.split(/\s+/).filter(w => w.length > 0 && /[a-zA-Z]/.test(w)).length;
}

function countJapaneseChars(str) {
  const cleaned = stripHtmlTagsOnly(str).replace(/\s+/g, '');
  return (cleaned.match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;
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

// Extract stickerGuidePillar block
const start = content.indexOf('export const stickerGuidePillar');
const end = content.indexOf('export const flyerGuidePillar');
const pillarBlock = content.slice(start, end);

// Find content: { ... } in this block
const contentIdx = pillarBlock.indexOf('content:');
const braceOpen = pillarBlock.indexOf('{', contentIdx);
let depth = 1;
let pos = braceOpen + 1;
while (depth > 0 && pos < pillarBlock.length) {
  if (pillarBlock[pos] === "'") {
    pos++;
    while (pos < pillarBlock.length) {
      if (pillarBlock[pos] === '\\' && pos + 1 < pillarBlock.length) {
        pos += 2;
      } else if (pillarBlock[pos] === "'") {
        pos++;
        break;
      } else {
        pos++;
      }
    }
    continue;
  }
  if (pillarBlock[pos] === '{') depth++;
  else if (pillarBlock[pos] === '}') depth--;
  pos++;
}
const contentBlock = pillarBlock.slice(contentIdx, pos);

const zh = extractString(contentBlock, "'zh-hk':");
const en = extractString(contentBlock, "'en':");
const ja = extractString(contentBlock, "'ja':");

console.log('zh-hk chars:', countChineseChars(zh));
console.log('en words:', countEnglishWords(en));
console.log('ja chars:', countJapaneseChars(ja));
