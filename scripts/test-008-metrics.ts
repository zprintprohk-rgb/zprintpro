#!/usr/bin/env node
/**
 * 008 度量层测试脚本 (K3 8/26 必跑, 截图回传)
 * 2026-08-25 P1 #6 落
 * 4 事件测试: form_submit / whatsapp_click / tel_click / mailto_click
 *
 * 用法:
 *   node scripts/test-008-metrics.ts
 *
 * 撞墙 = 0 部分: env 未配置时本地 console.log
 * 撞墙 = K3 key: K3 给 key 后激活 Supabase 上报
 */

import { trackEvent, metrics008Status } from '../src/lib/metrics-008';

async function main() {
  console.log('=== 008 度量层测试 ===');
  console.log('状态:', JSON.stringify(metrics008Status, null, 2));
  console.log();

  const testPage = '/test-008-metrics';
  const testLocale = 'zh-hk';

  console.log('--- 4 事件测试 ---');

  // 1. form_submit
  await trackEvent({
    type: 'form_submit',
    locale: testLocale,
    page: testPage,
    metadata: { form_type: 'quote', test: true },
  });
  console.log('✅ form_submit');

  // 2. whatsapp_click
  await trackEvent({
    type: 'whatsapp_click',
    locale: testLocale,
    page: testPage,
    metadata: { phone: '+86 198 8085 1334', test: true },
  });
  console.log('✅ whatsapp_click');

  // 3. tel_click
  await trackEvent({
    type: 'tel_click',
    locale: testLocale,
    page: testPage,
    metadata: { phone: '+86 198 8085 1334', test: true },
  });
  console.log('✅ tel_click');

  // 4. mailto_click
  await trackEvent({
    type: 'mailto_click',
    locale: testLocale,
    page: testPage,
    metadata: { email: 'zprintpro@outlook.com', test: true },
  });
  console.log('✅ mailto_click');

  console.log();
  console.log('=== 测试完成 ===');
  console.log('撞墙 = K3 8/26 给 Supabase key 后, 4 事件自动上报 zprintpro_008_events 表');
  console.log('撞墙升级: K3 8/26 09:00 拍板 R0 5 项, M3 8/26 14:00 后接线 + 4 事件测试 + 截图回传');
}

main().catch(console.error);
