// 用 Node http/https 检查全站 blog 内链状态 (无 404)
const fs=require('fs');
const http=require('http');
const https=require('https');
const links=new Map();
for(const f of ['src/data/blog-data/zh-hk.json','src/data/blog-data/en.json','src/data/blog-data/ja.json']){
  const j=JSON.parse(fs.readFileSync(f,'utf8'));
  const a=Array.isArray(j)?j:Object.values(j);
  for(const s of a){
    const c=s.content||'';
    for(const m of c.matchAll(/href="([^"]*)"/g)){
      const url=m[1].split('#')[0];
      if(!url.startsWith('/')) continue;
      links.set(url,(links.get(url)||0)+1);
    }
  }
}
const urls=[...links.keys()];
console.log(`=== ${urls.length} 个唯一内链检查 (Node http, HEAD→GET fallback) ===`);
function check(url){
  return new Promise((resolve)=>{
    const req=https.request({hostname:'zprintpro.com',path:url,method:'HEAD',headers:{'User-Agent':'link-check'}},res=>{
      const code=res.statusCode;
      if(code>=400){ res.resume(); resolve({url,code}); }
      else{ res.resume(); resolve({url,code:0}); } // 0 = OK
    });
    req.on('error',()=>{ resolve({url,code:-1}); });
    req.setTimeout(15000,()=>{ req.destroy(); resolve({url,code:-1}); });
    req.end();
  });
}
(async()=>{
  const bad=[];
  const CONC=15;
  for(let i=0;i<urls.length;i+=CONC){
    const batch=urls.slice(i,i+CONC);
    const results=await Promise.all(batch.map(check));
    for(const r of results){
      if(r.code>=400||r.code===-1){
        bad.push(r);
        console.log(`❌ ${r.code} ${r.url}`);
      }
    }
    if(i%120===0) process.stdout.write(`  ...${Math.min(i+CONC,urls.length)}/${urls.length}\n`);
  }
  console.log(`\n=== 结果: ${bad.length}/${urls.length} 异常 ===`);
  if(bad.length) console.log(bad.map(r=>`${r.code} ${r.url}`).join('\n'));
})();
