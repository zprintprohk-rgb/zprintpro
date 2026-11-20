# -*- coding: utf-8 -*-
import io, re
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
lines = s.split("\n")
# en envelope FAQ minimum order + ja/en/snippet MOQ forms
for i, l in enumerate(lines):
    if re.search(r"500 (units|pcs)|500枚|500 個", l) and ("envelope" in s[max(0, s.find(lines[i]) - 3000):s.find(lines[i])].lower().split("packagingContent")[-1] or True):
        pass
# simpler: print en/ja envelope FAQ lines
print("== envelope FAQ lines (zh/en/ja) ==")
for i, l in enumerate(lines):
    if "minimum order" in l.lower() or "最小発注" in l or "最低多少個起" in l or "最低幾多個起" in l:
        if "envelope" in "".join(lines[max(0, i-40):i]).lower() or "封筒" in "".join(lines[max(0, i-40):i]) or "信封" in "".join(lines[max(0, i-40):i]):
            print("L%d: %s" % (i + 1, l.strip()[:220]))
print()
print("== en envelope block: MOQ-ish lines ==")
a = s.find("envelopesContent:")
seg = s[a:a + 60000]
for m in re.finditer(r"(From|from|minimum|min)\D{0,20}500", seg):
    ln = s[:a + m.start()].count("\n") + 1
    print("L%d: %s" % (ln, s[a + m.start() - 100:a + m.start() + 120].replace("\n", " ")[:220]))
