'use strict';
/** 诊断 v3: 定位「同形状样本为何 0 命中」的真实机制
 *  假设: 门童 #16 的 TS 扫描器存在**行/长度级**前置条件, 长行或引号内含 HTML 属性会截断
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));
const TARGET = path.join(REPO, 'src', 'data', 'buying-guides.ts');
const LEAK = '数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)';
// 与现网 L930 同形的 HTML 尾巴 (含单引号属性)
const HTML = `<p><small class="text-gray-500">${LEAK}</small></p>`;
const PAD = 'x'.repeat(8000);

(async () => {
  const orig = fs.readFileSync(TARGET, 'utf8');
  const CASES = [
    ['A title 短值 (基准阳性)', `title: "${LEAK}"\n`],
    ['B title 值含单引号属性', `title: "${HTML}"\n`],
    ['C title 值前置 8000 字填充', `title: "${PAD}${LEAK}"\n`],
    ['D 单引号包裹 + 内含单引号属性', `title: '${HTML}'\n`],
    ['E 8 个 title 行 (含正常值)', Array.from({ length: 8 }, (_, i) => `title: "normal title number ${i} with padding"`).join('\n') + '\n' + `title: "${LEAK}"\n`],
    ['F 命中词在行尾 8800 字符后', `title: "${PAD}${HTML}"\n`],
  ];
  try {
    for (const [name, body] of CASES) {
      fs.writeFileSync(TARGET, body, 'utf8');
      let n = 0;
      try { n = (await guard.scan([TARGET])).length; } catch (e) { n = 'ERR:' + e.message; }
      console.log(`${name}: ${n} 命中 (样本长 ${body.length})`);
    }
    // G: 真实档 + 在头部追加一条 title 泄漏 (确认长档本身不屏蔽)
    fs.writeFileSync(TARGET, `title: "${LEAK}"\n` + orig, 'utf8');
    console.log(`G 真实档头部追加 title 泄漏: ${(await guard.scan([TARGET])).length} 命中 (长档 ${(orig.length + 158)})`);
    // H: 真实档, 把这行泄漏改写成 content 字段形态
    const withContent = `  content: "${HTML}",\n` + orig;
    fs.writeFileSync(TARGET, withContent, 'utf8');
    console.log(`H 真实档头部追加 content 泄漏: ${(await guard.scan([TARGET])).length} 命中`);
  } finally {
    fs.writeFileSync(TARGET, orig, 'utf8');
    console.log('\n已还原:', (fs.readFileSync(TARGET, 'utf8').length === orig.length) ? 'OK' : 'MISMATCH');
  }
  process.exit(0);
})();
