// 分析全站 blog content 的元素多样性 (决定 CSS 升级覆盖面)
const fs=require('fs');
const allEl=new Map();
const sampleClasses=new Set();
const files=['src/data/blog-data/zh-hk.json','src/data/blog-data/en.json','src/data/blog-data/ja.json','src/data/buying-guides.ts'];
let totalArticles=0;
for(const f of files){
  let items;
  if(f.endsWith('.json')){
    const j=JSON.parse(fs.readFileSync(f,'utf8'));
    items=Array.isArray(j)?j:Object.values(j);
  } else {
    // buying-guides.ts 提取 content 块
    const t=fs.readFileSync(f,'utf8');
    const blocks=[...t.matchAll(/content:\s*\{([\s\S]*?)\n  \},/g)].map(m=>m[1]);
    items=blocks.map(b=>({content:['zh-hk','en','ja'].map(k=>{const m=b.match(new RegExp(`${k}:\\\\\`([\\\\s\\\\S]*?)\\\\\``));return m?m[1]:'';}).join('')}));
  }
  for(const s of items){
    const c=s.content||s.contentHtml||'';
    if(!c) continue;
    totalArticles++;
    for(const m of c.matchAll(/<(\/?)([a-z0-9]+)([^>]*)>/g)){
      const tag=m[2].toLowerCase();
      if(m[1]) continue;
      const cls=(m[3].match(/class="([^"]*)"/)||[])[1]||'';
      if(!allEl.has(tag)) allEl.set(tag,{count:0,classes:new Set()});
      allEl.get(tag).count++;
      if(cls) allEl.get(tag).classes.add(cls.slice(0,50));
    }
  }
}
console.log(`=== 全站 ${totalArticles} 篇文章元素分布 ===`);
for(const [tag,info] of [...allEl.entries()].sort((a,b)=>b[1].count-a[1].count)){
  const cls=[...info.classes].slice(0,8).join(' | ');
  console.log(`${tag} (${info.count}): ${cls||'(无类)'}`);
}
