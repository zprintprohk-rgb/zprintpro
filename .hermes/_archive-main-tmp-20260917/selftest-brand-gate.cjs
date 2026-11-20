#!/usr/bin/env node
/* 负向测试: 故意新增双品牌 → 基线闸门必须 FAIL; 测完删除临时文件 */
const fs = require('fs');
const { execSync } = require('child_process');
const F = 'F:\\zprintpro-main-tmp\\src\\data\\__brand-gate-selftest.ts';
fs.writeFileSync(F, 'export const x = "智印港 ZprintPro 负向测试";\n', 'utf8');
let code = 0, out = '';
try {
  out = execSync('node scripts/check-brand-baseline.mjs', { cwd: 'F:\\zprintpro-main-tmp', encoding: 'utf8' });
} catch (e) {
  code = e.status === undefined ? 1 : e.status;
  out = (e.stdout || '') + (e.stderr || '');
}
fs.unlinkSync(F);
console.log(out.trim().split('\n').slice(0, 10).join('\n'));
console.log(`\n负向测试: exit=${code} → ${code === 1 ? 'PASS (正确拦截)' : 'FAIL (守卫失灵!)'}`);
process.exit(code === 1 ? 0 : 1);
