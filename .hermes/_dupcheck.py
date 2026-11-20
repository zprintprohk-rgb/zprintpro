# -*- coding: utf-8 -*-
import io, re
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = s.find("packagingContent:")
j = s.find("{", i)
d = 0; k = j; end = None
while k < len(s):
    if s[k] == "{":
        d += 1
    elif s[k] == "}":
        d -= 1
        if d == 0:
            end = k; break
    k += 1
span = s[i:end]
print("span chars:", len(span))
print("en keys:", len(re.findall(r"'en': \{", span)))
print("ja keys:", len(re.findall(r"'ja': \{", span)))
print("zh keys:", len(re.findall(r"'zh-hk': \{", span)))
out = io.open(r"F:\zprintpro-nextjs\.hermes\_dup.txt", "w", encoding="utf-8", newline="")
for m in re.finditer(r"'(zh-hk|en|ja)': \{", span):
    ln = s[:i + m.start()].count("\n") + 1
    out.write("%s at line %d\n" % (m.group(1), ln))
out.close()
