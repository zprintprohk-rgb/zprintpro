/**
 * 品类页行业场景链接验证 (2026-09-17, K3 报告「茶飲食品 → 樓盤書」错配)
 *
 * 用法: npx tsx scripts/verify-scenario-links.ts
 *
 * 背景:
 *   旧实现用 `coveredSlugs[Math.min(posInTier, len-1)]` 位置索引取 blog —— 用「Tier 内位置」
 *   去索引另一个独立排序的数组, 顺序一旦不一致就错配:
 *     packaging 映射表 = [0]化妝品盒 [1]跨境快遞盒 [2]樓盤書 [3]茶飲禮盒
 *     場景按 priority  = [0]beauty   [1]ecommerce   [2]茶飲   [3]real_estate
 *     → 茶飲(posInTier 2) 取到「樓盤書」: 客戶想印茶飲禮盒, 讀到豪宅樓書指南。
 *   且 tier B 场景完全无链接 (`covered = tier === 'A'`) → 19 个场景点了没反应。
 *
 * 本脚本断言 (可重跑, 防回归):
 *   A. 每个登记场景的 href 非空且格式合法
 *   B. href 目标真实存在 (blog slug ∈ blog-posts.ts / SKU slug ∈ products.ts / 品类页恒存在)
 *   C. ★ 回归用例: packaging.tea_beverage 必须指向茶飲, 不得再指向樓盤書
 *   D. ★ 反模式: 同一品类内不得有多个不同场景指向同一目标
 *      (位置索引错配的典型特征 —— 旧实现里 stickers 的 3 个场景都指向藥品標籤)
 *   E. 每个品类至少有一条可下单路径 (blog 或 SKU), 不得全部落到品类页兜底
 */

import * as fs from 'fs';
import * as path from 'path';
import { SCENARIO_LINKS, resolveScenarioHref } from '../src/data/industry-scenario-links';

let pass = 0;
const failures: string[] = [];

function ok(cond: boolean, label: string): void {
  if (cond) pass++;
  else failures.push(label);
}

// ---------- 载入真实数据源 ----------
const root = path.join(__dirname, '..');
const blogPostsSrc = fs.readFileSync(path.join(root, 'src/data/blog-posts.ts'), 'utf-8');
const productsSrc = fs.readFileSync(path.join(root, 'src/data/products.ts'), 'utf-8');
const scenariosSrc = fs.readFileSync(
  path.join(root, 'src/components/category/CategoryIndustries.tsx'),
  'utf-8'
);

const blogSlugs = new Set(
  [...blogPostsSrc.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1])
);
const skuSlugs = new Set(
  [...productsSrc.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1])
);

/**
 * 从组件源码提取「品类 → 场景 key 列表」——保证测试覆盖真实场景, 而非我手抄的清单。
 * 场景形如: { key: 'tea_beverage', scenarios: {...}, priority: 2, tier: 'A' },
 */
const categoryKeys: Record<string, string[]> = {};
{
  const block = scenariosSrc.match(/const categoryIndustryScenarios[\s\S]*?\n\};/);
  if (block) {
    const body = block[0];
    const catRe = /^ {2}'?([a-z-]+)'?:\s*\[/gm;
    const cats: Array<{ name: string; idx: number }> = [];
    let cm: RegExpExecArray | null;
    while ((cm = catRe.exec(body)) !== null) cats.push({ name: cm[1], idx: cm.index });
    cats.forEach((cat, i) => {
      const end = i + 1 < cats.length ? cats[i + 1].idx : body.length;
      const seg = body.slice(cat.idx, end);
      categoryKeys[cat.name] = [...seg.matchAll(/key:\s*'([a-z_]+)'/g)].map((m) => m[1]);
    });
  }
}

console.log(`\n数据源: blog ${blogSlugs.size} 篇 / SKU ${skuSlugs.size} 个 / 品类 ${Object.keys(categoryKeys).length} 类\n`);

// ============================================================
console.log('=== A/B. 每个登记场景: href 非空 + 目标真实存在 ===');
// ============================================================
let checkedScenarios = 0;
for (const [cat, keys] of Object.entries(SCENARIO_LINKS)) {
  for (const key of Object.keys(keys)) {
    const link = keys[key];
    const href = resolveScenarioHref(cat, key, '/zh-hk');
    checkedScenarios++;

    ok(!!href && href.startsWith('/zh-hk/'), `${cat}.${key}: href 格式合法 (${href})`);

    if (link.blog) {
      ok(blogSlugs.has(link.blog), `${cat}.${key}: blog 目标存在 (${link.blog})`);
      ok(href === `/zh-hk/blog/${link.blog}/`, `${cat}.${key}: href 指向该 blog`);
    }
    if (link.sku) {
      ok(skuSlugs.has(link.sku), `${cat}.${key}: SKU 目标存在 (${link.sku})`);
      ok(href === `/zh-hk/product/${link.sku}/`, `${cat}.${key}: href 指向该 SKU`);
    }
    // 未登记 blog/sku 时必须是品类页兜底 (永不 404)
    if (!link.blog && !link.sku) {
      ok(href === `/zh-hk/category/${cat}/`, `${cat}.${key}: 无内容时降级到品类页 (${href})`);
    }
  }
}
console.log(`  已登记场景: ${checkedScenarios} 个`);

// ============================================================
console.log('\n=== C. ★ 回归用例: 茶飲食品不得再指向樓盤書 ===');
// ============================================================
{
  const tea = resolveScenarioHref('packaging', 'tea_beverage', '/zh-hk');
  ok(
    tea === '/zh-hk/blog/tea-beverage-gift-box-printing-guide/',
    `packaging.tea_beverage → 茶飲禮盒指南 (实际 ${tea})`
  );
  ok(!/real-estate/.test(tea), 'packaging.tea_beverage 不再指向 real-estate (樓盤書)');

  // 楼盘场景应指向楼盘书 (而非被茶飲占用)
  const re = resolveScenarioHref('packaging', 'real_estate', '/zh-hk');
  ok(
    re === '/zh-hk/blog/real-estate-brochure-box-printing-guide/',
    `packaging.real_estate → 樓書指南 (实际 ${re})`
  );

  // 其他已知错配点
  const pairs: Array<[string, string, string]> = [
    ['paper-bags', 'wedding', 'wedding-favor-bag-printing-guide'],
    ['stickers', 'ecommerce', 'product-label-printing-guide'],
    ['stickers', 'pharma', 'pharmaceutical-label-printing-guide'],
  ];
  for (const [cat, key, expectBlog] of pairs) {
    const h = resolveScenarioHref(cat, key, '/zh-hk');
    ok(h.includes(expectBlog), `${cat}.${key} → ${expectBlog} (实际 ${h})`);
  }
}

// ============================================================
console.log('\n=== D. ★ 反模式: 同品类内不同场景不得指向同一目标 ===');
// ============================================================
{
  let dupFound = 0;
  for (const [cat, keys] of Object.entries(SCENARIO_LINKS)) {
    const seen = new Map<string, string>();
    for (const key of Object.keys(keys)) {
      const link = keys[key];
      // 只比较"有明确内容目标"的场景 (品类页兜底可重复)
      const target = link.blog ? `blog:${link.blog}` : link.sku ? `sku:${link.sku}` : null;
      if (!target) continue;
      if (seen.has(target)) {
        dupFound++;
        failures.push(`${cat}: "${seen.get(target)}" 与 "${key}" 都指向 ${target} (疑似位置索引错配)`);
      } else {
        seen.set(target, key);
      }
    }
  }
  ok(dupFound === 0, `同品类目标唯一性 (${dupFound} 处重复)`);
}

// ============================================================
console.log('\n=== E. 每品类至少一条可下单/可读路径 ===');
// ============================================================
{
  for (const [cat, keys] of Object.entries(SCENARIO_LINKS)) {
    const withContent = Object.values(keys).filter((l) => l.blog || l.sku).length;
    ok(withContent > 0, `${cat}: 有 ${withContent} 个场景指向真实内容/SKU`);
  }
}

// ============================================================
console.log('\n=== F. 场景覆盖: SCENARIO_LINKS 应覆盖组件里的全部场景 ===');
// ============================================================
{
  let uncovered: string[] = [];
  for (const [cat, keys] of Object.entries(categoryKeys)) {
    const mapped = SCENARIO_LINKS[cat] || {};
    for (const k of keys) {
      if (!(k in mapped)) uncovered.push(`${cat}.${k}`);
    }
  }
  // 未登记不算错 (会降级到品类页), 但列出以便补齐
  console.log(`  未登记场景 (将降级到品类页): ${uncovered.length ? uncovered.join(', ') : '无 ✅'}`);
  ok(true, '覆盖性检查完成');
}

// ---------- 汇总 ----------
console.log(`\n${'='.repeat(60)}`);
console.log(`结果: ✅ ${pass} pass | ❌ ${failures.length} fail`);
if (failures.length) {
  failures.forEach((f) => console.log(`  ❌ ${f}`));
  console.log('\nVERDICT: FAIL —— 场景链接存在错配/断链, 修好再提交');
  process.exit(1);
}
console.log('VERDICT: PASS —— 场景链接语义正确、目标存在、无位置索引错配');
process.exit(0);
