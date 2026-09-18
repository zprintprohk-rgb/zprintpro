// scripts/fix-json-newlines-v3.js
// 用 Node.js + 字符串扫描, 在 <script type="application/ld+json"> 块内
// 把 string 内的 raw \n 转换为 \\n
const fs = require('fs');

const SLUG = 'campus-education-printing-pillar-guide';

for (const f of ['zh-hk.json', 'en.json', 'ja.json']) {
  const path = `src/data/blog-data/${f}`;
  const d = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const c = d[SLUG].content;
  const originalLen = c.length;

  // 找所有 <script type="application/ld+json"> ... </script> 块
  const blockRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/g;
  let m;
  let totalFixed = 0;
  let newContent = c;
  let lastEnd = 0;
  const replacements = [];

  while ((m = blockRegex.exec(c)) !== null) {
    const body = m[1];
    // Walk through body, track string state, replace \n with \\n inside strings
    let result = [];
    let inString = false;
    let escape = false;
    let fixed = 0;
    for (let i = 0; i < body.length; i++) {
      const ch = body[i];
      if (escape) { result.push(ch); escape = false; continue; }
      if (ch === '\\') { result.push(ch); escape = true; continue; }
      if (ch === '"') { inString = !inString; result.push(ch); continue; }
      if (inString && ch === '\n') {
        result.push('\\n');
        fixed++;
        continue;
      }
      result.push(ch);
    }
    if (fixed > 0) {
      replacements.push({ start: m.index + m[0].indexOf(body), end: m.index + m[0].indexOf(body) + body.length, fixed, newBody: result.join('') });
      totalFixed += fixed;
    }
  }

  // Apply replacements in reverse
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    newContent = newContent.substring(0, r.start) + r.newBody + newContent.substring(r.end);
  }

  d[SLUG].content = newContent;

  console.log(`${f}: fixed ${totalFixed} raw newlines in JSON-LD strings`);
  fs.writeFileSync(path, JSON.stringify(d, null, 2), 'utf-8');
}

console.log('\n=== 完成 ===');
