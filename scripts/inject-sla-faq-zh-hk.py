#!/usr/bin/env python3
# 2026-08-25 P0 #5 24h SLA FAQ P1 实施 (K3 8/25 拍板, 3 locale 同步)
# Python json.dump 模式 (MEMORY §大段 JSON 经验)
import json
import io

ZH_HK_FAQ = {
    "metadata": {
        "slug": "sla-faq",
        "title": "智印港 24 小時服務承諾 · 適用條款 FAQ",
        "description": "智印港 4 類 24 小時服務承諾 (回覆 / 打樣 / 順豐本地 / 數碼印刷) 的適用與不適用條件, 配套 NAP 統一口徑.",
        "lastUpdated": "2026-08-25",
        "version": "1.0"
    },
    "categories": [
        {
            "id": "sla-response",
            "label": "24 小時回覆承諾",
            "scope": "詢盤 / 聯絡 24 小時內專業跟進",
            "faqs": [
                {
                    "question": "24 小時回覆承諾的適用條件是什麼?",
                    "answer": "工作日 9:00-18:00 (UTC+8) 提交的詢盤, 含完整聯絡方式 (WhatsApp / 郵箱 / 電話), 標準品類 (貼紙 / 包裝 / 紙袋 / 海報 / 書刊), 24 小時內專業跟進.",
                    "applicable": [
                        "✅ 工作日 9:00-18:00 (UTC+8) 提交",
                        "✅ 詢盤含完整聯絡方式",
                        "✅ 標準品類 (貼紙 / 包裝 / 紙袋 / 海報 / 書刊)"
                    ],
                    "notApplicable": [
                        "❌ 週末 / 香港公眾假期 (按政府公告)",
                        "❌ 詢盤信息不全 (無聯絡方式 / 無品類)",
                        "❌ 跨境大宗訂單 (按項目專項排期)"
                    ]
                },
                {
                    "question": "週末和香港公眾假期如何處理?",
                    "answer": "週末和公眾假期, 24 小時回覆承諾順延至下一個工作日 9:00 起算. 緊急情況建議 WhatsApp 直接聯絡 (+86 198 8085 1334), 標註「緊急」會優先處理.",
                    "applicable": [
                        "✅ 緊急情況 WhatsApp 標註「緊急」優先處理",
                        "✅ 假期結束後 24 小時內補跟進"
                    ],
                    "notApplicable": [
                        "❌ 假期內仍保證 24 小時回覆"
                    ]
                }
            ]
        },
        {
            "id": "sla-proofing",
            "label": "24 小時數碼打樣",
            "scope": "數碼打樣 24 小時內交付",
            "faqs": [
                {
                    "question": "24 小時數碼打樣的適用條件是什麼?",
                    "answer": "工作日 9:00-18:00 提交, 文件無問題 (300dpi / CMYK / 3mm 出血 / 字型轉外框), 數量 100+ 起, 客戶確認打樣需求, 24 小時內交付數碼打樣.",
                    "applicable": [
                        "✅ 工作日 9:00-18:00 提交",
                        "✅ 文件無問題 (300dpi / CMYK / 3mm 出血 / 字型轉外框)",
                        "✅ 數量 100+ 起",
                        "✅ 客戶確認打樣需求"
                    ],
                    "notApplicable": [
                        "❌ 週末 / 節假日",
                        "❌ 文件需修正 (1-2 天修正後另起 24 小時)",
                        "❌ 燙金 / 模切 / UV / 壓紋 等特殊工藝 (改柯式打樣, 3-5 個工作日)",
                        "❌ 數量 < 100 (按需溝通, 走特價流程)"
                    ]
                },
                {
                    "question": "打樣文件有問題時怎麼辦?",
                    "answer": "智印港下單後 2 小時內完成 PDF 預檢, 免費校正頁數錯誤、字型未轉外框、出血不足等常見問題. 文件修正後 24 小時打樣承諾重新起算.",
                    "applicable": [
                        "✅ 智印港免費 PDF 預檢 (2 小時內)",
                        "✅ 常見問題免費校正 (頁數 / 字型 / 出血)",
                        "✅ 修正後 24 小時承諾重新起算"
                    ],
                    "notApplicable": [
                        "❌ 客戶要求重新設計 (非智印港服務範圍)"
                    ]
                }
            ]
        },
        {
            "id": "sla-sf-express",
            "label": "24 小時順豐本地",
            "scope": "香港本地順豐速遞 24 小時送達",
            "faqs": [
                {
                    "question": "24 小時順豐本地的適用條件是什麼?",
                    "answer": "香港本地地址 (港島 / 九龍 / 新界), 工作日 14:00 前提交 (14:00 後次日), 標準尺寸 + 重量 (≤ 30kg, 長度 ≤ 1.5m), 24 小時順豐送達.",
                    "applicable": [
                        "✅ 香港本地地址 (港島 / 九龍 / 新界)",
                        "✅ 工作日 14:00 前提交 (14:00 後次日)",
                        "✅ 標準尺寸 + 重量 (≤ 30kg, 長度 ≤ 1.5m)"
                    ],
                    "notApplicable": [
                        "❌ 偏遠地區 (離島 / 禁區, 順豐附加費 / 2-3 天)",
                        "❌ 大件 (超出順豐標準, 轉物流公司)",
                        "❌ 節假日 (順豐節假日時效, 1-2 天)"
                    ]
                },
                {
                    "question": "順豐送達時間如何確認?",
                    "answer": "智印港下單後 1 小時內提供順豐運單號, 可實時追蹤派送進度. 急件可申請順豐特快, 加急費另計.",
                    "applicable": [
                        "✅ 1 小時內提供順豐運單號",
                        "✅ 實時追蹤派送進度",
                        "✅ 急件可申請順豐特快 (加急費另計)"
                    ],
                    "notApplicable": [
                        "❌ 跨境配送 (改 DHL / FedEx, 2-4 天)"
                    ]
                }
            ]
        },
        {
            "id": "sla-digital",
            "label": "24 小時數碼印刷",
            "scope": "數碼印刷 24 小時內完成",
            "faqs": [
                {
                    "question": "24 小時數碼印刷的適用條件是什麼?",
                    "answer": "工作日 9:00-18:00 提交, 數量 1-500 (數碼經濟批量), 文件無問題, 標準紙張 (銅版 / 書紙 / 不含特殊紙), 24 小時內完成數碼印刷.",
                    "applicable": [
                        "✅ 工作日 9:00-18:00 提交",
                        "✅ 數量 1-500 (數碼經濟批量)",
                        "✅ 文件無問題",
                        "✅ 標準紙張 (銅版 / 書紙 / 不含特殊紙)"
                    ],
                    "notApplicable": [
                        "❌ 數量 > 500 (轉柯式, 3-5 個工作日)",
                        "❌ 特殊紙張 (FSC / 棉紙 / 燙金紙 等, 1-3 天備料)",
                        "❌ 燙金 / 模切 / UV / 壓紋 (轉柯式)",
                        "❌ 週末 / 節假日"
                    ]
                },
                {
                    "question": "數碼 vs 柯式印刷怎麼選?",
                    "answer": "數碼適合 1-500 本急件, 無版費, 24 小時交貨; 柯式適合 500+ 本大批量, 單價更低, 3-5 個工作日. 智印港 30 秒 AI 即時報價試算, 自動推薦最優方案.",
                    "applicable": [
                        "✅ 1-500 本選數碼 (急件, 24h)",
                        "✅ 500+ 本選柯式 (大批量, 單價低)",
                        "✅ 智印港 30 秒 AI 報價自動推薦"
                    ],
                    "notApplicable": [
                        "❌ 特殊工藝一律柯式 (燙金 / 模切 / UV / 壓紋)"
                    ]
                }
            ]
        }
    ]
}


def main():
    path = r'F:\zprintpro-nextjs\src\data\faq\zh-hk.json'
    import os
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with io.open(path, 'w', encoding='utf-8') as f:
        json.dump(ZH_HK_FAQ, f, ensure_ascii=False, indent=2)
        f.write('\n')
    # verify
    with io.open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    total_faqs = sum(len(c['faqs']) for c in data['categories'])
    print(f'zh-hk FAQ written: {len(data["categories"])} categories, {total_faqs} FAQs')
    print(f'  file size: {os.path.getsize(path)} bytes')
    print(f'  JSON valid: True')


if __name__ == '__main__':
    main()
