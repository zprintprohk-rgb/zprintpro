// .hermes/_b1c95e_sample2.cjs — FSC C123456 / 國際頂級 / 12 大行業 / 15 年 样本
const fs = require('fs');
const files = {
  en: ['src/data/blog-data/en.json'],
  ja: ['src/data/blog-data/ja.json'],
  zh: ['src/data/blog-data/zh-hk.json'],
  about: ['src/app/[locale]/about/page.tsx'],
  misc: ['src/data/blog-posts.ts', 'src/data/case-studies/cover-industries-zh-hk.json'],
};
for (const [lang, fs2] of Object.entries(files)) {
  for (const f of fs2) {
    const t = fs.readFileSync(f, 'utf8');
    for (const p of ['FSC C123456', '國際頂級', '12 大行業']) {
      let i = 0, n = 0;
      while (n < 3) {
        const j = t.indexOf(p, i);
        if (j < 0) break;
        console.log(`[${lang}|${p}]`, JSON.stringify(t.slice(Math.max(0, j - 55), j + 55).replace(/\s+/g, ' ')));
        i = j + 1; n++;
      }
    }
    // 15 年 样本 (排除 2015 年)
    let i = 0, n = 0;
    while (n < 4) {
      const j = t.indexOf('15 年', i);
      if (j < 0) break;
      if (!/\d/.test(t[j - 1] || '')) { console.log(`[${lang}|15年]`, JSON.stringify(t.slice(Math.max(0, j - 50), j + 50).replace(/\s+/g, ' '))); n++; }
      i = j + 1;
    }
  }
}
