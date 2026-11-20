#!/usr/bin/env node
/* 只读: T 批逐点探针 (正确口径) —— 用回滚映射里的 before/after 片段逐点核验线上
 * 为什么不用「整页不得含 ZprintPro」: zh-hk 页的 hreflang/语言切换/JSON-LD alternateName 合法含 ZprintPro,
 *   整页计数必然误判 (2026-09-13 教训: 验收要看 SEO 面/具体片段, 不看整页字面)
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const H = path.join(ROOT, '.hermes');

// 1) 收集回滚映射点
const items = [];
for (const f of fs.readdirSync(H)) {
  if (!/^rollback-(T1|T1c|entity)-.*\.json$/.test(f)) continue;
  const j = JSON.parse(fs.readFileSync(path.join(H, f), 'utf8'));
  for (const it of j.items || []) {
    if (it.beforeSnippet && it.afterSnippet) items.push({ src: f, kind: 'snippet', before: it.beforeSnippet, after: it.afterSnippet, file: it.file });
    else if (it.before && it.after) items.push({ src: f, kind: 'token', before: it.before, after: it.after, file: it.file });
  }
}
// 2) 探针 URL
const pf = fs.readdirSync(H).filter(f => /^probe-T1-.*\.json$/.test(f)).sort().pop();
const targets = JSON.parse(fs.readFileSync(path.join(H, pf), 'utf8')).targets.map(t => t.url);
console.log(`回滚映射点 ${items.length} | 探针 URL ${targets.length} (清单 ${pf})\n`);

(async () => {
  const pages = [];
  for (const u of targets) {
    try {
      const r = await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-probe/1.0', 'cache-control': 'no-cache' } });
      const h = await r.text();
      pages.push({ u, status: r.status, h: (r.status === 200 && h.length > 5000) ? h : null });
    } catch (e) { pages.push({ u, status: 'ERR', h: null }); }
  }
  const live = pages.filter(p => p.h);
  console.log(`200 且正文正常: ${live.length}/${pages.length}`);
  pages.filter(p => !p.h).forEach(p => console.log(`  ✗ 非 200/正文异常: ${p.u} (${p.status})`));

  let verified = 0, pending = 0, orphan = [];
  for (const it of items) {
    // token 类片段太短 (如 "FSC C123456") 不能做归属, 用 after 出现 + before 消失判定
    const hit = live.find(p => p.h.includes(it.after));
    if (!hit) { orphan.push(it); continue; }
    if (hit.h.includes(it.before) && it.before !== it.after) { pending++; console.log(`  ⏳ ${hit.u} 仍含旧片段: ${it.before.slice(0, 50)}…`); }
    else verified++;
  }
  console.log(`\n逐点核验: 已生效 ${verified} / 未生效 ${pending} / 未匹配到页面 ${orphan.length} (共 ${items.length})`);
  orphan.slice(0, 6).forEach(o => console.log(`  ? 未匹配: [${o.kind}] ${String(o.after).slice(0, 60)}…`));
  process.exit(pending ? 1 : 0);
})();
