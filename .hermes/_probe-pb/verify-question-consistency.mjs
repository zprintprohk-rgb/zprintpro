/**
 * B2 验收 · Question 语义一致性检查 (K3 2026-09-19 新增验收项)
 *
 * 为什么必须查: strip 内嵌后, AI 可读层只剩 page.tsx 生成的 FAQPage。
 *   若生成区 Question 文本与页面**可见正文**的 FAQ 文本不一致
 *   (例如生成侧读到的文本与渲染文本有细微差异), AI 爬虫可能提取到「两个版本的同一问题」⇒ 反而增加歧义。
 *   strip 的目的 = **消除实体歧义**, 不是单纯「清理重复标记」⇒ 一致性必须实测。
 *
 * 方法 (双源逐字比对):
 *   A. 生成区: 抓线上 HTML, 取 blog-content 容器之前的区域, 解析 FAQPage.mainEntity[].name
 *   B. 可见正文: 同一 HTML 的容器内, 按生产正则提取 Q&A, 取 question 侧
 *   比对: 归一化 (去标签/压缩空白/去首尾标点) 后逐条并集比对, 输出差异明细。
 *
 * 用法: node .hermes/_probe-pb/verify-question-consistency.mjs [--slug=<slug>]
 */
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

const stripHtml = h => String(h).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const norm = s => stripHtml(s).replace(/[\s，,。.？?！!：:；;、"'「」『』]/g, '').toLowerCase();
const PROD_RE = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*A[0-9]*\s*[:：]\s*([\s\S]*?)<\/p>/gi;

const rows = [];
for (const locale of LOCALES) {
  for (const slug of slugs) {
    const url = `${SITE}/${locale}/blog/${slug}/`;
    let html;
    try {
      const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 15000);
      const res = await fetch(url, { signal: ac.signal, headers: { 'user-agent': 'zprintpro-probe/1.0' } });
      html = await res.text(); clearTimeout(t);
      if (res.status !== 200 || html.length < 20000) { rows.push({ locale, slug, verdict: 'INVALID', why: `HTTP ${res.status} len ${html.length}` }); continue; }
    } catch (e) { rows.push({ locale, slug, verdict: 'INVALID', why: e.message }); continue; }

    const mk = html.match(/<div[^>]*class="[^"]*blog-content[^"]*"/);
    if (!mk) { rows.push({ locale, slug, verdict: 'INVALID', why: 'no blog-content marker' }); continue; }
    const generated = html.slice(0, mk.index);
    const injected = html.slice(mk.index);

    // A. 生成区 FAQPage 的 Question 列表
    const genFaqBlocks = [...generated.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .map(m => m[1]).filter(s => /"@type"\s*:\s*"FAQPage"/.test(s));
    let genQs = [];
    for (const b of genFaqBlocks) {
      try {
        const o = JSON.parse(b);
        const ents = o.mainEntity || [];
        for (const e of (Array.isArray(ents) ? ents : [ents])) if (e && e.name) genQs.push(e.name);
      } catch (e) { /* 解析失败 ⇒ 由门童 #14 段12 报, 此处跳过 */ }
    }
    // B. 可见正文 FAQ (生产正则)
    const visQs = [...injected.matchAll(PROD_RE)].map(m => m[1]);

    const genSet = genQs.map(norm).filter(Boolean);
    const visSet = visQs.map(norm).filter(Boolean);
    const missingInGen = visSet.filter(q => !genSet.includes(q));
    const missingInVis = genSet.filter(q => !visSet.includes(q));
    const verdict = genSet.length === 0 ? 'NO_GENERATED_FAQ'
      : (missingInGen.length || missingInVis.length) ? 'MISMATCH' : 'CONSISTENT';
    rows.push({
      locale, slug, verdict,
      generated_questions: genQs.length, visible_questions: visQs.length,
      missing_in_generated: missingInGen.slice(0, 3), missing_in_visible: missingInVis.slice(0, 3),
      inline_faqpage_remaining: (injected.match(/"@type"\s*:\s*"FAQPage"/g) || []).length,
      sample_gen: genQs[0] ? genQs[0].slice(0, 60) : null,
      sample_vis: visQs[0] ? stripHtml(visQs[0]).slice(0, 60) : null,
    });
    await new Promise(r => setTimeout(r, 350));
  }
}

console.log(JSON.stringify(rows, null, 1));
const tally = {};
for (const r of rows) tally[r.verdict] = (tally[r.verdict] || 0) + 1;
console.log('\n--- Question 一致性汇总 (15 组合) ---');
console.log(JSON.stringify(tally));
for (const r of rows.filter(x => x.verdict !== 'CONSISTENT' && x.verdict !== 'INVALID')) {
  console.log(`  ⚠️  ${r.locale}/${r.slug}: ${r.verdict} | gen=${r.generated_questions} vis=${r.visible_questions} | 内嵌 FAQPage 残留=${r.inline_faqpage_remaining}`);
  if (r.missing_in_generated && r.missing_in_generated.length) console.log(`      正文有/生成区缺: ${JSON.stringify(r.missing_in_generated)}`);
  if (r.missing_in_visible && r.missing_in_visible.length) console.log(`      生成区有/正文缺: ${JSON.stringify(r.missing_in_visible)}`);
}
const fs = await import('fs');
const out = `.hermes/reports/question-consistency-${new Date().toISOString().slice(0, 10)}.json`;
fs.writeFileSync(out, JSON.stringify({ generated_at: new Date().toISOString(), site: SITE, rows }, null, 1), 'utf8');
console.log('[证据留档]', out);
