/**
 * cleanse-blog-final.cjs — 博客指纹清毒·终版 (K3 2026-09-13 三项拍板一次落地)
 *
 * ① 订单量断言: 18,500 -> 8,000+   [来源: K3 2026-09-13 拍板「按8000+」]
 * ② 假作者人名 -> 机构署名:
 *    zh-hk 智印港印刷工程團隊 / en ZprintPro Print Engineering Team / ja ZprintPro 印刷エンジニアリングチーム
 * ③ LinkedIn 全量撤除 (4 变体 59 处; K3: 「直接撤，真的 LinkedIn 也没内容」)
 *    linkedin.com/in/zprintpro-engineer ×29 / -editor ×22 / -foil-engineer ×6 / company/zprintpro ×2
 *
 * 前 3 次未写盘的教训已吸收:
 *   - URL 在内嵌 JSON-LD 里是转义引号 \"...\" -> 正则容忍 \\?
 *   - 数组删除要位置感知: 先删「带尾逗号」再删「带首逗号」
 *   - 守卫门槛改为「linkedin.com 域名=0」(不再用 linkedin 字样, 避免纯文本误拦)
 *
 * 用法: node .hermes/cleanse-blog-final.cjs [--apply]
 */
const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const DIR = 'src/data/blog-data';
const FILES = ['zh-hk.json', 'en.json', 'ja.json'];

const AUTHOR_MAP = {
  'zh-hk.json': [['張志明', '智印港印刷工程團隊'], ['Alex Zhang', '智印港印刷工程團隊']],
  'en.json': [['Alex Zhang', 'ZprintPro Print Engineering Team'], ['Andy Cheung', 'ZprintPro Print Engineering Team']],
  'ja.json': [['張志明', 'ZprintPro 印刷エンジニアリングチーム'], ['陳志明', 'ZprintPro 印刷エンジニアリングチーム'], ['Alex Zhang', 'ZprintPro 印刷エンジニアリングチーム']],
};
// 位置感知删除 (转义引号容忍)
const LI_TAIL = /\\?"https:\/\/[^"\\]*linkedin\.com\/[^"\\]*\\?",\s*/g; // 非末位
const LI_HEAD = /,\s*\\?"https:\/\/[^"\\]*linkedin\.com\/[^"\\]*\\?"/g; // 末位

const rows = [];
let grand = { num: 0, author: 0, li: 0 };

for (const f of FILES) {
  const p = path.join(DIR, f);
  const orig = fs.readFileSync(p, 'utf8');
  let txt = orig;
  const per = { num: 0, author: 0, li: 0, textWord: 0 };

  // ① 数字
  per.num = txt.split('18,500').length - 1;
  txt = txt.split('18,500').join('8,000+');

  // ② 作者
  for (const [from, to] of AUTHOR_MAP[f]) {
    const n = txt.split(from).length - 1;
    if (n) { per.author += n; txt = txt.split(from).join(to); }
  }

  // ③ LinkedIn
  per.li = (txt.match(/https:\/\/[^"\\]*linkedin\.com\/[^"\\]*/g) || []).length;
  txt = txt.replace(LI_TAIL, '').replace(LI_HEAD, '');

  // ④ 纯文本 LinkedIn 一并去掉 (K3 2026-09-13「一并去掉」)
  //    局部处理: 保留前后字符并只修补本次删除造成的空格, 不做全局 \s{2,} 压缩(防改坏表格/正文空白)
  per.wordSamples = [];
  txt.replace(/LinkedIn/gi, (m, off) => {
    if (per.wordSamples.length < 3) per.wordSamples.push(txt.slice(Math.max(0, off - 55), off + 45).replace(/\s+/g, ' '));
    return m;
  });
  per.word = (txt.match(/LinkedIn/gi) || []).length;
  txt = txt.replace(/(\S)(\s*)(?:(?:on|via|at|from|through)\s+)?LinkedIn\b(\s*)(\S)?/gi, (m, a, s1, s2, b) => (b ? a + ' ' + b : a));
  // 兜底: 行首/独立出现
  txt = txt.replace(/\s*LinkedIn\s*/gi, ' ');

  // 守卫
  const leftUrls = (txt.match(/linkedin/gi) || []).length;          // 域名+字样残留(必须 0)
  per.textWord = (txt.match(/linkedin/gi) || []).length;            // 纯文本提及(仅记录)
  const leftNum = txt.includes('18,500');
  const leftName = ['張志明', '陳志明', 'Alex Zhang', 'Andy Cheung'].filter((n) => txt.includes(n));
  const artifact = /,\s*,/.test(txt) || /\[\s*,/.test(txt) || /,\s*\]/.test(txt);

  rows.push({ f, per, leftUrls, leftNum, leftName, artifact });
  grand.num += per.num; grand.author += per.author; grand.li += per.li;

  if (APPLY && leftUrls === 0 && !leftNum && !leftName.length && !artifact) {
    fs.copyFileSync(p, p + '.bak-fingerprint-final');
    fs.writeFileSync(p, txt, 'utf8');
    rows[rows.length - 1].written = true;
  }
}

console.log(`=== 博客指纹清毒·终版 (${APPLY ? 'APPLY' : 'DRY-RUN'}) ===`);
for (const r of rows) {
  console.log(`--- ${r.f}`);
  console.log(`    数字 ${r.per.num} / 作者 ${r.per.author} / LinkedIn ${r.per.li}   写入=${r.written ? 'YES' : (APPLY ? 'NO(被守卫拦)' : '-')}`);
  console.log(`    守卫: linkedin域名残留=${r.leftUrls} 18,500残=${r.leftNum ? 'Y' : 'N'} 假名残=${r.leftName.length ? r.leftName.join(',') : '无'} 逗号残渣=${r.artifact ? '有' : '无'}`);
  console.log(`    (纯文本 linkedin 提及 ${r.per.textWord} 处, 按「撤链接留文本」口径保留)`);
}
console.log(`\n合计: 数字 ${grand.num} / 作者 ${grand.author} / LinkedIn ${grand.li}`);
if (!APPLY) { console.log('加 --apply 生效 (先备份 .bak-fingerprint-final)'); process.exit(0); }
let bad = 0;
for (const f of FILES) {
  try { JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); console.log(`  JSON.parse OK: ${f}`); }
  catch (e) { console.log(`  JSON.parse FAIL: ${f} -> ${e.message.slice(0, 80)}`); bad++; }
}
process.exit(bad ? 1 : 0);
