// .hermes/_hub_8box.cjs — en/ja 块 8 盒型表 + 可插入点
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const pc = s.indexOf('packagingContent');
const zh = s.indexOf("'zh-hk': {", pc);
const en = zh + s.slice(zh).search(/\n\s{2}(?:'en'|en):\s*\{/);
const ja = en + s.slice(en).search(/\n\s{2}(?:'ja'|ja):\s*\{/);
const zhB = s.slice(zh, en), enB = s.slice(en, ja), jaB = s.slice(ja, ja + 14000);
console.log('bounds', { zh, en, ja }, 'lens', zhB.length, enB.length, jaB.length);
const probe = (name, b, keys) => {
  for (const k of keys) {
    const i = b.indexOf(k);
    console.log(`[${name}] "${k}" @${i}`);
    if (i >= 0) console.log('   ', JSON.stringify(b.slice(Math.max(0, i - 60), i + 200)));
  }
};
probe('en', enB, ['8 box', '8 Box', 'box types', 'White Card Box', 'Gang Run', 'magnetic']);
probe('ja', jaB, ['8 大', '8種類', 'ホワイトカード', '天地蓋', 'マグネット']);
