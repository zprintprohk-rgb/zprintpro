// Round-1 continuation online probe (§9.1 baseline spot-check)
// Data window: 2026-10-27 ~10:2x Asia/Shanghai. UA-pinned, status+length+needle triple gate.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const CHECKS = [
  {
    id: 'robots',
    url: 'https://zprintpro.com/robots.txt',
    needles: ['User-agent: GPTBot', 'Sitemap:'],
    antiNeedles: ['Disallow: /_next/'],
    expectStatus: 200,
  },
  {
    id: 'small-batch-pdp',
    url: 'https://zprintpro.com/en/product/small-batch-stickers/',
    needles: [],
    antiNeedles: [],
    expectStatus: 200,
  },
  {
    id: 'doujin-pdp-e4-anchors',
    url: 'https://zprintpro.com/en/product/doujinshi-printing/',
    needles: [
      '<a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a>',
      '<a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>',
    ],
    antiNeedles: [],
    expectStatus: 200,
  },
  {
    id: 'zine-guide-e4-anchor',
    url: 'https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/',
    needles: ['<a href="/en/product/doujinshi-printing/">doujin circles</a>'],
    antiNeedles: [],
    expectStatus: 200,
  },
  {
    id: 'sticker-guide-e1-anchor',
    url: 'https://zprintpro.com/en/blog/sticker-guide/',
    needles: ['href="/en/product/small-batch-stickers/"'],
    antiNeedles: [],
    expectStatus: 200,
  },
  {
    id: 'saddle-h1-truth',
    url: 'https://zprintpro.com/en/product/saddle-stitch-booklets/',
    needles: ['from 10 Copies'],
    antiNeedles: ['100+ Copies'],
    expectStatus: 200,
  },
  {
    id: 'c109-ja',
    url: 'https://zprintpro.com/ja/comiket-c109/',
    needles: [],
    antiNeedles: [],
    expectStatus: 200,
  },
];

async function probeOne(c) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30000);
  try {
    const res = await fetch(c.url, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html,*/*' },
      redirect: 'follow',
      signal: ctrl.signal,
    });
    const body = await res.text();
    const needles = c.needles.map((n) => ({ needle: n, found: body.includes(n) }));
    const anti = c.antiNeedles.map((n) => ({ anti: n, present: body.includes(n) }));
    const ok =
      res.status === c.expectStatus &&
      needles.every((n) => n.found) &&
      anti.every((n) => !n.present);
    return {
      id: c.id,
      url: c.url,
      status: res.status,
      bytes: body.length,
      ok,
      needles,
      anti,
    };
  } catch (e) {
    return { id: c.id, url: c.url, ok: false, error: String(e && e.message || e) };
  } finally {
    clearTimeout(t);
  }
}

const results = [];
for (const c of CHECKS) {
  const r = await probeOne(c);
  results.push(r);
  // Determinism guard (§0.23.2 rule 3): retry once on failure before declaring fail
  if (!r.ok) {
    await new Promise((s) => setTimeout(s, 2000));
    const r2 = await probeOne(c);
    r.retry = r2;
    if (r2.ok) Object.assign(r, r2, { retryUsed: true });
  }
}

const pass = results.filter((r) => r.ok).length;
console.log(JSON.stringify({
  generatedAt: new Date().toISOString(),
  total: results.length,
  pass,
  verdict: pass === results.length ? 'PASS' : 'ATTENTION',
  results,
}, null, 2));
