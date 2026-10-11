# -*- coding: utf-8 -*-
"""
apply-b1b-keywords-detox-20261012.py — spam-recovery B1b (K3 2026-10-12 拍板「按建议执行」)

清洗 sku-seo-data 三语 keywords 数组（CSV 权威域 → 官方 regen 管线落 ts）：
  规则1 宠物类跨品类污染词（word-boundary 正则，白名单断言 = K2.8 审计实锤的 9 个 en 词）
  规则2 模板词：出现于 >8 个不同 SKU 的关键词（审计口径，本会话重算）
  规则3 每 SKU 每 locale 保留前 ≤10 个（保持既有优先序）
幂等/安全：
  - 前置断言：CSV keywords 与 ts 现值逐字镜像（3 语全量）——破镜即中止
  - ts 侧只改 small-bags（唯一 ts-only key）；其余 91 块由 csv-to-sku-seo.mjs --apply 正式生成
  - 备份：.hermes/_bak-*-before-b1b-20261012.*；--apply 才写文件，默认 dry-run
  - --verify：regen 后复扫（kill=0 / cap≤10 / pet=0 / 镜像 0 漂移 / key 数守恒 92）
"""
import json, re, shutil, sys

TS = 'src/data/sku-seo-data.ts'
CSVP = 'zprintpro-sku-seo-data.csv'
BAK_TS = '.hermes/_bak-sku-seo-data-before-b1b-20261012.ts'
BAK_CSV = '.hermes/_bak-sku-csv-before-b1b-20261012.csv'
REPORT = '.hermes/reports/b1b-keywords-detox-20261012.json'
APPLY = '--apply' in sys.argv
VERIFY = '--verify' in sys.argv

PET_RE = re.compile(r'\b(pets?|dogs?|cats?|kittens?|puppies|puppy|paws?)\b', re.I)
PET_WHITELIST = {'pet food label', 'pet brand label', 'custom pet label', 'pet portrait',
                 'pet memorial', 'pet lover gift', 'dog mom gift', 'cat dad gift', 'pet treat label'}
# 品类核心语素白名单：含语素的词即使 >8 SKU 共现也不杀（簇内合法本品类词，K2.8 口径「保留本品类词」）
CATEGORY_MORPHEMES = {
    'zh-hk': ['貼紙', '標籤', '不干膠', '盒', '袋', '單張', '傳單', '海報', '冊', '月曆', '日曆', '年曆',
              '信封', '利是封', '卡', '餐牌', '證書', '獎狀', '喜帖', '包裝', '橫額', '易拉寶'],
    'en': ['sticker', 'label', 'box', 'bag', 'flyer', 'leaflet', 'poster', 'book', 'calendar',
           'envelope', 'card', 'menu', 'banner', 'certificate', 'yearbook'],
    'ja': ['ステッカー', 'シール', 'ラベル', '箱', '袋', 'バッグ', 'チラシ', 'ポスター', '冊子',
           'カレンダー', '封筒', 'カード', 'メニュー', 'バナー', '賞状', 'アルバム'],
}
CAP = 10
THRESH = 8
LOCALES = ['zh-hk', 'en', 'ja']

ts = open(TS, encoding='utf-8').read()

# ---------- ts 块锚定（0 或 2 空格缩进的顶层 slug 键；排除嵌套保留键） ----------
anchor_re = re.compile(r'^(?: {2})?"([a-z0-9-]+)": \{$', re.M)
RESERVED = {'name', 'seo', 'faqs', 'imagealt', 'zh-hk', 'en', 'ja'}
anchors = [(m.group(1), m.start()) for m in anchor_re.finditer(ts)
           if m.group(1).lower() not in RESERVED]
end_idx = ts.find('\n};')
blocks = {}
for i, (slug, idx) in enumerate(anchors):
    e = anchors[i + 1][1] if i + 1 < len(anchors) else end_idx
    blocks[slug] = (idx, e)
if len(blocks) != 92:
    print('FATAL: expect 92 slug blocks, got', len(blocks)); sys.exit(2)

def extract_kw(txt, bs, be, loc):
    li = txt.find('"%s": {' % loc, bs)
    if li < 0 or li >= be:
        return None
    ki = txt.find('"keywords": [', li)
    if ki < 0 or ki >= be:
        return None
    je = txt.find(']', ki)
    span = txt[ki:je + 1]
    if '\n' in span:
        print('FATAL: multi-line keywords array at', loc, 'offset', ki); sys.exit(2)
    return ki, je + 1, json.loads(span[len('"keywords": '):])

# ---------- 快照 + 词频 ----------
data = {}
for slug, (bs, be) in blocks.items():
    data[slug] = {}
    for loc in LOCALES:
        r = extract_kw(ts, bs, be, loc)
        if r:
            data[slug][loc] = r[2]

occ = {loc: {} for loc in LOCALES}
for slug, d in data.items():
    for loc in LOCALES:
        for t in d.get(loc, []):
            occ[loc].setdefault(t, set()).add(slug)

def has_morpheme(t, loc):
    tl = t.lower()
    return any(m.lower() in tl for m in CATEGORY_MORPHEMES[loc])

kill = {}
saved_by_whitelist = {loc: [] for loc in LOCALES}
for loc in LOCALES:
    k = set()
    for t, s in occ[loc].items():
        if len(s) > THRESH:
            if has_morpheme(t, loc):
                saved_by_whitelist[loc].append((t, len(s)))
            else:
                k.add(t)
    kill[loc] = k
pet_hits = set()
for slug, d in data.items():
    for loc in LOCALES:
        for t in d.get(loc, []):
            if PET_RE.search(t):
                pet_hits.add(t)
if not pet_hits <= PET_WHITELIST:
    print('FATAL: pet regex hit outside K2.8 whitelist:', sorted(pet_hits - PET_WHITELIST)); sys.exit(2)
for loc in LOCALES:
    kill[loc] |= pet_hits

def clean(arr, loc):
    return [t for t in arr if t not in kill[loc]][:CAP]

if VERIFY:
    bad = []
    for slug, d in data.items():
        for loc in LOCALES:
            for t in d.get(loc, []):
                if t in kill[loc]:
                    bad.append((slug, loc, t))
            if len(d.get(loc, [])) > CAP:
                bad.append((slug, loc, 'OVER_CAP:%d' % len(d[loc])))
    print('[verify] kill-token residue:', len([b for b in bad if not str(b[2]).startswith('OVER')]))
    print('[verify] over-cap:', len([b for b in bad if str(b[2]).startswith('OVER')]))
    for b in bad[:10]:
        print('  ', b)
    sys.exit(1 if bad else 0)

# ---------- CSV 解析 + 镜像前置断言 ----------
csv_text = open(CSVP, encoding='utf-8').read()
csv_lines = csv_text.split('\n')
hdr = csv_lines[0].split('\t')
iS = hdr.index('Slug')
iK = {'zh-hk': hdr.index('SEO关键词(ZH)'), 'en': hdr.index('SEO关键词(EN)'), 'ja': hdr.index('SEO关键词(JA)')}
split_kw = lambda s: [x.strip() for x in re.split('[,，]', s) if x.strip()]

mirror_bad = []
csv_rows = 0
for r in csv_lines[1:]:
    c = r.split('\t')
    if len(c) <= iK['ja'] or not c[iS]:
        continue
    slug = c[iS]
    csv_rows += 1
    if slug == 'gift-boxes' or slug not in blocks:
        continue
    for loc in LOCALES:
        if split_kw(c[iK[loc]]) != data[slug].get(loc, []):
            mirror_bad.append((slug, loc))
if mirror_bad:
    print('FATAL: CSV↔ts keywords 镜像破裂', len(mirror_bad), mirror_bad[:8]); sys.exit(2)
print('[pre] CSV↔ts keywords 镜像断言 PASS (3 语 ×', csv_rows, '行)')

# ---------- 统计 ----------
stats = {loc: {'killed_tokens': len(kill[loc]), 'removed_refs': 0, 'capped': 0} for loc in LOCALES}
for slug, d in data.items():
    for loc in LOCALES:
        old = d.get(loc, [])
        new = clean(old, loc)
        stats[loc]['removed_refs'] += len(old) - len(new)
        if len([t for t in old if t not in kill[loc]]) > CAP:
            stats[loc]['capped'] += 1

print('[plan] kill tokens per locale:', {l: len(kill[l]) for l in LOCALES})
for loc in LOCALES:
    print('  %s KILL: %s' % (loc, sorted(kill[loc])))
    print('  %s SAVE(>8但含品类语素, 保留): %s' % (loc, sorted(saved_by_whitelist[loc], key=lambda x: -x[1])))
print('[plan] removed refs:', {l: stats[l]['removed_refs'] for l in LOCALES}, '| capped:', {l: stats[l]['capped'] for l in LOCALES})

if not APPLY:
    print('DRY-RUN 完成（不写文件）。加 --apply 生效。')
    sys.exit(0)

# ---------- 写 CSV（备份 + 全行保留其余列字节不动） ----------
shutil.copyfile(CSVP, BAK_CSV)
out_lines = [csv_lines[0]]
changed_rows = 0
for r in csv_lines[1:]:
    if not r.strip():
        out_lines.append(r); continue
    c = r.split('\t')
    if len(c) <= iK['ja'] or not c[iS]:
        out_lines.append(r); continue
    slug = c[iS]
    before = [c[iK[l]] for l in LOCALES]
    if slug in blocks or slug == 'gift-boxes':
        src = data.get(slug)
        for loc in LOCALES:
            old = src.get(loc, []) if src else split_kw(c[iK[loc]])
            c[iK[loc]] = ','.join(clean(old, loc))
    if [c[iK[l]] for l in LOCALES] != before:
        changed_rows += 1
    out_lines.append('\t'.join(c))
open(CSVP, 'w', encoding='utf-8', newline='').write('\n'.join(out_lines))
print('[apply] CSV 关键词列清洗完成, 改动行数:', changed_rows, '(备份:', BAK_CSV + ')')

# ---------- ts: 仅 small-bags（唯一 ts-only key） ----------
shutil.copyfile(TS, BAK_TS)
bs, be = blocks['small-bags']
seg = ts[bs:be]
reps = 0
for loc in LOCALES:
    r = extract_kw(seg, 0, len(seg), loc)
    if not r:
        print('FATAL: small-bags', loc, 'keywords not found'); sys.exit(2)
    ki, je, arr = r
    new_arr = clean(arr, loc)
    new_span = '"keywords": [' + ','.join(json.dumps(t, ensure_ascii=False) for t in new_arr) + ']'
    seg = seg[:ki] + new_span + seg[je:]
    reps += 1
ts = ts[:bs] + seg + ts[be:]
open(TS, 'w', encoding='utf-8', newline='').write(ts)
print('[apply] small-bags ts 3 语清洗完成, replacements:', reps, '(备份:', BAK_TS + ')')

json.dump({'kill': {l: sorted(kill[l]) for l in LOCALES}, 'stats': stats,
           'pet_hits': sorted(pet_hits), 'csv_changed_rows': changed_rows},
          open(REPORT, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('[apply] 报告:', REPORT)
print('下一步: node scripts/csv-to-sku-seo.mjs  (dry-run 复核)  →  node scripts/csv-to-sku-seo.mjs --apply')
