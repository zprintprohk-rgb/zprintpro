// .hermes/_plan_audit.cjs — 两周方案逐项落地状态快照
const fs = require('fs');
const g = (p) => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
const products = g('src/data/products.ts');
const faqs = g('src/data/product-faqs.ts');
const seo = g('src/data/category-seo-content.ts');
const out = [];
const add = (k, v) => out.push(`${k}: ${v}`);

// 1 faqSchema 死字段
add('products.ts faqSchema 计数', (products.match(/faqSchema/g) || []).length);
add('product-faqs.ts skuMoneyFAQs keys', (faqs.match(/^  '[a-z0-9-]+': \{/gm) || []).length);

// 2 年賀状
const nengajoFiles = fs.readdirSync('src/app/[locale]').filter(x => /nengajo|nenga/i.test(x));
add('年賀状 route dirs', JSON.stringify(nengajoFiles));
const nengaFlag = (g('src/data/products.ts').match(/NENGAJO_LIVE/g) || []).length;
add('NENGAJO_LIVE refs(products)', nengaFlag);
const envHit = fs.existsSync('.env.local') ? (fs.readFileSync('.env.local', 'utf8').match(/NENGAJO_LIVE\s*=\s*(\w+)/) || []) : [];
add('NENGAJO_LIVE(.env.local)', envHit[1] || 'n/a');

// 3 C107 / doujinshi
const appDirs = fs.readdirSync('src/app/[locale]').filter(x => /c107|doujin|comiket/i.test(x));
add('C107/doujin route dirs', JSON.stringify(appDirs));

// 4 blog 清单
const blogs = JSON.parse(g('src/data/blog-data/zh-hk.json') || '{}');
const slugs = Object.keys(blogs);
const probe = ['nenga', 'c107', 'comiket', 'doujin', 'calendar-size', '月曆', 'holiday', 'red-packet', '利是', 'paper-bag', '紙袋'];
probe.forEach(p => {
  const hit = slugs.filter(s => s.includes(p));
  add(`blog slug ~${p}`, hit.length ? hit.join(',') : '(none)');
});

// 5 b1c 台账
try {
  const led = JSON.parse(g('.hermes/logs/b1c-queue-progress.json'));
  const entries = led.entries || led.queue || led;
  const arr = Array.isArray(entries) ? entries : Object.values(entries);
  add('b1c entries', arr.length);
  const st = {};
  arr.forEach(e => { const k = e.status || e.verdict || '?'; st[k] = (st[k] || 0) + 1; });
  add('b1c status', JSON.stringify(st));
} catch (e) { add('b1c 台账', 'parse fail: ' + e.message); }

// 6 簇8 残留关键串
add('seo 中「100 本起」', (seo.match(/100\s*本起/g) || []).length);
add('seo 中 HK\$28 族', (seo.match(/HK\$28/g) || []).length);
add('outdoor-posters faqSchema?', (products.match(/outdoor-posters[\s\S]{0,400}faqSchema/) ? 'has' : 'no'));

console.log(out.join('\n'));
