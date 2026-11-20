// 分析两篇参考文章的 content 结构差异
const fs=require('fs');
const zh=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(zh)?zh:Object.values(zh);
const s1=arr.find(x=>(x.slug||x.id)==='sticker-material-pvc-vinyl-removable');
const s2=arr.find(x=>(x.slug||x.id)==='campus-education-printing-pillar-guide');
for(const [name,s] of [['sticker-material-pvc-vinyl-removable',s1],['campus-education-printing-pillar-guide',s2]]){
  if(!s){ console.log(name+': 未找到'); continue; }
  const c=s.content;
  console.log(`\n========== ${name} (${c.length}B) ==========`);
  // 打印前 80 行结构
  const lines=c.split('\n').slice(0,80);
  for(let i=0;i<lines.length;i++){
    const l=lines[i].trim();
    if(!l) continue;
    // 简化显示
    const tagM=l.match(/^<(\/?)([a-z0-9]+)([^>]*)>/);
    if(tagM){
      const tag=tagM[2];
      const cls=(tagM[3].match(/class="([^"]*)"/)||[])[1]||'';
      const inner=l.replace(/<[^>]+>/g,'').trim();
      const show=inner?inner.slice(0,40):'';
      console.log(`  ${tag}${tagM[1]?'/':''} | ${cls.slice(0,45)} | ${show}`);
    } else {
      console.log(`  ?? ${l.slice(0,50)}`);
    }
  }
}
