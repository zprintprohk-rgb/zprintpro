/* G1 schema 结构验证: Organization (address/sameAs/alternateName) + WebSite/SearchAction + twitter.site */
import { generateOrganizationSchema, generateWebsiteJsonLd, generateHomeMetadata } from '../src/lib/seo';

for (const loc of ['zh-hk', 'en', 'ja'] as const) {
  const org = generateOrganizationSchema(loc) as any;
  console.log(`--- ${loc} Organization ---`);
  console.log(`name: ${org.name}`);
  console.log(`alternateName: ${JSON.stringify(org.alternateName)}`);
  console.log(`address: ${JSON.stringify(org.address)}`);
  console.log(`sameAs: ${JSON.stringify(org.sameAs)}`);
  console.log(`areaServed: ${JSON.stringify((org.areaServed || []).map((a: any) => a.name))}`);
  console.log(`contactPoint.tel: ${org.contactPoint?.telephone}`);
  JSON.parse(JSON.stringify(org)); // 可序列化
}
const ws = generateWebsiteJsonLd() as any;
console.log(`\nWebSite: ${ws['@type']} | SearchAction: ${JSON.stringify(ws.potentialAction)}`);
JSON.parse(JSON.stringify(ws));
const md = generateHomeMetadata('en' as const);
console.log(`\nen twitter.site: ${md.twitter?.site}`);
const mdZh = generateHomeMetadata('zh-hk' as const);
console.log(`zh-hk twitter.site: ${mdZh.twitter?.site} | og.siteName: ${mdZh.openGraph?.siteName}`);
const mdJa = generateHomeMetadata('ja' as const);
console.log(`ja twitter.site: ${mdJa.twitter?.site} | og.siteName: ${mdJa.openGraph?.siteName}`);
console.log('\nGEO 归一: zh-hk', mdZh.twitter?.site === mdZh.openGraph?.siteName, '| en', md.twitter?.site === md.openGraph?.siteName, '| ja', mdJa.twitter?.site === mdJa.openGraph?.siteName);
