// IndexNow push for W6+W7 (others 308 + posters en/ja)
const https = require('https');

const KEY = 'b4743800634c73a56fc734e58d77a5d9';
const HOST = 'zprintpro.com';
const URL_LIST = [
  'https://zprintpro.com/zh-hk/category/flyers/',
  'https://zprintpro.com/en/category/flyers/',
  'https://zprintpro.com/ja/category/flyers/',
  'https://zprintpro.com/zh-hk/category/posters/',
  'https://zprintpro.com/en/category/posters/',
  'https://zprintpro.com/ja/category/posters/',
];

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: URL_LIST,
});

const req = https.request({
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
  timeout: 20000,
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`IndexNow response: ${res.statusCode}`);
    console.log(`Body: ${data}`);
    console.log(`URLs submitted: ${URL_LIST.length}`);
  });
});

req.on('error', (e) => {
  console.log(`IndexNow error: ${e.message}`);
});

req.write(body);
req.end();
