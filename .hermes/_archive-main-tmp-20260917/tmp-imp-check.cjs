const fs=require('fs');
let hasImportant=false, sample='';
for(const f of ['src/data/blog-data/zh-hk.json','src/data/blog-data/en.json','src/data/blog-data/ja.json']){
  const j=JSON.parse(fs.readFileSync(f,'utf8'));
  const a=Array.isArray(j)?j:Object.values(j);
  for(const s of a){
    const c=s.content||'';
    if(c.includes('!important')){
      hasImportant=true;
      sample=c.match(/.{0,60}!important.{0,30}/s)?.[0]||'';
      break;
    }
  }
  if(hasImportant) break;
}
console.log('content 含 !important:', hasImportant?'❌ 会覆盖':'✅ 无');
if(hasImportant) console.log('样例:', sample);
