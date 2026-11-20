import fs from 'fs';
const raw = fs.readFileSync('F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.zhhk-ja.json', 'utf8');
console.log('head:', JSON.stringify(raw.slice(0, 260)));
const i = raw.indexOf('"content"');
console.log('content key idx:', i);
console.log('after content:', JSON.stringify(raw.slice(i, i + 70)));
for (const f of ['slug', 'title', 'description', 'excerpt', 'category', 'content']) {
  for (const loc of ['zh-hk', 'ja']) {
    const re = new RegExp('"' + f + '":\\s*\\{\\s*"' + loc + '":\\s*"');
    console.log(f, loc, '->', re.test(raw));
  }
}
