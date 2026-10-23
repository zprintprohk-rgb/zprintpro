# -*- coding: utf-8 -*-
# cluster manifest generator for number-redaction residue (K3 x13 option C execution-ready)
# per occurrence: context, sibling alignment, candidate numbers, products.ts anchor check, suggested action
import json, re, io, sys
from collections import Counter, defaultdict
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = r'F:\zprintpro-nextjs'
data = {loc: json.load(open(rf'{ROOT}\src\data\blog-data\{loc}.json', encoding='utf-8')) for loc in ['zh-hk', 'en', 'ja']}
products_text = open(rf'{ROOT}\src\data\products.ts', encoding='utf-8').read()
products_norm = products_text.replace(',', '')

TARGETS = [
    ('ja', '多個'), ('ja', '多年件'), ('zh-hk', '多年件'),
]
SIBLINGS = {'ja': ['en', 'zh-hk'], 'zh-hk': ['en', 'ja'], 'en': ['ja', 'zh-hk']}

def walk_strings(o, path, acc):
    if isinstance(o, dict):
        for k, v in o.items():
            walk_strings(v, path + [k], acc)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk_strings(v, path + [str(i)], acc)
    elif isinstance(o, str):
        acc.append(('.'.join(path), o))

def numerals(s):
    return re.findall(r'[0-9][0-9,\.]*', s)

def align(sib_text, nums):
    """find sibling window maximizing shared numerals (len>=2) + % / currency proximity"""
    best, best_score = None, -1
    for n in set(nums):
        if len(n.replace(',', '')) < 2:
            continue
        for m in re.finditer(re.escape(n), sib_text):
            ctx = sib_text[max(0, m.start()-110):m.end()+110]
            sc = sum(1 for x in set(nums) if x in ctx) * 10
            if '%' in ctx: sc += 3
            if '$' in ctx or '¥' in ctx or 'HK$' in ctx: sc += 2
            if sc > best_score:
                best, best_score = ctx, sc
    return best, best_score

manifest = []
for loc, tok in TARGETS:
    for slug, post in data[loc].items():
        acc = []
        walk_strings(post, [slug], acc)
        for path, s in acc:
            for m in re.finditer(re.escape(tok), s):
                ctx = s[max(0, m.start()-90):m.end()+90].replace('\n', ' ')
                nums = numerals(ctx)
                entry = {'loc': loc, 'slug': slug, 'field': path.split('.')[1] if '.' in path else path,
                         'token': tok, 'context': ctx, 'ja_nums': nums}
                # sibling alignment (en first)
                sib_hit, sib_ctx, sib_loc = False, None, None
                for sb in SIBLINGS[loc]:
                    sp = data[sb].get(slug)
                    if not sp:
                        continue
                    sib_text = json.dumps(sp, ensure_ascii=False)
                    cand, score = align(sib_text, nums)
                    if cand and score >= 12:
                        sib_hit, sib_ctx, sib_loc = True, cand, sb
                        break
                entry['sibling'] = sib_loc
                entry['sibling_context'] = sib_ctx
                # candidate restore numbers: numerals in sibling context NOT present in ja context
                if sib_ctx:
                    sib_nums = [n for n in numerals(sib_ctx) if n not in nums]
                    entry['candidate_numbers'] = sib_nums[:6]
                    anchored = []
                    for n in sib_nums:
                        nn = n.replace(',', '')
                        if len(nn) >= 2 and (n in products_text or nn in products_norm):
                            anchored.append(n)
                    entry['products_ts_anchored'] = anchored
                    if anchored:
                        entry['suggest'] = 'restore:' + '|'.join(anchored[:2])
                    else:
                        entry['suggest'] = 'k3-choose(restore ' + '|'.join(sib_nums[:2]) + ' | vague)'
                else:
                    entry['candidate_numbers'] = []
                    entry['products_ts_anchored'] = []
                    entry['suggest'] = 'manual-no-alignment'
                manifest.append(entry)

by_action = Counter(e['suggest'].split('(')[0] for e in manifest)
by_loc = Counter(f"{e['loc']}:{e['token']}" for e in manifest)
noalign = [e for e in manifest if e['suggest'] == 'manual-no-alignment']

json.dump(manifest, open(rf'{ROOT}\.hermes\number-redaction-manifest-2026-10-23.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('total occurrences:', len(manifest))
print('by locale:token:', dict(by_loc))
print('by action:', dict(by_action))
print('no-alignment:', len(noalign))
for e in noalign[:10]:
    print('  NOALIGN', e['loc'], e['slug'], e['token'], '::', e['context'][:70])
anch = [e for e in manifest if e['suggest'].startswith('restore:')]
print('anchored restores:', len(anch))
for e in anch[:8]:
    print('  ANCH', e['loc'], e['slug'], e['suggest'], '::', e['context'][:60])
