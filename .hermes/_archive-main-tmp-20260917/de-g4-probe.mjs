/* v9.2.3 D+E+G4 探针: 等 CF deploy 完成后验收 (Blog 列表/Contact 重设计 + G4 AEO/schema + 回归) */
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

const results = [];
let pass = 0, fail = 0;
// 预抓取去重
const urls = [];
const add = (u, needle, note) => { urls.push({ u, needle, note }); };

// ===== D: Blog 列表 3 语言 =====
for (const [l, needles] of Object.entries({
  'zh-hk': [['印刷知識', 'H1'], ['本週精選', 'featured'], ['全部文章', 'filterAll'], ['免費報價', 'bottomCTA'], ['分鐘', 'readTime'], ['閱讀全文', 'readMore']],
  'en': [['Printing Knowledge', 'H1'], ['Featured', 'featured'], ['All Articles', 'filterAll'], ['Free Quote', 'bottomCTA'], ['min read', 'readTime']],
  'ja': [['印刷知識', 'H1'], ['注目記事', 'featured'], ['すべての記事', 'filterAll'], ['無料見積もり', 'bottomCTA'], ['読了', 'readTime']],
})) {
  for (const [needle, note] of needles) add(`${BASE}/${l}/blog/`, needle, `D blog ${l} ${note}`);
}
// 禁动回归: blog 详情 200 + FAQPage schema
add(`${BASE}/zh-hk/blog/sticker-buying-guide/`, 'FAQPage', 'D blog detail zh FAQPage');
add(`${BASE}/en/blog/sticker-buying-guide/`, 'FAQPage', 'D blog detail en FAQPage');
add(`${BASE}/ja/blog/sticker-buying-guide/`, 'FAQPage', 'D blog detail ja FAQPage');

// ===== E: Contact 3 语言 =====
for (const [l, needles] of Object.entries({
  'zh-hk': [['2 小時內回覆', 'heroSubtitle'], ['免費打樣', 'trust1'], ['ISO 9001 認證', 'trust3'], ['順豐直達', 'trust4'], ['常見問題', 'faqTitle'], ['WhatsApp 即時詢價', 'waBtn'], ['contact_phone_click', 'cfAnalytics'], ['免費報價', 'bottomCTA']],
  'en': [['Reply within 2 hours', 'heroSubtitle'], ['Free Sample', 'trust1'], ['ISO-Certified Quality', 'trust3'], ['Frequently Asked Questions', 'faqTitle'], ['Chat on WhatsApp', 'waBtn']],
  'ja': [['2時間以内に返信', 'heroSubtitle'], ['無料サンプル', 'trust1'], ['ISO認証品質管理', 'trust3'], ['よくある質問', 'faqTitle'], ['WhatsAppで相談', 'waBtn']],
})) {
  for (const [needle, note] of needles) add(`${BASE}/${l}/contact/`, needle, `E contact ${l} ${note}`);
}
// G4: contact schema — ContactPage + contactPoint email
add(`${BASE}/zh-hk/contact/`, 'zprintpro@outlook.com', 'G4 contact schema email');
add(`${BASE}/zh-hk/contact/`, 'ContactPage', 'G4 contact schema ContactPage');

// ===== G4: rush AEO 3 语言 =====
for (const [l, needle, note] of [
  ['zh-hk', '即日印刷：每日 18:00 前落單', 'G4 rush AEO zh'],
  ['en', 'order before 6PM and confirm artwork', 'G4 rush AEO en'],
  ['ja', '18:00 までにご注文', 'G4 rush AEO ja'],
]) add(`${BASE}/${l}/services/rush-printing-delivery/`, needle, note);

// ===== 回归 =====
add(`${BASE}/zh-hk/`, '30 秒 AI 報價', 'reg home zh');
add(`${BASE}/en/`, '30s AI Quote', 'reg home en');
add(`${BASE}/ja/`, '30秒AI見積もり', 'reg home ja');
add(`${BASE}/zh-hk/category/stickers/`, '貼紙印刷', 'reg PLP zh');
add(`${BASE}/en/product/waterproof-stickers/`, '30s Instant Quote', 'reg PDP en');
add(`${BASE}/ja/product/waterproof-stickers/`, '30秒無料見積もり', 'reg PDP ja');

// 执行 (去重抓取)
const cache = new Map();
for (const item of urls) {
  if (!cache.has(item.u)) cache.set(item.u, await get(item.u));
  const r = cache.get(item.u);
  const hit = r.html.includes(item.needle);
  results.push({ url: item.u, note: item.note, hit, len: r.len, err: r.err });
  if (hit) pass++; else { fail++; console.log(`❌ [${item.note}] ${item.u} needle="${item.needle}" len=${r.len}${r.err ? ' err=' + r.err : ''}`); }
}

console.log(`\nPROBE SUMMARY: ${pass}/${pass + fail} pass`);
process.exit(fail > 0 ? 1 : 0);
