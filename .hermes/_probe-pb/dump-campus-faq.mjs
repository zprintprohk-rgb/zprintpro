// 只读: dump campus × 3 locale 的 FAQ 列表块原文 (为批次 A 格式转换定边界)
import fs from 'fs';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const c = d['campus-education-printing-pillar-guide'].content;
  console.log(`\n========== ${loc} ==========`);
  console.log('ol 数:', (c.match(/<ol/g) || []).length, '| ul 数:', (c.match(/<ul/g) || []).length);
  // 找 FAQ 章节 (H2 含 FAQ) 之后的第一个 ol
  const h2s = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  let faqIdx = -1;
  for (const m of h2s) { if (/FAQ/i.test(m[1])) { faqIdx = m.index; break; } }
  console.log('FAQ H2 index:', faqIdx);
  const seg = faqIdx >= 0 ? c.slice(faqIdx, faqIdx + 3000) : '';
  const olStart = seg.indexOf('<ol');
  if (olStart < 0) { console.log('未找到 ol'); continue; }
  const abs = faqIdx + olStart;
  const olEnd = c.indexOf('</ol>', abs);
  console.log('ol 绝对区间:', abs, '->', olEnd, '| 长度:', olEnd - abs);
  console.log('原文:');
  console.log(JSON.stringify(c.slice(abs, olEnd + 5)));
}
