// 验证全站 blog 内链 (逐个异步 fetch, 无 404)
const fs=require('fs');
const { execSync }=require('child_process');
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
console.log(`=== ${urls.length} 个唯一内链, 逐个检查 (GET /en 前缀测试, 取状态码) ===`);
// 用 curl 单 URL 逐个 (-I HEAD 请求)
const bad=[];
let done=0;
for(const u of urls){
  try{
    // HEAD 请求拿状态码
    const out=execSync(`curl.exe -s -o NUL -w "%{http_code}" -I "${u}"`,{encoding:'utf8',timeout:20000});
    const code=parseInt(out.trim());
    if(code>=400){ bad.push(`${u} → ${code}`); console.log(`❌ ${code} ${u}`); }
    else if(code===0){ /* 某些 URL HEAD 不支持, 用 GET 试 */ 
      const out2=execSync(`curl.exe -s -o NUL -w "%{http_code}" "${u}"`,{encoding:'utf8',timeout:20000});
      const code2=parseInt(out2.trim());
      if(code2>=400){ bad.push(`${u} → ${code2}(GET)`); console.log(`❌ ${code2} ${u}(GET)`); }
    }
  }catch(e){ bad.push(`${u} → ERR ${e.message.slice(0,30)}`); console.log(`❌ ERR ${u}`); }
  done++;
  if(done%50===0) process.stdout.write(`  ...${done}/${urls.length}\n`);
}
console.log(`\n=== 结果: ${bad.length}/${urls.length} 个异常 ===`);
if(bad.length) console.log(bad.join('\n'));
