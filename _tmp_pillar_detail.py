import json, re
for loc in ['zh-hk','en','ja']:
    d = json.load(open(f'src/data/blog-data/{loc}.json', encoding='utf-8'))
    print(f'\n{"="*70}\nLOCALE: {loc}\n{"="*70}')
    for slug in ['poster-size-guide','campus-education-printing-pillar-guide','foil-stamping-3-applications-2026']:
        e = d.get(slug)
        if not e: continue
        c = e.get('content','')
        h1 = re.search(r'<h1[^>]*>([\s\S]*?)</h1>', c)
        h2s = re.findall(r'<h2[^>]*>([\s\S]*?)</h2>', c)
        # CTA positions with context
        ctas = []
        for mm in re.finditer(r'wa\.me/8619880851334', c):
            start = max(0, mm.start()-150)
            ctas.append((mm.start()/len(c)*100, c[start:mm.start()+40].replace('\n',' ')))
        print(f'\n--- {slug} ---')
        print(f'H1: {re.sub(r"<[^>]+>","",h1.group(1)).strip()[:90] if h1 else "NONE"}')
        print(f'H2 ({len(h2s)}):')
        for h in h2s:
            print(f'   - {re.sub(r"<[^>]+>","",h).strip()[:70]}')
        print(f'CTAs ({len(ctas)}):')
        for pos, ctx in ctas:
            print(f'   @{pos:.0f}%: ...{ctx[-60:]}')
