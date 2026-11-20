import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
c = data.get("sticker-guide", {}).get("content", "")
# 列出所有 <a 标签及 href + class，看样式惯例
for m in re.finditer(r'<a [^>]*href="([^"]+)"[^>]*>', c):
    tag = m.group(0)
    cls = re.search(r'class="([^"]*)"', tag)
    print(f"href={m.group(1)[:50]:<52} class={cls.group(1) if cls else '(无)'}")
# 该段的 class 惯例（sticker-guide 内其他 PDP 链接如何写）
print("\n=== small-batch 段落前后的 <a> 样例 ===")
for m in re.finditer(r'<a [^>]*>', c):
    s = max(0, m.start()-40)
    print("  ...", c[s:m.end()+30].replace("\n"," ")[:110])
