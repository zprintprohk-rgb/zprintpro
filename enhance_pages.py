#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SEO+GEO 页面增强器
- 修复 leaflet / leaflet-printing 关键词蚕食
- 扩充内容深度（表格、列表、流程、CTA）
- 添加 BreadcrumbList Schema
- 添加内部链接模块
- 注入 canonical + hreflang
"""

import os
import json
import re
from datetime import datetime

PROJECT_ROOT = r"F:\zprintpro-nextjs"
SERVICES_DIR = os.path.join(PROJECT_ROOT, "app", "zh-hk", "services")
BACKUP_SUFFIX = ".bak"

# 定义每个页面的增强内容（可扩展）
ENHANCEMENTS = {
    "poster-printing": {
        "title_suffix": "香港專業海報印刷服務 — A2/A3/A1 多尺寸 一張起印 | ZPrintPro",
        "h1": "香港海報印刷｜即日取貨｜多尺寸免費設計",
        "scenarios": ["展覽會活動海報", "餐廳菜單海報", "零售店促銷展示"],
        "material_table": """
| 尺寸 | 紙質 | 單價(起) | 交期 |
|------|------|----------|------|
| A3 | 157g銅版紙 | $20 | 即日 |
| A2 | 200g啞粉紙 | $35 | 2天 |
| A1 | PP防水紙 | $50 | 3天 |
        """,
        "advantages": [
            "超過 500+ 香港本地商戶信賴",
            "免費設計打樣，滿意再印刷",
            "全港免費送貨，急單可選即日取"
        ],
        "process": "線上報價 → 免費設計 → 打樣確認 → 印刷 → 送貨上門",
        "cta_text": "立即 WhatsApp 報價",
        "faq_extra": [
            {"q": "A0海報可以印嗎？", "a": "可以，最大尺寸 A0，需來圖報價。"},
            {"q": "海報設計檔案要求？", "a": "提供 AI/PSD/PDF，解析度 300dpi，留出血位 3mm。"}
        ]
    },
    "leaflet": {  # 信息型页面
        "title_suffix": "宣傳單張設計指南｜尺寸/摺法/印刷注意事項 | ZPrintPro",
        "h1": "宣傳單張（Leaflet）設計指南：5種摺法+尺寸對照",
        "content_type": "informational",
        "sections": [
            "### 什麼是宣傳單張？",
            "宣傳單張（Leaflet）是最常見的印刷品之一，用於促銷、活動通知、產品介紹等。",
            "### 5種常見摺法",
            "- 對摺 (Half-Fold)\n- 三摺 (C-Fold)\n- 風琴摺 (Z-Fold)\n- 開門摺 (Gate-Fold)\n- 海報摺 (Poster-Fold)",
            "### 尺寸對照表",
            "| 尺寸 | 完成尺寸 (mm) | 適用場景 |\n| A4 | 210x297 | 常見傳單 |\n| A5 | 148x210 | 優惠券 |\n| DL | 99x210 | 信件放入 |",
            "### 設計注意事項",
            "- 出血位至少 3mm\n- 文字勿太貼邊\n- 使用 CMYK 色彩模式",
            "### 派發技巧",
            "可利用港鐵站派發、信箱投遞、展會擺放。"
        ],
        "cta_text": "需要印刷？查看我們的宣傳單張印刷服務",
        "cta_link": "/zh-hk/services/leaflet-printing"
    },
    "leaflet-printing": {  # 交易型页面
        "title_suffix": "香港宣傳單張印刷報價 — A4/A5/DL 24小時起貨 | ZPrintPro",
        "h1": "宣傳單張印刷｜低至$0.5/張｜24小時急單",
        "content_type": "transactional",
        "price_table": """
| 尺寸 | 紙質 | 數量 | 單價 | 交期 |
|------|------|------|------|------|
| A4 | 128g銅版紙 | 500張 | $0.8/張 | 3天 |
| A4 | 128g銅版紙 | 1000張 | $0.5/張 | 3天 |
| A5 | 128g銅版紙 | 500張 | $0.6/張 | 3天 |
        """,
        "advantages": [
            "免費設計排版",
            "24小時急單起貨",
            "全港免費送貨"
        ],
        "process": "上傳檔案 → 自動報價 → 網上付款 → 印刷 → 送貨",
        "faq_extra": [
            {"q": "宣傳單張和傳單有什麼分別？", "a": "宣傳單張通常指摺頁，傳單多為單張紙。"},
            {"q": "可否要求指定紙質？", "a": "可以，我們提供超過10種紙質。"}
        ]
    },
    "food-packaging-printing": {
        "title_suffix": "食品包裝印刷｜食品級環保紙盒/紙袋定制 | ZPrintPro",
        "h1": "香港食品包裝印刷｜FDA認證｜小批量定制",
        "scenarios": ["烘焙店蛋糕盒", "外賣餐盒", "零食袋", "飲料杯套"],
        "material_table": """
| 材質 | 特性 | 適用產品 |
|------|------|----------|
| 白卡紙 | 挺度高、環保 | 蛋糕盒、餐盒 |
| 牛皮紙 | 自然質感、可降解 | 外賣袋、零食袋 |
| PLA淋膜紙 | 全降解材料 | 環保餐盒 |
        """,
        "advantages": [
            "食品級材料認證",
            "500個起訂，小批量OK",
            "免費設計打樣"
        ],
        "certifications": "FDA / EU 10/2011 / 香港食品安全中心要求",
        "cta_text": "獲取食品包裝報價",
        "faq_extra": [
            {"q": "食品包裝認證需要多久？", "a": "我們已備齊常見認證文件，可提供給客戶。"}
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

def inject_breadcrumb_schema(page_slug, page_name):
    """生成 BreadcrumbList 的 JSON-LD 字符串"""
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "首頁", "item": "https://zprintpro.com/zh-hk"},
            {"@type": "ListItem", "position": 2, "name": "服務", "item": "https://zprintpro.com/zh-hk/services"},
            {"@type": "ListItem", "position": 3, "name": page_name, "item": f"https://zprintpro.com/zh-hk/services/{page_slug}"}
        ]
    }

def inject_canonical_and_hreflang(page_slug):
    """生成 metadata.alternates 部分代码"""
    return f"""
  alternates: {{
    canonical: 'https://zprintpro.com/zh-hk/services/{page_slug}',
    languages: {{
      'zh-HK': 'https://zprintpro.com/zh-hk/services/{page_slug}',
      'en': 'https://zprintpro.com/en/services/{page_slug}',
      'ja': 'https://zprintpro.com/ja/services/{page_slug}',
    }},
  }},"""

def generate_enhanced_page(slug, config):
    filepath = os.path.join(SERVICES_DIR, slug, "page.tsx")
    if not os.path.exists(filepath):
        print(f"❌ 页面不存在: {filepath}")
        return False
    
    backup_file(filepath)
    
    # 构建 metadata
    metadata_title = config.get("title_suffix", f"{slug} | ZPrintPro")
    metadata_desc = config.get("description", f"專業香港{slug}服務，請聯繫我們獲取報價。")
    
    metadata_code = f"""export const metadata: Metadata = {{
  title: '{metadata_title}',
  description: '{metadata_desc}',
  {inject_canonical_and_hreflang(slug)}
  openGraph: {{
    title: '{metadata_title}',
    description: '{metadata_desc}',
    images: ['/og/{slug}.jpg'],
    locale: 'zh_HK',
  }},
}};
"""
    
    # 构建页面主体
    if config.get("content_type") == "informational":
        sections_html = "\n".join([f"      <div>{line}</div>" for line in config["sections"]])
        main_content = f"""
      <div className="prose max-w-none">
        {sections_html}
      </div>
"""
    else:
        scenarios_html = ""
        if "scenarios" in config:
            scenarios_html = f"""
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">適用場景</h2>
        <ul className="list-disc pl-6">
          {''.join([f'<li>{s}</li>' for s in config['scenarios']])}
        </ul>
      </div>
"""
        material_html = f"""
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">材質與尺寸對照表</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            {config.get('material_table', '</table><td>暫無數據</td></tr>')}
          </table>
        </div>
      </div>
"""
        advantages_html = f"""
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">為什麼選擇智印云？</h2>
        <ul className="list-disc pl-6">
          {''.join([f'<li>{a}</li>' for a in config.get('advantages', [])])}
        </ul>
      </div>
"""
        process_html = f"""
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">服務流程</h2>
        <p>{config.get('process', '諮詢 → 報價 → 印刷 → 送貨')}</p>
      </div>
"""
        cta_html = f"""
      <div className="mt-8 text-center">
        <a href="{config.get('cta_link', '/zh-hk/quote')}" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          {config.get('cta_text', '立即報價')}
        </a>
      </div>
"""
        main_content = scenarios_html + material_html + advantages_html + process_html + cta_html
    
    # FAQ
    faq_items = config.get("faq_extra", [])
    if faq_items:
        faq_jsx = "\n".join([
            f"""        <div key={i}>
            <h3 className="text-lg font-semibold">{item['q']}</h3>
            <p className="text-gray-600 mt-1">{item['a']}</p>
        </div>"""
            for i, item in enumerate(faq_items)
        ])
    else:
        faq_jsx = '        <div>暫無常見問題，請直接聯繫我們。</div>'
    
    # 面包屑 Schema
    breadcrumb_schema = inject_breadcrumb_schema(slug, config.get("h1", slug))
    schema_script = f"""
      <Script id="breadcrumb-schema" type="application/ld+json">
        {json.dumps(breadcrumb_schema, ensure_ascii=False)}
      </Script>
"""
    
    # 生成函数名: 将 slug 中的连字符替换为下划线
    func_name = slug.replace('-', '_') + "Page"
    
    # 内部链接模块（通用）
    internal_links_html = """
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">其他服務</h2>
          <div className="flex flex-wrap gap-4">
            <a href="/zh-hk/services/poster-printing" className="text-blue-600 underline">海報印刷</a>
            <a href="/zh-hk/services/leaflet" className="text-blue-600 underline">宣傳單張設計</a>
            <a href="/zh-hk/services/leaflet-printing" className="text-blue-600 underline">宣傳單張印刷</a>
            <a href="/zh-hk/services/food-packaging-printing" className="text-blue-600 underline">食品包裝印刷</a>
          </div>
        </div>
"""
    
    page_code = f"""import {{ Metadata }} from 'next';
import Script from 'next/script';

{metadata_code}

export default function {func_name}() {{
  return (
    <>
      {schema_script}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">{config.get('h1', slug)}</h1>
        {main_content}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">常見問題</h2>
          <div className="space-y-4">
{faq_jsx}
          </div>
        </div>
        {internal_links_html}
      </div>
    </>
  );
}}
"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(page_code)
    print(f"✅ 已增强页面: {filepath}")
    return True

def main():
    pages = {
        "poster-printing": ENHANCEMENTS["poster-printing"],
        "leaflet": ENHANCEMENTS["leaflet"],
        "leaflet-printing": ENHANCEMENTS["leaflet-printing"],
        "food-packaging-printing": ENHANCEMENTS["food-packaging-printing"],
    }
    for slug, config in pages.items():
        generate_enhanced_page(slug, config)
    print("\n🎉 所有页面增强完成。")

if __name__ == "__main__":
    main()