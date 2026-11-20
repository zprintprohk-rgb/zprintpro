# -*- coding: utf-8 -*-
"""Step 2: Add 3 new categories to categorySeoData + categorySeoContent.
Targets: greeting-cards + wedding-invitations + place-cards (per K3 8/17 05:32 §11 战略豁免)."""
import os
import re

BASE = r"F:\zprintpro-nextjs\src"

# === 1. seo.ts: add 3 entries to categorySeoData (before the closing `};` at line 585) ===
SEO_FILE = os.path.join(BASE, "lib", "seo.ts")
with open(SEO_FILE, 'r', encoding='utf-8') as f:
    seo = f.read()

NEW_ENTRIES = '''  'greeting-cards': {
    // 2026-08-17 K3 §11 业务子类目豁免: 咭片/名片 归并到 greeting-cards
    // 全球市场 $20B+ (Grand View/Ken Research 2025), US 70B 张/年, 90% 家庭买
    titles: {
      'zh-hk': '賀卡印刷 · 100 張起印 · 3D 立體爆款 · 順豐本地滿 HK$500 免費',
      en: 'Greeting Card Printing from $0.50 | 3D Pop-up Available | 100 MOQ + Free Proof | ZprintPro',
      ja: 'グリーティングカード印刷 · 100枚から · 立体 3D 対応 | ZprintPro',
    },
    keywords: {
      'zh-hk': '賀卡印刷,生日卡印刷,節日賀卡,感謝卡印刷,邀請卡印刷,商業賀卡,立體賀卡,3D 賀卡,客製化賀卡,訂製賀卡,聖誕卡,情人節卡,母親節卡,父親節卡',
      en: 'greeting card printing,custom greeting cards,birthday card printing,thank you cards,holiday cards,3D pop up card,custom card printing,FSC certified card stock,foil stamped greeting cards,event invitation cards,corporate greeting cards,print on demand cards,USA small business cards',
      ja: 'グリーティングカード印刷,オーダー カード,誕生日カード印刷,サンキュカード,ホリデーカード,立体 3D カード,カスタム カード,箔押しカード,FSC 認証カード,オリジナル カード,イベント招待状,法人向け グリーティングカード',
    },
    descriptions: {
      'zh-hk': '賀卡印刷 100 張起印. 節日 / 生日 / 感謝 / 邀請 / 商業 / 立體 3D 賀卡 + 燙金 / UV / 模切 工藝. 順豐本地滿 HK$500 免費 + DHL 全球 2-4 天配送 + FSC 認證紙 + 30 秒 AI 即時報價.',
      en: 'Greeting card printing from $0.50 / 100 MOQ. Holiday / birthday / thank you / invitation / corporate / 3D pop-up cards + foil stamping / UV / die-cut finishes. Free shipping over $99 to USA. FSC certified + 30-second AI quote + DHL 2-4 day global. Free proof in 4 hours · 100% satisfaction guarantee.',
      ja: 'グリーティングカード印刷 100枚から. 节日・誕生日・サンキュ・招待状・法人向け・立体 3D カード + 箔押し・UV・拔型加工. DHL 国際配送 2-4 日 + FSC 認証 + 30 秒 AI 見積.',
    },
  },
  'wedding-invitations': {
    // 2026-08-17 K3 §11 业务子类目豁免: 喜帖 归并到 wedding-invitations
    // 全球婚礼印刷市场 $13B+ (Bonafide 2025), 喜帖 $4.29B CAGR 6.3%
    titles: {
      'zh-hk': '喜帖印刷 · 整套婚慶配套 · 燙金 UV 工艺 · 100 套起印',
      en: 'Wedding Invitation Printing from $1.20 | Foil/UV Finish | 50 Sets MOQ | ZprintPro',
      ja: '結婚式招待状印刷 · 50セットから · 箔押し/UV 仕上げ | ZprintPro',
    },
    keywords: {
      'zh-hk': '喜帖印刷,婚禮喜帖,結婚請帖,燙金喜帖,UV 喜帖,Save the Date,答謝卡,婚慶節目單,婚慶菜單,婚慶整套,客製喜帖,訂製喜帖,中式喜帖,西式喜帖',
      en: 'wedding invitation printing,custom wedding invitations,foil stamped invitations,Save the Date cards,wedding thank you cards,wedding program printing,wedding menu cards,wedding suite printing,letterpress wedding,FSC wedding cards,destination wedding invitations,USA wedding printing',
      ja: '結婚式招待状印刷,オーダー 招待状,箔押し招待状,Save the Date,サンキュカード,結婚式のしおり,ウエディング メニュー,結婚 セット,オリジナル 招待状,オリジナル ウエディング',
    },
    descriptions: {
      'zh-hk': '喜帖印刷 100 套起印. 燙金 / UV / 雕凹 / 模切 工艺 + Save the Date + 答謝卡 + 婚慶節目單 + 婚慶菜單 + 整套配套. 順豐本地 + DHL 全球 + FSC 認證 + 30 秒 AI 即時報價.',
      en: 'Wedding invitation printing from $1.20 / 50 sets MOQ. Foil / UV / letterpress / die-cut finishes + Save the Date + thank you cards + programs + menus + full suite. Free shipping over $99 to USA. FSC certified + 30-second AI quote + DHL 2-4 day global.',
      ja: '結婚式招待状印刷 50セットから. 箔押し・UV・活版・拔型仕上げ + Save the Date + サンキュカード + 結婚式のしおり + ウエディング メニュー + フル セット. DHL 国際配送 + FSC 認証 + 30 秒 AI 見積.',
    },
  },
  'place-cards': {
    // 2026-08-17 K3 §11 业务子类目豁免: 酒水牌 / 名牌卡 归并到 place-cards
    // 婚宴台卡 $123M (6.98% of Wedding Stationery $1.76B 2025), 跨 婚庆 + 餐饮 + 商务 场景
    titles: {
      'zh-hk': '台卡 / 酒水牌 / 座位卡印刷 · 50 張起印 · 燙金 / 壓紋',
      en: 'Place Card / Drink Token Printing from $0.30 | 50 MOQ + Foil/Embossing | ZprintPro',
      ja: '席札 / ドリンクトークン印刷 · 50枚から · 箔押し/エンボス | ZprintPro',
    },
    keywords: {
      'zh-hk': '台卡印刷,酒水牌印刷,座位卡印刷,名牌卡印刷,席位圖,婚宴台卡,餐廳台卡,咖啡廳台卡,會議名牌,展會名牌,客製台卡,燙金台卡,壓紋台卡,FSC 認證台卡',
      en: 'place card printing,drink token printing,escort card printing,name tag printing,table card printing,seating chart,wedding place cards,restaurant table cards,café table cards,name badge printing,event badge,custom place cards,foil stamped place cards,FSC certified place cards',
      ja: '席札印刷,ドリンクトークン印刷,エスコートカード印刷,名札印刷,テーブルカード印刷,座席表,ウエディング席札,レストラン席札,カフェ席札,イベント名札,オリジナル 席札,箔押し 席札,FSC 認証 席札',
    },
    descriptions: {
      'zh-hk': '台卡 / 酒水牌 / 座位卡 / 名牌卡 印刷 50 張起印. 婚宴 + 餐廳 + 咖啡廳 + 會議 + 展會 全場景覆蓋. 燙金 / 壓紋 / 模切 工艺 + 順豐本地 + DHL 全球 + FSC 認證 + 30 秒 AI 即時報價.',
      en: 'Place card / drink token / escort card / name tag printing from $0.30 / 50 MOQ. Wedding + restaurant + café + conference + event full-scenario coverage. Foil / embossing / die-cut finishes + Free shipping over $99 to USA + FSC certified + 30-second AI quote + DHL 2-4 day global.',
      ja: '席札 / ドリンクトークン / エスコートカード / 名札 印刷 50枚から. ウエディング + レストラン + カフェ + 会議 + イベント 全場面カバー. 箔押し・エンボス・拔型 + DHL 国際配送 + FSC 認証 + 30 秒 AI 見積.',
    },
  },
'''

# Find the last `}` before the closing `};` of the categorySeoData block
# Pattern: replace the closing `},` of the last entry with `},\n  'greeting-cards': { ... },\n`
# The last entry is 'educational' per the read above (line 575)
# Insert before the closing `};` on line 585

# Find: ',\n};\n' (the closing of categorySeoData)
match = re.search(r'\n\};\s*\n', seo[seo.find('categorySeoData:'):])
if not match:
    # Try with educational being the last
    pos = seo.rfind('  },\n};')
    if pos != -1:
        # Insert NEW_ENTRIES before `};`
        new_seo = seo[:pos+4] + NEW_ENTRIES + seo[pos+4:]
    else:
        raise Exception("Could not find categorySeoData closing")
else:
    abs_pos = seo.find('categorySeoData:') + match.start() + 1
    new_seo = seo[:abs_pos] + NEW_ENTRIES + seo[abs_pos:]

# Write back
with open(SEO_FILE, 'w', encoding='utf-8') as f:
    f.write(new_seo)

print(f"Updated {SEO_FILE}")
print(f"Old size: {len(seo)}, New size: {len(new_seo)}")
print(f"Added {len(NEW_ENTRIES)} bytes")
