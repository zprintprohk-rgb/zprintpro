/**
 * poster en/ja 段锚改写 (K3 2026-09-19 决策 方案 a · 已授权)
 *
 * 为什么: 段 3 要求问句式段锚。poster 的 zh-hk 有 9 个问句式 H2, 而 en/ja 是
 *   **陈述式 H3**（名词短语分类标题）⇒ 三语**问句结构 + 标签层级双重不对齐**。
 *   外部标准: 问句式标题的 AI 引用率显著更高（LLM 训练数据大量来自 Q&A/教学材料）;
 *   多语言版本应保持相同 H1-H6 层级, 改变层级会引入不一致的关系信号。
 *
 * 改写范围 = **仅 4 个内容承载段锚**（其余 FAQ / Related Services / 日本市場対応 等工具段保持原样, 不强行问句化）:
 *   en: 1. Common Poster Sizes / 2. Paper Stock Guide / 3. Surface Finishing Options / 4. Design Tips
 *   ja: 1. ポスターの主なサイズ / 2. 用紙選定ガイド / 3. 表面加工オプション / 4. デザインポイント
 *
 * 铁律 (K3 授权范围):
 *   ① `<h3>` → `<h2>`（对齐 zh-hk 层级）; ② 去掉序号前缀（渲染层 CSS counter 统一生成编号）;
 *   ③ **标题下的答案文字逐字保留** —— 本脚本断言「除该标题行外, content 其余字节不变」;
 *   ④ 不改任何答案首句（answer-first 调整属文案改动, 本批**不做**, 另需授权）。
 *
 * 用法: node .hermes/_probe-pb/rewrite-poster-headings.mjs [--apply]
 */
import fs from 'fs';

const APPLY = process.argv.includes('--apply');

// 标题改写映射: 旧 h3 文本 (含序号) → 新 h2 文本 (问句式)
const MAP = {
  en: [
    ['1. Common Poster Sizes', 'What are the most common poster sizes?'],
    ['2. Paper Stock Guide', 'Which paper stock should you choose for posters?'],
    ['3. Surface Finishing Options', 'How much do poster surface finishing options cost?'],
    ['4. Design Tips', 'What design specs do posters need (DPI, bleed, safe zone)?'],
  ],
  ja: [
    ['1. ポスターの主なサイズ', 'ポスターの主なサイズはどれですか?'],
    ['2. 用紙選定ガイド', 'ポスターの用紙はどう選べばいいですか?'],
    ['3. 表面加工オプション', 'ポスターの表面加工オプションはどれですか?'],
    ['4. デザインポイント', 'ポスター入稿のデザイン規定（解像度・塗り足し・セーフゾーン）は?'],
  ],
};

let total = 0;
for (const loc of ['en', 'ja']) {
  const p = `src/data/blog-data/${loc}.json`;
  const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  const entry = data['poster-printing-guide'];
  if (!entry) { console.log(`⚠️  ${loc}: 无该 slug`); continue; }
  const before = entry.content;
  let out = before;
  let done = 0;
  for (const [oldT, newT] of MAP[loc]) {
    const needle = `<h3>${oldT}</h3>`;
    // 幂等: 找不到旧标题 = 已改写完成 (合法跳过, 非错误)
    if (!out.includes(needle)) { console.log(`  ✅ ${loc}: "${oldT}" 不存在 (已改写, 幂等跳过)`); continue; }
    const replacement = `<h2>${newT}</h2>`;
    // 断言: 该 needle 在文中唯一, 防误替换同名字符串
    const occurrences = out.split(needle).length - 1;
    if (occurrences !== 1) { console.log(`  🔴 ${loc}: "${oldT}" 出现 ${occurrences} 次 (期望 1), 跳过该条`); process.exitCode = 1; continue; }
    out = out.replace(needle, replacement);
    done++;
    console.log(`  ${APPLY ? '改写' : 'DRY-RUN'} ${loc}: 「${oldT}」→「${newT}」`);
  }
  // 铁律断言: 除被替换的标题行外, 其余字节逐字不变
  let restoredCheck = out;
  for (const [oldT, newT] of MAP[loc]) restoredCheck = restoredCheck.replace(`<h2>${newT}</h2>`, `<h3>${oldT}</h3>`);
  if (restoredCheck !== before) {
    console.log(`  🔴 ${loc}: 断言失败 — 除标题行外 content 被改动, abort (不写盘)`);
    process.exitCode = 1;
    continue;
  }
  console.log(`  ✅ ${loc}: 字节级断言通过 (除 ${done} 个标题行外零改动) | content ${before.length} → ${out.length}`);
  total += done;
  if (APPLY) {
    entry.content = out;
    fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }
}
console.log(`\n合计改写 ${total} 个段锚 | 模式=${APPLY ? 'APPLY' : 'DRY-RUN'}`);
