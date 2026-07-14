/**
 * P1 全局 SEO 元数据审计 (zh-hk 优先)
 * 范围: Title / Meta Description / Image Alt
 * 检查项:
 *   Title:    重复词 (如 "防水貼紙 · 防水貼紙") | 简体残留 | NAP 污染 (深圳/Shenzhen/中国) | 长度 50-60
 *   Meta:     长度 150-160 | CTA 缺失 (報價/查詢/聯絡/WhatsApp) | 关键词堆砌 (>5x 同词)
 *   ALT:      FAQ 残留 (问号/多少/什么) | 超长 >120 字符 | NAP 污染 | 缺失
 *
 * 严重问题定义: 任何字段 1+ error 算严重
 * 输出: docs/audit-zhhk-seo-2026-07-14.md
 */
import { products, categories } from '../src/data/products.ts';
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { getProductBySlug } from '../src/data/products.ts';

type Locale = 'zh-hk' | 'en' | 'ja';
type CheckSeverity = 'error' | 'warn' | 'info';

interface FieldIssue {
  field: 'title' | 'meta' | 'alt';
  severity: CheckSeverity;
  msg: string;
}

interface SkuAudit {
  sku: string;
  slug: string;
  category: string;
  traffic: 'high' | 'mid' | 'low';  // heuristic
  title?: string;
  meta?: string;
  alt?: string;
  hasSkuSeo: boolean;
  issues: FieldIssue[];
}

// 简体字检测 - 2026-07-14 user 拍板: 整段去掉
// 原因: 误报多 (面/制/个/与 简繁体同体), `scripts/scan-simplified.mjs` (Cline v7 写的) 是 SSoT
// 真正防线在输出层: `traditionalizeZh()` 在 h1-builder.ts v7 硬保证 zh-hk 100% 繁体输出 (§13.16.1)
// 源数据即使混入简体字, 到页面也是繁体。
// 本 audit 职责分离: 只检 重复/NAP/长度/FAQ/超长/CTA/堆砌, 简体字交给 scan-simplified.mjs
const SIMPLIFIED_CHARS = new Set(); // 故意空集 (职责分离)

// 禁区词 (NAP 污染 §13.10)
const FORBIDDEN_NAP = ['深圳', 'Shenzhen', '深セン', '智印港', '智印印港'];

// FAQ 触发词 (zh-hk)
const FAQ_TRIGGERS_ZHHK = ['多少', '什么', '哪裡', '哪些', '如何', '怎么', '可以嗎', '嗎', '呢', '這款', '這是', '能否'];

// CTA 触发词
const CTA_TRIGGERS_ZHHK = ['報價', '查詢', '聯絡', 'WhatsApp', '聯繫', '即時', '免費', '點擊', '獲取', '下單'];

// 流量分类启发式 (按 SKU 类型)
function classifyTraffic(p: any): 'high' | 'mid' | 'low' {
  // P0 类目 (高流量)
  const p0Cats = ['stickers', 'flyers', 'packaging', 'paper-bags'];
  if (p0Cats.includes(p.category_slug)) return 'high';
  // P1 类目
  const p1Cats = ['posters', 'books', 'educational', 'menus', 'red-packets', 'calendars'];
  if (p1Cats.includes(p.category_slug)) return 'mid';
  return 'low';
}

function hasSimplified(s: string): string[] {
  const found: string[] = [];
  for (const c of s) {
    if (SIMPLIFIED_CHARS.has(c)) found.push(c);
  }
  return found;
}

function hasNAP(s: string): string[] {
  return FORBIDDEN_NAP.filter(w => s.includes(w));
}

function checkTitle(title: string): FieldIssue[] {
  const issues: FieldIssue[] = [];

  // 1. 重复词
  const parts = title.split(/[|·・]/).map(p => p.trim());
  const seen = new Map<string, number>();
  for (const p of parts) {
    if (p.length >= 2) seen.set(p, (seen.get(p) || 0) + 1);
  }
  for (const [p, count] of seen) {
    if (count >= 2) issues.push({ field: 'title', severity: 'error', msg: `重复词: "${p}" 出现 ${count} 次` });
  }

  // 2. 简体残留
  const simp = hasSimplified(title);
  if (simp.length > 0) {
    issues.push({ field: 'title', severity: 'error', msg: `简体字残留: ${simp.join(',')} (违反 §13.16.1 繁体字最高原则)` });
  }

  // 3. NAP 污染
  const nap = hasNAP(title);
  if (nap.length > 0) {
    issues.push({ field: 'title', severity: 'error', msg: `NAP 污染 (§13.10): ${nap.join(',')}` });
  }

  // 4. 长度
  if (title.length < 20) {
    issues.push({ field: 'title', severity: 'warn', msg: `Title 过短 (${title.length} 字符, <20)` });
  } else if (title.length > 65) {
    issues.push({ field: 'title', severity: 'warn', msg: `Title 超长 (${title.length} 字符, >65 Google SERP 截断)` });
  }

  return issues;
}

function checkMeta(meta: string): FieldIssue[] {
  const issues: FieldIssue[] = [];

  // 1. 简体残留
  const simp = hasSimplified(meta);
  if (simp.length > 0) {
    issues.push({ field: 'meta', severity: 'error', msg: `简体残留: ${simp.join(',')}` });
  }

  // 2. NAP 污染
  const nap = hasNAP(meta);
  if (nap.length > 0) {
    issues.push({ field: 'meta', severity: 'error', msg: `NAP 污染 (§13.10): ${nap.join(',')}` });
  }

  // 3. 长度
  const len = meta.length;
  if (len < 80) {
    issues.push({ field: 'meta', severity: 'warn', msg: `Meta 过短 (${len} 字符, <80)` });
  } else if (len > 160) {
    issues.push({ field: 'meta', severity: 'warn', msg: `Meta 超长 (${len} 字符, >160 Google SERP 截断)` });
  } else if (len < 120) {
    issues.push({ field: 'meta', severity: 'info', msg: `Meta 偏短 (${len} 字符, 建议 120-160)` });
  }

  // 4. CTA 缺失
  const hasCTA = CTA_TRIGGERS_ZHHK.some(t => meta.includes(t));
  if (!hasCTA) {
    issues.push({ field: 'meta', severity: 'warn', msg: `CTA 缺失 (无 ${CTA_TRIGGERS_ZHHK.slice(0, 4).join('/')} 等关键词)` });
  }

  // 5. 关键词堆砌 (取前 30 字符的高频词)
  const tokens = meta.replace(/[，。！？、；：""''（）《》\.\,\!\?\;\:\"""''\(\)\<\>]/g, ' ').split(/\s+/).filter(t => t.length >= 2);
  const freq = new Map<string, number>();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  for (const [t, c] of top) {
    if (c >= 5) {
      issues.push({ field: 'meta', severity: 'error', msg: `关键词堆砌: "${t}" 出现 ${c} 次 (≥5 触发降权风险)` });
    } else if (c >= 4) {
      issues.push({ field: 'meta', severity: 'warn', msg: `关键词疑似堆砌: "${t}" 出现 ${c} 次` });
    }
  }

  return issues;
}

function checkAlt(alt: string, hasAlt: boolean): FieldIssue[] {
  const issues: FieldIssue[] = [];

  if (!hasAlt || !alt || alt.trim().length === 0) {
    issues.push({ field: 'alt', severity: 'error', msg: 'ALT 缺失' });
    return issues;
  }

  // 1. FAQ 残留
  if (/[?？]/.test(alt)) {
    issues.push({ field: 'alt', severity: 'error', msg: `FAQ 残留 (含问号): "${alt.substring(0, 50)}..."` });
  }
  for (const t of FAQ_TRIGGERS_ZHHK) {
    if (alt.includes(t)) {
      issues.push({ field: 'alt', severity: 'error', msg: `FAQ 触发词: "${t}"` });
      break;
    }
  }

  // 2. 超长
  if (alt.length > 120) {
    issues.push({ field: 'alt', severity: 'error', msg: `超长 (${alt.length} 字符, >120)` });
  } else if (alt.length < 20) {
    issues.push({ field: 'alt', severity: 'warn', msg: `过短 (${alt.length} 字符, <20 缺乏描述)` });
  }

  // 3. NAP 污染
  const nap = hasNAP(alt);
  if (nap.length > 0) {
    issues.push({ field: 'alt', severity: 'error', msg: `NAP 污染 (§13.10): ${nap.join(',')}` });
  }

  // 4. 简体残留
  const simp = hasSimplified(alt);
  if (simp.length > 0) {
    issues.push({ field: 'alt', severity: 'error', msg: `简体残留: ${simp.join(',')}` });
  }

  return issues;
}

// === 主流程 ===
const audits: SkuAudit[] = [];
let totalOK = 0, totalWithIssues = 0;
let highTrafficIssues = 0;

for (const p of products) {
  const sku = p.sku_code;
  const slug = p.slug;
  const cat = p.category_slug;
  const traffic = classifyTraffic(p);

  const audit: SkuAudit = {
    sku, slug, category: cat, traffic,
    hasSkuSeo: !!skuSeoData[slug],
    issues: []
  };

  if (!skuSeoData[slug]) {
    audit.issues.push({ field: 'title', severity: 'warn', msg: '无 sku-seo-data 条目 (fallback 到 generateProductMetadata)' });
    audits.push(audit);
    continue;
  }

  const entry = skuSeoData[slug];
  const title = entry.seo['zh-hk']?.title;
  const meta = entry.seo['zh-hk']?.description;
  const alt = entry.imageAlt?.['zh-hk'];

  audit.title = title;
  audit.meta = meta;
  audit.alt = alt;

  if (title) audit.issues.push(...checkTitle(title));
  else audit.issues.push({ field: 'title', severity: 'error', msg: 'Title 缺失' });

  if (meta) audit.issues.push(...checkMeta(meta));
  else audit.issues.push({ field: 'meta', severity: 'error', msg: 'Meta 缺失' });

  audit.issues.push(...checkAlt(alt || '', !!alt));

  if (audit.issues.length === 0) {
    totalOK++;
  } else {
    totalWithIssues++;
    if (audit.issues.some(i => i.severity === 'error') && traffic === 'high') highTrafficIssues++;
  }

  audits.push(audit);
}

// === 输出报告 ===
console.log('='.repeat(80));
console.log('P1 全局 SEO 元数据审计报告 (zh-hk)');
console.log('='.repeat(80));
console.log(`总 SKU 数: ${products.length}`);
console.log(`已审计: ${audits.length} (跳过 ${audits.filter(a => !a.hasSkuSeo).length} 个无 sku-seo 条目)`);
console.log(`✅ 完全合规: ${totalOK}`);
console.log(`❌ 有问题: ${totalWithIssues}`);
console.log(`🔥 高流量 SKU 严重问题: ${highTrafficIssues}`);
console.log('');

const errorAudits = audits.filter(a => a.issues.some(i => i.severity === 'error'));
const warnAudits = audits.filter(a => a.issues.every(i => i.severity !== 'error') && a.issues.length > 0);

if (errorAudits.length > 0) {
  console.log('--- ERROR 级 (严重) ---');
  for (const a of errorAudits) {
    console.log(`\n[${a.sku}] ${a.slug} (${a.category}) [${a.traffic}]${a.hasSkuSeo ? '' : ' ⚠️ 无 sku-seo'}`);
    if (a.title) console.log(`  Title: ${a.title.substring(0, 80)}${a.title.length > 80 ? '...' : ''}`);
    for (const i of a.issues.filter(x => x.severity === 'error')) {
      console.log(`  🔴 [${i.field}] ${i.msg}`);
    }
  }
  console.log('');
}

if (warnAudits.length > 0) {
  console.log('--- WARN 级 (警告) ---');
  for (const a of warnAudits) {
    console.log(`\n[${a.sku}] ${a.slug} (${a.category}) [${a.traffic}]`);
    for (const i of a.issues) {
      console.log(`  ⚠️ [${i.field}] ${i.msg}`);
    }
  }
  console.log('');
}

console.log('--- 决策建议 ---');
if (highTrafficIssues > 5) {
  console.log(`🔥 高流量 SKU 严重问题 ${highTrafficIssues} 个 > 5, 优先修复 Top 5 再跑 P2`);
} else if (totalWithIssues > 5) {
  console.log(`✅ 总问题 ${totalWithIssues} 个 ≤ 5 阈值, 可直接进 P2 (仅修补标记问题)`);
} else {
  console.log(`✅ 全部基本合规, 可进 P2 微调`);
}

// === 写报告到 docs/ ===
const reportLines: string[] = [];
reportLines.push('# P1 全局 SEO 元数据审计报告 (zh-hk)');
reportLines.push('');
reportLines.push('**日期**: 2026-07-14');
reportLines.push('**范围**: 79 SKU × zh-hk (Title + Meta Description + Image Alt)');
reportLines.push('**遵循**: AGENTS.md §11 (主营) / §13.10 (NAP 脱钩) / §13.16.1 (繁体字)');
reportLines.push('');
reportLines.push('## 📊 总览');
reportLines.push('');
reportLines.push(`| 指标 | 数值 |`);
reportLines.push(`|---|---|`);
reportLines.push(`| 总 SKU | ${products.length} |`);
reportLines.push(`| 已审计 | ${audits.length} |`);
reportLines.push(`| ✅ 完全合规 | ${totalOK} |`);
reportLines.push(`| ❌ 有问题 | ${totalWithIssues} |`);
reportLines.push(`| 🔥 高流量严重问题 | ${highTrafficIssues} |`);
reportLines.push(`| 无 sku-seo 条目 (fallback) | ${audits.filter(a => !a.hasSkuSeo).length} |`);
reportLines.push('');

reportLines.push('## 🔴 严重问题 (按 SKU)');
reportLines.push('');
if (errorAudits.length === 0) {
  reportLines.push('无 ERROR 级问题');
} else {
  reportLines.push('| SKU | Slug | 类别 | 流量 | 字段 | 问题 |');
  reportLines.push('|---|---|---|---|---|---|');
  for (const a of errorAudits) {
    const errs = a.issues.filter(i => i.severity === 'error');
    for (const i of errs) {
      const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/`/g, '\\`').substring(0, 80);
      reportLines.push(`| ${a.sku} | ${a.slug} | ${a.category} | ${a.traffic} | ${i.field} | ${esc(i.msg)} |`);
    }
  }
}
reportLines.push('');

reportLines.push('## ⚠️ 警告级 (按 SKU)');
reportLines.push('');
if (warnAudits.length === 0) {
  reportLines.push('无 WARN 级问题');
} else {
  reportLines.push('| SKU | Slug | 字段 | 问题 |');
  reportLines.push('|---|---|---|---|');
  for (const a of warnAudits) {
    for (const i of a.issues) {
      const esc = (s: string) => s.replace(/\|/g, '\\|').substring(0, 80);
      reportLines.push(`| ${a.sku} | ${a.slug} | ${i.field} | ${esc(i.msg)} |`);
    }
  }
}
reportLines.push('');

reportLines.push('## 🎯 决策');
reportLines.push('');
if (highTrafficIssues > 5) {
  reportLines.push(`🔥 **高流量严重问题 ${highTrafficIssues} 个 > 5 阈值**`);
  reportLines.push('');
  reportLines.push('**建议**: 先修 Top 5 高流量严重问题 SKU, 再跑 P2');
  reportLines.push('');
  reportLines.push('Top 5 高流量错误:');
  reportLines.push('');
  for (const a of errorAudits.filter(x => x.traffic === 'high').slice(0, 5)) {
    const errs = a.issues.filter(i => i.severity === 'error');
    for (const i of errs) {
      reportLines.push(`- [${a.sku}] ${a.slug} - ${i.field}: ${i.msg}`);
    }
  }
} else if (totalWithIssues > 5) {
  reportLines.push(`✅ 总问题 ${totalWithIssues} 个 ≤ 5 阈值, **可直接进 P2**`);
  reportLines.push('');
  reportLines.push('**P2 范围**:');
  reportLines.push(`- 修 ${errorAudits.length} 个 ERROR (Title 重复/简体/NAP, Meta CTA/堆砌, ALT FAQ/超长/NAP)`);
  reportLines.push(`- 修 ${warnAudits.length} 个 WARN (过短/缺失)`);
  reportLines.push(`- **不**触碰 Body (longDescription) — §11 风险 + 工程量爆炸`);
  reportLines.push(`- **不**触碰 en/ja — 等 zh-hk 稳定 7+ 天再推`);
} else {
  reportLines.push(`✅ 全部基本合规 (${totalWithIssues} 轻微问题), **可直接进 P2 微调**`);
}
reportLines.push('');

reportLines.push('## 🛡️ 风险规避');
reportLines.push('');
reportLines.push('- §11 主营: 不触碰 business cards / 名片');
reportLines.push('- §13.10 NAP 脱钩: en/ja 标题 100% 过滤 Shenzhen/China/中国');
reportLines.push('- §13.16.1 繁体字: zh-hk 输出 100% 繁体 (简体残留 = 严重问题)');
reportLines.push('- §13.15 美国市场: en 优先 Free Shipping / Free Design / No MOQ');
reportLines.push('- 算法级联: P2 zh-hk 完成 + GSC 监控 3-5 天稳定后, 才开 P3 en/ja');
reportLines.push('');

reportLines.push('## 📂 关联文件');
reportLines.push('');
reportLines.push('- `src/data/sku-seo-data.ts` — 79 SKU SEO 数据源');
reportLines.push('- `src/data/products.ts` — 产品真理源');
reportLines.push('- `src/app/[locale]/product/[slug]/page.tsx` — Title/Meta 渲染入口');
reportLines.push('- `src/data/products.ts:19313` — getProductTitle');
reportLines.push('- `src/data/products.ts:19355` — getProductImageAlt');
reportLines.push('');

// 末尾：写报告 (顶层 await 在 CJS 下不支持,包成 async IIFE)
import { writeFileSync } from 'node:fs';
writeFileSync('docs/audit-zhhk-seo-2026-07-14.md', reportLines.join('\n'), 'utf8');
console.log('\n报告已写入: docs/audit-zhhk-seo-2026-07-14.md');
