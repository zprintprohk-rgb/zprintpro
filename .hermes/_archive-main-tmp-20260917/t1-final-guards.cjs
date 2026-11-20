// T1 push 前完整验证
const { execSync } = require('child_process');
const fs = require('fs');

const run = (cmd) => {
  try { return execSync(cmd, { encoding: 'utf8', stdio: ['ignore','pipe','pipe'] }); }
  catch (e) { return (e.stdout||'') + (e.stderr||''); }
};

console.log('=== 1. blog-data-integrity ===');
console.log(run('node scripts/guards/blog-data-integrity-guard.js').split('\n').filter(l=>l.includes('✅')||l.includes('❌')).join('\n'));
console.log('\n=== 2. 12-rules (0 命中) ===');
console.log(run('node scripts/guards/blog-quality-12-rules-guard.js').split('\n').filter(l=>l.includes('命中')).join('\n') || '(无输出?)');
console.log('\n=== 3. blog-standard ===');
console.log(run('node scripts/guards/blog-standard-guard.js').split('\n').filter(l=>l.includes('✅')||l.includes('❌')||l.includes('PASS')||l.includes('FAIL')).join('\n') || '(无输出?)');
console.log('\n=== 4. internal-links-cta ===');
console.log(run('node scripts/guards/internal-links-cta-guard.js').split('\n').filter(l=>l.includes('✅')||l.includes('❌')||l.includes('PASS')||l.includes('FAIL')).join('\n') || '(无输出?)');
console.log('\n=== 5. check-content ===');
console.log(run('node scripts/check-content-guard.js').split('\n').filter(l=>l.includes('red')||l.includes('RED')||l.includes('占位')).slice(0,5).join('\n'));
console.log('\n=== 6. i18n-guard ===');
console.log(run('node scripts/guards/i18n-guard.js').trim() || '(无输出 = PASS)');
