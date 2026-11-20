'use strict';
/** 诊断 v2: 为什么真实路径注入的 title 样本 scan() 返回 0 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));
const TARGET = path.join(REPO, 'src', 'data', 'buying-guides.ts');
const LEAK = '数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)';

(async () => {
  const orig = fs.readFileSync(TARGET, 'utf8');
  const samples = {
    'title 顶格双引号 (最简形态)': `title: "${LEAK}"\n`,
    'title 缩进2空格': `  title: "${LEAK}",\n`,
    'title 在对象内一行开头': `{\n  title: "${LEAK}",\n}\n`,
    '真实生产档 (对照)': orig,
  };
  try {
    for (const [name, body] of Object.entries(samples)) {
      fs.writeFileSync(TARGET, body, 'utf8');
      const hits = await guard.scan([TARGET]);
      console.log(`${name}: scan -> ${hits.length} 命中`);
      if (hits.length) hits.slice(0, 3).forEach(h => console.log(`    [${h.ruleId}] ${h.file}:${h.line} 「${h.match}」 field=${h.fix ? h.fix.slice(0, 50) : ''}`));
    }
    // 直接调用内置 scanTs/checkValue 同构逻辑验证: 用绝对路径传参形态差异
    fs.writeFileSync(TARGET, samples['title 顶格双引号 (最简形态)'], 'utf8');
    console.log('\n--- 传参形态对比 ---');
    console.log('绝对路径 scan:', (await guard.scan([TARGET])).length);
    console.log('正斜杠路径 scan:', (await guard.scan([TARGET.replace(/\\/g, '/')])).length);
    console.log('相对路径 scan:', (await guard.scan(['src/data/buying-guides.ts'])).length);
  } finally {
    fs.writeFileSync(TARGET, orig, 'utf8');
    console.log('\n已还原:', (fs.readFileSync(TARGET, 'utf8').length === orig.length) ? 'OK' : 'LENGTH MISMATCH');
  }
  process.exit(0);
})();
