import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
p = r"F:\zprintpro-nextjs\src\data\blog-data\en.json"
raw = open(p, "rb").read()
print("CRLF 数:", raw.count(b"\r\n"))
print("LF 数:", raw.count(b"\n"))
print("总长度:", len(raw))
# 末尾格式
print("末尾 20 字节 repr:", repr(raw[-20:]))
