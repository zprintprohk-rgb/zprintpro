// v9.6 验收: Blog 筛选区收纳进 navy 圆角色块 + 深底配色映射 + 回归保护
// default 本地; V96_BASE 指线上
import { execSync } from 'child_process';

const BASE = process.env.V96_BASE || 'http://127.0.0.1:3005';
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

const PANEL = 'class="w-full rounded-[18px] p-6 sm:p-8 md:p-9 text-white"';
const PANEL_STYLE = 'background:var(--color-royal-navy-grad)';
const PANEL_SHADOW = 'inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 30px rgba(15,31,61,0.24)';
const SEARCH = 'rounded-full border border-white/15 bg-white/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/50';
const CHIP_OFF = 'bg-white/10 border-white/15 text-white/90 hover:bg-white/20';
const CHIP_ON = 'bg-[#F87314] border-[#F87314] text-white shadow-md shadow-orange-500/30';

for (const loc of ['zh-hk', 'en', 'ja']) {
  const html = get(`/${loc}/blog/`);
  check(!!html, `${loc}/blog 取页`);
  if (!html) continue;

  // ── v9.6 navy 圆角容器 ──
  check(html.includes(PANEL), `${loc} navy 圆角容器外壳存在 (rounded-[18px] p-6 sm:p-8 md:p-9)`);
  check(html.includes(PANEL_STYLE), `${loc} 容器底色 = 范本B token var(--color-royal-navy-grad)`);
  check(html.includes(PANEL_SHADOW), `${loc} 容器阴影 = 范本B inset+drop shadow`);
  // 容器不得自带 max-w (禁双重限宽)
  check(!/class="w-full rounded-\[18px\][^"]*max-w-/.test(html), `${loc} 容器无自带 max-w (避免双重限宽)`);
  // 搜索条 + 计数 + 胶囊 均在该容器内 (取容器片段检查)
  const pi = html.indexOf(PANEL);
  const panelSlice = html.slice(pi, pi + 20000);
  check(panelSlice.includes(SEARCH), `${loc} 搜索框深底配色 (bg-white/10 + border-white/15 + placeholder:text-white/50)`);
  check(panelSlice.includes('text-white/50') && panelSlice.includes('<svg'), `${loc} 搜索图标 text-white/50`);
  check(panelSlice.includes('class="text-sm text-white/70 md:whitespace-nowrap"'), `${loc} 文章计数 text-sm text-white/70`);
  check(panelSlice.includes(CHIP_OFF), `${loc} 未选中胶囊 = 半透明白底 (bg-white/10 border-white/15)`);
  check(panelSlice.includes(CHIP_ON), `${loc} 选中胶囊 = 橙色实心 (#F87314)`);
  // 旧 navy 实心胶囊类必须消失
  check(!html.includes('bg-[#1D3465] border-[#1D3465]'), `${loc} 旧 navy 实心胶囊已移除`);
  check(!html.includes('bg-[#17284C] border-[#17284C]'), `${loc} 旧深 navy 选中态已移除`);
  // 搜索功能属性保留
  check(html.includes('type="search"'), `${loc} search input 保留`);
  check(html.includes('搜尋文章') || html.includes('記事を検索') || html.includes('Search articles'), `${loc} 搜索 placeholder 文案保留`);

  // ── 回归保护 (v9.4 / v9.5 成果) ──
  check(html.includes('mt-6 flex flex-wrap items-center gap-2 md:gap-3'), `${loc} 胶囊容器 flex-wrap 保留`);
  check(!html.includes('overflow-x-auto pb-3 -mx-1 px-1'), `${loc} 无 overflow-x-auto 单行截断`);
  const chips = (html.match(/rounded-full px-4 py-2 text-sm font-semibold transition-all border/g) || []).length;
  check(chips === 24, `${loc} 胶囊仍 24 个全量 (实际 ${chips})`);
  check(html.includes('max-w-[1320px] mx-auto'), `${loc} Hero/内容区 max-w-1320 保留`);
  check(html.includes('inline-flex self-start items-center gap-2 rounded-xl bg-[#F87314]'), `${loc} v9.5 CTA 共享组件样式保留`);
  check(!html.includes('bg-white border-b"><div class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3"'), `${loc} 无全局白条面包屑`);
}

console.log(`\n===== v9.6 验收 (BASE=${BASE}) =====`);
console.log(`PASS: ${pass}  FAIL: ${fail}`);
if (failures.length) { for (const f of failures) console.log('  ✗ ' + f); }
else console.log('ALL GREEN');
process.exit(fail === 0 ? 0 : 1);
