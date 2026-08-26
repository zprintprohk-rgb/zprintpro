"""
修正 line 405 (ja kw) 和 line 410 (ja desc) - 被脚本错误地写成 ja title
"""
import sys
PATH = r'F:\zprintpro-nextjs\src\lib\seo.ts'
with open(PATH, 'rb') as f:
    src = f.read().decode('utf-8')
lines = src.split('\n')
sys.stdout.reconfigure(encoding='utf-8')

# Line 405 = packaging ja keywords (should be csv list)
# Line 410 = packaging ja descriptions (should be long sentence)
lines[404] = "      ja: 'パッケージ箱印刷,オリジナルパッケージ,紙箱印刷,化粧箱,ギフトボックス,構造設計,箔押しパッケージ,小ロットパッケージ,ブランドパッケージ,EC パッケージ,化粧品パッケージ,食品パッケージ,食品対応パッケージ,日本全国,短納期',"
lines[409] = "      ja: 'パッケージ箱印刷 100 個から、¥120〜。食品対応 / 化粧品 / 茶 / 電子機器向け、構造設計・箔押し・UV・マット/光沢・内装・窓開け。無料 3D 校正 6 時間、日本全国 DHL 2-4 日配送、沖縄・北海道対応。30 秒 AI 無料見積もり、ISO 9001 認証品質。',"

new_src = '\n'.join(lines)
with open(PATH, 'wb') as f:
    f.write(new_src.encode('utf-8'))

print('✅ Line 405 (ja kw) + Line 410 (ja desc) 修正完成')
