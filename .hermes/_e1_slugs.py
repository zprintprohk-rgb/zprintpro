import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
print("顶层 keys 数:", len(data))
hits = [k for k in data if "sticker" in k]
print("含 sticker 的 key:", hits)
for k in hits:
    v = data[k]
    if isinstance(v, dict):
        c = v.get("content", "")
        links = re.findall(r'href="([^"]+)"', c)
        pdp = [l for l in links if "/product/" in l]
        print(f"\n[{k}] title: {v.get('title','?')[:60]}")
        print(f"  links {len(links)} | PDP: {pdp[:6]}")
        # small batch 锚候选
        for m in re.finditer(r"small[- ]batch", c, re.I):
            s = max(0, m.start()-50)
            seg = c[s:m.end()+60].replace("\n"," ")
            print("   ctx:", seg[:130])
            break
