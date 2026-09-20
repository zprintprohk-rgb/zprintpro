// 分诊 4: BRAND_LOCALE_MISMATCH 的 seo-zh-hk-subfield 58 处 —— 逐条分类 (只读)
// 依据 (per AGENTS.md 2026-09-14 K3 第 3 次澄清 + brand-guard.js L88):
//   - ZprintPro 是域名前缀/品牌词, **zh-hk 页面正文**出现 ZprintPro 单现 = 合法保留 (客户记域名)
//   - **仅 title 类字段** (title/seoTitle/metaTitle/title_zh/h1) 禁 ZprintPro
//   ⇒ 归类: (a) title 类字段内 = 真违规  (b) 正文/description/keywords = 疑假阳性(需按规则放行)  (c) ja 段残留 = 真违规
const fs = require('node:fs');

const REPORT = [];
function classify(file) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  const out = { title: [], bodyish: [], ja: [], other: [] };
  // 逐行扫 (门童也是按行给 line 号)
  lines.forEach((ln, i) => {
    for (const tok of ['ZprintPro', '智印港', 'ジープリント']) {
      let idx = ln.indexOf(tok);
      while (idx >= 0) {
        // 跳过纯注释行与文档注释
        const isComment = /^\s*(\/\/|\*|\/\*)/.test(ln);
        // 判断所在字段名 (行内最近一个 key:)
        const before = ln.slice(0, idx);
        const km = [...before.matchAll(/([A-Za-z_][A-Za-z0-9_]*|'zh-hk'|'en'|'ja'|"zh-hk"|"en"|"ja")\s*:/g)];
        const key = km.length ? km[km.length - 1][1].replace(/['"]/g, '') : '(无)';
        const isTitleKey = /^(title|title_zh|title_en|title_ja|seoTitle|metaTitle|metaTitle_zh|metaTitle_en|metaTitle_ja|h1)$/.test(key);
        const isJaScope = /'ja'|"ja"/.test(before.slice(-160));
        const rec = { file, line: i + 1, tok, key, snippet: ln.trim().slice(0, 120) };
        if (isComment) out.other.push({ ...rec, why: '注释行' });
        else if (tok === '智印港' && isJaScope) out.ja.push({ ...rec, why: 'ja 段出现 zh-hk 品牌' });
        else if (isTitleKey) out.title.push({ ...rec, why: 'title 类字段 (规则明禁)' });
        else out.bodyish.push({ ...rec, why: `字段=${key} (正文类, 规则允许单现)` });
        idx = ln.indexOf(tok, idx + tok.length);
      }
    }
  });
  return out;
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('用法: node scripts/diag-brand-subfield-classify.cjs <file1> [file2] ...');
  process.exit(1);
}
let T = 0;
for (const f of files) {
  const r = classify(f);
  const n = r.title.length + r.bodyish.length + r.ja.length + r.other.length;
  T += n;
  console.log(`\n═══ ${f}  (命中 ${n}) ═══`);
  console.log(`  🔴 title 类字段: ${r.title.length}`);
  r.title.slice(0, 6).forEach((x) => console.log(`      L${x.line} ${x.key} | ${x.snippet}`));
  console.log(`  🔴 ja 段挂 zh-hk 品牌: ${r.ja.length}`);
  r.ja.slice(0, 6).forEach((x) => console.log(`      L${x.line} ${x.key} | ${x.snippet}`));
  console.log(`  🟢 正文类 (规则允许): ${r.bodyish.length}`);
  r.bodyish.slice(0, 4).forEach((x) => console.log(`      L${x.line} ${x.key} | ${x.snippet}`));
  console.log(`  ⚪ 注释行: ${r.other.length}`);
}
console.log(`\n合计 ${T} 处。⚠️ 归类依据 = 行内最近字段名 + ja 作用域启发式, 仅供分诊; 落盘前须逐条人读 (避坑 13)。`);
console.log('⚠️ 本工具只读。真违规项须按品牌分层修复; 正文类若规则允许则**不得**为凑数而改 (避坑 15 子串命中≠应改)。');
