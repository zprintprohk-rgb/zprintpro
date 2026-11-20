const fs=require('fs');
const j=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(j)?j:Object.values(j);
const s=arr.find(x=>(x.slug||x.id)==='textbook-printing-guide');
console.log('=== zh-hk textbook-printing-guide content ===');
console.log(s.content);
