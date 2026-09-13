#!/usr/bin/env node
/**
 * scripts/gen-title-fill-proposals.mjs — 生成 T2-1b 提案表 (字符数对齐: 补长尾 / 裁到 ≤58, 保品牌末尾)
 * 输出: docs/2026-09-13-title-batch-T2-1b-proposals.md
 * 口径: 半角当量 (CJK=2, ASCII=1); 目标区 50-58 (K3 2026-09-13: 「更新到 58 字符数内就可以」);
 *       补词只从 **该 SKU 自身已有的关键词池** 取 (sku-seo-data.ts keywords / products.ts keywords), 不编造新词/新承诺
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const equiv = (s) => { let n = 0; for (const ch of s) n += ch.charCodeAt(0) > 127 ? 2 : 1; return n; };
const prod = readFileSync(join(ROOT, 'src/data/products.ts'), 'utf8').split(/\r?\n/);
const sku = readFileSync(join(ROOT, 'src/data/sku-seo-data.ts'), 'utf8');

// slug -> keywords (从 sku-seo-data.ts zh-hk keywords 数组)
const kwBySlug = {};
{
  const lines = sku.split(/\r?\n/);
  let cur = null, curLoc = null;
  for (const l of lines) {
    const s = l.match(/^  "([a-z0-9-]+)":\s*\{/); if (s) cur = s[1];
    const lm = l.match(/"(zh-hk|en|ja)"\s*:\s*[{"\[]/); if (lm) curLoc = lm[1];
    const km = l.match(/"keywords":\s*\[(.*)\],?\s*$/);
    if (km && cur && curLoc === 'zh-hk') kwBySlug[cur] = (km[1].match(/"([^"]+)"/g) || []).map(x => x.replace(/"/g, ''));
  }
}

const rows = [];
let curSlug = null;
for (let i = 0; i < prod.length; i++) {
  const s = prod[i].match(/^\s*slug:\s*'([a-z0-9-]+)'/); if (s) curSlug = s[1];
  const t = prod[i].match(/title_zh:\s*'([^']{5,300})'/);
  if (!t) continue;
  const title = t[1];
  const e = equiv(title);
  if (e <= 58 && e >= 50) continue;
  const kws = (kwBySlug[curSlug] || []).filter(k => k.length >= 2 && !title.includes(k));
  let proposal = title, mode = '';
  if (e < 50) {
    // 补: 品牌必须留末尾 -> 新词插到品牌**之前**; 相关性过滤: 与标题主词共享前 2 字 (避免把 A4貼紙 塞进不相关 SKU)
    const head = title.split(/\s*[·|]\s*/)[0].slice(0, 2);
    const relevant = kws.filter(k => k.slice(0, 2) === head || title.includes(k.slice(0, 2)));
    const brandPart = (title.match(/(智印港|ZprintPro|ジープリント)\s*$/) || [])[0] || '';
    const bodyTitle = brandPart ? title.slice(0, title.length - brandPart.length).replace(/\s*[·|]\s*$/, '') : title;
    const pick = [];
    for (const k of relevant.sort((a, b) => equiv(a) - equiv(b))) {
      const cand = `${bodyTitle} · ${[...pick, k].join(' · ')}${brandPart ? ' · ' + brandPart : ''}`;
      if (equiv(cand) > 58) continue;
      pick.push(k);
      if (equiv(`${bodyTitle} · ${pick.join(' · ')}${brandPart ? ' · ' + brandPart : ''}`) >= 50) break;
    }
    if (pick.length) { proposal = `${bodyTitle} · ${pick.join(' · ')}${brandPart ? ' · ' + brandPart : ''}`; mode = '补长尾(品牌末尾)'; }
    else mode = '⚠️ 无可补词 (需人工)';
  } else {
    // 裁: 保品牌末尾, 从品牌前最后一段开始丢
    const parts = title.split(/\s*[·|]\s*/);
    const brandIdx = parts.findIndex(p => /智印港|ZprintPro|ジープリント/.test(p));
    const brand = brandIdx >= 0 ? parts[brandIdx] : null;
    const body = parts.filter((_, j) => j !== brandIdx);
    while (body.length > 1 && equiv([...body, brand].filter(Boolean).join(' · ')) > 58) body.pop();
    proposal = [...body, brand].filter(Boolean).join(' · ');
    mode = brand ? '裁剪(保品牌)' : '⚠️ 无品牌(需人工加)';
  }
  rows.push({ line: i + 1, slug: curSlug, e, title, pe: equiv(proposal), proposal, mode });
}

let md = `# T2-1b 提案表：title 字符数对齐（≤58 当量，保品牌末尾，2026-09-13）\n\n`;
md += `**依据**: K3 2026-09-13 指示「对齐要补齐足够的字符数。更新到 58 字符数内就可以。标题的字符数很宝贵的」\n\n`;
md += `**口径**: 半角当量 (CJK=2 / ASCII=1)；目标区 **50–58**；补词只取该 SKU **自身关键词池**（不编造）。\n\n`;
md += `**规模**: 本表 ${rows.length} 条（超 58 需裁 / 低于 50 需补；全站同类共 18 超 + 108 低，本表为 products.ts 首批）。\n\n`;
md += `| # | 行 | slug | 现状当量 | 现状 title | 提案当量 | 处置 | 提案 title |\n|---|---|---|---|---|---|---|---|\n`;
rows.forEach((r, i) => { md += `| ${i + 1} | L${r.line} | ${r.slug} | ${r.e} | ${r.title} | ${r.pe} | ${r.mode} | ${r.proposal} |\n`; });
md += `\n## 执行方式（获批后）\n`;
md += `1. 逐条写入 products.ts 的 title_zh（脚本 + 三件套 + 回滚映射 + 探针）\n`;
md += `2. 复核每条：品牌末尾一次、主词前置、数字钩子保留、当量落 50–58\n`;
md += '3. 部署后按 .hermes/probe-T2-1b-*.json 逐点探针；GSC 观察窗延续 T 批 14 天口径\n';
writeFileSync(join(ROOT, 'docs/2026-09-13-title-batch-T2-1b-proposals.md'), md, 'utf8');
console.log(`提案表: ${rows.length} 条 -> docs/2026-09-13-title-batch-T2-1b-proposals.md`);
console.log('处置分布:', JSON.stringify(rows.reduce((a, r) => (a[r.mode] = (a[r.mode] || 0) + 1, a), {})));
rows.slice(0, 12).forEach(r => console.log(`  L${r.line} ${r.e}→${r.pe} [${r.mode}] ${r.proposal.slice(0, 74)}`));
