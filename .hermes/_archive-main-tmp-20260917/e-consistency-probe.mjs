// E 口径线上抽查: 2 小時內回覆 已生效 + 冲突口径已清除 (纯 JS, 无 TS 语法)
import { execSync } from 'child_process';

const BASE = 'https://zprintpro.com';
const fetchH = (u, retries = 6) => {
  for (let i = 0; i < retries; i++) {
    try {
      const out = execSync(`curl.exe -sS -m 25 "${BASE}${u}"`, { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 });
      if (out.length > 20000) return out;
    } catch { /* retry */ }
  }
  return '';
};

let pass = 0, fail = 0;
const failures = [];
const check = (cond, label) => { if (cond) pass++; else { fail++; failures.push(label); } };

// [页面, 必须包含, 必须不含(回覆时效类冲突串)]
const cases = [
  ['/zh-hk/contact/', ['2 小時內回覆'], ['15 分鐘內專人回覆', '5 分鐘回覆', '24 小時內回覆']],
  ['/en/contact/', ['within 2 hours'], ['reply within 24 hours', 'within 15 minutes', '24h response']],
  ['/ja/contact/', ['2時間以内'], ['15分以内', '24時間以内に返信']],
  ['/zh-hk/faq/', ['2 小時回覆承諾'], ['24 小時回覆承諾']],
  ['/en/faq/', ['2-Hour Response'], ['24-Hour Response']],
  ['/ja/faq/', ['2 時間返答コミット'], ['24 時間返答コミット']],
  ['/zh-hk/quote/', ['2 小時內回覆'], ['24小時內回覆']],
  ['/en/quote/', ['within 2 hours'], ['reply within 24 hours']],
  ['/zh-hk/about/', ['2 小時內回覆承諾'], ['24 小時內回覆承諾']],
  ['/zh-hk/category/stickers/', ['2 小時內回覆'], ['24 小時內回覆']],
  ['/en/category/stickers/', ['within 2h'], ['within 24h']],
  ['/ja/category/stickers/', ['2時間以内に返信'], ['24時間以内に返信']],
  ['/zh-hk/legal/', ['2 小時內回覆'], ['1-2 個工作天內回覆']],
  ['/zh-hk/press-kit/', ['2 小時內回覆'], ['24小時內回覆']],
];

for (const [url, must, mustNot] of cases) {
  const html = fetchH(url);
  if (!html) { check(false, `${url} fetch 失败`); continue; }
  for (const m of must) check(html.includes(m), `${url} 含「${m}」`);
  for (const m of mustNot) check(!html.includes(m), `${url} 不应含「${m}」`);
}

console.log(`\n===== E 口径线上抽查 =====`);
console.log(`PASS: ${pass}  FAIL: ${fail}`);
if (failures.length) { for (const f of failures) console.log('  ✗ ' + f); }
else console.log('ALL GREEN');
process.exit(fail === 0 ? 0 : 1);
