const fs = require('fs');
let c = fs.readFileSync('F:/zprintpro-nextjs/src/lib/seo.ts', 'utf8');

// 1. Add getSiteNAP function after siteConfig definition
const siteConfigEnd = c.indexOf('};', c.indexOf('export const siteConfig')) + 2;
const napFunction = `

// ============================================================================
// v4: 3 Locale Independent NAP (Name / Address / Phone)
// zh-hk: Virtual HK entity (gray compliance, user accepted)
// en: Shenzhen cross-border (transparent)
// ja: Shenzhen strict compliance (legal entity disclosed)
// ============================================================================

export interface SiteNAP {
  name: string;
  alternateName: string[];
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode?: string;
  };
  businessSchema: 'LocalBusiness' | 'Organization';
  areaServed: string[];
  founder?: string;
  legalEntityName?: string;
}

export function getSiteNAP(locale: Locale): SiteNAP {
  if (locale === 'zh-hk') {
    return {
      name: '\u667a\u5370\u96f2',
      alternateName: ['ZprintPro HK', '\u667a\u5370\u96f2(\u9999\u6e2f)', '\u667a\u5370\u96f2\u5370\u5237'],
      phone: '+852 5905 1334',
      email: 'hk@zprintpro.com',
      address: {
        street: 'Unit C, 15/F, Maxgrand Plaza, 3 Tai Yau Street',
        city: 'San Po Kong',
        region: 'Kowloon',
        country: 'HK',
        postalCode: undefined,
      },
      businessSchema: 'LocalBusiness',
      areaServed: ['Hong Kong', 'Kowloon', 'New Territories', 'Hong Kong Island'],
    };
  }
  if (locale === 'ja') {
    return {
      name: '\u667a\u5370\u96f2',
      alternateName: ['ZprintPro', '\u6df1\u30bb\u30f3\u5370\u5237'],
      phone: '+86 198 8085 1334',
      email: 'zprintpro@outlook.com',
      address: {
        street: 'No.1 Jiacheng Road, Pinghu Street, Longgang District',
        city: 'Shenzhen',
        region: 'Guangdong',
        country: 'CN',
        postalCode: '518111',
      },
      businessSchema: 'Organization',
      areaServed: ['Japan', 'China', 'Asia'],
      founder: '\u5510\u8fd0\u63d0',
      legalEntityName: '\u6df1\u5733\u5e02\u5f69\u9f99\u5370\u5237\u5305\u88c5\u6709\u9650\u516c\u53f8',
    };
  }
  // en (default)
  return {
    name: 'ZprintPro',
    alternateName: ['ZprintPro Global', 'ZprintPro'],
    phone: '+86 198 8085 1334',
    email: 'zprintpro@outlook.com',
    address: {
      street: 'No.1 Jiacheng Road, Pinghu Street, Longgang District',
      city: 'Shenzhen',
      region: 'Guangdong',
      country: 'CN',
      postalCode: '518111',
    },
    businessSchema: 'Organization',
    areaServed: ['US', 'GB', 'AU', 'CA', 'NZ', 'SG'],
  };
}
`;

c = c.substring(0, siteConfigEnd) + napFunction + c.substring(siteConfigEnd);

// 2. Update generateBusinessJsonLd to use getSiteNAP
// Replace siteConfig.name -> nap.name, siteConfig.phone -> nap.phone, etc.
const bizStart = c.indexOf('export function generateBusinessJsonLd');
const bizEnd = c.indexOf('\n}', bizStart) + 2;
let bizFunc = c.substring(bizStart, bizEnd);

// Add nap variable at the start of the function body
bizFunc = bizFunc.replace(
  '): SchemaOrgData {',
  '): SchemaOrgData {\n  const nap = getSiteNAP(locale);'
);

// Replace siteConfig references with nap
bizFunc = bizFunc.replace(/siteConfig\.name/g, 'nap.name');
bizFunc = bizFunc.replace(/siteConfig\.alternateName/g, 'nap.alternateName');
bizFunc = bizFunc.replace(/siteConfig\.phone/g, 'nap.phone');
bizFunc = bizFunc.replace(/siteConfig\.email/g, 'nap.email');
bizFunc = bizFunc.replace(/siteConfig\.address\.street/g, 'nap.address.street');
bizFunc = bizFunc.replace(/siteConfig\.address\.city/g, 'nap.address.city');
bizFunc = bizFunc.replace(/siteConfig\.address\.region/g, 'nap.address.region');
bizFunc = bizFunc.replace(/siteConfig\.address\.country/g, 'nap.address.country');
bizFunc = bizFunc.replace(/siteConfig\.address\.postalCode/g, 'nap.address.postalCode');

// Keep siteConfig.url and siteConfig.logo as-is (they don't change by locale)

c = c.substring(0, bizStart) + bizFunc + c.substring(bizEnd);

// 3. Update generateLocalBusinessSchema similarly
const lbStart = c.indexOf('export function generateLocalBusinessSchema');
const lbEnd = c.indexOf('\n}', lbStart) + 2;
let lbFunc = c.substring(lbStart, lbEnd);

lbFunc = lbFunc.replace(
  '): SchemaOrgData {',
  '): SchemaOrgData {\n  const nap = getSiteNAP(locale);'
);

lbFunc = lbFunc.replace(/siteConfig\.name/g, 'nap.name');
lbFunc = lbFunc.replace(/siteConfig\.phone/g, 'nap.phone');
lbFunc = lbFunc.replace(/siteConfig\.address\.street/g, 'nap.address.street');
lbFunc = lbFunc.replace(/siteConfig\.address\.city/g, 'nap.address.city');
lbFunc = lbFunc.replace(/siteConfig\.address\.region/g, 'nap.address.region');
lbFunc = lbFunc.replace(/siteConfig\.address\.country/g, 'nap.address.country');
lbFunc = lbFunc.replace(/siteConfig\.address\.postalCode/g, 'nap.address.postalCode');

// For zh-hk: keep LocalBusiness, for en/ja: the caller should use Organization instead
// But this function always generates LocalBusiness type, so we need to handle that
// For en/ja, we'll still generate LocalBusiness but with Shenzhen address (transparent)
// The caller (layout.tsx) decides which schema to use

c = c.substring(0, lbStart) + lbFunc + c.substring(lbEnd);

// 4. Update generateOrganizationSchema to use getSiteNAP
const orgStart = c.indexOf('export function generateOrganizationSchema');
if (orgStart > 0) {
  const orgEnd = c.indexOf('\n}', orgStart) + 2;
  let orgFunc = c.substring(orgStart, orgEnd);
  
  orgFunc = orgFunc.replace(
    '): SchemaOrgData {',
    '): SchemaOrgData {\n  const nap = getSiteNAP(locale);'
  );
  
  orgFunc = orgFunc.replace(/siteConfig\.name/g, 'nap.name');
  orgFunc = orgFunc.replace(/siteConfig\.alternateName/g, 'nap.alternateName');
  orgFunc = orgFunc.replace(/siteConfig\.phone/g, 'nap.phone');
  orgFunc = orgFunc.replace(/siteConfig\.email/g, 'nap.email');
  orgFunc = orgFunc.replace(/siteConfig\.address\.street/g, 'nap.address.street');
  orgFunc = orgFunc.replace(/siteConfig\.address\.city/g, 'nap.address.city');
  orgFunc = orgFunc.replace(/siteConfig\.address\.region/g, 'nap.address.region');
  orgFunc = orgFunc.replace(/siteConfig\.address\.country/g, 'nap.address.country');
  
  c = c.substring(0, orgStart) + orgFunc + c.substring(orgEnd);
}

// 5. Update geoConfig to use HK NAP for zh-hk
// Find geoConfig and update zh-hk entry
const geoIdx = c.indexOf("export const geoConfig");
if (geoIdx > 0) {
  // Update zh-hk region from CN back to HK
  c = c.replace(
    /'zh-hk': \{\s*region: 'CN'/,
    "'zh-hk': {\n    region: 'HK'"
  );
  // Update zh-hk areaServed back to HK districts
  c = c.replace(
    /areaServed: \['Shenzhen', 'Guangdong', 'Longgang', 'Pinghu'\]/,
    "areaServed: ['Hong Kong', 'Kowloon', 'New Territories', 'Hong Kong Island']"
  );
  // Update deliveryText
  c = c.replace(
    /'\u6df1\u5733\u672c\u5730\u767c\u8ca8\uff0c\u5168\u570b\u9806\u8c50\u76f4\u9054'/,
    "'\u8de8\u5883\u914d\u9001\uff0c\u9999\u6e2f\u5cf6/\u4e5d\u9f8d/\u65b0\u754c\u5747\u53ef\u9001\u9054'"
  );
  // Update geoKeywords
  c = c.replace(
    /geoKeywords: \['\u6df1\u5733', '\u9f8d\u5d17', '\u5e73\u6e56', '\u5ee3\u6771', '\u83ef\u5357', '\u4e2d\u570b\u5370\u5237', '\u6df1\u5733\u5370\u5237', '\u9f8d\u5d17\u5370\u5237'\]/,
    "geoKeywords: ['\u9999\u6e2f', '\u4e5d\u9f8d', '\u65b0\u754c', '\u6e2f\u5cf6', '\u7063\u4ed4', '\u65fa\u89d2', '\u9285\u947c\u7063', '\u5c16\u6c99\u5490']"
  );
}

// 6. Update phonePrefix in regionConfig: zh-hk back to +852
c = c.replace(/phonePrefix: '\+86',/g, "phonePrefix: '+852',");

// 7. Update regionCode: zh-hk back to HK
c = c.replace(/regionCode: 'CN',/, "regionCode: 'HK',");

// 8. Fix generateLocalBusinessSchema coordinates for zh-hk (HK, not Shenzhen)
c = c.replace("latitude: '22.5431'", "latitude: '22.3193'");
c = c.replace("longitude: '114.0579'", "longitude: '114.1694'");

fs.writeFileSync('F:/zprintpro-nextjs/src/lib/seo.ts', c, 'utf8');
console.log('Task A+B done. New file size:', c.length);
