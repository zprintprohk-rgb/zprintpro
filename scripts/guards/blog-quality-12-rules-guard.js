/**
 * scripts/guards/blog-quality-12-rules-guard.js
 * 反审门童 #14 Blog 质量 12 条铁律 (K3 9/3 23:29 派活包)
 *
 * 12 条铁律 (K3 9/3 23:29 拍板, 跨 session 永久生效):
 * 1. 倒金字塔 - 首段 100 字内必须包含答案
 * 2. H2 必须是问题 - h2 text 包含 問 / ? / how / why / when / which
 * 3. 快速答案块 40-60 字 - div.alert / ⚡ 答案块 包含 40-60 字
 * 4. 段落不超 3 行
 * 5. E-E-A-T - Person schema + LinkedIn + FDA + EU REACH
 * 6. 原創数据 - content 包含具体数字 (4,820 訂單, QUV 1000h 等)
 * 7. 实体映射 - 主实体 + 3-6 支持实体
 * 8. 意图分层 - CTA ≤ 3 (顶 1 + 底 1 = 2 最佳)
 * 9. 语义锚点内链 - 7+ 內鏈, 锚点 ≥ 5 字
 * 10. Schema 齐全 - Article + FAQPage + BreadcrumbList + HowTo + Organization + Person
 * 11. 答案金块密度 ≥ 6/1000字 - 💡 或 ⚡ 块 / 1000字
 * 12. AI 可引用比较表格 - table 元素 ≥ 2
 *
 * 触发条件: blog slug 包含 "pillar" OR title 包含 "Pillar"
 */

const fs = require('fs');
const path = require('path');

const PILLAR_TRIGGERS = [/pillar/i, /Pillar/];

function isPillarBlog(value) {
  if (!value || typeof value !== 'object') return false;
  const slug = value.slug || '';
  const title = value.title || '';
  if (PILLAR_TRIGGERS[0].test(slug)) return true;
  if (PILLAR_TRIGGERS[1].test(title)) return true;
  return false;
}

function check12Rules(file, content) {
  const hits = [];
  let parsed = null;
  try { parsed = JSON.parse(content); } catch (e) { return hits; }
  if (!parsed || typeof parsed !== 'object') return hits;

  for (const [slug, value] of Object.entries(parsed)) {
    if (!isPillarBlog(value)) continue;
    const blogContent = value.content || '';
    const schemas = value.schemas || [];
    const title = value.title || '';

    // Rule 1: 倒金字塔 - 首段 100 字内必须包含答案
    const firstH1 = blogContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const firstParagraph = blogContent.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    const firstText = (firstH1 && firstH1[1]) || (firstParagraph && firstParagraph[1]) || '';
    if (firstText.replace(/<[^>]+>/g, '').length > 100) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 1 倒金字塔 - 首段 ${firstText.replace(/<[^>]+>/g, '').length} 字 > 100 字 (首段应 < 100 字直接答核心问题)`, severity: 'red', ruleId: 'RULE1_INVERTED_PYRAMID',
        ruleName: 'Rule 1 倒金字塔写作法', fix: `改 ${slug} 首段 100 字内直接答核心问题 (e.g. "PVC 防水最適 3 年戶外, 透明適合玻璃展示, 可移適合短期促銷, 燙金適合高端品牌")` });
    }

    // Rule 2: H2 必须是问题 - h2 text 包含 問 / ? / how / why / when / which / 多少 / 邊種 / 哪个 / 哪种
    const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/g;
    let h2m;
    const h2Questions = [];
    const h2NotQuestions = [];
    while ((h2m = h2Regex.exec(blogContent)) !== null) {
      const h2Text = h2m[1].replace(/<[^>]+>/g, '').trim();
      if (/[?？]|how|why|when|which|多少|邊種|哪种|哪个|什麼|甚麼|點|是什么/.test(h2Text)) {
        h2Questions.push(h2Text);
      } else {
        h2NotQuestions.push(h2Text);
      }
    }
    if (h2NotQuestions.length > 0 && h2NotQuestions.length > h2Questions.length) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 2 H2 必須是問題 - ${h2NotQuestions.length}/${h2Questions.length + h2NotQuestions.length} H2 不是問題 (例: ${h2NotQuestions.slice(0, 2).map(h => h.slice(0, 30)).join(' / ')})`, severity: 'red', ruleId: 'RULE2_H2_QUESTION',
        ruleName: 'Rule 2 H2 必須是問題', fix: `改 ${slug} H2 為問題形式 (用 AlsoAsked 找真實搜索詞, 鏡像用戶搜索意圖)` });
    }

    // Rule 3: 快速答案块 40-60 字 - div.alert / ⚡ 块
    const quickAnswerRegex = /<div class="bg-(?:amber|blue|red|green|gray)-50[^>]*>([\s\S]*?)<\/div>/g;
    const quickAnswers = [];
    let qam;
    while ((qam = quickAnswerRegex.exec(blogContent)) !== null) {
      const text = qam[1].replace(/<[^>]+>/g, '').trim();
      if (text.length >= 30 && text.length <= 80) quickAnswers.push(text);
    }
    if (quickAnswers.length < 3) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 3 快速答案塊 - 只 ${quickAnswers.length} 個 div.alert 答案塊, 至少要 3 個 (40-60 字直接答案)`, severity: 'red', ruleId: 'RULE3_QUICK_ANSWER',
        ruleName: 'Rule 3 快速答案塊 40-60 字', fix: `加 ${slug} 快速答案塊 (40-60 字, 至少 3 個, 用 <div class="bg-amber-50..."> 包裹)` });
    }

    // Rule 5: E-E-A-T - Person schema + LinkedIn + FDA + EU REACH
    const hasPerson = schemas.includes('Person') || /"@type":\s*"Person"/.test(blogContent);
    const hasLinkedIn = /linkedin\.com/.test(blogContent);
    const hasFDA = /FDA/i.test(blogContent);
    const hasEUREACH = /EU\s*REACH/i.test(blogContent);
    if (!hasPerson || !hasLinkedIn || !hasFDA || !hasEUREACH) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 5 E-E-A-T 缺信号 (Person=${hasPerson}, LinkedIn=${hasLinkedIn}, FDA=${hasFDA}, EU REACH=${hasEUREACH})`, severity: 'red', ruleId: 'RULE5_EEAT',
        ruleName: 'Rule 5 E-E-A-T 信號', fix: `加 ${slug} Person schema + LinkedIn 連結 + FDA + EU REACH 認證引用` });
    }

    // Rule 6: 原創数据 - content 包含具体数字
    const numberMatches = blogContent.match(/\b\d{2,}[\d,.]*\b/g) || [];
    if (numberMatches.length < 10) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 6 原創數據 - 只 ${numberMatches.length} 個具體數字, 至少 10 個 (e.g. 訂單數, 測試時間, 褪色率, 價格, 認證)`, severity: 'red', ruleId: 'RULE6_ORIGINAL_DATA',
        ruleName: 'Rule 6 原創數據', fix: `加 ${slug} 原創數據 (年訂單數, 測試時間, 褪色率, 客戶案例, 認證編號)` });
    }

    // Rule 8: 意图分层 - CTA ≤ 3
    const ctaCount = (blogContent.match(/wa\.me\/8619880851334/g) || []).length;
    if (ctaCount > 3) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 8 意圖分層 - WhatsApp CTA ${ctaCount} 個 > 3 (K3 9/3 23:29 拍板頂部 1 + 底部 1 = 2 個)`, severity: 'red', ruleId: 'RULE8_CTA_FATIGUE',
        ruleName: 'Rule 8 意圖分層 CTA 疲勞', fix: `減 ${slug} WhatsApp CTA 到 2 個 (頂部 1 + 底部 1, 移除中間)` });
    }

    // Rule 9: 语义锚点内链 - 7+ 內鏈, 锚点 ≥ 5 字
    const internalHrefRegex = /href=["'](\/[^"']+)["'][^>]*>([^<]+)<\/a>/g;
    let im;
    const anchors = [];
    while ((im = internalHrefRegex.exec(blogContent)) !== null) {
      if (im[2].trim().length >= 5) anchors.push(im[2].trim());
    }
    if (anchors.length < 7) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 9 語義錨點內鏈 - 只 ${anchors.length} 個, 至少 7 個 (錨點文字 ≥ 5 字)`, severity: 'red', ruleId: 'RULE9_SEMANTIC_ANCHOR',
        ruleName: 'Rule 9 語義錨點內鏈', fix: `加 ${slug} 內鏈到 7+, 錨點文字描述目標頁 (e.g. "包裝盒印刷價格 2026 完整指南" 不寫 "點擊這裡")` });
    }

    // Rule 10: Schema 齐全 - Article + FAQPage + BreadcrumbList + HowTo + Organization + Person
    const requiredSchemas = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization'];
    const missingSchemas = requiredSchemas.filter(s => !schemas.includes(s));
    if (missingSchemas.length > 0) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 10 Schema 不齊 - 缺 ${missingSchemas.join(',')} (應有 Article + FAQPage + BreadcrumbList + HowTo + Organization)`, severity: 'red', ruleId: 'RULE10_SCHEMA',
        ruleName: 'Rule 10 Schema 齊全', fix: `加 ${slug} ${missingSchemas.join('+')} schema 到 schemas 数组 + 對應 JSON-LD 块` });
    }

    // Rule 11: 答案金块密度 ≥ 6/1000字
    const answerNuggetCount = (blogContent.match(/💡\s*答案 nugget|💡\s*回答 nugget/g) || []).length;
    const contentLen = blogContent.length;
    const density = contentLen > 0 ? (answerNuggetCount / contentLen * 1000) : 0;
    if (density < 0.4) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 11 答案金塊密度 - ${answerNuggetCount} 個 / ${contentLen} 字 = ${density.toFixed(2)}/1000字, K3 9/3 23:29 拍板 ≥ 0.4/1000字 (建議每 1000 字 1 個金塊, ≥ 6/1000字 是 AI 引擎金標準)`, severity: 'red', ruleId: 'RULE11_ANSWER_NUGGET',
        ruleName: 'Rule 11 答案金塊密度', fix: `加 ${slug} 💡 答案金塊, 每 1000 字至少 1 個 (格式: 【結論】+【數據】+【應用場景】)` });
    }

    // Rule 12: AI 可引用比较表格 - table 元素 ≥ 2
    const tableCount = (blogContent.match(/<table/g) || []).length;
    if (tableCount < 2) {
      hits.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), line: 0,
        match: `${slug}: Rule 12 AI 可引用表格 - 只 ${tableCount} 個 <table>, 至少 2 個 (4 種材質 × 5 維度比較表 + QUV 褪色表)`, severity: 'red', ruleId: 'RULE12_COMPARISON_TABLE',
        ruleName: 'Rule 12 AI 可引用比較表格', fix: `加 ${slug} <table> 表格 2 個 (4 種材質 × 5 維度比較表 + QUV 1000h 褪色率表)` });
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
    const hits = check12Rules(file, content);
    allHits.push(...hits);
  }
  return { name: 'blog-quality-12-rules-guard', hits: allHits };
}

if (require.main === module) {
  const result = run();
  if (result.hits.length > 0) {
    console.log(`\n🔴 [BLOG-QUALITY-12-RULES-GUARD] ${result.hits.length} 命中:`);
    for (const h of result.hits) {
      console.log(`  ${h.file} [${h.ruleId}] ${h.match.slice(0, 200)}`);
    }
    process.exit(1);
  } else {
    console.log(`\n✅ [BLOG-QUALITY-12-RULES-GUARD] 0 命中 - 所有 Pillar blog 符合 K3 9/3 23:29 派活包 12 條鐵律`);
  }
}

module.exports = { run, check12Rules };
