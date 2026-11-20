# -*- coding: utf-8 -*-
"""products.ts: 描述字段 **XXX** 标记剥离 (卡片纯文本渲染)"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "products.ts")
t = io.open(P, encoding="utf-8", newline="").read()
B = re.compile(r"\*\*([^*\n]{1,60})\*\*")
n = len(B.findall(t))
print("bold markers:", n)
# 只处理含「適配行業 / Best for / 適合業種」的粗体, 避免误伤其它用途
pats = [r"\*\*適配行業\*\*", r"\*\*Best for\*\*", r"\*\*適合業種\*\*", r"\*\*适配行业\*\*"]
cnt = 0
for p in pats:
    c = len(re.findall(p, t))
    if c:
        cnt += c
        t = re.sub(p, lambda m: m.group(0).replace("**", ""), t)
print("stripped:", cnt)
left = len(B.findall(t))
print("remaining bold markers:", left)
if cnt:
    bp = os.path.join(REPO, ".hermes", "_bak-prodts-20261020", "products.ts.before")
    os.makedirs(os.path.dirname(bp), exist_ok=True)
    if not os.path.exists(bp):
        shutil.copy2(P, bp)
    io.open(P, "w", encoding="utf-8", newline="").write(t)
    print("[OK] written")
