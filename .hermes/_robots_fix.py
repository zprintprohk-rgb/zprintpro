# -*- coding: utf-8 -*-
# P0-2: robots 单源化 — 完善 src/app/robots.ts (唯一 SSoT) + 删除 public/robots.txt
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

robots_ts = r'''import type { MetadataRoute } from 'next';

/**
 * robots.txt — 唯一 SSoT（2026-10-26 P0-2 单源化）
 * 背景: 仓库双源 (public/robots.txt + app/robots.ts) 致线上 404; public 静态优先于 app 路由,
 *       且 public 版含 Disallow: /_next/ 妨碍渲染资源抓取 (DeepSeek 2026-10-26 移除)。
 * 2026-08-04 K3 P0-1: ZprintPro 不在 AI 训练数据中 — CF Managed 默认 Disallow AI 爬虫,
 *       此处 explicit Allow 覆盖 (GPTBot/ClaudeBot/Google-Extended 等 12 类)。
 * 注: 仍需 K3 浏览器操作 CF Dashboard → Security → Bots → 允许 AI crawlers (CF edge 优先生效)。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/cdn-cgi/', '/manifest.json', '/manifest.webmanifest', '/sw.js', '/workbox-*.js'],
      },
      // 2026-08-04 K3 P0-1: 12 AI 爬虫 explicit Allow (覆盖 CF Managed 默认 Disallow)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: ['https://zprintpro.com/sitemap.xml', 'https://zprintpro.com/sitemap-image.xml'],
  };
}
'''

p_ts = r'F:\zprintpro-nextjs\src\app\robots.ts'
open(p_ts, 'w', encoding='utf-8').write(robots_ts)
print('src/app/robots.ts updated')

# 删除 public/robots.txt (双源冲突根因; 先备份到 .hermes/_bak)
import shutil, os
p_txt = r'F:\zprintpro-nextjs\public\robots.txt'
bak = r'F:\zprintpro-nextjs\.hermes\_bak-robots-public-20261026.txt'
shutil.copy(p_txt, bak)
os.remove(p_txt)
print(f'public/robots.txt removed (backup: {bak})')
