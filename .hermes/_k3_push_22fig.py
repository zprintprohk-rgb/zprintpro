# -*- coding: utf-8 -*-
import subprocess, os, time
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
t0 = time.time()
r = subprocess.run(['git', 'push', 'origin_ssh', 'main'], capture_output=True, text=True, env=env, timeout=60)
elapsed = time.time() - t0
print('push rc:', r.returncode)
print('STDOUT:', r.stdout)
print('STDERR last 500:', r.stderr[-500:] if r.stderr else '')
print('elapsed: {0:.1f}s'.format(elapsed))
print()
r = subprocess.run(['git', 'status', '-sb'], capture_output=True, text=True, env=env)
print('git status:')
print(r.stdout)
