const { execSync } = require('child_process');
const fs = require('fs');
const orig = execSync('git -C F:/zprintpro-nextjs show 588202d:src/app/[locale]/blog/[slug]/page.tsx', {
  encoding: 'buffer', maxBuffer: 5 * 1024 * 1024
}).toString('utf8');

console.log('Size:', orig.length);

// Find all zh-hk occurrences
let i = 876;
let found = 0;
const positions = [];
while ((i = orig.indexOf("zh-hk", i + 1)) > 0 && found < 10) {
  found++;
  positions.push(i);
  console.log(found, ':', i, orig.substring(i, i + 120).replace(/\n/g, '|'));
}

// The blog data zh-hk should be after the translations
// Let's search for content: ` to find the blog data section
const contentIdx = orig.indexOf('content: `', 1000);
console.log('\nFirst content backtick at:', contentIdx);

// Look backwards 1000 chars for the zh-hk locale marker
const before = orig.substring(Math.max(0, contentIdx - 1000), contentIdx);
const zhMatch = before.match(/'zh-hk':\s*\{/g);
if (zhMatch) console.log('zh-hk markers before content:', zhMatch.length);
else console.log('No zh-hk marker before content');

console.log('\nContext before first content:', before.substring(before.length - 200).replace(/\n/g, '|'));
