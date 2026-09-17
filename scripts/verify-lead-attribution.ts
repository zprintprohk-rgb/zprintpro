/**
 * Lane O 归因逻辑验证 (v10 P0-3, K3 2026-09-17)
 *
 * 用法: npx tsx scripts/verify-lead-attribution.ts
 *
 * 覆盖:
 *   1. parseUtmParams —— UTM 四件套解析 (含异常 URL)
 *   2. resolveLeadSource —— utm_source → 车道归一化 (对齐 010 CHECK 值域)
 *   3. getAttribution —— URL 捕获 / localStorage 持久化 / last-touch 覆盖 / 30 天 TTL
 *   4. isMissingLeadColumnError —— 010 未应用时的降级识别 (PGRST204)
 *
 * 为什么必须有此脚本: 归因错了不会报错, 只会静默把 Lane O 询盘算成 organic
 * → 车道 ROI 系统性低估, 且无人察觉。故用可重跑的断言锁住行为。
 */

import {
  parseUtmParams,
  resolveLeadSource,
  getAttribution,
  isMissingLeadColumnError,
  markLeadColumnMissing,
  isLeadColumnKnownMissing,
  type LeadSource,
} from '../src/lib/attribution';

// ---------- 断言框架 ----------
let pass = 0;
let fail = 0;

function eq<T>(actual: T, expected: T, label: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    pass++;
    console.log(`  ✅ ${label}`);
  } else {
    fail++;
    console.log(`  ❌ ${label}\n     expected: ${e}\n     actual:   ${a}`);
  }
}

function ok(cond: boolean, label: string): void {
  eq(!!cond, true, label);
}

// ---------- 浏览器环境 mock ----------
class MemStorage {
  private m = new Map<string, string>();
  getItem(k: string): string | null {
    return this.m.has(k) ? (this.m.get(k) as string) : null;
  }
  setItem(k: string, v: string): void {
    this.m.set(k, v);
  }
  removeItem(k: string): void {
    this.m.delete(k);
  }
  clear(): void {
    this.m.clear();
  }
  /** 测试用: 直接读取原始值 */
  raw(): Map<string, string> {
    return this.m;
  }
}

let storage = new MemStorage();

function installBrowser(href: string): void {
  // localStorage 用 getter 动态绑定当前 storage —— 否则换 storage 后 window 仍指向旧对象,
  // 会让"脏数据/TTL"类用例假通过 (第一版就踩了这个坑)
  (globalThis as unknown as { window: unknown }).window = {
    location: { href },
    get localStorage() {
      return storage;
    },
  };
}

function uninstallBrowser(): void {
  delete (globalThis as unknown as { window?: unknown }).window;
}

// ============================================================
console.log('\n=== 1. parseUtmParams ===');
// ============================================================
{
  const r = parseUtmParams(
    'https://zprintpro.com/zh-hk/quote/?utm_source=reddit&utm_medium=outreach&utm_campaign=lane-o-sticker&utm_content=L-00042'
  );
  eq(r.source, 'reddit', 'utm_source 解析');
  eq(r.medium, 'outreach', 'utm_medium 解析');
  eq(r.campaign, 'lane-o-sticker', 'utm_campaign 解析');
  eq(r.content, 'L-00042', 'utm_content 解析 (lead_id)');

  const none = parseUtmParams('https://zprintpro.com/zh-hk/quote/');
  eq(none, { source: null, medium: null, campaign: null, content: null }, '无 UTM → 全 null');

  const bad = parseUtmParams('not a url');
  eq(bad, { source: null, medium: null, campaign: null, content: null }, '非法 URL → 全 null (不抛)');
}

// ============================================================
console.log('\n=== 2. resolveLeadSource (对齐 010 CHECK 值域) ===');
// ============================================================
{
  const cases: Array<[string | null, LeadSource]> = [
    ['reddit', 'reddit'],
    ['linkedin', 'linkedin'],
    ['linked-in', 'linkedin'],
    ['lnkd', 'linkedin'],
    ['quora', 'quora'],
    ['email', 'email'],
    ['mail', 'email'],
    ['newsletter', 'email'],
    ['wa', 'wa'],
    ['whatsapp', 'wa'],
    ['whats-app', 'wa'],
    ['REDDIT', 'reddit'],          // 大写
    ['  reddit  ', 'reddit'],      // 空白
    ['google', 'organic'],         // 非 outbound → organic
    ['cpc', 'organic'],
    ['', 'organic'],
    [null, 'organic'],
    [undefined, 'organic'],
  ];
  for (const [input, expected] of cases) {
    eq(resolveLeadSource(input), expected, `resolveLeadSource(${JSON.stringify(input)}) → ${expected}`);
  }
  // 值域封闭性: 任何输入都不得产出值域外的值
  const domain = ['reddit', 'linkedin', 'quora', 'email', 'wa', 'organic'];
  const probes = ['', 'x', 'REDDIT', 'google', 'bing', 'twitter', 'fb', 'tiktok', 'L-00042'];
  ok(
    probes.every((p) => domain.includes(resolveLeadSource(p))),
    '值域封闭性: 任意输入都落在 6 值域内'
  );
}

// ============================================================
console.log('\n=== 3. getAttribution (URL 捕获 / 持久化 / last-touch / TTL) ===');
// ============================================================
{
  // 3.0 SSR 守卫
  uninstallBrowser();
  eq(getAttribution().leadSource, 'organic', 'SSR (无 window) → organic 兜底, 不抛');

  // 3.1 URL 带 UTM → 捕获 + 落盘
  storage = new MemStorage();
  installBrowser(
    'https://zprintpro.com/zh-hk/quote/?utm_source=reddit&utm_medium=outreach&utm_campaign=lane-o-sticker&utm_content=L-00042'
  );
  const a1 = getAttribution();
  eq(a1.utmSource, 'reddit', 'URL 捕获 utm_source');
  eq(a1.leadSource, 'reddit', 'URL 捕获 → 车道 reddit');
  eq(a1.leadId, 'L-00042', 'URL 捕获 → leadId');
  eq(a1.utmContent, 'L-00042', 'utmContent 与 leadId 同值');
  ok(storage.raw().size === 1, 'URL 带 UTM → 已落 localStorage');

  // 3.2 站内跳页 (URL 无 UTM) → localStorage 兜底, 归因不丢 (核心回归点)
  installBrowser('https://zprintpro.com/zh-hk/product/stickers/');
  const a2 = getAttribution();
  eq(a2.leadSource, 'reddit', '★ 跳页后归因不丢 (localStorage 兜底)');
  eq(a2.leadId, 'L-00042', '★ 跳页后 lead_id 不丢');

  // 3.3 新触达 (last-touch) → 覆盖旧值
  installBrowser(
    'https://zprintpro.com/en/quote/?utm_source=linkedin&utm_medium=outreach&utm_campaign=lane-o-label&utm_content=L-00077'
  );
  const a3 = getAttribution();
  eq(a3.leadSource, 'linkedin', 'last-touch: 新触达覆盖旧车道');
  eq(a3.leadId, 'L-00077', 'last-touch: lead_id 更新');
  installBrowser('https://zprintpro.com/en/quote/');
  eq(getAttribution().leadSource, 'linkedin', 'last-touch 已持久化 (跳页仍为 linkedin)');

  // 3.4 30 天 TTL 过期 → 归因作废
  storage = new MemStorage();
  const expired = {
    utmSource: 'quora',
    utmMedium: 'outreach',
    utmCampaign: 'lane-o-label',
    utmContent: 'L-00100',
    landingUrl: 'https://zprintpro.com/zh-hk/quote/?utm_source=quora',
    capturedAt: Date.now() - 31 * 24 * 60 * 60 * 1000,
  };
  storage.setItem('zp_lane_o_attribution', JSON.stringify(expired));
  installBrowser('https://zprintpro.com/zh-hk/quote/');
  const a4 = getAttribution();
  eq(a4.leadSource, 'organic', '★ 超 30 天窗口 → 归因作废 (organic)');
  eq(storage.getItem('zp_lane_o_attribution'), null, '过期记录已清除');

  // 3.5 窗口内 (29 天) → 仍有效
  storage = new MemStorage();
  storage.setItem(
    'zp_lane_o_attribution',
    JSON.stringify({ ...expired, capturedAt: Date.now() - 29 * 24 * 60 * 60 * 1000 })
  );
  eq(getAttribution().leadSource, 'quora', '29 天 (窗口内) → 归因仍有效');

  // 3.6 脏数据 → 不抛, 退 organic
  storage = new MemStorage();
  storage.setItem('zp_lane_o_attribution', '{not json');
  eq(getAttribution().leadSource, 'organic', '脏 JSON → organic (不抛)');
  storage = new MemStorage();
  storage.setItem('zp_lane_o_attribution', JSON.stringify({ utmSource: '' }));
  eq(getAttribution().leadSource, 'organic', '空 utmSource 记录 → organic');
}

// ============================================================
console.log('\n=== 4. isMissingLeadColumnError (010 未应用降级识别) ===');
// ============================================================
{
  const shouldMatch = [
    "PGRST204: Could not find the 'lead_source' column of 'quote_requests' in the schema cache",
    "Could not find the 'utm_content' column of 'quote_requests' in the schema cache",
    "Could not find the 'lead_id' column of 'tracking_events' in the schema cache",
    'column "lead_source" of relation "quote_requests" does not exist',
  ];
  for (const m of shouldMatch) ok(isMissingLeadColumnError(m), `识别降级信号: ${m.slice(0, 45)}…`);

  const shouldNotMatch = [
    undefined,
    null,
    '',
    'duplicate key value violates unique constraint',
    'permission denied for table quote_requests',   // RLS 问题 ≠ 列缺失, 不可误判降级
    'invalid input syntax for type integer',
  ];
  for (const m of shouldNotMatch) ok(!isMissingLeadColumnError(m), `不误判: ${String(m).slice(0, 45) || '(空)'}`);

  // 4.2 会话级降级标记
  storage = new MemStorage();
  installBrowser('https://zprintpro.com/zh-hk/quote/');
  eq(isLeadColumnKnownMissing(), false, '初始: 无缺失标记');
  markLeadColumnMissing();
  eq(isLeadColumnKnownMissing(), true, '打标记后: 已知缺失 (事件层将降级)');
  uninstallBrowser();
  eq(isLeadColumnKnownMissing(), false, 'SSR: 标记读取不抛, 返回 false');
}

// ---------- 汇总 ----------
uninstallBrowser();
console.log(`\n${'='.repeat(56)}`);
console.log(`结果: ✅ ${pass} pass | ❌ ${fail} fail`);
if (fail > 0) {
  console.log('VERDICT: FAIL —— 归因逻辑有回归, 修好再提交');
  process.exit(1);
}
console.log('VERDICT: PASS —— Lane O 归因逻辑 (捕获/持久化/车道映射/降级) 全部符合预期');
process.exit(0);
