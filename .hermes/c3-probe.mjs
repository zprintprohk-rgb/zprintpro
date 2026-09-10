/* C3 ja PDP 探针: 等 CF deploy 完成后验收 (ja v9 + zh/en 回归 + Offer/AEO/红线) */
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

async function probe(url, needle) {
  try {
    const html = execSync(`curl.exe -s -L "${url}"`, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    return { url, hit: html.includes(needle), len: html.length };
  } catch (e) {
    return { url, hit: false, len: 0, err: String(e).slice(0, 100) };
  }
}

const sha10 = process.argv[2];
const depl = await waitDeploy(sha10);
console.log('deploy ok:', depl.ok, depl.dep?.id);
if (!depl.ok) { console.log('DEPLOY FAILED'); process.exit(1); }

const results = [];
// 1. ja 蓝本 waterproof-stickers v9 结构
results.push({ ...await probe(`${BASE}/ja/product/waterproof-stickers/`, '30秒無料見積もり'), expect: true, note: 'ja ctaQuote' });
results.push({ ...await probe(`${BASE}/ja/product/waterproof-stickers/`, '即時見積もり'), expect: true, note: 'ja railQuote' });
results.push({ ...await probe(`${BASE}/ja/product/waterproof-stickers/`, '標準納期'), expect: true, note: 'ja stdDelivery' });
results.push({ ...await probe(`${BASE}/ja/product/waterproof-stickers/`, 'よくある質問'), expect: true, note: 'ja faqHeading' });
results.push({ ...await probe(`${BASE}/ja/product/waterproof-stickers/`, '関連製品'), expect: true, note: 'ja related' });
results.push({ ...await probe(`${BASE}/ja/product/waterproof-stickers/`, 'プライスラダー'), expect: true, note: 'ja ladderEyebrow' });
results.push({ ...await probe(`${BASE}/ja/product/waterproof-stickers/`, '¥'), expect: true, note: 'ja JPY' });
results.push({ ...await probe(`${BASE}/ja/product/waterproof-stickers/`, 'なぜ'), expect: true, note: 'ja trust heading' });
// 2. ja 薄内容 SKU 抽样 (F3)
for (const s of ['foil-wedding-invitations', 'white-card-boxes', 'can-badge', 'wall-calendars', 'catalog-printing']) {
  results.push({ ...await probe(`${BASE}/ja/product/${s}/`, '30秒無料見積もり'), expect: true, note: `F3 ${s} v9` });
  results.push({ ...await probe(`${BASE}/ja/product/${s}/`, 'よくある質問'), expect: true, note: `F3 ${s} FAQ` });
}
// 3. ja 16 品类各抽 1
const catSku = {
  stickers: 'waterproof-stickers', flyers: 'a5-flyers', packaging: 'rigid-boxes', posters: 'a1-posters',
  'paper-bags': 'kraft-paper-bags', 'greeting-cards': 'matte-greeting-cards', banners: 'roll-up-banners',
  books: 'saddle-stitch-booklets', menus: 'pvc-menus', envelopes: 'business-envelopes',
  calendars: 'desk-calendars', 'red-packets': 'custom-red-packets', educational: 'certificates',
  'japan-doujin': 'can-badge', 'wedding-invitations': 'save-the-date-cards', 'place-cards': 'escort-cards',
};
for (const [c, s] of Object.entries(catSku)) {
  results.push({ ...await probe(`${BASE}/ja/product/${s}/`, '30秒無料見積もり'), expect: true, note: `ja ${c}` });
}
// 4. zh-hk 回归 (蓝本逐字)
results.push({ ...await probe(`${BASE}/zh-hk/product/waterproof-stickers/`, '每個低至 · '), expect: true, note: 'zh regression' });
results.push({ ...await probe(`${BASE}/zh-hk/product/waterproof-stickers/`, '常見問題'), expect: true, note: 'zh regression' });
// 5. en 回归 + TrustBadgeBlock en (C3 修 locale 后不应有 zh 泄漏)
results.push({ ...await probe(`${BASE}/en/product/waterproof-stickers/`, 'Why Choose'), expect: true, note: 'en trust en' });
results.push({ ...await probe(`${BASE}/en/product/waterproof-stickers/`, '為何選擇'), expect: false, note: 'en no zh trust leak' });
// 6. 红线: ja 页无 深圳/中国/深セン 前缀于 F3 body 区 (整体抽查); 无 智印印港
results.push({ ...await probe(`${BASE}/ja/product/white-card-boxes/`, '智印印港'), expect: false, note: 'ja 智印印港=0' });
results.push({ ...await probe(`${BASE}/ja/product/can-badge/`, 'business-card'), expect: false, note: 'ja bc=0' });

let bad = 0;
for (const r of results) {
  const pass = r.hit === r.expect && !r.err;
  if (!pass) bad++;
  console.log(`${pass ? '✅' : '❌'} [${r.note}] ${r.url} hit=${r.hit} len=${r.len || r.err}`);
}
console.log(`\nPROBE SUMMARY: ${results.length - bad}/${results.length} pass`);
process.exit(bad ? 2 : 0);
