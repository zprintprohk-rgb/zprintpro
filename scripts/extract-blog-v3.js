const fs = require('fs');

// Read original blog file (from git) — 588202d has full content
const orig = fs.readFileSync('F:/zprintpro-nextjs/blog-original.tsx', 'utf8');
console.log('Original size:', orig.length);

// Strategy: find all slug entries with content backticks
// Each entry has: 'slug': { ...content: `HTML`... }
// We need to match slug→content pairs

// Find all content template literals
const contentRe = /content:\s*`([\s\S]*?)`/g;
const allContent = [];
let match;
while ((match = contentRe.exec(orig)) !== null) {
  const pos = match.index;
  // Look backwards from this position to find the slug key
  const before = orig.substring(Math.max(0, pos - 500), pos);
  const slugMatch = before.match(/'([a-z0-9-]+)':\s*\{(?:\s*\n\s*(?:title|description|date|category):[^}]*)*\s*\n\s*content:$/m);
  if (slugMatch) {
    allContent.push({ slug: slugMatch[1], content: match[1].trim(), pos });
  }
}

console.log('Found', allContent.length, 'content entries');

// Now group by locale by checking what's around each entry
// zh-hk entries come first, then en, then ja
// Simplified: split into 3 equal-ish chunks based on position
const entries = {};
const sorted = allContent.sort((a, b) => a.pos - b.pos);
const total = sorted.length;
const chunkSize = Math.ceil(total / 3);

// Map positions to locales based on the known structure
// Lines 61-305: zh-hk, 506-532: en, 732-758: ja
const isLocale = (pos, locale) => {
  if (locale === 'zh-hk') return pos < 20000 || (pos > 20000 && pos < 25000);
  if (locale === 'en') return pos > 25000 && pos < 45000;
  if (locale === 'ja') return pos > 45000;
  return false;
};

entries['zh-hk'] = {};
entries['en'] = {};
entries['ja'] = {};

// More reliable mapping: the slug determines the locale
// zh-hk slugs have Chinese titles, en have English, ja have Japanese
// But many slugs are the same across locales (same key)

// Instead, parse the file by position ranges
// First block of content entries (pos < 25000) = zh-hk
// Second block (25000-45000) = en
// Third block (>45000) = ja
for (const entry of sorted) {
  if (entry.pos < 25000) entries['zh-hk'][entry.slug] = entry.content;
  else if (entry.pos < 45000) entries['en'][entry.slug] = entry.content;
  else entries['ja'][entry.slug] = entry.content;
}

// Write to JSON
const outDir = 'F:/zprintpro-nextjs/src/data/blog-contents';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(`${outDir}/zh-hk.json`, JSON.stringify(entries['zh-hk'], null, 2), 'utf8');
fs.writeFileSync(`${outDir}/en.json`, JSON.stringify(entries['en'], null, 2), 'utf8');
fs.writeFileSync(`${outDir}/ja.json`, JSON.stringify(entries['ja'], null, 2), 'utf8');

for (const loc of ['zh-hk', 'en', 'ja']) {
  const keys = Object.keys(entries[loc]);
  const size = fs.statSync(`${outDir}/${loc}.json`).size;
  console.log(`${loc}: ${keys.length} articles, ${(size/1024).toFixed(1)}KB`);
}
