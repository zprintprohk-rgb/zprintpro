// Read CF Pages project env var NAMES (never print values)
import fs from 'node:fs';

const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8').split(/\r?\n/).filter(l => /^[A-Z_]+=/.test(l)).map(l => {
    const i = l.indexOf('=');
    return [l.slice(0, i), l.slice(i + 1).trim()];
  })
);
const token = env.CLOUDFLARE_PAGES_TOKEN;
if (!token) { console.log('NO PAGES TOKEN'); process.exit(0); }

const api = async (path) => {
  const r = await fetch('https://api.cloudflare.com/client/v4' + path, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { status: r.status, body: await r.json() };
};

const acc = await api('/accounts?per_page=20');
console.log('accounts status', acc.status, 'count', (acc.body.result || []).length);
for (const a of acc.body.result || []) {
  console.log('  account:', a.name, a.id);
  const p = await api(`/accounts/${a.id}/pages/projects?per_page=20`);
  console.log('  pages projects status', p.status, 'errors', JSON.stringify((p.body.errors || []).slice(0, 2)));
  for (const proj of p.body.result || []) {
    console.log('  project:', proj.name, '| prod branch:', proj.production_branch);
    const cfg = proj.deployment_configs || {};
    for (const [envName, conf] of Object.entries(cfg)) {
      const vars = Object.keys(conf.env_vars || {});
      console.log(`    [${envName}] ${vars.length} vars: ${vars.sort().join(', ')}`);
    }
  }
}
console.log('CF_ENV_LIST_DONE');
