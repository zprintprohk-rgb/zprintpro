/**
 * 门童 #17: ce 截断破坏检测 (K3 2026-09-17)
 *
 * 事故背景:
 *   commit 2f8d9438 (2026-09-02 06:13, "feat(packaging-blog-reorg-v3)") 的脚本
 *   把客户可见文本里 **所有 "ce" 字符序列删除**, 造成 2,799 处破坏并存活 15 天:
 *     - servi / service            × 168   (最高频词被毁)
 *     - spa-y-1 / space-y-1        × 762   ← Tailwind CSS 类名被毁 → 版面样式失效
 *     - rtification / certification × 68
 *     - nstatd.gov.hk / censtatd.gov.hk ← 香港政府统计处网址被毁
 *     - Pamaker / Pacemaker (NSPA 奖项名), offirs / officers
 *     - e-commer / e-commerce, pre-ra / pre-race, Dreamfor / Dreamforce
 *   2026-09-17 修复: 从干净父版本 be744435 学得 323 条映射, 全量恢复 (残留 0)。
 *
 * 本门童职责: 检测同类回归 —— 任何客户可见文本中再出现这些残缺 token 即 red 硬拦。
 *
 * 基线数据: scripts/guards/data/ce-truncation-baseline.json (323 条, 自动生成, 勿手改)
 */

const fs = require('fs');
const path = require('path');

const BASELINE_FILE = path.join(__dirname, 'data', 'ce-truncation-baseline.json');

/** 客户可见内容文件 (与门童 #16 同源范围 + 文案型 tsx) */
const CUSTOMER_VISIBLE_FILES = [
  /src[\/\\]data[\/\\]blog-data[\/\\][a-z-]+\.json$/,
  /src[\/\\]data[\/\\]blog-posts\.ts$/,
  /src[\/\\]data[\/\\]buying-guides\.ts$/,
  /src[\/\\]data[\/\\]pillar-content\.ts$/,
  /src[\/\\]data[\/\\]products\.ts$/,
  /src[\/\\]data[\/\\]category-seo-content\.ts$/,
  /src[\/\\]data[\/\\]product-faqs\.ts$/,
  /src[\/\\]data[\/\\]sku-seo-data\.ts$/,
];

let cachedBaseline = null;

/** 载入基线 (延迟 + 缓存); 基线缺失时返回空集 (不阻断, 但由 RULES 提示) */
function loadBaseline() {
  if (cachedBaseline) return cachedBaseline;
  const set = new Map();
  try {
    const raw = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'));
    for (const e of raw.entries || []) {
      if (e && e.broken && e.correct) set.set(e.broken, e.correct);
    }
  } catch (err) {
    // 基线不可读 → 空集 (本门童静默不拦, 避免因数据缺失误阻断全站 commit)
  }
  cachedBaseline = set;
  return set;
}

/**
 * 扫描客户可见文件, 检出 ce 截断残留
 *
 * 实现说明: 先抽 token 再查 Set (O(n)), 而不是 323 条正则逐条跑 (O(323n))。
 * token 定义与基线生成时一致: [A-Za-z][A-Za-z'-]{2,}
 */
function scan(files) {
  const baseline = loadBaseline();
  if (baseline.size === 0) return [];

  const allHits = [];
  for (const file of files) {
    const rel = file.replace(/\\/g, '/');
    if (!CUSTOMER_VISIBLE_FILES.some((re) => re.test(rel))) continue;

    let content;
    try {
      content = fs.readFileSync(file, 'utf-8');
    } catch (err) {
      continue;
    }

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // 跳过注释行 (客户不可见; 与门童 #16 同口径)
      if (line.trim().startsWith('//')) continue;

      const tokens = line.match(/[A-Za-z][A-Za-z'-]{2,}/g);
      if (!tokens) continue;

      for (const tok of tokens) {
        if (!baseline.has(tok)) continue;
        allHits.push({
          file: rel,
          line: i + 1,
          match: tok.slice(0, 60),
          severity: 'red',
          ruleId: 'CE_TRUNCATION_CUSTOMER_VISIBLE',
          ruleName:
            '客户可见内容出现 ce 截断残缺词 (2026-09-02 事故同类: 脚本删除 "ce" 序列, 毁掉 service/space-y-/certification 等)',
          fix: `将 "${tok}" 恢复为 "${baseline.get(tok)}" —— 检查是否又跑了会删除 "ce" 序列的批量文本脚本`,
        });
        break; // 每行报 1 hit 足够定位
      }
    }
  }
  return allHits;
}

module.exports = {
  scan,
  RULES: [{ id: 'CE_TRUNCATION_CUSTOMER_VISIBLE', severity: 'red' }],
  CUSTOMER_VISIBLE_FILES,
  loadBaseline,
};
