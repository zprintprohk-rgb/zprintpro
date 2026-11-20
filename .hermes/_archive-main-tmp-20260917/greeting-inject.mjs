/* 注入 6 贺卡 SKU 深入优化: title + description 替换 (3 locale, 分行格式)
   seo 段内 locale 顺序固定 zh-hk → en → ja; 每 locale: title 行先于 description 行 */
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('.hermes/greeting-proposals.json', 'utf8'));
const PATH = 'src/data/sku-seo-data.ts';
let ts = fs.readFileSync(PATH, 'utf8');

const hw = (s) => [...s].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);
const LOCS = ['zh-hk', 'en', 'ja'];

let changed = 0;
for (const [slug, d] of Object.entries(data)) {
  const keyRe = new RegExp('"' + slug + '"\\s*:\\s*\\{');
  const m = keyRe.exec(ts);
  if (!m) { console.log(`!! 未找到 ${slug}`); continue; }
  // 找 entry 块
  let depth = 0, i = m.index + m[0].length - 1;
  for (; i < ts.length; i++) { if (ts[i] === '{') depth++; else if (ts[i] === '}') { depth--; if (depth === 0) break; } }
  const block = ts.slice(m.index, i + 1);
  // 找 seo 段
  const seoIdx = block.indexOf('"seo"');
  if (seoIdx < 0) { console.log(`!! ${slug} 无 seo`); continue; }
  let sDepth = 0, si = block.indexOf('{', seoIdx);
  for (; si < block.length; si++) { if (block[si] === '{') sDepth++; else if (block[si] === '}') { sDepth--; if (sDepth === 0) break; } }
  const seoSection = block.slice(seoIdx, si + 1);
  const seoLines = seoSection.split('\n');
  let locIdx = 0;
  const newLines = seoLines.map((line) => {
    const tm = line.match(/^(\s*)"title":\s*"((?:[^"\\]|\\.)*)"(\s*,?)/);
    if (tm && locIdx < 3) {
      const t = d[`${LOCS[locIdx] === 'zh-hk' ? 'zh' : LOCS[locIdx]}_t`];
      changed++;
      return `${tm[1]}"title": "${t}"${tm[3]}`;
    }
    const dm = line.match(/^(\s*)"description":\s*"((?:[^"\\]|\\.)*)"(\s*,?)/);
    if (dm && locIdx < 3) {
      const desc = d[`${LOCS[locIdx] === 'zh-hk' ? 'zh' : LOCS[locIdx]}_d`];
      changed++;
      locIdx++;
      return `${dm[1]}"description": "${desc}"${dm[3]}`;
    }
    return line;
  });
  const newSeo = newLines.join('\n');
  if (newSeo !== seoSection) ts = ts.slice(0, m.index) + block.replace(seoSection, newSeo) + ts.slice(i + 1);
}
fs.writeFileSync(PATH, ts, 'utf8');
console.log(`替换 ${changed} 处 (期望 18)`);

// 验证
let ok = 0, bad = 0;
for (const [slug, d] of Object.entries(data)) {
  const m = new RegExp('"' + slug + '"\\s*:\\s*\\{').exec(ts);
  let depth = 0, i = m.index + m[0].length - 1;
  for (; i < ts.length; i++) { if (ts[i] === '{') depth++; else if (ts[i] === '}') { depth--; if (depth === 0) break; } }
  const block = ts.slice(m.index, i + 1);
  for (const loc of LOCS) {
    const lm = block.match(new RegExp('"' + loc + '"\\s*:\\s*\\{[\\s\\S]*?"title":\\s*"((?:[^"\\\\]|\\\\.)*)"[\\s\\S]*?"description":\\s*"((?:[^"\\\\]|\\\\.)*)"'));
    if (!lm) { console.log(`!! ${slug} ${loc} 未匹配`); bad++; continue; }
    const t = JSON.parse('"' + lm[1] + '"');
    const desc = JSON.parse('"' + lm[2] + '"');
    const n = hw(t);
    const pass = n >= 50 && n <= 54 && desc.length >= 150 && desc.length <= 160 && (loc === 'zh-hk' ? t.endsWith('智印港') && !t.includes('ZprintPro') : t.endsWith('ZprintPro'));
    pass ? ok++ : bad++;
    if (!pass) console.log(`✗ ${slug} ${loc} title=${n} desc=${desc.length}字 | ${t}`);
  }
}
console.log(`验证: 通过 ${ok}/18`);
