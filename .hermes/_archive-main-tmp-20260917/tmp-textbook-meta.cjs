const fs=require('fs');
// 查 textbook-printing-guide 是否在 blog-posts.ts (metadata) + 何时加入
const bp=fs.readFileSync('src/data/blog-posts.ts','utf8');
const i=bp.indexOf("'textbook-printing-guide'");
if(i<0){ console.log('blog-posts.ts 未找到 textbook-printing-guide'); }
else {
  const seg=bp.slice(Math.max(0,i-200), i+400);
  console.log('=== blog-posts.ts 上下文 ===');
  console.log(seg.split('\n').slice(0,12).join('\n'));
}
// 查 date
const zh=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(zh)?zh:Object.values(zh);
const s=arr.find(x=>(x.slug||x.id)==='textbook-printing-guide');
console.log('\n=== zh-hk 条目字段 ===');
console.log('slug:', s.slug, '| date:', s.date, '| seoTitle:', s.seoTitle);
console.log('keys:', Object.keys(s).join(', '));
