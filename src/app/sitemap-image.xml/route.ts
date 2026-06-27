/**
 * /sitemap-image.xml route handler
 *
 * Why: Cloudflare Pages' @cloudflare/next-on-pages intercepts
 * /sitemap-image.xml as a Next.js App Router route (returns 500
 * "This page could not be found" with lang="sitemap-image.xml"),
 * instead of serving the static file from public/sitemap-image.xml.
 *
 * Fix: expose it as an explicit App Router route that streams the
 * generated XML with the right Content-Type. This bypasses the
 * static-asset interception bug for non-standard sitemap filenames.
 *
 * Edge Runtime: cannot use node:fs, so we import the content as a
 * static string from a build-time-generated TypeScript module.
 */
import { SITEMAP_IMAGE_XML } from '@/generated/sitemap-content';

export const runtime = 'edge';
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  return new Response(SITEMAP_IMAGE_XML, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
