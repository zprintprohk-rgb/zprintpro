const fs = require('fs');
const c = fs.readFileSync('src/lib/seo.ts', 'utf8');
const i = c.indexOf('descPrefix');
console.log('=== descPrefix 定义区 ===');
console.log(c.slice(Math.max(0, i - 900), i + 260).replace(/\n{2,}/g, '\n'));
