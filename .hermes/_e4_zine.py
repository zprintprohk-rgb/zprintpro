import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
# zine guide slug 找
for k, v in data.items():
    if not isinstance(v, dict): continue
    if 'zine' in k:
        c = v.get("content","")
        i = c.find("doujin circles")
        if i >= 0:
            print(f"[{k}] 锚 'doujin circles' 上下文:")
            print("   ...", c[max(0,i-140):i+80].replace("\n"," ")[:220])
            print("   已链? ", "href=" in c[max(0,i-140):i+80])
            print()
