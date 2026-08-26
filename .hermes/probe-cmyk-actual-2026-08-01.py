import json
for loc, p in [("zh-hk","src/data/blog-data/zh-hk.json"), ("en","src/data/blog-data/en.json"), ("ja","src/data/blog-data/ja.json")]:
    with open(p, encoding="utf-8") as f:
        d = json.load(f)
    c = d.get("cmyk-guide", {}).get("content", "")
    # find border-t section
    idx = c.rfind("border-t")
    if idx > 0:
        print(f"\n=== {loc}/cmyk-guide ending ({len(c)} chars, border-t at {idx}) ===")
        print(c[idx:idx+1500])