// 验证 h2 去编号预处理的正则正确性 (防 campus "一、" 与 counter 重复)
const fs=require('fs');
const zh=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(zh)?zh:Object.values(zh);
const testSlugs=['textbook-printing-guide','sticker-material-pvc-vinyl-removable','campus-education-printing-pillar-guide','packaging-box-pricing-2026','paper-materials'];
// 预处理正则: 匹配 h2 开头编号 "一、" / "1." / "1、" / "1) " / "Q1: " 等
function stripH2Number(content){
  return content.replace(/<h2[^>]*>[\s\S]*?<\/h2>/g,(h2)=>{
    return h2.replace(/>\s*(?:[一二三四五六七八九十百]+[、.．]|\d+[.、.)．]|[A-Za-z][.、.)]|[A-Z]+\d*[:：])\s*/, '>');
  });
}
for(const slug of testSlugs){
  const s=arr.find(x=>(x.slug||x.id)===slug);
  if(!s){ console.log(slug+': 未找到'); continue; }
  const c=s.content;
  const h2s=[...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim());
  const stripped=stripH2Number(c);
  const h2s2=[...stripped.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim());
  console.log(`\n=== ${slug} (${h2s.length} H2) ===`);
  h2s.forEach((h,i)=>{
    const change=h!==h2s2[i]?'→ '+h2s2[i]:'(不变)';
    console.log(`  ${h.slice(0,38)} ${change.slice(0,25)}`);
  });
}
