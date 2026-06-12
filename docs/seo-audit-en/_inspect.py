import json
with open(r'F:\zprintpro-nextjs\docs\seo-audit-en\core-eeat-scores.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
print('Source:', d.get('source'))
print('Schema version:', d.get('schema_version'))
print('Generated at:', d.get('generated_at'))
sa = d.get('site_aggregate', {})
print('Site aggregate keys:', list(sa.keys()))
print('Pages scored:', sa.get('pages_scored'))
print('overall:', sa.get('overall'))
print('geo_score:', sa.get('geo_score'))
print('seo_score:', sa.get('seo_score'))
print('geo6 avg pass rate:', sa.get('geo6_avg_pass_rate'))
print('geo6 pages full ready:', sa.get('geo6_pages_full_ready'))
print('dim_site_mean:', sa.get('dim_site_mean'))
bi = d.get('by_intent', {})
for k, v in bi.items():
    print(f'  intent={k}: n={v.get("n")}, overall={v.get("overall")}, geo={v.get("geo_score")}, seo={v.get("seo_score")}')
print()
print('Grade distribution from per_page overall values:')
pp = d.get('per_page', [])
from collections import Counter
bands = Counter()
for p in pp:
    o = p.get('overall', 0) or 0
    if o >= 90:
        bands['excellent (90+)'] += 1
    elif o >= 75:
        bands['good (75-89)'] += 1
    elif o >= 60:
        bands['medium (60-74)'] += 1
    elif o >= 40:
        bands['low (40-59)'] += 1
    else:
        bands['poor (0-39)'] += 1
for k, v in bands.items():
    print(f'  {k}: {v}')