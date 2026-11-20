'use strict';
/** 取 account_id: token verify + memberships + 倉庫痕跡 */
const fs = require('fs');
const https = require('https');
const P = 'F:\\zprintpro-nextjs\\';
const env = {};
for (const f of ['.env', '.env.local']) { const p = P + f; if (!fs.existsSync(p)) continue; for (const l of fs.readFileSync(p, 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\r\n]*)"?\s*$/); if (m) env[m[1]] = m[2]; } }
const TOKEN = env.CLOUDFLARE_PAGES_TOKEN || env.CLOUDFLARE_API_TOKEN;

function api(path, token) {
  return new Promise((res, rej) => {
    const req = https.request({ hostname: 'api.cloudflare.com', path: '/client/v4' + path, method: 'GET',
      headers: { 'Authorization': 'Bearer ' + (token || TOKEN), 'Content-Type': 'application/json' } },
      r => { let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => { try { res({ status: r.statusCode, json: JSON.parse(d) }); } catch (e) { res({ status: r.statusCode, raw: d.slice(0, 200) }); } }); });
    req.on('error', rej); req.end();
  });
}

(async () => {
  for (const [label, tok] of [['PAGES_TOKEN', env.CLOUDFLARE_PAGES_TOKEN], ['API_TOKEN', env.CLOUDFLARE_API_TOKEN]]) {
    if (!tok) continue;
    const v = await api('/user/tokens/verify', tok);
    console.log('[' + label + '] verify: HTTP ' + v.status + ' ' + JSON.stringify(v.json && v.json.result || v.json && v.json.errors));
  }
  const m = await api('/memberships?per_page=50');
  console.log('\n/memberships: HTTP ' + m.status);
  const accts = (m.json && m.json.result) || [];
  accts.forEach(x => console.log('  account=' + (x.account && x.account.id) + '  name=' + (x.account && x.account.name)));

  // 倉庫痕跡: 32-hex account id
  console.log('\n倉庫內 32-hex 候選 (前 6):');
  const files = ['wrangler-deploy3.log', 'wrangler-deploy5.log', '.hermes/logs/2026-09-17-lane-o-p0-3-lead-source-utm.md', 'package.json'];
  const seen = new Set();
  for (const f of files) {
    if (!fs.existsSync(P + f)) continue;
    const s = fs.readFileSync(P + f, 'utf8');
    for (const mm of s.matchAll(/\b([0-9a-f]{32})\b/g)) seen.add(mm[1]);
  }
  [...seen].slice(0, 6).forEach(x => console.log('  ' + x));
  if (!seen.size) console.log('  (無)');
})();
