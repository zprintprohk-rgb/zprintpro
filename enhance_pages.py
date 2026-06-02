#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SEO+GEO 页面增强器 v3 (彻底修复版)
- 修复 SWC "Unexpected token div" 构建错误
- 移除 Metadata 类型导入，改用纯 JS 对象
- 添加 React 导入兼容旧 JSX 转换模式
- 简化 metadata 结构，消除潜在括号/引号问题
- 保留所有 SEO+GEO 功能
"""

import os
import json

PROJECT_ROOT = r"F:\zprintpro-nextjs"
SERVICES_DIR = os.path.join(PROJECT_ROOT, "src", "app", "[locale]", "services")
BACKUP_SUFFIX = ".bak.v3"

ENHANCEMENTS = {
    "poster-printing": {
        "title": "香港專業海報印刷服務 — A2/A3/A1 多尺寸 一張起印 | ZPrintPro",
        "description": "智印云 ZPrintPro 提供香港海報印刷服務，A1/A2/A3多尺寸即日取貨，免費設計，全港送貨。",
        "h1": "香港海報印刷｜即日取貨｜多尺寸免費設計",
        "scenarios": ["展覽會活動海報", "餐廳菜單海報", "零售店促銷展示"],
        "table": [
            ["A3", "157g銅版紙", "$20起", "即日"],
            ["A2", "200g啞粉紙", "$35起", "2天"],
            ["A1", "PP防水紙", "$50起", "3天"],
        ],
        "table_headers": ["尺寸", "紙質", "單價(起)", "交期"],
        "table_title": "海報印刷尺寸與價格",
        "advantages": [
            "超過 500+ 香港本地商戶信賴",
            "免費設計打樣，滿意再印刷",
            "全港免費送貨，急單可選即日取"
        ],
        "process": "線上報價 → 免費設計 → 打樣確認 → 印刷 → 送貨上門",
        "cta_text": "立即 WhatsApp 報價",
        "cta_link": "https://wa.me/85212345678",
        "faq": [
            {"q": "A0海報可以印嗎？", "a": "可以，最大尺寸 A0，需來圖報價。智印云 ZPrintPro 支援各種非標尺寸。"},
            {"q": "海報設計檔案要求？", "a": "提供 AI/PSD/PDF，解析度 300dpi，留出血位 3mm。如無檔案，我們提供免費設計。"}
        ]
    },
    "leaflet": {
        "title": "宣傳單張設計指南｜尺寸/摺法/印刷注意事項 | ZPrintPro",
        "description": "了解宣傳單張（Leaflet）的5種摺法、尺寸對照及設計注意事項。智印云提供免費設計模板。",
        "h1": "宣傳單張（Leaflet）設計指南：5種摺法+尺寸對照",
        "content_type": "informational",
        "sections": [
            {"h2": "什麼是宣傳單張？", "p": "宣傳單張（Leaflet）是最常見的印刷品之一，用於促銷、活動通知、產品介紹等。相比海報，單張更易於派發和攜帶。"},
            {"h2": "5種常見摺法", "list": ["對摺 (Half-Fold)：最常見，適合簡介", "三摺 (C-Fold)：標準傳單格式，適合信箱投遞", "風琴摺 (Z-Fold)：展開後呈現連續畫面", "開門摺 (Gate-Fold)：兩側向中間摺，適合高檔邀請函", "海報摺 (Poster-Fold)：多摺後可展開為大海報"]},
            {"h2": "尺寸對照表", "table": [["A4", "210x297", "最常見傳單"], ["A5", "148x210", "優惠券"], ["DL", "99x210", "可放入標準信封"]], "table_headers": ["尺寸", "完成尺寸(mm)", "適用場景"]},
            {"h2": "設計注意事項", "list": ["出血位至少預留 3mm，避免裁切後出現白邊", "文字安全區距離邊緣至少 5mm", "使用 CMYK 色彩模式，避免 RGB 轉換色差", "圖片解析度至少 300dpi"]},
            {"h2": "派發技巧", "p": "香港常見派發渠道包括：港鐵站出口、商業大廈信箱、展會現場擺放。智印云可協助安排派發服務。"}
        ],
        "cta_text": "需要印刷？查看我們的宣傳單張印刷服務 →",
        "cta_link": "/zh-hk/services/leaflet-printing"
    },
    "leaflet-printing": {
        "title": "香港宣傳單張印刷報價 — A4/A5/DL 24小時起貨 | ZPrintPro",
        "description": "智印云 ZPrintPro 提供香港宣傳單張印刷，A4/A5/DL多尺寸，低至$0.5/張，24小時急單起貨。",
        "h1": "宣傳單張印刷｜低至$0.5/張｜24小時急單",
        "content_type": "transactional",
        "table": [
            ["A4", "128g銅版紙", "500張", "$0.8/張", "3天"],
            ["A4", "128g銅版紙", "1000張", "$0.5/張", "3天"],
            ["A5", "128g銅版紙", "500張", "$0.6/張", "3天"],
        ],
        "table_headers": ["尺寸", "紙質", "數量", "單價", "交期"],
        "table_title": "宣傳單張印刷報價一覽",
        "advantages": [
            "免費設計排版，專業設計師一對一服務",
            "24小時急單起貨，標準3天交貨",
            "全港免費送貨，觀塘可取"
        ],
        "process": "上傳檔案 → 自動報價 → 網上付款 → 印刷 → 送貨",
        "cta_text": "立即上傳檔案獲取報價",
        "cta_link": "/zh-hk/quote",
        "faq": [
            {"q": "宣傳單張和傳單有什麼分別？", "a": "宣傳單張通常指摺頁傳單（Leaflet），傳單多為單張不摺（Flyer）。智印云兩種均可印刷。"},
            {"q": "可否要求指定紙質？", "a": "可以，我們提供超過10種紙質選擇，包括環保紙、藝術紙等。"}
        ]
    },
    "food-packaging-printing": {
        "title": "食品包裝印刷｜食品級環保紙盒/紙袋定制 | ZPrintPro",
        "description": "智印云 ZPrintPro 提供香港食品包裝印刷定制，食品級環保紙盒、紙袋，FDA認證，500個起訂。",
        "h1": "香港食品包裝印刷｜FDA認證｜小批量定制",
        "scenarios": ["烘焙店蛋糕盒", "外賣餐盒", "零食袋", "飲料杯套"],
        "table": [
            ["白卡紙", "挺度高、環保可回收", "蛋糕盒、餐盒"],
            ["牛皮紙", "自然質感、可降解", "外賣袋、零食袋"],
            ["PLA淋膜紙", "全降解材料、防水防油", "環保餐盒"],
        ],
        "table_headers": ["材質", "特性", "適用產品"],
        "table_title": "食品包裝材質對照",
        "advantages": [
            "全部材料通過食品級認證（FDA / EU 10/2011）",
            "500個起訂，小批量靈活生產",
            "免費設計打樣，3天出樣板"
        ],
        "certifications": "FDA 21 CFR 176.170 / EU 10/2011 / 香港食品安全中心要求",
        "process": "需求溝通 → 材料選擇 → 設計打樣 → 確認生產 → 品檢送貨",
        "cta_text": "獲取食品包裝報價",
        "cta_link": "/zh-hk/quote",
        "faq": [
            {"q": "食品包裝認證需要多久？", "a": "智印云已備齊常見認證文件，客戶可直接用於產品註冊，無需額外等待。"}
        ]
    }
}

def backup_file(filepath):
    if os.path.exists(filepath):
        backup_path = filepath + BACKUP_SUFFIX
        if not os.path.exists(backup_path):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"📦 已备份: {backup_path}")

def escape_js_string(s):
    """转义 JavaScript 字符串中的特殊字符"""
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")

def build_metadata_js(title, desc, slug):
    """构建 metadata JS 对象字符串（不使用 TypeScript 类型注解）"""
    return f"""export const metadata = {{
  title: '{escape_js_string(title)}',
  description: '{escape_js_string(desc)}',
  alternates: {{
    canonical: 'https://zprintpro.com/zh-hk/services/{slug}',
    languages: {{
      'zh-HK': 'https://zprintpro.com/zh-hk/services/{slug}',
      'en': 'https://zprintpro.com/en/services/{slug}',
      'ja': 'https://zprintpro.com/ja/services/{slug}'
    }}
  }},
  openGraph: {{
    title: '{escape_js_string(title)}',
    description: '{escape_js_string(desc)}',
    images: ['/og/{slug}.jpg'],
    locale: 'zh_HK'
  }}
}};"""

def build_table_html(headers, rows):
    """构建 HTML 表格"""
    ths = "".join([f"<th className=\"border px-4 py-2\">{h}</th>" for h in headers])
    trs = ""
    for row in rows:
        tds = "".join([f"<td className=\"border px-4 py-2\">{cell}</td>" for cell in row])
        trs += f"          <tr>{tds}</tr>\n"
    return f"""        <table className=\"min-w-full border-collapse border mt-4\">
          <thead>
            <tr>{ths}</tr>
          </thead>
          <tbody>
{trs}          </tbody>
        </table>"""

def build_info_sections(sections):
    """构建信息型页面的 sections HTML"""
    html = ""
    for sec in sections:
        if "h2" in sec:
            html += f"        <h2 className=\"text-2xl font-bold mt-8 mb-4\">{sec['h2']}</h2>\n"
        if "p" in sec:
            html += f"        <p className=\"mb-4\">{sec['p']}</p>\n"
        if "list" in sec:
            items = "".join([f"<li>{item}</li>" for item in sec['list']])
            html += f"        <ul className=\"list-disc pl-6 mb-4\">{items}</ul>\n"
        if "table" in sec:
            html += build_table_html(sec["table_headers"], sec["table"]) + "\n"
    return html

def generate_page(slug, cfg):
    filepath = os.path.join(SERVICES_DIR, slug, "page.tsx")
    if not os.path.exists(filepath):
        print(f"❌ 页面不存在: {filepath}")
        return False

    backup_file(filepath)

    # 构建 metadata
    meta_js = build_metadata_js(cfg["title"], cfg["description"], slug)

    # 面包屑 Schema (JS 变量)
    breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "首頁", "item": "https://zprintpro.com/zh-hk"},
            {"@type": "ListItem", "position": 2, "name": "服務", "item": "https://zprintpro.com/zh-hk/services"},
            {"@type": "ListItem", "position": 3, "name": cfg["h1"], "item": f"https://zprintpro.com/zh-hk/services/{slug}"}
        ]
    }
    bc_json = json.dumps(breadcrumb, ensure_ascii=False)

    # 主要内容
    if cfg.get("content_type") == "informational":
        sections_html = build_info_sections(cfg["sections"])
        cta_html = f"""        <div className=\"mt-8 text-center\">
          <a href=\"{cfg.get('cta_link', '/zh-hk/quote')}\" className=\"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700\">
            {cfg.get('cta_text', '立即報價')}
          </a>
        </div>"""
        main_content = sections_html + cta_html
    else:
        scenarios_html = ""
        if "scenarios" in cfg:
            lis = "".join([f"<li>{s}</li>" for s in cfg["scenarios"]])
            scenarios_html = f"""        <div className=\"mt-8\">
          <h2 className=\"text-2xl font-bold mb-4\">適用場景</h2>
          <ul className=\"list-disc pl-6\">{lis}</ul>
        </div>"""

        table_html = ""
        if "table" in cfg:
            table_html = f"""        <div className=\"mt-8\">
          <h2 className=\"text-2xl font-bold mb-4\">{cfg.get('table_title', '規格對照')}</h2>
{build_table_html(cfg['table_headers'], cfg['table'])}
        </div>"""

        advantages_html = ""
        if "advantages" in cfg:
            lis = "".join([f"<li>{a}</li>" for a in cfg["advantages"]])
            advantages_html = f"""        <div className=\"mt-8\">
          <h2 className=\"text-2xl font-bold mb-4\">為什麼選擇智印云？</h2>
          <ul className=\"list-disc pl-6\">{lis}</ul>
        </div>"""

        cert_html = ""
        if "certifications" in cfg:
            cert_html = f"""        <div className=\"mt-8\">
          <h2 className=\"text-2xl font-bold mb-4\">品質認證</h2>
          <p>{cfg['certifications']}</p>
        </div>"""

        process_html = f"""        <div className=\"mt-8\">
          <h2 className=\"text-2xl font-bold mb-4\">服務流程</h2>
          <p>{cfg.get('process', '諮詢 → 報價 → 印刷 → 送貨')}</p>
        </div>"""

        cta_html = f"""        <div className=\"mt-8 text-center\">
          <a href=\"{cfg.get('cta_link', '/zh-hk/quote')}\" className=\"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700\">
            {cfg.get('cta_text', '立即報價')}
          </a>
        </div>"""

        main_content = scenarios_html + table_html + advantages_html + cert_html + process_html + cta_html

    # FAQ
    faq_items = cfg.get("faq", [])
    if faq_items:
        faq_html = "\n".join([
            f"""          <div key={i}>
            <h3 className=\"text-lg font-semibold\">{item['q']}</h3>
            <p className=\"text-gray-600 mt-1\">{item['a']}</p>
          </div>"""
            for i, item in enumerate(faq_items)
        ])
    else:
        faq_html = '          <div>暫無常見問題，請直接聯繫我們。</div>'

    # 内部链接（排除当前页）
    all_pages = [
        ("poster-printing", "海報印刷"),
        ("leaflet", "宣傳單張設計"),
        ("leaflet-printing", "宣傳單張印刷"),
        ("food-packaging-printing", "食品包裝印刷"),
    ]
    links_html = "".join([
        f'            <a href="/zh-hk/services/{s}" className="text-blue-600 underline">{label}</a>'
        for s, label in all_pages if s != slug
    ])

    func_name = slug.replace("-", "_") + "Page"

    # 最终页面代码：使用 React 导入，不使用 Metadata 类型，最简结构
    page_code = f"""import React from 'react';

{meta_js}

export default function {func_name}() {{
  const breadcrumbData = {bc_json};
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(breadcrumbData) }}}}
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">{cfg['h1']}</h1>
{main_content}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">常見問題</h2>
          <div className="space-y-4">
{faq_html}
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">其他服務</h2>
          <div className="flex flex-wrap gap-4">
{links_html}
          </div>
        </div>
      </div>
    </div>
  );
}}
"""

    # 写入文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(page_code)

    # 验证：读取前30行检查
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()[:30]
    print(f"✅ 已生成: {filepath} ({len(page_code)} 字符)")
    print("   前10行预览:")
    for i, line in enumerate(lines[:10], 1):
        print(f"   {i:2d}: {line.rstrip()}")
    return True

def main():
    for slug, cfg in ENHANCEMENTS.items():
        generate_page(slug, cfg)
    print("\n🎉 全部完成。请运行: npm run build")

if __name__ == "__main__":
    main()
