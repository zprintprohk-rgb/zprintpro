'use strict';
/** CF Pages 專案探查 (只讀, 用 account_id = 32c174...b86) */
const fs = require('fs');
const https = require('https');
const P = 'F:\\zprintpro-nextjs\\';
const ACCT = '32c174efaa22353f357c0fdff9d61b86';
const env = {};
for (const f of ['.env', '.env.local']) { const p = P + f; if (!fs.existsSync(p)) continue; for (const l of fs.readFileSync(p, 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\r\n]*)"?\s*$/); if (m) env[m[1]] = m[2]; } }
const TOKEN = env.CLOUDFLARE_PAGES_TOKEN || env.CLOUDFLARE_API_TOKEN;

function api(method, path, body) {
  return new Promise((res, rej) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({ hostname: 'api.cloudflare.com', path: '/client/v4' + path, method,
      headers: Object.assign({ 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, data ? { 'Content-Length': Buffer.byteLength(data) } : {}) },
      r => { let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => { try { res({ status: r.statusCode, json: JSON.parse(d) }); } catch (e) { res({ status: r.statusCode, raw: d.slice(0, 200) }); } }); });
    req.on('error', rej); if (data) req.write(data); req.end();
  });
}

(async () => {
  const pr = await api('GET', `/accounts/${ACCT}/pages/projects`);
  console.log('GET pages/projects: HTTP ' + pr.status);
  if (pr.status !== 200) { console.log('  errors: ' + JSON.stringify(pr.json && pr.json.errors)); process.exit(1); }
  const projects = pr.json.result || [];
  console.log('專案數: ' + projects.length);
  for (const p of projects) {
    console.log('\n=== ' + p.name + ' ===');
    const dc = p.deployment_configs || {};
    for (const e of ['production', 'preview']) {
      const c = dc[e] || {};
      const flags = c.compatibility_flags || [];
      console.log(`  [${e}] date=${JSON.stringify(c.compatibility_date)} flags=${JSON.stringify(flags)} nodejs_compat=${flags.includes('nodejs_compat')}`);
    }
    const ld = p.latest_deployment || {};
    console.log('  latest_deployment: ' + ld.id + ' | env=' + ld.environment + ' | created=' + ld.created_on + ' | stage=' + JSON.stringify((ld.latest_stage || {}).name) + '/' + JSON.stringify((ld.latest_stage || {}).status));
    console.log('  域名: ' + JSON.stringify(p.domains));
    fs.writeFileSync(P + '.hermes/_probe-pb/_cf-project.json', JSON.stringify({ accountId: ACCT, project: p.name, deployment_configs: dc, latest: { id: ld.id, environment: ld.environment } }, null, 2), 'utf8');
  }
})();
