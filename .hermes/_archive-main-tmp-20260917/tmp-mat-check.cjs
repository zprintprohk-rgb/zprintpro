// 检查 12 个首页 SKU 的 specs.material 覆盖率 (决定 [材质] 行显示率)
const fs=require('fs');
const src=fs.readFileSync('src/data/products.ts','utf8');
const slugs=['waterproof-stickers','kraft-paper-bags','magnetic-closure-gift-box','a4-flyers','a2-posters','foil-red-packets','wall-calendars','pvc-menus','outdoor-vinyl-banners','catalog-printing','business-envelopes','exercise-books'];
let withMat=0;
for(const s of slugs){
  const i=src.indexOf(`slug: '${s}'`);
  if(i<0){ console.log(`${s}: 未找到`); continue; }
  const seg=src.slice(i, i+3000);
  const m=seg.match(/material:\s*'([^']*)'/);
  const mat=m?m[1]:null;
  if(mat) withMat++;
  console.log(`${s}: 材质=${mat?'✅ '+mat.slice(0,40):'❌ 无'}`);
}
console.log(`\n材质覆盖率: ${withMat}/${slugs.length}`);
