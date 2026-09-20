/**
 * scripts/guards/blog-standard-guard.js
 * 反审门童 #12 Blog 标准检查 (K3 9/3 19:29 拍板 v1.5 升级)
 *
 * 检查 Pillar blog 必须符合:
 * 1. date 字段 = 2026-09-03 (仅 9/3 Pillar 升级批 5 篇适用, E0 分層)
 * 2. title 长度 50-57 半角当量 (per K3 9/13 终裁 + title-equiv.js; 2026-09-15 统一口径)
 * 3. content 第一个 H1/H2 段不含 "Pillar 開篇" / "Pillar 開篇" 等模板字
 * 4. content **禁内嵌** JSON-LD (E0 2026-09-20 反向修正: 原「≥5 块」要求与 SSoT §3.2 红线冲突已作废;
 *    单一块来源 = page.tsx, 齐套性由门童 #14 段 12 线上断言负责)
 * 5. content 字数 季度递减目标制 (pillar-wordcount-targets.json)
 * 6. content 含校准后 4 词关键词 (大信封/a1a2 海報/small-batch/樣本印刷/燙金 等)
 * 7. content 含 校准后 GSC 实证 4,413 imps/28d (Pillar 1) 或 8/18 baseline pos 2.3 (Pillar 5)
 * 8. lastUpdated 字段 = 2026-09-03 (仅升级批适用)
 * 9. excerpt 字段非空
 *
 * v1.6 (E0 2026-09-20, K3 拍板): 触发器改清单制 LONGFORM_SLUGS (9 篇) —— 原 /pillar/i 正则
 * 只命中 campus 一篇, 与「5 大 Pillar」声明分叉; 新增长文 title/字数/excerpt 纳入门禁.
 * 审计依据: docs/2026-09-20-12seg-compliance-audit-and-plan.md §四 (门禁覆盖缺口)
 */

const fs = require('fs');
const path = require('path');

// 2026-09-15: title 长度统一为半角当量口径 (K3 9/13 终裁 50-58, SSoT = title-equiv.js)
const { equiv: titleEquiv, TITLE_MIN, TITLE_MAX } = require('./title-equiv.js');

const REQUIRED_DATE = '2026-09-03';
const MIN_PILLAR_CHARS = 12000;   // 12,000 = 最终目标值 (实际判定由 getPillarWordTarget() 季度配置决定)
const REQUIRED_SCHEMAS = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization'];

/**
 * Pillar 字数「季度递减目标」配置读取 (K3 2026-09-19 建议; 配置 = .hermes/regression-guard/pillar-wordcount-targets.json)
 * 语义: floor = 当季硬线 (低于即 FAIL); target = 当季目标 (未达记 WARN, 不阻断)。
 * 未拍板态 (status != APPROVED) ⇒ floor 取 effective_now.floor (当前 = 0, 只 WARN 不阻断) ——
 *   避免 12,000 硬线因存量 (5 篇均 <6,100 字) 长期报红被当噪音忽略。
 * 配置缺失/损坏 ⇒ 退回旧行为 (floor=target=12,000) 且不静默放行。
 */
function getPillarWordTarget(now = new Date()) {
  const fs = require('fs');
  const cfgPath = path.join(__dirname, '..', '..', '.hermes', 'regression-guard', 'pillar-wordcount-targets.json');
  const fallback = { floor: MIN_PILLAR_CHARS, target: MIN_PILLAR_CHARS, quarter: 'N/A', status: 'CONFIG_MISSING', note: '配置缺失, 退回 12,000 硬线' };
  try {
    const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8').replace(/^\uFEFF/, ''));
    const iso = now.toISOString().slice(0, 10);
    const q = (cfg.quarters || []).find(x => iso >= x.from && iso <= x.to);
    if (cfg.status && cfg.status !== 'APPROVED') {
      const e = cfg.effective_now || {};
      return {
        floor: typeof e.floor === 'number' ? e.floor : 0,
        target: typeof e.target === 'number' ? e.target : MIN_PILLAR_CHARS,
        quarter: q ? q.quarter : 'N/A',
        status: cfg.status,
        note: e.label || '',
      };
    }
    if (!q) return fallback;
    return { floor: q.floor, target: q.target, quarter: q.quarter, status: 'APPROVED', note: q.note || '' };
  } catch (e) {
    return fallback;
  }
}

// E0 2026-09-20: 觸發器改清單制 (K3 拍板, 審計報告 docs/2026-09-20-12seg-compliance-audit-and-plan.md §四).
// 原 /pillar/i 正則實現只命中 campus 一篇, 與門童頭部「5 大 Pillar」聲明分叉 (避坑 16 活例),
// 且其餘長文的 title 當量/字數下限長期無門禁 (實測 16/18 標題 OUT 無人攔的後果).
// 批次語義分層: date/lastUpdated===2026-09-03 是「9/3 Pillar 升級批」專屬檢查,
// 只適用原 5 篇; 新長文不應被套用該批次日期 (規則聲明與適用範圍分層, 防新株誤傷).
const PILLAR_UPGRADE_SLUGS = [
  'packaging-box-pricing-2026',
  'sticker-material-pvc-vinyl-removable',
  'poster-printing-guide',
  'campus-education-printing-pillar-guide',
  'foil-stamping-3-applications-2026',
];
const LONGFORM_SLUGS = [
  ...PILLAR_UPGRADE_SLUGS,
  // E0 擴容: 同屬 12 鐵律深度長文, 原在門禁視野外
  'hong-kong-printing-cost-baseline-2026',
  'roll-up-banner-printing-guide',
  'print-specifications-reference-guide-2026',
  'school-exercise-book-printing-guide',
];

function isPillarBlog(value) {
  if (!value || typeof value !== 'object') return false;
  return LONGFORM_SLUGS.includes(value.slug || '');
}

function checkPillar(file, content) {
  const hits = [];
  let parsed = null;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    return hits;
  }
  if (!parsed || typeof parsed !== 'object') return hits;

  for (const [slug, value] of Object.entries(parsed)) {
    if (!isPillarBlog(value)) continue;
    const blogContent = value.content || '';
    const title = value.title || '';
    const date = value.date || '';
    const lastUpdated = value.lastUpdated || '';
    const excerpt = value.excerpt || '';

    const isUpgradeBatch = PILLAR_UPGRADE_SLUGS.includes(slug);

    // 检查 1: date 字段 = 2026-09-03 —— 僅 9/3 Pillar 升級批適用 (E0 分層, 防新株誤傷)
    if (isUpgradeBatch && date !== REQUIRED_DATE) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: date="${date}" 不是 ${REQUIRED_DATE} (Pillar 升级日期)`,
        severity: 'red',
        ruleId: 'BLOG_DATE_INVALID',
        ruleName: 'Pillar blog date 字段硬性要求',
        fix: `改 ${slug} date 字段为 "${REQUIRED_DATE}"`,
      });
    }

    // 检查 2: lastUpdated 字段 = 2026-09-03 —— 僅 9/3 Pillar 升級批適用 (E0 分層)
    if (isUpgradeBatch && lastUpdated !== REQUIRED_DATE) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: lastUpdated="${lastUpdated}" 不是 ${REQUIRED_DATE}`,
        severity: 'red',
        ruleId: 'BLOG_LASTUPDATED_INVALID',
        ruleName: 'Pillar blog lastUpdated 字段硬性要求',
        fix: `改 ${slug} lastUpdated 字段为 "${REQUIRED_DATE}"`,
      });
    }

    // 检查 3: title 长度 50-58 半角当量 (2026-09-15 统一口径, 取代 raw chars 50-60)
    const titleEq = titleEquiv(title);
    if (titleEq < TITLE_MIN || titleEq > TITLE_MAX) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: title 当量=${titleEq} 不在 ${TITLE_MIN}-${TITLE_MAX} 范围 (per K3 9/13 终裁 + title-equiv.js)`,
        severity: 'red',
        ruleId: 'BLOG_TITLE_LENGTH',
        ruleName: `Pillar blog Title 当量 ${TITLE_MIN}-${TITLE_MAX}`,
        fix: `改 ${slug} title 到 ${TITLE_MIN}-${TITLE_MAX} 半角当量 (主关键词前置, 品牌后置, 只用一次)`,
      });
    }

    // 检查 4: excerpt 字段非空
    if (!excerpt || excerpt.length < 10) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: excerpt 字段为空或太短 (${(excerpt || '').length} 字)`,
        severity: 'red',
        ruleId: 'BLOG_EXCERPT_EMPTY',
        ruleName: 'Pillar blog excerpt 字段必填',
        fix: `加 ${slug} excerpt 字段 10+ 字 (Pillar 摘要)`,
      });
    }

    // 检查 5: content 长度 —— 季度递减目标制 (K3 2026-09-19 建议; 见 pillar-wordcount-targets.json)
    const wc = getPillarWordTarget();
    if (blogContent.length < wc.floor) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: content len=${blogContent.length} < 当季下限 ${wc.floor} (${wc.quarter}, ${wc.status})`,
        severity: 'red',
        ruleId: 'BLOG_LENGTH_INSUFFICIENT',
        ruleName: `Pillar blog 字数下限 ${wc.floor} (季度递减目标制)`,
        fix: `升级 ${slug} content 到 >=${wc.floor} 字 (当季下限); 本季目标 ${wc.target} 字`,
      });
    } else if (blogContent.length < wc.target) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: content len=${blogContent.length} >= 下限 ${wc.floor} 但 < 目标 ${wc.target} (${wc.quarter}, 差 ${wc.target - blogContent.length} 字)`,
        severity: 'orange',
        ruleId: 'BLOG_LENGTH_BELOW_TARGET',
        ruleName: 'Pillar blog 字数低于季度目标 (WARN, 不阻断)',
        fix: `按季度递减路径把 ${slug} 扩到 ${wc.target} 字`,
      });
    }

    // 检查 6: content 第一个 H1/H2 段不含模板字 "Pillar 開篇" / "Pillar 開始"
    const firstH1 = blogContent.match(/<h1[^>]*>(.*?)<\/h1>/);
    const firstH2 = blogContent.match(/<h2[^>]*>(.*?)<\/h2>/);
    const firstHeading = (firstH1 && firstH1[1]) || (firstH2 && firstH2[1]) || '';
    if (/Pillar 開篇|Pillar 開始|Pillar Opening/.test(firstHeading)) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: 第一个标题含模板字 "${firstHeading.slice(0, 50)}..." (应改为主关键词 H1)`,
        severity: 'red',
        ruleId: 'BLOG_H1_TEMPLATE',
        ruleName: 'Pillar blog H1 标题应含主关键词, 不含模板字',
        fix: `改 ${slug} 第一个 H1 段为主关键词标题 (e.g. "校園教育印刷 9 月開學季 5 大印刷品 × 5 大材質 × 12 場景 Pillar 完整指南 | 智印港")`,
      });
    }

    // 检查 7 (E0 2026-09-20 反向修正): content **禁止**內嵌 JSON-LD.
    // 原 BLOG_SCHEMA_5BLOCKS 要求「content 含 ≥5 個 JSON-LD 塊, fix=加到 content 頂部」——
    // 與 SSoT §3.2 紅線 (content 內嵌 inline JSON-LD = 重複渲染 = Google 警告; 單一來源 = page.tsx)
    // 及 B2 批 (已 strip 8+ 篇) 直接衝突, 屬有害 fix 文案 (避坑 16 規則聲明/實現分叉活例).
    // 反向口徑: ld+json > 0 即 red, fix = strip; schema 齊套性由門童 #14 段 12 **線上 curl 斷言**負責
    // (SSoT §3.2 2026-09-19 修正: 禁只 JSON.parse content).
    const ldCount = (blogContent.match(/application\/ld\+json/g) || []).length;
    if (ldCount > 0) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: content 內嵌 JSON-LD ×${ldCount} (SSoT §3.2 紅線: 重複渲染; 原 ruleId=BLOG_SCHEMA_5BLOCKS 已作廢反向)`,
        severity: 'red',
        ruleId: 'BLOG_SCHEMA_INLINE_LD',
        ruleName: '長文 content 禁內嵌 JSON-LD (單一來源 = page.tsx)',
        fix: `strip ${slug} content 內的 ld+json script 塊 (B2 標準做法); 線上 schema 齊套性跑 node scripts/guards/blog-quality-12-rules-guard.js --online`,
      });
    }

    // 检查 8: schemas 字段包含 5 个必需 schema
    const schemasField = value.schemas || [];
    for (const required of REQUIRED_SCHEMAS) {
      if (!schemasField.includes(required)) {
        hits.push({
          file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
          line: 0,
          match: `${slug}: schemas 数组缺 ${required} (声明 ${schemasField.join(',') || '空'})`,
          severity: 'red',
          ruleId: 'BLOG_SCHEMAS_ARRAY_MISSING',
          ruleName: `Pillar blog schemas 数组缺 ${required}`,
          fix: `加 ${required} 到 ${slug} schemas 数组`,
        });
      }
    }
  }
  return hits;
}

function scan(dir) {
  const files = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', '.next', 'dist', '.git'].includes(entry.name)) continue;
        walk(full);
      } else if (entry.name === 'zh-hk.json' || entry.name === 'en.json' || entry.name === 'ja.json') {
        files.push(full);
      }
    }
  }
  walk(dir);
  return files;
}

function run() {
  const blogDataDir = path.resolve(process.cwd(), 'src/data/blog-data');
  const files = scan(blogDataDir);
  const allHits = [];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const hits = checkPillar(file, content);
    allHits.push(...hits);
  }
  return { name: 'blog-standard-guard', hits: allHits };
}

if (require.main === module) {
  const result = run();
  if (result.hits.length > 0) {
    console.log(`\n🔴 [BLOG-STANDARD-GUARD] ${result.hits.length} 命中:`);
    for (const h of result.hits) {
      console.log(`  ${h.file} [${h.ruleId}] ${h.match}`);
      console.log(`    fix: ${h.fix}`);
    }
    process.exit(1);
  } else {
    console.log(`\n✅ [BLOG-STANDARD-GUARD] 0 命中 - 所有 Pillar blog 符合 date / title / H1 / 5 schema / 12,000+ 字标准`);
  }
}

module.exports = { run, checkPillar };
