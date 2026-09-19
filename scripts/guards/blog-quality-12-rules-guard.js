/**
 * scripts/guards/blog-quality-12-rules-guard.js
 * 反审门童 #14 博客质量 12 条铁律 (K3 9/3 23:29 派活包)
 *
 * v2 修复 (2026-09-04 战略军师): 5 大 Pillar slug 硬编码触发 + 真正 JSON.parse + 金块/内链口径修正。
 *
 * v3 重写 (2026-09-19, K3 指令「先让门禁能看见真实问题 / 让门禁输出证据而非结论」)：
 *   背景 (2026-09-19 实测): 本门童报「0 命中 / 5 大 Pillar x 3 locale 全部符合 12 鐵律」，
 *   但独立双方法复算 + 线上 curl 实测发现同一批文章存在 3 类真缺陷：
 *     ① FAQPage 大面积丢失: 15 个 Pillar-locale 组合中，page.tsx 自动生成的 FAQPage 仅 3 个存在；
 *        6 个是「正文有 Q&A 但 <p> 带 class → 生产正则解析不出」，6 个是「正文根本没有 FAQ 段」。
 *     ② content 内嵌 JSON-LD 未清: 13/15 组合 content 首字节即 <script ld+json>，线上与 page.tsx
 *        生成的块重复 (线上实测 Article x2 / BreadcrumbList x2 / HowTo x2)。
 *     ③ 段级缺陷不可见: 段 6 (客户案例) / 段 8 (GEO 知识原子) / 段 9 (FAQ) 是否真的存在，
 *        旧版没有任何一条 Rule 覆盖。
 *   根因 = 「门禁口径」与「渲染/生成口径」不一致：旧 Rule 10 只 JSON.parse content 内嵌的 LD，
 *   从不检查 schema 是否由 page.tsx 生成；Rule 3 只数 bg-*-50 色块，不看 Q&A 文本。
 *
 *   v3 机制:
 *   A. 12 段骨架显式 checklist: 段 1-12 逐项 {段号, 状态, 证据样本, 失败原因}。
 *   B. 段 12 (Schema) + FAQPage 归因改为「线上 curl 断言」: 用 --online 抓真实 HTML，
 *      按 article 容器切分 inline 区，断言 page.tsx 生成的块齐全 + FAQPage 由 page.tsx 生成。
 *      未加 --online 时输出 SKIP (不输出 PASS，绝不把「没测」当「通过」)。
 *   C. 状态四态: PASS / FAIL / WARN / SKIP / INVALID —— 网络不可达判 INVALID，绝不计入通过。
 *
 * 用法:
 *   node scripts/guards/blog-quality-12-rules-guard.js                # 离线 checklist (段 12 为 SKIP)
 *   node scripts/guards/blog-quality-12-rules-guard.js --online       # 含线上 curl 断言 (建议 push 前跑)
 *   node scripts/guards/blog-quality-12-rules-guard.js --json         # 同时落盘证据 JSON
 *   node scripts/guards/blog-quality-12-rules-guard.js --slug=<slug>  # 只查单篇
 *   exit code: 离线 = 任何 FAIL ? 1 : 0 ; --online = 任何 FAIL/INVALID ? 1 : 0
 *
 * 12 条铁律 (K3 9/3 23:29 拍板, 段位口径 SSoT = docs/2026-09-08-title-rules-and-deep-blog-standard.md §3.1):
 *  段 1 倒金字塔首段<=200字含答案 / 段 2 快速答案块 40-60 字 >=3 / 段 3 H2 问句为主 / 段 4 段落不超3行
 *  段 5 E-E-A-T(Person+LinkedIn+FDA+EU REACH) / 段 6 原创数据>=10 数字 / 段 7 实体映射 / 段 8 CTA<=3
 *  段 9 语义锚点内链>=7(锚>=5字) / 段 10 Schema 齐全且 JSON-LD 全部可解析(Article+FAQPage+BreadcrumbList+HowTo+Organization)
 *  段 11 答案金块密度 / 段 12 比较表格>=2
 *  (旧 Rule 编号 = 上表序号; 本版以「12 段骨架段号」为输出主键, 保留旧 ruleId 供 error-patterns 追溯)
 */

const fs = require('fs');
const path = require('path');

// 5 大 Pillar slug（K3 9/3 23:29 12 鐵律重写对象）
const PILLAR_SLUGS = [
  'packaging-box-pricing-2026',        // P1 包裝盒
  'sticker-material-pvc-vinyl-removable', // P2 防水貼紙
  'poster-printing-guide',             // P3 海報
  'campus-education-printing-pillar-guide', // P4 校園
  'foil-stamping-3-applications-2026', // P5 燙金
];

const SITE_BASE = process.env.ZP_SITE_BASE || 'https://zprintpro.com';
const LOCALES = ['zh-hk', 'en', 'ja'];
// 存量 FAIL 基线 (语义「只许递减」; 口径同 .hermes/regression-guard 家族, per §14-L)
const BASELINE_PATH = path.resolve(process.cwd(), '.hermes/regression-guard/blog-12seg-baseline.json');

// ── 12 段骨架定义 (SSoT §3.1) ─────────────────────────────────────────────
const SEGMENTS = [
  { n: 1,  key: 'inverted_pyramid', name: '倒金字塔首段',   spec: '首段 <=200 字且直接回答主词问题（多少钱/多久/起订量）' },
  { n: 2,  key: 'quick_answer',     name: '快速答案块',     spec: 'bg-*-50 块 >=3，每块 40-60 字直答一个子问题' },
  { n: 3,  key: 'h2_question',      name: 'H2 问句段群',    spec: 'H2 >=6 且 >50% 为真实搜索问句；每段正文 <=3 行' },
  { n: 4,  key: 'comparison_table', name: '比较表格',       spec: '>=2 个真 <table>（材质×维度 + 价格/工艺/时效）' },
  { n: 5,  key: 'original_data',    name: '原创数据段',     spec: '>=10 个具体数字，每个标数据来源' },
  { n: 6,  key: 'customer_case',    name: '客户案例',       spec: '>=1 个一手案例（行业+用量+结果）；无案例须显式标「待校准」，禁编造' },
  { n: 7,  key: 'eeat',             name: 'E-E-A-T 署名段', spec: 'Person + 作者资历 + LinkedIn + FDA + EU REACH' },
  { n: 8,  key: 'geo_atom',         name: 'GEO 知识原子段', spec: '独立 <section> + 可被 AI 直引的定义/结论块【】' },
  { n: 9,  key: 'faq',              name: 'FAQ 段',         spec: '4-8 组，正文 <p><strong>Q[0-9]*[:：]…</strong><br/>A[:：]…</p> 可被 extractFaqFromHtml 解析' },
  { n: 10, key: 'cta',              name: 'CTA',            spec: 'wa.me CTA 恰好 2 处（顶部 1 + 底部 1），>3 = 意图疲劳' },
  { n: 11, key: 'internal_link',    name: '语义锚点内链',   spec: '内链 >=10（Pillar），锚文字 >=5 字且描述性' },
  { n: 12, key: 'schema',           name: 'Schema 块',      spec: 'Article + FAQPage + BreadcrumbList + HowTo + Organization 全齐，且由 page.tsx 生成（content 内嵌 = 重复渲染）' },
];

// ── 解析工具 ──────────────────────────────────────────────────────────────
function stripHtml(h) {
  return String(h).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}
function visibleWords(h, locale) {
  const t = stripHtml(h);
  if (locale === 'en') return (t.match(/[A-Za-z0-9'-]+/g) || []).length;
  return (t.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length + (t.match(/[A-Za-z0-9'-]+/g) || []).length;
}
/**
 * FAQ 可解析性 —— 必须与 src/app/[locale]/blog/[slug]/page.tsx extractFaqFromHtml 保持同源。
 * 2026-09-19 v3: 同步放宽后的生产正则（允许 <p> 带 class / </strong> 后 <br/> 可选 / 冒号前允许空格）。
 */
function extractFaq(html) {
  const re = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*A[0-9]*\s*[:：]\s*([\s\S]*?)<\/p>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const q = stripHtml(m[1]);
    const a = stripHtml(m[2]);
    if (q && a) out.push({ q, a });
  }
  return out;
}
function extractJsonLdBlocks(html) {
  const out = [];
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1];
    let ok = true; let err = null; let type = '?';
    const tm = raw.match(/"@type"\s*:\s*"([^"]+)"/);
    if (tm) type = tm[1];
    try { JSON.parse(raw); } catch (e) { ok = false; err = e.message; }
    out.push({ type, ok, err, raw, index: m.index });
  }
  return out;
}
const printHits = [];       // 保留旧 run() 契约 (check-regression-guard / DoD 兼容)
const rows = [];            // 12 段 checklist 行

function addRow(locale, slug, seg, status, evidence, reason) {
  const r = { locale, slug, seg, name: (SEGMENTS.find(s => s.n === seg) || {}).name || '', status, evidence: String(evidence).slice(0, 220), reason: reason || '' };
  rows.push(r);
  if (status === 'FAIL') {
    printHits.push({
      file: `src/data/blog-data/${locale}.json`,
      line: 0,
      match: `${slug} [${locale}] 段${seg} ${r.name}: ${r.evidence}`,
      severity: 'red',
      ruleId: `SEG${seg}_${(SEGMENTS.find(s => s.n === seg) || {}).key || 'UNKNOWN'}`.toUpperCase(),
      ruleName: `12 段骨架 段${seg} ${r.name}`,
      fix: r.reason,
    });
  }
}

// ── 离线 12 段评估 (段 1-11; 段 12 由 --online 判定) ─────────────────────
function checkSegmentsOffline(file, locale, slug, value) {
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const c = (value && value.content) || '';
  const isZh = locale !== 'en';

  // 段 1: 倒金字塔首段 (跳过 byline/作者行)
  const allP = [...c.matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)];
  let firstText = '';
  for (const pm of allP) {
    const cls = pm[1] || '';
    const txt = stripHtml(pm[2]);
    if (!txt) continue;
    if (/text-gray-600|text-xs|text-sm text-gray/.test(cls)) continue;
    if (/作者|著者|Author|最後更新|Last updated|閱讀時間|Reading time|最終更新/.test(txt)) continue;
    firstText = txt; break;
  }
  const fw = isZh ? visibleWords(firstText, locale) : firstText.length;
  if (!firstText) addRow(locale, slug, 1, 'FAIL', '首段为空', '补倒金字塔首段（100-200 字直答主词问题）');
  else if (fw > 200) addRow(locale, slug, 1, 'FAIL', `首段 ${fw} 字 > 200 字`, `改 ${slug} 首段到 100-200 字内直接回答核心问题`);
  else addRow(locale, slug, 1, 'PASS', `首段 ${fw} 字 | "${firstText.slice(0, 60)}…"`, '');

  // 段 2: 快速答案块 (bg-*-50 且正文 25-600)
  const qre = /<div class="[^"]*bg-(?:amber|blue|red|green|gray|orange|yellow)-50[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  let qm; const qlens = [];
  while ((qm = qre.exec(c)) !== null) {
    const len = stripHtml(qm[1]).length;
    if (len >= 25 && len <= 600) qlens.push(len);
  }
  if (qlens.length < 3) addRow(locale, slug, 2, 'FAIL', `仅 ${qlens.length} 个合规快速答案块（长度分布 ${qlens.join('/') || '∅'}）`, `为 ${slug} 增加 >=3 个 40-60 字快速答案块`);
  else addRow(locale, slug, 2, 'PASS', `${qlens.length} 个块，长度 ${qlens.slice(0, 4).join('/')}${qlens.length > 4 ? '/…' : ''}`, '');

  // 段 3: H2/H3 问句段群 (K3 2026-09-19 决策: 方案 a —— 主段锚可为 H2 或 H3)
  //   修订理由 (K3 评估第二点 + 外部标准):
  //     ① 多项 2026 AI 引用研究: 问句式 H2/H3 是「成本最低、回报最大」的格式化改动;
  //        有清晰 H1-H2-H3 层级的页面被 ChatGPT 引用概率约为无层级页面的 ~3 倍 ⇒ 关键在「层级逻辑清晰」,
  //        而非「必须用 H2」。
  //     ② 实测判例: poster-printing-guide 的 en/ja 用 <h3> 作主段锚 (<h2> = 0) —— 段群结构真实存在,
  //        语义上是问句主段; 旧规则只看 H2 ⇒ 直接判 FAIL = 过度严格。
  //     ③ 不选方案 b (把 h3 提升为 h2): 会改动已上线 DOM 结构 (churn) 且影响锚点/样式。
  //   判据: (H2+H3) 总数 ≥6 且 (H2+H3) 中问句式 > 50%。
  const h2re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi; let hm;
  const h3re = /<h3[^>]*>([\s\S]*?)<\/h3>/gi; let hm3;
  const Q_RE = /[?？]|\b(how|what|why|when|which|can|does|is|are|should|much|many|long)\b|多少|怎樣|如何|什麼|哪|是否|邊款|邊個|幾多|いくら|どう|なに|どの|できる|選び方|違い|種類|相場/;
  let q = 0; let nq = 0; const nqEx = [];
  let h2only = 0;
  while ((hm = h2re.exec(c)) !== null) {
    const t = stripHtml(hm[1]); h2only++;
    if (Q_RE.test(t)) q++; else { nq++; if (nqEx.length < 2) nqEx.push(t.slice(0, 28)); }
  }
  let h3only = 0;
  while ((hm3 = h3re.exec(c)) !== null) {
    const t = stripHtml(hm3[1]); h3only++;
    if (Q_RE.test(t)) q++; else { nq++; if (nqEx.length < 2) nqEx.push(t.slice(0, 28)); }
  }
  const h2n = h2only + h3only;
  const headMix = h3only > 0 && h2only > 0 ? `H2 ${h2only} + H3 ${h3only}` : (h3only > 0 ? `H3 ${h3only}` : `H2 ${h2only}`);
  if (h2n === 0) addRow(locale, slug, 3, 'FAIL', 'H2/H3 = 0（全篇无段锚，段群结构不存在）', `把 ${slug} 的主段锚补为 H2 或 H3 问句（≥6 个）`);
  else if (h2n < 6) addRow(locale, slug, 3, 'FAIL', `H2/H3 仅 ${h2n} 个 (${headMix}) < 6`, `补段锚到 6-10 个问句（H2 或 H3 均可）`);
  else if (nq > q) addRow(locale, slug, 3, 'FAIL', `问句 ${q}/${h2n} (${headMix})，非问句 ${nq}（例: ${nqEx.join(' / ')}）`, `把陈述式标题改为用户真实搜索问句`);
  else addRow(locale, slug, 3, 'PASS', `${headMix} = ${h2n} 个，问句 ${q} 个（${Math.round(q / h2n * 100)}%）`, '');

  // 段 4: 比较表格
  const tables = (c.match(/<table[\s>]/gi) || []).length;
  if (tables < 2) addRow(locale, slug, 4, 'FAIL', `仅 ${tables} 个 <table>（需 >=2）`, `为 ${slug} 增加材质×维度表 + 价格/工艺/时效表`);
  else addRow(locale, slug, 4, 'PASS', `${tables} 个 <table>`, '');

  // 段 5: 原创数据 (具体数字 >=10)
  const nums = c.match(/\b\d{2,}[\d,.]*\b/g) || [];
  const hasSrc = /數據來源|数据来源|資料來源|Sources?:|出處|出典/i.test(c);
  if (nums.length < 10) addRow(locale, slug, 5, 'FAIL', `仅 ${nums.length} 个具体数字（需 >=10）`, `补订单数/测试时长/褪色率/价格/认证号`);
  else if (!hasSrc) addRow(locale, slug, 5, 'WARN', `${nums.length} 个数字，但未检出「资料来源」标记`, '按 §0.23 补数据来源行');
  else addRow(locale, slug, 5, 'PASS', `${nums.length} 个数字 + 检出资料来源标记`, '');

  // 段 6: 客户案例
  const caseHit = /客戶案例|客户案例|Customer (Case|Story|Background)|顧客事例|導入事例|案例如下/.test(c);
  const pending = /待\s*008|待校準|待校准|to be calibrated/i.test(c);
  if (caseHit) addRow(locale, slug, 6, 'PASS', '检出客户案例段标记' + (/退貨率|退货率|降\s*\d+|升\s*\d+/.test(c) ? ' + 结果数字' : ''), '');
  else if (pending) addRow(locale, slug, 6, 'WARN', '无案例，但已显式标「待校准」', '按 §0.2 需 008 案例库校准后补真实案例');
  else addRow(locale, slug, 6, 'FAIL', '无客户案例段，也无「待校准」标注', `补 1 个一手案例（行业+用量+结果）或显式标「待 008 案例库校准」`);

  // 段 7: E-E-A-T
  const hasLinkedIn = /linkedin\.com/i.test(c);
  const hasFDA = /FDA/i.test(c);
  const hasREACH = /EU\s*REACH/i.test(c);
  // ★ 2026-09-19 口径修正 (strip 内嵌 LD 后实测暴露的**度量口径不一致**):
  //   Person 是**页面生成层**产物 (page.tsx → Article.author, 定义在 schema-extensions.ts),
  //   **从来不在 content 里**; 而 LinkedIn/FDA/EU REACH 既可能在生成层 (sameAs) 也可能在正文。
  //   旧实现把 Person 当 content 信号 ⇒ 内嵌 LD 一旦 strip, 段 7 立刻报「信号缺失: Person」,
  //   但线上 (--online) 该信号仍在生成区 ⇒ 属**离线度量假阳性**(与段 12 同类: 该信号本就在生成层)。
  //   修法: 离线只判 content 侧可判信号 (FDA / EU REACH / LinkedIn 文本提及), Person 交线上断言;
  //        离线证据里显式标注「Person 由 page.tsx 生成层承载, 待 --online 判定」。
  const hasPersonInContent = /"@type"\s*:\s*"Person"/.test(c);
  const eeatMiss = [!hasLinkedIn && 'LinkedIn', !hasFDA && 'FDA', !hasREACH && 'EU REACH'].filter(Boolean);
  const personNote = hasPersonInContent ? 'Person(内嵌)' : 'Person(生成层承载,待 --online)';
  if (eeatMiss.length) addRow(locale, slug, 7, 'FAIL', `content 侧信号缺失: ${eeatMiss.join(', ')} | ${personNote}`, `补 ${slug} 的 ${eeatMiss.join(' + ')}（FDA/EU REACH 属正文引用, 必须写在 content 内）`);
  else addRow(locale, slug, 7, 'PASS', `${personNote} + LinkedIn + FDA + EU REACH（content 侧）`, '');

  // 段 8: GEO 知识原子
  const atoms = (c.match(/【[^】]{2,20}】/g) || []).length;
  const secs = (c.match(/<section[\s>]/gi) || []).length;
  if (atoms === 0) addRow(locale, slug, 8, 'FAIL', '无【】知识原子', `补 GEO 知识原子段（独立 <section> + 【】金句）`);
  else if (secs === 0) addRow(locale, slug, 8, 'WARN', `${atoms} 个【】原子但无独立 <section>`, '按 SSoT §3.1-10 包独立 <section>');
  else addRow(locale, slug, 8, 'PASS', `${atoms} 个【】原子 + ${secs} 个 <section>`, '');

  // 段 9: FAQ (格式 = 生产正则可解析)
  const faqs = extractFaq(c);
  // 第二方法: 正文里存在 FAQ 语义标记/疑问句式，但正则解析不出 → 格式不合规 (双方法复算口径)
  const faqHeading = /<h2[^>]*>[^<]*(FAQ|常見問題|常见问题|よくある|質問)/i.test(c);
  const qish = (c.match(/<strong>[^<]{4,80}[?？]<\/strong>/g) || []).length
    + (c.match(/<li>\s*<strong>[^<]{4,80}[?？]/g) || []).length;
  if (faqs.length >= 4) addRow(locale, slug, 9, 'PASS', `${faqs.length} 组可解析 Q&A | 首组 Q="${faqs[0].q.slice(0, 40)}"`, '');
  else if (faqs.length > 0) addRow(locale, slug, 9, 'FAIL', `仅 ${faqs.length} 组可解析（需 4-8）`, `补 FAQ 到 4-8 组（格式 <p><strong>Q1: …</strong><br/>A: …</p>）`);
  else if (faqHeading || qish > 0) addRow(locale, slug, 9, 'FAIL', `正文有 FAQ 语义（heading=${faqHeading}, 疑问句式 ${qish} 处）但 0 组可被 extractFaqFromHtml 解析 → FAQPage 静默丢失`, '只改包装标签: 把 <li><strong>问?</strong>答</li> / 带 class 的 <p> 改为 <p><strong>Q1: 问?</strong><br/>A: 答</p>（答案文字逐字保留）');
  else addRow(locale, slug, 9, 'FAIL', '正文无 FAQ 段（heading 与 Q&A 均缺失）', `为 ${slug} 新增 4-8 组 FAQ（段 9）`);

  // 段 10: CTA
  const cta = (c.match(/wa\.me\/\d+/g) || []).length;
  if (cta === 0) addRow(locale, slug, 10, 'FAIL', 'CTA = 0', '补顶部 1 + 底部 1 WhatsApp CTA');
  else if (cta > 3) addRow(locale, slug, 10, 'FAIL', `CTA ${cta} 处 > 3（意图疲劳）`, `减 ${slug} CTA 到 2 处`);
  else if (cta === 1) addRow(locale, slug, 10, 'WARN', `CTA 仅 1 处（标准 = 顶 1 + 底 1）`, '补另一处 CTA');
  else addRow(locale, slug, 10, 'PASS', `CTA ${cta} 处`, '');

  // 段 11: 语义锚点内链
  const linkRe = /<a[^>]*href=["'](\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/g;
  let lm; const anchors = [];
  while ((lm = linkRe.exec(c)) !== null) {
    const href = lm[1];
    if (!/^\/(zh-hk|en|ja)\//.test(href) && !/^\/(blog|product|category)\b/.test(href)) continue;
    const atext = stripHtml(lm[2]);
    if (atext.length >= 5) anchors.push(atext);
  }
  if (anchors.length < 10) addRow(locale, slug, 11, 'FAIL', `达标内链（锚>=5字）${anchors.length} < 10（Pillar 硬指标）`, `补内链到 >=10（1 回首页 + 4 品类 + 3 SKU PDP + 2 主题）`);
  else addRow(locale, slug, 11, 'PASS', `${anchors.length} 条达标内链`, '');

  // 段 12: Schema —— 离线可判「content 内嵌」（= 重复渲染源），线上齐套性留 --online
  const inline = extractJsonLdBlocks(c);
  if (inline.length > 0) {
    addRow(locale, slug, 12, 'FAIL', `content 内嵌 JSON-LD ${inline.length} 块（${[...new Set(inline.map(b => b.type))].join('/')}）→ 与 page.tsx 生成块重复渲染`, '按 SSoT §3.2 strip content 内嵌 JSON-LD（SSoT = page.tsx 单一来源）；**须先确认 page.tsx 生成的 FAQPage 已覆盖本页再 strip**');
  } else {
    addRow(locale, slug, 12, 'SKIP', 'content 无内嵌 JSON-LD；线上齐套性待 --online 判定', '运行 node scripts/guards/blog-quality-12-rules-guard.js --online');
  }
  return { rel, faqs, inline };
}

// ── 线上断言 (段 12 齐套性 + FAQPage 归因) ────────────────────────────────
function splitByArticleContainer(html) {
  // 用正文容器切分 (2026-09-19 实测线上 marker = `<div class="blog-content max-w-none ...">`):
  //   [0] = page.tsx/metadata 生成区 (head ld+json)
  //   [1] = content 注入区 —— 即「dangerouslySetInnerHTML={{__html: post.content}}」的落点
  // 找不到 marker 一律判 INVALID (绝不把「没测到」当「0 命中」) —— §0.23.2 匹配口径闸门
  const m = html.match(/<div[^>]*class="[^"]*blog-content[^"]*"/);
  if (!m) return null;
  return { generated: html.slice(0, m.index), injected: html.slice(m.index) };
}
async function probeOnline(slug, locale, timeoutMs) {
  const url = `${SITE_BASE}/${locale}/blog/${slug}/`;
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ac.signal, headers: { 'user-agent': 'zprintpro-guard-14/3.0' } });
    const html = await res.text();
    clearTimeout(t);
    // 响应有效性三闸门 (匹配口径/状态码/长度下限)
    if (res.status !== 200) return { url, invalid: `HTTP ${res.status}` };
    if (html.length < 20000) return { url, invalid: `len ${html.length} < 20000（疑似占位/错误页）` };
    const cut = splitByArticleContainer(html);
    if (!cut) return { url, invalid: '未找到 article 容器 marker（不得计 0，判 INVALID）' };
    const gen = extractJsonLdBlocks(cut.generated);
    const inj = extractJsonLdBlocks(cut.injected);
    return { url, gen, inj, len: html.length };
  } catch (e) {
    clearTimeout(t);
    return { url, invalid: `请求失败: ${e.message}` };
  }
}
async function checkSegment12Online(slug, locale) {
  // --online 时以线上断言为该段唯一权威结论: 先撤掉离线那条 (避免同段两行互相矛盾)
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].seg === 12 && rows[i].locale === locale && rows[i].slug === slug) rows.splice(i, 1);
  }
  for (let i = printHits.length - 1; i >= 0; i--) {
    if (String(printHits[i].ruleId).startsWith('SEG12_') && printHits[i].match.includes(`[${locale}]`)) printHits.splice(i, 1);
  }
  const p = await probeOnline(slug, locale, 12000);
  if (p.invalid) {
    addRow(locale, slug, 12, 'INVALID', `段12 线上断言无效: ${p.invalid} (${p.url})`, '网络/限流问题；重跑或串行降速，绝不视为通过');
    return;
  }
  const genTypes = [...new Set(p.gen.filter(b => b.ok).map(b => b.type))];
  const injTypes = [...new Set(p.inj.filter(b => b.ok).map(b => b.type))];
  const broken = [...p.gen, ...p.inj].filter(b => !b.ok);
  // 硬要求 4 块 (须各自独立成块): Article + FAQPage + BreadcrumbList + HowTo
  const requiredGen = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo'];
  // 软要求 2 块 (允许嵌在 Article 内, 2026-09-19 线上实测: publisher=Organization / author=Person):
  //   SSoT §3.2 要求「Organization / Person」实体可见, 由 Article.author / Article.publisher 承载即算满足
  const softGen  = ['Organization', 'Person'];
  const generatedRegionHtml = p.gen.map(b => b.raw).join(' ');
  const missingGen = requiredGen.filter(t => !genTypes.includes(t));
  const missingSoft = softGen.filter(t => !genTypes.includes(t) && !new RegExp(`"${t}"`).test(generatedRegionHtml));
  const dup = genTypes.filter(t => injTypes.includes(t));
  const ev = `generated=[${genTypes.join(',')}] 内嵌=[${injTypes.join(',')}] blocks=${p.gen.length}+${p.inj.length} len=${p.len}`;
  if (broken.length) {
    addRow(locale, slug, 12, 'FAIL', `JSON-LD 解析失败 ${broken.length} 块: ${broken.map(b => `${b.type}(${b.err.slice(0, 30)})`).join('; ')} | ${ev}`, '用 JSON.stringify 重建损坏的 JSON-LD');
  } else if (missingGen.length) {
    addRow(locale, slug, 12, 'FAIL', `page.tsx 生成块缺 ${missingGen.join(',')} | ${ev}`, `补 ${missingGen.join('+')}（FAQPage 缺失多为正文 FAQ 格式不可解析 → 见段 9）`);
  } else if (missingSoft.length) {
    addRow(locale, slug, 12, 'WARN', `生成区未检出 ${missingSoft.join(',')}（含 Article 内嵌） | ${ev}`, `按 SSoT §3.2 补 ${missingSoft.join('+')} 实体`);
  } else if (dup.length) {
    addRow(locale, slug, 12, 'FAIL', `重复渲染: ${dup.join(',')} 同时存在于生成区与 content 注入区 | ${ev}`, 'strip content 内嵌 JSON-LD（先确认生成区 FAQPage 已存在）');
  } else {
    addRow(locale, slug, 12, 'PASS', `${ev}`, '');
  }
}

// ── 扫描与输出 ────────────────────────────────────────────────────────────
function scan(dir) {
  const files = [];
  (function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        if (['node_modules', '.next', 'dist', '.git'].includes(e.name)) continue;
        walk(full);
      } else if (['zh-hk.json', 'en.json', 'ja.json'].includes(e.name)) files.push(full);
    }
  })(dir);
  return files;
}

function run(opts) {
  const o = opts || {};
  const dir = path.resolve(process.cwd(), 'src/data/blog-data');
  const slugs = o.slug ? [o.slug] : PILLAR_SLUGS;
  printHits.length = 0;
  rows.length = 0;
  for (const file of scan(dir)) {
    const locale = path.basename(file).replace('.json', '');
    let parsed;
    try { parsed = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) {
      printHits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0, match: `${locale}.json 无法解析: ${e.message}`, severity: 'red', ruleId: 'JSON_PARSE', ruleName: 'JSON 完整性' });
      continue;
    }
    for (const slug of slugs) {
      if (parsed[slug]) checkSegmentsOffline(file, locale, slug, parsed[slug]);
    }
  }
  return { name: 'blog-quality-12-rules-guard', hits: printHits, rows };
}

function render(rows) {
  const bySlug = {};
  for (const r of rows) {
    const k = `${r.locale}/${r.slug}`;
    (bySlug[k] = bySlug[k] || []).push(r);
  }
  console.log('\n=== 12 段骨架显式 checklist (SSoT docs/2026-09-08-title-rules-and-deep-blog-standard.md §3.1) ===');
  const tally = { PASS: 0, FAIL: 0, WARN: 0, SKIP: 0, INVALID: 0 };
  for (const k of Object.keys(bySlug)) {
    const list = bySlug[k].sort((a, b) => a.seg - b.seg);
    const bad = list.filter(r => r.status === 'FAIL').length;
    console.log(`\n--- ${k}  ${bad === 0 ? '[段级无 FAIL]' : `[${bad} 段 FAIL]`} ---`);
    for (const r of list) {
      tally[r.status] = (tally[r.status] || 0) + 1;
      const icon = { PASS: 'PASS   ', FAIL: 'FAIL   ', WARN: 'WARN   ', SKIP: 'SKIP   ', INVALID: 'INVALID' }[r.status];
      console.log(`  段${String(r.seg).padStart(2, '0')} ${icon} ${r.name}  | 证据: ${r.evidence}`);
      if (r.status === 'FAIL' && r.reason) console.log(`        └─ 修法: ${r.reason}`);
    }
  }
  console.log(`\n[12段骨架汇总] PASS=${tally.PASS || 0} FAIL=${tally.FAIL || 0} WARN=${tally.WARN || 0} SKIP=${tally.SKIP || 0} INVALID=${tally.INVALID || 0}`);
  console.log(`[口径] FAIL = 段级不合格; WARN = 需人工判定; SKIP = 本模式未测（不算通过）; INVALID = 测量无效（绝不算通过）`);
}

(async function main() {
  const argv = process.argv.slice(2);
  // ZP_SKIP_ONLINE=1 = 仅跳过线上断言 (网络问题时用), 离线段级检查仍执行 —— 但段 12 会退化为 SKIP (不算通过)
  const online = argv.includes('--online') && process.env.ZP_SKIP_ONLINE !== '1';
  const asJson = argv.includes('--json');
  const baselineMode = argv.includes('--baseline');
  const stampBaseline = argv.includes('--stamp-baseline');
  const slugArg = (argv.find(a => a.startsWith('--slug=')) || '').split('=')[1];
  const r = run({ slug: slugArg });
  if (online) {
    const slugs = slugArg ? [slugArg] : PILLAR_SLUGS;
    for (const locale of LOCALES) {
      for (const slug of slugs) {
        // 串行 + 间隔 (批量突发会被 CF 限流 → 假 0)
        await checkSegment12Online(slug, locale);
        await new Promise(res => setTimeout(res, 300));
      }
    }
  }
  render(rows);
  if (printHits.length) {
    console.log(`\n[BLOG-QUALITY-12-RULES-GUARD] ${printHits.length} 条 FAIL 明细 (兼容旧 ruleId 口径):`);
    for (const h of printHits) console.log(`  ${h.file} [${h.ruleId}] ${h.match.slice(0, 190)}`);
  } else {
    console.log('\n[BLOG-QUALITY-12-RULES-GUARD] 段级 0 FAIL');
  }

  // ── 基线模式 (存量缺陷与新增缺陷分离, 口径同 §14-L「只许递减」) ──────────
  // 用途: pre-push 只拦「新增/回归」的段级 FAIL, 不因存量缺陷卡死发布;
  //       报告同时给出「基线 X / 现存 Y / 已修 Z / 剩余待修 Y」。
  let baselineViolation = 0;
  if (baselineMode || stampBaseline) {
    const keyOf = x => `${x.locale}|${x.slug}|${x.seg}|${x.status}`;
    const now = rows.filter(x => x.status === 'FAIL').map(keyOf).sort();
    let base = [];
    let baseLoadError = null;
    if (fs.existsSync(BASELINE_PATH)) {
      try {
        // ★ 防御 (2026-09-19 实测踩到): PowerShell `Set-Content -Encoding UTF8` 会写 **UTF-8 BOM**,
        //   JSON.parse 遇 BOM 抛错 ⇒ 若静默吞掉就使「基线 49」变「基线 0」, 49 条存量被当成新增
        //   ⇒ 假拦死全站。故: ① 剥 BOM ② 解析失败必须显式报警, 不得静默降级。
        const rawBase = fs.readFileSync(BASELINE_PATH, 'utf8').replace(/^\uFEFF/, '');
        base = (JSON.parse(rawBase).fails || []).slice().sort();
      } catch (e) {
        baseLoadError = e.message;
        base = [];
      }
    }
    if (baseLoadError) {
      console.log(`⚠️  [基线读取失败] ${path.relative(process.cwd(), BASELINE_PATH).replace(/\\/g, '/')}: ${baseLoadError}`);
      console.log('    ⇒ 本轮「基线对账」不可用 (基线按空处理); 请先修复台账再判断新增/存量。');
      console.log('    ⇒ 重建: node scripts/guards/blog-quality-12-rules-guard.js --stamp-baseline');
    }
    if (stampBaseline) {
      fs.mkdirSync(path.dirname(BASELINE_PATH), { recursive: true });
      fs.writeFileSync(BASELINE_PATH, JSON.stringify({
        schema: 'blog-12seg-baseline/v1',
        note: '12 段骨架存量 FAIL 基线 (语义 = 只许递减)。新增 FAIL 必须修; 存量 FAIL 逐批清。刷新命令: node scripts/guards/blog-quality-12-rules-guard.js --stamp-baseline',
        updated_at: new Date().toISOString(),
        fails: now,
      }, null, 1), 'utf8');
      console.log(`\n[基线已刷新] ${path.relative(process.cwd(), BASELINE_PATH).replace(/\\/g, '/')} → ${now.length} 条存量 FAIL`);
      process.exit(0);
    }
    const added = now.filter(k => !base.includes(k));
    const fixed = base.filter(k => !now.includes(k));
    console.log(`\n[基线对账] 基线 ${base.length} / 现存 ${now.length} / 已修 ${fixed.length} / 剩余待修 ${now.length}`);
    if (added.length) {
      console.log(`🔴 [新增段级 FAIL] ${added.length} 条 (必须修, 不允许进入基线):`);
      for (const a of added.slice(0, 40)) console.log(`   + ${a}`);
      if (added.length > 40) console.log(`   ... 另有 ${added.length - 40} 条`);
      baselineViolation = 1;
    } else {
      console.log('✅ [基线对账] 0 条新增段级 FAIL (存量缺陷按批次清, 不阻断本次发布)');
    }
    // ★ 自动递减 (K3 2026-09-19 评估 A3 加固): 已修的存量条目从台账移除并落盘。
    //   口径: 基线必须「只许递减」; 否则 49 条存量会变成永久豁免, 红色不再区分
    //   「你破坏了它」与「它本来就这样」→ 最终被当噪音忽略 (见 SSoT §7.5)。
    //   `--no-prune` 仅用于排查, 禁常态使用。
    if (fixed.length && !argv.includes('--no-prune')) {
      // 剩余 = 基线 ∩ 现存 (即仍未修的存量)
      const next = base.filter(k => now.includes(k));
      fs.writeFileSync(BASELINE_PATH, JSON.stringify({
        schema: 'blog-12seg-baseline/v1',
        note: '12 段骨架存量 FAIL 基线 (语义 = 只许递减, --baseline 模式自动递减; --no-prune 可关闭)。刷新: node scripts/guards/blog-quality-12-rules-guard.js --stamp-baseline',
        updated_at: new Date().toISOString(),
        fails: next,
      }, null, 1), 'utf8');
      console.log(`⬇️  [基线自动递减] 移除已修 ${fixed.length} 条 → 剩余 ${next.length} 条 (台账已更新, 请随同本批 commit 提交)`);
      for (const f of fixed.slice(0, 20)) console.log(`   - ${f}`);
      if (fixed.length > 20) console.log(`   ... 另有 ${fixed.length - 20} 条`);
    } else if (fixed.length) {
      console.log(`ℹ️  [基线未递减] 检出已修 ${fixed.length} 条, 但本轮带 --no-prune, 台账保持不动`);
    }
  }

  if (asJson) {
    const outDir = path.resolve(process.cwd(), '.hermes/reports');
    fs.mkdirSync(outDir, { recursive: true });
    const day = new Date().toISOString().slice(0, 10);
    const out = path.join(outDir, `blog-12seg-checklist-${day}${online ? '-online' : ''}.json`);
    fs.writeFileSync(out, JSON.stringify({ generated_at: new Date().toISOString(), online, site: SITE_BASE, segments: SEGMENTS, rows: rows.map(x => ({ ...x, evidence: x.evidence, reason: x.reason })) }, null, 1), 'utf8');
    console.log(`[证据留档] ${path.relative(process.cwd(), out).replace(/\\/g, '/')}`);
  }

  if (baselineMode) process.exit(baselineViolation ? 1 : 0);
  const failed = rows.some(x => x.status === 'FAIL' || (online && x.status === 'INVALID'));
  process.exit(failed ? 1 : 0);
})();

module.exports = { run, checkPillar: checkSegmentsOffline, PILLAR_SLUGS, SEGMENTS, extractFaq };
