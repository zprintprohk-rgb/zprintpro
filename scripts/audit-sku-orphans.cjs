// 孤儿 SKU 审计 v4 (只读) —— 锚点经实测确证后定稿
// 量具三级返工全记录 (全部同一个根因: **锚点假设未先证实**)：
//   v1  `^ {4}slug:`        → 实测 products.ts 有 4 空格(94) 与 6 空格(5) 两种缩进 ⇒ 漏 5 个 ⇒ 4 个假孤儿
//   v1' `^ {2}"slug": {`    → 对 sku-seo-data 亦漏检 (fruit-food-label-stickers 线上 200 且标题来自该文件)
//   v2  结构求值 new Function → products.ts 含 TS 断言 ⇒ 求值失败, 记录数 = 0 (静默全量假阳性, 最危险)
//   v3  双正则交叉          → products 口径B 把 **categories[] 的 16 个分类 slug** 也数进来 ⇒ 拒绝出结论 (exit 2)
//   v4  本版: 两个数据源都用**实测确证的**锚点, 并各自做「值级对照」自检后, 才输出差集
// 实测确证依据 (.hermes/_tmp-prod-shape.cjs)：
//   products.ts: `export const products: Product[] = [` 在 L145; 记录形如 `{ id: 'BC-001', sku_code: …, slug: '<x>',`
//                缩进两种 (4=94 / 6=5) ⇒ 锚点 = `^\s*slug: '…',$` 命中 99, 且 `categories[]` 的 slug 无行尾逗号+行首
//   sku-seo-data: 顶层 SKU 键 = `"<slug>": {` 且**缩进不统一** —— 实测 99 个是 2 空格, 而
//                 `"fruit-food-label-stickers": {` 是**顶格 (0 空格)** (文件中唯一例外)。
//                 JS 对象忽略缩进 ⇒ 它照样能被 getSkuSeo(slug) 取到 (线上 200 且标题来自该文件) ⇒
//                 v1'/v4 早期版本把它误判为「缺 SEO 数据」= **第 4 次假阳性**。
//                 ⇒ 锚点改为 `^\s*"<slug>": \{$`; 但 `\s*` 会连带匹配深层嵌套键 (440 个),
//                   故**必须**用「顶层键只出现在 0/2 空格」的事实做二次过滤: 先取 `^\s{0,2}` 命中数,
//                   再看 4+ 空格命中数是否同量级 —— 若同量级说明该锚不可用, 应改用结构解析。
const fs = require('node:fs');

const prodRaw = fs.readFileSync('src/data/products.ts', 'utf8');
const seoRaw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');

const prodSlugs = [...prodRaw.matchAll(/^\s*slug: '([a-z0-9_-]+)',\s*$/gm)].map((m) => m[1]);
// 顶层 SKU 键: 允许 0-2 空格缩进 (实测 2 = 99 个 + 0 = 1 个)
const seoSlugs = [...seoRaw.matchAll(/^ {0,2}"([a-z0-9_-]+)": \{$/gm)].map((m) => m[1]);
// 反证: 若把缩进放宽到任意, 命中数会暴涨 ⇒ 证明「0-2 空格」才是顶层判别式
const seoAnyIndent = [...seoRaw.matchAll(/^\s*"([a-z0-9_-]+)": \{$/gm)].length;

// 自检 1: products 记录数应与「id: '<X>-001'」这类记录计数同量级
const prodIds = [...prodRaw.matchAll(/^\s*id: '([A-Z]{2}-\d{3})',$/gm)].length;
// 自检 2: sku-seo 顶层键数不应被更深层键污染 (缩进 ≥4 的键应远多于顶层键)
const deeperKeys = [...seoRaw.matchAll(/^ {4,}"([a-z0-9_-]+)": \{$/gm)].length;

console.log('=== 量具自检 ===');
console.log(`  products.ts  行级 slug 锚 = ${prodSlugs.length}   |  id: 'XX-000' 记录 = ${prodIds}  ${Math.abs(prodSlugs.length - prodIds) <= 8 ? '✅ 同量级' : '⚠️ 差异 >8, 需人读'}`);
console.log(`  sku-seo-data 顶层键(0-2 空格) = ${seoSlugs.length}   |  任意缩进命中 = ${seoAnyIndent} (若两者同量级 ⇒ 该锚不可用)`);
const dupProd = prodSlugs.filter((s, i) => prodSlugs.indexOf(s) !== i);
const dupSeo = seoSlugs.filter((s, i) => seoSlugs.indexOf(s) !== i);
console.log(`  重复: products=${dupProd.length} sku-seo=${dupSeo.length}`);

const seoOnly = seoSlugs.filter((s) => !prodSlugs.includes(s));
const prodOnly = prodSlugs.filter((s) => !seoSlugs.includes(s));

console.log('\n=== 集合差集 ===');
console.log(`★ sku-seo 有、products 无 (孤儿 SEO 条目): ${seoOnly.length}`);
seoOnly.forEach((s) => console.log('    ' + s));
console.log(`★ products 有、sku-seo 无 (缺 SEO 数据): ${prodOnly.length}`);
prodOnly.forEach((s) => console.log('    ' + s));

console.log('\n⚠️ 只读审计。孤儿处置须逐条人读, 且先确认是否被渲染路径消费 (同族: faqs[] 死数据判定)。');
