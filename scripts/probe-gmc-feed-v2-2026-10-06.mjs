/**
 * 聚焦探针 v2 (2026-10-06): 3 locale BC-001 完整字段 + 缺 color 统计 + 首页 canonical 域
 */
const SITE = 'https://zprintpro.com';
const FEEDS = ['zh-hk', 'en', 'ja'];

function pick(block, tag) {
  const t = new RegExp(`<g:${tag}>([\\s\\S]*?)</g:${tag}>`).exec(block);
  return t ? t[1].trim() : '';
}

for (const loc of FEEDS) {
  const res = await fetch(`${SITE}/api/merchant-feed/${loc}/`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  const bc001 = items.find((b) => pick(b, 'id') === 'BC-001');
  const noColor = items.filter((b) => !pick(b, 'color')).length;
  const withColor = items.length - noColor;
  console.log(`[${loc}] items=${items.length} 有color=${withColor} 缺color=${noColor}`);
  if (bc001) {
    console.log(`  BC-001: link=${pick(bc001, 'link')}`);
    console.log(`          image=${pick(bc001, 'image_link')}`);
    console.log(`          price=${pick(bc001, 'price')} | sale_price=${pick(bc001, 'sale_price') || '(无)'}`);
    console.log(`          category=${pick(bc001, 'google_product_category')} | brand=${pick(bc001, 'brand')}`);
  }
  await new Promise((r) => setTimeout(r, 200));
}

// 首页 canonical / og:url 域名核验 (防 pages.dev 泄漏到 SEO 层)
const home = await fetch(`${SITE}/zh-hk/`, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; probe)' } });
const html = await home.text();
const canonical = /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i.exec(html);
const ogUrl = /<meta[^>]*property="og:url"[^>]*content="([^"]+)"/i.exec(html);
console.log(`\n[首页 zh-hk] HTTP ${home.status}`);
console.log(`  canonical=${canonical ? canonical[1] : '(未找到)'}`);
console.log(`  og:url=${ogUrl ? ogUrl[1] : '(未找到)'}`);
console.log(`  含 pages.dev: ${html.includes('pages.dev') ? '是 ⚠️' : '否'}`);
