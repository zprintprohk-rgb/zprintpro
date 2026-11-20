import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
p = r"F:\zprintpro-nextjs\src\data\blog-data\en.json"
raw = open(p, encoding="utf-8").read()
# 找一个真实 <a href 的原始字节
m = re.search(r'<a href="[^"]+"', raw)
if m:
    print("首个 <a 标签原始字节 (repr):")
    print(repr(raw[m.start()-5:m.end()+5]))
# 目标锚原始字节
i = raw.find("small-batch restocking")
print("\n目标锚前后 80 字节 (repr):")
print(repr(raw[i-40:i+60]))
