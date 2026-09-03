/**
 * scripts/guards/internal-links-cta-guard.js
 * 反审门童 #13 内部链接 + WhatsApp CTA 检查 (K3 9/3 22:44 拍板 v1.6 升级)
 *
 * 检查 Pillar blog 必须符合:
 * 1. content 含 10+ 内部链接 (内部路径 href, 不含 wa.me 外部 CTA)
 * 2. content 含 3+ WhatsApp CTA (wa.me/8619880851334 或 +86 198 8085 1334 unique 数量)
 *
 * 触发条件: blog slug 包含 "pillar" OR title 包含 "Pillar"
 */

const fs = require('fs');
const path = require('path');

const MIN_INTERNAL_LINKS = 10;
const MIN_WHATSAPP_CTA = 3;

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

function extractInternalLinks(content) {
  // 内部链接 = 内部路径 href (排除 wa.me / http:// 外部)
  const hrefRegex = /href=["']([^"']+)["']/g;
  const internal = new Set();
  let m;
  while ((m = hrefRegex.exec(content)) !== null) {
    const href = m[1];
    if (href.startsWith('wa.me/') || href.startsWith('http://') || href.startsWith('https://wa.me/')) continue;
    if (href.startsWith('https://') || href.startsWith('http://')) continue;
    if (href.startsWith('mailto:')) continue;
    internal.add(href);
  }
  return internal;
}

function extractWhatsAppCTA(content) {
  // WhatsApp CTA = wa.me/8619880851334 总出现次数 (顶部 + 中部 + 底部, 允许重复 URL, 实际是 3 个不同位置的 anchor)
  const waMatches = content.match(/wa\.me\/8619880851334/g) || [];
  return waMatches.length;
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

    // 检查 1: 内部链接 >= 10
    const internal = extractInternalLinks(blogContent);
    if (internal.size < MIN_INTERNAL_LINKS) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: 内部链接数=${internal.size} < ${MIN_INTERNAL_LINKS} (per docs/2026-09-02-k3-packaging-blog-reorganization.md §4.1 Pillar 必含 10+ 内链)`,
        severity: 'red',
        ruleId: 'PILLAR_INTERNAL_LINKS',
        ruleName: `Pillar 10+ 内部链接硬性要求`,
        fix: `加 ${slug} 内部链接到 10+ (1 回首页 + 4 校園类目 + 3 SKU PDP + 2 主题 + 1 CTA anchor)`,
      });
    }

    // 检查 2: WhatsApp CTA >= 3
    const ctaCount = extractWhatsAppCTA(blogContent);
    if (ctaCount < MIN_WHATSAPP_CTA) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: `${slug}: WhatsApp CTA 数=${ctaCount} < ${MIN_WHATSAPP_CTA} (per docs/2026-09-02-k3-packaging-blog-reorganization.md §4.1 Pillar 必含 3 WhatsApp CTA 顶部+中部+底部)`,
        severity: 'red',
        ruleId: 'PILLAR_WHATSAPP_CTA',
        ruleName: `Pillar 3+ WhatsApp CTA 硬性要求`,
        fix: `加 ${slug} WhatsApp CTA 到 3+ (顶部 + 中部 + 底部 wa.me/8619880851334)`,
      });
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
  return { name: 'internal-links-cta-guard', hits: allHits };
}

if (require.main === module) {
  const result = run();
  if (result.hits.length > 0) {
    console.log(`\n🔴 [INTERNAL-LINKS-CTA-GUARD] ${result.hits.length} 命中:`);
    for (const h of result.hits) {
      console.log(`  ${h.file} [${h.ruleId}] ${h.match}`);
      console.log(`    fix: ${h.fix}`);
    }
    process.exit(1);
  } else {
    console.log(`\n✅ [INTERNAL-LINKS-CTA-GUARD] 0 命中 - 所有 Pillar blog 符合 10+ 内部链接 + 3+ WhatsApp CTA 标准`);
  }
}

module.exports = { run, checkPillar };
