// .hermes/_foodguide_audit.cjs — 现有食品包裝指南 12 段骨架体检
const fs = require('fs');
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  const p = j['food-packaging-printing-guide'];
  const c = p.content || '';
  const h2 = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h3 = (c.match(/<h3/g) || []).length;
  const links = [...c.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  const faq = (c.match(/<strong>Q[:：]/g) || []).length + (c.match(/Q[:：]/g) || []).length;
  const tables = (c.match(/<table/g) || []).length;
  const lists = (c.match(/<li/g) || []).length;
  const qa = /快速答案|Quick [Aa]nswer|クイック回答/.test(c);
  console.log(`\n===== ${l} | len=${c.length} h3=${h3} tables=${tables} li=${lists} qa=${qa}`);
  console.log('h2 (' + h2.length + '):');
  h2.forEach((x, i) => console.log(`  ${i + 1}. ${x.slice(0, 60)}`));
  console.log('links:', links.join(' '));
  // 风险词
  const risky = ['SGS', 'ISO 9001', '15 年', '15年', '1,000+', '12 大行業', '海德堡', 'FSC-C', 'GSC', 'pos ', 'imps', '國際頂級'];
  console.log('risky:', risky.filter(w => c.includes(w)).join(',') || '(none)');
  // 真值
  console.log('truths: 100起=', /100\s*(個|張|枚)?\s*起/.test(c), '| 350g=', c.includes('350'), '| 3-5=', /3-5\s*(個工作日|個工作天|工作天)/.test(c), '| 裡印=', c.includes('裡印'));
}
