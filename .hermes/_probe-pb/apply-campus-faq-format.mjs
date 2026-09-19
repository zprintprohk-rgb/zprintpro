/**
 * 批次 A 格式修复 · campus × 3 locale (K3 2026-09-19 指令包, 零改文案)
 *
 * 转换: `<ol class="list-decimal pl-5 space-y-1">` 内的
 *        `<li><strong>问?</strong> 答</li>`  × N
 *   →    `<p><strong>Q1: 问?</strong><br/>A: 答</p>` × N   (外层 <ol> 移除)
 *
 * 铁律 (SSoT + K3 指令):
 *  ① **答案文字逐字保留** —— 本脚本在写入前做**文本等价断言**: 剥标签后的可见文本
 *     必须与原文完全一致, 否则 abort (不写盘)。这是防「格式转换顺手改文案」的硬闸门。
 *  ② 只改包装标签: 序号显式写入 (Q1..Qn), 冒号用半角 `:`, 保留 `<br/>`。
 *  ③ 幂等: 已含 `<p><strong>Q` 的目标区间不再处理 (二次运行 byte diff = 0)。
 *  ④ 写入安全: fs.writeFileSync(..., 'utf8'), JSON.stringify 保持 2 空格缩进与原结构。
 *
 * 用法:
 *   node .hermes/_probe-pb/apply-campus-faq-format.mjs            # dry-run (只打印 diff 摘要)
 *   node .hermes/_probe-pb/apply-campus-faq-format.mjs --apply    # 写盘 + 断言
 */
import fs from 'fs';

const APPLY = process.argv.includes('--apply');
const SLUG = 'campus-education-printing-pillar-guide';
const LOCALES = ['zh-hk', 'en', 'ja'];

const stripHtml = h => String(h).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
/**
 * 归一化: 去掉**本批新增的包装标签令牌** (`Qn:` / `A:`)。
 * 铁律「答案文字逐字保留」的精确含义 = 除新增标签令牌外, 文本零变化。
 * 故断言必须先在 after 侧归一掉令牌, 再与 before 逐字比对; 直接比会把「加了标签」误判为改文案。
 */
const normalizeTokens = s => s.replace(/(^|\s)Q[0-9]+\s*[:：]\s*/g, '$1').replace(/(^|\s)A\s*[:：]\s*/g, '$1').replace(/\s+/g, ' ').trim();

function convert(content) {
  // 定位含 <li><strong> 的 <ol> 块 (只处理第一个, campus 只有 FAQ 用此形态)
  const olRe = /<ol[^>]*>([\s\S]*?)<\/ol>/g;
  let out = content;
  let convertedCount = 0;
  let m;
  while ((m = olRe.exec(content)) !== null) {
    const inner = m[1];
    const items = [...inner.matchAll(/<li>\s*<strong>([\s\S]*?)<\/strong>\s*([\s\S]*?)<\/li>/g)];
    if (!items.length) continue;
    // 仅处理「问题式」li: strong 内以 ? / ？ 结尾 (campus FAQ 形态)
    const isFaq = items.every(it => /[?？]\s*$/.test(stripHtml(it[1])));
    if (!isFaq) continue;
    const newBlock = items.map((it, i) => {
      const q = it[1].trim();
      const a = it[2].trim();          // 答案: 仅去首尾空白, 内部逐字
      return `<p><strong>Q${i + 1}: ${q}</strong><br/>A: ${a}</p>`;
    }).join('\n');
    // 文本等价断言 (第二方法): 原文该块 vs 新块, 剥标签 + 归一掉新增标签令牌后必须逐字一致
    const before = stripHtml(inner);
    const after = normalizeTokens(stripHtml(newBlock));
    if (before !== after) {
      throw new Error(`文本等价断言失败 (abort, 不写盘)\n before: ${before.slice(0, 200)}\n after : ${after.slice(0, 200)}`);
    }
    out = out.replace(m[0], newBlock);
    convertedCount += items.length;
    break; // 只处理首个匹配块, 保持幂等与可预测
  }
  return { out, convertedCount };
}

let totalConverted = 0;
for (const loc of LOCALES) {
  const p = `src/data/blog-data/${loc}.json`;
  const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  const entry = data[SLUG];
  if (!entry || !entry.content) { console.log(`⚠️  ${loc}: 无该 slug 内容`); continue; }
  const before = entry.content;
  if (/<p><strong>Q[0-9]*:/.test(before) && !/<li>\s*<strong>[\s\S]*?[?？]\s*<\/strong>/.test(before)) {
    console.log(`✅ ${loc}: 已是目标格式 (幂等, 跳过)`);
    continue;
  }
  let conv;
  try { conv = convert(before); } catch (e) {
    console.log(`🔴 ${loc}: ${e.message}`);
    process.exitCode = 1;
    continue;
  }
  if (!conv.convertedCount) { console.log(`⚠️  ${loc}: 未匹配到可转换的 FAQ 列表块`); continue; }
  const beforeText = stripHtml(before);
  const afterText = normalizeTokens(stripHtml(conv.out));
  if (beforeText !== afterText) {
    console.log(`🔴 ${loc}: 全文文本等价断言失败 (abort)`);
    process.exitCode = 1;
    continue;
  }
  console.log(`${APPLY ? '写入' : 'DRY-RUN'} ${loc}: 转换 ${conv.convertedCount} 组 | 全文可见文本 前=${beforeText.length} 后=${afterText.length} (等价 ✅)`);
  totalConverted += conv.convertedCount;
  if (APPLY) {
    entry.content = conv.out;
    // 保留文件末尾换行 (原文件以 \n 结尾; JSON.stringify 不产出, 缺了会造成整文件层面的无意义 diff)
    fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }
}
console.log(`\n合计转换 ${totalConverted} 组 | 模式=${APPLY ? 'APPLY' : 'DRY-RUN'}`);
