const fs=require('fs');
const bg=fs.readFileSync('src/data/buying-guides.ts','utf8');
const i=bg.indexOf(`slug: 'packaging-buying-guide'`);
const cStart=bg.indexOf('content: {', i);
const cEnd=bg.indexOf('\n  },', cStart);
const block=bg.slice(cStart, cEnd);
for(const key of ["'zh-hk': ","en: ","ja: "]){
  const m=block.match(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+"([\\s\\S]*?)`,"));
  if(!m){ console.log(`${key}: ❌`); continue; }
  const c=m[1];
  const h2s=(c.match(/<h2[^>]*>/g)||[]).length;
  const q=(c.match(/<h2[^>]*>[^<]*[？?]/g)||[]).length;
  const tables=(c.match(/<table/g)||[]).length;
  const faqs=(c.match(/<strong>Q[0-9]*[:：]/g)||[]).length;
  console.log(`${key.trim()}: ${c.length}字 H2=${h2s}(${q}问) 表=${tables} FAQ=${faqs}`);
}
