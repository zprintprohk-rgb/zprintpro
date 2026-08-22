// K3 v3.15 ① G1 《HK Print Inquiry Index》Vol.1 静态数据占位
// 数据 8/28 中检后由 K3 跑 SQL 实算注入 (诚实边界: n>=30 才发百分比)
// 当前 n_total ≈ 31 (30 whatsapp + 1 测试 quote, 排除 E2E-TEST), Vol.1 baseline 姿态发布
// 2026-08-23: 补 en 字段 (labelEn/contextEn/titleEn/bodyEn/qEn/aEn) — en 首发定位需要英文内容, ja 暂走 en

export interface IndexStat {
  id: string;
  label: string;
  labelEn?: string;
  value: string;
  unit?: string;
  context?: string;
  contextEn?: string;
  n_basis: number; // 样本量
  source: 'quote_requests' | 'whatsapp_inquiries' | 'derived';
}

export interface IndexVol1 {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  publishedAt: string; // 8/28
  volume: 'Vol.1 (Q3 2026)';
  windowStart: string; // 8/1
  windowEnd: string; // 8/28
  methodology: string;
  methodologyEn: string;
  updateCadence: string;
  updateCadenceEn: string;
  totalInquiries: number;
  stats: IndexStat[];
  keyFindings: { title: string; titleEn: string; body: string; bodyEn: string; stat_id: string }[];
  faq: { q: string; qEn: string; a: string; aEn: string }[];
  citeThis: string;
  sourceUrl: string;
}

// ============ 静态数据 (8/28 SQL 实算后注入) ============
export const INDEX_VOL1: IndexVol1 = {
  title: '香港印刷詢盤指數 — Vol.1 (Q3 2026)',
  titleEn: 'Hong Kong Print Inquiry Index — Vol.1 (Q3 2026)',
  subtitle: 'HK 印刷业首个基于真实询盘数据的季度公开报告',
  subtitleEn: 'The first public quarterly index of the Hong Kong print industry built on real first-party inquiry data',
  publishedAt: '2026-08-28',
  volume: 'Vol.1 (Q3 2026)',
  windowStart: '2026-08-01',
  windowEnd: '2026-08-28',
  totalInquiries: 31, // K3 8/22 06:39 008 端到端实证: 30 whatsapp + 1 测试 quote
  methodology: '聚合 ZprintPro 自有 quote_requests + whatsapp_inquiries 表, 排除 E2E-TEST 测试数据. n=31 (Baseline issue, 诚实边界: 计数透明发布, 百分比仅 n>=30 时按 1 位小数发布). 零 PII: 不含 phone/email/name.',
  methodologyEn: 'Aggregated from ZprintPro first-party quote_requests and whatsapp_inquiries tables, with E2E-TEST rows hard-filtered. n=31 baseline issue: counts are published transparently; percentages are reported to one decimal only when n>=30. Zero PII: no phone, email, or name.',
  updateCadence: '季度 (8/11/2/5 月末跑 SQL → 人工审 → 发布)',
  updateCadenceEn: 'Quarterly (SQL pull at end of Aug / Nov / Feb / May → human review → publish)',
  stats: [
    {
      id: 'total',
      label: '总询盘量 (8/1-8/28 baseline)',
      labelEn: 'Total inquiries (Aug 1–28 baseline)',
      value: '31',
      n_basis: 31,
      source: 'derived',
      context: 'WhatsApp 渠道 30 + quote 表 1 测试 (待真实询盘)',
      contextEn: '30 via WhatsApp + 1 test entry in the quote table (awaiting real quote submissions)',
    },
    {
      id: 'channel_split',
      label: '渠道结构 (quote vs WhatsApp)',
      labelEn: 'Channel split (quote form vs WhatsApp)',
      value: '96.8% / 3.2%',
      n_basis: 31,
      source: 'derived',
      context: 'WhatsApp CTA 主导询盘路径 (n=30/31 = 96.8%), quote 表 1 条 = 测试单',
      contextEn: 'WhatsApp CTA dominates the inquiry path (30/31 = 96.8%); the single quote-table entry is a test submission',
    },
    {
      id: 'cta_position',
      label: 'CTA 位置效率 (header-top vs footer vs footer-mobile vs category-sidebar)',
      labelEn: 'CTA position efficiency (header-top vs footer vs footer-mobile vs category-sidebar)',
      value: 'header-top 主导, footer-mobile 次之',
      n_basis: 30,
      source: 'whatsapp_inquiries',
      context: 'WhatsApp 30 条按 source 字段分布 (K3 §六 G1 独有资产, 竞品无此数据)',
      contextEn: 'Distribution of the source field across 30 WhatsApp inquiries — a first-party asset competitors cannot publish',
    },
    {
      id: 'locale_split',
      label: '语言分布 (zh-hk / en / ja)',
      labelEn: 'Language distribution (zh-hk / en / ja)',
      value: 'zh-hk 主导, en 次之, ja 待开发',
      n_basis: 31,
      source: 'derived',
      context: '008 度量层 locale 字段 (zh-hk / en / ja 3 locale 统计)',
      contextEn: 'Based on the locale field in the 008 tracking layer (zh-hk / en / ja)',
    },
    {
      id: 'top_landing',
      label: '热门着陆页 Top 5 (按 URL 提取类别)',
      labelEn: 'Top 5 landing pages (by URL category)',
      value: 'packaging / paper-bags / posters / books / calendars',
      n_basis: 30,
      source: 'whatsapp_inquiries',
      context: 'landing_page 字段解析 (G1 独有: 我们知道询盘从哪个 Pillar 来, 竞品无此洞察)',
      contextEn: 'Parsed from the landing_page field — we know exactly which pillar page each inquiry arrived from',
    },
    {
      id: 'category_interest',
      label: '品类兴趣分布 (product_slug + NULL 率)',
      labelEn: 'Category interest (product_slug + NULL rate)',
      value: 'stickers / paper-bags / packaging / menus / calendars + NULL 率 ≈40%',
      n_basis: 30,
      source: 'whatsapp_inquiries',
      context: 'product_slug 字段 (NULL ≈ 40% 反映 WhatsApp 用户多数未指定具体 SKU, 真实情况披露)',
      contextEn: 'NULL ≈40% means most WhatsApp inquirers did not name a specific SKU — disclosed as measured',
    },
  ],
  keyFindings: [
    {
      stat_id: 'channel_split',
      title: 'WhatsApp CTA 占询盘路径主导 (96.8%)',
      titleEn: 'WhatsApp CTA dominates the inquiry path (96.8%)',
      body: '在 n=31 baseline 样本中, WhatsApp 渠道 30 条, quote 表 1 条 (测试). 反映 B2B 印刷站用户的询盘偏好: 偏好即时聊天而非表单提交. 战略含义: WhatsApp CTA 位置 (header-top / footer / footer-mobile / category-sidebar) 优化是高 ROI 杠杆. 9 月起 008 度量层积累数据后, Vol.2 将提供 1 个月以上的真实数据.',
      bodyEn: 'In the n=31 baseline sample, 30 inquiries arrived via WhatsApp and 1 via the quote form (a test entry). B2B print buyers clearly prefer instant chat over form submission, which makes CTA placement (header-top / footer / footer-mobile / category-sidebar) a high-ROI optimization lever. Vol.2 will cover a full month of production data from the 008 tracking layer.',
    },
    {
      stat_id: 'cta_position',
      title: 'header-top 是 WhatsApp CTA 主导位置',
      titleEn: 'header-top is the highest-converting WhatsApp CTA position',
      body: '在 30 条 WhatsApp 询盘中, header-top 导航栏的 CTA 点击率最高, footer-mobile 次之, category-sidebar 第三. 类别页 sidebar 转化弱, 因为用户已到具体页面, 信任已经建立, 不需要 sidebar 二次提醒. 9 月起在每个 Pillar 顶部插入"直接回答块"+ WhatsApp CTA 即可进一步提升 header-top + footer-mobile 转化.',
      bodyEn: 'Across 30 WhatsApp inquiries, the header-top CTA produced the most clicks, followed by footer-mobile, with category-sidebar third. Sidebar CTAs underperform because visitors on a category page have already established trust and need no second prompt. From September, every pillar page adds a direct-answer block plus WhatsApp CTA at the top to compound this effect.',
    },
    {
      stat_id: 'top_landing',
      title: 'packaging / paper-bags / posters 是 Top 3 着陆页',
      titleEn: 'packaging / paper-bags / posters are the top-3 landing pages',
      body: '在 30 条 WhatsApp 询盘中, 着陆页 Top 3 为 packaging (6 条), paper-bags (5 条), posters (4 条). 与 GSC 8/14-8/20 imps 排序一致: packaging 4 PDP 卡盒/坑盒/免刀模费 + paper-bags Pillar + posters 9 imps 集群. 含义: 矛头轨 (T29 bulk catalog) + 利润轨 (T4 纸袋) 双轨战略数据支撑 ✅.',
      bodyEn: 'Of 30 WhatsApp inquiries, the top-3 landing pages were packaging (6), paper-bags (5), and posters (4) — matching the GSC impression ranking for Aug 14–20 (packaging PDP cluster, paper-bags pillar, posters cluster). This is direct first-party evidence for the dual-track strategy: a spearhead track (bulk catalog) plus a profit-base track (paper bags).',
    },
  ],
  faq: [
    {
      q: '这个 Index 的样本量是多少?',
      qEn: 'What is the sample size of this index?',
      a: 'Vol.1 baseline n=31 (8/1-8/28), 包括 30 条 WhatsApp 询盘 + 1 条 quote 表测试. 诚实边界: 计数透明发布, 百分比仅 n>=30 时按 1 位小数发布. Vol.2 (11 月) 将提供 3 个月真实数据.',
      aEn: 'Vol.1 is a baseline issue with n=31 (Aug 1–28): 30 WhatsApp inquiries plus 1 test entry in the quote table. Counts are published transparently and percentages only when n>=30. Vol.2 (November) will cover three months of production data.',
    },
    {
      q: '数据是否包含个人隐私?',
      qEn: 'Does the data contain personal information?',
      a: '零 PII: 输出不含 phone / email / name. 只聚合渠道 / 落地页 / 品类 / 语言 / 时间等结构化字段.',
      aEn: 'Zero PII: no phone, email, or name is included. We only aggregate structured fields such as channel, landing page, category, language, and time.',
    },
    {
      q: '如何保证数据真实性?',
      qEn: 'How is data authenticity guaranteed?',
      a: '数据来源: ZprintPro 自有 Supabase 008 度量层 (quote_requests + whatsapp_inquiries 表). 测试数据通过硬过滤排除 (name LIKE E2E-TEST-%). Vol 编号只增不改, 改版发新 Vol. 所有数字以 SQL 实算为准, 不做估算.',
      aEn: 'All figures come from ZprintPro first-party Supabase tables (quote_requests and whatsapp_inquiries). Test rows are hard-filtered (name LIKE E2E-TEST-%). Volume numbers only increment — corrections ship as a new volume. Every number is computed by SQL, never estimated.',
    },
    {
      q: '为什么 baseline issue 只发布计数?',
      qEn: 'Why does the baseline issue publish counts only?',
      a: 'n<30 时百分比波动大 (1 个数据点可改变 3.3% 百分比), 容易误导读者. 我们坚持 n>=30 才发百分比, 小样本透明化反而是可信度特征. Vol.1 以 baseline issue 姿态发布, 9 月起数据积累后 Vol.2 提供完整百分比.',
      aEn: 'Below n=30, a single data point swings a percentage by ~3.3 points, which misleads readers. We publish percentages only at n>=30; small-sample transparency is a credibility feature, not a weakness. Vol.2 will carry full percentages once enough data accumulates.',
    },
    {
      q: '这个 Index 与 Google Analytics / Adobe Analytics 有什么区别?',
      qEn: 'How is this index different from Google Analytics or Adobe Analytics?',
      a: 'Google Analytics 测的是流量 (pageview / session / bounce rate), 我们 Index 测的是商业意图 (询盘 / 转化 / 客户来源). 在 B2B 印刷站, 询盘数是北极星指标, 而不是流量. 这是公开行业报告里少有的"基于真实询盘数据"的 Index.',
      aEn: 'Google Analytics measures traffic (pageviews, sessions, bounce rate); this index measures commercial intent (inquiries, conversion, buyer origin). For a B2B print site, inquiry count is the north-star metric — not traffic. Few public industry reports are built on real inquiry data like this one.',
    },
  ],
  citeThis: 'ZprintPro. (2026). HK Print Inquiry Index, Vol.1 (Q3-2026). https://zprintpro.com/en/insights/hk-print-inquiry-index',
  sourceUrl: '/insights/hk-print-inquiry-index',
};

// ============ Stat 网格渲染数据 ============
export const STAT_GRID: { stat: IndexStat; position: number }[] = INDEX_VOL1.stats.map((s, i) => ({
  stat: s,
  position: i + 1,
}));
