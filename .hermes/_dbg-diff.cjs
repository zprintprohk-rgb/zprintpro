const { execSync } = require('child_process');
const diff = execSync('git show d3f165fc -- src/data/sku-seo-data.ts', { cwd: 'F:/zprintpro-nextjs', encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
const lines = diff.split('\n');
console.log('total lines:', lines.length);
let shown = 0, titleLines = 0;
for (const raw of lines) {
  if (/^[ +-]/.test(raw)) {
    const line = raw.slice(1);
    if (/^  "[a-z0-9-]+": \{/.test(line) && shown < 5) { console.log('SLUG:', JSON.stringify(line)); shown++; }
    if (/^ {6}"(zh-hk|en|ja)": \{/.test(line) && shown < 10) { console.log('LOC:', JSON.stringify(line)); shown++; }
    if (/^ {8}"title":/.test(line)) { titleLines++; if (titleLines <= 3) console.log('TITLE:', JSON.stringify(line)); }
  }
}
console.log('titleLines found:', titleLines);
// also try looser: any line containing "title"
let anyTitle = 0;
for (const raw of lines) { if (/[+-]\s*"title":/.test(raw)) anyTitle++; }
console.log('loose +/- title lines:', anyTitle);
