const fs=require('fs');
// 模拟现有 getTopSkuByCategory 逻辑
const { execSync } = require('child_process');
// 直接读源码逻辑复现
const src = fs.readFileSync('src/data/products.ts','utf8');
// 用 tsx 太重, 直接静态分析 products weight_score
const prodMatch=[...src.matchAll(/slug: '([a-z0-9-]+)',[\s\S]*?category_slug: '([a-z0-9-]+)',[\s\S]*?weight_score: (\d+),/g)];
const prods=prodMatch.map(m=>({slug:m[1],cat:m[2],ws:parseInt(m[3])}));
// 分类热度 = 该类所有 SKU weight_score 之和
const catHeat={};
for(const p of prods) catHeat[p.cat]=(catHeat[p.cat]||0)+p.ws;
// 每类 top 1 (按 weight_score)
const topByCat={};
for(const p of prods){
  if(!topByCat[p.cat] || p.ws>topByCat[p.cat].ws) topByCat[p.cat]=p;
}
const EXCLUDED=['greeting-cards'];
// 现排序: 按分类热度
const byCatHeat=Object.values(topByCat).filter(p=>!EXCLUDED.includes(p.cat))
  .sort((a,b)=>(catHeat[b.cat]||0)-(catHeat[a.cat]||0)).slice(0,12);
console.log('=== 现有: 按分类热度排 ===');
byCatHeat.forEach((p,i)=>console.log(`${i+1}. ${p.slug} (${p.cat}) ws=${p.ws} 分类热度=${catHeat[p.cat]}`));
// 新排序: 按 SKU 自身热度
const bySelfHeat=Object.values(topByCat).filter(p=>!EXCLUDED.includes(p.cat))
  .sort((a,b)=>b.ws-a.ws).slice(0,12);
console.log('\n=== 新: 按 SKU 自身热度排 ===');
bySelfHeat.forEach((p,i)=>console.log(`${i+1}. ${p.slug} (${p.cat}) ws=${p.ws} 分类热度=${catHeat[p.cat]}`));
