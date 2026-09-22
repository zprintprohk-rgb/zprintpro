// gsim-baseline-20260922.mjs — GSIM 观察基线登记 (llms.txt / robots.txt / 代理抓取线索)
import { writeFileSync } from 'fs';

const out = { generated: '2026-09-22', sources: [] };
async function grab(name, url) {
  try {
    const r = await fetch(url, { headers: { 'accept-encoding': 'identity', 'user-agent': 'Mozilla/5.0 GSIM-Baseline' }, signal: AbortSignal.timeout(30000) });
    const txt = await r.text();
    writeFileSync(`.hermes/reports/gsim-${name}-2026-09-22.txt`, txt);
    out.sources.push({ name, url, status: r.status, bytes: Buffer.byteLength(txt) });
    console.log(name, r.status, Buffer.byteLength(txt), 'bytes');
    return txt;
  } catch (e) {
    out.sources.push({ name, url, status: 'ERR', error: e.message });
    console.log(name, 'ERR', e.message);
    return '';
  }
}
const llms = await grab('llms.txt', 'https://zprintpro.com/llms.txt');
await grab('robots.txt', 'https://zprintpro.com/robots.txt');
// 代理抓取线索: llms.txt 内 GSIM 自述
const gsimHints = [];
if (llms) {
  for (const line of llms.split('\n')) {
    if (/ai|agent|llm|crawl|bot|gsim|quote|procure/i.test(line) && line.trim()) gsimHints.push(line.trim().slice(0, 200));
  }
}
out.gsimHints = gsimHints.slice(0, 40);
writeFileSync('.hermes/reports/gsim-baseline-2026-09-22.json', JSON.stringify(out, null, 2));
console.log('gsim hints:', gsimHints.length);
