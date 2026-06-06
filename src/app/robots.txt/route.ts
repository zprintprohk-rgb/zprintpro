/**
 * /robots.txt route handler
 *
 * Why: Cloudflare Pages serves its own Content-Signal robots.txt
 * template at /robots.txt by default, ignoring public/robots.txt.
 * We override it with an explicit App Router route that returns
 * our project robots.txt content.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const filePath = join(process.cwd(), 'public', 'robots.txt');
  const txt = await readFile(filePath, 'utf-8');
  return new Response(txt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
