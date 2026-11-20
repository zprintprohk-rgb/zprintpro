// Summarize .hermes/geo/v28_5-wiring.json into a compact console dump (D0 precheck)
const fs = require('fs');
const p = '.hermes/geo/v28_5-wiring.json';
const j = JSON.parse(fs.readFileSync(p, 'utf8'));
const out = [];
const brief = (v, n = 400) => {
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  if (s == null) return 'null';
  return s.length > n ? s.slice(0, n) + `…(+${s.length - n}ch)` : s;
};
out.push('TOP_KEYS=' + Object.keys(j).join(','));
for (const k of ['slug_count', 'alt_resolver']) if (k in j) out.push(k + '=' + brief(j[k], 300));
if (j.retired_check) out.push('retired_check=' + brief(j.retired_check, 600));
if (j.live_slugs) out.push('live_slugs.count=' + j.live_slugs.length + ' head=' + j.live_slugs.slice(0, 8).join('|') + ' tail=' + j.live_slugs.slice(-5).join('|'));
if (j.per_slug_images) {
  const e = Object.entries(j.per_slug_images);
  out.push('per_slug_images.count=' + e.length);
  for (const [s, v] of e) out.push('  ' + s + ' :: ' + brief(v, 220));
}
for (const k of ['render_chain', 'seo_images', 'sitemap', 'indexnow', 'precedents', 'gitignore', 'images_shape']) {
  if (k in j) out.push(k + '=' + brief(j[k], 1600));
}
// any other top-level keys not covered
const covered = new Set(['slug_count', 'alt_resolver', 'retired_check', 'live_slugs', 'per_slug_images', 'render_chain', 'seo_images', 'sitemap', 'indexnow', 'precedents', 'gitignore', 'images_shape', 'notes']);
for (const k of Object.keys(j)) if (!covered.has(k)) out.push('OTHER ' + k + '=' + brief(j[k], 800));
console.log(out.join('\n'));
