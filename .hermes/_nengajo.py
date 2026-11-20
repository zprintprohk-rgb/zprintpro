import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
src = open("F:/zprintpro-nextjs/src/data/products.ts", encoding="utf-8").read()
slugs = re.findall(r"slug: '([^']*nengajo[^']*)'", src)
print("products.ts nengajo slugs:", slugs)
