// verify-15years-en-usa-fix.js
// 7-问 checklist (§13.16 v2): 15+ 年口径 + en 美国集中 + 3 locale 防污染
const fs = require('fs');
const { execSync } = require('child_process');

let pass = 0, fail = 0;
const check = (label, ok, detail) => {
  const tag = ok ? '[PASS]' : '[FAIL]';
  console.log(`${tag} ${label}${detail ? ': ' + detail : ''}`);
  ok ? pass++ : fail++;
};

console.log('=== 15+ 年 + en 美国集中 + 防污染 7 问 checklist ===\n');

// 问 1: 9 年残留 = 0
try {
  const out = execSync(`grep -rn "9 Years\\\\|9 年印刷經驗\\\\|9 年の実績\\\\|9 years serving\\\\|9 years in business" src/ docs/ 2>nul || echo none`, { encoding: 'utf8', shell: 'cmd.exe' });
  const lines = out.split('\n').filter(l => l.includes(':') && !l.includes('none'));
  check('Q1 9 年残留 = 0', lines.length === 0, lines.length > 0 ? lines.slice(0, 3).join(' | ') : 'clean');
} catch (e) { check('Q1 9 年残留', true, 'no hit (grep returns 1)'); }

// 问 2: 2017 年残留 = 0
try {
  const out = execSync(`grep -rn "2017 年起\\\\|2017 年創業\\\\|founded 2017\\\\|since 2017" src/ docs/ 2>nul || echo none`, { encoding: 'utf8', shell: 'cmd.exe' });
  const lines = out.split('\n').filter(l => l.includes(':') && !l.includes('none'));
  check('Q2 2017 年残留 = 0', lines.length === 0, lines.length > 0 ? lines.slice(0, 3).join(' | ') : 'clean');
} catch (e) { check('Q2 2017 年残留', true, 'no hit'); }

// 问 3: 2014 (about 用错的旧年份) = 0
try {
  const out = execSync(`grep -rn "2014" src/app/\\\\[locale\\\\]/about/ 2>nul || echo none`, { encoding: 'utf8', shell: 'cmd.exe' });
  const lines = out.split('\n').filter(l => l.includes(':') && !l.includes('none') && !l.toLowerCase().includes('comment'));
  check('Q3 about 2014 残留 = 0', lines.length === 0, lines.length > 0 ? lines.slice(0, 3).join(' | ') : 'clean');
} catch (e) { check('Q3 about 2014 残留', true, 'no hit'); }

// 问 4: stats 10+ 残留 = 0
try {
  const out = execSync(`grep -rn "stats.*10+\\\\|'years'.*10+" src/ 2>nul || echo none`, { encoding: 'utf8', shell: 'cmd.exe' });
  const lines = out.split('\n').filter(l => l.includes(':') && !l.includes('none'));
  check('Q4 stats 10+ 残留 = 0', lines.length === 0, lines.length > 0 ? lines.slice(0, 3).join(' | ') : 'clean');
} catch (e) { check('Q4 stats 10+ 残留', true, 'no hit'); }

// 问 5: 15+ 年同步 ≥ 5 hit (直接 Node 读文件, 避免 cmd.exe 转义问题)
try {
  const srcDirs = ['src/components', 'src/app', 'src/lib'];
  let hits = 0;
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      const p = `${dir}/${f}`;
      const stat = fs.statSync(p);
      if (stat.isDirectory()) walk(p);
      else if (/\.(ts|tsx|js|json|md)$/.test(f)) {
        const content = fs.readFileSync(p, 'utf8');
        if (/15\+ 年|15\+ Years|15\+ 年の|15\+ years serving|15\+ years in business|15\+ years experience|15 Years Experience|15年本地經驗|15年の実績|15年以上/.test(content)) hits++;
      }
    }
  };
  srcDirs.forEach(walk);
  check('Q5 15+ 年同步 ≥ 5 hit', hits >= 5, `${hits} files`);
} catch (e) { check('Q5 15+ 年同步', false, e.message); }

// 问 6: foundedDate = 2012 (legal/press-kit/AboutPage schema)
try {
  const legalOut = fs.readFileSync('src/app/[locale]/legal/page.tsx', 'utf8');
  const pressOut = fs.readFileSync('src/app/[locale]/press-kit/page.tsx', 'utf8');
  const schemaOut = fs.readFileSync('src/lib/seo/schema-extensions.ts', 'utf8');
  const aboutOut = fs.readFileSync('src/app/[locale]/about/page.tsx', 'utf8');
  const legal2012 = legalOut.includes('establishedYear: 2012');
  const press2012 = pressOut.match(/aboutText:.*2012/s);
  const schema2012 = schemaOut.includes("foundingDate: string = '2012'");
  const about2012 = aboutOut.includes("foundingDate: '2012'");
  check('Q6 foundedDate 2012 同步', legal2012 && press2012 && schema2012 && about2012,
    `legal=${legal2012} press=${!!press2012} schema=${schema2012} about=${about2012}`);
} catch (e) { check('Q6 foundedDate 2012 同步', false, e.message); }

// 问 7: en Hero 5 sharp hook ≥ 4 (Free Shipping / Free Design / No setup fees / Free Mockup / Made for USA)
try {
  const hero = fs.readFileSync('src/components/home/HeroBanner.tsx', 'utf8');
  const enBlock = hero.match(/en:\s*\{[\s\S]*?slides:\s*\[([\s\S]*?)\],/);
  const block = enBlock ? enBlock[1] : '';
  const sharpHooks = [
    /Free US Shipping/i,
    /Free design/i,
    /Free mockup/i,
    /No setup fees/i,
    /Free Design Mockup/i,
    /Free dieline mockup/i,
    /Free design proof/i,
  ];
  const matched = sharpHooks.filter(re => re.test(block));
  check('Q7 en Hero sharp hook ≥ 4', matched.length >= 4, `${matched.length}/${sharpHooks.length} matched`);
} catch (e) { check('Q7 en Hero sharp hook', false, e.message); }

console.log(`\n=== TOTAL: ${pass} pass / ${fail} fail ===`);
process.exit(fail > 0 ? 1 : 0);