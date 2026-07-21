/**
 * 全局 H1 审计脚本 v2
 * 检查所有 85 个 SKU 的 zh-hk H1:
 * 1. 长度 ≤ 60 字符
 * 2. 无 2x+ 重复词
 * 3. 100% 繁体中文 (无简体字)
 * 4. sharp hook 存在
 * 5. 无 "深圳" / "Shenzhen" 泄漏 (§13.10)
 * 6. kw1 去重是否生效
 */
import { products, categories } from '../src/data/products.ts';
import { buildProductH1ZhHk } from '../src/lib/h1-builder.ts';

// 简体字检测表 (常见印刷/产品相关)
const SIMPLIFIED_CHARS = [
  '贴','纸','单','张','样','胶','装','册','历','开','环','烫','专','订','质','货',
  '运','标','号','规','传','览','报','礼','宝','喷','绘','联','练','习','无','骑',
  '马','钉','厂','网','湾','体','产','业','广','东','龙','岗','区','极','飞','艺',
  '术','复','种','类','图','书','制','厅','阳','际','验','护','备','养','营','获',
  '证','读','设','计','构','团','对','机','创','药','饮','饰','农','贸','铁','银',
  '钟','个','与','层','门','问','间','国','学','点','电','话','认','长','关','总',
  '还','进','过','时','来','动','经','现','场','带','块','条','组','编','圆','压',
  '变','头','实','写','将','觉','见','购','销','费','预','项','须','顺','领','顾',
  '里','面','发','台','适'
];

// 禁区词检测
const FORBIDDEN_WORDS = ['深圳', 'Shenzhen', '深セン', '中国深圳'];

function hasSimplified(s) {
  return SIMPLIFIED_CHARS.filter(c => s.includes(c));
}

function checkRepeats(h1) {
  // 分割为词段
  const parts = h1.split(' · ').map(p => p.trim());
  const seen = {};
  const repeats = [];
  for (const p of parts) {
    if (seen[p]) repeats.push(p);
    seen[p] = true;
  }
  // 也要检查子串重复 (如 "防水貼紙" 出现2次)
  const words = h1.replace(/[·\s]/g, ' ').split(/\s+/).filter(w => w.length >= 2);
  const wordSeen = {};
  for (const w of words) {
    if (wordSeen[w]) repeats.push(`子串重复:"${w}"`);
    wordSeen[w] = true;
  }
  return repeats;
}

let totalOK = 0;
let totalIssues = 0;
const issues = [];

for (const product of products) {
  const cat = categories.find(c => c.slug === product.category_slug);
  const categoryName = cat ? cat.name_zh : product.category;
  
  // 模拟 page.tsx 的 productTitle 提取逻辑
  const productTitle = product.name.split('|')[0].trim();
  
  const h1 = buildProductH1ZhHk(productTitle, categoryName, product.category_slug, product.slug);
  
  const skuIssues = [];
  
  // 1. 长度检查
  if (h1.length > 60) {
    skuIssues.push(`⚠️ 长度超限: ${h1.length} 字符 (>60)`);
  }
  
  // 2. 重复检查
  const repeats = checkRepeats(h1);
  if (repeats.length > 0) {
    skuIssues.push(`⚠️ 重复词: ${repeats.join(', ')}`);
  }
  
  // 3. 简体字检查
  const simplified = hasSimplified(h1);
  if (simplified.length > 0) {
    skuIssues.push(`🔴 简体字泄漏: ${simplified.join(', ')}`);
  }
  
  // 4. 禁区词检查
  const forbidden = FORBIDDEN_WORDS.filter(w => h1.includes(w));
  if (forbidden.length > 0) {
    skuIssues.push(`🔴 禁区词: ${forbidden.join(', ')}`);
  }
  
  // 5. sharp hook 检查 (至少应有卖点词)
  if (!h1.includes('·') || h1.split(' · ').length < 3) {
    skuIssues.push(`⚠️ 缺少 sharp hook (分隔段 <3)`);
  }
  
  if (skuIssues.length === 0) {
    totalOK++;
  } else {
    totalIssues++;
    issues.push({
      sku: product.sku_code,
      slug: product.slug,
      category: product.category_slug,
      title: productTitle,
      h1,
      h1Len: h1.length,
      issues: skuIssues
    });
  }
}

console.log('='.repeat(80));
console.log('全局 zh-hk H1 审计报告');
console.log('='.repeat(80));
console.log(`总 SKU 数: ${products.length}`);
console.log(`✅ 通过: ${totalOK}`);
console.log(`❌ 有问题: ${totalIssues}`);
console.log('');

if (issues.length > 0) {
  console.log('问题详情:');
  console.log('-'.repeat(80));
  for (const item of issues) {
    console.log(`\n[${item.sku}] ${item.slug} (${item.category})`);
    console.log(`  Title: ${item.title}`);
    console.log(`  H1:    ${item.h1} (${item.h1Len}字)`);
    for (const issue of item.issues) {
      console.log(`  ${issue}`);
    }
  }
}

console.log('');
console.log('='.repeat(80));
console.log('审计完成');