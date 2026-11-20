/* C2 en PDP 探针: 等 CF deploy 完成后验收 */
import { execSync } from 'child_process';

const BASE = 'https://zprintpro.com';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// CF deploy poll (10 字符 sha 前缀 + 校验 stage)
async function waitDeploy(sha10) {
  const token = execSync('powershell -Command "(Get-Content F:/zprintpro-nextjs/.env | Select-String CLOUDFLARE_PAGES_TOKEN).ToString().Split(\'=\',2)[1].Trim()"', { encoding: 'utf8' }).trim();
  for (let i = 0; i < 16; i++) {
    const out = execSync(`curl -s -H "Authorization: Bearer ${token}" "https://api.cloudflare.com/client/v4/accounts/32c174efaa22353f357c0fdff9d61b86/pages/projects/zprintpro/deployments?env=production&per_page=10"`, { encoding: 'utf8' });
    const deps = JSON.parse(out).result || [];
    const dep = deps.find((d) => {
      const h = d.deployment_trigger?.metadata?.commit_hash || d.commit_hash || '';
      return h.toLowerCase().startsWith(sha10.toLowerCase()) && d.environment === 'production';
    });
    if (dep) {
      const st = dep.stages || [];
      const failed = st.filter((s) => s.status === 'failure').length;
      const done = st.filter((s) => s.status === 'success').length;
      const stMap = Object.fromEntries(st.map((s) => [s.name, s.status]));
      console.log(`poll ${i}: ${dep.id} ${dep.created_on} stages ${done}/${st.length} build=${stMap.build} deploy=${stMap.deploy}`);
      if (failed > 0) return { ok: false, dep };
      // CF Pages deployment.status 为空串; 以 build+deploy stage success 判定
      if (stMap.build === 'success' && (stMap.deploy === 'success' || stMap.deploy === 'idle' || stMap.deploy === 'active')) return { ok: true, dep };
      if (st.some((s) => s.status === 'failure')) return { ok: false, dep };
    } else {
      console.log(`poll ${i}: sha ${sha10} not in latest deploys yet`);
    }
    await sleep(60000);
  }
  return { ok: false, dep: null };
}

async function probe(url, needle) {
  try {
    const html = execSync(`curl -s -L "${url}"`, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    const hit = html.includes(needle);
    const hasJsonLd = html.includes('application/ld+json');
    return { url, status: '200', needle, hit, hasJsonLd, len: html.length };
  } catch (e) {
    return { url, status: 'ERR', needle, hit: false, hasJsonLd: false, err: String(e).slice(0, 120) };
  }
}

const sha10 = process.argv[2];
const depl = await waitDeploy(sha10);
console.log('deploy ok:', depl.ok, depl.dep?.id);

if (!depl.ok) { console.log('DEPLOY FAILED'); process.exit(1); }

const results = [];
// 1. en PDP 蓝本
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, 'Same-Day Express Delivery'));
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, '30-sec AI Quote'));
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, 'Price Ladder'));
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, 'Frequently Asked Questions'));
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, 'Asia factory'));
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, '"offers"'));
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, '"priceCurrency":"HKD"'));
// 2. en 薄内容 SKU 抽样 (F2)
for (const s of ['foil-wedding-invitations', 'catalog-printing', 'wall-calendars', 'white-card-boxes', 'doujinshi-printing']) {
  results.push(await probe(`${BASE}/en/product/${s}/`, '30-sec AI Quote'));
  results.push(await probe(`${BASE}/en/product/${s}/`, '**FAQ'));
}
// 3. zh-hk 蓝本回归 (zh 串逐字)
results.push(await probe(`${BASE}/zh-hk/product/waterproof-stickers/`, '每個低至 · '));
results.push(await probe(`${BASE}/zh-hk/product/waterproof-stickers/`, '最抵'));
results.push(await probe(`${BASE}/zh-hk/product/waterproof-stickers/`, '常見問題'));
results.push(await probe(`${BASE}/zh-hk/product/waterproof-stickers/`, '準備落單'));
// 4. Offer 门控: 有表 white-card-boxes offers 存在; 无表 foil-wedding offers 不存在
results.push(await probe(`${BASE}/en/product/white-card-boxes/`, '"offers"'));
results.push(await probe(`${BASE}/en/product/foil-wedding-invitations/`, '"offers"')); // 预期 false
// 5. 红线
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, '智印印港'));
results.push(await probe(`${BASE}/en/product/waterproof-stickers/`, 'business-card'));
// 6. 16 品类各抽 1 en PDP
const cats = ['stickers', 'flyers', 'packaging', 'posters', 'paper-bags', 'greeting-cards', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'japan-doujin', 'wedding-invitations', 'place-cards'];
for (const c of cats) {
  // 从 sitemap 或固定样例 — 用每个品类第一个已知 SKU (抽样)
}
const catSku = {
  stickers: 'transparent-stickers', flyers: 'a5-flyers', packaging: 'rigid-boxes', posters: 'a1-posters',
  'paper-bags': 'kraft-paper-bags', 'greeting-cards': 'matte-greeting-cards', banners: 'roll-up-banners',
  books: 'saddle-stitch-booklets', menus: 'pvc-menus', envelopes: 'business-envelopes',
  calendars: 'desk-calendars', 'red-packets': 'custom-red-packets', educational: 'certificates',
  'japan-doujin': 'can-badge', 'wedding-invitations': 'save-the-date-cards', 'place-cards': 'escort-cards',
};
for (const [c, s] of Object.entries(catSku)) {
  const r = await probe(`${BASE}/en/product/${s}/`, '30-sec AI Quote');
  r.cat = c;
  results.push(r);
}

let bad = 0;
for (const r of results) {
  const expectHit = !r.needle.includes('智印印港') && !r.needle.includes('business-card') && !(r.url.includes('foil-wedding-invitations') && r.needle === '"offers"');
  const pass = r.status === '200' && r.hit === expectHit;
  if (!pass) bad++;
  console.log(`${pass ? '✅' : '❌'} [${r.cat || '-'}] ${r.url} needle=${r.needle} hit=${r.hit} len=${r.len || r.err}`);
}
console.log(`\nPROBE SUMMARY: ${results.length - bad}/${results.length} pass`);
process.exit(bad ? 2 : 0);
