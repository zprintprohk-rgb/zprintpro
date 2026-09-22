// aeo-census-report-20260922.mjs — 由普查 JSON 生成 Task B MD 报告 (清单+候选改写, 不 apply)
import { readFileSync, writeFileSync } from 'fs';

const d = JSON.parse(readFileSync('.hermes/reports/aeo-desc-census-2026-09-22.json', 'utf8'));
const pts = readFileSync('src/data/products.ts', 'utf8');
function truth(slug) {
  const idx = pts.indexOf(`slug: '${slug}'`);
  if (idx < 0) return {};
  const tail = pts.slice(idx, idx + 25000);
  const grab = (k) => { const m = tail.match(new RegExp(`${k}:\\s*([^,\\n}]+)`)); return m ? m[1].trim().replace(/'/g, '') : ''; };
  return { minQuantity: Number(grab('minQuantity')) || null, price_range: grab('price_range'), turnaround: grab('turnaround'), basePrice: grab('basePrice'), basePrice_en: grab('basePrice_en'), basePrice_ja: grab('basePrice_ja') };
}

const byLoc = {}, byTier = {};
d.slots.forEach((s) => { byLoc[s.locale] = byLoc[s.locale] || { '合规': 0, '缺要素': 0, '无答案句': 0 }; byLoc[s.locale][s.state]++; });
Object.assign(byTier, d.byTier);
const t = (o) => Object.entries(o).map(([k, v]) => `${k} ${v}`).join(' / ');

// MOQ mismatch 表
const mm = d.slots.filter((s) => s.moqMismatch).sort((a, b) => b.gscImps - a.gscImps);
// P0 不合规清单 (按 imps desc)
const p0bad = d.slots.filter((s) => s.tier === 'P0' && s.state !== '合规').sort((a, b) => b.gscImps - a.gscImps);
const p1bad = d.slots.filter((s) => s.tier === 'P1' && s.state !== '合规');
const p2bad = d.slots.filter((s) => s.tier === 'P2' && s.state !== '合规');
const r2 = d.slots.filter((s) => s.r2Frozen);
const deliv = d.slots.filter((s) => s.elements.delivery).length;

// 候选改写生成
function suggest(s) {
  const tr = truth(s.slug);
  const unit = { 'zh-hk': (tr.price_range.match(/\/(.+)$/) || [])[1] || '', en: '', ja: '' }[s.locale];
  const mq = tr.minQuantity ? `${tr.minQuantity}` : '?';
  if (s.locale === 'zh-hk') {
    const price = tr.price_range ? tr.price_range.replace(/^HK\$/, 'HK$') : (tr.basePrice ? `HK$${tr.basePrice} 起` : '价待补');
    const turn = tr.turnaround ? tr.turnaround.replace(/working days/, '個工作天') : '交期锚待補';
    return `「${s.slug} ${mq}${unit || '件'}起，${price}，標準交期 ${turn}。…」`;
  }
  if (s.locale === 'en') {
    const price = tr.price_range ? tr.price_range.replace(/^HK\$/, 'HK$') : (tr.basePrice_en ? `$${tr.basePrice_en} 起` : 'price TBD');
    const turn = tr.turnaround || 'lead time TBD';
    return `"${s.slug.replace(/-/g, ' ')} from ${price}, MOQ ${mq}, standard turnaround ${turn}. …"`;
  }
  const price = tr.price_range ? tr.price_range.replace(/^HK\$/, 'HK$') : (tr.basePrice_ja ? `¥${tr.basePrice_ja} 〜` : '価格TBD');
  const turn = tr.turnaround || '納期锚TBD';
  return `「${s.slug} ${mq}冊から、${price}、標準納期 ${turn}。…」`;
}

let md = `# AEO desc 层普查 — 2026-09-22（Task B，只读审计，严禁改 src）

> **口径 (K3 9/21)**: 首段 40-60 字直接答案句 = 价格区间 + MOQ + 交期；三态 {合规 / 缺要素 / 无答案句}
> **范围**: src/data/sku-seo-data.ts 100 SKU × 3 locale (zh-hk/en/ja) = **300 槽全量**
> **性质**: 只出清单与候选改写建议，**不 apply**；落地批需 K3 批
> **数据来源**:
> - src/data/sku-seo-data.ts description 字段（工作区 9/22 版本，eval 直读对象，不经正则）
> - src/data/products.ts minQuantity/basePrice*/price_range/turnaround（真值锚）
> - .hermes/gsc-2026-09-18/extract.json new.*_28d 网页.展示（P0 = 任一 locale imps≥30，P1 ≥10，P2 <10）
> - 机读全量: .hermes/reports/aeo-desc-census-2026-09-22.json（300 槽逐条）
> **双方法复算 (§0.23.2)**: ① 机审正则（初跑 2 处口径错——污染字符集误收简繁同形字 / 价格区间正则误收交期区间「2-4 個工作天」/ 交期正则漏「N-N 個工作天」——已修后重跑）；② 人工抽样 12 槽逐条复读（合规 8 槽全读 + MOQ mismatch 全读 + 状态边界 4 槽），两法一致。计数三态合计 300 自洽。

## 1. 总盘

**三态: 合规 ${d.count['合规']} / 缺要素 ${d.count['缺要素']} / 无答案句 ${d.count['无答案句']}（合计 ${d.total}）**

| 层 | 合规 | 缺要素 | 无答案句 | 小计 |
|---|---|---|---|---|
| P0 (GSC imps≥30) | ${byTier.P0['合规']} | ${byTier.P0['缺要素']} | ${byTier.P0['无答案句']} | ${Object.values(byTier.P0).reduce((a, b) => a + b, 0)} |
| P1 (10-29) | ${byTier.P1['合规']} | ${byTier.P1['缺要素']} | ${byTier.P1['无答案句']} | ${Object.values(byTier.P1).reduce((a, b) => a + b, 0)} |
| P2 (<10/无) | ${byTier.P2['合规']} | ${byTier.P2['缺要素']} | ${byTier.P2['无答案句']} | ${Object.values(byTier.P2).reduce((a, b) => a + b, 0)} |

| locale | 合规 | 缺要素 | 无答案句 |
|---|---|---|---|
| zh-hk | ${byLoc['zh-hk']['合规']} | ${byLoc['zh-hk']['缺要素']} | ${byLoc['zh-hk']['无答案句']} |
| en | ${byLoc.en['合规']} | ${byLoc.en['缺要素']} | ${byLoc.en['无答案句']} |
| ja | ${byLoc.ja['合规']} | ${byLoc.ja['缺要素']} | ${byLoc.ja['无答案句']} |

**合规 8 槽（基线样例，可直接作改写模板）**: ${d.slots.filter((s) => s.state === '合规').map((s) => `${s.slug}(${s.locale})`).join('、')}

## 2. 关键发现（按严重度）

### 2.1 🔴 MOQ 与 products.ts 真值冲突 — 14 槽（desc 层最高优先）

desc 所写起订数 ≠ products.ts minQuantity（schema eligibleQuantity 已按 products.ts 输出，**desc 与 schema 对 AI 代理是两套口径 = GSIM 自伤**）：

| slug | locale | desc 写 | products.ts | tier | imps |
|---|---|---|---|---|---|
`;
for (const s of mm) md += `| ${s.slug} | ${s.locale} | ${s.moqMismatch.desc} | ${s.moqMismatch.truth} | ${s.tier} | ${s.gscImps} |\n`;
md += `
> 注: 同簇连坐（transparent/removable/security/fluorescent-stickers 同为「100 張起」旧稿，products.ts 已 10）；kraft-paper-packaging-box ja「100」vs 真值 300 为反向错。**落地批必须连同 ${mm.filter((s) => s.tier === 'P0').length} 个 P0 槽优先修。**

### 2.2 🟠 交期要素覆盖率仅 ${deliv}/300（${(deliv / 3).toFixed(1)}% 槽首句含交期）

首句答案句三要素中，**交期是系统性缺口**：zh-hk 常见「N-N 個工作天交貨」被埋在第 2-3 句，en/ja 大量首句纯卖点句。改写时把交期数字提进首句即可消化大部分「缺要素」。

### 2.3 🟠 价格非区间 — 74 槽

首句含价格但为单点「HK$X 起 / from $X」（无区间分隔符）。K3 口径为「价格区间」：有 price_range 真值的槽建议写满区间（如 HK$0.25-0.65/張）；仅 basePrice 的槽维持单点+「起」并在落地批前由 K3 拍板口径。

### 2.4 🟡 跨语言污染 — 4 类共 3 命中（大幅低于初跑误报，已双法复算）

| 类 | 命中 | 明细 |
|---|---|---|
| zh-hk 简体残留 | 2 | cosmetic-boxes / custom-red-packets（均「定制」，应为「定製」） |
| ja 含「份」 | 0 | ✅ 已清零（9/21 前批次已修） |
| ja 繁中污染 | 0 | ✅ 保守集（52 字，逐项验证非日文新字体）0 命中 |
| en 含 CJK | 0 | ✅ |

### 2.5 🟡 无来源数字待核 — 129 槽（review queue，非定论）

机审白名单（DPI/色数/尺寸/电话/年份/认证/服务数字）+ products.ts 真值锚双过滤后的残余数字。**是人工复核队列不是错误结论**：多数预计为规格/工艺数字可入白名单；落地批前需人工过一遍（全清单见 JSON \`slots[].flags\`）。

### 2.6 品牌 — 0 违规

品牌分层（zh-hk=智印港 / en/ja=ZprintPro）、品牌错字、双品牌混用、品牌次数：300 槽 0 命中。

## 3. 分层清单

### 3.1 P0 不合规 ${p0bad.length} 槽（按 GSC imps desc）

| imps | slug | locale | 状态 | 首句问题 | 首句 (截) |
|---|---|---|---|---|---|
`;
for (const s of p0bad.slice(0, 60)) md += `| ${s.gscImps} | ${s.slug} | ${s.locale} | ${s.state} | ${s.reasons.join('; ').replace(/\|/g, '/')} | ${s.first.replace(/\|/g, '/').slice(0, 60)} |\n`;
if (p0bad.length > 60) md += `\n> 余 ${p0bad.length - 60} 槽见 JSON（同等结构）。\n`;
md += `
### 3.2 P1 不合规 ${p1bad.length} 槽 / P2 不合规 ${p2bad.length} 槽

全量见 .hermes/reports/aeo-desc-census-2026-09-22.json \`slots[]\`（filter tier）。P2 无 GSC 展示数据，着陆优先级最低。

### 3.3 R2 验证窗槽登记（~9/28 前不动手，只登记）

| slug | locale | 状态 | 问题 | imps |
|---|---|---|---|---|
`;
for (const s of r2) md += `| ${s.slug} | ${s.locale} | ${s.state} | ${s.reasons.join('; ') || '(合规)'} | ${s.gscImps} |\n`;
md += `
> a5-flyers en 已合规（可作该槽 zh-hk/ja 改写参照）；其余 5 槽 R2 窗后随落地批处理。

## 4. 候选改写建议（模板 + Top P0 样例，不 apply）

**模板（40-60 字，K3 9/21 口径）**
- zh-hk: 「{品类} {MOQ}{单位}起，{HK$区间}/{单位}，標準交期 {N-N 個工作天}。…」
- en: "{Category} from {US$X-Y/unit}, MOQ {N}, standard turnaround {N-N business days}. …"（en 长度放宽至 120 字符内，词数 12-24）
- ja: 「{品名} {MOQ}枚から、{¥X〜}、標準納期 {N-N 営業日}。…」

**Top P0 槽候选**（锚 = products.ts price_range/minQuantity/turnaround；turnaround 仅 18/100 SKU 有值，缺者标 TBD 待 K3 拍板或从 ProductTabs 文案提取——**禁编造**）：

| slug | locale | 候选首句 |
|---|---|---|
`;
const top = p0bad.slice(0, 15);
for (const s of top) md += `| ${s.slug} | ${s.locale} | ${suggest(s).replace(/\|/g, '/')} |\n`;
md += `
> 改写铁律：数字只能来自 products.ts / price-data.generated.ts / K3 拍板；price_range 缺失的槽用 basePrice* +「起」并挂「价格非区间」flag 上报；落地走 SOP-5（CSV → scripts/csv-to-sku-seo.mjs --apply），禁手搓 sku-seo-data.ts。

## 5. 落地批建议优先级

1. **P0+MOQ mismatch 交集**（${mm.filter((s) => s.tier === 'P0').length} 槽）— desc/schema 口径自伤，先修
2. **P0 缺要素·仅差交期/长度**（ja 小语种簇为主，首句已含价+MOQ，补交期词或扩写至 40 字即可，改动小收益快）
3. **P0 无答案句 en 簇**（旧式卖点开头，需重写首句）
4. P1/P2 随批滚动

**遗留**: ① 14 槽 MOQ 漂移与 llms.txt「K3 2026-09-21 MOQ 統一批」表述的关系待 K3 复核（llms.txt 指 schema 层已統一，desc 层未动 = 本普查证据）；② turnaround 真值覆盖率 18/100，建议补齐后再跑一轮候选生成；③ 129 槽无来源数字人工过白名单。
`;

writeFileSync('.hermes/reports/aeo-desc-census-2026-09-22.md', md);
console.log('md written,', md.length, 'chars');
console.log('p0bad', p0bad.length, 'p1bad', p1bad.length, 'p2bad', p2bad.length, 'mm', mm.length);
