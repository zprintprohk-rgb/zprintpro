import importlib.util
import sys

spec = importlib.util.spec_from_file_location("gen_v24", r"F:\zprintpro-nextjs\.hermes\k3-inbox\gen_v24.py")
gv = importlib.util.module_from_spec(spec)
sys.modules['gen_v24'] = gv
spec.loader.exec_module(gv)

skus = gv.parse_skus()
sku = skus['PKG-014']
p = gv.build_prompt(sku, 'HERO', 'zh-hk')
sys.stdout.write('=== zh-hk PKG-014 HERO ===\n')
sys.stdout.write(p)
sys.stdout.write('\n')
