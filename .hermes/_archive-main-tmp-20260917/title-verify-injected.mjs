/* 工作树版 15 SKU 注入后验证: 当量/品牌/污染/名片 */
import fs from 'node:fs';
const ts = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const proposals = JSON.parse(fs.readFileSync('.hermes/title-proposals-by-slug.json', 'utf8'));
const hw = (s) => [...s].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);
const SIMP = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('');
const BAN = ['名片', '咭片', 'business-card', 'Business Card', '名刺', 'name card'];

let ok = 0, bad = 0;
for (const [slug, locs] of Object.entries(proposals)) {
  const keyRe = new RegExp('"' + slug + '"\\s*:\\s*\\{');
  const m = keyRe.exec(ts);
  if (!m) { console.log(`!! 未找到 ${slug}`); bad++; continue; }
  let depth = 0, i = m.index + m[0].length - 1;
  for (; i < ts.length; i++) { if (ts[i] === '{') depth++; else if (ts[i] === '}') { depth--; if (depth === 0) break; } }
  const block = ts.slice(m.index, i + 1);
  const titles = [...block.matchAll(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((x) => JSON.parse('"' + x[1] + '"'));
  const [zh, en, ja] = titles;
  const expect = [locs['zh-hk'], locs.en, locs.ja];
  const names = ['zh-hk', 'en', 'ja'];
  for (let k = 0; k < 3; k++) {
    const t = titles[k];
    const e = expect[k];
    const n = hw(t);
    const brandOk = (names[k] === 'zh-hk' ? t.endsWith('智印港') && !t.includes('ZprintPro') : t.endsWith('ZprintPro'));
    const simp = SIMP.filter((c) => t.includes(c));
    const ban = BAN.filter((b) => t.toLowerCase().includes(b.toLowerCase()));
    const pass = t === e && n >= 50 && n <= 54 && brandOk && simp.length === 0 && ban.length === 0;
    if (pass) ok++; else { bad++; console.log(`✗ ${slug} ${names[k]} 当量=${n} ${t !== e ? '值不匹配' : ''} ${brandOk ? '' : '品牌✗'} ${simp.length ? '简体✗' : ''} ${ban.length ? '名片✗' : ''} | ${t}`); }
  }
}
console.log(`\n验证: 通过 ${ok} / 未过 ${bad}`);
