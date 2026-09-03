/**
 * scripts/guards/blog-data-integrity-guard.js
 * 反审门童 #15 blog-data JSON 严格校验 (用户 2026-09-04 拍板, 9/3-9/4 部署事故固化)
 *
 * 事故背书 (K3-2026-09-03-2300-blog-json-broken-v1):
 *   9/3 23:00 fix script 把 3 个 blog-data JSON 改坏 (嵌套引号未 escape + 0x0A 控制字符 +
 *   GBK→UTF-8 mojibake 双重编码), 生产连续 2 次 build fail (9/3 16:35 + 17:07 UTC),
 *   M3 9/4 凌晨又叠加 3 次失败部署。本地 12 铁律门童因 `try{JSON.parse}catch{return}`
 *   静默放行 (lazy parse 误报 "0 命中")。
 *
 * 拍板原文 (用户 2026-09-04):
 *   "把这次教训固化进门童：任何对 blog-data JSON 的修改，改完必须先过
 *    python -c \"json.load(...)\" 严格校验，再进 commit"
 *
 * 规则 (全部 🔴 red 硬拦):
 *   BLOGJSON_PARSE      文件必须能被 JSON.parse 严格解析 (等价 Python json.loads 严格模式)
 *   BLOGJSON_CTRL       原始文本不得含裸控制字符 (0x00-0x1F, 含 0x0A 0x0D) —
 *                       JSON.parse 本身会拒绝字符串内裸控制字符, 此处提供逐字节精确报错
 *   BLOGJSON_MOJIBAKE   检测 mojibake 双重编码指纹 (GBK 字节被按 UTF-8 二次写回),
 *                       修复无法靠转义挽回, 必须从 git 历史重取原文 (6c2f4a94 教训)
 *   BLOGJSON_KEYS       键数完整性: zh-hk ≥ 79 / en ≥ 80 / ja ≥ 80 (per §0.33.1 4 口径),
 *                       防整段丢失
 *   BLOGJSON_EMPTY      文件不得为空或过小 (防误覆盖成空文件)
 *
 * 性能: 仅扫 3 个目标文件 (< 50ms), pre-commit hook 安全。
 */

const fs = require('fs');
const path = require('path');

const TARGETS = [
  { file: 'src/data/blog-data/zh-hk.json', locale: 'zh-hk', minKeys: 79 },
  { file: 'src/data/blog-data/en.json', locale: 'en', minKeys: 80 },
  { file: 'src/data/blog-data/ja.json', locale: 'ja', minKeys: 80 },
];

// mojibake 指纹: 常用品牌词被"UTF-8→GBK 误读→再按 UTF-8 写回"后的变形
// 实测自 9/4 损坏文件 (鏅哄嵃 = 智印港, ӡˢ = 印刷 一类)
const MOJIBAKE_SIGNATURES = [
  /鏅哄嵃/,
  /ӡˢ/,
  /鑲查噾/,
  /\u000f\u000f/,
];

function checkFile(absFile, target, cwd) {
  const hits = [];
  const rel = target.file;

  if (!fs.existsSync(absFile)) {
    hits.push({
      file: rel, line: 0,
      match: `BLOGJSON_EMPTY ${rel} 不存在 (被误删?)`,
      severity: 'red', ruleId: 'BLOGJSON_EMPTY',
      ruleName: 'blog-data JSON 文件完整性',
      fix: `git checkout HEAD -- ${rel} 还原`,
    });
    return hits;
  }

  let raw;
  try { raw = fs.readFileSync(absFile, 'utf-8'); } catch (e) {
    hits.push({ file: rel, line: 0, match: `BLOGJSON_EMPTY 读取失败: ${e.message}`, severity: 'red', ruleId: 'BLOGJSON_EMPTY', ruleName: 'blog-data JSON 文件完整性', fix: `git checkout HEAD -- ${rel}` });
    return hits;
  }

  if (raw.length === 0) {
    hits.push({ file: rel, line: 0, match: 'BLOGJSON_EMPTY 文件 0 字节 (被误覆盖成空文件)', severity: 'red', ruleId: 'BLOGJSON_EMPTY', ruleName: 'blog-data JSON 文件完整性', fix: `git checkout HEAD -- ${rel}` });
    return hits;
  }
  // 注: "文件被截断/内容丢失" 由下方 BLOGJSON_KEYS 键数检查兜底 (zh-hk≥79/en≥80/ja≥80),
  //     不设体积早退门槛, 避免误拦合法的小改动场景。

  // 1. 字符串字面量内的裸控制字符 (与 JSON.parse / Python json.loads 同口径:
  //    控制字符只在字符串内非法; 字符串外的 0x0A/0x0D 是合法空白, 不可误报)
  let inString = false;
  let escaped = false;
  let firstBad = -1;
  let badCount = 0;
  for (let i = 0; i < raw.length; i++) {
    const c = raw.charCodeAt(i);
    if (inString) {
      if (escaped) { escaped = false; continue; }
      if (c === 0x5c) { escaped = true; continue; }        // 反斜杠: 下一个字符被转义
      if (c === 0x22) { inString = false; continue; }      // 结束引号
      if (c <= 0x1f) { badCount++; if (firstBad === -1) firstBad = i; }
    } else {
      if (c === 0x22) inString = true;
    }
  }
  if (badCount > 0) {
    const line = raw.slice(0, firstBad).split('\n').length;
    hits.push({
      file: rel, line,
      match: `BLOGJSON_CTRL 字符串字面量内 ${badCount} 个裸控制字符 (首个在 line ${line}, code=0x${raw.charCodeAt(firstBad).toString(16)}) — JSON 字符串内必须用 \\n \\t 转义`,
      severity: 'red', ruleId: 'BLOGJSON_CTRL',
      ruleName: 'blog-data JSON 控制字符',
      fix: '禁止手写转义脚本修复; 从最近合法 commit 还原后, 用 json.dumps/JSON.stringify 重新序列化',
    });
    return hits; // 有控制字符时后续解析必失败, 提前返回给最清晰的错误
  }

  // 2. 严格解析 (核心闸门)
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    hits.push({
      file: rel, line: 0,
      match: `BLOGJSON_PARSE ${e.message} (生产部署必挂; 本地其他门童的 lazy try/catch 会静默放行此错误, 本门童拒绝放行)`,
      severity: 'red', ruleId: 'BLOGJSON_PARSE',
      ruleName: 'blog-data JSON 严格解析',
      fix: '从最近合法 commit 还原 (git show <sha>:<path> | 实测 6c2f4a94 三语全合法), 用 JSON.stringify 重写入; 禁止在损坏文件上继续打转义补丁',
    });
    return hits;
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    hits.push({ file: rel, line: 0, match: 'BLOGJSON_PARSE 顶层不是 JSON 对象', severity: 'red', ruleId: 'BLOGJSON_PARSE', ruleName: 'blog-data JSON 严格解析', fix: '还原到合法基线' });
    return hits;
  }

  // 3. mojibake 指纹
  for (const sig of MOJIBAKE_SIGNATURES) {
    const m = raw.match(sig);
    if (m) {
      const idx = m.index;
      const line = raw.slice(0, idx).split('\n').length;
      hits.push({
        file: rel, line,
        match: `BLOGJSON_MOJIBAKE mojibake 双重编码指纹命中: "${m[0]}" (GBK/UTF-8 转码损坏, 文字已不可逆损坏)`,
        severity: 'red', ruleId: 'BLOGJSON_MOJIBAKE',
        ruleName: 'blog-data JSON mojibake 检测',
        fix: '正文必须从 git 历史或 .hermes 草稿重取原文 + JSON.stringify 重新序列化; 任何转义修复都救不回已损坏的中文',
      });
      break;
    }
  }

  // 4. 键数完整性 (per §0.33.1: zh-hk ≥79 / en ≥80 / ja ≥80)
  const keyCount = Object.keys(parsed).length;
  if (keyCount < target.minKeys) {
    hits.push({
      file: rel, line: 0,
      match: `BLOGJSON_KEYS ${target.locale} 仅 ${keyCount} 个 blog 键 (< ${target.minKeys}, per §0.33.1 4 口径), 疑似整段丢失`,
      severity: 'red', ruleId: 'BLOGJSON_KEYS',
      ruleName: 'blog-data JSON 键数完整性',
      fix: `核对最近合法 commit 的键数 (${target.minKeys}+); 若有意删除需 K3 拍板`,
    });
  }

  return hits;
}

function scan(files) {
  // files 参数来自 common.collectFiles; 本门童固定只扫 3 个目标 (无论 staged 与否,
  // 因为损坏文件必须绝对拦截 — 但 --commit 模式下若 3 文件均不在 staged, 跳过以省时)
  const cwd = process.cwd();
  const stagedOnly = Array.isArray(files) && files.length >= 0;
  let stagedSet = null;
  if (stagedOnly && files.length > 0) {
    stagedSet = new Set(files.map(f => path.resolve(f)));
  }

  const allHits = [];
  for (const target of TARGETS) {
    const abs = path.join(cwd, target.file);
    if (stagedSet && stagedSet.size > 0 && !stagedSet.has(abs)) {
      // --commit 模式: 该文件不在本次 staged 改动中, 跳过 (保持 < 5s 性能承诺)
      continue;
    }
    allHits.push(...checkFile(abs, target, cwd));
  }
  return allHits;
}

// 独立全量模式 (供 pre-commit hook / cron / 手动跑, 不受 --commit staged 过滤)
function runFull() {
  const cwd = process.cwd();
  const allHits = [];
  for (const target of TARGETS) {
    const abs = path.join(cwd, target.file);
    allHits.push(...checkFile(abs, target, cwd));
  }
  return { name: 'blog-data-integrity-guard', hits: allHits };
}

module.exports = { scan, runFull, checkFile, TARGETS };

if (require.main === module) {
  const result = runFull();
  if (result.hits.length > 0) {
    console.log(`\n🔴 [BLOG-DATA-INTEGRITY-GUARD] ${result.hits.length} 命中:`);
    for (const h of result.hits) {
      console.log(`  ${h.file}:${h.line} [${h.ruleId}] ${h.match}`);
      console.log(`    修法: ${h.fix}`);
    }
    process.exit(1);
  } else {
    console.log('✅ [BLOG-DATA-INTEGRITY-GUARD] 3 个 blog-data JSON 严格校验全过 (JSON.parse + 控制字符 + mojibake + 键数)');
  }
}
