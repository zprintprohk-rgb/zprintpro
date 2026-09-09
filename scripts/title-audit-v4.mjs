/**
 * title-audit-v4.mjs — 全站标题 v4 写满原则审计 + 补词提案 (2026-09-09)
 * 口径: docs/2026-09-09-k3-title-rule-v4-write-full.md §一 (CJK×2; 写满区 50-54 / ≥55 禁加 / 55-60 遗留只读 / 60-80 待修剪 / <50 按序补)
 * blog 口径: SSoT 第二部分 (50-60 chars, guard #12)
 * 冻结: 8/30 批 32001e17 (seo.ts 类目 titles) + 9/4 摘果批 + 9/3-9/8 近改 (幂等铁律 #3)
 * 用法: node scripts/title-audit-v4.mjs [--emit]  (--emit = 生成补词提案)
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const equiv = (s) => [...s].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// ---- 冻结集 (git 实证 2026-09-09) ----
const FROZEN_SKU = new Set(['premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards', 'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards']);
const FROZEN_BLOG = new Set(['campus-education-printing-pillar-guide', 'foil-stamping-3-applications-2026', 'hong-kong-printing-cost-baseline-2026', 'kraft-paper-box-types-comparison-2026', 'print-specifications-reference-guide-2026', 'greeting-card-buying-guide']);

// ---- GSC 实证 (9/3 canonical, 3m 桶) ----
let gsc = {};
try {
  const g = JSON.parse(read('GSC数据/gsc-fresh-2026-09-03.json'));
  const buckets = g?.data?.['3m'] || {};
  const pick = buckets.all?.queries || buckets.all || [];
  for (const q of pick) if (q.query) gsc[q.query] = { imps: q.imps || 0, clicks: q.clicks || 0, pos: q.pos || 999 };
} catch (e) { console.error('[warn] GSC load fail:', e.message); }
const gscQuery = (q) => gsc[q] || null;

const CLUSTER = {
  stickers: { zh: ['貼紙'], en: ['sticker'], ja: ['ステッカー', 'シール'] },
  flyers: { zh: ['傳單', '單張'], en: ['flyer', 'leaflet'], ja: ['チラシ'] },
  packaging: { zh: ['包裝盒', '紙盒', '禮盒'], en: ['box', 'packaging'], ja: ['箱', 'パッケージ'] },
  'paper-bags': { zh: ['紙袋'], en: ['paper bag'], ja: ['紙袋'] },
  posters: { zh: ['海報'], en: ['poster'], ja: ['ポスター'] },
  books: { zh: ['書籍', '畫冊', '騎馬釘', '膠裝'], en: ['book', 'catalog', 'booklet'], ja: ['書籍', 'カタログ', '冊子'] },
  calendars: { zh: ['月曆', '月歷', '日曆'], en: ['calendar'], ja: ['カレンダー'] },
  'red-packets': { zh: ['利是封'], en: ['red packet', 'envelope'], ja: ['ポチ袋', '封筒'] },
  menus: { zh: ['餐牌', '菜單'], en: ['menu'], ja: ['メニュー'] },
  banners: { zh: ['橫幅', '橫額', '易拉'], en: ['banner'], ja: ['バナー'] },
  envelopes: { zh: ['信封'], en: ['envelope'], ja: ['封筒'] },
  educational: { zh: ['教材', '證書', '校園', '校簿', '校刊'], en: ['education', 'school', 'certificate'], ja: ['教育', '学校'] },
  'japan-doujin': { zh: ['同人'], en: ['doujin'], ja: ['同人'] },
  'greeting-cards': { zh: ['賀卡', '賀咭'], en: ['greeting'], ja: ['グリーティング', 'カード'] },
  'wedding-invitations': { zh: ['喜帖', '婚禮'], en: ['wedding', 'invitation'], ja: ['結婚', 'ブライダル'] },
  'place-cards': { zh: ['枱卡', '台卡', '席位'], en: ['place card', 'table card'], ja: ['席札', '席カード'] },
};
const clusterOf = (slug, cat) => CLUSTER[cat || ''] || null;
function gscLongtail(cat, locale) {
  const cl = CLUSTER[cat];
  if (!cl) return [];
  const toks = cl[locale === 'zh-hk' ? 'zh' : locale === 'en' ? 'en' : 'ja'] || [];
  const out = [];
  for (const [q, v] of Object.entries(gsc)) {
    if (v.imps < 4) continue;
    if (!toks.some((t) => q.toLowerCase().includes(t.toLowerCase()))) continue;
    // T1/T2 采购意图启发: 含印刷/訂製/printing/custom 等钱词, 排除纯信息词
    if (!/印刷|訂製|訂做|订制|printing|print|custom|作成|製作/.test(q)) continue;
    out.push({ q, ...v });
  }
  return out.sort((a, b) => b.imps - a.imps).slice(0, 6);
}

// ---- 提取 ----
const results = [];
const push = (r) => results.push(r);

// 1) sku-seo-data.ts (活 title 主源, 79 SKU)
const skuTxt = read('src/data/sku-seo-data.ts');
const skuStarts = [...skuTxt.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
skuStarts.push({ slug: '__END__', idx: skuTxt.length });
for (let i = 0; i < skuStarts.length - 1; i++) {
  const { slug } = skuStarts[i];
  const seg = skuTxt.slice(skuStarts[i].idx, skuStarts[i + 1].idx);
  const catM = seg.match(/"category":\s*"([^"]+)"/);
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const tm = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    if (tm) push({ type: 'sku', slug, locale: loc, title: tm[1].replace(/\\"/g, '"'), cat: catM?.[1] || '' });
  }
}

// 2) blog-posts.ts (meta.title 权威)
const blogTxt = read('src/data/blog-posts.ts');
const blogRe = /slug: '([a-z0-9-]+)'[\s\S]{0,600}?title: \{\s*'zh-hk': '((?:[^'\\]|\\.)*)',\s*en: '((?:[^'\\]|\\.)*)',\s*ja: '((?:[^'\\]|\\.)*)'/g;
let bm;
while ((bm = blogRe.exec(blogTxt)) !== null) {
  const [_, slug, zh, en, ja] = bm;
  push({ type: 'blog', slug, locale: 'zh-hk', title: zh, cat: '' });
  push({ type: 'blog', slug, locale: 'en', title: en, cat: '' });
  push({ type: 'blog', slug, locale: 'ja', title: ja, cat: '' });
}

// 3) seo.ts: homeMetadata + categorySeoData.titles (8/30 批冻结)
const seoTxt = read('src/lib/seo.ts');
const homeRe = /title: '((?:[^'\\]|\\.)*)'/g;
const homeSeg = seoTxt.slice(seoTxt.indexOf('homeMetadata'), seoTxt.indexOf('homeMetadata') + 900);
let hm = 0; let hz;
while ((hz = homeRe.exec(homeSeg)) !== null && hm < 3) {
  push({ type: 'home', slug: 'home', locale: ['zh-hk', 'en', 'ja'][hm], title: hz[1], cat: '', frozen: true });
  hm++;
}
const catRe = /'([a-z-]+)': \{\s*\n(?:[^}]{0,400}?)titles: \{\s*\n\s*'zh-hk': '((?:[^'\\]|\\.)*)',\s*\n\s*'?en'?: '((?:[^'\\]|\\.)*)',\s*\n\s*'?(?:ja)'?: '((?:[^'\\]|\\.)*)'/g;
let cm;
while ((cm = catRe.exec(seoTxt)) !== null) {
  const [_, slug, zh, en, ja] = cm;
  push({ type: 'category', slug, locale: 'zh-hk', title: zh, cat: slug, frozen: true });
  push({ type: 'category', slug, locale: 'en', title: en, cat: slug, frozen: true });
  push({ type: 'category', slug, locale: 'ja', title: ja, cat: slug, frozen: true });
}

// ---- 测量 + 分类 ----
const SIMP = /[订后发记观为价值乐电动净丝举宪获扩据产实当画ducible]/; // 简体字形抽查
const BC_RE = /名片|咭片|business[\s-]?card|名刺/i;
const INSIGHT_RE = /FDA 級|月餅|茶葉|烘焙|保健品|手搖/;
const brandIssue = (r) => {
  const t = r.title, l = r.locale, iss = [];
  if (/智印云|智印印港/.test(t)) iss.push('品牌违禁词(智印云/智印印港)');
  if (l === 'zh-hk') {
    if (!t.includes('智印港')) iss.push('缺品牌 智印港');
    if ((t.match(/智印港/g) || []).length !== 1) iss.push('品牌非一次');
    if (t.trim().split('|').pop().trim() !== '智印港') iss.push('品牌不在末尾');
    if (/[\u3040-\u30FF]/.test(t)) iss.push('日文假名污染');
    if (SIMP.test(t)) iss.push('简体字形污染');
  } else {
    if (!t.includes('ZprintPro')) iss.push('缺品牌 ZprintPro');
    if (t.trim().split('|').pop().trim() !== 'ZprintPro') iss.push('品牌不在末尾');
    if (/智印港/.test(t) && l === 'ja') iss.push('zh-hk 品牌混入');
    if (l === 'en' && /[\u2E80-\u9FFF\u3040-\u30FF]/.test(t)) iss.push('CJK 污染 (P0)');
    if (l === 'ja' && SIMP.test(t)) iss.push('简体污染');
  }
  return iss;
};
for (const r of results) {
  const t = r.title;
  r.equiv = equiv(t);
  r.len = t.length;
  const isSkuLike = r.type === 'sku' || r.type === 'category' || r.type === 'home';
  if (isSkuLike) {
    r.band = r.equiv < 50 ? 'FILL' : r.equiv <= 54 ? 'OK' : r.equiv <= 60 ? 'LEGACY' : r.equiv <= 80 ? 'TRIM' : 'RED';
  } else {
    r.band = r.len < 50 ? 'FILL' : r.len <= 60 ? 'OK' : 'TRIM';
  }
  r.brandIssues = brandIssue(r);
  r.pollution = r.brandIssues.filter((i) => /污染/.test(i));
  r.bcHit = BC_RE.test(t);
  r.insightHit = INSIGHT_RE.test(t);
  if (r.type === 'sku' && !r.frozen) r.frozen = FROZEN_SKU.has(r.slug);
  if (r.type === 'blog' && !r.frozen) r.frozen = FROZEN_BLOG.has(r.slug);
  r.action = r.frozen ? 'FROZEN(只读至窗判)' : r.band === 'FILL' ? '补满 50-54' : r.band === 'TRIM' ? '修剪 50-54' : r.band === 'RED' ? '超格修剪' : r.brandIssues.length ? '修品牌/污染' : 'OK';
}

// ---- 汇总 ----
const by = (k) => results.reduce((m, r) => ((m[r[k]] = (m[r[k]] || 0) + 1), m), {});
const summary = {
  total: results.length,
  byType: by('type'),
  byBand: by('band'),
  byAction: by('action'),
  brandIssues: results.filter((r) => r.brandIssues.length).length,
  bcHits: results.filter((r) => r.bcHit).length,
  insightHits: results.filter((r) => r.insightHit).length,
  frozen: results.filter((r) => r.frozen).length,
};

// ---- 补词提案 (--emit) ----
const proposals = [];
if (process.argv.includes('--emit')) {
  const prodTxt = read('src/data/products.ts');
  for (const r of results) {
    if (r.frozen || r.band !== 'FILL' || r.type !== 'sku') continue;
    const pSlug = r.slug;
    const pIdx = prodTxt.indexOf(`slug: '${pSlug}'`);
    if (pIdx < 0) continue;
    const pSeg = prodTxt.slice(pIdx, pIdx + 2600);
    const g = (re) => { const m = pSeg.match(re); return m ? m[1] : null; };
    const moq = g(/minQuantity:\s*(\d+)/) || '100';
    const cap = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
    const price = g(/basePrice:\s*([\d.]+)/);
    const lts = gscLongtail(r.cat, r.locale);
    const lt = lts[0]?.q || '';
    const mainWord = r.title.split('|')[0].replace(/印刷$|Printing$|印刷$/, '').trim();
    const brand = r.locale === 'zh-hk' ? '智印港' : 'ZprintPro';
    // 工艺修饰池: 仅取 SKU 自身 features/specs 真实工艺词 (防编造, §1.3/§0.23)
    const CRAFT = ['防水', '透明', '燙金', '異形切割', '局部UV', '啞膠', '光膠', '圓角', '模切', '覆膜', '雙面', '厚紙', '環保', '即日', '騎馬釘', '膠裝', '精裝', '磁吸', '牛皮紙', '白卡'];
    const segText = (pSeg.match(/features:\s*\[[\s\S]{0,600}?\]/) || [''])[0] + ' ' + (pSeg.match(/specs:\s*\{[\s\S]{0,400}?\}/) || [''])[0];
    const crafts = [...new Set(CRAFT.filter((c) => segText.includes(c)))];
    const craftZh = crafts.slice(0, 2);
    const craftEn = { '防水': 'Waterproof', '透明': 'Clear', '燙金': 'Foil', '異形切割': 'Die-cut', '局部UV': 'Spot UV', '啞膠': 'Matte', '光膠': 'Gloss', '圓角': 'Rounded', '模切': 'Die-cut', '覆膜': 'Laminated', '雙面': 'Double-sided', '厚紙': 'Thick', '環保': 'Eco', '即日': 'Same-day', '騎馬釘': 'Saddle Stitch', '膠裝': 'Perfect Bound', '精裝': 'Hardcover', '磁吸': 'Magnetic', '牛皮紙': 'Kraft', '白卡': 'White Card' };
    const craftJa = { '防水': '防水', '透明': '透明', '燙金': '箔押し', '異形切割': '型抜き', '局部UV': '局部UV', '啞膠': 'マット', '光膠': 'グロス', '圓角': '角丸', '模切': '型抜き', '覆膜': 'ラミネート', '雙面': '両面', '厚紙': '厚紙', '環保': 'エコ', '即日': '即日', '騎馬釘': '中綴じ', '膠裝': '無線綴じ', '精裝': '上製本', '磁吸': 'マグネット', '牛皮紙': 'クラフト', '白卡': '白カード' };
    const pool = r.locale === 'zh-hk'
      ? [lt ? lt : '', ...craftZh, `${moq}起印`, price ? `HK$${price}起` : '', '4小時打稿']
      : r.locale === 'en'
      ? [lt ? cap(lt) : '', ...craftZh.map((c) => craftEn[c]), `${moq} MOQ`, 'Free Shipping $99+', 'Free Proof']
      : [lt ? lt : '', ...craftZh.map((c) => craftJa[c]), `${moq}枚〜`, price ? '最安値' : '', '無料校正'];
    const EXTRA = { 'zh-hk': ['免費打稿', '30秒報價', '全球配送', '即日交貨'], en: ['Free Proof', '30-sec Quote', 'Global Delivery'], ja: ['無料校正', '30秒見積', 'グローバル配送'] }[r.locale] || [];
    const parts = [...pool.filter(Boolean), ...EXTRA.filter((e) => !pool.includes(e))];
    const sep = r.locale === 'en' ? ' + ' : '・';
    const fixedEquiv = equiv(mainWord) + equiv(brand) + 5;
    let cand = '';
    for (const el of parts) {
      const trial = cand ? `${cand}${sep}${el}` : el;
      if (equiv(trial) + fixedEquiv <= 54) cand = trial;
    }
    for (const el of parts) {
      if (!cand.includes(el)) {
        const trial = `${cand}${sep}${el}`;
        if (equiv(trial) + fixedEquiv < 50) cand = trial;
      }
    }
    cand = `${mainWord} ${cand}`.trim();
    cand = r.locale === 'en' ? `${cand} | ZprintPro` : `${cand} | ${brand}`;
    proposals.push({ ...r, candidate: cand, candEquiv: equiv(cand), gscLongtail: lt, gscImps: lts[0]?.imps || 0, moq, price });
  }
}

// ---- 输出 ----
const outDir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'title-audit-2026-09-09.json'), JSON.stringify({ summary, results, proposals }, null, 1));
const lines = [
  `# 全站标题 v4 审计基线 (2026-09-09)`, ``,
  `数据来源: sku-seo-data.ts + blog-posts.ts + seo.ts(home/category) + GSC数据/gsc-fresh-2026-09-03.json (3m canonical); 口径 = v4 写满原则 (CJK×2)`,
  `汇总: ${JSON.stringify(summary)}`, ``,
  `## 违规明细 (非 OK)`, ``,
  `| type | slug | locale | band | 当量/len | 动作 | 问题 | title |`,
  `|---|---|---|---|---|---|---|---|`,
  ...results.filter((r) => r.action !== 'OK').map((r) => `| ${r.type} | ${r.slug} | ${r.locale} | ${r.band} | ${r.equiv}/${r.len} | ${r.action} | ${[...r.brandIssues, r.bcHit ? 'BC词' : '', r.insightHit ? '洞察词' : ''].filter(Boolean).join(';') || '-'} | ${r.title.slice(0, 60)} |`),
  ``,
  `## 补词提案 (${proposals.length})`, ``,
  ...proposals.map((p) => `- [${p.slug}/${p.locale}] ${p.equiv}→${p.candEquiv}: \`${p.title}\` ⇒ \`${p.candidate}\` (GSC: ${p.gscLongtail || '无实证'} imps=${p.gscImps})`),
];
fs.writeFileSync(path.join(outDir, 'title-audit-2026-09-09.md'), lines.join('\n'));
console.log(JSON.stringify(summary));
console.log(`FILL non-frozen: ${results.filter((r) => !r.frozen && r.band === 'FILL').length}, TRIM non-frozen: ${results.filter((r) => !r.frozen && r.band === 'TRIM' || r.band === 'RED').length}`);
console.log(`proposals: ${proposals.length}; report: .hermes/reports/title-audit-2026-09-09.md`);
