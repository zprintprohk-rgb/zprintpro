// 验证全站 blog 内容的所有内链 (无 404)
const fs=require('fs');
const { execSync }=require('child_process');
const zh=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(zh)?zh:Object.values(zh);
// 收集所有内链 (3 locale 文章)
const links=new Map(); // url -> count
for(const f of ['src/data/blog-data/zh-hk.json','src/data/blog-data/en.json','src/data/blog-data/ja.json']){
  const j=JSON.parse(fs.readFileSync(f,'utf8'));
  const a=Array.isArray(j)?j:Object.values(j);
  for(const s of a){
    const c=s.content||'';
    for(const m of c.matchAll(/href="([^"]*)"/g)){
      const url=m[1];
      if(!url.startsWith('/')) continue; // 只查站内
      const key=url.split('#')[0];
      links.set(key,(links.get(key)||0)+1);
    }
  }
}
console.log(`=== 全站 blog 内链 ${links.size} 个唯一 URL ===`);
// 并发 curl 检查 (分批, 每批 10)
const urls=[...links.keys()];
const bad=[];
const BATCH=8;
for(let i=0;i<urls.length;i+=BATCH){
  const batch=urls.slice(i,i+BATCH);
  const cmds=batch.map(u=>`curl.exe -s -o NUL -w "%{http_code} ${u}" "${u}"`).join('; ');
  try{
    const out=execSync(cmds,{encoding:'utf8',timeout:60000});
    for(const line of out.split('\n')){
      const m=line.trim().match(/^(\d{3})\s+(\S+)/);
      if(m){
        const code=parseInt(m[1]);
        if(code>=400){ bad.push(`${m[2]} → ${code}`); console.log(`❌ ${code} ${m[2]}`); }
      }
    }
  }catch(e){ console.log('批出错:', e.message.slice(0,60)); }
}
console.log(`\n=== 结果: ${bad.length} 个 4xx/5xx ===`);
if(bad.length) console.log(bad.join('\n'));
