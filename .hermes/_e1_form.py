import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
data = json.load(open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8"))
v = data.get("sticker-guide", {})
c = v.get("content", "")
# 定位 small-batch restocking
i = c.find("small-batch restocking")
if i >= 0:
    seg = c[max(0,i-260):i+80]
    print("=== small-batch restocking 前后 260 字 ===")
    print(seg)
    print()
    # 检查该段是否已有 <a> 或 markdown [text](url)
    print("=== 该段所有链接形态 ===")
    for m in re.finditer(r'(<a [^>]*>|\[[^\]]*\]\([^)]*\))', seg):
        print("  ", m.group(0)[:120])
# 确认整篇链接形态: 统计 <a 与 [text](url)
html_a = len(re.findall(r'<a ', c))
md_links = len(re.findall(r'\[[^\]]+\]\([^)]+\)', c))
print(f"\n全篇: HTML <a> = {html_a} | markdown [text](url) = {md_links}")
