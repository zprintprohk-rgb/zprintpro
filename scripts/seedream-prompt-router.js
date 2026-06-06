/**
 * Seedream Prompt Router — 4 档 Style 自动选型
 *
 * 用法：
 *   const style = routeStyle({ category: 'labels', priceTier: 'high', audience: 'B2B' });
 *   // => 'B_minimalist'
 *
 * 决策依据：SKU 类目 + 客单价 + 受众
 * 输出：A_explosion | B_minimalist | C_lifestyle | D_technical
 */

const STYLE_RULES = [
  // ===== Style D：技术规格图 =====
  {
    style: 'D_technical',
    match: (sku) =>
      sku.category === 'signage'
      || (sku.category === 'labels' && sku.specs?.driven === true)
      || sku.tags?.includes('industrial')
      || sku.tags?.includes('safety')
      || sku.tags?.includes('warning'),
    reason: '规格驱动 / 工业 / 安全标签 / 标牌',
  },

  // ===== Style B：极简产品图 =====
  {
    style: 'B_minimalist',
    match: (sku) =>
      (sku.audience === 'B2B' && sku.priceTier === 'high')
      || sku.category === 'business-cards' && sku.priceTier === 'high'
      || sku.tags?.includes('enterprise')
      || sku.tags?.includes('premium'),
    reason: 'B2B 高单价 / 企业采购',
  },

  // ===== Style C：场景化生活图 =====
  {
    style: 'C_lifestyle',
    match: (sku) =>
      sku.category === 'packaging' && sku.priceTier !== 'low'
      || sku.category === 'large-format' && sku.tags?.includes('event')
      || sku.tags?.includes('gift')
      || sku.tags?.includes('doujinshi')
      || sku.tags?.includes('同人')
      || sku.tags?.includes('creative'),
    reason: '包装 / 礼品 / 海报 / 同人',
  },

  // ===== Style A：爆炸价格标签（默认）=====
  {
    style: 'A_explosion',
    match: (sku) => true, // fallback
    reason: '默认 fallback',
  },
];

/**
 * 路由 SKU 到 Style
 * @param {Object} sku - { category, priceTier, audience, tags, specs }
 * @returns {{ style: string, reason: string }}
 */
function routeStyle(sku) {
  for (const rule of STYLE_RULES) {
    if (rule.match(sku)) {
      return { style: rule.style, reason: rule.reason };
    }
  }
  return { style: 'A_explosion', reason: 'no rule matched (fallback)' };
}

// ============ 类目 → 默认 Style 映射（zprintpro 8 大分类） ============

const CATEGORY_DEFAULT = {
  'stickers': 'A_explosion',       // 贴纸
  'labels': 'B_minimalist',         // 标签（默认 B，食品/工业 → D）
  'cards': 'A_explosion',           // 卡片（高单价企业 → B）
  'books': 'C_lifestyle',           // 书刊
  'packaging': 'C_lifestyle',       // 包装（低单价 → A）
  'large-format': 'C_lifestyle',   // 大型喷画
  'stationery': 'A_explosion',      // 文具
  'promotional': 'A_explosion',     // 宣传品（创意 → C）
  'signage': 'D_technical',         // 标牌
};

/**
 * 简化版：只根据类目 + 客单价档
 * @param {string} category - 8 大分类之一
 * @param {string} priceTier - 'low' | 'mid' | 'high'
 * @returns {string} Style
 */
function routeByCategory(category, priceTier = 'mid') {
  // 高单价企业场景 → B
  if (priceTier === 'high') return 'B_minimalist';

  // 低单价快消 → A
  if (priceTier === 'low') return 'A_explosion';

  // 按类目默认
  return CATEGORY_DEFAULT[category] || 'A_explosion';
}

// ============ 批量处理工具 ============

/**
 * 给定 SKU 列表，批量分配 Style
 * @param {Array<Object>} skus
 * @returns {Array<{sku, style, reason}>}
 */
function batchRoute(skus) {
  return skus.map((sku) => {
    const result = routeStyle(sku);
    return { ...sku, ...result };
  });
}

// ============ CLI ============

if (require.main === module) {
  // 读 image-generation-tasks.json
  const fs = require('fs');
  const path = require('path');
  const tasksPath = path.join(__dirname, '..', 'image-generation-tasks.json');

  if (!fs.existsSync(tasksPath)) {
    console.error('image-generation-tasks.json not found');
    process.exit(1);
  }

  const tasksJson = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));

  // 演示：从 tasks 提取 SKU 信息
  console.log('='.repeat(60));
  console.log('Seedream Prompt Router — 4 档 Style 选型');
  console.log('='.repeat(60));

  const sampleSkus = [
    { sku: 'ST-001', category: 'stickers', priceTier: 'low', audience: 'B2C' },
    { sku: 'LB-002', category: 'labels', priceTier: 'mid', audience: 'B2B', specs: { driven: true } },
    { sku: 'BC-003', category: 'cards', priceTier: 'high', audience: 'B2B' },
    { sku: 'PK-004', category: 'packaging', priceTier: 'mid', audience: 'B2C', tags: ['gift'] },
    { sku: 'LF-005', category: 'large-format', priceTier: 'mid', audience: 'B2C', tags: ['event'] },
    { sku: 'DJ-006', category: 'promotional', priceTier: 'mid', audience: 'B2C', tags: ['doujinshi'] },
    { sku: 'SG-007', category: 'signage', priceTier: 'mid', audience: 'B2B' },
    { sku: 'ST-008', category: 'stationery', priceTier: 'low', audience: 'B2C' },
  ];

  sampleSkus.forEach((sku) => {
    const result = routeStyle(sku);
    console.log(`[${sku.sku}] ${sku.category.padEnd(12)} ${sku.priceTier.padEnd(4)} → ${result.style.padEnd(15)} (${result.reason})`);
  });

  console.log('='.repeat(60));
  console.log('说明：实际批量处理需要把 SKU 数据接入（从 products.ts）');
}

module.exports = {
  routeStyle,
  routeByCategory,
  batchRoute,
  CATEGORY_DEFAULT,
  STYLE_RULES,
};
