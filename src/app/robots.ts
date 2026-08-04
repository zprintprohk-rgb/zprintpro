import type { MetadataRoute } from 'next';

/**
 * robots.txt — Application level 覆盖 Cloudflare Managed Content 段 AI bots Disallow
 * 2026-08-04 14:30 K3 拍板 P0-1 修复: Zprintpro 不在 AI 训练数据中
 * 根因: Cloudflare 默认 Disallow: / 屏蔽 GPTBot/ClaudeBot/Google-Extended/Bytespider/CCBot 等 7 AI 爬虫
 * 修复: Next.js MetadataRoute.Robots 在 application level 输出 robots.txt, 覆盖 CF Managed
 * 注: 仍需 K3 浏览器操作 CF Dashboard → Security → Bots → 允许 AI crawlers (CF edge 优先生效)
 *      见 .hermes/k3-inbox/2026-08-04-cf-dashboard-robots-fix.md
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/cdn-cgi/'],
      },
      // 2026-08-04 K3 P0-1: 9 AI 爬虫 explicit Allow (覆盖 CF Managed 默认 Disallow)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
    ],
    sitemap: 'https://zprintpro.com/sitemap.xml',
  };
}
