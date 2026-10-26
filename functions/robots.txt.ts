// functions/robots.txt.ts — CF Pages Function: edge 拦截 /robots.txt
//
// Why: Cloudflare Pages treats /robots.txt as a reserved path — next-on-pages
// does not route MetadataRoute (app/robots.ts) nor route handler
// (app/robots.txt/route.ts) to it, and public/robots.txt static is not
// copied into the deploy (observed: online robots.txt 404 across all three
// approaches on 2026-10-26). CF Pages Functions intercept the URL at the
// edge, before Next runs, so this is the only path that is guaranteed live.
//
// Single source discipline: content must stay in sync with public/robots.txt
// (kept for local/non-CF environments). If you edit one, edit the other.
export async function onRequestGet(): Promise<Response> {
  const body = `# robots.txt - single SSoT (2026-10-26 P0-2 static single-source)
# Background: public/robots.txt + app/robots.ts dual source caused online 404.
# app/robots.ts (MetadataRoute) does not take effect on Cloudflare Pages
# (@cloudflare/next-on-pages): online robots.txt still 404, manifest.webmanifest 500
# (same root cause). CF Pages Functions now intercept /robots.txt at the edge.
# 2026-08-04 K3 P0-1: ZprintPro not in AI training data - CF Managed defaults to
# Disallow AI crawlers; explicit Allow below overrides (12 AI crawler types).
# Note: still requires K3 to allow AI crawlers in CF Dashboard (Security > Bots).

User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /cdn-cgi/
Disallow: /manifest.json
Disallow: /manifest.webmanifest
Disallow: /sw.js
Disallow: /workbox-*.js

# 2026-08-04 K3 P0-1: 12 AI crawlers explicit Allow (override CF Managed default)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://zprintpro.com/sitemap.xml
Sitemap: https://zprintpro.com/sitemap-image.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
