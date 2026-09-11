// blog 视觉修正与资源重构 线上探针 (2026-09-11)
// ① Hero 全宽贴边(内容1320居中) ② M3 图(三语同图/唯一/≤115KB) ③ 藏青胶囊/calendars 标签 ④ 搜索回归 ⑤ 埋点保留
import { execSync } from 'child_process';

const BASE = process.env.PROBE_BASE || 'https://www.zprintpro.com';
const fetchH = (path) => {
  const out = execSync(`curl.exe -sS -m 25 "${BASE}${path}"`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return out;
};

let pass = 0, fail = 0;
const results = [];
function check(name, ok, extra = '') {
  if (ok) { pass++; results.push(`PASS  ${name}`); }
  else { fail++; results.push(`FAIL  ${name}  ${extra}`); }
}

const lists = {
  'zh-hk': 'https://www.zprintpro.com/zh-hk/blog/',
  'en': 'https://www.zprintpro.com/en/blog/',
  'ja': 'https://www.zprintpro.com/ja/blog/',
};
const details = {
  'zh-hk': 'https://www.zprintpro.com/zh-hk/blog/rush-printing-hk-guide/',
  'en': 'https://www.zprintpro.com/en/blog/rush-printing-hk-guide/',
  'ja': 'https://www.zprintpro.com/ja/blog/rush-printing-hk-guide/',
};

for (const [loc, url] of Object.entries(lists)) {
  let html;
  try { html = fetchH(url); } catch (e) { check(`list ${loc} fetch`, false, e.message); continue; }
  check(`list ${loc} hero 全宽贴边(内容max-w-1320居中)`, html.includes('max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-10'));
  check(`list ${loc} 藏青胶囊(active #17284C)`, html.includes('bg-[#17284C]'));
  check(`list ${loc} 藏青胶囊(inactive #1D3465)`, html.includes('bg-[#1D3465]'));
  check(`list ${loc} 搜索框`, html.includes(loc === 'zh-hk' ? '搜尋文章' : loc === 'ja' ? '記事を検索' : 'Search articles'));
  check(`list ${loc} M3 图卡片`, html.includes('/images/blog-m3/'));
  check(`list ${loc} 埋点 blog-hero`, html.includes('data-source="blog-hero"'));
  check(`list ${loc} 埋点 bottom-cta`, html.includes('data-source="blog-bottom-cta"'));
  check(`list ${loc} calendars 标签`, html.includes(loc === 'zh-hk' ? '月曆印刷' : loc === 'ja' ? 'カレンダー' : 'Calendars'));
}

for (const [loc, url] of Object.entries(details)) {
  let html;
  try { html = fetchH(url); } catch (e) { check(`detail ${loc} fetch`, false, e.message); continue; }
  check(`detail ${loc} navy hero(min-h-300/400)`, html.includes('min-h-[300px] md:min-h-[400px]'));
  check(`detail ${loc} hero 面包屑首頁`, html.includes(loc === 'zh-hk' ? '首頁' : loc === 'ja' ? 'ホーム' : 'Home'));
  check(`detail ${loc} M3 图 (rush-printing-hk-guide)`, html.includes('/images/blog-m3/rush-printing-hk-guide.webp'));
  check(`detail ${loc} 单 H1 (hero)`, (html.match(/<h1/g) || []).length === 1);
  check(`detail ${loc} 相关产品仍在`, html.includes('related-products') || html.includes('相關產品'));
}

// 三语同图: 同一 slug 三语均引用同一张物理图
const srcs = {};
for (const [loc, url] of Object.entries(details)) {
  const html = fetchH(url);
  const m = html.match(/\/images\/blog-m3\/rush-printing-hk-guide\.webp/);
  srcs[loc] = m ? m[0] : '(none)';
}
check('三语同图 (rush-printing-hk-guide)', srcs['zh-hk'] === srcs['en'] && srcs['en'] === srcs['ja'] && srcs['zh-hk'].includes('rush-printing-hk-guide'), JSON.stringify(srcs));

// 唯一性: 列表卡片前 12 张图 src 无重复
for (const [loc, url] of Object.entries(lists)) {
  const html = fetchH(url);
  const imgs = [...html.matchAll(/\/images\/blog-m3\/[^"' )]+\.webp/g)].map((m) => m[0]);
  const unique = new Set(imgs);
  check(`list ${loc} 卡片图唯一 (前${Math.min(imgs.length, 12)}张)`, imgs.length === unique.size, `total=${imgs.length} uniq=${unique.size}`);
}

// 静态资源: M3 图可达 + ≤115KB
try {
  const out = execSync(`curl.exe -sS -o NUL -w "%{http_code} %{size_download}" "${BASE}/images/blog-m3/rush-printing-hk-guide.webp"`, { encoding: 'utf8' });
  const [code, size] = out.trim().split(' ');
  check('M3 图 HTTP 200 + ≤115KB', code === '200' && parseInt(size) <= 117760, `${code} ${size}`);
} catch (e) { check('M3 图 HTTP 200', false, e.message); }

// 回归: 首页/PLP/PDP 可达
for (const p of ['/zh-hk/', '/zh-hk/category/wedding-invitations/', '/zh-hk/product/waterproof-stickers/']) {
  try {
    const out = execSync(`curl.exe -sS -o NUL -w "%{http_code}" "${BASE}${p}"`, { encoding: 'utf8' });
    check(`回归 ${p} 200`, out.trim() === '200', out);
  } catch (e) { check(`回归 ${p}`, false, e.message); }
}

console.log('\n' + results.join('\n'));
console.log(`\n[${pass} passed / ${fail} failed]`);
process.exit(fail > 0 ? 1 : 0);
