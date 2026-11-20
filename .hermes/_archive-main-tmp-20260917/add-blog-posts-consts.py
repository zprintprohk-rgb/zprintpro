"""
Add 3 new BlogPostMeta const blocks + append to blogPosts array in src/data/blog-posts.ts
3 new const blocks: lpReligiousCeremony / lpIndustrialNameplate / lpConstructionMaterialSampleBook
"""
from pathlib import Path

p = Path(r"F:\zprintpro-nextjs\src\data\blog-posts.ts")
content = p.read_text(encoding="utf-8")

# 3 const blocks to insert (after lpFoldingBoxCosmetics closing `};`)
new_consts = """
const lpReligiousCeremony: BlogPostMeta = {
  slug: 'religious-ceremony-printing-guide',
  categoryKey: 'wedding-envelope',
  source: 'daily',
  date: '2026-07-20',
  title: {
    'zh-hk': '香港宗教禮儀印刷指南 · 教堂寺廟殯儀禮盒感謝袋定制 | 智印雲 ZprintPro',
    en: 'Religious Ceremony Printing Guide: Custom Church / Temple / Memorial Boxes & Gift Bags | ZprintPro',
    ja: '宗教儀式印刷ガイド：教会・寺院・メモリアル ボックス＆ギフト バッグ カスタム | ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港教堂 / 佛寺 / 道觀 / 殯儀館宗教場地印刷完整攻略：1200g 灰板硬盒（聖餐盒 / 經文盒）+ 250g 銅版紙啞面（程序單）+ 350g 白卡紙（訃聞）+ 200g 牛油紙（經文）+ 牛皮紙禮袋（福袋）5 種材質對比，4 條場地負責人 FAQ，協助 50-500 套精準下單。',
    en: 'US religious organizations, churches, temples, synagogues, and funeral homes: 3 ceremony types, 5 material options (250g art paper / 1200g grayboard / 350g white card / 200g Vellum / kraft paper), 4 organization-leader FAQs, 50-500 sets, Free Shipping over $99 USA.',
    ja: '日本の宗教団体、教会、寺院、神社、葬儀場向け：3 つの儀式タイプ、5 種類素材（250g コート紙 / 1200g グレー ボード / 350g ホワイト カード / 200g ベラム / クラフト紙）、4 つの団体責任者 FAQ、50-500 セット、$99 以上で全国無料配送。',
  },
};

const lpIndustrialNameplate: BlogPostMeta = {
  slug: 'industrial-nameplate-printing-guide',
  categoryKey: 'creator-ip',
  source: 'daily',
  date: '2026-07-20',
  title: {
    'zh-hk': '工業設備銘牌 / GHS 危險標籤印刷指南 · UL 認證 + ANSI Z535 標準 | 智印雲 ZprintPro',
    en: 'Industrial Equipment Nameplate & GHS Hazard Label Printing Guide: UL Certified + ANSI Z535 Standard | ZprintPro',
    ja: '工業設備銘板 / GHS 危険ラベル印刷ガイド：UL 認証 + ANSI Z535 規格 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '工業 4.0 設備銘牌 / GHS 危險化學品標籤 / UL 認證銘板 / ANSI Z535 警示標籤完整攻略：5 種材質（聚酯 PET 50-100μm / 聚酰亞胺 PI 25-50μm / 陽極氧化鋁 ANODIZED / 不鏽鋼 SUS 304/316 / PVC 反光 + 螢光）+ 3M 9448A / VHB 4910 黏膠 + 4 條工業採購 FAQ。',
    en: 'US industrial equipment manufacturers, chemical plants, and machinery exporters: 5 nameplate materials (PET / Polyimide / Anodized Aluminum / Stainless Steel / PVC reflective), 3 certification standards (UL / GHS / ANSI Z535), 4 industrial procurement FAQs, 100-50,000 pieces, Free Shipping over $99 USA.',
    ja: '日本の工業設備メーカー、化学工場、機械輸出業者向け：5 種類の銘板素材（PET / ポリイミド / 陽極酸化アルミ / ステンレス鋼 / PVC 再帰反射）、3 つの認証規格（UL / GHS / ANSI Z535）、4 つの工業調達 FAQ、100-50,000 個小〜大ロット、$99 以上で全国無料配送。',
  },
};

const lpConstructionMaterialSampleBook: BlogPostMeta = {
  slug: 'construction-material-sample-book-printing-guide',
  categoryKey: 'japan-doujin',
  source: 'daily',
  date: '2026-07-20',
  title: {
    'zh-hk': '建築裝飾材料樣板手冊印刷指南 · 瓷磚石材窗簾色卡定制 | 智印雲 ZprintPro',
    en: 'Construction Material Sample Book Printing Guide: Tile, Stone, Curtain, Flooring Color Card Custom | ZprintPro',
    ja: '建築装飾材料サンプルブック印刷ガイド：タイル・石材・カーテン・フローリング カラー カード カスタム | ZprintPro',
  },
  excerpt: {
    'zh-hk': '建築裝飾材料供應商必睇：5 種裝訂方式（騎馬釘 16-64 頁 / 膠裝 64-300 頁 / 精裝 100-500 頁 / 蝴蝶裝 樣板單頁抽換 / 活頁夾 可持續更新）+ 4 種印刷工藝（4 色 CMYK / Pantone 專色 / 燙金 / 局部 UV）+ 4 條建材供應商 FAQ，協助 50-500 本精準下單。',
    en: 'US construction material suppliers, interior designers, and building product brands: 5 binding styles (saddle stitch / perfect bound / hardcover / butterfly / loose-leaf), 4 print finishes, 4 supplier FAQs, 50-500 copies, Free Shipping over $99 USA, 5-7 business day production, No minimum 50 copies.',
    ja: '日本の建築装飾材料サプライヤー向け：5 つの製本方式（骑马钉 / 無線胶装 / 上製本 / バタフライ / ルーズリーフ）、4 つの印刷仕上げ、4 つのサプライヤー FAQ、50-500 部小〜大ロット、$99 以上で全国無料配送、5-7 営業日生産。',
  },
};
"""

# Insert after lpFoldingBoxCosmetics closing `};`
# Find the position: end of `};` after `lpFoldingBoxCosmetics: BlogPostMeta = {`
marker = "const lpFoldingBoxCosmetics: BlogPostMeta = {"
marker_idx = content.find(marker)
if marker_idx == -1:
    raise SystemExit("lpFoldingBoxCosmetics not found")

# Find the closing `};` for this const block (next standalone `};` after marker_idx)
# Track brace depth
brace_depth = 0
in_block = False
end_idx = -1
for i in range(marker_idx, len(content)):
    ch = content[i]
    if ch == "{":
        brace_depth += 1
        in_block = True
    elif ch == "}":
        brace_depth -= 1
        if in_block and brace_depth == 0:
            # Next char should be ;
            if content[i + 1] == ";":
                end_idx = i + 2
                break

if end_idx == -1:
    raise SystemExit("lpFoldingBoxCosmetics closing }; not found")

# Insert new_consts at end_idx
new_content = content[:end_idx] + "\n" + new_consts + content[end_idx:]

# Now append to blogPosts array - find `lpPetFoodSticker,` (last entry) followed by `];`
blogposts_end_marker = "  lpPetFoodSticker,\n];"
if blogposts_end_marker not in new_content:
    raise SystemExit("blogPosts array end marker not found")

# Insert 3 new const names before `];`
new_blogposts_end = (
    "  lpPetFoodSticker,\n"
    "  // 2026-07-20 v4 daily-content-evolve add 3 (Q-NEW-01/02/03 NEW Tier C 行业首次覆盖 — 宗教文化 / 工業機械 / 建築工程)\n"
    "  lpReligiousCeremony,\n"
    "  lpIndustrialNameplate,\n"
    "  lpConstructionMaterialSampleBook,\n"
    "];"
)
new_content = new_content.replace(blogposts_end_marker, new_blogposts_end)

p.write_text(new_content, encoding="utf-8")
print(f"DONE: blog-posts.ts updated")
print(f"  +3 const blocks: lpReligiousCeremony / lpIndustrialNameplate / lpConstructionMaterialSampleBook")
print(f"  blogPosts array: +3 entries")
print(f"  file size: {p.stat().st_size} bytes")
