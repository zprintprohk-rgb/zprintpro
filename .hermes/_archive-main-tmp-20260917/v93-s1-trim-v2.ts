/**
 * v9.3 H 批 · S1 v2 (修正版): quickAnswers 收紧
 * 修正点:
 *  1) 归属以「已导入数据 categoryConversionBlocks」为准 (不经文本切片推断), 避免块错位
 *  2) 只处理 quickAnswers 数组 (newFaqs 属 FAQ, 允许长答案, 不动)
 *  3) 先收集全部替换 → 统一应用 → 再做 FAQ 插入 (每步重新 indexOf, 不用旧偏移)
 * 规则: zh-hk / ja 答案 ≤60 字 (硬上限); en ≤300 字符
 * 溢出部分不丢: 作为 FAQ 详情写入同块 newFaqs
 */
import fs from 'fs';
import { categoryConversionBlocks } from '../src/data/category-conversion-blocks';

const FILE = 'F:\\zprintpro-nextjs\\src/data/category-conversion-blocks.ts';
const CAP: Record<string, number> = { 'zh-hk': 60, ja: 60, en: 300 };
const width = (s: string) => [...s].length;

function splitAnswer(a: string, cap: number) {
  if (width(a) <= cap) return { short: a, rest: '' };
  const parts = a.split(/(?<=[。！？；])/).filter(Boolean);
  let short = '';
  const rest: string[] = [];
  for (const p of parts) { if (width(short + p) <= cap) short += p; else rest.push(p); }
  if (!short) {
    const cps = a.split(/(?<=[，,、])/).filter(Boolean);
    let s = '';
    const r: string[] = [];
    for (const p of cps) { if (width(s + p) <= cap - 1) s += p; else r.push(p); }
    short = s.replace(/[，,、]\s*$/, '') + (s ? '。' : '');
    return { short, rest: (s ? a.slice(s.length) : a) };
  }
  return { short, rest: rest.join('') };
}

let text = fs.readFileSync(FILE, 'utf8');
const replacements: Array<{ from: string; to: string }> = [];
const faqByKey = new Map<string, Array<{ q: string; a: string }>>();
let overCount = 0;

for (const [key, block] of Object.entries(categoryConversionBlocks)) {
  const cap = CAP[block.locale] ?? 60;
  const list = faqByKey.get(key) || [];
  for (const qa of block.quickAnswers || []) {
    if (width(qa.a) <= cap) continue;
    overCount++;
    const { short, rest } = splitAnswer(qa.a, cap);
    if (!rest) continue;
    replacements.push({ from: `"a": ${JSON.stringify(qa.a)}`, to: `"a": ${JSON.stringify(short)}` });
    list.push({ q: qa.q, a: qa.a });
    console.log(`[${key}] ${width(qa.a)}→${width(short)}字  Q: ${qa.q.slice(0, 30)}`);
  }
  if (list.length) faqByKey.set(key, list);
}

// 唯一性校验 (避免误解其他块的同串)
let applied = 0;
for (const r of replacements) {
  const n = text.split(r.from).length - 1;
  if (n !== 1) { console.log(`  ⚠️ 原串出现 ${n} 次, 跳过: ${r.from.slice(0, 60)}`); continue; }
  text = text.replace(r.from, r.to);
  applied++;
}

// FAQ 详情插入 (全部替换完成后再做, 每次重新定位)
let faqAdded = 0;
for (const [key, list] of faqByKey) {
  const anchor = `categoryConversionBlocks['${key}'] = {`;
  const bi = text.indexOf(anchor);
  if (bi < 0) { console.log(`  ⚠️ 未找到块 ${key}`); continue; }
  const nfIdx = text.indexOf('"newFaqs": [', bi);
  if (nfIdx < 0) { console.log(`  ⚠️ 块 ${key} 无 newFaqs`); continue; }
  const insAt = text.indexOf('[', nfIdx) + 1;
  const entries = list.map((x) => `\n    { "q": ${JSON.stringify(x.q)}, "a": ${JSON.stringify(x.a)} },`).join('');
  text = text.slice(0, insAt) + entries + text.slice(insAt);
  faqAdded += list.length;
}

fs.writeFileSync(FILE, text, 'utf8');
console.log(`\n超规格答案: ${overCount} 条 | 已替换: ${applied} 条 | 转入 FAQ 详情: ${faqAdded} 条`);
