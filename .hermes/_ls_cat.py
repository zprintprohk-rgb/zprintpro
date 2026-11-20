# -*- coding: utf-8 -*-
import os
base = r"F:\zprintpro-nextjs\src\app\[locale]\category"
print("category entries:", os.listdir(base))
for name in os.listdir(base):
    p = os.path.join(base, name)
    if os.path.isdir(p):
        print("DIR", name, "->", os.listdir(p)[:10])
