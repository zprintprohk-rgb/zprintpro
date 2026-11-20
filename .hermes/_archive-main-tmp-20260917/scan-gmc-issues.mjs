// GMC 问题诊断扫描: 抓取 291 个 PDP (97 slug × 3 locale), 统计
// 1) 缺价格 (price 缺失或为空)  2) 运费币种不一致  3) 缺颜色
import fs from 'fs';
import https from 'https';

const xml = fs.readFileSync('public/sitemap.xml', 'utf8');
const slugs = [...new Set([...xml.matchAll(/<loc>https:\/\/zprintpro\.com\/(?:zh-hk|en|ja)\/product\/([^\/]+)\/<\/loc>/g)].map(m => m[1]))];
const LOCALES = ['zh-hk', 'en', 'ja'];

function fetch(url) {
  return new Promise((res, rej) => {
    const req = https.get(url, { timeout: 20000 }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, body: d }));
    });
    req.on('error', rej);
    req.setTimeout(20000, () => req.destroy(new Error('timeout')));
  });
}

function parseProduct(body) {
  const ld = [...body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  return ld.find(s => s.includes('"@type":"Product"') || s.includes('"@type": "Product"'));
}

async function main() {
  const issues = { missingPrice: [], currencyMismatch: [], missingColor: [], noProduct: [] };
  const samplePrices = {};
  let checked = 0;

  // 限制并发 8
  const queue = [];
  for (const slug of slugs) for (const loc of LOCALES) queue.push({ slug, loc });

  async function worker() {
    while (queue.length) {
      const { slug, loc } = queue.shift();
      try {
        const { status, body } = await fetch(`https://zprintpro.com/${loc}/product/${slug}/`);
        checked++;
        if (status !== 200) { issues.noProduct.push(`${loc}/${slug} (${status})`); continue; }
        const prod = parseProduct(body);
        if (!prod) { issues.noProduct.push(`${loc}/${slug} (no LD)`); continue; }
        const price = (prod.match(/"price"\s*:\s*"([^"]*)"/) || [])[1];
        const cur = (prod.match(/"priceCurrency"\s*:\s*"([^"]+)"/) || [])[1];
        const shipCurs = [...prod.matchAll(/"currency"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
        const hasColor = /"color"\s*:/.test(prod);
        if (!price || price === '0' || !cur) issues.missingPrice.push(`${loc}/${slug}`);
        else if (shipCurs.length && !shipCurs.every(c => c === cur)) issues.currencyMismatch.push(`${loc}/${slug} (price=${cur} ship=${shipCurs.join('|')})`);
        if (!hasColor) issues.missingColor.push(`${loc}/${slug}`);
        if (!samplePrices[slug]) samplePrices[slug] = {};
        samplePrices[slug][loc] = `${price} ${cur}`;
      } catch (e) {
        issues.noProduct.push(`${loc}/${slug} (err)`);
      }
    }
  }

  const workers = Array.from({ length: 3 }, () => worker());
  await Promise.all(workers);

  console.log(`扫描完成: ${checked}/${slugs.length * 3} 页面`);
  console.log(`\n=== 缺价格 [${issues.missingPrice.length}] ===`);
  issues.missingPrice.slice(0, 25).forEach(x => console.log('  ', x));
  console.log(`\n=== 运费币种不一致 [${issues.currencyMismatch.length}] ===`);
  issues.currencyMismatch.slice(0, 25).forEach(x => console.log('  ', x));
  console.log(`\n=== 缺颜色 [${issues.missingColor.length}] ===`);
  issues.missingColor.slice(0, 25).forEach(x => console.log('  ', x));
  console.log(`\n=== 无 Product LD/非200 [${issues.noProduct.length}] ===`);
  issues.noProduct.slice(0, 10).forEach(x => console.log('  ', x));

  fs.writeFileSync('.hermes/gmc-diagnostic-scan.json', JSON.stringify({ issues, samplePrices }, null, 2), 'utf8');
  console.log('\n结果写入 .hermes/gmc-diagnostic-scan.json');
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
