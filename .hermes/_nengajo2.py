import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
import glob
for p in ["src/data/products.ts", "src/data/sku-seo-data.ts"]:
    src = open("F:/zprintpro-nextjs/" + p, encoding="utf-8").read()
    m = re.findall(r"(?:slug|url|path)[: ]*[\"\x27]([^\"\x27]*nengajo[^\"\x27]*)[\"\x27]", src)
    print(p, "->", set(m) if m else "无")
