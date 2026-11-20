import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
lines = open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8").read().split("\n")
l = lines[485]
i = l.find("small-batch-stickers")
if i >= 0:
    s = max(0, i-90)
    print("L486: ..." + l[s:i+130] + "...")
# sticker-buying-guide slug 定位
for n in range(len(lines)):
    if "sticker-buying-guide" in lines[n] and "slug" in lines[n]:
        print("sticker-buying-guide slug 行 L" + str(n+1) + ": " + lines[n].strip()[:90])
# sticker-buying-guide 内容
for n in range(len(lines)):
    if 'sticker-buying-guide' in lines[n]:
        print("引用 L" + str(n+1) + ": " + lines[n].strip()[:70])
