// 完整分析两篇参考文章的元素 + H2/H3 分布
const fs=require('fs');
const zh=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(zh)?zh:Object.values(zh);
for(const [name,slug] of [['sticker-material','sticker-material-pvc-vinyl-removable'],['campus','campus-education-printing-pillar-guide']]){
  const s=arr.find(x=>(x.slug||x.id)===slug);
  const c=s.content;
  // 统计
  const h2s=[...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim());
  const h3s=[...c.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim());
  const divs=[...c.matchAll(/<div[^>]*class="([^"]*)"[^>]*>/g)].map(m=>m[1]);
  console.log(`\n========== ${name} ==========`);
  console.log(`H2 (${h2s.length}):`);
  h2s.forEach(h=>console.log(`  - ${h.slice(0,45)}`));
  console.log(`H3 (${h3s.length}):`);
  h3s.forEach(h=>console.log(`  - ${h.slice(0,45)}`));
  console.log(`div 块 (${divs.length}):`);
  divs.forEach(d=>console.log(`  - ${d.slice(0,60)}`));
}
