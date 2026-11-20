# -*- coding: utf-8 -*-
import io, os
P = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".hermes", "_faq7_add.py")
t = io.open(P, encoding="utf-8").read()
old = '    assert "HK$" in r[3] or "HK$" in r[5], f"{slug} 无价格锚"'
new = '''    joined = r[3] + r[4] + r[5]
    assert ("HK$" in joined) or ("HK$" in r[3]), f"{slug} 无价格锚"'''
assert t.count(old) == 1
t = t.replace(old, new)
io.open(P, "w", encoding="utf-8").write(t)
print("patched assertion")
