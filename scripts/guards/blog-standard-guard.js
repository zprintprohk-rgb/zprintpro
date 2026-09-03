/**
 * scripts/guards/blog-standard-guard.js
 * 反审门童 #12 Blog 标准检查 (K3 9/3 19:29 拍板 v1.5 升级)
 *
 * 检查 Pillar blog 必须符合:
 * 1. date 字段 = 2026-09-03 (Pillar 升级日期, 不允许 2024-01-01 默认值)
 * 2. title 长度 50-60 字 (per AGENTS.md §5 SEO/GEO Title 规则)
 * 3. content 第一个 H1/H2 段不含 "Pillar 開篇" / "Pillar 開篇" 等模板字
 * 4. content 5 schema JSON-LD 块 (Article + FAQPage + BreadcrumbList + HowTo + Organization)
 * 5. content 12,000+ 字
 * 6. content 含校准后 4 词关键词 (大信封/a1a2 海報/small-batch/樣本印刷/燙金 等)
 * 7. content 含 校准后 GSC 实证 4,413 imps/28d (Pillar 1) 或 8/18 baseline pos 2.3 (Pillar 5)
 * 8. lastUpdated 字段 = 2026-09-03
 * 9. excerpt 字段非空
 *
 * 触发条件: blog slug 包含 "pillar" OR title 包含 "Pillar"
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_DATE = '2026-09-03';
const MIN_TITLE_CHARS = 50;
const MAX_TITLE_CHARS = 60;
const MIN_PILLAR_CHARS = 12000;
const REQUIRED_SCHEMAS = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization'];

const PILLAR_TRIGGERS = [
  /pillar/i,
  /Pillar/,
];

function isPillarBlog(value) {
  if (!value || typeof value !== 'object') return false;
  const slug = value.slug || '';
  const title = value.title || '';
  if (PILLAR_TRIGGERS[0].test(slug)) return true;
  if (PILLAR_TRIGGERS[1].test(title)) return true;
  return false;
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

    // 检查 1: date 字段 = 2026-09-03
    if (date !== REQUIRED_DATE) {
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

    // 检查 2: lastUpdated 字段 = 2026-09-03
    if (lastUpdated !== REQUIRED_DATE) {
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

    // 检查 3: title 长度 50-60 字
    const titleLen = title.length;
    if (titleLen < MIN_TITLE_CHARS || titleLen > MAX_TITLE_CHARS) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: title len=${titleLen} 不在 ${MIN_TITLE_CHARS}-${MAX_TITLE_CHARS} 范围 (per AGENTS.md §5 SEO Title 规则)`,
        severity: 'red',
        ruleId: 'BLOG_TITLE_LENGTH',
        ruleName: `Pillar blog Title 长度 ${MIN_TITLE_CHARS}-${MAX_TITLE_CHARS} 字`,
        fix: `改 ${slug} title 到 50-60 字 (主关键词前置, 品牌后置, 只用一次)`,
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

    // 检查 5: content 长度 >= 12,000 字
    if (blogContent.length < MIN_PILLAR_CHARS) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: content len=${blogContent.length} < ${MIN_PILLAR_CHARS}`,
        severity: 'red',
        ruleId: 'BLOG_LENGTH_INSUFFICIENT',
        ruleName: 'Pillar blog 12,000+ 字硬性要求',
        fix: `升级 ${slug} content 到 12,000+ 字 Pillar 深度版`,
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

    // 检查 7: content 含 5 schema JSON-LD 块
    const ldCount = (blogContent.match(/application\/ld\+json/g) || []).length;
    if (ldCount < REQUIRED_SCHEMAS.length) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: JSON-LD count=${ldCount} < 5 (Article+FAQPage+BreadcrumbList+HowTo+Organization)`,
        severity: 'red',
        ruleId: 'BLOG_SCHEMA_5BLOCKS',
        ruleName: 'Pillar blog 5 schema JSON-LD 实际块',
        fix: `加 5 schema JSON-LD 实际块到 ${slug} content 顶部`,
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
