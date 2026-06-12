import json
with open(r'F:\zprintpro-nextjs\docs\seo-audit-en\core-eeat-scores.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
pp = d.get('per_page', [])
print('Sample overall values (first 5):')
for p in pp[:5]:
    url = p.get('url', '')
    print(f'  {url}: overall={p.get("overall")} geo={p.get("geo_score")} seo={p.get("seo_score")}')
print()
print('Sample geo6_pass_rate values (first 5):')
for p in pp[:5]:
    url = p.get('url', '')
    print(f'  {url}: geo6_pass_rate={p.get("geo6_pass_rate")}')
print()
# Check scale: rubric says scale 0-10 since Pass=10 Partial=5 Fail=0
# But task spec says "评分标准 (90-100 优 / 75-89 好 / 60-74 中 / 40-59 低 / 0-39 差)"
# That implies 0-100 scale. So existing scores are on 0-10 and need to be scaled to 0-100.
# OR the existing script kept 0-10 because "Pass=10" was per-item. Let me check.
# Looking at the per_page: geo_score=5.46 — that's 5.46 / 10 max = 54.6% on 0-100 scale.
# So the existing scores are on 0-10 per-item scale; final scores need x10 for 0-100.
# Or interpret the rubric as 0-10 since Pass=10.

# Show 5 worst pages
print('=== 5 worst pages by overall ===')
sorted_pp = sorted(pp, key=lambda x: x.get('overall', 0) or 0)
for p in sorted_pp[:5]:
    print(f'  {p.get("overall"):.2f} | {p.get("page_type")} | {p.get("url")}')
print()
print('=== 5 best pages by overall ===')
for p in sorted_pp[-5:]:
    print(f'  {p.get("overall"):.2f} | {p.get("page_type")} | {p.get("url")}')