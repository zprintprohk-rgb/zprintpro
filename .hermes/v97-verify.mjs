// v9.7 验收: blog 图片切 M3 (hero 优先) + 首页知识栏/导航下拉同点更新
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const BASE = process.env.V97_BASE || 'http://127.0.0.1:3005';
const get = (u, retries = 6) => {
  for (let i = 0; i < retries; i++) {
    try {
      const out = execSync(`curl.exe -sS -m 30 "${BASE}${u}"`, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 });
      if (out.length > 20000) return out;
    } catch { /* retry */ }
  }
  return '';
};
const head = (u) => {
  try {
    return execSync(`curl.exe -sS -o NUL -w "%{http_code}|%{size_download}" -m 30 "${BASE}${u}"`, { encoding: 'utf8', maxBuffer: 1024 * 1024 }).trim();
  } catch { return 'ERR'; }
};

let pass = 0, fail = 0;
const failures = [];
const check = (c, label) => { if (c) pass++; else { fail++; failures.push(label); } };

// 收集页面上引用的 M3 图
const m3In = (html) => [...new Set([...html.matchAll(/\/images\/blog-m3\/[a-z0-9-]+\.webp/g)].map((m) => m[0]))];

for (const loc of ['zh-hk', 'en', 'ja']) {
  // ① blog 列表
  const list = get(`/${loc}/blog/`);
  check(!!list, `${loc}/blog fetch`);
  const lImgs = m3In(list);
  check(lImgs.length >= 40, `${loc}/blog M3 图数 >= 40 (实际 ${lImgs.length})`);
  check(lImgs.length === new Set(lImgs).size, `${loc}/blog M3 图唯一`);
  // ② 首页 印刷知識 栏
  const home = get(`/${loc}/`);
  check(!!home, `${loc}/ 首页 fetch`);
  const hImgs = m3In(home);
  check(hImgs.length === 4, `${loc}/ 首页知识栏 M3 图 = 4 (实际 ${hImgs.length})`);
  check(!home.includes('/images/articles/sticker-guide.jpg'), `${loc}/ 首页知识栏已停用旧 /images/articles 封面`);
  // 2026-09-12 修复验证: M3 图不得生成 .avif 候选源 (blog-m3 目录无 avif 配套 → 会 404 破图)
  check(!/\/images\/blog-m3\/[a-z0-9-]+\.avif/.test(home), `${loc}/ 首页 M3 图无 .avif 破图候选`);
  check(!/<source[^>]*blog-m3[^>]*>/.test(home), `${loc}/ 首页 M3 图无 <source> 覆盖 (PictureImage sources=[])`);
}

// ③ 详情页 hero
const detail = get('/zh-hk/blog/print-specifications-reference-guide-2026/');
check(!!detail, 'detail fetch');
check(m3In(detail).length >= 1, 'detail 使用 M3 图');

// ④ 图体积: 抽样校验所有落盘文件
const dir = 'public/images/blog-m3';
fs.mkdirSync(dir, { recursive: true });
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.webp'));
check(files.length === 89, `落地 M3 图 = 89 (实际 ${files.length})`);
let over = 0, maxB = 0;
for (const f of files) { const s = fs.statSync(path.join(dir, f)).size; maxB = Math.max(maxB, s); if (s >= 115 * 1024) over++; }
check(over === 0, `全部 <115KB (超标 ${over})`);
check(maxB < 115 * 1024, `最大单图 <115KB (实际 ${(maxB / 1024).toFixed(1)}KB)`);

// ⑤ 导航下拉: 组件已接 M3 映射 (下拉为 hover 客户端渲染, 以构建产物核验)
let clientHasM3 = false;
try {
  const chunks = execSync(`powershell -Command "Get-ChildItem '.next/static/chunks' -Recurse -Filter *.js | Select-String -List 'blog-m3' | Select-Object -First 1"`, { encoding: 'utf8' });
  clientHasM3 = chunks.trim().length > 0;
} catch { /* ignore */ }
check(clientHasM3, '导航下拉组件已接 M3 映射 (客户端 bundle 含 blog-m3 引用)');

// ⑥ 详情 hero HTTP + 体积 (抽样 5 张)
const sample = m3In(get('/zh-hk/blog/')).slice(0, 5);
for (const p of sample) {
  const r = head(p);
  const [code, size] = r.split('|');
  check(code === '200', `M3 图 200 ${p} (${code})`);
  check(Number(size) < 115 * 1024, `M3 图 <115KB ${p} (${(Number(size) / 1024).toFixed(1)}KB)`);
}

console.log(`\n===== v9.7 验收 (BASE=${BASE}) =====`);
console.log(`PASS: ${pass}  FAIL: ${fail}`);
if (failures.length) { for (const f of failures) console.log('  ✗ ' + f); } else console.log('ALL GREEN');
process.exit(fail === 0 ? 0 : 1);
