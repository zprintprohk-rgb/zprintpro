// Supabase reachability diagnosis (reads anon key from .env.local WITHOUT printing it)
import fs from 'node:fs';

const env = fs.readFileSync('F:/zprintpro-nextjs/.env.local', 'utf8');
const url = (env.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/) || [])[1]?.trim();
const key = (env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/) || [])[1]?.trim();
console.log('project url present:', !!url, '| anon key present:', !!key);

// Test 1: REST endpoint (project domain) — expect 404 relation-not-exist pre-migration or 200
try {
  const t0 = Date.now();
  const r = await fetch(`${url}/rest/v1/product_reviews?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(15000),
  });
  const body = await r.text();
  console.log(`TEST1 rest.supabase.co: ${r.status} in ${Date.now() - t0}ms | body: ${body.slice(0, 120)}`);
} catch (e) {
  console.log('TEST1 rest.supabase.co: FAIL —', e.message);
}

// Test 2: api.supabase.com (the domain K3's dashboard is failing on)
try {
  const t0 = Date.now();
  const r = await fetch('https://api.supabase.com/platform/health', { signal: AbortSignal.timeout(15000) });
  console.log(`TEST2 api.supabase.com: ${r.status} in ${Date.now() - t0}ms`);
} catch (e) {
  console.log('TEST2 api.supabase.com: FAIL —', e.message);
}

// Test 3: status page
try {
  const r = await fetch('https://status.supabase.com/api/v2/status.json', { signal: AbortSignal.timeout(15000) });
  const j = await r.json();
  console.log('TEST3 status.supabase.com:', r.status, '| indicator:', j.status?.indicator, '| desc:', j.status?.description);
} catch (e) {
  console.log('TEST3 status.supabase.com: FAIL —', e.message);
}
console.log('SUPA_DIAG_DONE');
