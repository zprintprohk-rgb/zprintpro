const fs=require('fs');
const zh=JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json','utf8'));
const arr=Array.isArray(zh)?zh:Object.values(zh);
// 对比 T1 批 vs daily 批的排版元素
const t1Slugs=['packaging-box-pricing-2026','kraft-paper-box-types-comparison-2026','sticker-guide','saddle-stitch-booklet-printing-guide','rush-printing-hk-guide'];
const dailySlugs=['textbook-printing-guide','certificate-printing-guide','paper-materials','catalog-printing-china-supplier-guide'];
for(const slug of t1Slugs.concat(dailySlugs)){
  const s=arr.find(x=>(x.slug||x.id)===slug);
  if(!s){ console.log(slug+': 未找到'); continue; }
  const c=s.content;
  const stats={
    h2:(c.match(/<h2/g)||[]).length,
    h3:(c.match(/<h3/g)||[]).length,
    table:(c.match(/<table/g)||[]).length,
    amber:(c.match(/bg-amber/g)||[]).length,
    blue:(c.match(/bg-blue/g)||[]).length,
    gray:(c.match(/bg-gray/g)||[]).length,
    faq:(c.match(/Q[:：]/g)||[]).length,
    gold:(c.match(/【/g)||[]).length,
    ul:(c.match(/<ul/g)||[]).length,
    ol:(c.match(/<ol/g)||[]).length,
    li:(c.match(/<li/g)||[]).length,
    strong:(c.match(/<strong/g)||[]).length,
    len:c.length,
  };
  const tag=t1Slugs.includes(slug)?'T1批':'daily批';
  console.log(`${tag} ${slug}: H2=${stats.h2} H3=${stats.h3} 表=${stats.table} 琥珀块=${stats.amber} 蓝块=${stats.blue} 灰块=${stats.gray} FAQ=${stats.faq} 金块=${stats.gold} ul=${stats.ul} ol=${stats.ol} li=${stats.li} strong=${stats.strong} (${stats.len}B)`);
}
