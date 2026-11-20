const fs=require('fs');
const j=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(j)?j:Object.values(j);
const s=arr.find(x=>(x.slug||x.id)==='textbook-printing-guide');
const c=s.content;
// 分析 HTML 元素类型分布
const elMap={};
for(const m of c.matchAll(/<(\/?)([a-z0-9]+)([^>]*)>/g)){
  const tag=m[2].toLowerCase();
  const isClose=!!m[1];
  if(isClose) continue;
  const cls=(m[3].match(/class="([^"]*)"/)||[])[1]||'';
  elMap[tag]=elMap[tag]||{count:0,classes:new Set()};
  elMap[tag].count++;
  if(cls) elMap[tag].classes.add(cls.slice(0,60));
}
for(const [tag,info] of Object.entries(elMap)){
  console.log(`${tag}: ${info.count} 次 | 类: ${[...info.classes].slice(0,5).join(', ')}`);
}
