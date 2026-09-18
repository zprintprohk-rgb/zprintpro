// Node.js verify 308 redirect (bypass local schannel issues)
const https = require('https');
const { URL } = require('url');

const urls = [
  'https://zprintpro.com/zh-hk/category/others/',
  'https://zprintpro.com/en/category/others/',
  'https://zprintpro.com/ja/category/others/',
  'https://zprintpro.com/zh-hk/category/others',
  'https://zprintpro.com/zh-hk/others/',
  'https://zprintpro.com/zh-hk/category/flyers/',
  'https://zprintpro.com/en/category/flyers/',
  'https://zprintpro.com/ja/category/flyers/',
  'https://zprintpro.com/'
];

function head(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      method: 'HEAD',
      timeout: 20000,
      headers: { 'User-Agent': 'M3-Verify/1.0' }
    }, (res) => {
      resolve({ url, status: res.statusCode, location: res.headers.location });
    });
    req.on('error', (e) => resolve({ url, error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ url, error: 'timeout' }); });
    req.end();
  });
}

(async () => {
  console.log('=== 5 步真 verify · STEP 3: curl 308 + flyers 200 (Node https) ===');
  for (const url of urls) {
    const r = await head(url);
    if (r.error) {
      console.log(`${url.padEnd(58)} : ERROR ${r.error}`);
    } else {
      console.log(`${url.padEnd(58)} : ${r.status} ${r.location || ''}`);
    }
  }
})();
