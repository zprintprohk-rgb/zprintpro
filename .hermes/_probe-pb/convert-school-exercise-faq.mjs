/**
 * B3 · school-exercise-book × 3 **格式转换** (K3 2026-09-19 授权: 仅改包装标签, 可自主执行)
 *
 * 现状 (实测): 正文 FAQ 用 `<h3>Qn: 问?</h3><p>A: 答</p>` ⇒
 *   `extractFaqFromHtml` 要求 `<p…><strong>Qn:</strong>…A:` ⇒ 解析 0 组 ⇒ faqs=null ⇒ FAQPage 静默丢失。
 * 修法: `<h3>Qn: 问?</h3><p>A: 答</p>` → `<p><strong>Qn: 问?</strong><br/>A: 答</p>`
 *   —— **只改包装标签** (h3→strong、两标签合一、补 <br/>); 问句与答案文字**逐字保留**。
 *
 * 铁律断言: 转换前后「剥标签后的可见文本」必须完全一致 (含 Qn: 与 A: 标记本身, 它们本来就都在)。
 * 用法: node .hermes/_probe-pb/convert-school-exercise-faq.mjs [--apply]
 */
import fs from 'fs';

const APPLY = process.argv.includes('--apply');
const SLUG = 'school-exercise-book-printing-guide';
const PAIR_RE = /<h3>\s*(Q[0-9]*\s*[:：][\s\S]*?)<\/h3>\s*<p>\s*(A[0-9]*\s*[:：][\s\S]*?)<\/p>/gi;
const stripHtml = h => String(h).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();

let issues = 0;
for (const loc of ['zh-hk', 'en', 'ja']) {
  const p = `src/data/blog-data/${loc}.json`;
  const data = JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
  const entry = data[SLUG];
  if (!entry) { console.log(`🔴 ${loc}: 无该 slug`); issues++; continue; }
  const before = entry.content;
  const pairs = [...before.matchAll(PAIR_RE)];
  if (!pairs.length) {
    console.log(`✅ ${loc}: 未发现 <h3>Qn:</h3><p>A:</p> 形态 (幂等跳过或已是目标格式)`);
    continue;
  }
  const out = before.replace(PAIR_RE, (m, q, a) => `<p><strong>${q.trim()}</strong><br/>${a.trim()}</p>`);

  // 断言 ①: 全文可见文本逐字不变
  if (stripHtml(out) !== stripHtml(before)) {
    console.log(`🔴 ${loc}: 文本等价断言失败, abort (不写盘)`);
    issues++; continue;
  }
  // 断言 ②: 转换后该区块必须能被生产正则解析, 且组数 = 原 Q 组数
  const PROD = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*A[0-9]*\s*[:：]\s*([\s\S]*?)<\/p>/gi;
  const parsed = (out.match(PROD) || []).length;
  if (parsed !== pairs.length) {
    console.log(`🔴 ${loc}: 解析组数 ${parsed} ≠ 原组数 ${pairs.length}, abort`);
    issues++; continue;
  }
  console.log(`${APPLY ? '写入' : 'DRY-RUN'} ${loc}: 转换 ${pairs.length} 组 | 解析复验 ${parsed}/${pairs.length} ✅ | content ${before.length} → ${out.length}`);
  pairs.forEach((m, i) => console.log(`   Q${i + 1}: ${m[1].replace(/<[^>]+>/g, '').trim().slice(0, 50)}`));
  if (APPLY) { entry.content = out; fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8'); }
}
console.log(`\n模式=${APPLY ? 'APPLY' : 'DRY-RUN'} | 异常=${issues}`);
process.exit(issues ? 1 : 0);
