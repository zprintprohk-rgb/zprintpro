# -*- coding: utf-8 -*-
import io, re

cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("calendarsContent:")
print(repr(cat[i:i + 420]))
seg = cat[i:i + 30000]
print("dq zh-hk keys:", len(re.findall(r'"zh-hk": \{', seg)))
print("sq zh-hk keys:", len(re.findall(r"'zh-hk': \{", seg)))
print("dq en keys:", len(re.findall(r'"en": \{', seg)))
print("sq en keys:", len(re.findall(r"'en': \{", seg)))
print("dq ja keys:", len(re.findall(r'"ja": \{', seg)))
print("sq ja keys:", len(re.findall(r"'ja': \{", seg)))
