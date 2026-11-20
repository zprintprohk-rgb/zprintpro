const { execSync } = require('child_process');
const files = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
for (const f of files) {
  let s = '';
  try { s = execSync(`git show :${JSON.stringify(f)}`, { encoding: 'utf8', maxBuffer: 1 << 26 }); } catch (e) { continue; }
  const lines = s.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (/智印港/.test(line) && /ZprintPro|ジープリント/.test(line)) console.log('BOTH', f, i + 1, JSON.stringify(line.slice(0, 100)));
    else if (/ZprintPro/.test(line) && /[一-鿿]/.test(line)) console.log('ZP+CJK', f, i + 1, JSON.stringify(line.slice(0, 100)));
  });
}
console.log('scan done');
