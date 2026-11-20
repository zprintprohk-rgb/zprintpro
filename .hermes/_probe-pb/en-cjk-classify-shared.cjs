'use strict';
/**
 * .hermes/_probe-pb/en-cjk-classify-shared.cjs
 * ── 共用「档位定义 + 字段名 → 档位」映射 (方法 A / 方法 B 共用定义, 实现各自独立) ──
 *
 * ★ 口径声明 (K3 拍板, 唯一权威):
 *   「哪些字符属于 en 语系值」= scripts/guards/common.js resolveLocale() + 门童 #4
 *   scanBidirectional() 的**结构化值作用域** (i18n-guard.js buildLocaleScopes/attrLocale)。
 *   两者在本次 8 档上的关系已在报告中逐条对账 (见 diag-authority-per8.cjs):
 *     · 门童值作用域 = 基线 (perRule I18N_POLLUTION_EN = 1032) 的来源
 *     · resolveLocale 在 8 档上多出 203 字, 全部集中在 3 处假阳性 (注释体 / 嵌套 locale 块)
 *   ★ 本任务**不新造第二套 locale 判定**: 定位字符用 resolveLocale, 归属校验用门童值作用域,
 *     两者取并集时**逐条标注来源**, 绝不静默合并。
 *
 * ★ 档位定义 (互斥, 只此 6 档, 不自创第 7 档):
 *   category / title / description / content / JSON-LD / 其他
 *   ─ 按「命中字符所处字段」归档, 不按内容特征归档
 *   ─ JSON-LD 优先级最高 (内嵌 JSON-LD 串优先于其外壳字段), 以保证互斥
 *   ─ 不设「FAQ 残留」档; FAQ 改为 content 档上的布尔子标记 rendersChineseFAQ
 */

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uF900-\uFAFF]/;
const CJK_G = /[\u3400-\u4dbf\u4e00-\u9fff\uF900-\uFAFF]/g;

/** 字符数 (按字符计, 非字节) */
function cjkCount(s) { const m = String(s).match(CJK_G); return m ? m.length : 0; }

/** 6 档常量 */
const BUCKETS = ['category', 'title', 'description', 'content', 'JSON-LD', '其他'];

/** 字段名 → 档位 (明确列表; 未命中者落 其他, 并**逐条列出键名**, 不硬塞) */
const FIELD_BUCKET = new Map(Object.entries({
  // category
  category: 'category', categoryKey: 'category', categoryName: 'category', categories: 'category',
  categoryLabel: 'category', categorySlug: 'category',
  // title
  title: 'title', seoTitle: 'title', metaTitle: 'title', h1: 'title', h2: 'title', h3: 'title',
  heading: 'title', headingTitle: 'title', bannerTitle: 'title', cardTitle: 'title',
  onlineTitle: 'title', howTitle: 'title', faqTitle: 'title', ctaTitle: 'title',
  productName: 'title', heroTitle: 'title', pageTitle: 'title',
  // description
  description: 'description', desc: 'description', metaDescription: 'description',
  excerpt: 'description', summary: 'description', subtitle: 'description',
  bannerSubtitle: 'description', onlineDesc: 'description', ctaDesc: 'description',
  shortDescription: 'description', longDescription: 'description', intro: 'description',
  // content
  content: 'content', body: 'content', html: 'content', text: 'content',
  paragraphs: 'content', points: 'content', bullets: 'content', features: 'content',
  scenarios: 'content', material: 'content', materials: 'content', specs: 'content',
  faq: 'content', faqs: 'content', q: 'content', a: 'content',
  productLongDescription: 'content', longDescriptionHtml: 'content', note: 'content',
  tips: 'content', steps: 'content', benefits: 'content', highlights: 'content',
  // 明确不属上述五档 (逐条列名)
  // label/name/value/speed/bestFor/tag/fee/qrLabel/beneficiaryCn/supportJA/... -> 其他
}));

/**
 * JSON-LD 标记: 该值是否为内嵌 JSON-LD 串
 * 判据 (任一): application/ld+json / "@type" / "@context"
 */
function isJsonLd(value) {
  return /application\/ld\+json|"@type"|\\"@type\\"|"@context"|\\"@context\\"/.test(String(value));
}

/** 简化字判定 (仅用于报告标注, 不参与档位) */
const SIMP_HINT = /[认证体满立体镂烫压纹纸张页书订单货价格费账号购销运输邮装产质检验设计图标记规艺术层]|餐|宠|房|医|药|汽|体|书|籍|母|婴|运|输|设|备|进|口|国|际|认|证|体|系|满|足|立|体|镂|空/;

/** 白名单候选 (K3 已批准的 4 行; 跨档标记, 不占档位) */
const WHITELIST_RULES = [
  { id: 'WL-1', file: 'src/app/[locale]/payment-methods/page.tsx', line: 697, field: 'beneficiaryCn', kind: '法人全称', note: '深圳市彩龍印刷包裝有限公司' },
  { id: 'WL-2', file: 'src/app/[locale]/payment-methods/page.tsx', line: 758, field: 'bullets', kind: '法定代表人姓名', note: "'Official QR issued by 唐运提 (Mr. Tang, founder)'" },
  { id: 'WL-3', file: 'src/components/layout/Footer.tsx', line: 146, field: 'supportJA', kind: '别名键(ja 语系值)', note: 'supportJA 值内 CJK (中国本土 …)' },
  { id: 'WL-4', file: 'src/data/blog-data/en.json', field: 'content', kind: '品牌名', note: '彩龍印刷' },
];
const BRAND_TOKENS = ['彩龍印刷', '彩龍', '深圳市彩龍印刷包裝有限公司', '唐运提'];

function whitelistMatch(file, line, value) {
  const out = [];
  for (const w of WHITELIST_RULES) {
    if (w.line === undefined) {
      if (file === w.file && BRAND_TOKENS.some(t => String(value).includes(t))) out.push(w);
      else if (file === w.file && w.id === 'WL-4' && BRAND_TOKENS.some(t => String(value).includes(t))) out.push(w);
    } else if (file === w.file && line === w.line) out.push(w);
  }
  // 品牌专有名词跨档命中 (任何档位)
  if (BRAND_TOKENS.some(t => String(value).includes(t)) && !out.some(o => o.id === 'WL-4')) {
    out.push(WHITELIST_RULES[3]);
  }
  return out;
}

/**
 * rendersChineseFAQ 判定 (content 档子标记) —— ★ 严格版 (v2)
 * = 该 content 值**会渲染出中文 FAQ**
 *
 * 【严格定义】命中的 CJK 字符必须落在 **FAQ 结构体内**, 而非同值内的正文段落:
 *   证据 A: HTML 问答块 (`<strong>Q…：` 或 `<h3>Q…：` 起, 到下一个 Q / </div> / <h2 前的整块) 内含 CJK
 *   证据 B: FAQPage JSON-LD 的 `"name"` / `"text"` (即 Question / Answer 文本) 内含 CJK
 * 【为什么必须严格】v1 的宽松判据 (「值内出现 FAQ 字样」) 把「值里提到 4 FAQs」当成了「FAQ 里有中文」,
 *   实测把 40 个条目全判为 true —— 那正是上一版 C 档 (7 笔) 被推翻的同类错误。
 * 【实测 (2026-09-19)】按严格判据, 8 档内**没有任何一处**中文落在 FAQ 结构体内 ⇒ true = 0。
 */
function rendersChineseFAQ(value, cjkChars) {
  const v = String(value);
  if (!/[\u3400-\u4dbf\u4e00-\u9fff]/.test(String(cjkChars || ''))) return { render: false, reason: '该值 content 档 CJK 为空' };
  const ev = [];
  let m;
  const blockRe = /<strong>\s*Q\s*\d*\s*[:：][\s\S]{0,1500}?(?=<strong>\s*Q\s*\d*\s*[:：]|<\/div>|<h2|$)/gi;
  while ((m = blockRe.exec(v)) !== null) if (CJK.test(m[0])) ev.push({ kind: 'html-QA-block', at: m.index });
  const h3Re = /<h3>\s*Q\s*\d*\s*[:：][\s\S]{0,1500}?(?=<h3>\s*Q\s*\d*\s*[:：]|<h2|$)/gi;
  while ((m = h3Re.exec(v)) !== null) if (CJK.test(m[0])) ev.push({ kind: 'h3-QA-block', at: m.index });
  const lds = v.match(/application\/ld\+json[\s\S]*?<\/script>/g) || [];
  for (const blk of lds) {
    if (!/FAQPage/.test(blk)) continue;
    const qa = /"(?:name|text)"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
    let q;
    while ((q = qa.exec(blk)) !== null) if (CJK.test(q[1])) ev.push({ kind: 'FAQPage-JSONLD', at: q.index, text: q[1].slice(0, 80) });
  }
  return ev.length
    ? { render: true, reason: ev.map(e => e.kind + '@' + e.at).join(' + '), evidence: ev }
    : { render: false, reason: 'CJK 全部落在 FAQ 结构体之外 (正文段落)' };
}

module.exports = { CJK, CJK_G, cjkCount, BUCKETS, FIELD_BUCKET, isJsonLd, SIMP_HINT, WHITELIST_RULES, BRAND_TOKENS, whitelistMatch, rendersChineseFAQ };
