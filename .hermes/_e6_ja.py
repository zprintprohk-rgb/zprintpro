import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
src = open(r"F:\zprintpro-nextjs\src\data\pillar-content.ts", encoding="utf-8").read()
start = src.find("export const ecoPaperBagGsmCluster")
end = src.find("\nexport const ", start + 10)
blk = src[start:end]
cm = re.search(r"content: \{(.*?)\},", blk, re.S)
cb = cm.group(1) if cm else ""
# ja 的链接
jm = re.search(r"'ja': '(.*?)'", cb, re.S)
if jm:
    c = jm.group(1)
    links = re.findall(r'href="([^"]+)"', c)
    print("ja eco-paper-bag 链接:")
    for l in links: print("  ", l)
    # 采购段上下文
    i = c.find("href=")
    print("\n首个链接上下文:", c[max(0,i-120):i+160].replace("\n"," ")[:280] if i>=0 else "(无)")
