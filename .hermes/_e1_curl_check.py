import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
html = open("F:/zprintpro-nextjs/.hermes/_tmp_e1_curl.html", encoding="utf-8", errors="replace").read()
print("E1 锚出现:", 'href="/en/product/small-batch-stickers/"' in html)
# 提取锚上下文
i = html.find("small-batch restocking for cross-border sellers")
if i >= 0:
    print("锚渲染上下文:", html[max(0,i-80):i+60].replace("\n"," "))
