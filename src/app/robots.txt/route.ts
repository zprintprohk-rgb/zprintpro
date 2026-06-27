/**
 * /robots.txt route handler
 *
 * Why: Cloudflare Pages serves its own Content-Signal robots.txt
 * template at /robots.txt by default, ignoring public/robots.txt.
 * We override it with an explicit App Router route that returns
 * our project robots.txt content.
 *
 * Edge Runtime: cannot use node:fs, so we import the content as a
 * static string from a build-time-generated TypeScript module.
 */
import { ROBOTS_TXT } from '@/generated/sitemap-content';

export const runtime = 'edge';
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  return new Response(ROBOTS_TXT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
