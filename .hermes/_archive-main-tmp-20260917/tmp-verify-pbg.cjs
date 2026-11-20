const fs=require('fs');
const bg=fs.readFileSync('src/data/buying-guides.ts','utf8');
const i=bg.indexOf(`slug: 'packaging-buying-guide'`);
const cStart=bg.indexOf('content: {', i);
const cEnd=bg.indexOf('\n  },', cStart);
const block=bg.slice(cStart, cEnd);
const re=/<p><strong>Q[0-9]*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)\s*A[0-9]*[:：]\s*([\s\S]*?)<\/p>/gi;
for(const key of ["'zh-hk': ","'en': ","'ja': "]){
  const m=block.match(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+"([\\s\\S]*?)`,"));
  if(!m){ console.log(`${key}: ❌ 无`); continue; }
  const c=m[1];
  const h2s=(c.match(/<h2[^>]*>/g)||[]).length;
  const q=(c.match(/<h2[^>]*>[^<]*[？?]/g)||[]).length;
  const tables=(c.match(/<table/g)||[]).length;
  const faqs=(c.match(/<strong>Q[0-9]*[:：]/g)||[]).length;
  const faqExtract=[...c.matchAll(re)].length;
  const blocks=(c.match(/bg-(?:amber|blue)-50/g)||[]).length;
  const links=(c.match(/href="/g)||[]).length;
  const ctas=(c.match(/wa\.me/g)||[]).length;
  const gold=(c.match(/【/g)||[]).length;
  const bad=/(智印印港|智印港(?!\)| 爲| 為| 印刷| 報價| 30| —|，|。|$))/g;
  const zhiCnt=(c.match(/智印港/g)||[]).length;
  const zpCnt=(c.match(/ZprintPro/g)||[]).length;
  console.log(`${key.trim()}: ${c.length}字 H2=${h2s}(${q}问) 表=${tables} FAQ=${faqs}(提取${faqExtract}) 块=${blocks} 链=${links} CTA=${ctas} 金块=${gold} | 智印港=${zhiCnt} ZprintPro=${zpCnt}`);
}
