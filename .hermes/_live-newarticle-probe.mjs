// Live verification of the 2026-10-10 daily-content deliverable
// (corporate-holiday-cards-printing-guide) across all three locales:
//   - HTTP status
//   - FAQPage JSON-LD present in the served HTML (closes blog-deepfix ledger #12 / daily-content NEXT③)
//   - the §0.23.1 GSC marker is absent
const SLUG = 'corporate-holiday-cards-printing-guide';
const LOCALES = ['zh-hk', 'en', 'ja'];
const MARKER = '待校準';

for (const loc of LOCALES) {
  const url = `https://zprintpro.com/${loc}/blog/${SLUG}/`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    const html = await res.text();
    const faqPage = (html.match(/"@type"\s*:\s*"FAQPage"/g) || []).length;
    const marker = html.split(MARKER).length - 1;
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
    console.log(`[live] ${loc} status=${res.status} bytes=${html.length} FAQPage=${faqPage} gscMarker=${marker}`);
    console.log(`       title="${title.slice(0, 110)}"`);
  } catch (err) {
    console.log(`[live] ${loc} ERROR ${err.message}`);
  }
}
