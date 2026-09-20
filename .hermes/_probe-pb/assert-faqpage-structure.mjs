/**
 * 阶段 0.3 · Schema.org FAQPage 结构断言 (离线, 替代网络 Validator)
 * 依据 K3 2026-09-20: mainEntity 必须是数组(即使仅 1 个 Question) / mainEntity[].name 非空 / acceptedAnswer.text 存在
 * 数据源 = 线上 HTML (抓生成区, 与 page.tsx 输出一致) —— 断言失败即报告, 不静默
 */
const SITE = process.env.ZP_SITE_BASE || 'https://zprintpro.com';
const TARGETS = [
  ['zh-hk', 'foil-stamping-3-applications-2026'],
  ['en', 'foil-stamping-3-applications-2026'],
  ['ja', 'foil-stamping-3-applications-2026'],
  ['zh-hk', 'print-specifications-reference-guide-2026'],
  ['en', 'print-specifications-reference-guide-2026'],
  ['ja', 'print-specifications-reference-guide-2026'],
];

let bad = 0;
for (const [locale, slug] of TARGETS) {
  const url = `${SITE}/${locale}/blog/${slug}/`;
  try {
    const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 15000);
    const res = await fetch(url, { signal: ac.signal, headers: { 'user-agent': 'zp-assert/1.0' } });
    const html = await res.text(); clearTimeout(t);
    if (res.status !== 200 || html.length < 20000) { console.log(`❌ ${locale}/${slug}: INVALID (HTTP ${res.status} len ${html.length})`); bad++; continue; }
    const mk = html.match(/<div[^>]*class="[^"]*blog-content[^"]*"/);
    const gen = mk ? html.slice(0, mk.index) : html;
    const blocks = [...gen.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
    let faq = null; let broken = 0;
    for (const b of blocks) { try { const o = JSON.parse(b); if (o['@type'] === 'FAQPage') faq = o; } catch (e) { broken++; } }
    if (!faq) { console.log(`❌ ${locale}/${slug}: 生成区无 FAQPage (可解析块 ${blocks.length}, 损坏 ${broken})`); bad++; continue; }
    const ents = faq.mainEntity;
    const isArr = Array.isArray(ents);
    const list = isArr ? ents : (ents ? [ents] : []);
    const nameBad = list.filter(e => !e || typeof e.name !== 'string' || !e.name.trim()).length;
    const ansBad = list.filter(e => !e.acceptedAnswer || typeof e.acceptedAnswer.text !== 'string' || !e.acceptedAnswer.text.trim()).length;
    const ok = isArr && list.length >= 1 && nameBad === 0 && ansBad === 0;
    console.log(`${ok ? '✅' : '❌'} ${locale}/${slug}: mainEntity 数组=${isArr} 组数=${list.length} Q.name 空=${nameBad} A.text 缺失=${ansBad} @type=${faq['@type']}`);
    if (!ok) bad++;
  } catch (e) { console.log(`❌ ${locale}/${slug}: 请求失败 ${e.message}`); bad++; }
  await new Promise(r => setTimeout(r, 350));
}
console.log(`\n结构断言: ${bad === 0 ? 'ALL PASS ✅' : bad + ' 项失败 ❌'}`);
process.exit(bad ? 1 : 0);
