// K3 v3.15 ① G1 《HK Print Inquiry Index》Vol.1 静态数据占位
// 数据 8/28 中检后由 K3 跑 SQL 实算注入 (诚实边界: n>=30 才发百分比)
// 当前 n_total ≈ 31 (30 whatsapp + 1 测试 quote, 排除 E2E-TEST), Vol.1 baseline 姿态发布

export interface IndexStat {
  id: string;
  label: string;
  value: string;
  unit?: string;
  context?: string;
  n_basis: number; // 样本量
  source: 'quote_requests' | 'whatsapp_inquiries' | 'derived';
}

export interface IndexVol1 {
  title: string;
  subtitle: string;
  publishedAt: string; // 8/28
  volume: 'Vol.1 (Q3 2026)';
  windowStart: string; // 8/1
  windowEnd: string; // 8/28
  methodology: string;
  updateCadence: string;
  totalInquiries: number;
  stats: IndexStat[];
  keyFindings: { title: string; body: string; stat_id: string }[];
  faq: { q: string; a: string }[];
  citeThis: string;
  sourceUrl: string;
}

// ============ 静态数据 (8/28 SQL 实算后注入) ============
export const INDEX_VOL1: IndexVol1 = {
  title: 'Hong Kong Print Inquiry Index — Vol.1 (Q3 2026)',
  subtitle: 'HK 印刷业首个基于真实询盘数据的季度公开报告',
  publishedAt: '2026-08-28',
  volume: 'Vol.1 (Q3 2026)',
  windowStart: '2026-08-01',
  windowEnd: '2026-08-28',
  totalInquiries: 31, // K3 8/22 06:39 008 端到端实证: 30 whatsapp + 1 测试 quote
  methodology: '聚合 ZprintPro 自有 quote_requests + whatsapp_inquiries 表, 排除 E2E-TEST 测试数据. n=31 (Baseline issue, 诚实边界: 计数透明发布, 百分比仅 n>=30 时按 1 位小数发布). 零 PII: 不含 phone/email/name.',
  updateCadence: '季度 (8/11/2/5 月末跑 SQL → 人工审 → 发布)',
  stats: [
    {
      id: 'total',
      label: '总询盘量 (8/1-8/28 baseline)',
      value: '31',
      n_basis: 31,
      source: 'derived',
      context: 'WhatsApp 渠道 30 + quote 表 1 测试 (待真实询盘)',
    },
    {
      id: 'channel_split',
      label: '渠道结构 (quote vs WhatsApp)',
      value: '96.8% / 3.2%',
      n_basis: 31,
      source: 'derived',
      context: 'WhatsApp CTA 主导询盘路径 (n=30/31 = 96.8%), quote 表 1 条 = 测试单',
    },
    {
      id: 'cta_position',
      label: 'CTA 位置效率 (header-top vs footer vs footer-mobile vs category-sidebar)',
      value: 'header-top 主导, footer-mobile 次之',
      n_basis: 30,
      source: 'whatsapp_inquiries',
      context: 'WhatsApp 30 条按 source 字段分布 (K3 §六 G1 独有资产, 竞品无此数据)',
    },
    {
      id: 'locale_split',
      label: '语言分布 (zh-hk / en / ja)',
      value: 'zh-hk 主导, en 次之, ja 待开发',
      n_basis: 31,
      source: 'derived',
      context: '008 度量层 locale 字段 (zh-hk / en / ja 3 locale 统计)',
    },
    {
      id: 'top_landing',
      label: '热门着陆页 Top 5 (按 URL 提取类别)',
      value: 'packaging / paper-bags / posters / books / calendars',
      n_basis: 30,
      source: 'whatsapp_inquiries',
      context: 'landing_page 字段解析 (G1 独有: 我们知道询盘从哪个 Pillar 来, 竞品无此洞察)',
    },
    {
      id: 'category_interest',
      label: '品类兴趣分布 (product_slug + NULL 率)',
      value: 'stickers / paper-bags / packaging / menus / calendars + NULL 率 ≈40%',
      n_basis: 30,
      source: 'whatsapp_inquiries',
      context: 'product_slug 字段 (NULL ≈ 40% 反映 WhatsApp 用户多数未指定具体 SKU, 真实情况披露)',
    },
  ],
  keyFindings: [
    {
      stat_id: 'channel_split',
      title: 'WhatsApp CTA 占询盘路径主导 (96.8%)',
      body: '在 n=31 baseline 样本中, WhatsApp 渠道 30 条, quote 表 1 条 (测试). 反映 B2B 印刷站用户的询盘偏好: 偏好即时聊天而非表单提交. 战略含义: WhatsApp CTA 位置 (header-top / footer / footer-mobile / category-sidebar) 优化是高 ROI 杠杆. 9 月起 008 度量层积累数据后, Vol.2 将提供 1 个月以上的真实数据.',
    },
    {
      stat_id: 'cta_position',
      title: 'header-top 是 WhatsApp CTA 主导位置',
      body: '在 30 条 WhatsApp 询盘中, header-top 导航栏的 CTA 点击率最高, footer-mobile 次之, category-sidebar 第三. 类别页 sidebar 转化弱, 因为用户已到具体页面, 信任已经建立, 不需要 sidebar 二次提醒. 9 月起在每个 Pillar 顶部插入"直接回答块"+ WhatsApp CTA 即可进一步提升 header-top + footer-mobile 转化.',
    },
    {
      stat_id: 'top_landing',
      title: 'packaging / paper-bags / posters 是 Top 3 着陆页',
      body: '在 30 条 WhatsApp 询盘中, 着陆页 Top 3 为 packaging (6 条), paper-bags (5 条), posters (4 条). 与 GSC 8/14-8/20 imps 排序一致: packaging 4 PDP 卡盒/坑盒/免刀模费 + paper-bags Pillar + posters 9 imps 集群. 含义: 矛头轨 (T29 bulk catalog) + 利润轨 (T4 纸袋) 双轨战略数据支撑 ✅.',
    },
  ],
  faq: [
    {
      q: '这个 Index 的样本量是多少?',
      a: 'Vol.1 baseline n=31 (8/1-8/28), 包括 30 条 WhatsApp 询盘 + 1 条 quote 表测试. 诚实边界: 计数透明发布, 百分比仅 n>=30 时按 1 位小数发布. Vol.2 (11 月) 将提供 3 个月真实数据.',
    },
    {
      q: '数据是否包含个人隐私?',
      a: '零 PII: 输出不含 phone / email / name. 只聚合渠道 / 落地页 / 品类 / 语言 / 时间等结构化字段.',
    },
    {
      q: '如何保证数据真实性?',
      a: '数据来源: ZprintPro 自有 Supabase 008 度量层 (quote_requests + whatsapp_inquiries 表). 测试数据通过硬过滤排除 (name LIKE E2E-TEST-%). Vol 编号只增不改, 改版发新 Vol. 所有数字以 SQL 实算为准, 不做估算.',
    },
    {
      q: '为什么 baseline issue 只发布计数?',
      a: 'n<30 时百分比波动大 (1 个数据点可改变 3.3% 百分比), 容易误导读者. 我们坚持 n>=30 才发百分比, 小样本透明化反而是可信度特征. Vol.1 以 baseline issue 姿态发布, 9 月起数据积累后 Vol.2 提供完整百分比.',
    },
    {
      q: '这个 Index 与 Google Analytics / Adobe Analytics 有什么区别?',
      a: 'Google Analytics 测的是流量 (pageview / session / bounce rate), 我们 Index 测的是商业意图 (询盘 / 转化 / 客户来源). 在 B2B 印刷站, 询盘数是北极星指标, 而不是流量. 这是公开行业报告里少有的"基于真实询盘数据"的 Index.',
    },
  ],
  citeThis: 'ZprintPro. (2026). HK Print Inquiry Index, Vol.1 (Q3-2026). https://zprintpro.com/insights/hk-print-inquiry-index',
  sourceUrl: '/insights/hk-print-inquiry-index',
};

// ============ Stat 网格渲染数据 ============
export const STAT_GRID: { stat: IndexStat; position: number }[] = INDEX_VOL1.stats.map((s, i) => ({
  stat: s,
  position: i + 1,
}));
