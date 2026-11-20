const fs = require('fs');
const t = fs.readFileSync('src/app/[locale]/services/business-cards-printing/page.tsx', 'utf8');
const lines = t.split('\n');
console.log('total lines:', lines.length);
lines.forEach((l, i) => {
  if (/generateMetadata|export const metadata|JsonLd|<JsonLd|@type|BreadcrumbList|metadataBase|alternates|canonical/i.test(l)) console.log((i + 1) + ': ' + l.trim().slice(0, 150));
});
console.log('== body sample 60-120 ==');
console.log(lines.slice(59, 120).join('\n').slice(0, 3200));
