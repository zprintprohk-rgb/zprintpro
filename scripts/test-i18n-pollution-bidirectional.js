#!/usr/bin/env node
/**
 * scripts/test-i18n-pollution-bidirectional.js
 * 门童 #4 双向化 — 假缺陷注入回放测试 (K3 2026-09-19 派活 Step 3)
 *
 * 风格比照既有 scripts/test-blog-data-integrity-guard.js:
 *   逐例 PASS/FAIL + 结尾汇总 + 非零退出码 (任一例 FAIL 即 exit 1)
 *
 * 为什么两边都要测 (K3 明确要求):
 *   只测「不误报」= 假守卫 (永远绿); 只测「能拦」= 噪音源 (全站爆红)。
 *   故本例集 **正向注入** (必须报红) 与 **负向控制** (必须不报) 成对出现。
 *
 * 例集 (6 例必需 + 2 例附加):
 *   1 正向: en 键位含中文            -> 必须报 I18N_POLLUTION_EN
 *   2 正向: zh-hk 含简体专用字形      -> 必须报 I18N_POLLUTION
 *   3 正向: ja 含简体专用字形「专」    -> 必须报 I18N_POLLUTION_JA
 *   4 负向: ja 含日文新字体 (写数点双学画国…) -> 必须不报
 *   5 负向: zh-hk 含繁简同形字 (出算用件格)   -> 必须不报
 *   6 空跑: 不动数据 -> 基线保持 + 汇总 red 不变 (== EXPECTED_RED)
 *   7 附加: 真语料误报回归 — Step 2 已验收的 price-data.generated.ts -> 三向全 0
 *   8 附加: 字集质量回归 — 粤语「晒」/ 繁简同形 / 日文新字体混血样本 -> 必须不报
 *
 * 用法: node scripts/test-i18n-pollution-bidirectional.js
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const guard = require(path.join(ROOT, 'scripts', 'guards', 'i18n-guard.js'));

/**
 * 汇总 red 期望值 (空跑用例)
 *  · 改造前实测 (2026-09-19, scope=src/) = 4, 全部为 I18N_POLLUTION
 *    (quote-desk/all/page.tsx:126 个 / CompareTable.tsx:57 对 / RushDeliveryGrid.tsx:141 页 / whatsapp.ts:27 来)
 *  · 双向化改造后 = 2 —— 差异 −2 逐笔可归因:
 *      quote-desk/all/page.tsx:126 与 RushDeliveryGrid.tsx:141 两笔落在 **JSX 代码注释** (花括号注释块) 内,
 *      不是「值」; 本门童判据原文即「**值**含简体专用字形 / **值**含 CJK」,
 *      双向化后改为「只扫字符串字面量 + 结构化 locale 值作用域」⇒ 该两笔属实现缺陷造成的假阳性, 已消除。
 *  · 2026-09-19 Step 4 收尾后 = 0 —— 末两笔 (CompareTable.tsx:57 对 / whatsapp.ts:27 来) 经定位属
 *      **zh-hk 值内真简体** (真值 = src/components/geo/CompareTable.tsx:57 caption、
 *      src/lib/whatsapp.ts:27 zh-hk 模板), 已按字形修复 (對/來), 同值内其余存量简体字形一并修正
 *      ⇒ 既有内向 red 从 2 降至 0, 故 EXPECTED_RED 由 2 更新为 0 (**判据不变严也不放宽: 期望值 = 当前已知 red 清册**)。
 *  · 若此值 > 0 → 有新增污染或基线失守 (期望值只随「已修完的 red」下调, 不随新增污染上调)
 */
const EXPECTED_RED = 0;
const SRC = path.join(ROOT, 'src');

let pass = 0, fail = 0;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'guard04-'));

/** 直接驱动裸扫描 (不经过基线), 返回命中的 ruleId 数组 */
function inject(name, content) {
  const f = path.join(TMP, name);
  fs.writeFileSync(f, content, 'utf8');
  return guard.scanBidirectional(content, f).map(h => h.ruleId);
}

function check(no, title, ok, detail) {
  if (ok) { pass++; console.log(`PASS  [${no}] ${title}`); }
  else { fail++; console.log(`FAIL  [${no}] ${title}\n        ${detail}`); }
}

function expectHit(no, title, got, want) {
  check(no, title, got.includes(want), `期望命中 ${want}, 实得 [${got.join(',') || '(空)'}]`);
}
function expectClean(no, title, got) {
  check(no, title, got.length === 0, `期望 0 命中, 实得 ${got.length} 条: [${got.slice(0, 6).join(',')}]`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1 正向注入: en 键位含中文 -> I18N_POLLUTION_EN
// ─────────────────────────────────────────────────────────────────────────────
{
  const src = [
    'export const COPY = {',
    "  'zh-hk': '貼紙印刷服務',",
    "  en: 'Custom sticker printing with 貼紙 and 包裝盒 materials',",
    "  ja: 'ステッカー印刷',",
    '};',
  ].join('\n');
  expectHit(1, '正向注入 en 键位含中文 -> 必须报 I18N_POLLUTION_EN', inject('c1_en_cjk.ts', src), 'I18N_POLLUTION_EN');
}

// ─────────────────────────────────────────────────────────────────────────────
// 2 正向注入: zh-hk 含简体专用字形 (专/质/贴/纸 —— 均为 v1 窄集之外的扩集字) -> I18N_POLLUTION
// ─────────────────────────────────────────────────────────────────────────────
{
  const src = [
    'export const COPY = {',
    "  'zh-hk': '专業貼紙印刷，品質保證',",
    "  en: 'Sticker printing',",
    "  ja: 'ステッカー印刷',",
    '};',
  ].join('\n');
  expectHit(2, '正向注入 zh-hk 含简体专用字形 (专/质/贴/纸) -> 必须报 I18N_POLLUTION', inject('c2_zhhk_simp.ts', src), 'I18N_POLLUTION');
}

// ─────────────────────────────────────────────────────────────────────────────
// 3 正向注入: ja 含简体专用字形「专」-> I18N_POLLUTION_JA
//   (专 的日文写法是 専 ⇒ 专 出现在 ja 值内必为简体污染)
// ─────────────────────────────────────────────────────────────────────────────
{
  const src = [
    'export const COPY = {',
    "  'zh-hk': '貼紙印刷',",
    "  en: 'Sticker printing',",
    "  ja: 'ステッカー专用印刷サービス',",
    '};',
  ].join('\n');
  expectHit(3, '正向注入 ja 含简体专用字形 (专) -> 必须报 I18N_POLLUTION_JA', inject('c3_ja_simp.ts', src), 'I18N_POLLUTION_JA');
}

// ─────────────────────────────────────────────────────────────────────────────
// 4 负向控制: ja 含日文新字体 -> 必须不报
//   (写/数/点/双/学/画/国/体/来/与/当/医/断/错/言 都是**正确的日文写法**)
// ─────────────────────────────────────────────────────────────────────────────
{
  const src = [
    'export const COPY = {',
    "  'zh-hk': '印刷服務',",
    "  en: 'Printing service',",
    "  ja: '書き込み・数量・点数・両面(双)・学会・図画・国内・本体・来店・与信・当日・医療・断裁・間違い・言葉',",
    '};',
  ].join('\n');
  expectClean(4, '负向控制 ja 含日文新字体 (写数点双学画国体来与当医断错言) -> 必须不报', inject('c4_ja_shinjitai.ts', src));
}

// ─────────────────────────────────────────────────────────────────────────────
// 5 负向控制: zh-hk 含繁简同形字 -> 必须不报
//   (出/算/用/件/格 繁简同形; 2026-09-18 实测踩中过整批入集的误报)
// ─────────────────────────────────────────────────────────────────────────────
{
  const src = [
    'export const COPY = {',
    "  'zh-hk': '進出貨費用計算、條件與格價，用件數核算',",
    "  en: 'Stock in/out cost calculation',",
    "  ja: '在庫と費用計算',",
    '};',
  ].join('\n');
  expectClean(5, '负向控制 zh-hk 含繁简同形字 (出算用件格) -> 必须不报', inject('c5_zhhk_same_form.ts', src));
}

// ─────────────────────────────────────────────────────────────────────────────
// 6 空跑: 不动任何数据 -> 基线保持 + 汇总 red 不变
//   (真跑 check-regression-guard.js 全量, 解析汇总行)
// ─────────────────────────────────────────────────────────────────────────────
{
  let out = '', ran = true;
  try {
    out = execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'check-regression-guard.js')], {
      cwd: ROOT, encoding: 'utf8', timeout: 15 * 60 * 1000, maxBuffer: 256 * 1024 * 1024,
    });
  } catch (e) {
    // red 命中时 exit 1 属预期, stdout 仍可取
    out = (e && (e.stdout || '')) ? String(e.stdout) : '';
    if (!out) ran = false;
  }
  const m = /汇总: 🔴 (\d+) \| 🟠 (\d+) \| 🟡 (\d+) \| ⚪ (\d+)/.exec(out);
  const b = /门童 #4 双向污染存量基线: 实测命中 (\d+) → 基线 (\d+).*★新增缺陷 (\d+)/.exec(out);
  if (!ran || !m) {
    check(6, '空跑 (基线保持 + 汇总 red 不变)', false, '未能解析 check-regression-guard.js 汇总行');
  } else {
    const red = Number(m[1]);
    const detail = `汇总 = 🔴 ${m[1]} / 🟠 ${m[2]} / 🟡 ${m[3]}; 基线行 = ${b ? b[0].replace(/^ℹ️ /, '') : '(未打印)'}`;
    const ok = red === EXPECTED_RED && !!b && Number(b[3]) === 0;
    check(6, `空跑 red == ${EXPECTED_RED} 且 ★新增缺陷 == 0`, ok, `${detail} (期望 red ${EXPECTED_RED})`);
    console.log(`        实测: ${detail}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 7 附加: 真语料误报回归 —— Step 2 已验收的 price-data.generated.ts
//   该档 2026-09-19 由专项单元验收: en 含汉字 0 / zh-hk 含简体 0 / ja 残余 131 栏位为**正确日文**
//   ⇒ 三向扫描必须 0 命中 (若字集过宽, 此处必然爆红)
// ─────────────────────────────────────────────────────────────────────────────
{
  const f = path.join(SRC, 'lib', 'price-data.generated.ts');
  let got = null;
  try {
    const content = fs.readFileSync(f, 'utf8');
    got = guard.scanBidirectional(content, f).map(h => `${h.ruleId}:${h.char}`);
  } catch (e) { got = null; }
  if (got === null) check(7, '真语料误报回归 price-data.generated.ts', false, '文件读取失败');
  else check(7, `真语料误报回归: price-data.generated.ts (Step 2 已验收) -> 三向 0 命中 [样本 ${got.length} 条]`, got.length === 0, `实得: [${got.slice(0, 10).join(',')}]`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 8 附加: 字集质量回归 —— 粤语「晒」/ 繁简同形 / 混血样本 -> 必须不报
// ─────────────────────────────────────────────────────────────────────────────
{
  const zhSrc = [
    'export const COPY = {',
    "  'zh-hk': '一句講晒：睇晒所有產品，用得晒、計得晒、件件合格、格價清楚',",
    "  en: 'Cantonese sample',",
    "  ja: 'サンプル',",
    '};',
  ].join('\n');
  const jaSrc = [
    'export const COPY = {',
    "  'zh-hk': '樣本',",
    "  en: 'sample',",
    "  ja: '謝礼・寿命・猫・名称・実践・却下・弥生・装丁・黄色・欧州・危惧・属地・潜在・残高・弁当・横断歩道・寝室・参加・将来・半径・届出',",
    '};',
  ].join('\n');
  const gzh = inject('c8a_canto.ts', zhSrc).filter(r => r === 'I18N_POLLUTION');
  const gja = inject('c8b_ja_kanji.ts', jaSrc).filter(r => r === 'I18N_POLLUTION_JA');
  check(8, '字集质量回归: zh-hk 粤语「晒」+ 繁简同形字 -> I18N_POLLUTION 0 命中', gzh.length === 0, `实得 ${gzh.length} 条`);
  check('8b', '字集质量回归: ja 正确日文 (谢礼/寿命/猫/称/践/却/弥/装/黄/欧/惧/属/潜/残/横/寝/参/将/径/届) -> I18N_POLLUTION_JA 0 命中', gja.length === 0, `实得 ${gja.length} 条`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 9 附加: 「同形新字体」自动审计 —— 常用漢字/日常語コーパス ∩ SIMP_JA 必须为空
//   原理: ja 判据只应含「日文不用的简体专用字形」; 若某字出现在**正确日文语料**里, 它就是
//   「同形新字体」, 必须排除 (否则未来 ja 文案必然假阳性)。
//   本例为常设哨兵: 2026-09-19 落地时正是靠同类检查揪出 横/寝/恋/礼/寿/猫/称/践/却/弥/参/将/径/届。
// ─────────────────────────────────────────────────────────────────────────────
{
  const JA_CORPUS = [
    // 常用漢字 (新字体) 表
    '愛悪圧囲医壱逸隠栄営衛駅謁円塩縁艶応欧殴桜奥横温穏仮価禍海絵壊懐慨概拡殻覚岳楽渇割喝褐缶陥乾勧巻寛漢関歓観気帰犠亀器既拠挙峡挟狭郷響暁勤謹区駆勲薫径茎恵掲携継蛍軽経撃欠研県倹剣険圏検献権顕験厳広効恒鉱号国黒穀済剤砕斎冊殺雑参桟惨賛残糸歯児辞湿実舎写者煮社釈収臭従渋獣縦粛処暑署諸序将焼奨条状乗浄剰畳縄壌嬢譲醸触嘱慎晋図粋酔穂随髄数枢瀬声静斉摂窃節専戦浅潜単担胆団弾断値遅虫昼鋳著庁徴聴懲勅鎮塚逓鉄転点伝都灯当党盗稲闘徳独読突届内難弐悩脳覇拝廃売梅麦発髪抜蛮卑秘浜払仏並変辺弁舗歩宝豊褒剖墨撲朴没翻槙毎満免綿黙訳薬躍愉癒諭湯痒来頼乱覧欄竜隆虜略両猟糧楼浪郎禄録湾腕壊惑枠',
    // 日常語 (印刷/商談語彙を含む)
    '会社会学校学生大学医学医者外国国語中国韓国時間時計日本本日来日来週来年将来将軍参加参画三角形医薬品薬局薬剤新聞電車自動車自転車転勤転職実践実験実際名称名前称号却下退却忘却弥生猫犬動物体験価格評価設備設計計画図面図書館絵画映画画面話題問題質問回答答案快適適切適用範囲横断歩道横浜横書き寝室就寝恋愛失恋恋人力強引強力脈絡山脈寛容広告鉱物炭鉱撮影摂取率直牽引鉛筆謙虚疲労納品発注見積請求書納期印刷用紙納本見本校正校了断裁製本中綴上製並製箔押 emboss',
  ].join('');
  const jaSet = new Set(guard.SIMP_JA.split(''));
  const leaked = [...new Set(JA_CORPUS.split(''))].filter(c => jaSet.has(c));
  check(9, `同形新字体自动审计: 常用漢字/日常語コーパス ∩ SIMP_JA == ∅ [语料样本 ${JA_CORPUS.length} 字]`,
    leaked.length === 0, `命中(=同形新字体漏排除): ${leaked.join('') || '(空)'}`);
}

fs.rmSync(TMP, { recursive: true, force: true });

console.log('');
console.log('─'.repeat(64));
console.log(`门童 #4 双向化注入回放测试: ${pass} PASS / ${fail} FAIL`);
console.log(fail === 0 ? 'ALL TESTS PASS (门童 #4 双向化)' : `${fail} TEST(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
