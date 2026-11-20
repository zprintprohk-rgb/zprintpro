import { products } from "../src/data/products";
import { skuSeoData } from "../src/data/sku-seo-data";
let same=0, diff=0, seoEmpty=0, prodEmpty=0;
const diffList:any[]=[];
for (const p of products) {
  const seo = skuSeoData[p.slug];
  for (const loc of ["zh-hk","en","ja"] as const) {
    const pt = (p as any)[loc==="zh-hk"?"title_zh":loc==="en"?"title_en":"title_ja"] ?? "";
    const st = seo?.seo?.[loc]?.title ?? "";
    if (!pt) prodEmpty++;
    if (!st) seoEmpty++;
    if (st && pt && st !== pt) { diff++; diffList.push({slug:p.slug, loc, pt, st}); }
    else same++;
  }
}
console.log("sku-seo title 非空且≠产品 title:", diff, "| 相同/无seo:", same, "| seo空:", seoEmpty, "| 产品空:", prodEmpty);
// 抽样 zh-hk 差异
for (const d of diffList.filter(x=>x.loc==="zh-hk").slice(0,8)) console.log(`  zh-hk ${d.slug}:\n    产品: ${d.pt}\n    seo : ${d.st}`);
