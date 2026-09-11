/* v9.2.3 G3 探针: 等 CF deploy 完成后验收 (blog 详情 3 语言署名块/FAQPage/Article/Breadcrumb/内链) */
import { execSync } from 'child_process';

const BASE = 'https://zprintpro.com';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitDeploy(sha10) {
  const token = execSync('powershell -Command "(Get-Content F:/zprintpro-nextjs/.env | Select-String CLOUDFLARE_PAGES_TOKEN).ToString().Split(\'=\',2)[1].Trim()"', { encoding: 'utf8' }).trim();
  for (let i = 0; i < 16; i++) {
    const out = execSync(`curl.exe -s -H "Authorization: Bearer ${token}" "https://api.cloudflare.com/client/v4/accounts/32c174efaa22353f357c0fdff9d61b86/pages/projects/zprintpro/deployments?env=production&per_page=10"`, { encoding: 'utf8' });
    const deps = JSON.parse(out).result || [];
    const dep = deps.find((d) => {
      const h = d.deployment_trigger?.metadata?.commit_hash || d.commit_hash || '';
      return h.toLowerCase().startsWith(sha10.toLowerCase()) && d.environment === 'production';
    });
    if (dep) {
      const st = dep.stages || [];
      const failed = st.filter((s) => s.status === 'failure').length;
      const stMap = Object.fromEntries(st.map((s) => [s.name, s.status]));
      console.log(`poll ${i}: ${dep.id} stages build=${stMap.build} deploy=${stMap.deploy} failed=${failed}`);
      if (failed > 0) return { ok: false, dep };
      if (stMap.build === 'success' && (stMap.deploy === 'success' || stMap.deploy === 'idle' || stMap.deploy === 'active')) return { ok: true, dep };
    } else {
      console.log(`poll ${i}: sha ${sha10} not in latest deploys yet`);
    }
    await sleep(60000);
  }
  return { ok: false, dep: null };
}

async function get(url) {
  try {
    const html = execSync(`curl.exe -s -L "${url}"`, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    return { url, html, len: html.length };
  } catch (e) {
    return { url, html: '', len: 0, err: String(e).slice(0, 100) };
  }
}

const sha10 = process.argv[2];
const depl = await waitDeploy(sha10);
console.log('deploy ok:', depl.ok, depl.dep?.id);
if (!depl.ok) { console.log('DEPLOY FAILED'); process.exit(1); }

let pass = 0, fail = 0;
const results = [];
const add = (u, needle, note) => { results.push({ u, needle, note }); };

// ===== G3 署名块 (3 语言, 2 个代表 slug) =====
for (const [l, slug, author, body, cta] of [
  ['zh-hk', 'sticker-buying-guide', '智印港印刷專家', '印刷工藝・設計技巧・行業趨勢', '更多印刷知識'],
  ['en', 'sticker-buying-guide', 'ZprintPro Printing Experts', 'Techniques, Design Tips & Industry Trends', 'More Articles'],
  ['ja', 'sticker-buying-guide', 'ZprintPro印刷専門家', '印刷技術・デザイン・業界トレンド', 'その他の記事'],
]) {
  add(`${BASE}/${l}/blog/${slug}/`, author, `G3 sig ${l} author`);
  add(`${BASE}/${l}/blog/${slug}/`, body, `G3 sig ${l} body`);
  add(`${BASE}/${l}/blog/${slug}/`, cta, `G3 sig ${l} cta`);
}
// 另一 slug 抽查 (company-intro 非 buying-guide 路径)
add(`${BASE}/zh-hk/blog/company-intro/`, '智印港印刷專家', 'G3 sig zh company-intro');

// ===== G3 schema: FAQPage / Article / Breadcrumb (3 语言) =====
for (const l of ['zh-hk', 'en', 'ja']) {
  add(`${BASE}/${l}/blog/sticker-buying-guide/`, 'FAQPage', `G3 schema ${l} FAQPage`);
  add(`${BASE}/${l}/blog/sticker-buying-guide/`, 'BlogPosting', `G3 schema ${l} BlogPosting`);
  add(`${BASE}/${l}/blog/sticker-buying-guide/`, 'BreadcrumbList', `G3 schema ${l} Breadcrumb`);
  add(`${BASE}/${l}/blog/sticker-buying-guide/`, 'datePublished', `G3 schema ${l} datePublished`);
  add(`${BASE}/${l}/blog/sticker-buying-guide/`, 'dateModified', `G3 schema ${l} dateModified`);
}

// ===== AEO 开头段 (已有不动核验) + 内链 200 =====
add(`${BASE}/zh-hk/blog/company-intro/`, '本文將帶您', 'G3 AEO zh opening');
add(`${BASE}/en/blog/sticker-buying-guide/`, 'complete guide', 'G3 AEO en opening');
add(`${BASE}/ja/blog/sticker-buying-guide/`, 'ガイド', 'G3 AEO ja opening');

// 内链回归: 相关产品 PDP + sidebar SKU 200 (抽 1)
const linkProbe = await get(`${BASE}/zh-hk/product/waterproof-stickers/`);
const linkedOk = linkProbe.len > 50000;
results.push({ u: `${BASE}/zh-hk/product/waterproof-stickers/`, needle: 'n/a (related product 200)', note: 'G3 内链 PDP 200', hit: linkedOk });
if (linkedOk) pass++; else fail++;

// ===== 任务 A 代码核验已确认 (Header -240px), 线上 header 200 回归 =====
add(`${BASE}/zh-hk/`, '紙袋印刷', 'reg header paper-bags nav');

// 执行
const cache = new Map();
for (const item of results) {
  if (!cache.has(item.u)) cache.set(item.u, await get(item.u));
  const r = cache.get(item.u);
  const hit = item.needle === 'n/a' ? item.hit : r.html.includes(item.needle);
  if (hit) { pass++; console.log(`✅ [${item.note}] ${item.u} len=${r.len}`); }
  else { fail++; console.log(`❌ [${item.note}] ${item.u} needle="${item.needle}" len=${r.len}${r.err ? ' err=' + r.err : ''}`); }
}

console.log(`\nPROBE SUMMARY: ${pass}/${pass + fail} pass`);
process.exit(fail > 0 ? 1 : 0);
