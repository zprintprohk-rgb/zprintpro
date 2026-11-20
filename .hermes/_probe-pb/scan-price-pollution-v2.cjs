'use strict';
/**
 * scan-price-pollution-v2.cjs — Step 2 驗收 4 之「語系正確版」複掃
 *
 * 原掃描器 scan-price-pollution.cjs 的 A 類判準 = 「en/ja 鍵位含漢字」, 但日文本來就用漢字;
 * 其 B 類簡體字表內含「格」(繁簡同形字, 只因 价/格 連寫被誤收), 會誤報正確的繁體港式文案。
 * 本 v2 用「語系正確判準」複掃, 提供可逐條對照的數字:
 *   A-en      : en 鍵位含 CJK / 假名                  → 必須 0
 *   A-ja-only : ja 鍵位含漢字但零假名 (直貼中文)        → 必須 0
 *   A-ja-simp : ja 鍵位含簡體專用字                    → 必須 0
 *   A-ja-ok   : ja 鍵位含漢字且含假名 (真日文)          → 合法殘餘 (逐條附假名證據)
 *   B-orig    : 原掃描器簡體字表命中 (供對照)           → 逐字列出誤報字
 *   B-strict  : zh-hk 鍵位含簡體專用字 (同形字已剔除)    → 必須 0
 */
const fs = require('fs');
const P = 'F:\\zprintpro-nextjs\\src\\lib\\price-data.generated.ts';
const lines = fs.readFileSync(P, 'utf8').split('\n');

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;
const KANA = /[\u3040-\u30ff]/;
const SIMP_ORIG = /[们个为无与书车门问说时东华产国学体线标签页单价格质简边发对开关电话后从这来让给还两么义应该当经历众]/;
// 簡體專用字 (剔除繁簡同形/傳統通用字: 格 卡 字 面 里 台 后 制 着 岳 ; 並補上 专/贴/纸/册/烫/订/货/运 等印刷高頻字)
const SIMP_STRICT = /[们个为无与书车门问说时东华产国学体线标签页单价质简边发对开关电话从这来让给还两么义应该当经历众专贴纸册烫订货运龙极飞术复图书厅际备养营获证读设计构团创药饮饰农贸铁银钟点认长间场带块组编圆压头实写将觉见购销费预须顺领顾验适双]/;

const Aen = [], AjaOnly = [], AjaSimp = [], AjaOk = [], Borig = [], Bstrict = [];
const slugRe = /^\s{2}'([^']+)':\s*\{\s*$/;
const locRe = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)",?\s*$/;
const blockRe = /^\s*"(productName|label)":\s*\{\s*$/;
let slug = null, inBlock = null, fieldCount = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const s = line.match(slugRe); if (s) { slug = s[1]; inBlock = null; continue; }
  const b = line.match(blockRe); if (b && slug) { inBlock = b[1]; continue; }
  if (inBlock && /^\s*\},?\s*$/.test(line)) { inBlock = null; continue; }
  if (!inBlock || !slug) continue;
  const m = line.match(locRe); if (!m) continue;
  const loc = m[1];
  const val = m[2].replace(/\\"/g, '"').replace(/\\n/g, ' ');
  if (!val.trim()) continue;
  fieldCount++;
  const path = slug + '.' + inBlock + '@L' + (i + 1);
  if (loc === 'en' && (CJK.test(val) || KANA.test(val))) Aen.push({ path, val, chars: [...new Set(val.match(/[\u3400-\u4dbf\u4e00-\u9fff\u3040-\u30ff]/g))].join('') });
  if (loc === 'ja' && CJK.test(val)) {
    if (!KANA.test(val)) AjaOnly.push({ path, val });
    else AjaOk.push({ path, val, kana: [...new Set(val.match(/[\u3040-\u30ff]/g))].slice(0, 6).join('') });
    if (SIMP_STRICT.test(val)) AjaSimp.push({ path, val, chars: [...new Set(val.match(SIMP_STRICT))].join('') });
  }
  if (loc === 'zh-hk' && SIMP_ORIG.test(val)) Borig.push({ path, val, chars: [...new Set(val.match(SIMP_ORIG))].join('') });
  if (loc === 'zh-hk' && SIMP_STRICT.test(val)) Bstrict.push({ path, val, chars: [...new Set(val.match(SIMP_STRICT))].join('') });
}

const show = (title, arr, limit = 5) => {
  console.log(`\n=== ${title}: ${arr.length} ===`);
  arr.slice(0, limit).forEach(o => console.log('   ' + o.path + (o.chars ? '  [' + o.chars + ']' : (o.kana ? '  [假名 ' + o.kana + ']' : '')) + '\n      ' + o.val.slice(0, 100)));
  if (arr.length > limit) console.log('   …(其餘 ' + (arr.length - limit) + ' 條同型)');
};

console.log('掃描欄位數: ' + fieldCount);
show('A-en) en 鍵位含 CJK/假名 (必須 0)', Aen);
show('A-ja-only) ja 含漢字但零假名 (必須 0)', AjaOnly);
show('A-ja-simp) ja 含簡體專用字 (必須 0)', AjaSimp);
show('A-ja-ok) ja 含漢字且含假名 (合法日文殘餘)', AjaOk, 3);
show('B-orig) 原掃描器簡體字表命中 (對照用)', Borig, 8);
show('B-strict) zh-hk 含簡體專用字 (必須 0)', Bstrict, 8);

const borigChars = new Set();
for (const o of Borig) for (const c of o.chars) borigChars.add(c);
console.log('\n--- 誤報字判定 ---');
console.log('B-orig 命中字元: ' + [...borigChars].join(' '));
console.log('其中屬「繁簡同形字」(原表誤收) 者: ' + [...borigChars].filter(c => '格'.includes(c)).join(' ') + ' (U+683C, 繁體/簡體字形相同, 無簡化規則)');

const pass = Aen.length === 0 && AjaOnly.length === 0 && AjaSimp.length === 0 && Bstrict.length === 0;
console.log('\n結果: ' + (pass ? 'PASS — en 污染 0 / ja 中文污染 0 / zh-hk 簡體 0 (ja 漢字殘餘 ' + AjaOk.length + ' 條全為含假名之正確日文)' : 'FAIL'));
process.exit(pass ? 0 : 1);
