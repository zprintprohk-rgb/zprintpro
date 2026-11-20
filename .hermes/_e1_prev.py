import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
# 收集几个文章的 <a href 内部链接形态
count = 0
for k, v in data.items():
    if not isinstance(v, dict): continue
    c = v.get("content","")
    for m in re.finditer(r'<a href="(/en/product/[^"]+)"', c):
        print(f"[{k}] {m.group(1)}  class={re.search(chr(39)+chr(39),'') if False else ''}")
        count += 1
        if count >= 8: break
    if count >= 8: break
print("---")
# 统计所有文章 <a href 是否带 class
withcls = 0
total = 0
for k, v in data.items():
    if not isinstance(v, dict): continue
    c = v.get("content","")
    for m in re.finditer(r'<a href="[^"]+"', c):
        total += 1
        seg = c[m.start():m.end()+120]
        if 'class=' in seg[:m.end()-m.start()+100]: withcls += 1
print(f"全 en.json 内部链接: {total} | 带 class: {withcls}")
