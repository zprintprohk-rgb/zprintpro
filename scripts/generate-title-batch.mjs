/**
 * generate-title-batch.mjs — 阶段三: 标题候选生成 (K3 2026-09-19 两天冲刺方案)
 *
 * 输入 (均须已产出):
 *   .hermes/reports/title-input-bank-2026-09-19.json      (数字真值 / specs / GSC 同簇词)
 *   .hermes/reports/moq-precision-classification-2026-09-19.json (统一后的 moqStatus)
 *   .hermes/reports/moq-precision-unified-2026-09-19.json  (硬门判据, 须 UNIFIED)
 *
 * ★ 设计纪律 (不猜):
 *   ① 生成器**不发明任何数字** —— 只从 products.ts (minQuantity/price_range/specs) 或
 *      K3 裁决真值中**选取**已验证元素, 并逐元素登记来源。
 *   ② **保留既有主词** (title 首段) 不改 —— 主词即现排名承接词, 换词 = churn 风险 (§7 红线)。
 *   ③ `moqStatus = MANUAL_REVIEW` 的槽位**直接跳过**, 不生成 (待人工裁决)。
 *   ④ 每候选过**四道闸门**: 当量 50-57(≥58 硬拦) / 数字来源 / 语言纯净 / 品牌末尾一次。
 *
 * 用法:
 *   node scripts/generate-title-batch.mjs                 # 默认 P0-A1 (dry-run)
 *   node scripts/generate-title-batch.mjs --batch=P0-A    # 指定批次
 *   node scripts/generate-title-batch.mjs --emit          # 落盘提案 JSON+MD
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const TODAY = '2026-09-19';
const LOCALES = ['zh-hk', 'en', 'ja'];
const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };
const SIMP = /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/;
// ★ 2026-09-19 修正: 原 `/[\u3040-\u30FF]/` 会把 **`・`(U+30FB 片假名中点)** 判为「日文假名」,
//   而 `・` 是 zh-hk 标题里的**常用分隔符** (线上既有标题大量使用, 例 `金・銀・玫瑰金`)
//   ⇒ 误报 G3。现排除 U+30FB (标点, 非假名) 与 U+30FC? —— 后者是长音符, 属日文特征, 保留。
const KANA = /[\u3041-\u30FA\u30FD\u30FE\u30FF]/;

/* ---------- 0. 硬门: 两法未统一则拒绝生成 ---------- */
const unified = read('.hermes/reports/moq-precision-unified-2026-09-19.json');
if (!unified.unified) {
  console.error('🔴 硬门关闭: 两法未统一 ⇒ 拒绝生成 (K3 2026-09-19 约束)');
  console.error('   详见 .hermes/reports/moq-precision-unified-2026-09-19.md');
  process.exit(1);
}
console.log('✅ 硬门: 两法已统一 (SKU/行键/语义一致) → 允许生成');

/* ---------- 1. 载入输入 ---------- */
const bank = read('.hermes/reports/title-input-bank-2026-09-19.json');
const cls = read('.hermes/reports/moq-precision-classification-2026-09-19.json');
const clsOf = {};
for (const it of cls.items) clsOf[`${it.slug}|${it.locale || '?'}`] = it;

/* ---------- 2. moqStatus 解析 (四类 + 无冲突) ---------- */
function moqStatusOf(slug, locale, p) {
  const c = clsOf[`${slug}|${locale}`];
  if (!c) return { status: 'USE_PRODUCTS_TRUTH', value: p.moq, src: `products.ts minQuantity=${p.moq}` };
  switch (c.cls) {
    case 'TRUE_DRIFT':
      return { status: 'USE_RULING_TRUTH', value: c.truth, src: `K3 裁决真值=${c.truth} (${c.reason.slice(0, 60)})` };
    case 'LOCALE_SPECIFIC_KEEP':
      return { status: 'LOCALE_SPECIFIC_KEEP', value: c.claimed, src: `locale-specific 现值=${c.claimed} (${c.reason.slice(0, 50)})` };
    case 'NO_MOQ_HOOK':
      return { status: 'NO_MOQ_HOOK', value: null, src: c.reason.slice(0, 70) };
    case 'MANUAL_REVIEW':
      return { status: 'MANUAL_REVIEW', value: null, src: c.reason.slice(0, 70) };
    default:
      return { status: 'USE_PRODUCTS_TRUTH', value: p.moq, src: `products.ts minQuantity=${p.moq}` };
  }
}

/* ---------- 3. 要素池 (全部可溯源) ---------- */
function headOf(title) {
  // 主词 = 首个分隔符之前的部分 (不改, 防 churn)
  return String(title).split(/\s*[|｜]\s*/)[0].trim();
}
function sizeToken(specs) {
  const s = specs?.size || '';
  // 只取规格中的**尺寸 token** (如 229×324mm / DL / C4 / A2 420×594mm), 不改写
  const m = s.match(/[A-Z]?\d{1,3}\s*[×x]\s*\d{1,3}\s*mm/i) || s.match(/\b(A[0-6]|DL|C[4-6]|B[4-5])\b/);
  return m ? m[0].replace(/\s+/g, '') : null;
}
function moqPhrase(status, value, locale) {
  if (value == null) return null;
  if (locale === 'zh-hk') return `${value}個起`;
  if (locale === 'en') return `${value} MOQ`;
  return `${value}枚〜`;
}
function pricePhrase(p, locale) {
  const v = p.basePrice?.[locale];
  if (v == null) return null;
  if (locale === 'zh-hk') return `HK$${v}起`;
  if (locale === 'en') return `$${v}`;
  return `¥${v}〜`;
}

/* ---------- 4. 四道闸门 ---------- */
function gates(title, locale, trace) {
  const e = equiv(title);
  const g = [];
  // 闸门1 当量
  g.push({ id: 'G1_当量', pass: e >= TITLE_MIN && e <= TITLE_MAX, detail: `${e} 当量 (目标 ${TITLE_MIN}-${TITLE_MAX}, ≥58 硬拦)` });
  // 闸门2 数字来源 (每个数字元素须有 trace)
  const nums = [...title.matchAll(/\d+/g)].map((m) => m[0]);
  const allTraced = trace.every((t) => t.src);
  g.push({ id: 'G2_数字来源', pass: allTraced, detail: `${trace.length} 个要素全附来源: ${trace.map((t) => t.src.slice(0, 34)).join(' / ')}` });
  // 闸门3 语言纯净
  const brand = BRAND[locale];
  let pure = true, why = 'ok';
  if (locale === 'en' && /[\u2E80-\u9FFF\u3040-\u30FF]/.test(title)) { pure = false; why = 'en 含 CJK'; }
  if (locale === 'ja' && SIMP.test(title)) { pure = false; why = 'ja 含简体字形'; }
  if (locale === 'zh-hk') {
    if (KANA.test(title)) { pure = false; why = 'zh-hk 含日文假名'; }    else if (SIMP.test(title)) { pure = false; why = 'zh-hk 含简体字形'; }
  }
  if (locale === 'zh-hk' && /ZprintPro/.test(title)) { pure = false; why = 'zh-hk 混入 ZprintPro (双品牌)'; }
  g.push({ id: 'G3_语言纯净', pass: pure, detail: why });
  // 闸门4 品牌末尾一次
  const bc = title.split(brand).length - 1;
  const atEnd = title.trim().split(/[|｜]/).pop().trim() === brand;
  g.push({ id: 'G4_品牌规范', pass: bc === 1 && atEnd, detail: `品牌 x${bc}, 末尾=${atEnd}` });
  return { equiv: e, gates: g, allPass: g.every((x) => x.pass) };
}

/* ---------- 5-Trim. 超限修剪 (P2 playbook, a2-posters 验证过) ----------
 * 目标: 当量 >58 → 降到 50-57。原则 (§7 红线):
 *   ① 主词一字不改  ② **数字钩子优先保** (K3: CTR 弹药)  ③ 先删**无效填充**, 再删**离主词最远的修饰**
 *   ④ **不新增任何数字** (修剪只做减法)  ⑤ 删后 ≥50, 否则该槽位标记需人工补写
 * 有效填充/无效填充判据来自 2026-09-19 实证: `品質保證` / `香港印刷專家` 在线上 SKU 标题中
 *   属模板填充 (无差异化价值), 且被 K3 v4「写满原则」点名应替换为数字钩子。
 */
const FILLER_RE = /品質保證|香港印刷專家|日本向け高品質印刷|品質檢驗/;
const HOOK_RE = /HK\$|US\$|\$\d|¥\d|\d{1,4}\s*(?:張|個|本|套|份|枚|pcs|MOQ|%)?[^\s|｜]{0,6}(?:起印|起訂|起|〜|から|MOQ|枚)/i;

/* ★ 悬空碎片守卫 (2026-09-19 实测踩坑): 子段截尾会切出**不完整的短语**:
 *   `Free 2h Proof` → `Free` ; `Free US Ship` → `Free US` ; `食品用紙箱・耐油カード` → `食品用紙箱・` ;
 *   `中綴じ / 無線綴じ` → `中綴じ /` ; `防水 PVC 異形切割 2h 打稿` → `… 2h`。
 *   这类碎片对用户是**破损文本**, 绝不能上线。
 * 判据 (任一即视为悬空 → 拒绝该截尾):
 *   ① 以分隔符/连接符结尾 (`/` `・` `-` `+` `&` `、`)
 *   ② 末 token 是「裸数量单位」(`2h` `24h` `4h`) 或裸数字
 *   ③ 末 token 属连接/介词类英文词 (Free/US/UK/and/from/with/the/Ship/Print 等), 即被截断的复合短语残部
 *   ④ 末 token 是 CJK 单字连接词 (的/與/和/及/或/用/為)
 */
const DANGLING_TAIL = /(?:\/|・|-|\+|&|、)\s*$/;
const BARE_UNIT = /^(?:\d+\s*(?:h|hr|hrs|mm|cm|g|kg|mil|dpi|%)|\d+)$/i;
const CONNECTOR = /^(?:free|us|uk|au|and|from|with|the|ship|shipping|print|printing|proof|design|day|days|hour|hours)$/i;
const CJK_CONJ = /[的與和及或用為]$/;
// ⑤ 悬空**形容词/定语后缀** (2026-09-19 二次补漏): `Food-Safe Boxes & Bags` 截成 `Food-Safe`
//    —— 形容词留下了, 被修饰的名词没了 ⇒ 仍是破损文本。判据: 以复合形容词后缀结尾且**无 CJK**
//    (CJK 无此形态; 例 `防水`/`透明` 单独作段是合法的工艺词, 不在此列)。
const DANGLING_ADJ = /[-‐-―](?:safe|free|ready|proof|resistant|grade|based|friendly|size|cut)$/i;
function isDangling(s) {
  const t = String(s).trim();
  if (!t) return true;
  if (DANGLING_TAIL.test(t)) return true;
  if (DANGLING_ADJ.test(t)) return true;
  const toks = t.split(/[\s・/]+/).filter(Boolean);
  const lastTok = toks[toks.length - 1] || '';
  if (BARE_UNIT.test(lastTok)) return true;
  if (CONNECTOR.test(lastTok)) return true;
  if (CJK_CONJ.test(t)) return true;
  return false;
}

function buildTrimCandidates(slug, locale, p, slot) {
  const cur = slot.current_title || '';
  const segs = String(cur).split(/\s*[|｜]\s*/).map((s) => s.trim()).filter(Boolean);
  const brand = BRAND[locale];
  const head = segs[0] || '';
  const tailIsBrand = segs[segs.length - 1] === brand;
  const mid = segs.slice(1, tailIsBrand ? segs.length - 1 : segs.length);
  const ms = moqStatusOf(slug, locale, p);
  if (ms.status === 'MANUAL_REVIEW') return { skipped: 'MANUAL_REVIEW — 不生成, 待人工裁决', ms };

  const hooks = mid.filter((s) => HOOK_RE.test(s));
  const others = mid.filter((s) => !HOOK_RE.test(s));
  const fillers = others.filter((s) => FILLER_RE.test(s));
  // 可删修饰 = 非填充、非钩子 (保留在原序)
  const mods = others.filter((s) => !FILLER_RE.test(s));
  // 钩子合并为一段 (省当量); 若原值被判错 (TRUE_DRIFT) 则整段剔除, 由裁决真值重建
  let hookSeg = hooks.join(' ');
  const trace = [];
  if (ms.status === 'USE_RULING_TRUTH') {
    hookSeg = [moqPhrase(ms.status, ms.value, locale), pricePhrase(p, locale)].filter(Boolean).join(' ');
    trace.push({ text: moqPhrase(ms.status, ms.value, locale) || '', src: ms.src });
  } else if (hookSeg) {
    trace.push({ text: hookSeg, src: '保留原钩子 (修剪只做减法, 不新增数字)' });
  }
  const join = (parts) => { const u = [...new Set(parts.filter(Boolean))]; let c = u.join(' | '); if (!new RegExp(`[|｜]\\s*${brand}\\s*$`).test(c)) c = `${c} | ${brand}`; return c; };

  const out = [];
  const variants = [
    { tag: 'B', parts: [head, ...mods, hookSeg], tagDesc: '删填充, 保修饰' },
    { tag: 'A', parts: [head, hookSeg], tagDesc: '删填充+修饰' },
  ];
  for (let k = mods.length - 1; k >= 0; k--) {
    variants.push({ tag: `C${mods.length - k}`, parts: [head, ...mods.slice(0, k), hookSeg], tagDesc: `保前 ${k} 修饰` });
  }
  /* ★ 2026-09-19 补: **子段级修剪** (段级删除粒度太粗, 会从 35 直接跳到 63, 中间无解)。
   *   实测 small-batch-stickers/zh-hk: `小批量貼紙 50 張起 HK$0.45 | 防水 PVC 異形切割 2h 打稿 | 智印港`
   *     = 63; 删掉整个修饰段 → 35 (<50) ⇒ 段级无解。
   *   做法: 对**最后一个可删修饰段**按 token 边界逐步截尾 (保留原分隔符与词序), 产生中间长度候选。
   *   例: `防水 PVC 異形切割 2h 打稿` → `防水 PVC 異形切割` → `防水 PVC`。
   */
  if (mods.length) {
    const last = mods[mods.length - 1];
    const toks = last.split(/(\s+|・)/).filter((x) => x !== '');
    for (let n = toks.length - 1; n >= 1; n--) {
      const pref = toks.slice(0, n).join('').trim();
      if (!pref) continue;
      if (pref === last) continue;
      if (isDangling(pref)) continue;   // ★ 悬空碎片守卫 (见下)
      variants.push({ tag: `T${n}`, parts: [head, ...mods.slice(0, -1), pref, hookSeg], tagDesc: `末段截尾 → "${pref}"` });
    }
  }
  for (const v of variants) {
    const cand = join(v.parts);
    const g = gates(cand, locale, trace.length ? trace : [{ text: hookSeg || '(无钩子)', src: '修剪减法, 未新增数字' }]);
    out.push({ variant: v.tag, title: cand, equiv: g.equiv, gates: g.gates, allPass: g.allPass, trace, variantDesc: v.tagDesc, droppedFillers: fillers });
  }
  const anyPass = out.some((c) => c.allPass);
  return {
    ms, candidates: out, longtail: null, mode: 'trim', fillersFound: fillers,
    // 纯减法无解 ⇒ 需改写 (替换/缩短某段), 不由生成器猜
    needsRewrite: anyPass ? null : '纯删除无法落入 50-57 (段级+子段级均无解) ⇒ 需人工改写某段 (例: 长段换短钩子), 不猜',
  };
}

/* ---------- 5. 候选构建 (最小增量: 保留既有段 + 只补缺失钩子, FILL 用)
 * ★ 2026-09-19 设计修正 (首版失败留痕): 首版把现有标题**整段替换**成「主词+尺寸+MOQ+价格」,
 *   结果 ① 丢掉既有的 spec-true 修饰 (如 `防水 PVC 異形切割`) ② 当量反而掉到 36-48 (目标 50-57)
 *   ③ 尺寸取自 specs.size 的**最小值** (如 `10×10mm`), 当卖点会误导。
 *   ⇒ 改为**最小增量**: segments = [主词] + [既有修饰段(保留)] + [合并后的数字钩子] + [品牌]。
 *   理由: 既有修饰段已是 spec 一致且线上在跑的资产, 保留 = churn 最小; 只补真正缺的数字钩子。
 *   技巧: 两个钩子**并进同一段** (空格分隔) 比各占一段省 3 当量, 是把当量抬进 50-57 的关键。
 */
function buildCandidates(slug, locale, p, slot) {
  const cur = slot.current_title || '';
  const segs = String(cur).split(/\s*[|｜]\s*/).map((s) => s.trim()).filter(Boolean);
  const brand = BRAND[locale];
  const head = segs[0] || '';
  // 既有修饰段 = 去掉主词与品牌后的中段 (保留, 不改写)
  const existingMods = segs.slice(1).filter((s) => s !== brand);
  const ms = moqStatusOf(slug, locale, p);
  if (ms.status === 'MANUAL_REVIEW') return { skipped: 'MANUAL_REVIEW — 不生成, 待人工裁决', ms };

  // ★ 2026-09-19 关键修正 (首轮输出实测踩到): 当 moqStatus = USE_RULING_TRUTH (原声明是 DRIFT) 时,
  //   既有修饰段里可能**嵌着那个错值** (例 `過膠餐牌 | 防水 覆膜 50本起 | …` 真值 100)。
  //   若照「保留既有段」处理并再补 `100個起` ⇒ 产出 `… 50本起 | 100個起 …` = **同标题两个互斥 MOQ**。
  //   ⇒ 规则: 原值已被判错时, **剥掉既有段中的 MOQ 声明** (整段含起印量即剔除), 再由裁决真值重建。
  const MOQ_IN_SEG = /\d{1,4}\s*(?:張|個|本|套|份|枚|pcs|MOQ)?\s*(?:起印|起訂|起|〜|から)/i;
  const staleStripped = [];
  let mods = existingMods;
  if (ms.status === 'USE_RULING_TRUTH') {
    mods = existingMods.filter((s) => {
      if (MOQ_IN_SEG.test(s)) { staleStripped.push(s); return false; }
      return true;
    });
  }

  const hooks = [];
  const trace = [];
  if (ms.status !== 'NO_MOQ_HOOK') {
    const mp = moqPhrase(ms.status, ms.value, locale);
    if (mp) { hooks.push(mp); trace.push({ text: mp, src: ms.src }); }
  }
  const pp = pricePhrase(p, locale);
  if (pp) { hooks.push(pp); trace.push({ text: pp, src: `products.ts basePrice=${p.basePrice[locale]}` }); }
  const hookSeg = hooks.join(' ');

  const lt = slot.gscCandidates?.[0] || null;
  const variants = [];
  // A: 最小增量 —— 主词 + 既有修饰(已剥错值) + 钩子 + 品牌 (churn 最小, 首选)
  variants.push({ tag: 'A', parts: [head, ...mods, hookSeg], trace });
  // B: A + GSC 同簇长尾 (写不满 50 时启用, 加后须 ≤57)
  if (lt) variants.push({ tag: 'B', parts: [head, ...mods, hookSeg, lt.q], trace: [...trace, { text: lt.q, src: `GSC 同簇词 (${lt.imps}imp/pos${lt.pos != null ? Number(lt.pos).toFixed(1) : '-'})` }] });
  // C: 仅主词 + 钩子 (最短, 用于已超长的槽位)
  variants.push({ tag: 'C', parts: [head, hookSeg], trace });

  const out = [];
  for (const v of variants) {
    const uniq = [...new Set(v.parts.filter(Boolean))];
    let cand = uniq.join(' | ');
    if (!new RegExp(`[|｜]\\s*${brand}\\s*$`).test(cand)) cand = `${cand} | ${brand}`;
    const g = gates(cand, locale, v.trace);
    out.push({ variant: v.tag, title: cand, equiv: g.equiv, gates: g.gates, allPass: g.allPass, trace: v.trace });
  }
  return { ms, candidates: out, pool: trace.length, longtail: lt?.q || null };
}

/* ---------- 6. 目标槽位选择 ---------- */
const BATCH_FILTER = (process.argv.find((a) => a.startsWith('--batch=')) || '--batch=P0-A1').split('=')[1];
const rows = [];
for (const [slug, entry] of Object.entries(bank.skus)) {
  for (const [locale, slot] of Object.entries(entry.slots)) {
    const ms = moqStatusOf(slug, locale, entry);
    const isA1 = ms.status === 'USE_PRODUCTS_TRUTH' || ms.status === 'USE_RULING_TRUTH';
    const batchNow = slot.batch || null;
    if (BATCH_FILTER === 'P0-A1') {
      if (!/^P0-A/.test(batchNow)) continue;
      if (!isA1) continue;
    } else if (BATCH_FILTER === 'P0-A2') {
      if (!/^P0-A/.test(batchNow)) continue;
      if (isA1) continue;
    } else if (BATCH_FILTER !== 'ALL') {
      if (batchNow !== BATCH_FILTER) continue;
    }
    rows.push({ slug, locale, batch: batchNow, slot, entry, ms });
  }
}

const results = [];
for (const r of rows) {
  const isTrim = r.slot.band === 'TRIM' || /^P2/.test(r.batch || '');
  const built = isTrim
    ? buildTrimCandidates(r.slug, r.locale, r.entry, r.slot)
    : buildCandidates(r.slug, r.locale, r.entry, r.slot);
  // 修剪模式: 优选「删得最少但仍 ≤57」的候选 (churn 最小); 生成模式: 优选变体 A
  if (isTrim && built.candidates) {
    const passing = built.candidates.filter((c) => c.allPass);
    const byMinChange = [...passing].sort((a, b) => b.equiv - a.equiv); // 尽量写满 (越高越接近原状)
    built.candidates = [...new Set([...byMinChange, ...built.candidates])];
  }
  results.push({ slug: r.slug, locale: r.locale, batch: r.batch, imps: r.slot.imps, pos: r.slot.pos, current: r.slot.current_title, currentEquiv: r.slot.equiv, moq: r.ms, mode: isTrim ? 'trim' : 'fill', ...built });
}

/* ---------- 7. 输出 ---------- */
const gen = results.filter((r) => r.candidates);
const skipped = results.filter((r) => r.skipped);
const passing = gen.flatMap((r) => r.candidates.filter((c) => c.allPass).map((c) => ({ ...r, ...c })));

console.log(`\n=== 批次 ${BATCH_FILTER}: ${results.length} 槽 (生成 ${gen.length} / 跳过 ${skipped.length}) ===`);
for (const r of gen) {
  const best = r.candidates.find((c) => c.allPass) || r.candidates[0];
  console.log(`\n  ${best.allPass ? '✅' : '⚠️'} ${r.slug}/${r.locale} [${r.batch}] imp=${r.imps ?? '-'} pos=${r.pos ?? '-'}`);
  console.log(`     现: ${r.currentEquiv} 当量  ${r.current.slice(0, 66)}`);
  for (const c of r.candidates) {
    console.log(`     ${c.allPass ? '✅' : '🔴'} [${c.variant}] ${c.equiv} 当量  ${c.title.slice(0, 78)}`);
    for (const g of c.gates) if (!g.pass) console.log(`           ↳ ${g.id}: ${g.detail}`);
  }
  console.log(`     moq: ${r.moq.status} = ${r.moq.value}  (${r.moq.src.slice(0, 60)})`);
}
for (const r of skipped) console.log(`  ⏭️  跳过 ${r.slug}/${r.locale}: ${r.skipped}`);

console.log(`\n汇总: 生成 ${gen.length} 槽 / 候选 ${gen.reduce((n, r) => n + r.candidates.length, 0)} 条 / 全闸门通过 ${passing.length} 条 / 跳过 ${skipped.length} 槽`);

if (process.argv.includes('--emit')) {
  const dir = path.join(ROOT, '.hermes/reports');
  fs.writeFileSync(path.join(dir, `title-proposals-${BATCH_FILTER}-${TODAY}.json`), JSON.stringify({
    schema: 'title-proposals-v1', generatedFor: TODAY, batch: BATCH_FILTER,
    calibration: `${TODAY} ${new Date().toISOString().slice(11, 16)} UTC`,
    hardGate: unified.verdict, rule: { min: 50, max: 57, hardMax: 58 },
    counts: { slots: results.length, generated: gen.length, skipped: skipped.length, candidates: gen.reduce((n, r) => n + r.candidates.length, 0), allPass: passing.length },
    results,
  }, null, 1));
  const md = [];
  md.push(`# 标题候选提案 — 批次 ${BATCH_FILTER} (${TODAY})`);
  md.push('');
  md.push(`校准日期: ${TODAY} ${new Date().toISOString().slice(11, 16)} UTC`);
  md.push('');
  md.push(`> 硬门: ${unified.verdict} · 口径: ${TITLE_MIN}-${TITLE_MAX} 当量 (≥58 硬拦)`);
  md.push(`> 纪律: 不发明数字 · 主词不改 · MANUAL_REVIEW 不生成 · 四道闸门`);
  md.push('');
  md.push(`## 汇总: ${gen.length} 槽生成 / ${skipped.length} 槽跳过 / ${passing.length} 条全闸门通过`);
  md.push('');
  for (const r of gen) {
    md.push(`### ${r.slug} / ${r.locale}  ·  ${r.batch}  ·  展示 ${r.imps ?? '-'} / 位置 ${r.pos ?? '-'}`);
    md.push('');
    md.push(`- 现标题 (${r.currentEquiv} 当量): \`${r.current}\``);
    md.push(`- MOQ: **${r.moq.status}** = ${r.moq.value} — ${r.moq.src}`);
    if (r.longtail) md.push(`- 长尾候选 (GSC 同簇): \`${r.longtail}\``);
    md.push('');
    md.push('| 变体 | 当量 | 闸门 | 候选标题 |');
    md.push('|---|---|---|---|');
    for (const c of r.candidates) md.push(`| ${c.variant} | ${c.equiv} | ${c.allPass ? '✅ 全过' : '🔴 ' + c.gates.filter((g) => !g.pass).map((g) => g.id).join(',')} | ${c.title} |`);
    md.push('');
    const tr = r.candidates[0].trace;
    if (tr.length) { md.push('数字/要素来源:'); for (const t of tr) md.push(`- \`${t.text}\` ← ${t.src}`); md.push(''); }
  }
  if (skipped.length) {
    md.push(`## 跳过 (待人工裁决) — ${skipped.length} 槽`);
    md.push('');
    for (const r of skipped) md.push(`- ${r.slug}/${r.locale} [${r.batch}]: ${r.skipped}`);
  }
  fs.writeFileSync(path.join(dir, `title-proposals-${BATCH_FILTER}-${TODAY}.md`), md.join('\n'));
  console.log(`\nreport: .hermes/reports/title-proposals-${BATCH_FILTER}-${TODAY}.md`);
}
