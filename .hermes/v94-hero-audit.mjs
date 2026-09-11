// v9.4 前置核对: 线上三页 hero 实际渲染结构 (PLP 范本 vs Blog vs Contact)
import { execSync } from 'child_process';

const BASE = 'https://zprintpro.com';
const get = (u, retries = 6) => {
  for (let i = 0; i < retries; i++) {
    try {
      const out = execSync(`curl.exe -sS -m 25 "${BASE}${u}"`, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 });
      if (out.length > 20000) return out;
    } catch { /* retry */ }
  }
  return '';
};

const pages = [
  ['PLP范本 zh-hk', '/zh-hk/category/wedding-invitations/'],
  ['PLP范本 en', '/en/category/wedding-invitations/'],
  ['Blog列表 zh-hk', '/zh-hk/blog/'],
  ['Contact zh-hk', '/zh-hk/contact/'],
];

for (const [name, url] of pages) {
  const html = get(url);
  console.log(`\n########## ${name} (${url}) len=${html.length}`);
  if (!html) { console.log('  fetch 失败'); continue; }
  // 找面包屑
  const bc = html.indexOf('aria-label="breadcrumb"');
  if (bc >= 0) {
    console.log('  --- 面包屑前后 700B ---');
    console.log('  ' + html.slice(Math.max(0, bc - 400), bc + 300).replace(/\s+/g, ' '));
  } else {
    console.log('  (无 aria-label="breadcrumb")');
  }
  // hero 内 H1 之前的结构
  const h1 = html.indexOf('<h1');
  if (h1 >= 0) {
    console.log('  --- H1 前后 500B ---');
    console.log('  ' + html.slice(Math.max(0, h1 - 500), h1 + 200).replace(/\s+/g, ' '));
  }
}
