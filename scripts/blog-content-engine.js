#!/usr/bin/env node
/**
 * Blog 内容引擎 —— 每周 ≥ 4 篇高质量内容
 *
 * 用途：自动产出 3 语言博客内容日历（含 title/keywords/outline/prompt）
 * 输出：docs/blog-content-calendar.json
 *
 * 用法：node scripts/blog-content-engine.js [--week N] [--regenerate]
 *
 * 设计原则：
 * - 输出"内容 brief"（不是完整正文）—— 让 Kimi/Claude 生成正文更可控
 * - 3 语言并行：zh-hk 2 篇 / en 1 篇 / ja 1 篇（每周）
 * - SEO 关键词基于 GSC top 5（从 image-generation-tasks.json 借鉴）
 * - GEO 适配：每篇带 Q&A outline + 引用源结构
 */

const fs = require('fs');
const path = require('path');

// ============ 配置 ============
const OUTPUT_PATH = path.join(__dirname, '..', 'docs', 'blog-content-calendar.json');

// 4 周内容主题池（轮转）
const TOPICS_POOL = {
  'zh-hk': [
    { week: 1, topic: '香港 Same Day 印刷完全指南', keyword: '香港 Same Day 印刷', intent: 'service' },
    { week: 2, topic: '觀塘印刷 vs 上環印刷：港島 vs 九龍印刷公司比較', keyword: '觀塘印刷', intent: 'comparison' },
    { week: 3, topic: '如何印一盒 100 個禮盒：包裝印刷流程圖解', keyword: '包裝印刷', intent: 'howto' },
    { week: 4, topic: 'FSC 認證紙 vs 普通紙：環保印刷成本分析', keyword: '環保印刷', intent: 'analysis' },
  ],
  'en': [
    { week: 1, topic: 'Same Day Printing Hong Kong: Complete Guide for Event Organizers', keyword: 'same day printing hong kong', intent: 'service' },
    { week: 2, topic: 'FSC Certified Paper vs Regular: Sustainable Printing Cost Analysis', keyword: 'sustainable printing', intent: 'analysis' },
    { week: 3, topic: 'How to Print 100 Gift Boxes: Packaging Printing Workflow Explained', keyword: 'custom packaging', intent: 'howto' },
    { week: 4, topic: 'Hong Kong vs Shenzhen Printing: Which to Choose for International Clients', keyword: 'hong kong printing service', intent: 'comparison' },
  ],
  'ja': [
    { week: 1, topic: '同人誌印刷 完全ガイド：少ロット vs 大量印刷の選び方', keyword: '同人誌 印刷', intent: 'guide' },
    { week: 2, topic: '即日発送 香港ポスター印刷：日本イベント向け', keyword: 'ポスター印刷 香港', intent: 'service' },
    { week: 3, topic: '和紙名刺 vs 普通名刺：日本向けハイエンド印刷', keyword: '和紙名刺', intent: 'comparison' },
    { week: 4, topic: 'FSC認証紙 vs 普通紙：環境対応印刷のコスト分析', keyword: 'エコ印刷', intent: 'analysis' },
  ],
};

// 模板：每语 meta_description 长度 150-160
const META_TEMPLATES = {
  'zh-hk': (topic, keyword) => `${topic}。${keyword}專家指南，附報價案例。智印云香港 Same Day 印刷專家｜ISO9001｜FSC認證｜24H交貨。`,
  'en': (topic, keyword) => `${topic}. Expert ${keyword} guide with case studies. ZprintPro Hong Kong Same Day Printing | ISO9001 | FSC Certified | 24H Delivery.`,
  'ja': (topic, keyword) => `${topic}。${keyword}の專門ガイド。智印云香港即日印刷｜ISO9001｜FSC認証｜24時間納品。`,
};

// 模板：每语 outline（5-7 段 + Q&A 章节）
const OUTLINE_TEMPLATES = {
  'zh-hk': (topic) => [
    `為什麼 ${topic} 在 2026 年越來越重要？`,
    `常見痛點：買家最常問的 3 個問題`,
    `解決方案：4 步流程（圖解）`,
    `報價對比：智印云 vs 同業（HK$ 對比）`,
    `真實案例：客戶成功故事`,
    `FAQ：5 個最常見問題（AI 搜索友好）`,
    `行動呼籲：免費 WhatsApp 報價`,
  ],
  'en': (topic) => [
    `Why ${topic} matters in 2026`,
    `Top 3 pain points buyers ask about`,
    `Solution: 4-step workflow (with diagrams)`,
    `Price comparison: ZprintPro vs competitors (USD/HKD)`,
    `Case study: Customer success story`,
    `FAQ: 5 most common questions (AI-search friendly)`,
    `CTA: Free WhatsApp quote`,
  ],
  'ja': (topic) => [
    `なぜ ${topic} が 2026 年に重要か`,
    `よくある課題：購入者が聞く 3 つの質問`,
    `解決策：4 ステップフロー（図解）`,
    `価格比較：智印云 vs 競合（JPY/HKD）`,
    `事例：顧客成功ストーリー`,
    `FAQ：5 つのよくある質問（AI 検索対応）`,
    `CTA：無料 WhatsApp 見積もり`,
  ],
};

// AI 生成 prompt 模板（Kimi 2.6 / Claude / ChatGPT 通用）
const PROMPT_TEMPLATES = {
  'zh-hk': (topic, keyword, outline) => `# 任務

寫一篇關於「${topic}」的 SEO + GEO 友好博客文章，目標關鍵詞：「${keyword}」。

# 結構（嚴格按 outline 寫）

${outline.map((s, i) => `${i + 1}. ${s}`).join('\n')}

# 字數
- 1500-2000 字（繁體中文）
- 不要水內容，每段都要有實質信息

# SEO 優化
- 標題包含目標關鍵詞
- H2 子標題包含關鍵詞變體
- 內鏈 3-5 個（指向 zprintpro.com 產品/分類頁）
- 外鏈 2-3 個（權威來源）
- Meta description 150-160 字
- 圖片 alt 包含關鍵詞

# GEO 友好（AI 搜索）
- FAQ 章节 5 个 Q&A
- 每个 Q&A 用结构化问答格式
- 引用源标注（[1]、[2]...）
- 文章末尾加"参考来源"

# 語氣
- 專業但親和
- 數據支持（不要空談）
- 港式繁體中文
- 智印云 ZprintPro 品牌自然植入

# 輸出格式
Markdown，含 frontmatter（title/meta_description/keywords/tags）。`,

  'en': (topic, keyword, outline) => `# Task

Write an SEO + GEO-friendly blog post about "${topic}", target keyword: "${keyword}".

# Structure (strictly follow outline)

${outline.map((s, i) => `${i + 1}. ${s}`).join('\n')}

# Word count
- 1500-2000 words (English)
- No fluff, every paragraph must have substantive information

# SEO optimization
- Title contains target keyword
- H2 subheadings contain keyword variations
- Internal links 3-5 (to zprintpro.com product/category pages)
- External links 2-3 (authoritative sources)
- Meta description 150-160 chars
- Image alts contain keyword

# GEO-friendly (AI search)
- FAQ section 5 Q&A
- Each Q&A in structured question-answer format
- Source citations ([1], [2]...)
- "References" section at end

# Tone
- Professional but approachable
- Data-backed (no empty claims)
- ZprintPro brand naturally embedded

# Output format
Markdown with frontmatter (title/meta_description/keywords/tags).`,

  'ja': (topic, keyword, outline) => `# タスク

「${topic}」について SEO + GEO 対応のブログ記事を書く。ターゲットキーワード：「${keyword}」。

# 構造（アウトライン厳守）

${outline.map((s, i) => `${i + 1}. ${s}`).join('\n')}

# 文字数
- 1500-2000 文字（日本語）
- 水内容禁止、各段落に実質情報

# SEO 最適化
- タイトルにターゲットキーワード
- H2 サブタイトルにキーワードバリエーション
- 内部リンク 3-5（zprintpro.com 製品/カテゴリページへ）
- 外部リンク 2-3（権威ソース）
- Meta description 150-160 文字
- 画像 alt にキーワード

# GEO 対応（AI 検索）
- FAQ セクション 5 Q&A
- 各 Q&A は構造化された質問回答形式
- 出典表記（[1]、[2]...）
- 記事末尾に「参考来源」

# トーン
- 専門的だが親しみやすい
- データバックアップ（空論禁止）
- 智印云 ZprintPro ブランド自然に組み込み

# 出力形式
フロントマター付き Markdown（title/meta_description/keywords/tags）。`,
};

// ============ 核心函数 ============

function generateBlogPost(locale, topicObj) {
  const { week, topic, keyword, intent } = topicObj;
  const metaDesc = META_TEMPLATES[locale](topic, keyword);
  const outline = OUTLINE_TEMPLATES[locale](topic);
  const aiPrompt = PROMPT_TEMPLATES[locale](topic, keyword, outline);

  // Q&A 章节内容（5 问）
  const faqTopics = {
    'zh-hk': [
      `${topic}需要多長時間？`,
      `${topic}的價格大約多少？`,
      `智印云提供 ${topic}服務嗎？`,
      `${topic}需要注意什麼？`,
      `如何開始 ${topic}？`,
    ],
    'en': [
      `How long does ${topic} take?`,
      `How much does ${topic} cost?`,
      `Does ZprintPro offer ${topic}?`,
      `What to watch out for with ${topic}?`,
      `How to get started with ${topic}?`,
    ],
    'ja': [
      `${topic}にはどのくらい時間がかかりますか？`,
      `${topic}の価格はいくらですか？`,
      `智印云は ${topic}サービスを提供していますか？`,
      `${topic}で注意すべき点は？`,
      `${topic}を始めるには？`,
    ],
  };

  return {
    week,
    locale,
    topic,
    keyword,
    intent, // service / comparison / howto / analysis / guide
    meta_description: metaDesc,
    slug: keyword.toLowerCase().replace(/\s+/g, '-').replace(/[^\w一-龥\w-]/g, ''),
    outline,
    faq: faqTopics[locale],
    internal_links_suggestion: [
      `/${locale}/`,
      `/${locale}/product/premium-business-cards/`,
      `/${locale}/contact/`,
    ],
    image_alt: `${topic} - ${keyword} - ZprintPro 智印云`,
    ai_prompt: aiPrompt,
    estimated_words: 1750,
    status: 'brief-ready', // brief-ready → writing → published
  };
}

function generateWeekContent(week) {
  const weekContent = [];
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const topics = TOPICS_POOL[locale];
    const topic = topics.find((t) => t.week === week);
    if (topic) {
      weekContent.push(generateBlogPost(locale, topic));
    }
  }
  return weekContent;
}

function generateCalendar(weeks = 4) {
  const weeks_data = [];
  for (let w = 1; w <= weeks; w++) {
    weeks_data.push({
      week: w,
      posts: generateWeekContent(w),
    });
  }
  return {
    generatedAt: new Date().toISOString(),
    totalWeeks: weeks,
    totalPosts: weeks * 3, // 3 lang per week
    frequencyPerWeek: 3,
    frequencyTarget: 4, // goal: 4 (zh-hk 2 + en 1 + ja 1)
    weeks: weeks_data,
    usage: {
      step1: '复制 ai_prompt 到 Kimi 2.6 / Claude / ChatGPT',
      step2: '让 AI 生成完整博客（1500-2000 字）',
      step3: '人工 review + 添加图片',
      step4: '保存为 src/data/blog-posts/{slug}.{locale}.md',
      step5: '更新 sitemap 提交 GSC',
    },
  };
}

// ============ CLI ============

if (require.main === module) {
  const args = process.argv.slice(2);
  const weekArg = args.find((a) => a.startsWith('--week'));
  const weeks = weekArg ? parseInt(weekArg.split('=')[1] || '4') : 4;

  console.log(`[blog-engine] generating ${weeks}-week calendar (3 lang/week)...`);
  const calendar = generateCalendar(weeks);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(calendar, null, 2), 'utf-8');
  console.log(`[blog-engine] written: ${OUTPUT_PATH}`);
  console.log(`[blog-engine] total: ${calendar.totalPosts} briefs (${calendar.totalWeeks} weeks x 3 lang)`);
  console.log('');
  console.log('Sample first post:');
  console.log(`  locale: ${calendar.weeks[0].posts[0].locale}`);
  console.log(`  topic:  ${calendar.weeks[0].posts[0].topic}`);
  console.log(`  kw:     ${calendar.weeks[0].posts[0].keyword}`);
  console.log(`  slug:   ${calendar.weeks[0].posts[0].slug}`);
  console.log(`  meta:   ${calendar.weeks[0].posts[0].meta_description.slice(0, 80)}...`);
}

module.exports = {
  generateBlogPost,
  generateWeekContent,
  generateCalendar,
  TOPICS_POOL,
};
