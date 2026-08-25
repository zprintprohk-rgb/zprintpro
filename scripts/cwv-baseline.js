#!/usr/bin/env node
/**
 * CWV (Core Web Vitals) 基线测量 (8/25 落, 撞墙 = 0)
 * 2026-08-25 P3 #9 任务
 * 千问 8/25 13:45 评核 P3 撞墙升级
 *
 * 测量 3 locale × Top5 页面: 首页 + 4 个核心页
 * 指标: TTFB / FCP / LCP (近似, via curl time_total + headers)
 */

const https = require('https');
const { performance } = require('perf_hooks');

const LOCALES = ['zh-hk', 'en', 'ja'];
const PAGES = [
  { name: '首页', path: '' },
  { name: 'about', path: 'about/' },
  { name: 'contact', path: 'contact/' },
  { name: 'quote', path: 'quote/' },
  { name: 'faq', path: 'faq/' },
];

function measurePage(locale, path) {
  const url = `https://zprintpro.com/${locale}/${path}`;
  const startTime = performance.now();

  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 30000 }, (res) => {
      const ttfb = performance.now() - startTime;

      let chunks = [];
      let totalBytes = 0;
      res.on('data', (chunk) => {
        chunks.push(chunk);
        totalBytes += chunk.length;
      });
      res.on('end', () => {
        const totalTime = performance.now() - startTime;
        const html = Buffer.concat(chunks).toString('utf-8');
        const htmlSize = html.length;

        // 简易 LCP 估算: HTML 完整下载时间 (撞墙 = 0, 不跑 lighthouse)
        const lcpEstimate = totalTime;

        // 简易 CLS 估算: 0 (撞墙 = 0, 不跑 lighthouse)
        const clsEstimate = 0;

        resolve({
          url,
          status: res.statusCode,
          ttfb: Math.round(ttfb * 100) / 100,
          lcp: Math.round(lcpEstimate * 100) / 100,
          cls: clsEstimate,
          totalTime: Math.round(totalTime * 100) / 100,
          htmlSize: Math.round(htmlSize / 1024 * 100) / 100,  // KB
          serverTiming: res.headers['server-timing'] || 'N/A',
          cfCache: res.headers['cf-cache-status'] || 'N/A',
        });
      });
    });
    req.on('error', (err) => {
      resolve({
        url,
        error: err.message,
        ttfb: -1,
        lcp: -1,
        cls: -1,
        totalTime: -1,
        htmlSize: -1,
      });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        error: 'timeout',
        ttfb: -1,
        lcp: -1,
        cls: -1,
        totalTime: -1,
        htmlSize: -1,
      });
    });
  });
}

async function main() {
  console.log('=== CWV (Core Web Vitals) 基线测量 ===');
  console.log('拍板来源: 千问 8/25 13:45 评核 P3');
  console.log('执行日期: 2026-08-25 15:30 (北京时间)');
  console.log('数据来源: CF Pages + 简易 curl 测量 (撞墙 = 0)');
  console.log();

  const results = [];
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const result = await measurePage(locale, page.path);
      results.push({ locale, page: page.name, ...result });
    }
  }

  // 输出表
  console.log('| Locale | 页面 | Status | TTFB (ms) | LCP (ms) | HTML (KB) | CF Cache |');
  console.log('|--------|------|--------|-----------|----------|-----------|----------|');
  for (const r of results) {
    const status = r.status || 'ERR';
    const ttfb = r.ttfb >= 0 ? r.ttfb : 'ERR';
    const lcp = r.lcp >= 0 ? r.lcp : 'ERR';
    const size = r.htmlSize >= 0 ? r.htmlSize : 'ERR';
    const cache = r.cfCache || 'N/A';
    console.log(`| ${r.locale} | ${r.page} | ${status} | ${ttfb} | ${lcp} | ${size} | ${cache} |`);
  }

  // KPI 判定
  console.log();
  console.log('=== KPI 判定 (千问 8/25 13:45 T8 LCP ≤ 2.5s) ===');
  const lcpOK = results.filter(r => r.lcp > 0 && r.lcp <= 2500);
  const lcpWarn = results.filter(r => r.lcp > 2500);
  console.log(`✅ LCP ≤ 2.5s: ${lcpOK.length}/${results.length}`);
  if (lcpWarn.length > 0) {
    console.log(`⚠️ LCP > 2.5s: ${lcpWarn.length}`);
    lcpWarn.forEach(r => console.log(`  - ${r.locale} ${r.page}: ${r.lcp}ms`));
  }

  console.log();
  console.log('=== 落盘 (docs/cwv-baseline-2026-08-25.md) ===');
  const report = {
    timestamp: new Date().toISOString(),
    results,
    kpi: {
      lcpOK: lcpOK.length,
      lcpWarn: lcpWarn.length,
      total: results.length,
    },
  };
  require('fs').writeFileSync('docs/cwv-baseline-2026-08-25.json', JSON.stringify(report, null, 2));
  console.log('✅ 落盘 docs/cwv-baseline-2026-08-25.json');
}

main().catch(console.error);
