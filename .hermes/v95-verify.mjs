// v9.5 验收: Hero 宽度对齐 Navbar 色块 + CTA 统一(自适应宽度) + 内容垂直居中 + 信任点胶囊
// 默认本地; V95_BASE 可指线上
import { execSync } from 'child_process';

const BASE = process.env.V95_BASE || 'http://127.0.0.1:3005';
const get = (u, retries = 6) => {
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

const HERO_OUT = '<section class="max-w-[1320px] mx-auto"><div class="relative w-full overflow-hidden flex min-h-[380px] md:min-h-[440px] text-white"';
const INNER = 'relative z-[1] w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12';
const WHITE_BC = 'bg-white border-b"><div class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3"';
// Navbar 蓝色色块宽度约束 (Header.tsx: max-w-[1320px] mx-auto bg-white 包裹 bg-[#2873F5])
const NAV_WRAP = 'class="max-w-[1320px] mx-auto bg-white shadow-sm"';

for (const loc of ['zh-hk', 'en', 'ja']) {
  for (const page of ['blog', 'contact']) {
    const html = get(`/${loc}/${page}/`);
    check(!!html, `${loc}/${page} 取页`);
    if (!html) continue;
    check(html.includes(HERO_OUT), `${loc}/${page} Hero 宽度 = max-w-1320 (非 w-full)`);
    check(!html.includes('<section class="w-full"><div class="relative w-full overflow-hidden flex'), `${loc}/${page} 未使用视口满宽`);
    check(html.includes(INNER), `${loc}/${page} 内容容器垂直居中 (flex justify-center + py-12)`);
    check(html.includes(NAV_WRAP), `${loc}/${page} Navbar 色块同宽约束存在 (两者同为 max-w-1320)`);
    check(!html.includes(WHITE_BC), `${loc}/${page} 无全局白条面包屑`);
    // CTA: 自适应宽度 (inline-flex + self-start), 非 w-full
    check(html.includes('inline-flex self-start items-center gap-2 rounded-xl bg-[#F87314]'), `${loc}/${page} CTA 自适应宽度 (inline-flex self-start)`);
    check(!/class="[^"]*w-full[^"]*bg-\[#F87314\][^"]*"[^>]*data-event="whatsapp_click"/.test(html), `${loc}/${page} CTA 无 w-full 撑满`);
    check(html.includes(`data-source="${page}-hero"`), `${loc}/${page} CTA 埋点 data-source=${page}-hero 保留`);
    check(html.includes('data-event="whatsapp_click"'), `${loc}/${page} CTA 埋点 data-event 保留`);
    check(html.includes('application/ld+json'), `${loc}/${page} JsonLd 保留`);
  }
  // Blog 信任点胶囊 (3 个 heroCheck)
  const blog = get(`/${loc}/blog/`);
  const pills = (blog.match(/bg-white\/15 border border-white\/30 backdrop-blur-\[2px\] px-3 py-1\.5 rounded-full/g) || []).length;
  check(pills === 3, `${loc}/blog 信任点胶囊 = 3 (实际 ${pills})`);
  // 回归: 分类胶囊仍全量换行 (24 个) — 上一轮成果不破坏
  check(blog.includes('flex flex-wrap items-center gap-2 md:gap-3'), `${loc}/blog 分类容器 flex-wrap 保留`);
  const chips = (blog.match(/rounded-full px-4 py-2 text-sm font-semibold text-white/g) || []).length;
  check(chips === 24, `${loc}/blog 分类胶囊 24 个保留 (实际 ${chips})`);
}

// 其他页面全局面包屑未误伤
check(get('/zh-hk/services/').includes('bg-white border-b'), 'services 全局面包屑未误伤');

console.log(`\n===== v9.5 验收 (BASE=${BASE}) =====`);
console.log(`PASS: ${pass}  FAIL: ${fail}`);
if (failures.length) { for (const f of failures) console.log('  ✗ ' + f); }
else console.log('ALL GREEN');
process.exit(fail === 0 ? 0 : 1);
