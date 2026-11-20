const fs=require('fs');
// 1. blog slugs (blog-posts + buying-guides)
const bp=fs.readFileSync('src/data/blog-posts.ts','utf8');
const blogSlugs=[...bp.matchAll(/slug: '([a-z0-9-]+)'/g)].map(m=>m[1]);
const bg=fs.readFileSync('src/data/buying-guides.ts','utf8');
const bgSlugs=[...bg.matchAll(/slug: '([a-z0-9-]+)'/g)].map(m=>m[1]);
const allBlog=[...new Set([...blogSlugs,...bgSlugs])];
// packaging 相关 blog
console.log('=== packaging/box 相关 blog slugs ===');
for(const s of allBlog.filter(s=>/pack|box|kraft|rigid|gift|carton/.test(s))) console.log(' ', s);

// 2. products.ts packaging 相关
const prod=fs.readFileSync('src/data/products.ts','utf8');
console.log('\n=== packaging 相关 product slugs ===');
for(const m of prod.matchAll(/slug: '([a-z0-9-]+)'/g)){
  if(/pack|box|rigid|gift|carton|kraft/.test(m[1])) console.log(' ', m[1]);
}

// 3. products.ts 中 packaging 盒子的价格字段
console.log('\n=== 价格样例 (gift-boxes / rigid-boxes 附近) ===');
const idx=prod.indexOf("slug: 'rigid-boxes'");
if(idx>0){
  const seg=prod.slice(idx, idx+1200);
  const priceM=seg.match(/basePrice[^,]*|minQuantity[^,]*|startingPrice[^,]*/g);
  console.log('rigid-boxes 段价格字段:', priceM?priceM.join(' | '):'(无匹配)');
  const start=seg.match(/startingPrice:\s*'([^']*)'/);
  console.log('startingPrice:', start?start[1]:'N/A');
} else {
  console.log('rigid-boxes slug 未找到，查 gift-boxes');
  const i2=prod.indexOf("slug: 'gift-boxes'");
  if(i2>0){
    const seg=prod.slice(i2, i2+1200);
    const start=seg.match(/startingPrice:\s*'([^']*)'/);
    const base=seg.match(/basePrice[^,]*/);
    console.log('gift-boxes startingPrice:', start?start[1]:'N/A', '| basePrice:', base?base[0]:'N/A');
  }
}
