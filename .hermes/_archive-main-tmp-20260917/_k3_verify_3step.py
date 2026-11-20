# -*- coding: utf-8 -*-
# §0.7 production smoke 3 步 + §0.17 npm run build (K3 8/8 15:35)
import subprocess, sys, os, time
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
print('=== 1. encoding check ===')
r = subprocess.run(['node', 'scripts/check-encoding.js'], capture_output=True, text=True, env=env)
print('STDOUT:', r.stdout[-500:] if r.stdout else '')
print('STDERR:', r.stderr[-500:] if r.stderr else '')
print('rc:', r.returncode)
print()
print('=== 2. tsc noEmit ===')
r = subprocess.run(['npx', 'tsc', '--noEmit'], capture_output=True, text=True, env=env, timeout=180)
print('STDOUT last 1000:', r.stdout[-1000:] if r.stdout else '')
print('STDERR last 500:', r.stderr[-500:] if r.stderr else '')
print('rc:', r.returncode)
