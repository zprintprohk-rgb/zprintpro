// T1 8词批线上复验 — curl 8 页 × 3 locale
const { execSync } = require('child_process');
const pages = ['packaging-box-pricing-2026','kraft-paper-box-types-comparison-2026','sticker-material-pvc-vinyl-removable','sticker-guide','rush-printing-hk-guide','same-day-flyers-printing-hong-kong-guide','packaging-box-custom-guide','flyer-printing-guide','saddle-stitch-booklet-printing-guide'];
const base = 'https://zprintpro.com';
let fail = 0;
for (const p of pages) {
  for (const loc of ['zh-hk','en','ja']) {
    const url = `${base}/${loc}/blog/${p}/`;
    try {
      const out = execSync(`curl.exe -s -o NUL -w "%{http_code}" "${url}"`, { encoding: 'utf8', timeout: 30000 });
      const code = out.trim();
      const status = code === '200' ? '✅' : '❌';
      if (code !== '200') fail++;
      console.log(`${status} ${loc}/blog/${p} → ${code}`);
    } catch (e) {
      fail++;
      console.log(`❌ ${loc}/blog/${p} → ERROR ${e.message.slice(0,60)}`);
    }
  }
}
console.log(fail ? `\n${fail} 个非 200` : '\n✅ 全部 27 URL 200');
