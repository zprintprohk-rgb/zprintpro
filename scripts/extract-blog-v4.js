const { execSync } = require('child_process');
const fs = require('fs');

// Get full original content
const orig = execSync('git -C F:/zprintpro-nextjs show 588202d:src/app/[locale]/blog/[slug]/page.tsx', {
  encoding: 'buffer', maxBuffer: 5 * 1024 * 1024
}).toString('utf8');

console.log('Original size:', orig.length);

// Find: 'zh-hk': { ... }, 'en': { ... }, 'ja': { ... }
// These are inside: const posts: Record<...> = { 'zh-hk': { ... }, 'en': { ... }, 'ja': { ... } };

const postsIdx = orig.indexOf("'zh-hk': {", 500); // Skip translations zh-hk
if (postsIdx < 0) { console.log('zh-hk not found'); process.exit(1); }
console.log('zh-hk at:', postsIdx);

// The structure is: 'zh-hk': { 'company-intro': { title, desc, date, cat, content }, ... }
// Followed by 'en': { ... }, 'ja': { ... }
// Ended by };

const extractLocaleSection = (localeName, startIdx) => {
  const prefix = `'${localeName}': {`;
  const idx = orig.indexOf(prefix, startIdx);
  if (idx < 0) return { start: -1, end: -1 };
  
  const contentStart = idx + prefix.length;
  
  // Find matching closing brace
  let depth = 1;
  let i = contentStart;
  while (depth > 0 && i < orig.length) {
    if (orig[i] === '{') depth++;
    else if (orig[i] === '}') depth--;
    i++;
  }
  
  return { start: contentStart, end: i };
};

const zhHK = extractLocaleSection('zh-hk', 500);
const en = extractLocaleSection('en', zhHK.end + 10);
const ja = extractLocaleSection('ja', en.end + 10);

console.log('zh-hk:', zhHK.start, '-', zhHK.end);
console.log('en:', en.start, '-', en.end);
console.log('ja:', ja.start, '-', ja.end);

// Extract all slug→content pairs from a section
const extractArticles = (section, localeName) => {
  const entries = {};
  
  // Find slug entries: 'slug': {\n      title: ...\n      ...\n      content: `HTML`,\n    },
  const slugRe = /'([a-z0-9-]+)':\s*\{/g;
  let match;
  const slugs = [];
  while ((match = slugRe.exec(section)) !== null) {
    slugs.push({ slug: match[1], pos: match.index });
  }
  
  for (let i = 0; i < slugs.length; i++) {
    const { slug, pos } = slugs[i];
    const entryEnd = i + 1 < slugs.length ? slugs[i + 1].pos : section.length;
    const entry = section.substring(pos, entryEnd);
    
    const contentMatch = entry.match(/content:\s*`([\s\S]*?)`/);
    if (contentMatch) {
      entries[slug] = contentMatch[1].trim();
    }
  }
  
  return entries;
};

// Extract sections
const zhSection = orig.substring(zhHK.start, zhHK.end);
const enSection = orig.substring(en.start, en.end);
const jaSection = orig.substring(ja.start, ja.end);

const zhArticles = extractArticles(zhSection, 'zh-hk');
const enArticles = extractArticles(enSection, 'en');
const jaArticles = extractArticles(jaSection, 'ja');

// Write JSON
const outDir = 'F:/zprintpro-nextjs/src/data/blog-contents';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(`${outDir}/zh-hk.json`, JSON.stringify(zhArticles, null, 2), 'utf8');
fs.writeFileSync(`${outDir}/en.json`, JSON.stringify(enArticles, null, 2), 'utf8');
fs.writeFileSync(`${outDir}/ja.json`, JSON.stringify(jaArticles, null, 2), 'utf8');

for (const [loc, data] of [['zh-hk', zhArticles], ['en', enArticles], ['ja', jaArticles]]) {
  const size = fs.statSync(`${outDir}/${loc}.json`).size;
  console.log(`${loc}: ${Object.keys(data).length} articles, ${(size/1024).toFixed(1)}KB`);
  // Quality check
  let thinCount = 0;
  for (const [slug, html] of Object.entries(data)) {
    const textLen = html.replace(/<[^>]+>/g, '').length;
    if (textLen < 200) {
      console.log(`  ⚠️ ${slug}: ${textLen} chars`);
      thinCount++;
    }
  }
  if (thinCount === 0) console.log(`  ✅ all substantial`);
}
