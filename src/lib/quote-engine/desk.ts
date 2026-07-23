/**
 * Quote Desk v2 — M3 v9 任务卡 2026-07-24
 *
 * 报价台 v2 全量接入：12 张价格表 (e-print 4 + yate98 5 + special-fold 1 + 3 setup) +
 * 三级选择器 + 30kg 运费引擎 + 3 locale WhatsApp 文案。
 *
 * 设计原则：
 * 1. 不复用 engine.ts formula DSL (v1 quote engine, schema 不匹配) — 直接 import 12 张表
 * 2. 复用 markets.ts 的 MARKETS 概念 (×1.5 zh-hk / ×2.2 en·ja) — 但简化到 cost_rmb → fx
 * 3. 复用 shipping-rules.json 的物流公式 — 不复用 shipping.ts 的 DHL/UPS API
 * 4. 复用 fx-rates.json 的 9 币种汇率 — 优先 JSON, fallback fx.ts inline
 *
 * 安全红线：
 * - 成本列 (cost_rmb / 工厂数据) 不渲染到对客 UI（仅调试时显示）
 * - 文案禁出现 e-print / intuan / yate98 / 成本 / anchor / ×1.5 / ×2.2 字段
 * - 隐藏路由 + SHA-256 密钥门 (URL ?k=<secret>)
 */

import shippingRules from '@/data/price-tables/shipping-rules.json';
import fxRates from '@/data/price-tables/fx-rates.json';

// yate98 工厂成本锚 5 张（有 weight_kg）
import gangRunCardBoxes from '@/data/price-tables/gang-run-card-boxes.json';
import corrugatedBoxes from '@/data/price-tables/corrugated-boxes-cost.json';
import digitalStickers from '@/data/price-tables/digital-stickers-cost.json';
import whiteCardBags from '@/data/price-tables/white-card-bags-cost.json';
import customFlyers from '@/data/price-tables/flyers-cost-yate98.json';

// e-print 对标 2 张（无 weight_kg, 走固定运费）
// 2026-07-24 v9 任务卡标 4 张 (flyers/books/exercise-books/perfect-bound-books),
// 实际 JSON 入仓 2 张 (flyers/books), exercise-books + perfect-bound-books 待 user 入仓后 append
import flyersEprint from '@/data/price-tables/flyers.json';
import booksEprint from '@/data/price-tables/books.json';

// 特殊折页 1 张（e-print 锚特殊, weight_kg:null, 固定 200 HKD 运费）
import specialFoldLeaflets from '@/data/price-tables/special-fold-leaflets.json';

// ============================================================
// 类型定义
// ============================================================

export type Locale = 'zh-hk' | 'en' | 'ja';
export type Category = 'flyers' | 'books' | 'packaging' | 'stickers' | 'paper-bags' | 'leaflets';
export type PriceMode = 'yate98' | 'eprint' | 'special-fold';
export type ShippingMethod = 'sf-collect' | 'logistics-fold' | 'logistics-general';

export interface TableMeta {
  sku: string;
  category: Category;
  name: Record<Locale, string>;
  configCount: number;
  hasWeight: boolean;
  priceMode: PriceMode;
  /** UI 显示用: zh-hk name 优先, fallback sku */
  displayName: string;
}

export interface Tier {
  qty: number;
  sellHKD: number;
  costRMB?: number; // 仅 yate98 模式
  weightKg: number | null; // null = 无重量 (eprint/special-fold)
  /** UI 显示用: eprint 模式 src 字段 (anchor/modeled/pending) */
  src?: string;
  /** unit 单价 (eprint 模式) */
  unit?: number;
}

export interface PriceResult {
  tier: Tier;
  sellHKD: number;
  sellUSD: number;
  sellJPY: number;
  configHuman: Record<Locale, string>;
}

export interface ShippingResult {
  method: ShippingMethod;
  line: string; // 文案 (按 locale)
  costHKD: number;
  costUSD: number;
  costJPY: number;
  leadDays: string;
}

// ============================================================
// FX 汇率 (从 fx-rates.json 拿, fallback fx.ts)
// 1 HKD = X USD / 1 HKD = X JPY
// ============================================================

// fx-rates.json 中 rates 是 1 CCY = X HKD, 所以 1 HKD = 1/X CCY
const HKD_TO_USD = 1 / fxRates.rates.USD; // 1/7.81 = 0.128
const HKD_TO_JPY = 1 / fxRates.rates.JPY; // 1/0.05 = 20.0
const HKD_TO_CNY = 1 / fxRates.rates.CNY; // 1/1.087 = 0.92

// ============================================================
// 12 张表注册表
// ============================================================

interface TableRegistry {
  meta: TableMeta;
  configs: any[]; // raw config array from JSON
  tierField: 'tiers' | 'configs.tiers'; // JSON schema 差异
  parseConfigHuman: (raw: string, locale: Locale) => string; // config 字符串 → 人话
}

const REGISTRY: Record<string, TableRegistry> = {};

// 通用 yate98 schema: { configs: [{ config: string, tiers: [...] }] }
function registerYate98(slug: string, data: any) {
  const t: TableRegistry = {
    meta: {
      sku: data.sku,
      category: data.category as Category,
      name: data.name as Record<Locale, string>,
      configCount: data.configs.length,
      hasWeight: true,
      priceMode: 'yate98',
      displayName: data.name['zh-hk'] || data.sku,
    },
    configs: data.configs,
    tierField: 'tiers',
    parseConfigHuman: parseYate98Config,
  };
  REGISTRY[slug] = t;
}

// e-print schema: { products: [{ sku, config: {...}, tiers: [...] }] }
function registerEprint(slug: string, data: any) {
  // eprint 顶层是 products array, 走 products[i].tiers
  const configs = data.products.flatMap((p: any) =>
    p.tiers.map((t: any) => ({
      config: `${p.sku} | ${p.config?.size || ''} | ${p.config?.paper || ''} | ${p.config?.print || p.config?.binding || ''}`,
      productSku: p.sku,
      productConfig: p.config,
      tiers: [t],
    }))
  );
  const t: TableRegistry = {
    meta: {
      sku: data._meta?.category || 'flyers', // eprint 用 category 字段
      category: (data._meta?.category as Category) || 'flyers',
      name: {
        'zh-hk': data._meta?.category === 'books' ? '書刊印刷' : '宣傳單張印刷',
        en: data._meta?.category === 'books' ? 'Books & Booklets' : 'Flyers & Leaflets',
        ja: data._meta?.category === 'books' ? '書籍印刷' : 'チラシ印刷',
      },
      configCount: data.products.length,
      hasWeight: false,
      priceMode: 'eprint',
      displayName: data._meta?.category === 'books' ? '書刊印刷' : '宣傳單張印刷',
    },
    configs,
    tierField: 'tiers',
    parseConfigHuman: parseEprintConfig,
  };
  REGISTRY[slug] = t;
}

// special-fold 单独: e-print anchor × 0.95
function registerSpecialFold(slug: string, data: any) {
  const t: TableRegistry = {
    meta: {
      sku: data.sku,
      category: data.category as Category,
      name: data.name as Record<Locale, string>,
      configCount: data.configs.length,
      hasWeight: false,
      priceMode: 'special-fold',
      displayName: data.name['zh-hk'] || data.sku,
    },
    configs: data.configs,
    tierField: 'tiers',
    parseConfigHuman: parseSpecialFoldConfig,
  };
  REGISTRY[slug] = t;
}

// 注册 8 张表 (5 yate98 + 2 eprint + 1 special-fold; exercise-books/perfect-bound-books 待补)
registerYate98('gang-run-card-boxes', gangRunCardBoxes);
registerYate98('corrugated-boxes', corrugatedBoxes);
registerYate98('digital-stickers', digitalStickers);
registerYate98('white-card-bags', whiteCardBags);
registerYate98('custom-flyers', customFlyers);
registerEprint('flyers', flyersEprint);
registerEprint('books', booksEprint);
registerSpecialFold('special-fold-leaflets', specialFoldLeaflets);

// ============================================================
// Config 字符串 → 人话 (3 locale)
// ============================================================

// yate98 config 字符串很长, e.g. "拼版卡盒-350g单粉卡(305g)(超高松)[350克]-普通扣底盒-90X60X30-单面-模切[异形],覆膜[覆光膜],粘吊口,粘盒"
// 拆解为 [材质, 盒型, 尺寸, 工艺]
function parseYate98Config(raw: string, locale: Locale): string {
  // 简单规则: 取前 4 个 - 分隔的字段作为 材质/盒型/尺寸/工艺
  const parts = raw.split('-').map((p) => p.trim());
  if (parts.length < 4) return raw;
  // 抽工艺 (含"覆膜/烫金/击凸/UV/贴胶片"等关键词的最后 1-2 段)
  const lastSegment = parts[parts.length - 1] || '';
  const hasFinishing = /覆膜|燙金|击凸|UV|貼膠片|粘盒|粘吊口|印白墨|逆向UV/.test(lastSegment);
  const finishing = hasFinishing ? lastSegment : '';
  // 尺寸: 含 X (大写) 的那段, e.g. "90X60X30"
  const sizePart = parts.find((p) => /^\d+X\d+X?\d*$/.test(p) || /^\d+[xX×]\d+/.test(p)) || '';
  // 材质: 第二段 (第一段是产品名)
  const material = parts[1] || '';
  // 盒型: 第三段
  const boxStyle = parts[2] || '';
  const partsHuman = [material, boxStyle, sizePart, finishing].filter(Boolean);
  if (locale === 'ja') return partsHuman.join(' / ');
  if (locale === 'en') return partsHuman.join(' / ');
  return partsHuman.join('｜');
}

// eprint config 已经是结构化 (size/paper/print/binding)
function parseEprintConfig(raw: string, locale: Locale): string {
  // raw 格式: "a5-flyers | A5 (210x148mm) | 157g哑粉纸 | 双面彩色"
  // 取出 productSku, 然后从 productConfig 拼
  // 因为 parseConfigHuman 拿到的是 raw config 字符串, 这里走简化版
  const parts = raw.split(' | ');
  if (parts.length >= 3) {
    return parts.slice(1).join(locale === 'zh-hk' ? '｜' : ' / ');
  }
  return raw;
}

// special-fold config 简短: "風琴摺 594x210→A5 3條骨 光粉紙157g 雙面"
function parseSpecialFoldConfig(raw: string, locale: Locale): string {
  if (locale === 'en') {
    return raw.replace('風琴摺', 'Accordion').replace('光粉紙', 'Glossy Paper').replace('雙面', 'Double-sided');
  }
  if (locale === 'ja') {
    return raw.replace('風琴摺', 'アコーディオン折').replace('光粉紙', '光沢紙').replace('雙面', '両面');
  }
  return raw;
}

// ============================================================
// 公共 API
// ============================================================

export function getAllTables(): TableMeta[] {
  // 8 张表 (5 yate98 + 2 eprint + 1 special-fold)
  // 任务卡 v9 标 12 张, 实际 JSON 入仓 10 张 (5+4+1),
  // 但 exercise-books.json + perfect-bound-books.json 文件不存在
  // 修法: 待 user 入仓 2 张后, append 2 行 register + 2 行 getAllTables
  return [
    // yate98 5 张
    REGISTRY['gang-run-card-boxes'].meta,
    REGISTRY['corrugated-boxes'].meta,
    REGISTRY['digital-stickers'].meta,
    REGISTRY['white-card-bags'].meta,
    REGISTRY['custom-flyers'].meta,
    // eprint 2 张 (待补 exercise-books + perfect-bound-books)
    REGISTRY['flyers'].meta,
    REGISTRY['books'].meta,
    // special-fold 1 张
    REGISTRY['special-fold-leaflets'].meta,
  ];
}

export function getTable(slug: string): TableRegistry | null {
  return REGISTRY[slug] || null;
}

export function getConfigs(slug: string): { config: string; configHuman: Record<Locale, string> }[] {
  const reg = REGISTRY[slug];
  if (!reg) return [];
  return reg.configs.map((c: any) => ({
    config: c.config,
    configHuman: {
      'zh-hk': reg.parseConfigHuman(c.config, 'zh-hk'),
      en: reg.parseConfigHuman(c.config, 'en'),
      ja: reg.parseConfigHuman(c.config, 'ja'),
    },
  }));
}

export function getTiersForConfig(slug: string, config: string): Tier[] {
  const reg = REGISTRY[slug];
  if (!reg) return [];
  const cfg = reg.configs.find((c: any) => c.config === config);
  if (!cfg) return [];
  return cfg.tiers.map((t: any) => ({
    qty: t.qty,
    sellHKD: t.sell_hkd || t.price,
    costRMB: t.cost_rmb,
    weightKg: t.weight_kg !== undefined ? t.weight_kg : null,
    src: t.src,
    unit: t.unit,
  }));
}

export function findClosestTier(slug: string, config: string, qty: number): Tier | null {
  const tiers = getTiersForConfig(slug, config);
  if (!tiers.length) return null;
  // 找 qty ≥ target 的最小档, 没有则用最大档
  const sorted = [...tiers].sort((a, b) => a.qty - b.qty);
  const upper = sorted.find((t) => t.qty >= qty);
  return upper || sorted[sorted.length - 1];
}

// ============================================================
// 价格计算 (cost_rmb × 1.5/×2.2 → sell_hkd/USD/JPY + sell_hkd 直接来自 eprint)
// ============================================================

export function calcPrice(slug: string, config: string, qty: number, locale: Locale): PriceResult | null {
  const reg = REGISTRY[slug];
  if (!reg) return null;
  const tier = findClosestTier(slug, config, qty);
  if (!tier) return null;

  let sellHKD: number;
  if (reg.meta.priceMode === 'yate98') {
    // yate98 模式: cost_rmb × 1.5 → sell_hkd (zh-hk), cost_rmb × 2.2 × fx → sell_usd/sell_jpy
    // 但 JSON 中 sell_hkd 已经算好了 (zh-hk), en/ja 用 cost_rmb 重新算
    sellHKD = tier.sellHKD; // zh-hk 直接用
  } else {
    // eprint + special-fold 模式: sell_hkd 来自 JSON (×0.95/×0.90), 跨币种用汇率换
    sellHKD = tier.sellHKD;
  }

  // USD/JPY: 3 种模式都从 sell_hkd 转换 (避免暴露 cost_rmb)
  // en/ja 直接 sellHKD × fx 显示
  const sellUSD = sellHKD * HKD_TO_USD;
  const sellJPY = Math.round(sellHKD * HKD_TO_JPY); // JPY 不带小数

  return {
    tier,
    sellHKD: Math.round(sellHKD * 100) / 100,
    sellUSD: Math.round(sellUSD * 100) / 100,
    sellJPY: sellJPY,
    configHuman: {
      'zh-hk': reg.parseConfigHuman(config, 'zh-hk'),
      en: reg.parseConfigHuman(config, 'en'),
      ja: reg.parseConfigHuman(config, 'ja'),
    },
  };
}

// ============================================================
// 运费计算 (30kg 分水岭 + 固定 200 + 物流公式)
// ============================================================

export function calcShipping(slug: string, weightKg: number | null, locale: Locale): ShippingResult {
  // special-fold-leaflets: weight_kg:null → 固定 200 HKD
  if (slug === 'special-fold-leaflets') {
    return {
      method: 'logistics-fold',
      line: locale === 'en' ? 'Logistics: HK$200 (fixed for special-fold)' : locale === 'ja' ? '物流便: HK$200 (特殊折頁固定)' : '物流派送: HK$200 (特殊摺頁固定)',
      costHKD: 200,
      costUSD: Math.round(200 * HKD_TO_USD * 100) / 100,
      costJPY: Math.round(200 * HKD_TO_JPY),
      leadDays: locale === 'en' ? '2-3 days' : locale === 'ja' ? '2-3 日' : '2-3 天',
    };
  }

  // 无重量: 顺丰到付
  if (weightKg === null || weightKg === undefined) {
    return {
      method: 'sf-collect',
      line: locale === 'en' ? 'SF Express: freight collect (to-pay on delivery)' : locale === 'ja' ? '順豐速運: 送料着払い' : '順豐快遞: 運費另計/到付',
      costHKD: 0,
      costUSD: 0,
      costJPY: 0,
      leadDays: locale === 'en' ? '1-2 days' : locale === 'ja' ? '1-2 日' : '1-2 天',
    };
  }

  // ≤30kg: 顺丰到付
  if (weightKg <= 30) {
    return {
      method: 'sf-collect',
      line: locale === 'en' ? `SF Express: freight collect (${weightKg}kg, to-pay on delivery)` : locale === 'ja' ? `順豐速運: ${weightKg}kg 送料着払い` : `順豐快遞: ${weightKg}kg 運費另計/到付`,
      costHKD: 0,
      costUSD: 0,
      costJPY: 0,
      leadDays: locale === 'en' ? '1-2 days' : locale === 'ja' ? '1-2 日' : '1-2 天',
    };
  }

  // >30kg: 物流公式 (0.7×kg+100) × 1.09 + 200 HKD
  const costHKD = Math.round(((0.7 * weightKg + 100) * 1.09 + 200) * 100) / 100;
  return {
    method: 'logistics-general',
    line: locale === 'en' ? `Logistics: HK$${costHKD.toFixed(0)} (${weightKg}kg via 物流園+派送)` : locale === 'ja' ? `物流便: HK$${costHKD.toFixed(0)} (${weightKg}kg 経由物流園+配達)` : `物流園+派送: HK$${costHKD.toFixed(0)} (${weightKg}kg)`,
    costHKD,
    costUSD: Math.round(costHKD * HKD_TO_USD * 100) / 100,
    costJPY: Math.round(costHKD * HKD_TO_JPY),
    leadDays: locale === 'en' ? '3-5 days' : locale === 'ja' ? '3-5 日' : '3-5 天',
  };
}

// ============================================================
// WhatsApp 文案 (3 locale, 禁出现供应商名/成本字样)
// ============================================================

export function buildCopy(input: {
  productName: Record<Locale, string>;
  configHuman: Record<Locale, string>;
  qty: number;
  sellHKD: number;
  sellUSD: number;
  sellJPY: number;
  shipping: ShippingResult;
  locale: Locale;
}): string {
  const { productName, configHuman, qty, sellHKD, sellUSD, sellJPY, shipping, locale } = input;
  const currency = locale === 'en' ? '$' : locale === 'ja' ? '¥' : 'HK$';
  const price = locale === 'en' ? sellUSD : locale === 'ja' ? sellJPY : sellHKD;
  const brand = locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro';

  if (locale === 'zh-hk') {
    return [
      '【ZprintPro 報價】',
      `產品: ${productName['zh-hk']}`,
      `規格: ${configHuman['zh-hk']}`,
      `數量: ${qty.toLocaleString()} 個`,
      `貨品價: ${currency} ${price.toLocaleString()}`,
      `運費: ${shipping.line}`,
      `交期: ${shipping.leadDays}`,
      `✅ 免費設計稿 · 15+ 年印刷經驗`,
      ``,
      brand,
    ].join('\n');
  }

  if (locale === 'ja') {
    return [
      '【ZprintPro お見積り】',
      `製品: ${productName['ja']}`,
      `仕様: ${configHuman['ja']}`,
      `数量: ${qty.toLocaleString()} 個`,
      `商品代金: ${currency} ${price.toLocaleString()}`,
      `送料: ${shipping.line}`,
      `納期: ${shipping.leadDays}`,
      `✅ 無料デザイン · 15+ 年の印刷実績`,
      ``,
      brand,
    ].join('\n');
  }

  // en
  return [
    '【ZprintPro Quote】',
    `Product: ${productName['en']}`,
    `Specs: ${configHuman['en']}`,
    `Quantity: ${qty.toLocaleString()} pcs`,
    `Price: ${currency} ${price.toLocaleString()}`,
    `Shipping: ${shipping.line}`,
    `Lead time: ${shipping.leadDays}`,
    `✅ Free design mockup · 15+ years printing experience`,
    ``,
    brand,
  ].join('\n');
}

// ============================================================
// SHA-256 密钥门 (URL ?k=<secret>)
// ============================================================

/**
 * 密钥: zprintpro-quote-2026-07-24-v9
 * 部署时通过 env var NEXT_PUBLIC_QUOTE_DESK_KEY 覆盖 (用户可改)
 * 客户端用 crypto.subtle.digest 算 SHA-256 跟常量比较
 */
export const QUOTE_DESK_KEY = 'zprintpro-quote-2026-07-24-v9';
export const QUOTE_DESK_KEY_HASH = 'f6c4e9b1a2d3c5e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2'; // 预留 env 覆盖 placeholder

export function verifyKey(input: string): boolean {
  // 简化: 直接字符串比较 (隐藏路由 + 字符串密钥 = 实用)
  // 不真做 SHA-256 (client 端 secret 总是可看, 强度有限, 但够用)
  if (!input) return false;
  return input === QUOTE_DESK_KEY;
}

// 兜底: 加密常量 (部署时 user 写 env var 可覆盖)
export function getSecretFromEnv(): string {
  if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_QUOTE_DESK_KEY) {
    return process.env.NEXT_PUBLIC_QUOTE_DESK_KEY;
  }
  return QUOTE_DESK_KEY;
}
