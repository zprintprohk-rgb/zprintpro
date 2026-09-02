/**
 * scripts/sku-keyword-gsc-map.mjs (v1, K3 9/2 09:29 派活包 §J-2 SKU 联动)
 *
 * 数据源: GSC数据/2026-08-12-direct/page+query 维度 (4 个 CSV, 1571 行)
 *         + GSC数据/zprintpro.com-Performance-on-Search-总数据 2026-08-17/网页.csv
 *
 * 14 SKU 起步 (per K3 9/2 09:05 拍板 #2): 包裝盒 8 + 贴纸 6, Q4 扩全量
 *
 * 三条联动规则 (per GLM §J-2):
 *   R1 锚文本 = GSC 实证词 (Break the Web 行业标准)
 *   R2 SKU 死端禁令 (SKU PDP 必含 ≥1 cluster 主文内链 + 2-3 SKU 互链)
 *   R3 Silo 权重单向传导 (Pillar → Cluster → SKU, GoElastic 结构)
 *
 * 用法: node scripts/sku-keyword-gsc-map.mjs
 *
 * 落地: 9/5 前 v1 14 SKU 起步, Q4 扩全量 22-28 SKU
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GSC_DATA_DIR = path.join(__dirname, '..', 'GSC数据');
const OUTPUT_PATH = path.join(__dirname, '..', '.hermes', 'sku-keyword-gsc-map.json');

// 14 SKU 起步 (per K3 9/2 09:05 拍板 #2)
// 包裝盒 8 SKU + 贴纸 6 SKU
const SKU_LIST = [
  // 包裝盒 8 SKU
  { sku: 'packaging-box-custom-100pcs', targetKeyword: 'custom packaging boxes', pillar: '包裝盒 (Pillar #1)', locale: 'en', cluster: 'packaging-box-custom-guide' },
  { sku: 'packaging-box-custom-100pcs', targetKeyword: '訂製包裝盒', pillar: '包裝盒 (Pillar #1)', locale: 'zh-hk', cluster: 'packaging-box-custom-guide' },
  { sku: 'packaging-box-custom-100pcs', targetKeyword: 'パッケージ印刷 カスタム', pillar: '包裝盒 (Pillar #1)', locale: 'ja', cluster: 'packaging-box-custom-guide' },
  { sku: 'cosmetic-card-boxes-gang-run', targetKeyword: 'cosmetic packaging boxes wholesale', pillar: '包裝盒 (Pillar #1)', locale: 'en', cluster: 'cosmetics-packaging-box-printing-guide' },
  { sku: 'food-packaging-box-greaseproof', targetKeyword: 'food packaging box FDA', pillar: '包裝盒 (Pillar #1)', locale: 'en', cluster: 'food-packaging-printing-guide' },
  { sku: 'eco-kraft-packaging-box', targetKeyword: 'eco kraft packaging box', pillar: '包裝盒 (Pillar #1)', locale: 'en', cluster: 'eco-printing' },
  { sku: 'magnetic-closure-gift-box-ecommerce', targetKeyword: 'magnetic closure gift box', pillar: '包裝盒 (Pillar #1)', locale: 'en', cluster: 'packaging-box-custom-guide' },
  { sku: 'cross-border-ecommerce-shipping-box', targetKeyword: 'cross border ecommerce shipping box', pillar: '包裝盒 (Pillar #1)', locale: 'en', cluster: 'cross-border-ecommerce-shipping-box-guide' },
  // 贴纸 6 SKU
  { sku: 'waterproof-pvc-sticker', targetKeyword: 'waterproof PVC sticker', pillar: '貼紙與標籤 (Pillar #2)', locale: 'en', cluster: 'sticker-material-pvc-vinyl-removable' },
  { sku: 'waterproof-pvc-sticker', targetKeyword: '防水貼紙', pillar: '貼紙與標籤 (Pillar #2)', locale: 'zh-hk', cluster: 'sticker-material-pvc-vinyl-removable' },
  { sku: 'waterproof-pvc-sticker', targetKeyword: '防水ステッカー', pillar: '貼紙與標籤 (Pillar #2)', locale: 'ja', cluster: 'sticker-material-pvc-vinyl-removable' },
  { sku: 'clear-transparent-sticker', targetKeyword: 'clear transparent sticker', pillar: '貼紙與標籤 (Pillar #2)', locale: 'en', cluster: 'sticker-material-pvc-vinyl-removable' },
  { sku: 'gold-foil-sticker', targetKeyword: 'gold foil sticker', pillar: '貼紙與標籤 (Pillar #2)', locale: 'en', cluster: 'sticker-material-pvc-vinyl-removable' },
  { sku: 'baby-product-label-sticker', targetKeyword: 'FDA food safe label', pillar: '貼紙與標籤 (Pillar #2)', locale: 'en', cluster: 'baby-product-label-sticker-printing-guide' },
];

// 8/12-direct/page_imps_28d.csv 解析
function parsePageImps() {
  const fp = path.join(GSC_DATA_DIR, '2026-08-12-direct', 'page_imps_28d.csv');
  if (!fs.existsSync(fp)) {
    console.log(`[SKU Map] ⚠️  ${fp} 不存在, 跳过 page+query 维度解析`);
    return new Map();
  }
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.strip ? content.strip().split('\n') : content.replace(/\r/g, '').split('\n');
  // 解析 CSV (可能含逗号)
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length >= 4) {
      const page = cols[0].trim().replace(/^"|"$/g, '');
      const query = (cols[1] || '').trim().replace(/^"|"$/g, '');
      const imps = parseInt(cols[2] || '0', 10);
      const clicks = parseInt(cols[3] || '0', 10);
      const pos = parseFloat(cols[4] || '0');
      if (page && query) {
        rows.push({ page, query, imps, clicks, pos });
      }
    }
  }
  console.log(`[SKU Map] 8/12-direct/page_imps_28d.csv 解析: ${rows.length} 行`);
  return rows;
}

// 8/17 总数据/网页.csv 解析
function parse817PageData() {
  const fp = path.join(GSC_DATA_DIR, 'zprintpro.com-Performance-on-Search-总数据 2026-08-17', '网页.csv');
  if (!fs.existsSync(fp)) {
    console.log(`[SKU Map] ⚠️  ${fp} 不存在, 跳过 8/17 page 维度解析`);
    return [];
  }
  try {
    const content = fs.readFileSync(fp, 'utf-8');
    const lines = content.replace(/\r/g, '').split('\n');
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');
      if (cols.length >= 4) {
        const page = cols[0].trim().replace(/^"|"$/g, '');
        const clicks = parseInt(cols[1] || '0', 10);
        const imps = parseInt(cols[2] || '0', 10);
        const ctr = parseFloat(cols[3] || '0');
        const pos = parseFloat(cols[4] || '0');
        if (page) {
          rows.push({ page, clicks, imps, ctr, pos });
        }
      }
    }
    console.log(`[SKU Map] 8/17 总数据/网页.csv 解析: ${rows.length} 行`);
    return rows;
  } catch (e) {
    console.log(`[SKU Map] 8/17 解析失败: ${e.message}`);
    return [];
  }
}

// 主函数
async function buildSkuKeywordGscMap() {
  console.log('[SKU Map] 14 SKU 起步 (per K3 9/2 09:05 拍板 #2 + GLM §J-2)');
  console.log(`[SKU Map] 包裝盒 8 + 贴纸 6 = 14 SKU`);

  const pageImps = parsePageImps();
  const pageData817 = parse817PageData();

  // 匹配 SKU → query
  const map = [];
  for (const skuEntry of SKU_LIST) {
    const skuUrlPattern = new RegExp(`/${skuEntry.locale}/(product|category)/${skuEntry.sku.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');

    // 在 page_imps_28d 中找
    const matchedPage = pageImps.filter(r => skuUrlPattern.test(r.page));
    // 在 8/17 page 中找
    const matchedPage817 = pageData817.filter(r => skuUrlPattern.test(r.page));

    // 取 top query
    const topQueries = matchedPage
      .sort((a, b) => b.imps - a.imps)
      .slice(0, 5)
      .map(q => ({
        query: q.query,
        imps: q.imps,
        clicks: q.clicks,
        pos: q.pos,
        ctr: q.imps > 0 ? (q.clicks / q.imps * 100).toFixed(2) : 0,
      }));

    // 8/17 page 维度 imps 合计
    const imps817Total = matchedPage817.reduce((sum, p) => sum + p.imps, 0);
    const clicks817Total = matchedPage817.reduce((sum, p) => sum + p.clicks, 0);
    const avgPos817 = matchedPage817.length > 0
      ? (matchedPage817.reduce((sum, p) => sum + p.pos, 0) / matchedPage817.length).toFixed(2)
      : 0;

    map.push({
      sku: skuEntry.sku,
      targetKeyword: skuEntry.targetKeyword,
      pillar: skuEntry.pillar,
      locale: skuEntry.locale,
      cluster: skuEntry.cluster,
      gsc817: {
        imps: imps817Total,
        clicks: clicks817Total,
        avgPos: parseFloat(avgPos817),
      },
      gsc812Direct: {
        matchedQueries: topQueries.length,
        topQueries: topQueries,
      },
      evidenceChain: `GSC数据/zprintpro.com-Performance-on-Search-总数据 2026-08-17/网页.csv · ${skuEntry.targetKeyword} · ${imps817Total} imps · pos ${avgPos817} · ${clicks817Total} clicks`,
    });
  }

  const output = {
    schema: 'sku-keyword-gsc-map-v1',
    lastBuild: new Date().toISOString(),
    skuCount: map.length,
    skuBreakdown: {
      '包裝盒 (Pillar #1)': map.filter(m => m.pillar.includes('包裝盒')).length,
      '貼紙與標籤 (Pillar #2)': map.filter(m => m.pillar.includes('貼紙')).length,
    },
    gscSource: {
      index: 'GSC数据/index.json',
      latestFreshData: '2026-08-17',
      stalenessDays: 16,
      freshnessStatus: 'STALE',
      actionRequired: '9/3 15:00 GSC 校准窗口必拉新数据',
    },
    dataSources: {
      pageImps28d: `${GSC_DATA_DIR}/2026-08-12-direct/page_imps_28d.csv (490 行, 8/12-direct)`,
      pageData817: `${GSC_DATA_DIR}/zprintpro.com-Performance-on-Search-总数据 2026-08-17/网页.csv (8/17 总数据)`,
    },
    threeRules: {
      R1: '锚文本 = GSC 实证词 (Break the Web 行业标准, blog Cluster → SKU PDP 内链)',
      R2: 'SKU 死端禁令 (SKU PDP 必含 ≥1 cluster 主文内链 + 2-3 SKU 互链)',
      R3: 'Silo 权重单向传导 (Pillar → Cluster → SKU, GoElastic 结构)',
    },
    kpiTargets: {
      'SKU 词 GSC pos 月度轨迹 (进首页数 / 破 0 click 数)': 'TBD 9/30 月度 cron 首跑',
      '联动完整性 (每 SKU 有主文 / 每 cluster 链 ≥2 SKU / 锚文本实证率 100%)': 'TBD 9/30 月度 cron 首跑',
      '008 询盘归因联动 (SKU 级 query → 询盘归档)': 'TBD 9/30 月度 cron 首跑',
    },
    map: map,
  };

  // 写 sku-keyword-gsc-map.json (SSoT, 验证产物)
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`[SKU Map] ✅ 写入 ${OUTPUT_PATH} (${fs.statSync(OUTPUT_PATH).size} bytes)`);
  console.log(`[SKU Map] 14 SKU 起步: ${output.skuBreakdown['包裝盒 (Pillar #1)']} 包裝盒 + ${output.skuBreakdown['貼紙與標籤 (Pillar #2)']} 贴纸`);

  return output;
}

buildSkuKeywordGscMap().catch(err => {
  console.error('[SKU Map] Fatal:', err);
  process.exit(1);
});
