/* C2 复探: deploy 完全上线后核查首轮疑似失败项 */
import { execSync } from 'child_process';
const BASE = 'https://zprintpro.com';
async function p(url, needle) {
  try {
    const html = execSync(`curl -s -L "${url}"`, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    console.log(`${html.includes(needle) ? '✅' : '❌'} ${url} | "${needle}" | len=${html.length}`);
  } catch (e) { console.log('ERR', url, String(e).slice(0, 80)); }
}
await p(`${BASE}/en/product/waterproof-stickers/`, 'Same-Day Express Delivery');
await p(`${BASE}/en/product/waterproof-stickers/`, '30-sec AI Quote');
await p(`${BASE}/en/product/waterproof-stickers/`, 'Price Ladder');
await p(`${BASE}/en/product/waterproof-stickers/`, 'Best value');
await p(`${BASE}/en/product/waterproof-stickers/`, 'Frequently Asked Questions');
await p(`${BASE}/en/product/waterproof-stickers/`, 'Free US shipping $99+');
await p(`${BASE}/en/product/doujinshi-printing/`, '30-sec AI Quote');
await p(`${BASE}/en/product/doujinshi-printing/`, 'Frequently Asked Questions');
await p(`${BASE}/en/product/doujinshi-printing/`, 'Asia factory');
await p(`${BASE}/en/product/foil-wedding-invitations/`, 'Frequently Asked Questions');
await p(`${BASE}/en/product/catalog-printing/`, 'Frequently Asked Questions');
await p(`${BASE}/en/product/wall-calendars/`, 'Frequently Asked Questions');
await p(`${BASE}/en/product/white-card-boxes/`, 'Frequently Asked Questions');
await p(`${BASE}/en/product/white-card-boxes/`, 'Minimum order');
await p(`${BASE}/en/product/white-card-boxes/`, 'File Specs');
await p(`${BASE}/en/product/escort-cards/`, 'name tags');
