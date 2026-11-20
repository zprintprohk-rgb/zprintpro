import json, re
for loc in ['en','ja']:
    d = json.load(open(f'src/data/blog-data/{loc}.json', encoding='utf-8'))
    for slug in ['poster-size-guide','campus-education-printing-pillar-guide','foil-stamping-3-applications-2026']:
        e = d.get(slug)
        if not e:
            print(loc, slug, 'MISSING'); continue
        c = e.get('content','')
        txt = re.sub(r'<[^>]+>','',c)
        wa = len(re.findall(r'wa\.me/8619880851334', c))
        div_alert = len(re.findall(r'<div class="bg-(?:amber|blue|red|green|gray)-50', c))
        person = re.search(r'"@type"\s*:\s*"Person"', c) is not None or 'Person' in json.dumps(e.get('schemas',[]))
        print(f'{loc} {slug}: chars={len(c)} txt={len(txt)} date={e.get("date")} schemas={e.get("schemas")} wa={wa} alert={div_alert} person={person}')
        print(f'   title={str(e.get("title"))[:80]}')

# blog-posts.ts wiring check
src = open('src/data/blog-posts.ts', encoding='utf-8').read()
for slug in ['poster-size-guide','campus-education-printing-pillar-guide','foil-stamping-3-applications-2026']:
    print('wired in blog-posts.ts:', slug, '=>', slug in src)
