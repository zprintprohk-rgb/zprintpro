/**
 * scripts/guards/pillar-guard.js
 * 反审门童 #11 Pillar 标准检查 (K3 9/3 19:23 拍板 v1.4 升级)
 *
 * 检查 Pillar blog 必须符合:
 * 1. content 长度 >= 12,000 字
 * 2. content 包含 5 个 application/ld+json 块 (Article + FAQPage + BreadcrumbList + HowTo + Organization)
 * 3. schemas 数组 (5 schema) 必须跟 content 实际 schema 块一致
 *
 * 触发条件: blog slug 包含 "pillar" OR title 包含 "Pillar" OR content 第一段包含 "Pillar"
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_SCHEMAS = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization'];
const MIN_PILLAR_CHARS = 12000;

const PILLAR_TRIGGERS = [
  /pillar/i,                  // slug 含 "pillar"
  /Pillar/,                    // title 含 "Pillar"
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
    const schemasField = value.schemas || [];

    // 检查 1: content 长度 >= 12,000 字
    if (blogContent.length < MIN_PILLAR_CHARS) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: content len=${blogContent.length} < ${MIN_PILLAR_CHARS}`,
        severity: 'red',
        ruleId: 'PILLAR_LENGTH',
        ruleName: 'Pillar 12,000+ 字硬性要求',
        fix: `升级 ${slug} content 到 12,000+ 字 Pillar 深度版 (per §0.30 v2.2 Pillar 三维分层)`,
      });
    }

    // 检查 2: content 包含 5 个 application/ld+json 块
    const ldCount = (blogContent.match(/application\/ld\+json/g) || []).length;
    if (ldCount < REQUIRED_SCHEMAS.length) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: JSON-LD count=${ldCount} < 5 (Article+FAQPage+BreadcrumbList+HowTo+Organization)`,
        severity: 'red',
        ruleId: 'PILLAR_SCHEMA_5BLOCKS',
        ruleName: 'Pillar 5 schema JSON-LD 实际块',
        fix: `加 5 schema JSON-LD 实际块到 ${slug} content 顶部 (Article + FAQPage + BreadcrumbList + HowTo + Organization)`,
      });
    }

    // 检查 3: 实际 schema 块类型必须包含 5 个必需 schema
    // 用平衡花括号提取完整 JSON 对象 (原 regex [{...}?] 不能处理嵌套 JSON-LD)
    const ldBlockTypes = new Set();
    const ldStartRegex = /<script\s+type=["']application\/ld\+json["']>/g;
    let sm;
    while ((sm = ldStartRegex.exec(blogContent)) !== null) {
      // 找下一个 </script>
      const endIdx = blogContent.indexOf('</script>', sm.index);
      if (endIdx < 0) break;
      const body = blogContent.substring(sm.index + sm[0].length, endIdx);
      // 用平衡花括号提取第一个完整 {...}
      const firstBrace = body.indexOf('{');
      if (firstBrace < 0) continue;
      let depth = 0, inString = false, escape = false, end = -1;
      for (let i = firstBrace; i < body.length; i++) {
        const ch = body[i];
        if (escape) { escape = false; continue; }
        if (ch === '\\') { escape = true; continue; }
        if (ch === '"') { inString = !inString; continue; }
        if (inString) continue;
        if (ch === '{') depth++;
        else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
      }
      if (end < 0) continue;
      const json = body.substring(firstBrace, end + 1);
      try {
        const obj = JSON.parse(json);
        if (obj['@type']) {
          if (Array.isArray(obj['@type'])) {
            obj['@type'].forEach(t => ldBlockTypes.add(t));
          } else {
            ldBlockTypes.add(obj['@type']);
          }
        }
      } catch (e) {}
    }
    for (const required of REQUIRED_SCHEMAS) {
      if (!ldBlockTypes.has(required)) {
        hits.push({
          file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
          line: 0,
          match: `${slug}: 缺 ${required} schema 块 (实际 ${[...ldBlockTypes].join(',') || '无'})`,
          severity: 'red',
          ruleId: 'PILLAR_SCHEMA_MISSING',
          ruleName: `Pillar 缺 ${required} schema`,
          fix: `加 ${required} schema 实际 JSON-LD 块到 ${slug} content`,
        });
      }
    }

    // 检查 4: schemas 数组必须跟 content 实际 schema 块一致
    for (const required of REQUIRED_SCHEMAS) {
      if (!schemasField.includes(required)) {
        hits.push({
          file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
          line: 0,
          match: `${slug}: schemas 数组缺 ${required} (声明 ${schemasField.join(',') || '空'})`,
          severity: 'red',
          ruleId: 'PILLAR_SCHEMAS_ARRAY_MISSING',
          ruleName: `Pillar schemas 数组缺 ${required}`,
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
  return { name: 'pillar-guard', hits: allHits };
}

if (require.main === module) {
  const result = run();
  if (result.hits.length > 0) {
    console.log(`\n🔴 [PILLAR-GUARD] ${result.hits.length} 命中:`);
    for (const h of result.hits) {
      console.log(`  ${h.file} [${h.ruleId}] ${h.match}`);
      console.log(`    fix: ${h.fix}`);
    }
    process.exit(1);
  } else {
    console.log(`\n✅ [PILLAR-GUARD] 0 命中 - 所有 Pillar blog 符合 12,000+ 字 5 schema 标准`);
  }
}

module.exports = { run, checkPillar };
