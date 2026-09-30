# -*- coding: utf-8 -*-
"""T3: 2 en catalog blogs -> exact-anchor internal links to /en/services/catalog-printing-china/"""
import io, json

P = r'F:\zprintpro-nextjs\src\data\blog-data\en.json'
d = json.load(io.open(P, encoding='utf-8'))

inserts = {
    'catalog-printing-guide': (
        '<p>For a fixed-quote ',
        '<p>For a fixed-quote <a href="/en/services/catalog-printing-china/" class="text-[#1A56DB] underline">China catalog printing service</a> with 10 MOQ, DHL 2-4 day global delivery and free file check, see our dedicated factory-direct page. ',
    ),
    'catalog-printing-china-supplier-guide': (
        '<p>For a fixed-quote ',
        '<p>For a fixed-quote <a href="/en/services/catalog-printing-china/" class="text-[#1A56DB] underline">China catalog printing</a> page (10 MOQ, Shenzhen factory, DHL 2-4 days, save 30-40% vs Western printers), get a 30-second AI quote now. ',
    ),
}

for slug, (anchor, ins) in inserts.items():
    c = d[slug]['content']
    assert 'catalog-printing-china' not in c, slug + ' already linked'
    assert anchor in c, slug + ' anchor missing'
    d[slug]['content'] = c.replace(anchor, ins, 1)
    print('linked:', slug)

io.open(P, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
print('written OK')
