import json, sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
d = json.load(open(r"src/data/blog-data/zh-hk.json", encoding="utf-8"))
def walk(o, path=""):
    if isinstance(o, dict):
        for k, v in o.items():
            walk(v, f"{path}.{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, f"{path}[{i}]")
    elif isinstance(o, str):
        for kw in ["FDA", "FSC"]:
            for m in re.finditer(kw, o):
                s = max(0, m.start()-60); e = min(len(o), m.end()+80)
                print(f"[{kw}] {path}: ...{o[s:e]}...")
walk(d)
