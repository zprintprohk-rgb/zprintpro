from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
import json
import re

root = Path(r'F:\zprintpro-nextjs')
report = root / 'docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md'
text = report.read_text(encoding='utf-8')
data = json.loads((root / '.hermes/logs/gsc-deep-analysis-2026-10-26.json').read_text(encoding='utf-8'))
probe = json.loads((root / '.hermes/logs/page-probe-2026-10-26.json').read_text(encoding='utf-8'))
errors = []

# Check key metrics and report anchors against the generated analysis, not memory.
all_total = data['full_total'][0]
assert all_total['imps_cur'] == 23014 and all_total['clicks_cur'] == 461
assert all_total['imps_prev'] == 23794 and all_total['clicks_prev'] == 384
locales = {x['locale']: x for x in data['full_locale']}
expected = {
    'zh-hk': (15605, 366, 15256, 296),
    'en': (5307, 55, 6398, 55),
    'ja': (2078, 36, 2124, 32),
}
for locale, values in expected.items():
    row = locales[locale]
    actual = (row['imps_cur'], row['clicks_cur'], row['imps_prev'], row['clicks_prev'])
    if actual != values:
        errors.append(f'locale mismatch {locale}: {actual} != {values}')

opps = {(x['locale'], x['query']): x for x in data['locale_opportunities']}
checks = {
    ('en', 'small batch sticker printing'): (49, 0, 4.77469387755102),
    ('en', 'saddle stitch booklet printing'): (15, 0, 9.6),
    ('en', 'doujinshi printing'): (39, 0, 10.205128205128204),
    ('en', 'china catalog printing'): (78, 0, 17.99833333333333),
    ('ja', 'コミケ 印刷'): (170, 0, 19.06129411764706),
    ('ja', '卒アル販売'): (16, 0, 5.0),
    ('ja', '教材 印刷製本'): (33, 0, 19.332727272727272),
}
for key, values in checks.items():
    row = opps[key]
    actual = (row['imps_cur'], row['clicks_cur'], row['pos_cur'])
    if actual != values:
        errors.append(f'query mismatch {key}: {actual} != {values}')

cann = {x['query']: x for x in data['cannibalization']}
for query, pages, imps in [('海報印刷', 8, 516), ('印海報', 9, 350), ('貼紙印刷', 8, 215), ('食品包裝印刷', 3, 204), ('月曆印刷', 3, 202)]:
    row = cann[query]
    if (row['pages'], row['imps']) != (pages, imps):
        errors.append(f'cannibalization mismatch {query}')

probe_by_path = {x['path']: x for x in probe}
if probe_by_path['/robots.txt']['status'] != 404:
    errors.append('robots status changed; report baseline stale')
if probe_by_path['/sitemap.xml']['status'] != 200:
    errors.append('sitemap status changed')
if probe_by_path['/ja/nengajo-2027/']['status'] != 200:
    errors.append('nengajo status changed')

# All local citation paths and verbatim text anchors must resolve.
for match in re.finditer(r'\((kimi-cite://[^)]+)\)', text):
    link = match.group(1).split(' "citation"')[0]
    parsed = urlparse(link)
    qs = parse_qs(parsed.query)
    if parsed.netloc == 'web':
        continue
    path_value = qs.get('path', [''])[0]
    if not path_value:
        errors.append(f'citation missing path: {link}')
        continue
    source = Path(path_value)
    if not source.exists():
        errors.append(f'citation path missing: {source}')
        continue
    if 'text' in qs:
        anchor = qs['text'][0]
        source_text = source.read_text(encoding='utf-8')
        if anchor not in source_text:
            errors.append(f'citation text not verbatim in {source.name}: {anchor[:100]}')
    if parsed.netloc == 'md-line' and 'line' in qs:
        line_no = int(qs['line'][0])
        line = source.read_text(encoding='utf-8').splitlines()[line_no - 1]
        if 'text' in qs and qs['text'][0] not in line:
            errors.append(f'md-line mismatch {source.name}:{line_no}')

# All embedded evidence images must exist.
for rel in re.findall(r'!\[[^\]]*\]\(([^)]+)\)', text):
    if not (report.parent / rel).exists():
        errors.append(f'missing image: {rel}')

for required in ['## 数据来源', 'P0-1', 'P0-2', '30 天执行路线图', '双引擎战略—执行分离', '未擅自修改线上页面']:
    if required not in text:
        errors.append(f'missing report section: {required}')

print(f'Report: {report}')
print(f'Lines: {len(text.splitlines())}; bytes: {report.stat().st_size}')
print(f'Citations checked: {len(re.findall(r"kimi-cite://", text))}')
if errors:
    print('VALIDATION FAILED')
    for error in errors:
        print('-', error)
    raise SystemExit(1)
print('VALIDATION PASS: metrics, probes, local citations, images and required sections')
