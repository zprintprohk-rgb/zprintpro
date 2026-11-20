# -*- coding: utf-8 -*-
# 铁证: 现网 red-packets 文件到底是哪一代? 三方对账 = git v28.6 commit (39f3d8d3) vs 现网工作区 vs v28_5 源 vs v28_6 samples
import subprocess, hashlib, io
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
DST = ROOT / 'public/images/products/seedream-webp'
SRC = ROOT / 'zprintpro-en-us-images/v28_5_webp'
SAMPLES = ROOT / 'zprintpro-en-us-images/v28_6_no_badge_samples'

def sha_b(b): return hashlib.sha256(b).hexdigest()[:16]
def sha_p(p): return sha_b(p.read_bytes())

def git_blob(commit, path):
    r = subprocess.run(['git', 'show', '%s:%s' % (commit, path)], capture_output=True)
    return r.stdout if r.returncode == 0 else None

targets = [
 ('foil-red-packets', 'zprintpro-red-packets-foil-red-packets-zh-hk.webp', 'RP-001', 'zprintpro-red-packets-foil-red-packets-zh-hk-hero.webp'),
 ('foil-red-packets', 'zprintpro-red-packets-foil-red-packets-en.webp', 'RP-001', 'zprintpro-red-packets-foil-red-packets-en-hero.webp'),
 ('custom-red-packets', 'zprintpro-red-packets-custom-red-packets-zh-hk.webp', 'RP-003', 'zprintpro-red-packets-custom-red-packets-zh-hk-hero.webp'),
 ('cartoon-red-packets', 'zprintpro-red-packets-cartoon-red-packets-ja.webp', 'RP-004', 'zprintpro-red-packets-cartoon-red-packets-ja-hero.webp'),
]
print('%-22s %-56s %-6s %-6s %-6s' % ('slug', 'file', 'cur', 'v28.6c', 'v28.5'))
for slug, f, d, sf in targets:
    cur = DST / f
    rel = 'public/images/products/seedream-webp/' + f
    b = git_blob('39f3d8d3', rel)
    v6c = sha_b(b) if b else 'absent'
    v5 = sha_p(SRC / d / sf) if (SRC / d / sf).exists() else 'absent'
    print('%-22s %-56s %-6s %-6s %-6s' % (slug, f[:56], sha_p(cur), v6c, v5))

# HEAD (pre-my-batch) 版本对比 = 现网是否在 Batch B 前就是这些字节
b = git_blob('4c4cacbb^', 'public/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-zh-hk.webp')
print('\npre-BatchB HEAD blob sha =', sha_b(b) if b else 'absent')

# v28_6 samples 里有没有 red-packets
print('\nsamples dir:', [p.name for p in SAMPLES.glob('*')] if SAMPLES.exists() else 'MISSING')

# 更早 v28.6 相关 commit 全搜 (48 张无角标批)
r = subprocess.run(['git', 'log', '--oneline', '--all', '-3', '--', 'public/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-zh-hk.webp'], capture_output=True, text=True, encoding='utf-8', errors='replace')
print('\nfile history:\n', r.stdout)
