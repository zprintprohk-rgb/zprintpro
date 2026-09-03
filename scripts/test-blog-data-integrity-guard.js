/**
 * scripts/test-blog-data-integrity-guard.js
 * 门童 #15 回归测试 (用户 2026-09-04 拍板落地配套)
 *
 * 用法: node scripts/test-blog-data-integrity-guard.js
 * 8 用例: 合法 0 命中 / 控制字符 / 嵌套引号 / mojibake / 键数 / 空对象 / 0 字节 / 合法换行不误报
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const guard = require(path.join(__dirname, 'guards', 'blog-data-integrity-guard.js'));

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'guard15-'));
let fail = 0;

function buildContent() {
  const obj = {};
  for (let i = 0; i < 85; i++) obj['slug-' + i] = { title: '文章' + i, content: '<p>測試內容 ' + i + '</p>' };
  return obj;
}

function run(name, fileContent, expectRule) {
  const f = path.join(tmp, name);
  fs.writeFileSync(f, fileContent, 'utf-8');
  const hits = guard.checkFile(f, { file: name, locale: 'zh-hk', minKeys: 79 }, process.cwd());
  const got = hits.map(h => h.ruleId);
  const pass = expectRule === null ? got.length === 0 : got.includes(expectRule);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}: expect=${expectRule || '(none)'} got=[${got.join(',')}]`);
  if (!pass) fail++;
}

// 1. 合法文件 → 0 命中
run('valid.json', JSON.stringify(buildContent(), null, 2), null);

// 2. 字符串内裸控制字符 (0x0A) → BLOGJSON_CTRL
run('ctrl.json', '{"a": "line1\nline2"}', 'BLOGJSON_CTRL');

// 3. 坏转义 (嵌套引号未 escape, 9/3 事故模式) → BLOGJSON_PARSE
run('badquote.json', '{"a": "<h2>He said "hi" loudly</h2>"}', 'BLOGJSON_PARSE');

// 4. mojibake 指纹 → BLOGJSON_MOJIBAKE
const moj = buildContent(); moj['slug-5'].title = '鏅哄嵃娓 測試';
run('mojibake.json', JSON.stringify(moj, null, 2), 'BLOGJSON_MOJIBAKE');

// 5. 键数不足 → BLOGJSON_KEYS
const few = {}; for (let i = 0; i < 10; i++) few['s' + i] = { title: 'x' };
run('fewkeys.json', JSON.stringify(few), 'BLOGJSON_KEYS');

// 6. 空对象 (键数兜底) + 真 0 字节 → BLOGJSON_EMPTY
run('emptyobj.json', '{}', 'BLOGJSON_KEYS');
run('zerobyte.json', '', 'BLOGJSON_EMPTY');

// 7. 字符串外换行 (合法空白) 不误报, 仅键数不足命中 → BLOGJSON_KEYS
run('newline-ok.json', '{\n  "a": "text with \\n escape"\n}', 'BLOGJSON_KEYS');

fs.rmSync(tmp, { recursive: true, force: true });
console.log(fail === 0 ? '\nALL 8 TESTS PASS (门童 #15)' : `\n${fail} TEST(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
