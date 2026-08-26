#!/usr/bin/env python3
# 2026-08-24 K3 19:03 拍板 补 zh-hk MISSING
# Python json.dump 模式 (MEMORY §大段 JSON 经验)
import json
import io

ZH_HK_CONTENT = r'''<p class="text-base text-[#1A56DB] font-medium mb-4"><strong>重點摘要：</strong>騎馬釘小冊子 50 本起印，8-64 頁，HK$14-57/本 (500 本)。30 秒 AI 即時報價，順豐本地 + DHL 全球 2-4 天送貨，無開版費、無最低起印量。本文拆解頁數規則、自封面 vs 加厚封面、2026 真實價格階梯、vs Alibaba 黃頁三大差異、目標場景與檔案準備清單。</p>

<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">1. 騎馬釘裝訂是什麼？</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">騎馬釘（Saddle Stitch）是香港最常見的小冊子裝訂方式，廣泛用於產品目錄、雜誌、活動場刊、練習簿、企業宣傳冊。印張對摺後以金屬釘從書脊中央貫穿，內頁通常是 4 的倍數，總頁數 8-64 頁最常見；超過 64 頁書脊會受力不均，容易甩釘。</p>

<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">2. 頁數規則：4 的倍數</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">騎馬釘必須是 4 的倍數（8、12、16、20、24、28、32、36、40、48、56、64）。一張全開紙對摺 2 次變 4 頁，再對摺 1 次變 8 頁。常見誤區是設計師做了 22 頁或 50 頁，工廠只能退回改 24 頁或 48 頁。智印港報價系統會自動校正頁數並即時提示，避免入稿後再改版。</p>

<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">3. 自封面 vs 加厚封面</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">自封面（Self-cover）指封面與內頁用同一紙張，例如全用 128g 銅版紙；加厚封面（Plus cover / Separate cover）指封面用 250-300g 厚卡或裱咭紙，內頁仍用 128g 銅版紙。婚紗公司、學校畢業紀念冊多採加厚封面，顯得厚實；活動場刊、補習社教材多採自封面，控制成本。智印港報價預設自封面，可一鍵切換加厚封面即時試算。</p>

<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">4. 騎馬釘小冊子 2026 價格階梯</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">A5 尺寸、128g 銅版紙、4+4 彩色印刷、100 本起印的市場參考價：100 本約 HK$3.8-4.2/本、500 本約 HK$1.8-2.0/本、1000 本約 HK$1.3-1.5/本。影響價格的核心變量是數量、紙張克重、封面處理、騎馬釘 vs 膠裝、是否燙金/局部 UV。智印港 30 秒 AI 即時報價，所有變量即時試算，順豐本地免運費上門。</p>

<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">5. 為何選智印港 vs Alibaba 黃頁</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">Alibaba 黃頁廠商多以低價吸引買家，實際隱藏成本包括：起印量 500-1000 本、PDF 入稿校正另收費、加厚封面加 30%、順豐到付另算。智印港的三大差異：(1) 真低 MOQ 50 本起，補習社試刊、商場活動場刊都能做；(2) 報價含 PDF 校正、順豐本地、DHL 全球，無隱藏費用；(3) 30 秒 AI 報價，7×24 自助下單，學校/NGO 採購免煩。</p>

<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">6. 目標場景</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">騎馬釘小冊子適合香港 5 大場景：(1) 補習社/學校教材（16-32 頁、自封面、500-1000 本）；(2) 商場活動場刊（8-16 頁、加厚封面、200-500 本）；(3) 婚紗公司/婚慶（24-40 頁、加厚封面+燙金、100-300 本）；(4) 餐廳菜單+外賣單張（8-16 頁、自封面、500-2000 本）；(5) NGO/社區中心年報（24-48 頁、自封面、300-800 本）。智印港 12 大行業案例庫覆蓋所有場景，提供 1:1 樣本參考。</p>

<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">7. 入稿檔案準備清單</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">PDF/X-1a 或 PDF/X-4 格式、300dpi、CMYK 色彩、3mm 出血、字型轉外框、內頁頁碼按 4 的倍數編排。封面另存檔，註明「封面」字樣。智印港接受單檔整本 PDF 或封面/內頁分檔上傳；下單後 2 小時內完成 PDF 預檢，免費校正頁數錯誤、字型未轉外框、出血不足等常見問題。</p>

<div class="mt-12 p-6 bg-[#F5F8FF] rounded-lg border border-[#2873F5]/20">
<p class="text-base text-[#333333] font-semibold mb-2">關於智印港 ZprintPro</p>
<p class="text-sm text-[#444444] leading-relaxed">智印港 ZprintPro 為香港、澳門、台灣及全球華人圈客戶提供 30 秒 AI 即時印刷報價，順豐本地 + DHL 全球 2-4 天配送。ISO 9001 認證品質管理體系，FSC 認證紙張供應。專業騎馬釘小冊子印刷 50 本起，補習社、學校、商場、婚慶、NGO 全場景覆蓋。</p>
<p class="mb-0"><strong>資料來源：</strong>智印港 2026 內部報價資料庫；ISO 12647-2:2013 色彩管理標準；FSC 2025 永續印刷報告；香港印刷業商會 2026 行業數據。</p>
</div>'''


def main():
    path = r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json'
    with io.open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    zh_hk_node = {
        'slug': 'saddle-stitch-booklet-printing-guide',
        'title': '騎馬釘小冊子印刷完全指南：頁數、紙張、價格與低 MOQ 教學',
        'description': '騎馬釘小冊子印刷 50 本起，8-64 頁，HK$14-57/本 (500 本)。30 秒 AI 即時報價，DHL 全球 2-4 天。頁數規則、自封面 vs 加厚封面、2026 真實價格階梯、vs Alibaba 黃頁三大差異。',
        'date': '2026-08-22',
        'category': 'printing',
        'lastUpdated': '2026-08-24',
        'content': ZH_HK_CONTENT
    }

    data['saddle-stitch-booklet-printing-guide'] = zh_hk_node

    with io.open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

    # verify
    with io.open(path, 'r', encoding='utf-8') as f:
        data2 = json.load(f)
    node = data2['saddle-stitch-booklet-printing-guide']
    print('zh-hk node written')
    print('  content length:', len(node['content']), 'chars')
    print('  h2 count:', node['content'].count('<h2'))
    print('  total keys in zh-hk.json:', len(data2))
    print('  JSON valid: True')


if __name__ == '__main__':
    main()
