/**
 * B2 前置测量: 线上每篇 Pillar 页面 FAQPage 出现次数 + 归属 (生成区 / content 注入区)
 *
 * 为什么必须先测: Google 指南「每个页面只应有一个 FAQPage 元素」, 多个实例触发
 * "Duplicate field FAQPage"; 若线上已存在「内嵌 + 生成」双 FAQPage, strip 内嵌的优先级要提高。
 * K3 2026-09-19 评估指出: 因 FAQ 报告 2026-06 已结束, GSC 可能不再报此错 ⇒ 只能自己测。
 *
 * 判据 (三态, 绝不把「没测到」当 0):
 *   count > 1  ⇒ DUPLICATE (重复标记已存在)
 *   count = 1  ⇒ SINGLE_<来源> (生成区 = OK; 仅内嵌 = strip 会归零, 必须等生成侧就绪)
 *   count = 0  ⇒ NONE (无 FAQPage)
 *   无法切分容器 / 响应不合格 ⇒ INVALID (网络或口径问题, 不计入统计)
 *
 * 用法: node .hermes/_probe-pb/measure-live-faqpage.mjs [--slug=<slug>]
 */
import fs from 'fs';

const SITE = process.env.ZP_SITE_BASE || 'https://zprintpro.com';
const PILLARS = [
  'packaging-box-pricing-2026',
  'sticker-material-pvc-vinyl-removable',
  'poster-printing-guide',
  'campus-education-printing-pillar-guide',
  'foil-stamping-3-applications-2026',
];
const LOCALES = ['zh-hk', 'en', 'ja'];
const slugArg = (process.argv.find(a => a.startsWith('--slug=')) || '').split('=')[1];
const slugs = slugArg ? [slugArg] : PILLARS;

const countType = (html, type) => (html.match(new RegExp(`"@type"\\s*:\\s*"${type}"`, 'g')) || []).length;

const rows = [];
for (const locale of LOCALES) {
  for (const slug of slugs) {
    const url = `${SITE}/${locale}/blog/${slug}/`;
    let html = '';
    try {
      const ac = new AbortController();
      const t = setTimeout(() => ac.abort(), 15000);
      const res = await fetch(url, { signal: ac.signal, headers: { 'user-agent': 'zprintpro-probe/1.0' } });
      html = await res.text();
      clearTimeout(t);
      if (res.status !== 200) { rows.push({ locale, slug, verdict: 'INVALID', why: `HTTP ${res.status}` }); continue; }
      if (html.length < 20000) { rows.push({ locale, slug, verdict: 'INVALID', why: `len ${html.length} < 20000` }); continue; }
    } catch (e) { rows.push({ locale, slug, verdict: 'INVALID', why: `fetch 失败: ${e.message}` }); continue; }

    const marker = html.match(/<div[^>]*class="[^"]*blog-content[^"]*"/);
    if (!marker) { rows.push({ locale, slug, verdict: 'INVALID', why: '未找到 blog-content 容器 marker' }); continue; }
    const generated = html.slice(0, marker.index);
    const injected = html.slice(marker.index);

    const gFaq = countType(generated, 'FAQPage');
    const iFaq = countType(injected, 'FAQPage');
    const total = gFaq + iFaq;
    let verdict;
    if (total > 1) verdict = 'DUPLICATE';
    else if (total === 1) verdict = gFaq === 1 ? 'SINGLE_GENERATED' : 'SINGLE_INLINE_ONLY';
    else verdict = 'NONE';
    rows.push({
      locale, slug, verdict,
      generated_faq: gFaq, inline_faq: iFaq,
      generated_types: [...new Set((generated.match(/"@type"\s*:\s*"([A-Za-z]+)"/g) || []).map(s => s.split('"')[3]))].join(','),
      inline_blocks: (injected.match(/application\/ld\+json/g) || []).length,
      len: html.length,
    });
    await new Promise(r => setTimeout(r, 350)); // 串行 + 间隔 (防 CF 限流 → 假 0)
  }
}

console.log(JSON.stringify(rows, null, 1));
const ok = rows.filter(r => r.verdict !== 'INVALID');
const tally = {};
for (const r of ok) tally[r.verdict] = (tally[r.verdict] || 0) + 1;
console.log('\n--- 汇总 (有效样本 %d / %d) ---', ok.length, rows.length);
console.log('三态分布:', JSON.stringify(tally));
console.log('DUPLICATE (内嵌+生成双 FAQPage):', ok.filter(r => r.verdict === 'DUPLICATE').map(r => `${r.locale}/${r.slug}`).join(' | ') || '无');
console.log('SINGLE_INLINE_ONLY (strip 会归零, 必须等生成侧就绪):', ok.filter(r => r.verdict === 'SINGLE_INLINE_ONLY').map(r => `${r.locale}/${r.slug}`).join(' | ') || '无');
console.log('NONE:', ok.filter(r => r.verdict === 'NONE').map(r => `${r.locale}/${r.slug}`).join(' | ') || '无');
console.log('INVALID (不计入):', rows.filter(r => r.verdict === 'INVALID').map(r => `${r.locale}/${r.slug}(${r.why})`).join(' | ') || '无');

const out = `.hermes/reports/live-faqpage-duplicate-count-${new Date().toISOString().slice(0, 10)}.json`;
fs.writeFileSync(out, JSON.stringify({ generated_at: new Date().toISOString(), site: SITE, rows }, null, 1), 'utf8');
console.log('\n[证据留档]', out);
