// Peek top-level structure of gsc-deep-analysis JSON (read-only)
const fs = require('fs');
const p = 'F:/zprintpro-nextjs/.hermes/logs/gsc-deep-analysis-2026-10-26.json';
const j = JSON.parse(fs.readFileSync(p, 'utf8').replace(/\bNaN\b/g, 'null'));
function shape(v, depth) {
  if (depth <= 0) return Array.isArray(v) ? `Array(${v.length})` : typeof v;
  if (Array.isArray(v)) return v.length ? `Array(${v.length}) e.g. ${JSON.stringify(shape(v[0], depth - 1))}` : 'Array(0)';
  if (v && typeof v === 'object') {
    const keys = Object.keys(v);
    const out = {};
    for (const k of keys.slice(0, 12)) out[k] = shape(v[k], depth - 1);
    return keys.length > 12 ? { ...out, __more: keys.length - 12 } : out;
  }
  return typeof v + ':' + String(v).slice(0, 40);
}
console.log(JSON.stringify(shape(j, 3), null, 1).slice(0, 4000));
