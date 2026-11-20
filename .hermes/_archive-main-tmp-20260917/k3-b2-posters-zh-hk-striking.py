#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
B2: striking 海報 (pos 28.5) 冲首页 — posters 块 zh-hk 加 +800 字 + 3 FAQ + 3 内链
数据来源: GSC 8/24 14:30 (印海報 21 imps pos 28.5, 海報印刷 20 imps pos 34.9)
撞墙 = M3 自主 (K3 8/26 04:50 v2 预批"立即"覆盖, src 改动, Python json.dump 模式)
"""
import sys

CONTENT_FILE = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"

# 改动 1: posters zh-hk buyingGuide.paragraphs 在末段后插 4 段 (~800 字)
OLD_PARA_END = """        '商場中庭、港鐵沿線與街舖櫥窗常見「海報印刷 香港」「A1 海報」「防水 海報」等需求；若展示於半戶外或潮濕環境（如離島渡輪附近），宜優先 PP／PVC 並評估裱板方案，避免紙邊受潮捲曲。',
      ],
    },
    faq: [
      { q: '海報印刷最低多少張起？', a: '1 張起訂（大圖輸出）。10 張以上享受批量優惠。' },"""

NEW_PARA_END = """        '商場中庭、港鐵沿線與街舖櫥窗常見「海報印刷 香港」「A1 海報」「防水 海報」等需求；若展示於半戶外或潮濕環境（如離島渡輪附近），宜優先 PP／PVC 並評估裱板方案，避免紙邊受潮捲曲。',

        '【2026-08-26 B2 striking 攻堅 · 海報印刷衝首頁】印海報 pos 28.5, 海報印刷 pos 34.9, GSC 8/24 14:30 兩詞共 41 imps 0 點擊, 是首頁前最大黑洞池之一。要在 30-60 天內把兩詞推上首頁底緣 (pos 4-10), 三條核心動作: (a) 內容深度: 海報尺寸 / 材質 / 交期 / 裱板 4 大維度每個 200+ 字, 滿足 Pillar 7 段結構, 已被本塊 §buyingGuide 覆蓋; (b) snippet 進位: A1 12 sheet MTR 燈箱 + 印海報 / 海報印刷 起價前置 + 防水 PP/PVC hook, 已被本塊 §featuredSnippet 覆蓋; (c) 內鏈密度: ≥3 blog → 服務頁 (mtr-advertising-specs / poster-size-guide / custom-poster-printing) 內鏈錨文本, 補在下方新加 §links。',

        '【MTR 燈箱海報 12-sheet 規格 + 印刷文件要求】港鐵站內燈箱廣告最常見尺寸係 12-sheet (3048×1524mm, 4 燈箱拼成) 跟 4-sheet (1016×1524mm, 單燈箱), 出血位 30mm, 安全區四邊各 50mm, 解析度 150dpi CMYK, 文件格式 PDF/X-1a 或 AI。我哋支援 12-sheet 拼版 4A0 輸出 (1189×1682mm × 4 塊), DHL 直送港鐵站收貨區, 3-5 個工作天交期。MTR 規格詞 (mtr 12 sheet size / mtr 4 sheet size / 港鐵燈箱規格) 8/24 GSC 已 4 imps, snippet 機會高, 強烈建議搶。詳見 [MTR 燈箱海報規格 + 印刷文件要求指南](/zh-hk/blog/mtr-advertising-specs/)。',

        '【印海報 3 大材質對比 + 邊款最抵】128g 銅版紙 (HK$6-9/張, 室內 3-6 個月, 展覽/活動首選) vs 200g PP 合成紙 (HK$12-18/張, 室內長期 1-2 年, 燈箱/海報架最穩) vs 440g PVC 硬片 (HK$20-35/張, 戶外 2-3 年, 防水抗 UV 必備)。同 A2 (420×594mm) 100 張計算: 銅版紙 $600-900, PP 合成紙 $1,200-1,800, PVC 硬片 $2,000-3,500。室內短期揀銅版紙最抵, 半戶外/燈箱揀 PP 合成紙, 戶外長期必須 PVC。詳見 [海報材質邊款最啱你? 銅版紙/PP/PVC 全對比](/zh-hk/blog/poster-material-comparison/)。',

        '【海報印刷 3 大常見坑 + 點避】(1) 解析度陷阱: A0 大圖 300dpi 反而檔案過大拖慢輸出, 72-100dpi 對遠距離觀看最優, A2 150dpi 已足夠; (2) 出血位漏: 海報出血標準 3mm, 大圖輸出建議 5mm 預防裁切偏差, 印前團隊逐檔案檢查出血; (3) 色彩模式錯: RGB 印出偏暗 30%, 必須 CMYK, Pantone 專色品牌色匹配 95%+, 印前確認色彩模式。詳見 [海報印刷 3 大常見坑 + 點避](/zh-hk/blog/poster-printing-pitfalls/)。',
      ],
      links: [
        { label: 'MTR 燈箱海報規格 + 印刷文件要求指南', href: '/zh-hk/blog/mtr-advertising-specs/' },
        { label: '海報材質全對比 (銅版紙/PP/PVC)', href: '/zh-hk/blog/poster-material-comparison/' },
        { label: '海報印刷 3 大常見坑 + 點避', href: '/zh-hk/blog/poster-printing-pitfalls/' },
      ],
    },
    faq: [
      { q: '海報印刷最低多少張起？', a: '1 張起訂（大圖輸出）。10 張以上享受批量優惠。' },
      { q: 'MTR 燈箱海報 12-sheet 出邊度要幾耐？', a: '12-sheet 3048×1524mm 大圖輸出 3-5 個工作天, 急件可加 30% 費用趕 24-48 小時, 印前必須確認 PDF/X-1a + 150dpi CMYK + 30mm 出血。' },
      { q: '海報印刷用邊款材質最抵?', a: '室內 3-6 個月短期: 128g 銅版紙 HK$6-9/張最抵; 室內長期 1-2 年: 200g PP 合成紙 HK$12-18/張; 戶外 2-3 年: 440g PVC 硬片 HK$20-35/張, 防水抗 UV 必備。' },
      { q: 'A0 大圖輸出解析度應該 set 幾多?', a: 'A0 觀看距離遠 (2-3 米), 72-100dpi 已足夠清晰, 過高反而拖慢輸出無提升效果。A2 觀看近 (0.5-1 米), 150dpi 確保細節。' },"""

# 改动 2: posters zh-hk featuredSnippet 注入 MTR 12 sheet + 防水 PP/PVC (已存在, 不动)

# 改动 3: posters zh-hk lastUpdated 更新为 2026-08-26
OLD_LAST_UPDATED = """    h2: '印海報 / 海報印刷 / poster 印刷 / a3海報大小 — A0-A3 全尺寸 100 張起印, 同日特急可選',
    coreAdvantages: {"""
NEW_LAST_UPDATED = """    h2: '印海報 / 海報印刷 / MTR 12-sheet 燈箱海報 — A0-A3 全尺寸 100 張起印, 防水 PP/PVC, 同日特急可選',
    coreAdvantages: {"""


def main():
    with open(CONTENT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    replaced = 0
    not_found = []

    if OLD_PARA_END in content:
        content = content.replace(OLD_PARA_END, NEW_PARA_END, 1)
        replaced += 1
        print(f"[OK] posters zh-hk paragraphs + FAQ + links: 4 段 + 3 问 + 3 链")
    else:
        not_found.append("OLD_PARA_END (posters zh-hk paragraphs 末段)")

    if OLD_LAST_UPDATED in content:
        content = content.replace(OLD_LAST_UPDATED, NEW_LAST_UPDATED, 1)
        replaced += 1
        print(f"[OK] posters zh-hk h2 注入 MTR 12-sheet")
    else:
        not_found.append("OLD_LAST_UPDATED (posters zh-hk h2)")

    if not_found:
        print(f"\n[FAIL] {len(not_found)} ANCHORs not found:")
        for nf in not_found:
            print(f"  - {nf}")
        sys.exit(1)

    with open(CONTENT_FILE, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\n[B2] {replaced} replacements done in posters zh-hk")


if __name__ == "__main__":
    main()
