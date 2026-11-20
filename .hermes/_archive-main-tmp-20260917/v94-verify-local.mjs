// v9.4 本地验收: blog/contact hero 通栏 + 面包屑 + 分类胶囊全量换行
// 目标: http://127.0.0.1:3005
import { execSync } from 'child_process';

const BASE = 'http://127.0.0.1:3005';
const get = (u, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const out = execSync(`curl.exe -sS -m 30 "${BASE}${u}"`, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 });
      if (out.length > 20000) return out;
    } catch { /* retry */ }
  }
  return '';
};

let pass = 0, fail = 0;
const failures = [];
const check = (cond, label) => { if (cond) pass++; else { fail++; failures.push(label); } };

const WHITE_BC = 'bg-white border-b"><div class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3"';

for (const loc of ['zh-hk', 'en', 'ja']) {
  // ── /blog/ ──
  const blog = get(`/${loc}/blog/`);
  check(!!blog, `${loc}/blog/ 取页`);
  if (blog) {
    check(!blog.includes(WHITE_BC), `${loc}/blog/ 无全局白条面包屑`);
    check(blog.includes('<section class="w-full"><div class="relative w-full overflow-hidden min-h-[300px]'), `${loc}/blog/ hero 外层 w-full 通栏`);
    const hb = blog.indexOf('aria-label="breadcrumb"');
    check(hb > 0 && blog.slice(hb, hb + 300).includes('text-white/75'), `${loc}/blog/ 面包屑在 hero 内且浅色`);
    // 胶囊容器
    check(blog.includes('flex flex-wrap items-center gap-2 md:gap-3'), `${loc}/blog/ 胶囊容器 flex-wrap`);
    check(!blog.includes('overflow-x-auto pb-3 -mx-1 px-1'), `${loc}/blog/ 已移除 overflow-x-auto`);
    // 胶囊数 (含"全部文章")
    const chips = (blog.match(/rounded-full px-4 py-2 text-sm font-semibold text-white/g) || []).length;
    check(chips === 24, `${loc}/blog/ 胶囊数 = 24 (实际 ${chips})`);
  }
  // ── /contact/ ──
  const ct = get(`/${loc}/contact/`);
  check(!!ct, `${loc}/contact/ 取页`);
  if (ct) {
    check(!ct.includes(WHITE_BC), `${loc}/contact/ 无全局白条面包屑`);
    check(ct.includes('<section class="w-full"><div class="relative w-full overflow-hidden min-h-[300px]'), `${loc}/contact/ hero 外层 w-full 通栏`);
    check(!ct.includes('class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6"'), `${loc}/contact/ 已移除 1320 限宽 + pt-6`);
    const hb = ct.indexOf('aria-label="breadcrumb"');
    check(hb > 0 && ct.slice(hb, hb + 300).includes('text-white/75'), `${loc}/contact/ 面包屑在 hero 内且浅色`);
    check(ct.includes('relative z-[1] max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-10'), `${loc}/contact/ 内容内层 max-w-1320 居中`);
  }
}

// 埋点与结构红线: 两页保留既有埋点 + 表单/JsonLd 未动
const blog0 = get('/zh-hk/blog/');
const ct0 = get('/zh-hk/contact/');
check(blog0.includes('data-event="whatsapp_click"') || blog0.includes('data-cf-analytics'), 'blog 埋点保留');
check(ct0.includes('data-event="whatsapp_click"'), 'contact 埋点保留');
check(ct0.includes('application/ld+json'), 'contact JsonLd 保留');
check(blog0.includes('application/ld+json'), 'blog JsonLd 保留');
// 其他页面的全局面包屑未被误伤 (services 仍应保留)
const svc = get('/zh-hk/services/');
check(svc.includes('bg-white border-b'), 'services 全局面包屑未被误伤');

console.log(`\n===== v9.4 本地验收 =====`);
console.log(`PASS: ${pass}  FAIL: ${fail}`);
if (failures.length) { for (const f of failures) console.log('  ✗ ' + f); }
else console.log('ALL GREEN');
process.exit(fail === 0 ? 0 : 1);
