# -*- coding: utf-8 -*-
import io

ts = io.open(r"F:\zprintpro-nextjs\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
for slug in ("cartoon-red-packets", "eco-red-packets", "large-red-packets"):
    si = ts.find('"%s": {' % slug)
    ji = ts.find('"ja": {', si)
    bi = ts.find("**FAQ**", ji)
    print("--- %s ja FAQ ---" % slug)
    print(repr(ts[bi:bi+560]))
    print()
