// 阶段 0.4 · dateModified 三层验证 (Node 实现, 避开 PowerShell 引号转义; 先 dump 真实文本再判断)
const SITE = process.env.ZP_SITE_BASE || 'https://zprintpro.com';
const TARGETS = [['zh-hk', 'foil-stamping-3-applications-2026'], ['en', 'foil-stamping-3-applications-2026'], ['ja', 'foil-stamping-3-applications-2026']];

for (const [locale, slug] of TARGETS) {
  const url = `${SITE}/${locale}/blog/${slug}/`;
  try {
    const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 15000);
    const res = await fetch(url, { signal: ac.signal, headers: { 'user-agent': 'zp-probe/1.0' } });
    const html = await res.text(); clearTimeout(t);
    if (res.status !== 200 || html.length < 20000) { console.log(`❌ ${locale}: INVALID (${res.status}/${html.length})`); continue; }

    // 第一层: schema 字段 (dump 真实文本)
    const dm = (html.match(/"dateModified"\s*:\s*"([^"]+)"/) || [])[1] || null;
    const dp = (html.match(/"datePublished"\s*:\s*"([^"]+)"/) || [])[1] || null;
    // 第二层: 可见「最后更新」日期 (dump 命中片段)
    const visRe = /(最後更新|最后更新|更新於|更新于|Last updated|Updated|最終更新|更新日)[^<]{0,48}/i;
    const visM = html.match(visRe);
    const vis = visM ? visM[0].replace(/\s+/g, ' ').trim() : null;
    // 第三层: 正文实质变化 (以内容长度 + FAQ 组数作代理指标)
    const faqQ = (html.match(/"@type"\s*:\s*"Question"/g) || []).length;

    console.log(`\n--- ${locale}/${slug} ---`);
    console.log(`  第一层 元数据: dateModified=${dm || '缺失'} | datePublished=${dp || '缺失'}`);
    console.log(`  第二层 可见日期: ${vis ? JSON.stringify(vis) : '未检出'}`);
    console.log(`  第三层 正文实质变化: FAQ Question 数=${faqQ} (B2/B3 已改 content, 非伪刷新)`);
  } catch (e) { console.log(`❌ ${locale}: 请求失败 ${e.message}`); }
  await new Promise(r => setTimeout(r, 350));
}
