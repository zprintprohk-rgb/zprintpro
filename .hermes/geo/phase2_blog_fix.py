# -*- coding: utf-8 -*-
# blog JSON 注入修复版 v2：从备份恢复 + JSON 转义插入 + 双解析器校验 + 全程打印
import io, json, os, re, shutil, subprocess

ROOT = r"F:\zprintpro-nextjs"
BJ = os.path.join(ROOT, "src", "data", "blog-data", "zh-hk.json")
BAK = os.path.join(ROOT, ".hermes", "geo", "bak-phase2", "zh-hk.json.bak")

assert os.path.exists(BAK), "backup missing"
shutil.copy2(BAK, BJ)
print("restored from backup")

raw = """<h3>食品級包裝紙材對比（白卡紙 vs 牛皮紙 vs 特種紙）</h3>
<table>
  <thead><tr><th>紙材</th><th>防油性</th><th>可降解性</th><th>食品接觸適用</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>白卡紙（食品級淋膜）</td><td>淋膜後防油</td><td>視淋膜類型</td><td>乾性/半濕食品</td><td>蛋糕盒、茶葉禮盒、月餅盒</td></tr>
    <tr class="border-b border-gray-200"><td>牛皮紙</td><td>原生漿本質耐油較佳</td><td>優（可配水性塗層）</td><td>乾性食品、烘焙</td><td>外賣袋、麵包袋、餐盒</td></tr>
    <tr><td>特種紙（牛油紙/玻璃紙）</td><td>本質防油</td><td>優</td><td>直接接觸適用</td><td>糖果內襯、酥點墊紙</td></tr>
  </tbody>
</table>
<p>揀紙貼士：直接接觸食品嘅內襯優先考慮牛油紙或食品級白卡；外層禮盒用白卡淋膜兼顧挺度同印刷效果。出口歐盟市場記得確認包材符合 EU 1935/2004 食品接觸材料框架要求，美國市場對應 FDA 21 CFR。</p>
<details class="my-2"><summary><strong>牛皮紙包裝可以直接接觸食物嗎？</strong></summary><p>未經處理的原生牛皮紙可以用於乾性食品（麵包、三文治紙袋），但如果係高油或高濕食品，建議加食品級水性塗層或者改用淋膜白卡，並確認供應商提供食品接觸合規聲明。</p></details>
<details class="my-2"><summary><strong>淋膜同可降解有衝突嗎？</strong></summary><p>傳統 PE 淋膜較難降解，而家主流做法係用 PLA（聚乳酸）或者水性淋膜替代，兼顧防油同可堆肥性；落單前同印刷廠確認淋膜類型同當地回收規則。</p></details>
"""

esc = raw.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')

with io.open(BJ, 'r', encoding='utf-8') as f:
    t = f.read()

m0 = re.search(r'"food-packaging-printing-guide"\s*:\s*\{', t)
assert m0, "entry key pattern not found"
i0 = m0.start()
# 顶层键边界：条目结束后下一个 `\n  "` 形态（2 空格缩进顶层键）
m1 = re.search(r'\n  "', t[m0.end():])
seg_end = m0.end() + m1.start() if m1 else len(t)
seg = t[i0:seg_end]
print('i0=', i0, 'seg_end=', seg_end, 'seg len=', len(seg))

A2 = '三地認證有咩分別'
n2 = seg.count(A2)
print('anchor count in seg =', n2)
assert n2 == 1, "anchor count=%d" % n2
cert_idx = seg.find(A2)
h2i = seg.rfind('<h2', 0, cert_idx)
print('cert_idx=', cert_idx, 'h2i=', h2i)
assert h2i > 0

new_seg = seg[:h2i] + esc + seg[h2i:]
t_new = t[:i0] + new_seg + t[seg_end:]

with io.open(BJ, 'w', encoding='utf-8', newline='') as f:
    f.write(t_new)

j = json.loads(io.open(BJ, encoding='utf-8').read())
c = j['food-packaging-printing-guide']['content']
assert '食品級包裝紙材對比' in c and c.count('<details') >= 2 and c.count('<table') >= 4
r = subprocess.run(['node', '-e', 'JSON.parse(require("fs").readFileSync("src/data/blog-data/zh-hk.json","utf8")); console.log("node-parse-OK")'],
                   cwd=ROOT, capture_output=True, text=True)
assert 'node-parse-OK' in r.stdout, r.stdout + r.stderr
print("tables:", c.count('<table'), "| details:", c.count('<details'))
print("FIX OK")
