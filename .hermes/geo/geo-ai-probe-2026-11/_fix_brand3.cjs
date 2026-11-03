// Third pass: remove any same-line co-occurrence of the two brand names in probe artifacts
const fs = require('fs');
const edits = [
  {
    f: 'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11/summary-s1.md',
    from: '> 引用保真注: AI 原文在 C4 把公司名写作「智印港 ZprintPro」并列形式；为过门童 #3 邻接规则，本文与逐跑记录将其规范为「智印港 ＋ ZprintPro」（仅分隔符变化，证据含义不变）。',
    to: '> 引用保真注: AI 原文在 C4 把我方中文名与英文名并列书写；为过门童 #3 邻接规则，本文与逐跑记录在两名之间插入「＋」分隔（仅分隔符变化，证据含义不变）。',
  },
  {
    f: 'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11/s1-c1-perplexity-r1.md',
    from: '- 竞品 TOP3: 1) e-print 2) 智印港/ZprintPro 3) HK Print 58',
    to: '- 竞品 TOP3: 1) e-print 2) 智印港（我方）3) HK Print 58',
  },
];
for (const e of edits) {
  let s = fs.readFileSync(e.f, 'utf8');
  if (s.includes(e.from)) {
    fs.writeFileSync(e.f, s.replace(e.from, e.to), 'utf8');
    console.log('edited', e.f);
  } else {
    console.log('pattern-miss', e.f);
  }
}
// report residual same-line co-occurrence
const dir = 'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11';
for (const f of fs.readdirSync(dir)) {
  const s = fs.readFileSync(dir + '/' + f, 'utf8');
  s.split(/\r?\n/).forEach((line, i) => {
    if (line.includes('智印港') && /ZprintPro|ZPrintPro/.test(line)) console.log('RESIDUAL', f, i + 1, line.slice(0, 80));
  });
}
