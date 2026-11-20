const https = require('https');
const { execSync } = require('child_process');
const REPO = 'zprintprohk-rgb/zprintpro';
const get = (p) => new Promise((res) => {
  https.get({ host: 'api.github.com', path: p, headers: { 'User-Agent': 'diag', Accept: 'application/vnd.github+json' } }, (r) => {
    let b = '';
    r.on('data', (d) => (b += d));
    r.on('end', () => res({ s: r.statusCode, j: (() => { try { return JSON.parse(b); } catch { return null; } })() }));
  });
});
(async () => {
  const remote = execSync('git ls-remote origin refs/heads/main').toString().trim().split(/\s+/)[0];
  console.log('remote main:', remote.slice(0, 8));
  const r = await get(`/repos/${REPO}/commits/${remote}/check-runs`);
  const cf = (r.j?.check_runs || []).filter((c) => /Cloudflare/.test(c.name));
  cf.forEach((c) => console.log('  CF run', c.status, 'created', c.created_at, 'completed', c.completed_at));
  if (cf.length) {
    const t = Math.min(...cf.map((c) => new Date(c.created_at).getTime()));
    console.log('gap min:', Math.floor((Date.now() - t) / 60000));
  }
})();
