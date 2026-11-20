import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
p = r"F:\zprintpro-nextjs\src\data\products.ts"
src = open(p, encoding="utf-8").read()
# doujinshi 条目内的 Turnaround 段
m = re.search(r"A 24-hour rush is available before Comiket; during peak seasons[^\"]{0,120}", src)
if m:
    print("PDP Turnaround 段 (6799):")
    print("  ...", m.group(0)[:150])
# Saddle Stitch 表格行
m2 = re.search(r"<td>Saddle Stitch</td><td>8-64 pages</td>[^<]{0,80}", src)
if m2:
    print("\nBinding 表 Saddle 行 (6790):")
    print("  ...", m2.group(0)[:150])
# 确认这些是否已是链接
for pat, name in [(r'A 24-hour rush is available before Comiket', 'before Comiket'), (r'<td>Saddle Stitch</td><td>8-64 pages</td>', 'Saddle 行')]:
    i = src.find(pat)
    seg = src[max(0,i-60):i+160]
    print(f"\n[{name}] 上下文含 <a ?: ", '<a' in seg)
