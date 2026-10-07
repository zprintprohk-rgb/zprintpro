// vm compile to get exact line/col of syntax error
const fs = require('fs');
const vm = require('vm');
let t = fs.readFileSync('F:/zprintpro-nextjs/.hermes/_debug-newText.ts', 'utf8');
t = t.replace(/^import[^\n]*\n/m, '');
t = t.replace(/export interface SkuSeoEntry \{[\s\S]*?\n\}\n/, '');
t = t.replace(/export const skuSeoData: Record<string, SkuSeoEntry> =/, 'const skuSeoData =');
t = t.split('export function getSkuSeo')[0].replace(/;\s*$/, '') + '\nmodule.exports = skuSeoData;';
try {
  new vm.Script(t, { filename: 'newText.js' });
  console.log('COMPILE OK');
} catch (e) {
  console.log('COMPILE ERR:', e.message, '| stack head:', e.stack.split('\n')[0]);
  const lm = /newText\.js:(\d+)/.exec(e.stack);
  if (lm) {
    const ln = parseInt(lm[1]);
    const L = t.split('\n');
    for (let i = Math.max(0, ln - 9); i < Math.min(L.length, ln + 2); i++)
      console.log((i + 1).toString() + (i + 1 === ln ? '>> ' : ': ') + L[i].slice(0, 160));
  } else {
    console.log('no line match; stack:', e.stack.split('\n').slice(0, 4).join(' || '));
  }
}
