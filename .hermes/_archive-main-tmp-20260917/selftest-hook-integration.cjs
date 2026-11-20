#!/usr/bin/env node
/* 集成测试: pre-commit hook 是否真能拦住「新增双品牌」的 commit (门禁 C 端到端验证)
 * 步骤: 建临时文件(含双品牌) -> git add -> git commit (预期被 hook 拦) -> 清理 (git reset + 删文件)
 */
const fs = require('fs');
const { execSync } = require('child_process');
const ROOT = 'F:\\zprintpro-main-tmp';
const REL = 'src/data/__brand-hook-selftest.ts';
const ABS = ROOT + '\\' + REL.replace(/\//g, '\\');
const sh = (cmd) => { try { return { code: 0, out: execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) }; } catch (e) { return { code: e.status === undefined ? 1 : e.status, out: (e.stdout || '') + (e.stderr || '') }; } };

fs.writeFileSync(ABS, 'export const brand = "智印港 ZprintPro 集成测试";\n', 'utf8');
sh(`git add "${REL}"`);
const res = sh('git commit -m "test: brand gate integration selftest"');
const blocked = res.code !== 0 && /门童 #3|brand-baseline|双品牌新增/.test(res.out);
console.log('commit exit =', res.code);
console.log(res.out.split(/\r?\n/).filter(l => /门童|brand|双品牌|FAIL|✅|rejected/.test(l)).slice(0, 8).join('\n'));
// 清理
sh('git reset HEAD "' + REL + '"');
fs.unlinkSync(ABS);
const st = sh('git status --short');
console.log('\n清理后 git status 是否干净(仅允许 sitemap/.hermes):');
console.log(st.out.split(/\r?\n/).filter(l => l.trim() && !/public\/sitemap|\.hermes\//.test(l)).join('\n') || '  (干净)');
console.log(`\n集成测试结论: ${blocked ? 'PASS — hook 端到端拦住新增双品牌 commit' : 'FAIL — hook 未拦住!'}`);
process.exit(blocked ? 0 : 1);
