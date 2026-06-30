const fs = require('fs');
let c = fs.readFileSync('F:/zprintpro-nextjs/src/lib/seo.ts', 'utf8');

// 1. Add sameAs to SiteNAP interface
c = c.replace(
  '  legalEntityName?: string;',
  '  legalEntityName?: string;\n  sameAs: string[];'
);

// 2. Add sameAs to each locale in getSiteNAP

// zh-hk: Add before areaServed
c = c.replace(
  "areaServed: ['Hong Kong', 'Kowloon', 'New Territories', 'Hong Kong Island'],",
  `areaServed: ['Hong Kong', 'Kowloon', 'New Territories', 'Hong Kong Island'],
      // Backlinks / citation profiles (zh-hk market)
      sameAs: [
        // HK business directories (to be created)
        // 'https://www.google.com/maps/place/ZprintPro',
        // 'https://www.yellowpages.com.hk/',
        // 'https://hk.asiaxpat.com/',
        // 'https://hk.kompass.com/',
        // 'https://www.hktdc.com/',
      ],`
);

// ja: Add before areaServed
c = c.replace(
  "areaServed: ['Japan', 'China', 'Asia'],",
  `areaServed: ['Japan', 'China', 'Asia'],
      // Backlinks / citation profiles (ja market - 严格合规)
      sameAs: [
        // Japan business directories (to be created)
        // 'https://www.google.com/maps/place/ZprintPro',
        // 'https://itp.ne.jp/',
        // 'https://www.ekiten.jp/',
        // 'https://www.b-mall.ne.jp/',
        // 'https://www.houjin-bangou.nta.go.jp/',
      ],`
);

// en: Add before areaServed
c = c.replace(
  "areaServed: ['US', 'GB', 'AU', 'CA', 'NZ', 'SG'],",
  `areaServed: ['US', 'GB', 'AU', 'CA', 'NZ', 'SG'],
      // Backlinks / citation profiles (en/global market)
      sameAs: [
        // Global business directories (to be created)
        // 'https://www.google.com/maps/place/ZprintPro',
        // 'https://clutch.co/',
        // 'https://www.trustpilot.com/',
        // 'https://www.thomasnet.com/',
        // 'https://www.alibaba.com/',
      ],`
);

// 3. Update generateOrganizationSchema to use sameAs from getSiteNAP
// Find the sameAs assignment and make it use nap.sameAs
c = c.replace(
  'sameAs: [],',
  `sameAs: nap.sameAs.length > 0 ? nap.sameAs : [],`
);

fs.writeFileSync('F:/zprintpro-nextjs/src/lib/seo.ts', c, 'utf8');
console.log('sameAs locale-aware infrastructure added. Size:', c.length);
