// Strip inline <script type="application/ld+json"> from blog content
// per K3 SSoT = page.tsx principle
// 2026-08-28 K3 8/28 拍板 en 3 篇 (calendar + rush + packaging) 内嵌 4 schema 块重复渲染
const fs = require('fs');
const slugs = ['2027-monthly-calendar-printing-timetable', 'rush-printing-delivery-guide', 'packaging-box-price-2026'];
const locales = ['en']; // ja + zh-hk already 0 inline

let totalStripped = 0;
for (const loc of locales) {
  const path = `./src/data/blog-data/${loc}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const slug of slugs) {
    const post = data[slug];
    if (!post || !post.content) continue;
    const before = post.content;
    // Remove all <script type="application/ld+json">...</script> blocks (including surrounding whitespace)
    const after = before.replace(/\s*<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/g, '\n\n');
    const stripped = (before.match(/<script[^>]*application\/ld\+json/g) || []).length;
    if (stripped > 0) {
      data[slug].content = after;
      console.log(`  ${loc}/${slug}: stripped ${stripped} inline JSON-LD scripts (${before.length} -> ${after.length} bytes, delta ${before.length - after.length})`);
      totalStripped += stripped;
    } else {
      console.log(`  ${loc}/${slug}: 0 inline scripts (skip)`);
    }
  }
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
console.log(`\nTotal inline JSON-LD stripped: ${totalStripped}`);
