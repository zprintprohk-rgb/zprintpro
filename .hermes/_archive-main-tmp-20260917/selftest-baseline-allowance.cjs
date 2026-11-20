#!/usr/bin/env node
/* E2E 组合测试 (门禁可用性 + 有效性的决定性一对):
 *  A) 触碰含存量 title 面双品牌的 src/data/products.ts 的「合法改动」 -> 必须可提交 (基线扣减生效)
 *  B) 在 src/ 注入一条**新增**双品牌 -> 必须被拦 (基线以外的增量)
 * 每步都做清理并校验工作树干净。
 */
const fs = require('fs');
const { execSync } = require('child_process');
const ROOT = 'F:\\zprintpro-main-tmp';
const PR = ROOT + '\\src\\data\\products.ts';
const TMP = ROOT + '\\src\\data\\__baseline-selftest.ts';
const sh = (cmd) => { try { return { code: 0, out: execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) }; } catch (e) { return { code: e.status === undefined ? 1 : e.status, out: (e.stdout || '') + (e.stderr || '') }; } };

// ---- A) 合法改动: products.ts 追加一行注释
const orig = fs.readFileSync(PR, 'utf8');
fs.appendFileSync(PR, '\n// baseline-selftest: 合法注释行 (E2E 门禁测试, 待回滚)\n', 'utf8');
sh('git add src/data/products.ts');
const a = sh('git commit -m "test: baseline allowance e2e (A)"');
const aOk = a.code === 0;
console.log(`A) 合法改动提交: exit=${a.code} -> ${aOk ? 'PASS (基线内双品牌未拦)' : 'FAIL (被误拦)'}`);
if (!aOk) console.log(a.out.split(/\r?\n/).filter(l => /🔴|门童|❌/.test(l)).slice(0, 6).join('\n'));
if (aOk) sh('git reset --soft HEAD~1');
sh('git reset HEAD src/data/products.ts');
fs.writeFileSync(PR, orig, 'utf8');

// ---- B) 新增双品牌
fs.writeFileSync(TMP, 'export const x = "新增违规 智印港 ZprintPro";\n', 'utf8');
sh(`git add "src/data/__baseline-selftest.ts"`);
const b = sh('git commit -m "test: new dual brand e2e (B)"');
const bBlocked = b.code !== 0;
console.log(`B) 新增双品牌提交: exit=${b.code} -> ${bBlocked ? 'PASS (被拦)' : 'FAIL (漏拦!)'}`);
if (bBlocked) console.log(b.out.split(/\r?\n/).filter(l => /门童 #3|品牌|❌|新增/.test(l)).slice(0, 5).join('\n'));
sh('git reset HEAD "src/data/__baseline-selftest.ts"');
fs.unlinkSync(TMP);

const st = sh('git status --short');
const dirty = st.out.split(/\r?\n/).filter(l => l.trim() && !/public\/sitemap|\.hermes\//.test(l));
console.log(`\n清理后非预期改动: ${dirty.length ? dirty.join(' | ') : '(无)'}`);
console.log(`\n组合测试结论: ${aOk && bBlocked ? 'PASS — 基线内放行 + 增量拦截 (门禁可用且有效)' : 'FAIL'}`);
process.exit(aOk && bBlocked ? 0 : 1);
