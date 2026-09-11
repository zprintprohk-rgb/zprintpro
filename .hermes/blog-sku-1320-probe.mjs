/* v9.2.3 老板指令探针: blog SKU 图 + 1320 横色块 + 搜索条 + contact 1320 */
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
    return { url, html: '', len: 0, err: String(e).slice(0, 120) };
  }
}

const sha10 = process.argv[2];
const depl = await waitDeploy(sha10);
console.log('deploy ok:', depl.ok, depl.dep?.id);
if (!depl.ok) { console.log('DEPLOY FAILED'); process.exit(1); }

const checks = [
  // ==== ① blog 列表: SKU 图 + 搜索条 + 1320 hero + breadcrumb ====
  ['zh-hk', '/zh-hk/blog/', '搜尋文章…', 'blog zh 搜索条占位'],
  ['en', '/en/blog/', 'Search articles…', 'blog en 搜索条占位'],
  ['ja', '/ja/blog/', '記事を検索…', 'blog ja 搜索条占位'],
  ['zh-hk', '/zh-hk/blog/', '/images/products/seedream-webp/', 'blog zh SKU 图出现'],
  ['en', '/en/blog/', '/images/products/seedream-webp/', 'blog en SKU 图出现'],
  ['ja', '/ja/blog/', '/images/products/seedream-webp/', 'blog ja SKU 图出现'],
  ['zh-hk', '/zh-hk/blog/', 'min-h-[300px]', 'blog zh hero 1320 min-h'],
  ['en', '/en/blog/', 'min-h-[300px]', 'blog en hero 1320 min-h'],
  ['ja', '/ja/blog/', 'min-h-[300px]', 'blog ja hero 1320 min-h'],
  ['zh-hk', '/zh-hk/blog/', '印刷知識', 'blog zh breadcrumb'],
  ['en', '/en/blog/', '>Blog<', 'blog en breadcrumb'],
  ['ja', '/ja/blog/', 'ブログ', 'blog ja breadcrumb'],
  // 精选浅蓝带收块 (rounded-2xl F2F6FF)
  ['zh-hk', '/zh-hk/blog/', 'rounded-2xl bg-[#F2F6FF]', 'blog zh 精选区 1320 块'],
  ['en', '/en/blog/', 'rounded-2xl bg-[#F2F6FF]', 'blog en 精选区 1320 块'],
  ['ja', '/ja/blog/', 'rounded-2xl bg-[#F2F6FF]', 'blog ja 精选区 1320 块'],
  // WhatsApp 埋点保留
  ['zh-hk', '/zh-hk/blog/', 'data-source="blog-hero"', 'blog zh 008 埋点保留'],
  ['zh-hk', '/zh-hk/blog/', 'data-source="blog-bottom-cta"', 'blog zh 底部埋点保留'],

  // ==== ① 详情 rush-printing-hk-guide: SKU 图 (flyers) + FAQPage 回归 ====
  ['zh-hk', '/zh-hk/blog/rush-printing-hk-guide/', 'seedream-webp/zprintpro-flyers-', 'rush zh hero SKU flyers 图'],
  ['en', '/en/blog/rush-printing-hk-guide/', 'seedream-webp/zprintpro-flyers-', 'rush en hero SKU flyers 图'],
  ['ja', '/ja/blog/rush-printing-hk-guide/', 'seedream-webp/zprintpro-flyers-', 'rush ja hero SKU flyers 图'],
  ['zh-hk', '/zh-hk/blog/rush-printing-hk-guide/', 'FAQPage', 'rush zh FAQPage 回归'],
  ['en', '/en/blog/rush-printing-hk-guide/', 'FAQPage', 'rush en FAQPage 回归'],
  ['ja', '/ja/blog/rush-printing-hk-guide/', 'FAQPage', 'rush ja FAQPage 回归'],
  // 另一个无 cover blog 详情: packaging-box-pricing-2026 → packaging SKU 图
  ['zh-hk', '/zh-hk/blog/packaging-box-pricing-2026/', 'seedream-webp/zprintpro-packaging-', 'pkg zh hero SKU 图'],
  ['en', '/en/blog/packaging-box-pricing-2026/', 'seedream-webp/zprintpro-packaging-', 'pkg en hero SKU 图'],
  ['ja', '/ja/blog/packaging-box-pricing-2026/', 'seedream-webp/zprintpro-packaging-', 'pkg ja hero SKU 图'],

  // ==== ② contact: 1320 hero + breadcrumb + 埋点回归 ====
  ['zh-hk', '/zh-hk/contact/', 'min-h-[300px]', 'contact zh hero 1320'],
  ['en', '/en/contact/', 'min-h-[300px]', 'contact en hero 1320'],
  ['ja', '/ja/contact/', 'min-h-[300px]', 'contact ja hero 1320'],
  ['zh-hk', '/zh-hk/contact/', '聯絡我們', 'contact zh breadcrumb'],
  ['en', '/en/contact/', '>Contact<', 'contact en breadcrumb'],
  ['ja', '/ja/contact/', 'お問い合わせ', 'contact ja breadcrumb'],
  ['zh-hk', '/zh-hk/contact/', 'data-cf-analytics="contact_phone_click"', 'contact zh 008 埋点回归'],
  ['zh-hk', '/zh-hk/contact/', 'data-source="contact-hero"', 'contact zh whatsapp 埋点回归'],
  ['zh-hk', '/zh-hk/contact/', 'FAQPage', 'contact zh FAQ schema'],

  // ==== 回归: 首页/PLP/PDP + G3 署名块 ====
  ['zh-hk', '/zh-hk/', '線上30秒獲取初步報價', 'reg home zh'],
  ['en', '/en/', '30-second AI quote', 'reg home en'],
  ['zh-hk', '/zh-hk/category/wedding-invitations/', 'min-h-[300px]', 'reg PLP wedding'],
  ['en', '/en/product/waterproof-stickers/', 'Instant Quote', 'reg PDP en'],
  ['zh-hk', '/zh-hk/blog/sticker-buying-guide/', '智印港印刷專家', 'G3 署名块回归'],
];

const cache = new Map();
let pass = 0, fail = 0;
for (const [l, url, needle, note] of checks) {
  if (!cache.has(url)) cache.set(url, await get(BASE + url));
  const r = cache.get(url);
  if (r.html.includes(needle)) { pass++; console.log(`✅ [${note}] ${url} len=${r.len}`); }
  else { fail++; console.log(`❌ [${note}] ${url} needle="${needle}" len=${r.len}${r.err ? ' err=' + r.err : ''}`); }
}
console.log(`\nPROBE SUMMARY: ${pass}/${pass + fail} pass`);
process.exit(fail > 0 ? 1 : 0);
