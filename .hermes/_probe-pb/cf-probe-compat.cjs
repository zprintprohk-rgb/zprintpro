'use strict';
/** CF Pages 兼容标志探查 (只读) — 确认 nodejs_compat 是否缺失 */
const fs = require('fs');
const https = require('https');
const P = 'F:\\zprintpro-nextjs\\';

function loadEnv() {
  const out = {};
  for (const f of ['.env', '.env.local']) {
    const p = P + f;
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\r\n]*)"?\s*$/);
      if (m) out[m[1]] = m[2];
    }
  }
  return out;
}
const env = loadEnv();
const TOKEN = env.CLOUDFLARE_PAGES_TOKEN || env.CLOUDFLARE_API_TOKEN;
if (!TOKEN) { console.error('❌ 找不到 CF token'); process.exit(1); }
console.log('token 來源: ' + (env.CLOUDFLARE_PAGES_TOKEN ? 'CLOUDFLARE_PAGES_TOKEN' : 'CLOUDFLARE_API_TOKEN') + ' (長度 ' + TOKEN.length + ')');

function api(method, path, body) {
  return new Promise((res, rej) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.cloudflare.com', path: '/client/v4' + path, method,
      headers: Object.assign({ 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
        data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
    }, r => { let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => { try { res({ status: r.statusCode, json: JSON.parse(d) }); } catch (e) { res({ status: r.statusCode, json: null, raw: d.slice(0, 300) }); } }); });
    req.on('error', rej); if (data) req.write(data); req.end();
  });
}

(async () => {
  const acc = await api('GET', '/accounts?per_page=50');
  if (acc.status !== 200) { console.error('❌ /accounts HTTP ' + acc.status + ' ' + JSON.stringify(acc.json && acc.json.errors)); process.exit(1); }
  const accounts = (acc.json.result || []);
  console.log('\n可訪問帳戶 (' + accounts.length + '):');
  accounts.forEach(a => console.log('  ' + a.id + '  ' + a.name));

  for (const a of accounts) {
    const pr = await api('GET', `/accounts/${a.id}/pages/projects?per_page=100`);
    if (pr.status !== 200) { console.log('  帳戶 ' + a.name + ' projects HTTP ' + pr.status); continue; }
    for (const p of (pr.json.result || [])) {
      console.log('\n=== Pages 專案: ' + p.name + ' (帳戶 ' + a.name + ') ===');
      const dc = p.deployment_configs || {};
      for (const envName of ['production', 'preview']) {
        const c = dc[envName] || {};
        console.log(`  [${envName}] compatibility_date = ${JSON.stringify(c.compatibility_date)} | compatibility_flags = ${JSON.stringify(c.compatibility_flags)}`);
      }
      console.log('  ★ nodejs_compat 是否已設: ' +
        ['production', 'preview'].map(e => e + '=' + (((dc[e] || {}).compatibility_flags) || []).includes('nodejs_compat')).join(' | '));
      console.log('  最新部署: ' + ((p.latest_deployment || {}).id || '-') + ' | env=' + ((p.latest_deployment || {}).environment || '-') + ' | 時間=' + ((p.latest_deployment || {}).created_on || '-'));
      fs.writeFileSync(P + '.hermes/_probe-pb/_cf-pages-project.json', JSON.stringify({ accountId: a.id, projectName: p.name, deployment_configs: dc }, null, 2), 'utf8');
      console.log('  (已寫 .hermes/_probe-pb/_cf-pages-project.json 供下一步使用)');
    }
  }
})();
