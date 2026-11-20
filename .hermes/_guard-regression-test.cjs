const { execSync } = require('child_process');
const fs = require('fs');
const F = 'src/data/sku-seo-data.ts';
const bak = F + '.guardtest.bak';
fs.copyFileSync(F, bak);
const run = (label, fn) => {
  try { fn(); console.log(`✓ ${label}`); } catch (e) { console.log(`✗ ${label}: ${e.message.split('\n')[0]}`); }
};
// 1. kraft ja ¥240 (误植回归) — 期望 HARD PRICE_MISMATCH
run('注入 kraft ja ¥240 (误植) 并 stage', () => {
  let t = fs.readFileSync(F, 'utf8');
  t = t.replace(/クラフト紙包装箱 特注 エコ 300個〜 ¥150〜 \| ZprintPro/, 'クラフト紙包装箱 特注 エコ 300個〜 ¥240〜 | ZprintPro');
  fs.writeFileSync(F, t);
  execSync('git add src/data/sku-seo-data.ts', { stdio: 'ignore' });
});
let rc = 0;
try { execSync('node scripts/guards/title-v5-guard.js --commit', { stdio: 'pipe' }); rc = 0; } catch (e) { rc = e.status; }
console.log(`\n[test1 kraft ¥240] --commit exit=${rc} (期望 1=硬拦)`);
if (rc !== 1) console.log('  ❌ 未拦截!');
// 2. MOQ 失实 (kraft 100個〜 vs minQ 300) — 期望 HARD MOQ_BELOW_MIN
run('改 kraft ja 为 100個〜 (MOQ 失实) 并 stage', () => {
  let t = fs.readFileSync(F, 'utf8');
  t = t.replace(/クラフト紙包装箱 特注 エコ 300個〜 ¥150〜 \| ZprintPro/, 'クラフト紙包装箱 特注 エコ 100個〜 ¥150〜 | ZprintPro');
  fs.writeFileSync(F, t);
  execSync('git add src/data/sku-seo-data.ts', { stdio: 'ignore' });
});
rc = 0;
try { execSync('node scripts/guards/title-v5-guard.js --commit', { stdio: 'pipe' }); rc = 0; } catch (e) { rc = e.status; }
console.log(`\n[test2 MOQ 100<300 失实] --commit exit=${rc} (期望 1=硬拦)`);
if (rc !== 1) console.log('  ❌ 未拦截!');
// 3. 空洞词 高画質 重入 — 期望 HARD FILLER_WORD
run('注入 en Free Ship $99+ (空洞词) 并 stage', () => {
  let t = fs.readFileSync(F, 'utf8');
  t = t.replace(/Electronics Packaging Box \| From \$1\.84 \| ZprintPro/, 'Electronics Packaging Box | Free Ship $99+ | ZprintPro');
  fs.writeFileSync(F, t);
  execSync('git add src/data/sku-seo-data.ts', { stdio: 'ignore' });
});
rc = 0;
try { execSync('node scripts/guards/title-v5-guard.js --commit', { stdio: 'pipe' }); rc = 0; } catch (e) { rc = e.status; }
console.log(`\n[test3 Free Ship 空洞词重入] --commit exit=${rc} (期望 1=硬拦)`);
if (rc !== 1) console.log('  ❌ 未拦截!');
// 还原工作区 (好标题), 恢复 stage
fs.copyFileSync(bak, F);
fs.unlinkSync(bak);
execSync('git add src/data/sku-seo-data.ts', { stdio: 'ignore' });
console.log('\n已还原好标题并恢复 stage.');
