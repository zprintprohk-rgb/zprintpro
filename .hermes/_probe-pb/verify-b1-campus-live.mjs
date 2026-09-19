/**
 * B1 验收 (K3 2026-09-19 口径): campus × 3 线上「生成区 FAQPage」确认
 *
 * ★ 口径注释 (必须写进验收记录):
 *   FAQPage 生成 = **AI 答案引擎可读层就绪**, 不再关联 Google 富摘要。
 *   Google 已于 2026-05 起分阶段退役 FAQ 富媒体结果 (且 2023-08 就把 FAQ 富结果
 *   限制在政府/健康类权威站点), 商业站可见 SERP 收益早已消失 —— 但 FAQPage 标记
 *   仍是 Schema.org 合法类型, Bing / PerplexityBot / 各类 RAG 爬虫照常抓取。
 */
import fs from 'fs';

const SITE = process.env.ZP_SITE_BASE || 'https://zprintpro.com';
const SLUG = 'campus-education-printing-pillar-guide';
const LOCALES = ['zh-hk', 'en', 'ja'];
const rows = [];

for (const locale of LOCALES) {
  const url = `${SITE}/${locale}/blog/${SLUG}/`;
  try {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 15000);
    const res = await fetch(url, { signal: ac.signal, headers: { 'user-agent': 'zprintpro-probe/1.0' } });
    const html = await res.text();
    clearTimeout(t);
    if (res.status !== 200 || html.length < 20000) { rows.push({ locale, verdict: 'INVALID', why: `HTTP ${res.status} len ${html.length}` }); continue; }
    const marker = html.match(/<div[^>]*class="[^"]*blog-content[^"]*"/);
    if (!marker) { rows.push({ locale, verdict: 'INVALID', why: 'no blog-content marker' }); continue; }
    const gen = html.slice(0, marker.index);
    const inj = html.slice(marker.index);
    const genFaq = (gen.match(/"@type"\s*:\s*"FAQPage"/g) || []).length;
    const injFaq = (inj.match(/"@type"\s*:\s*"FAQPage"/g) || []).length;
    // 生成区 FAQPage 的题目数 (Question 计数 = 线上实际生成的 FAQ 组数)
    const genQ = (gen.match(/"@type"\s*:\s*"Question"/g) || []).length;
    rows.push({
      locale, url, len: html.length,
      generated_faqpage: genFaq, generated_questions: genQ, inline_faqpage: injFaq,
      verdict: genFaq === 1 ? (injFaq >= 1 ? 'PASS_WITH_DUPLICATE' : 'PASS') : 'FAIL',
      note: 'FAQPage 生成 = AI 答案引擎可读层就绪, 不再关联 Google 富摘要',
    });
  } catch (e) { rows.push({ locale, verdict: 'INVALID', why: e.message }); }
  await new Promise(r => setTimeout(r, 350));
}

console.log(JSON.stringify(rows, null, 1));
const ok = rows.filter(r => r.verdict !== 'INVALID');
console.log('\n--- B1 结论 (有效 %d/%d) ---', ok.length, rows.length);
for (const r of ok) console.log(`${r.locale}: ${r.verdict} | 生成区 FAQPage=${r.generated_faqpage} (Question=${r.generated_questions}) | 内嵌 FAQPage=${r.inline_faqpage}`);
fs.writeFileSync(`.hermes/reports/b1-campus-live-faqpage-${new Date().toISOString().slice(0, 10)}.json`,
  JSON.stringify({ generated_at: new Date().toISOString(), slug: SLUG, rows }, null, 1), 'utf8');
console.log('[证据留档] .hermes/reports/b1-campus-live-faqpage-2026-09-19.json');
