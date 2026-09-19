/**
 * B3 前置: FAQ 格式预检 (K3 2026-09-19 评估第三点)
 *
 * 为什么预检: foil × 3 要新写正文 FAQ 段。若写入后才发现格式不被 extractor 识别,
 *   就会产生「写了 FAQ 但线上仍无 FAQPage」的静默失败 —— 正是本项目已踩过两次的坑。
 * 本脚本用 **与 page.tsx 生产正则同源** 的表达式对模拟文本做本地解析测试, 通过后再写入 content。
 *
 * 覆盖用例:
 *   ① 标准形态 `<p><strong>Q1: 问?</strong><br/>A: 答</p>`         → 应命中
 *   ② 带 class 的 <p>                                              → 应命中 (2026-09-19 放宽)
 *   ③ 无 <br/> (仅换行)                                            → 应命中 (放宽后可选)
 *   ④ 全角冒号 Ｑ：/ Ａ：                                          → 应命中
 *   ⑤ 无序号 Q:/A:                                                 → 应命中
 *   ⑥ 反例: <li><strong>问?</strong>答</li>                        → 必须 0 命中
 *   ⑦ 反例: <p><strong>问?</strong>无 A 标记</p>                   → 必须 0 命中
 *   ⑧ 反例: 答案里含 </p> 跨段                                          → 必须 0 命中 (非贪婪边界)
 */
const PROD_RE = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*A[0-9]*\s*[:：]\s*([\s\S]*?)<\/p>/gi;

const cases = [
  { name: '① 标准 Q1:/A: + <br/>', html: '<p><strong>Q1: 燙金最少印幾多個?</strong><br/>A: 100 個起印, 金箔 HK$0.30-0.50/個。</p>', expect: 1 },
  { name: '② 带 class 的 p', html: '<p class="mb-3"><strong>Q1: 100 個起印嗎?</strong><br/>A: 是, 100 個起印。</p>', expect: 1 },
  { name: '③ 无 <br/>', html: '<p><strong>Q2: 交期幾耐?</strong>A: 5-7 個工作天, 急件 3 天。</p>', expect: 1 },
  { name: '④ 全角冒号 + 全角序号', html: '<p><strong>Q3：可否打樣？</strong><br/>A：可以, 免費打樣。</p>', expect: 1 },
  { name: '⑤ 无序号', html: '<p><strong>Q: 出口歐美要什麼認證?</strong><br/>A: EU REACH + US Lacey Act。</p>', expect: 1 },
  { name: '⑥ 反例 <li> 列表形态', html: '<ol><li><strong>100 個起印嗎?</strong> 是, 100 個起印。</li></ol>', expect: 0 },
  { name: '⑦ 反例 无 A 标记', html: '<p><strong>交期幾耐?</strong> 5-7 個工作天。</p>', expect: 0 },
  { name: '⑧ 反例 跨段 (答案另起 <p>)', html: '<p><strong>Q1: 交期?</strong></p><p>A: 5-7 天。</p>', expect: 0 },
];

let pass = 0;
let fail = 0;
for (const c of cases) {
  const got = (c.html.match(PROD_RE) || []).length;
  const ok = got === c.expect;
  console.log(`${ok ? '✅' : '🔴'} ${c.name}: 命中 ${got} (期望 ${c.expect})`);
  if (!ok) {
    fail++;
    console.log(`     输入: ${c.html}`);
  } else pass++;
}
console.log(`\n预检结果: PASS ${pass} / FAIL ${fail}`);
console.log('结论: 若 FAIL=0 ⇒ 按 ①-⑤ 形态写入即可被 page.tsx extractFaqFromHtml 解析 ⇒ 线上会生成 FAQPage。');
console.log('⚠️ 写入内容时严禁 ⑥⑦⑧ 三种形态 (会导致「写了 FAQ 但线上无 FAQPage」的静默失败)。');
process.exit(fail ? 1 : 0);
