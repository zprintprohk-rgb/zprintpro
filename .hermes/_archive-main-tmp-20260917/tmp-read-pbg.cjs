const fs=require('fs');
const bg=fs.readFileSync('src/data/buying-guides.ts','utf8');
const i=bg.indexOf(`slug: 'packaging-buying-guide'`);
const cStart=bg.indexOf('content: {', i);
const cEnd=bg.indexOf('\n  },', cStart);
const block=bg.slice(cStart, cEnd);
console.log('=== 现有 packaging-buying-guide content 块 ===');
console.log(block);
