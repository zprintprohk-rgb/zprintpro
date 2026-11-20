'use strict';
/** 列出 zprintpro Pages 最近部署, 與 commit 對應, 找出 84d65111 的實際結果 */
const fs = require('fs');
const https = require('https');
const P = 'F:\\zprintpro-nextjs\\';
const ACCT = '32c174efaa22353f357c0fdff9d61b86';
const PROJ = 'zprintpro';
const env = {};
for (const f of ['.env', '.env.local']) { const p = P + f; if (!fs.existsSync(p)) continue; for (const l of fs.readFileSync(p, 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\r\n]*)"?\s*$/); if (m) env[m[1]] = m[2]; } }
const TOKEN = env.CLOUDFLARE_PAGES_TOKEN || env.CLOUDFLARE_API_TOKEN;

function api(path) {
  return new Promise((res, rej) => {
    https.get({ hostname: 'api.cloudflare.com', path: '/client/v4' + path, headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' } },
      r => { let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => { try { res({ status: r.statusCode, json: JSON.parse(d) }); } catch (e) { res({ status: r.statusCode, raw: d.slice(0, 200) }); } }); }).on('error', rej);
  });
}
const sh = s => (s || '').slice(0, 8);

(async () => {
  const r = await api(`/accounts/${ACCT}/pages/projects/${PROJ}/deployments`);
  console.log('GET deployments: HTTP ' + r.status);
  if (r.status !== 200) { console.log(JSON.stringify(r.json && r.json.errors)); process.exit(1); }
  const ds = r.json.result || [];
  console.log('部署數: ' + ds.length + '\n');
  console.log('created_on                | env        | commit   | branch        | stage              | status');
  for (const d of ds.slice(0, 14)) {
    const st = d.latest_stage || {};
    console.log(
      String(d.created_on).padEnd(25) + ' | ' +
      String(d.environment).padEnd(10) + ' | ' +
      sh(d.deployment_trigger && d.deployment_trigger.metadata && d.deployment_trigger.metadata.commit_hash).padEnd(8) + ' | ' +
      String((d.deployment_trigger && d.deployment_trigger.metadata && d.deployment_trigger.metadata.branch) || '-').padEnd(13) + ' | ' +
      (String(st.name) + '/' + String(st.status)).padEnd(18) + ' | ' +
      (d.deployment_trigger && d.deployment_trigger.metadata && d.deployment_trigger.metadata.commit_message || '').slice(0, 40)
    );
    if (st.name === 'deploy' && st.status !== 'success' && st.step_description) console.log('        ★ ' + st.name + ' 失敗原因: ' + String(st.step_description).slice(0, 200));
    for (const stg of (d.stages || [])) {
      if (stg.status !== 'success' && stg.step_description) console.log('        ★ [' + stg.name + '/' + stg.status + '] ' + String(stg.step_description).slice(0, 260));
    }
  }
})();
