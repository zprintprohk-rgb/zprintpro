/**
 * Next.js 15 instrumentation hook
 * 在 app 启动时执行一次, 适合跑长生命周期的初始化 (FX rate pre-fetch, log shipping, etc.)
 * 2026-07-13 Step 2: 调用 bootstrapLiveFxRates() 预热实时汇率缓存
 *
 * Docs: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // 仅在 Node.js runtime 执行 (避免 Edge runtime 兼容问题)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { bootstrapLiveFxRates } = await import('./lib/quote-engine/fx');
      await bootstrapLiveFxRates();
    } catch (e) {
      // bootstrap 失败时静默回退到静态汇率, 不影响 app 启动
      console.error('[instrumentation] FX bootstrap failed:', e);
    }
  }
}
