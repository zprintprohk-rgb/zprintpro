# -*- coding: utf-8 -*-
"""faqSchema 死字段删除器 — products.ts (千问报告 2.2 正确动作 2, W1)
三件套: 计数断言 (82 data + 1 type) + 形状断言 (删除后 rg=0 + tsc) + 备份
"""
import io, os, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "products.ts")
BAK = os.path.join(REPO, ".hermes", "_bak-faqschema-del-20261019")
os.makedirs(BAK, exist_ok=True)

with io.open(P, "r", encoding="utf-8", newline="") as fh:
    lines = fh.read().split("\n")

data_re = re.compile(r'^\s*faqSchema: \[.*\],\s*$')
type_re = re.compile(r'^\s*faqSchema\?: \{ question: string; answer: string \}\[\];\s*$')

data_cnt = sum(1 for l in lines if data_re.match(l))
type_cnt = sum(1 for l in lines if type_re.match(l))
multi_open = sum(1 for l in lines if re.match(r'^\s*faqSchema: \[\s*$', l))
print(f"pre-count: data_single={data_cnt} type={type_cnt} multi_open={multi_open}")
if data_cnt + multi_open != 81 or type_cnt != 1:
    print("[FAIL] 计数断言不过 (期望 81+1)"); sys.exit(2)

shutil.copy2(P, os.path.join(BAK, "products.ts.before"))
kept = []
i = 0
removed = 0
in_multi = False
while i < len(lines):
    l = lines[i]
    if data_re.match(l) or type_re.match(l):
        removed += 1; i += 1; continue
    if re.match(r'^\s*faqSchema: \[\s*$', l):
        # 多行块: 找收口 ], 行
        j = i + 1
        while j < len(lines) and not re.match(r'^\s*\],\s*$', lines[j]):
            j += 1
        if j >= len(lines):
            print("[FAIL] 多行块未收口"); sys.exit(3)
        removed += j - i + 1
        i = j + 1
        continue
    kept.append(l); i += 1
print(f"removed lines: {removed} (期望 99 = 80 单行 + 1 类型 + 18 多行块)")
if removed != 99:
    print("[FAIL] 删除行数断言不过 → 不写盘"); sys.exit(3)

with io.open(P, "w", encoding="utf-8", newline="") as fh:
    fh.write("\n".join(kept))

# 后置形状断言
with io.open(P, "r", encoding="utf-8", newline="") as fh:
    after = fh.read()
residual = after.count("faqSchema")
print(f"post rg faqSchema count: {residual} (期望 0)")
if residual != 0 or removed != 99:
    print("[FAIL] 形状断言不过 → 回滚")
    shutil.copy2(os.path.join(BAK, "products.ts.before"), P)
    sys.exit(3)
print("[PASS] faqSchema 死字段 99 行删除完成 (备份: .hermes/_bak-faqschema-del-20261019)")
