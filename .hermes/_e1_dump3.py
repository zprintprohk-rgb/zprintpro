import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
p = r"F:\zprintpro-nextjs\src\data\blog-data\en.json"
raw = open(p, encoding="utf-8").read()
m = re.search(r'<a href', raw)
if m:
    seg = raw[m.start()-10:m.start()+80]
    print("真实 <a href 原始字节 (repr):")
    print(repr(seg))
# 找 \/en\/product\/ 转义形态
m2 = re.search(r'\\/en\\/product\\/[^\\]+', raw)
if m2:
    print("\n转义链接样本 (repr):")
    print(repr(raw[m2.start()-30:m2.end()+10]))
