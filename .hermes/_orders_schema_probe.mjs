// Probe live Supabase orders schema via anon key (SELECT of unknown column -> 400)
import fs from 'node:fs';

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter(l => /^[A-Za-z_]+=/.test(l)).map(l => {
    const i = l.indexOf('=');
    return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
  })
);
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) { console.log('MISSING_ENV', !!url, !!key); process.exit(0); }
console.log('supabase host:', url.replace(/https:\/\/([a-z0-9]+)\..*/, '$1'));

const cols = ['id','order_number','created_at','quote_data','amount','currency','file_url','items','subtotal','total_amount','customer_name','customer_email','payment_status','payment_method','wire_transfer_info','status','shipping_address','customer_notes','quote_id','admin_notes'];
for (const c of cols) {
  const r = await fetch(`${url}/rest/v1/orders?select=${c}&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  let verdict = r.status;
  if (r.status === 400) verdict = '400 MISSING';
  else if (r.status === 200) verdict = '200 EXISTS';
  console.log(`  ${c.padEnd(18)} ${verdict}`);
}

// also probe quote_requests (used by quote flow) for reference
const r2 = await fetch(`${url}/rest/v1/orders?select=count`, { headers: { apikey: key, Prefer: 'count=exact' } });
console.log('orders count probe status', r2.status, (r2.headers.get('content-range') || ''));
console.log('SCHEMA_PROBE_DONE');
