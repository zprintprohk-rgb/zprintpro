"""
修正 envelopes en + ja title/keywords/desc (zh-hk 已 OK)
"""
import sys
PATH = r'F:\zprintpro-nextjs\src\lib\seo.ts'
with open(PATH, 'rb') as f:
    raw = f.read()
src = raw.decode('utf-8')
lines = src.split('\n')
sys.stdout.reconfigure(encoding='utf-8')

# Find envelopes block - all 3 locale for titles/keywords/descriptions
# We need to replace line 490 (en title), 491 (ja title), 495 (en kw), 496 (ja kw), 500/501 (en/ja desc)
# Let me use full line replacement for each

# Title line 490: en title (OLD = "      en: 'Custom Envelopes Free Shipping · 100 MOQ Kraft/Window/Corporate Logo | ZprintPro',")
lines[489] = "      en: 'C4 / C5 / DL Envelopes from $0.06 | 100 MOQ + Free Proof + Made for USA | ZprintPro',"
# Title line 491: ja title
lines[490] = "      ja: '長3 / 洋形 封筒印刷 ¥8〜 | 100個〜・無料デザイン・短納期・全国送料 | ZprintPro',"
# Keywords line 495: en kw
lines[494] = "      en: 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C5 envelope,C4 envelope,airmail envelope,printing envelopes,business envelopes,free shipping envelopes,USA envelope printing,Made for USA,Free Proof',"
# Keywords line 496: ja kw
lines[495] = "      ja: '封筒印刷,カスタム封筒,クラフト封筒,窓付き封筒,カラー封筒,企業封筒,ロゴ封筒,長3封筒,洋形封筒,エアメール封筒,印刷封筒,社名入り封筒,C4封筒,C5封筒,短納期,日本全国',"
# Description - find en and ja in envelopes desc block (line 500-501 region)
# Line 500 (en desc OLD): "      en: 'Custom envelope printing 100 MOQ. Kraft / window / colored / DL / C5 + corporate branding..."
# Line 501 (ja desc OLD): "      ja: '封筒印刷 100 個から対応. クラフト・窓付き・カラー・長 3・洋形 + 企業ロゴ. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',"
lines[500] = "      en: 'Custom envelope printing 100 MOQ. C4 / C5 / DL / kraft / window / colored / corporate branding. Free shipping over $99 to USA + free proof in 4 hours. ISO 9001 certified + 30-second AI quote + DHL 2-4 day global delivery. Made for USA, perfect for business and corporate use.',"
lines[501] = "      ja: '封筒印刷 100 個から、¥8〜。長3 / 洋形 / C4 / C5 / クラフト / 窓付き / カラー / 企業ロゴ。無料デザイン校正 4 時間、ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日。',"

new_src = '\n'.join(lines)
with open(PATH, 'wb') as f:
    f.write(new_src.encode('utf-8'))

print('✅ envelopes en + ja 6 行修正完成')
print('   - line 490 en title')
print('   - line 491 ja title')
print('   - line 495 en keywords')
print('   - line 496 ja keywords')
print('   - line 501 en desc')
print('   - line 502 ja desc')
