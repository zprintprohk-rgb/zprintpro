const fs = require('fs');
const path = require('path');
const { equiv } = require(path.join(__dirname, '..', 'scripts', 'guards', 'title-equiv.js'));
for (const loc of ['zh-hk', 'en', 'ja']) {
  const obj = JSON.parse(fs.readFileSync('src/data/blog-data/' + loc + '.json', 'utf8'));
  const e = obj['zine-small-batch-booklet-printing-guide'];
  console.log(loc + ': raw=' + e.description.length + ' equiv=' + equiv(e.description));
  console.log('   ' + e.description);
}
// guard 规则
const g = fs.readFileSync('scripts/guards/i18n-guard.js', 'utf8');
const i = g.indexOf('META_LENGTH');
console.log('\n=== I18N_META_LENGTH 规则上下文 ===');
console.log(g.slice(Math.max(0, i - 900), i + 400));
