// 深入看 sticker-material 的 content 结构 (K3 说的"版本格式")
const fs=require('fs');
const zh=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(zh)?zh:Object.values(zh);
const s=arr.find(x=>(x.slug||x.id)==='sticker-material-pvc-vinyl-removable');
const c=s.content;
// 打印所有 div 块 + 前后文 (看块的类型和内容)
const divs=[...c.matchAll(/<div[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/div>/g)];
console.log(`=== sticker-material ${divs.length} 个 div 块 ===`);
divs.forEach((d,i)=>{
  const inner=d[2].replace(/<[^>]+>/g,'').trim().slice(0,60);
  console.log(`[${i}] class="${d[1].slice(0,60)}" | ${inner}`);
});
// 打印开头部分 (引子/快速答案块结构)
console.log('\n=== 开头 60 行 ===');
console.log(c.split('\n').slice(0,60).join('\n').slice(0,3000));
