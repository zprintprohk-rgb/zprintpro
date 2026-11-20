import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
base = "F:/zprintpro-nextjs/src/data/blog-data/"
for f in ["en", "zh-hk", "ja"]:
    data = json.load(open(base + f + ".json", encoding="utf-8"))
    v = data.get("catalog-printing-china-supplier-guide")
    if v:
        c = v.get("content", "")
        has = "/product/catalog-printing/" in c
        links = [x for x in ["catalog-printing"] if x in c]
        print("[" + f + "] catalog-printing-china-supplier-guide → catalog PDP 链接:", has)
