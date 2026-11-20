/**
 * cleanse-blog-fingerprints.cjs — 博客编造指纹清毒 (K3 2026-09-13 批准)
 *
 * 三项处置（全部有 K3 口径，禁自创）:
 *  ① 18,500 訂單断言 -> 区间表述「數千至逾萬」/「thousands to 10k+」/「数千〜1万件超」
 *     来源: K3 2026-09-13 口述「说过几千到1W」(§0.23: 数字必须有来源, 不得自创精确值)
 *  ② 假作者人名 (張志明 / 陳志明 / Alex Zhang / Andy Cheung) -> 机构署名
 *     zh-hk「智印港印刷工程團隊」/ en「ZprintPro Print Engineering Team」/ ja「ZprintPro 印刷エンジニアリングチーム」
 *  ③ 假 LinkedIn 链接 (linkedin.com/in/zprintpro-engineer|editor) -> 从 sameAs 数组撤除
 *
 * 安全: 备份 -> 定点替换 -> 断言 (残留 0 / 无 ,, 或 [,] 语法残渣 / JSON.parse 通过)
 * 用法: node .hermes/cleanse-blog-fingerprints.cjs            # 干跑
 *       node .hermes/cleanse-blog-fingerprints.cjs --apply
 */
const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const DIR = 'src/data/blog-data';
const FILES = ['zh-hk.json', 'en.json', 'ja.json'];

const NUM = [
  ['18,500 訂單', '數千至逾萬筆訂單'],
  ['18,500 orders', 'thousands to 10k+ orders'],
  ['18,500 件', '数千〜1万件超'],
  ['18,500件', '数千〜1万件超'],
  ['18,500', '數千至逾萬'],
];
const AUTHORS = {
  'zh-hk.json': [['張志明', '智印港印刷工程團隊'], ['Alex Zhang', '智印港印刷工程團隊']],
  'en.json': [['Alex Zhang', 'ZprintPro Print Engineering Team'], ['Andy Cheung', 'ZprintPro Print Engineering Team']],
  'ja.json': [['張志明', 'ZprintPro 印刷エンジニアリングチーム'], ['陳志明', 'ZprintPro 印刷エンジニアリングチーム'], ['Alex Zhang', 'ZprintPro 印刷エンジニアリングチーム']],
};
// 注意: 这些 URL 位于 blog content 内嵌的 JSON-LD 字符串里, 外层 JSON 中引号是**转义的** \"...\"
// 故正则必须容忍可选反斜杠 (首版只匹配非转义引号 -> 计数 0 -> 被自断言拦住, 未写入)
const LI = /,?\s*\\?"https:\/\/www\.linkedin\.com\/in\/zprintpro-(?:engineer|editor)\\?"/g;

let total = 0;
const report = [];

for (const f of FILES) {
  const p = path.join(DIR, f);
  const orig = fs.readFileSync(p, 'utf8');
  let txt = orig;
  const per = { num: 0, author: 0, li: 0 };

  for (const [from, to] of NUM) {
    const n = txt.split(from).length - 1;
    if (n) { per.num += n; txt = txt.split(from).join(to); }
  }
  for (const [from, to] of AUTHORS[f]) {
    const n = txt.split(from).length - 1;
    if (n) { per.author += n; txt = txt.split(from).join(to); }
  }
  per.li = (txt.match(LI) || []).length;
  txt = txt.replace(LI, '');

  // 断言: 残留检查
  const residue = ['18,500', '張志明', '陳志明', 'Alex Zhang', 'Andy Cheung', 'linkedin.com/in/zprintpro'];
  const left = residue.filter((r) => txt.includes(r));
  // 语法残渣检查
  const commaArtifact = /,\s*,/.test(txt) || /\[\s*,/.test(txt) || /,\s*\]/.test(txt);

  report.push({ f, per, left, commaArtifact, sizeBefore: orig.length, sizeAfter: txt.length });
  total += per.num + per.author + per.li;
  if (APPLY && !left.length && !commaArtifact) {
    fs.copyFileSync(p, p + '.bak-fingerprint-cleanse');
    fs.writeFileSync(p, txt, 'utf8');
  }
}

for (const r of report) {
  console.log(`--- ${r.f}`);
  console.log(`    数字 ${r.per.num} / 作者 ${r.per.author} / LinkedIn ${r.per.li}   体积 ${r.sizeBefore} -> ${r.sizeAfter}`);
  console.log(`    残留: ${r.left.length ? JSON.stringify(r.left) : '无 ✓'}   语法残渣: ${r.commaArtifact ? '有 ✗' : '无 ✓'}`);
}
console.log(`\n合计替换: ${total} 处  (${APPLY ? 'APPLY' : 'DRY-RUN'})`);
if (!APPLY) { console.log('加 --apply 生效 (会先写 .bak-fingerprint-cleanse)'); process.exit(0); }

// 落盘后 JSON.parse 验证 (外层 JSON 必须仍可解析)
let bad = 0;
for (const f of FILES) {
  try { JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); console.log(`  JSON.parse OK: ${f}`); }
  catch (e) { console.log(`  JSON.parse FAIL: ${f} -> ${e.message.slice(0, 90)}`); bad++; }
}
process.exit(bad ? 1 : 0);
