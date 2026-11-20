import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['saddle-stitch-booklets','exercise-books','catalog-printing']:
    m = re.search(r'slug: \'' + slug + r'\'.*?\n    basePrice(?:En)?:\s*([0-9.]+)', src, re.S)
    print(slug, '-> basePrice:', m.group(1) if m else '?')
    m2 = re.search(r'slug: \'' + slug + r'\'.*?\n    moq(?:En)?:\s*([0-9]+)', src, re.S)
    print(slug, '-> moq:', m2.group(1) if m2 else '?')
