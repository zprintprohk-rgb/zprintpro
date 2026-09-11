// G2 前置勘察: live PLP schema 现状 (2026-09-11)
import { execSync } from 'child_process';
const base = 'https://zprintpro.com';
const paths = ['/zh-hk/category/stickers/', '/en/category/stickers/', '/ja/category/stickers/', '/zh-hk/category/packaging/'];
for (const p of paths) {
  const html = execSync(`curl.exe -sS -m 25 "${base}${p}"`, { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 });
  const types = ['BreadcrumbList', 'CollectionPage', 'ItemList', 'FAQPage', 'WebSite', 'Organization', 'HowTo', 'Speakable', 'ItemList'];
  const counts = {};
  for (const t of types) counts[t] = (html.match(new RegExp(t, 'g')) || []).length;
  // 提取所有 JSON-LD 块类型
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => {
    try { const j = JSON.parse(m[1]); return Array.isArray(j) ? j.map((x) => x['@type']).join(',') : j['@type']; }
    catch { return 'PARSE_ERR'; }
  });
  console.log(`${p}`);
  console.log(`  types: ${JSON.stringify(counts)}`);
  console.log(`  jsonld blocks: [${blocks.join('] [')}]`);
  console.log(`  html length: ${html.length}`);
}
