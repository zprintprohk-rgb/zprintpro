// v9.7 线上复探: 等新图出现后跑完整验收
import { execSync } from 'child_process';
import fs from 'fs';

const BASE = 'https://zprintpro.com';
const get = (u) => {
  try { return execSync(`curl.exe -sS -m 30 "${BASE}${u}"`, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 }); } catch { return ''; }
};

// 新映射特征: 用 v5 日志里的第一篇文章的图路径做探针 (只要 blog-m3 图存在即可)
let ok = false;
for (let i = 1; i <= 40; i++) {
  const h = get('/zh-hk/blog/');
  const n = (h.match(/\/images\/blog-m3\//g) || []).length;
  console.log(`[${new Date().toISOString()}] round ${i}: len=${h.length} m3refs=${n}`);
  if (h.length > 20000 && n >= 20) { ok = true; break; }
  await new Promise((r) => setTimeout(r, 30000));
}
if (!ok) { console.log('TIMEOUT'); fs.writeFileSync('.hermes/logs/v97-probe-live.txt', `TIMEOUT ${new Date().toISOString()}\n`); process.exit(1); }

try {
  const out = execSync('node .hermes/v97-verify.mjs', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: { ...process.env, V97_BASE: BASE } });
  console.log(out);
  fs.writeFileSync('.hermes/logs/v97-probe-live.txt', `LIVE OK ${new Date().toISOString()}\n${out}`);
} catch (e) {
  const out = String(e.stdout || e.message || e);
  console.log(out);
  fs.writeFileSync('.hermes/logs/v97-probe-live.txt', `LIVE RUN ${new Date().toISOString()}\n${out}`);
}
