/**
 * v18-cleanse.cjs — V18 自动生成块「留壳清值」清毒 (K3 2026-09-12 拍板 C 方案)
 *
 * 前提(已独立复核): seoTitle / seoDescription / aiSearchSummary / knowledgePanelData /
 *   relatedEntities / expertReview / authorBio 在 src/ 内**真消费者 = 0**(排除 .bak 后全为 0);
 *   PDP 的 title/description 走 getSkuSeo() -> sku-seo-data.csv(78 SKU), 不读这批 V18 字段
 *   => 死字段, 清值不丢任何已生效资产 (幂等已查, per 主脑 v3.0 §7)
 *
 * 手法 (与 §0.22 SOP-10 第 4 款 certNo 撤法同源): 字段 key + 类型定义**全部保留**, 只把值清空
 *   => 不触发 §0 F0「不删长文本字段」(字段在, 结构在, 值清空)
 *
 * 不清: faqSchema (无品牌名; 其 400g SKU 答 "350gsm" 的规格矛盾记入 ledger, 待接线时修)
 *
 * 用法: node .hermes/v18-cleanse.cjs            # 干跑(只报告将改哪些行)
 *       node .hermes/v18-cleanse.cjs --apply    # 实际写入
 */
const fs = require('fs');

const APPLY = process.argv.includes('--apply');
const FILE = 'src/data/products.ts';

// 保留 locale key 的字段 (值 -> "")
const LOCALE_KEYED = ['seoTitle', 'seoDescription', 'aiSearchSummary'];
// 固定模板字段
const TEMPLATES = {
  metaTitle: '""',
  knowledgePanelData: '{"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []}',
  relatedEntities: '{"sameAs": [], "mentions": []}',
  expertReview: '{"reviewer": "", "credentials": "", "review": ""}',
  authorBio: '{"name": "", "role": "", "bio": ""}',
};
const ALL = [...LOCALE_KEYED, ...Object.keys(TEMPLATES)];

const src = fs.readFileSync(FILE, 'utf8');
const lines = src.split('\n');
const counts = {};
const changed = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // 跳过类型定义/可选属性声明 (field?: ...) 与注释行
  if (/\?\s*:/.test(line) || /^\s*(\/\/|\*|\/\*)/.test(line)) continue;
  const m = line.match(/^(\s*)([A-Za-z_$][\w$]*)\s*:\s*(.+?),?\s*$/);
  if (!m) continue;
  const [, indent, field, value] = m;
  if (!ALL.includes(field)) continue;

  let newValue;
  if (LOCALE_KEYED.includes(field)) {
    if (!value.trim().startsWith('{')) continue;
    const keys = [...value.matchAll(/"([^"]+)"\s*:/g)].map((x) => x[1]);
    if (!keys.length) continue;
    newValue = '{' + keys.map((k) => `"${k}": ""`).join(', ') + '}';
  } else {
    newValue = TEMPLATES[field];
  }
  counts[field] = (counts[field] || 0) + 1;
  changed.push(i + 1);
  if (APPLY) lines[i] = `${indent}${field}: ${newValue},`;
}

// 块头注释盖戳
if (APPLY) {
  let stamped = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('=== V18 Schema 升级: SEO + GEO')) {
      lines[i] = lines[i].replace(
        /V18 Schema 升级: SEO \+ GEO[^=]*===/,
        'V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ==='
      );
      stamped++;
    }
  }
  console.log(`块头注释盖戳: ${stamped} 处`);
}

console.log(`=== v18-cleanse (${APPLY ? 'APPLY' : 'DRY-RUN'}) ===`);
console.log(`目标文件: ${FILE}`);
for (const f of ALL) console.log(`  ${f.padEnd(20)} ${counts[f] || 0} 行`);
console.log(`合计待改: ${changed.length} 行`);

if (APPLY) {
  // 抽样断言: 替换后不得再有品牌名 / 假评审人 / 编造数字指纹
  const out = lines.join('\n');
  const bad = [
    'Tiffany', 'Rosewood', 'Cartier', 'Crane & Co', 'Rifle Paper', 'Mohawk', 'Neenah',
    'Sappi', 'Stora Enso', 'Southworth', 'LUX Paper', 'Hallmark', 'Minted', 'Paper Source',
    'Daniel T.', 'Maya L.', 'Founded 2024', '50,000+', '2024-Q1',
  ].filter((t) => out.includes(t));
  if (bad.length) {
    console.log(`\n[FAIL] 清毒后仍残留: ${bad.join(', ')} -> 未写入`);
    process.exit(1);
  }
  fs.writeFileSync(FILE, out, 'utf8');
  console.log('\n[OK] 已写入 (残留品牌/编造指纹 = 0)');
}
process.exit(0);
