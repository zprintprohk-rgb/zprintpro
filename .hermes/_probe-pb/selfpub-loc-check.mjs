/**
 * TEMP validator (probe only) — .hermes/_probe-pb/selfpub-loc-check.mjs
 * Independent re-computation of every §8 metric for the zh-hk / ja deliverable.
 * Not part of src/. Reads only; writes nothing.
 */
import fs from 'fs';

const TARGET = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.zhhk-ja.json';
const EN_SRC = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.json';

/* --- halfwidth equivalent: SSoT identical to scripts/guards/title-equiv.js --- */
const FULLWIDTH = /[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/;
const equiv = (s) => [...String(s || '')].reduce((n, ch) => n + (FULLWIDTH.test(ch) ? 2 : 1), 0);

/* --- SSoT: char class identical to scripts/scan-simplified.mjs (repo 口径) --- */
const SIMPLIFIED = /[贴纸单样胶册开环烫订专质货运标号广龙极飞术复图书制厅际备养营获证读设计构团对创药饮饰农贸铁银钟学点话认长门间国时来动场带块条组编圆压头实写将觉见购销费预项须顺领顾验历里发台适]/g;

/**
 * SSoT: .hermes/title-compliance-scan.mjs SIMP list.
 * That list is zh-hk-oriented and over-broad in exactly two verified ways:
 *   (a)「算」is identical in Traditional (划算 / 計算 / 換算) -> removed for the zh-hk check;
 *   (b) 算 数 点 双 学 画 are the CORRECT Japanese shinjitai forms (數/點/雙/學/畫 are
 *       Traditional-only; Japanese writes 数・点・双・学・画) -> removed for the ja check.
 */
const SIMP_BASE = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('');
const mk = (exclude) => new RegExp('[' + SIMP_BASE.filter((c) => !exclude.includes(c)).join('') + ']', 'g');
const SIMP_ZH_ONLY = mk('算');            // zh-hk: simplified-only vs Traditional
const SIMP_JA = mk('算数点双学画');        // ja: simplified-Chinese forms that are wrong in Japanese

/* CN-only wording that must not appear inside a Japanese draft */
const CN_ONLY_JA = /质量|信息|水平|视频|软件|硬件|打印|激光|数码|发货|价格|简介|联系|我们|这个|没有|可以|因为|所以|已经|公司|经验|工厂/g;

const LOCALES = ['zh-hk', 'ja'];
const WHITELIST = [
  'category/books/',
  'category/educational/',
  'product/perfect-bound-books/',
  'product/hardcover-books/',
  'product/saddle-stitch-booklets/',
  'product/spiral-notebooks/',
  'product/catalog-printing/',
  'blog/photo-book-printing-guide/',
  'blog/childrens-picture-book-printing-guide/',
  'blog/zine-small-batch-booklet-printing-guide/',
  'blog/catalog-printing-guide/',
  'insights/hk-print-inquiry-index/',
];

const strip = (h) => String(h).replace(/<[^>]*>/g, '');
const count = (re, s) => (String(s).match(re) || []).length;
const h2s = (html) => [...String(html).matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => strip(m[1]).trim());

const QA_DIV = /<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">([\s\S]*?)<\/p><p class="text-sm">([\s\S]*?)<\/p><\/div>/g;
const FAQ_RE = /<p><strong>Q\d+[:：][\s\S]*?<\/strong><br\/?>\s*A\d*[:：][\s\S]*?<\/p>/g;

const doc = JSON.parse(fs.readFileSync(TARGET, 'utf8'));
const en = JSON.parse(fs.readFileSync(EN_SRC, 'utf8'));

/* ---------------- en reference (must not be modified) ---------------- */
const enEn = en.content.en;
const enMetrics = {
  'title.en equiv': equiv(en.title.en),
  'description.en equiv': equiv(en.description.en),
  'excerpt.en equiv': equiv(en.excerpt.en),
  'H2': h2s(enEn).length,
  'question H2': h2s(enEn).filter((s) => /[?？]/.test(s)).length,
  'tables': count(/<table[\s>]/gi, enEn),
  'thead': count(/<thead[\s>]/gi, enEn),
  'CTAs': count(/wa\.me/g, enEn),
  'FAQ': count(FAQ_RE, enEn),
  'unique inner links': new Set([...enEn.matchAll(/href="(\/[a-z-]+\/[^"]*)"/g)].map((m) => m[1])).size,
};

const report = {};
const problems = [];

for (const loc of LOCALES) {
  const t = doc.title[loc], d = doc.description[loc], x = doc.excerpt[loc], c = doc.content[loc];
  const all = c + t + d + x;
  const brandWord = loc === 'zh-hk' ? '智印港' : 'ZprintPro';
  const quickLabel = loc === 'zh-hk' ? '快速答案' : 'クイック回答';

  const uniqueLinks = [...new Set([...c.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]))];
  const offList = uniqueLinks.filter((h) => !WHITELIST.some((w) => h === `/${loc}/${w}`));

  const qa = [...c.matchAll(QA_DIV)];
  const faqs = c.match(FAQ_RE) || [];
  const h = h2s(c);
  const qH = h.filter((s) => /[?？]/.test(s));

  const r = {
    'title': t,
    'title equiv (50-58)': equiv(t),
    'title ends with brand exactly once': t.trimEnd().endsWith(brandWord) && count(new RegExp(brandWord, 'g'), t) === 1,
    'description equiv (150-160)': equiv(d),
    'excerpt equiv (120-300)': equiv(x),
    'quick-answer blocks (must be 3)': qa.length,
    'quick-answer label literal ok': qa.length > 0 && qa.every((m) => m[1].startsWith(quickLabel + '：')),
    'quick-answer division HTML shape ok': qa.length === count(/<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">/g, c),
    'H2 (>=6)': h.length,
    'question H2 (> half)': qH.length,
    'tables (>=2)': count(/<table[\s>]/gi, c),
    'thead (>=2)': count(/<thead[\s>]/gi, c),
    'FAQ (4-5)': faqs.length,
    'FAQ all match strict regex': faqs.length === count(/<p><strong>Q\d+[:：]/g, c),
    'FAQ shape exact': faqs.length === count(/<p><strong>Q\d+: /g, c) && faqs.length === count(/<\/strong><br\/>A: /g, c),
    'CTA wa.me (2-3)': count(/wa\.me/g, c),
    'CTA shape exact': count(/<a href="https:\/\/wa\.me\/8619880851334" target="_blank" rel="noopener">/g, c),
    'unique inner links (>=7)': uniqueLinks.length,
    'off-whitelist links (must be 0)': offList.length,
    'first paragraph equiv (<=200)': equiv(strip(c.split('\n\n')[0])),
    'content chars': c.length,
    'content halfwidth equiv': equiv(strip(c)),
    '<img>/<figure> (must be 0)': count(/<img|<figure/gi, all),
    '<script>/JSON-LD (must be 0)': count(/<script|application\/ld\+json/gi, all),
    'competitor/multiple-comparison (must be 0)': count(/Alibaba|阿里巴巴|淘寶|淘宝|vs\.?\s|VS\s|cheaper|便宜\s*\d|\d+\s*倍|500\+|競爭對手|竞品/gi, all),
    'GSC back-office vocab (must be 0)': count(/GSC|\bpos\s*\d|\bimps?\b|impressions?|\bCTR\b|\brank\b|\bquery\b|攻艱|攻堅|衝首頁|搜尋排名/gi, all),
    'brand: 智印印港 (must be 0)': count(/智印印港/g, all),
    'brand: dual-brand (must be 0)': /智印港[\s\S]{0,12}ZprintPro|ZprintPro[\s\S]{0,12}智印港/i.test(all) ? 1 : 0,
  };

  if (loc === 'zh-hk') {
    r['simplified (repo scripts/scan-simplified.mjs 口径, must be 0)'] = count(SIMPLIFIED, all);
    r['simplified-only vs Traditional (must be 0)'] = count(SIMP_ZH_ONLY, all);
    r['brand: ZprintPro (must be 0)'] = count(/ZprintPro/gi, all);
    r['brand: 智印港 (>=1)'] = count(/智印港/g, all);
    r['guarantee language (must be 0)'] = count(/保證|保証|承諾|確保|已具備|已完成/g, all);
    r['3-factor section 低 MOQ / 快樣品 / 透明工廠'] = ['低 MOQ', '快樣品', '透明工廠'].every((k) => c.includes(k));
  } else {
    r['brand: ZprintPro (>=1)'] = count(/ZprintPro/g, all);
    r['brand: 智印港 (must be 0)'] = count(/智印港/g, all);
    r['brand: ジープリント with ZprintPro (must be 0)'] = /ジープリント/.test(all) && /ZprintPro/.test(all) ? 1 : 0;
    r['simplified-CN forms wrong in ja (must be 0)'] = count(SIMP_JA, all);
    r['CN-only wording in ja (must be 0)'] = count(CN_ONLY_JA, all);
    r['guarantee language (must be 0)'] = count(/保証|約束|必ず|確実|保證|承諾|確保/g, all);
    r['3-factor section 小ロット / スピード校正 / 透明な工場'] = ['小ロット', 'スピード校正', '透明な工場'].every((k) => c.includes(k));
  }

  report[loc] = r;

  /* ---------------- assertions ---------------- */
  const bad = (m) => problems.push(`${loc}: ${m}`);
  const E = equiv(t);
  if (E < 50 || E > 58) bad(`title equiv ${E} outside 50-58`);
  if (!r['title ends with brand exactly once']) bad('title brand-ending check failed');
  const DE = equiv(d);
  if (DE < 150 || DE > 160) bad(`description equiv ${DE} outside 150-160`);
  const XE = equiv(x);
  if (XE < 120 || XE > 300) bad(`excerpt equiv ${XE} outside 120-300`);
  if (qa.length !== 3) bad(`quick-answer blocks ${qa.length} != 3`);
  if (!r['quick-answer label literal ok']) bad('quick-answer label literal wrong');
  if (!r['quick-answer division HTML shape ok']) bad('quick-answer div HTML shape altered');
  if (h.length < 6) bad(`H2 ${h.length} < 6`);
  if (qH.length * 2 <= h.length) bad('question H2 not more than half');
  if (r['tables (>=2)'] < 2 || r['thead (>=2)'] < 2) bad('tables/thead < 2');
  if (faqs.length < 4 || faqs.length > 5) bad(`FAQ ${faqs.length} not in 4-5`);
  if (!r['FAQ all match strict regex']) bad('FAQ strict regex mismatch');
  if (!r['FAQ shape exact']) bad('FAQ HTML shape altered');
  if (r['CTA wa.me (2-3)'] < 2 || r['CTA wa.me (2-3)'] > 3) bad(`CTA ${r['CTA wa.me (2-3)']} not in 2-3`);
  if (r['CTA shape exact'] !== r['CTA wa.me (2-3)']) bad('CTA HTML shape altered');
  if (uniqueLinks.length < 7) bad(`unique inner links ${uniqueLinks.length} < 7`);
  if (offList.length) bad(`off-whitelist links ${JSON.stringify(offList)}`);
  if (r['first paragraph equiv (<=200)'] > 200) bad('first paragraph equiv > 200');
  ['<img>/<figure> (must be 0)', '<script>/JSON-LD (must be 0)',
   'competitor/multiple-comparison (must be 0)', 'GSC back-office vocab (must be 0)',
   'brand: 智印印港 (must be 0)', 'brand: dual-brand (must be 0)',
   'guarantee language (must be 0)'].forEach((k) => { if (r[k]) bad(k); });
  if (loc === 'zh-hk') {
    if (r['simplified (repo scripts/scan-simplified.mjs 口径, must be 0)']) bad('repo-口径 simplified chars present');
    if (r['simplified-only vs Traditional (must be 0)']) bad('simplified-only chars present');
    if (r['brand: ZprintPro (must be 0)']) bad('ZprintPro present in zh-hk');
    if (!r['3-factor section 低 MOQ / 快樣品 / 透明工廠']) bad('3-factor section incomplete');
  } else {
    if (r['brand: 智印港 (must be 0)']) bad('智印港 present in ja');
    if (r['brand: ジープリント with ZprintPro (must be 0)']) bad('ジープリント + ZprintPro co-occur');
    if (r['simplified-CN forms wrong in ja (must be 0)']) bad('simplified-CN forms present in ja');
    if (r['CN-only wording in ja (must be 0)']) bad('CN-only wording present in ja');
    if (!r['3-factor section 小ロット / スピード校正 / 透明な工場']) bad('3-factor section incomplete');
  }
}

/* ---------------- output ---------------- */
console.log('EN REFERENCE (unchanged source):', JSON.stringify(enMetrics));
console.log('\nslug:', doc.slug);
console.log('category:', JSON.stringify(doc.category));
console.log('\n================ MEASURED ================');
for (const loc of LOCALES) {
  console.log('\n## ' + loc);
  for (const [k, v] of Object.entries(report[loc])) console.log('  ' + k + ': ' + JSON.stringify(v));
}
console.log('\n================ PROBLEMS ================');
console.log(problems.length ? problems.map((p) => ' - ' + p).join('\n') : ' NONE');
process.exitCode = problems.length ? 2 : 0;
