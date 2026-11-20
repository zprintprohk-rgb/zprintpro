// .hermes/_b1c95bc_classify.cjs — 9.5-B/C 分类清单: SGS + Heidelberg (供 K3 裁决)
const fs = require('fs');
const { execSync } = require('child_process');
const files = execSync('git ls-files src/data src/lib src/app src/components', { encoding: 'utf8' }).trim().split('\n').filter(f => /\.(ts|tsx|json)$/.test(f));
const out = { sgs: [], heidelberg: [] };
const GROUPS = { sgs: ['SGS'], heidelberg: ['Heidelberg', '海德堡'] };
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const key of Object.keys(GROUPS)) {
    for (const p of GROUPS[key]) {
      let i = 0;
      while (true) {
        const j = t.indexOf(p, i);
        if (j < 0) break;
        const ctx = t.slice(Math.max(0, j - 60), j + 60).replace(/\s+/g, ' ');
        let cls = 'general';
        if (/遷移|移行|测试|試験|tested|報告|レポート|report|test/i.test(ctx)) cls = 'test-claim';
        else if (/認證|認証|certified|certification|cert/i.test(ctx)) cls = 'cert-claim';
        out[key].push({ f: f.replace(/\\/g, '/'), cls, ctx: ctx.slice(0, 110) });
        i = j + 1;
      }
    }
  }
}
fs.writeFileSync('.hermes/logs/b1c-cluster95bc-classified-2026-10-16.json', JSON.stringify({ scanned: new Date().toISOString(), sgs: out.sgs, heidelberg: out.heidelberg }, null, 1), 'utf-8');
const cnt = a => a.reduce((m, x) => { m[x.cls] = (m[x.cls] || 0) + 1; return m; }, {});
console.log('SGS:', JSON.stringify(cnt(out.sgs)), 'total', out.sgs.length);
console.log('Heidelberg:', JSON.stringify(cnt(out.heidelberg)), 'total', out.heidelberg.length);
