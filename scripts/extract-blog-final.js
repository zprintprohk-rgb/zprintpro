const { execSync } = require('child_process');
const fs = require('fs');

// Read full original from git
const orig = execSync('git -C F:/zprintpro-nextjs show 588202d:src/app/[locale]/blog/[slug]/page.tsx', {
  encoding: 'buffer', maxBuffer: 10 * 1024 * 1024
}).toString('utf8');

console.log('Size:', orig.length);

// Find all content template literals with surrounding slug context
const contentRe = /content:\s*`([\s\S]*?)`/g;
const all = [];
let match;
while ((match = contentRe.exec(orig)) !== null) {
  const contentPos = match.index;
  // Find the slug by looking backwards for 'slug': {
  const before = orig.substring(0, contentPos);
  const slugMatch = before.match(/'([a-z0-9-]+)'\s*:\s*\{/g);
  const slug = slugMatch ? slugMatch[slugMatch.length - 1].replace(/['\s:{}]/g, '') : 'unknown';
  
  all.push({
    slug,
    content: match[1].trim(),
    pos: contentPos,
  });
}

console.log('Found', all.length, 'content entries');

// Determine locale by position:
// Entries before the zh-hk locale closing are zh-hk
// Entries after zh-hk but before en closing are en
// Entries after en closing are ja

// Find locale boundaries by looking for 'en': { and 'ja': { after the blog data section
const zhDataStart = orig.indexOf("'zh-hk': {", 1700);
const enDataStart = orig.indexOf("'en': {", zhDataStart + 100);
const jaDataStart = orig.indexOf("'ja': {", enDataStart + 100);
const dataEnd = orig.indexOf('const articleSlugs', jaDataStart);
if (dataEnd < 0) {
  // Try '};' after ja
  const tmp = orig.indexOf('};', jaDataStart);
  if (tmp > 0) dataEnd = tmp;
}

console.log('zh-hk:', zhDataStart, 'en:', enDataStart, 'ja:', jaDataStart, 'end:', dataEnd);

// Assign locale by position
const byLocale = { 'zh-hk': {}, 'en': {}, 'ja': {} };
for (const entry of all) {
  let locale;
  if (entry.pos < enDataStart) locale = 'zh-hk';
  else if (entry.pos < jaDataStart) locale = 'en';
  else locale = 'ja';
  
  byLocale[locale][entry.slug] = entry.content;
}

// Write JSON
const outDir = 'F:/zprintpro-nextjs/src/data/blog-contents';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const loc of ['zh-hk', 'en', 'ja']) {
  const data = byLocale[loc];
  const path = `${outDir}/${loc}.json`;
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  const size = fs.statSync(path).size;
  console.log(`${loc}: ${Object.keys(data).length} articles, ${(size/1024).toFixed(1)}KB`);
  
  // Quality
  for (const [slug, html] of Object.entries(data)) {
    const text = html.replace(/<[^>]+>/g, '');
    const tag = text.length >= 200 ? '✅' : '⚠️';
    console.log(`  ${tag} ${slug}: ${text.length} chars (${html.length} HTML)`);
  }
}
