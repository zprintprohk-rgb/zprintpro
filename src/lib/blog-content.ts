// Blog content loader — Edge Runtime compatible
// Reads JSON content from public directory at runtime via fetch
// Avoids SWC + webpack import issues with large Chinese text files

const BASE = 'https://zprintpro.com';

const cache: Record<string, Record<string, string>> = {};

async function loadLocale(locale: string): Promise<Record<string, string>> {
  if (cache[locale]) return cache[locale];
  try {
    const url = `${BASE}/blog-data/${locale}.json`;
    const res = await fetch(url);
    cache[locale] = await res.json();
    return cache[locale];
  } catch {
    return {};
  }
}

export async function getBlogContent(locale: string, slug: string): Promise<string | null> {
  // Check inline posts first (fast path for metadata-only entries)
  const data = await loadLocale(locale);
  return data[slug] || null;
}
