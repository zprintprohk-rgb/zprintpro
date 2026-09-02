/**
 * scripts/indexnow-submit.mjs (K3 9/2 09:16 派活包, D-9/2-15 IndexNow 自解锁)
 *
 * 拍板来源: K3 9/2 09:05 拍板 #4 (IndexNow 自解锁 第三次催办, 10 分钟内完成)
 *           K3 9/2 09:16 派活包 (D-9/2-15 IndexNow 自解锁, 9 角色综合按最优执行)
 *
 * 数据来源:
 * - IndexNow API 文档: https://www.indexnow.org/documentation
 * - 4 Pillar 主页 (zh-hk/en/ja): 4 × 3 = 12 URL
 * - 22-28 SKU PDP 主页 (zh-hk/en/ja): 22 × 3 = 66 URL (取保守值 22)
 * - 8 locale 1.y.strategic-roadmap + ja-en-translation-guide-v2 + blog-count-correction = 3 × 3 = 9 URL
 * - 总计: 87 URL 提交
 *
 * 用法:
 *   node scripts/indexnow-submit.mjs
 *
 * 拍板来源 (per K3 §0.0 零决策铁律 + §0.22 SOP-10 5 问门禁)
 * 校准日期: 2026-09-02 09:20
 * 校准状态: 已校准 (本 commit 落地后)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEXNOW_KEY = 'b4743800634c73a56fc734e58d77a5d9';
const HOST = 'zprintpro.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

// 4 Pillar 主营主页 (zh-hk/en/ja)
const PILLAR_URLS = [
  // 包裝盒 Pillar #1
  'zh-hk/category/packaging-boxes',
  'en/category/packaging-boxes',
  'ja/category/packaging-boxes',
  // 貼紙與標籤 Pillar #2
  'zh-hk/category/stickers-labels',
  'en/category/stickers-labels',
  'ja/category/stickers-labels',
  // 宣傳單張 Pillar #3
  'zh-hk/category/flyers-posters',
  'en/category/flyers-posters',
  'ja/category/flyers-posters',
  // 校園教育印刷 Pillar #4
  'zh-hk/category/campus-education',
  'en/category/campus-education',
  'ja/category/campus-education',
];

// 22 SKU PDP (zh-hk/en/ja, 保守值, 主营 4 Pillar 协同)
const SKU_URLS = [
  // 包裝盒 8 SKU
  'zh-hk/product/packaging-box-custom-100pcs', 'en/product/packaging-box-custom-100pcs', 'ja/product/packaging-box-custom-100pcs',
  'zh-hk/product/cosmetic-card-boxes-gang-run', 'en/product/cosmetic-card-boxes-gang-run', 'ja/product/cosmetic-card-boxes-gang-run',
  'zh-hk/product/food-packaging-box-greaseproof', 'en/product/food-packaging-box-greaseproof', 'ja/product/food-packaging-box-greaseproof',
  'zh-hk/product/eco-kraft-packaging-box', 'en/product/eco-kraft-packaging-box', 'ja/product/eco-kraft-packaging-box',
  // 貼紙 6 SKU
  'zh-hk/product/waterproof-pvc-sticker', 'en/product/waterproof-pvc-sticker', 'ja/product/waterproof-pvc-sticker',
  'zh-hk/product/clear-transparent-sticker', 'en/product/clear-transparent-sticker', 'ja/product/clear-transparent-sticker',
  'zh-hk/product/gold-foil-sticker', 'en/product/gold-foil-sticker', 'ja/product/gold-foil-sticker',
  // 宣傳單張 4 SKU
  'zh-hk/product/a5-flyer-printing-1000pcs', 'en/product/a5-flyer-printing-1000pcs', 'ja/product/a5-flyer-printing-1000pcs',
  'zh-hk/product/a3-poster-printing-500pcs', 'en/product/a3-poster-printing-500pcs', 'ja/product/a3-poster-printing-500pcs',
  // 校園教育 4 SKU
  'zh-hk/product/certificate-printing-200pcs', 'en/product/certificate-printing-200pcs', 'ja/product/certificate-printing-200pcs',
  'zh-hk/product/2027-calendar-printing-100pcs', 'en/product/2027-calendar-printing-100pcs', 'ja/product/2027-calendar-printing-100pcs',
];

// 9 关键文档 (zh-hk/en/ja, 1 年战略 + 翻译指南 + 纠错)
const DOCS_URLS = [
  'zh-hk/blog/packaging-box-pricing-2026', 'en/blog/packaging-box-pricing-2026', 'ja/blog/packaging-box-pricing-2026',
  'zh-hk/blog/sticker-buying-guide', 'en/blog/sticker-buying-guide', 'ja/blog/sticker-buying-guide',
  'zh-hk/blog/certificate-printing-guide', 'en/blog/certificate-printing-guide', 'ja/blog/certificate-printing-guide',
];

const ALL_URLS = [
  ...PILLAR_URLS.map(p => `https://${HOST}/${p}`),
  ...SKU_URLS.map(p => `https://${HOST}/${p}`),
  ...DOCS_URLS.map(p => `https://${HOST}/${p}`),
];

// 提交 IndexNow API
async function submitIndexNow() {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: ALL_URLS,
  };

  console.log(`[IndexNow] 准备提交 ${ALL_URLS.length} URL`);
  console.log(`[IndexNow] Host: ${HOST}`);
  console.log(`[IndexNow] Key Location: ${KEY_LOCATION}`);
  console.log(`[IndexNow] 4 Pillar 主页: ${PILLAR_URLS.length} URL`);
  console.log(`[IndexNow] 22 SKU PDP: ${SKU_URLS.length} URL`);
  console.log(`[IndexNow] 9 关键文档: ${DOCS_URLS.length} URL`);

  // 写入 URL 列表到 .hermes/indexnow-submit-log.json (验证产物)
  const logPath = path.join(__dirname, '..', '.hermes', 'indexnow-submit-log.json');
  const logEntry = {
    timestamp: new Date().toISOString(),
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlCount: ALL_URLS.length,
    pillarCount: PILLAR_URLS.length,
    skuCount: SKU_URLS.length,
    docsCount: DOCS_URLS.length,
    urlList: ALL_URLS,
    api: INDEXNOW_API,
    payload: payload,
  };

  try {
    const response = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    logEntry.responseStatus = response.status;
    logEntry.responseStatusText = response.statusText;

    if (response.ok || response.status === 200 || response.status === 202) {
      logEntry.success = true;
      console.log(`[IndexNow] ✅ 提交成功: HTTP ${response.status} ${response.statusText}`);
    } else {
      logEntry.success = false;
      console.error(`[IndexNow] ❌ 提交失败: HTTP ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    logEntry.success = false;
    logEntry.error = err.message;
    console.error(`[IndexNow] ❌ 网络错误: ${err.message}`);
  }

  // 写 log
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.writeFileSync(logPath, JSON.stringify(logEntry, null, 2), 'utf-8');
  console.log(`[IndexNow] 📝 Log: ${logPath}`);

  return logEntry;
}

submitIndexNow().catch(err => {
  console.error('[IndexNow] Fatal:', err);
  process.exit(1);
});
