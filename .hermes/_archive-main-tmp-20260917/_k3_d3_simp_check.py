"""D3 婚礼 zh-hk 严格 简独有字残留 check (繁简同形不算)"""
import json
import re
from pathlib import Path

zh = json.loads(Path(r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json').read_text(encoding='utf-8'))
content = zh['wedding-invitation-pricing-guide']['content']

# 严格 简独有 (繁简同形不算)
simp_only = {
    '贴': '貼', '纸': '紙', '样': '樣', '复': '複/復', '证': '證', '质': '質',
    '实': '實', '当': '當', '严': '嚴', '种': '種', '产': '產', '张': '張',
    '时': '時', '这': '這', '过': '過', '满': '滿', '应': '應', '对': '對',
    '们': '們', '党': '黨', '学': '學', '习': '習', '开': '開', '关': '關',
    '总': '總', '经': '經', '会': '會', '议': '議', '国': '國', '华': '華',
    '语': '語', '请': '請', '让': '讓', '选': '選', '择': '擇', '单': '單',
    '击': '擊', '链': '鏈', '显': '顯', '页': '頁', '统': '統', '计': '計',
    '结': '結', '设': '設', '风': '風', '险': '險', '预': '預', '报': '報',
    '档': '檔', '码': '碼',
}

violations = []
for s, t in simp_only.items():
    idx = 0
    while True:
        idx = content.find(s, idx)
        if idx == -1: break
        # 跳过 HTML tag 内的 class
        ctx_before = content[max(0, idx-50):idx]
        ctx_after = content[idx:idx+50]
        if 'class="' in ctx_before and 'class="' in ctx_after:
            # 可能在 class="" 内部
            pass
        # 跳过纯 CSS class (class="border p-2 text-left">xxx<)
        if re.match(r'[a-z\-]+\s*\">', content[max(0,idx-30):idx]):
            idx += 1
            continue
        violations.append((s, t, idx, content[max(0,idx-20):idx+20]))
        idx += 1

if violations:
    print(f"❌ {len(violations)} 处真简体字残留:")
    for s, t, idx, ctx in violations[:20]:
        print(f"  {s}→{t} @ {idx}: ...{ctx}...")
else:
    print("✅ zh-hk content 0 真简体字残留 (繁简同形字接/示/面/配/文/工/果/置 不算)")
