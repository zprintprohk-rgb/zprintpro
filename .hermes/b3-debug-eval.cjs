// v3: use generator's own loadTsFromText on preview file
const fs = require('fs');
const txt = fs.readFileSync('F:/zprintpro-nextjs/.hermes/_regen-merge-preview.ts', 'utf8');
let t = txt.replace(/^import[^\n]*\n/m, '');
t = t.replace(/export interface SkuSeoEntry \{[\s\S]*?\n\}\n/, '');
t = t.replace(/export const skuSeoData: Record<string, SkuSeoEntry> =/, 'const skuSeoData =');
t = t.split('export function getSkuSeo')[0].replace(/;\s*$/, '');
const mod = { exports: {} };
try {
  new Function('module', 'exports', t + '\nmodule.exports = skuSeoData;')(mod, mod.exports);
  console.log('EVAL OK, keys:', Object.keys(mod.exports).length);
} catch (e) {
  console.log('ERR:', e.message);
  const lm = e.stack.match(/<anonymous>:(\d+)/);
  if (lm) {
    const ln = parseInt(lm[1]);
    const lines = t.split('\n');
    for (let i = Math.max(0, ln - 8); i < Math.min(lines.length, ln + 2); i++) {
      console.log((i + 1).toString() + (i + 1 === ln ? '>> ' : ': ') + lines[i].slice(0, 150));
    }
  }
}
