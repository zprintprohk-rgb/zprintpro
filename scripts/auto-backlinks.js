#!/usr/bin/env node
/**
 * ZprintPro Global Backlink Submission Script
 * Automates business directory submissions via HTTP POST/GET
 */

const https = require('https');
const http = require('http');
const fs = require('fs');

// ============================================================================
// NAP Data (3 locale)
// ============================================================================
const NAP = {
  'zh-hk': {
    company: '智印雲 ZprintPro',
    street: '香港九龍新蒲崗大有街3號萬廣大廈15樓C室',
    city: '九龍',
    region: 'Hong Kong',
    country: 'HK',
    postalCode: '',
    phone: '+852 5905 1334',
    email: 'zprintpro@outlook.com',
    website: 'https://zprintpro.com/zh-hk/',
    description: '香港專業印刷服務，貼紙/宣傳單張/包裝盒定制，即日交貨，港九新界免費速遞。ISO 9001 認證。',
    keywords: '印刷,貼紙,宣傳單張,包裝盒,紙袋',
    category: '印刷服務',
  },
  en: {
    company: 'ZprintPro (Shenzhen Cailong Printing & Packaging Co., Ltd.)',
    street: 'No.1 Jiacheng Road, Pinghu Street, Longgang District',
    city: 'Shenzhen',
    region: 'Guangdong',
    country: 'CN',
    postalCode: '518111',
    phone: '+86 198 8085 1334',
    email: 'zprintpro@outlook.com',
    website: 'https://zprintpro.com/en/',
    description: 'Custom printing service — stickers, flyers, packaging boxes. ISO 9001 certified. 72h global DHL delivery. 30-second AI instant quote.',
    keywords: 'printing,custom stickers,flyer printing,packaging boxes,product labels',
    category: 'Printing Services',
  },
  ja: {
    company: '深圳市彩龍印刷包装有限公司 (ZprintPro)',
    street: '広東省深圳市龍崗区平湖街道嘉城路1号',
    city: '深圳市',
    region: '広東省',
    country: 'CN',
    postalCode: '518111',
    phone: '+86 198 8085 1334',
    email: 'zprintpro@outlook.com',
    website: 'https://zprintpro.com/ja/',
    description: 'ステッカー、チラシ、パッケージ印刷。深圳工場直結、ISO 9001認証。3〜5営業日納品。日本語サポート。',
    keywords: '印刷,ステッカー,チラシ,パッケージ,紙袋',
    category: '印刷サービス',
  },
};

// ============================================================================
// Submission targets (simplest first)
// ============================================================================
const results = [];
let totalSuccess = 0;
let totalFailed = 0;

function postJSON(hostname, path, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = https.request({
      hostname, path, method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'ZprintPro-BacklinkBot/1.0',
      },
      timeout: 15000,
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.write(payload);
    req.end();
  });
}

function postForm(hostname, path, formData) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams(formData).toString();
    const req = https.request({
      hostname, path, method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params),
        'User-Agent': 'ZprintPro-BacklinkBot/1.0',
      },
      timeout: 15000,
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.write(params);
    req.end();
  });
}

async function submitTo(platform, locale, config) {
  const nap = NAP[locale];
  console.log(`\n[${platform}] ${locale} — submitting...`);
  
  try {
    let result;
    if (config.method === 'json') {
      result = await postJSON(config.hostname, config.path, config.buildPayload(nap));
    } else if (config.method === 'form') {
      result = await postForm(config.hostname, config.path, config.buildPayload(nap));
    } else if (config.method === 'get') {
      // GET submission with query params
      const query = new URLSearchParams(config.buildPayload(nap)).toString();
      result = await new Promise((resolve, reject) => {
        https.get(`https://${config.hostname}${config.path}?${query}`, { timeout: 15000 }, (res) => {
          let body = '';
          res.on('data', c => body += c);
          res.on('end', () => resolve({ status: res.statusCode, body }));
        }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')); });
      });
    }
    
    if (result.status >= 200 && result.status < 400) {
      console.log(`  ✅ ${result.status} — accepted`);
      totalSuccess++;
      results.push({ platform, locale, status: result.status, success: true });
    } else {
      console.log(`  ⚠️ ${result.status} — may need manual confirmation`);
      totalFailed++;
      results.push({ platform, locale, status: result.status, success: false, reason: `HTTP ${result.status}` });
    }
  } catch (e) {
    console.log(`  ❌ Failed: ${e.message}`);
    totalFailed++;
    results.push({ platform, locale, status: 0, success: false, reason: e.message });
  }
}

// ============================================================================
// Platform definitions
// ============================================================================
const platforms = {
  // Bing IndexNow (already integrated, but also submit URL list)
  'bing-indexnow': {
    hostname: 'www.bing.com',
    path: '/indexnow',
    method: 'json',
    buildPayload: (nap) => ({
      host: 'zprintpro.com',
      key: 'b8f1c2d3e4a5f6b7c8d9e0f1a2b3c4d5',
      keyLocation: 'https://zprintpro.com/b8f1c2d3e4a5f6b7c8d9e0f1a2b3c4d5.txt',
      urlList: [nap.website, `${nap.website}contact/`, `${nap.website}about/`],
    }),
  },
  
  // Google Search Console sitemap ping
  'google-sitemap': {
    hostname: 'www.google.com',
    path: '/ping',
    method: 'get',
    buildPayload: (nap) => ({
      sitemap: 'https://zprintpro.com/sitemap-index.xml',
    }),
  },
  
  // Klamm (free German PR directory — quick backlink)
  'klamm': {
    hostname: 'www.klamm.de',
    path: '/api/links/add',
    method: 'json',
    buildPayload: (nap) => ({
      url: nap.website,
      title: nap.company,
      description: nap.description.substring(0, 200),
      category: nap.category,
    }),
  },
};

// ============================================================================
// Execute
// ============================================================================
async function main() {
  console.log('='.repeat(50));
  console.log('ZprintPro Global Backlink Submission');
  console.log('='.repeat(50));
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Platforms: ${Object.keys(platforms).length}`);
  console.log(`Locales: zh-hk, en, ja\n`);
  
  // Submit each platform for each locale
  for (const [name, config] of Object.entries(platforms)) {
    for (const locale of ['zh-hk', 'en', 'ja']) {
      await submitTo(name, locale, config);
      // Small delay between submissions
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('SUBMISSION REPORT');
  console.log('='.repeat(50));
  console.log(`Total: ${results.length} attempts`);
  console.log(`Success: ${totalSuccess}`);
  console.log(`Failed: ${totalFailed}`);
  
  // Save report to file
  const report = {
    timestamp: new Date().toISOString(),
    total: results.length,
    success: totalSuccess,
    failed: totalFailed,
    details: results,
    note: 'Some platforms require manual account creation or email verification. Visit the URL directly to complete registration.',
  };
  
  fs.writeFileSync('F:/zprintpro-nextjs/backlink-report.json', JSON.stringify(report, null, 2), 'utf8');
  console.log('\nReport saved to: F:/zprintpro-nextjs/backlink-report.json');
}

main().catch(console.error);
