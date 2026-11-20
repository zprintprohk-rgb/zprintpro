/**
 * Step 5 验收探针 — 生成器两条硬约束
 *  ① 幂等: 连续两次生成 byte 完全一致 (diff = 0)
 *  ② 断言未过不写盘: 故意破坏 anchor -> 生成器必须 exit 1 且不写盘 (hash 不变)
 * 用法: node .hermes/_probe-pb/_step5-gen-idempotent.cjs
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const crypto = require('crypto');

const ROOT = 'F:\\zprintpro-nextjs';
const GEN = path.join(ROOT, '.hermes', '_probe-pb', 'gen-spec-i18n.cjs');
const OUT = path.join(ROOT, 'src', 'data', 'product-specs-i18n.ts');
const TR6 = path.join(ROOT, '.hermes', '_probe-pb', '_spec-tr-6.json');
const TR6_BAK = TR6 + '.negtest-bak';

const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0, 16);
const run = () => {
  try {
    const out = execFileSync(process.execPath, [GEN], { cwd: ROOT, encoding: 'utf8' });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status === undefined ? 1 : e.status, out: ((e.stdout || '') + (e.stdout ? '' : '') + (e.stderr || e.stdout || '')).toString() };
  }
};

console.log('=== ① 幂等性: 连续两次生成 ===');
const h0 = sha(OUT);
const r1 = run();
const h1 = sha(OUT);
const r2 = run();
const h2 = sha(OUT);
console.log(`  run#1 exit=${r1.code} ${r1.out.trim()}`);
console.log(`  run#2 exit=${r2.code} ${r2.out.trim()}`);
console.log(`  hash: 起始 ${h0} -> #1 ${h1} -> #2 ${h2}`);
console.log(`  幂等判定: ${h1 === h2 ? '✅ byte diff = 0' : '❌ 两次生成不一致'}`);

console.log('\n=== ② 断言未过不写盘 (故意破坏 _spec-tr-6.json 的一条 anchor) ===');
fs.copyFileSync(TR6, TR6_BAK);
const j = JSON.parse(fs.readFileSync(TR6, 'utf8'));
const firstKey = Object.keys(j)[0];
const orig = j[firstKey];
j[firstKey] = [orig[0], orig[1], 'ANCHOR-故意破坏-' + firstKey];
fs.writeFileSync(TR6, JSON.stringify(j, null, 2), 'utf8');
const hBefore = sha(OUT);
const r3 = run();
const hAfter = sha(OUT);
console.log(`  exit=${r3.code} (期望非 0)`);
console.log('  输出尾段: ' + r3.out.trim().split('\n').slice(-3).join(' | '));
console.log(`  hash 前 ${hBefore} / 后 ${hAfter} -> ${hBefore === hAfter ? '✅ 未写盘 (三件套硬约束成立)' : '❌ 断言未过却写了盘'}`);

fs.copyFileSync(TR6_BAK, TR6);
fs.unlinkSync(TR6_BAK);
const r4 = run();
const hRestore = sha(OUT);
console.log(`\n  还原 _spec-tr-6.json 后重跑 exit=${r4.code}`);
console.log(`  hash 还原后 ${hRestore} -> ${hRestore === h1 ? '✅ 与幂等值一致 (零残留)' : '❌ 与幂等值不同'}`);
const ok = h1 === h2 && r3.code !== 0 && hBefore === hAfter && hRestore === h1;
console.log(`\n=== 生成器硬约束: ${ok ? '✅ 两条全过' : '❌ 有未过项'} ===`);
process.exit(ok ? 0 : 1);
