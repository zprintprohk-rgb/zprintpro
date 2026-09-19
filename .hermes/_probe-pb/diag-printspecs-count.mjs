// 诊断: dump zh-hk Q4 真实文本 + 独立计数 (确认自检读数在数哪一条)
import fs from 'fs';
const src = fs.readFileSync('.hermes/_probe-pb/add-printspecs-faq.mjs', 'utf8');

// 用动态 import 拿到 FAQ 对象 (工具导出前先取值不便; 改为按结构切块解析)
const m = src.match(/const FAQ = \{([\s\S]*?)\n\};/);
if (!m) { console.log('未匹配到 FAQ 定义'); process.exit(1); }
const body = m[1];
// 逐 locale 切
const locales = ['zh-hk', 'en', 'ja'];
const blocks = {};
for (let i = 0; i < locales.length; i++) {
  const key = locales[i];
  const start = body.indexOf(`'${key}': [`);
  const nextKeys = locales.slice(i + 1).map(k => `'${k}': [`).concat(["{", "en: [", "ja: ["]);
  let end = body.length;
  for (const nk of nextKeys) { const j = body.indexOf(nk, start + 1); if (j > 0 && j < end) end = j; }
  blocks[key] = body.slice(start, end);
}
for (const key of locales) {
  const pairs = [...blocks[key].matchAll(/\['([^']+)',\s*'([\s\S]*?)'\]/g)];
  console.log(`\n===== ${key}：抽出 ${pairs.length} 组 =====`);
  pairs.forEach((p, i) => {
    const q = p[1]; const a = p[2];
    const isCJK = /[\u4e00-\u9fff\u3040-\u30ff]/.test(a);
    const n = isCJK ? (a.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length : a.split(/\s+/).filter(Boolean).length;
    const first = a.split(/[。.！!?？]/)[0];
    const fw = isCJK ? (first.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length : first.split(/\s+/).filter(Boolean).length;
    console.log(` Q${i + 1}: 答案=${n}${isCJK ? '字' : '词'} 首句=${fw} | 问: ${q.slice(0, 34)}`);
    console.log(`     答首 46 字: ${a.slice(0, 46)}`);
  });
}
