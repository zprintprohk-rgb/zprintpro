// Live probe: confirm the §0.23.1 GSC-internal marker (待校準) is gone from the
// customer-visible article that 797c84e3 leaked and ff08997d fixed.
const MARKER = '待校準';
const URLS = [
  'https://zprintpro.com/zh-hk/blog/corporate-holiday-cards-printing-guide/',
  'https://zprintpro.com/zh-hk/blog/corporate-holiday-cards-printing-guide',
];

let allClean = true;
for (const url of URLS) {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    const body = await res.text();
    const hits = body.split(MARKER).length - 1;
    if (hits > 0) allClean = false;
    console.log(`[probe] ${url} status=${res.status} bytes=${body.length} markerHits=${hits}`);
  } catch (err) {
    allClean = false;
    console.log(`[probe] ${url} ERROR ${err.message}`);
  }
}
console.log(`[probe] verdict=${allClean ? 'CLEAN' : 'STILL_LEAKING_OR_UNREACHABLE'}`);
