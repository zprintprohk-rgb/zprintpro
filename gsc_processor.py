#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GSC 数据处理模块 v2.0
读取 gsc_data.csv → 分析关键词 → 为服务页面生成 SEO 补丁
"""
import pandas as pd
import json, os, re, hashlib
from datetime import datetime

BASE = r"F:\zprintpro-nextjs"
GSC_FILE = os.path.join(BASE, "gsc_data.csv")
PATCHES_FILE = os.path.join(BASE, "gsc_patches.json")

# 关键词 → 服务页面映射（手动维护，可扩展）
SERVICE_PAGES = {
    "食品包裝印刷": {
        "slug": "food-packaging-printing",
        "aliases": ["食品包装", "食品盒", "牛油纸袋", "食品贴纸", "food packaging"]
    },
    "宣傳單張": {
        "slug": "leaflet",
        "aliases": ["传单", "leaflet", "flyer", "单张", "leaflet design"]
    },
    "宣傳單張印刷": {
        "slug": "leaflet-printing",
        "aliases": ["leaflet print", "传单印刷", "flyer printing", "leaflet printing"]
    },
    "海報印刷": {
        "slug": "poster-printing",
        "aliases": ["海报", "poster", "印海报", "海报快印"]
    },
    "印海報": {
        "slug": "poster-printing",
        "aliases": ["印海报", "poster", "海報印刷"]
    },
}

# 新增页面映射拓展（可在此处添加更多映射）
# "印刷": {"slug": "printing-service", "aliases": ["印刷服务", "香港印刷"]},

def load_gsc():
    if not os.path.exists(GSC_FILE):
        raise FileNotFoundError(f"GSC 数据文件不存在: {GSC_FILE}")
    df = pd.read_csv(GSC_FILE)
    df = df[~df['热门查询'].str.contains('智印港', na=False)]
    print(f"  加载 GSC 数据: {len(df)} 条, 排除智印港后 {len(df)} 条")
    return df

def classify_keywords(df):
    """将 GSC 关键词分类到服务页面"""
    page_keywords = {}
    for svc, info in SERVICE_PAGES.items():
        page_keywords[svc] = {"keywords": [], "total_clicks": 0, "total_impressions": 0}
    
    for _, row in df.iterrows():
        kw = row['热门查询']
        clicks = int(row['点击次数'])
        impressions = int(row['展示'])
        rank = float(row['排名'])
        
        matched = False
        for svc, info in SERVICE_PAGES.items():
            if any(alias.lower() in kw.lower() for alias in info["aliases"]):
                page_keywords[svc]["keywords"].append({
                    "keyword": kw, "clicks": clicks,
                    "impressions": impressions, "rank": rank
                })
                page_keywords[svc]["total_clicks"] += clicks
                page_keywords[svc]["total_impressions"] += impressions
                matched = True
                break
        
        if not matched:
            pass  # 未匹配的关键词可记录日志
    
    return page_keywords

def generate_patches(page_keywords):
    """为每个服务页面生成 SEO 补丁"""
    patches = []
    
    for svc, data in page_keywords.items():
        if not data["keywords"]:
            continue
        
        info = SERVICE_PAGES[svc]
        slug = info["slug"]
        page_path = os.path.join(BASE, "app", "zh-hk", "services", slug, "page.tsx")
        
        if not os.path.exists(page_path):
            print(f"  ⚠️ 页面文件不存在: {page_path}")
            continue
        
        # 取 TOP 关键词
        top_kws = sorted(data["keywords"], key=lambda x: x["clicks"], reverse=True)[:5]
        core_kw = top_kws[0]["keyword"] if top_kws else svc
        
        patches.append({
            "slug": slug,
            "page_path": page_path,
            "service": svc,
            "core_keyword": core_kw,
            "top_keywords": top_kws,
            "total_clicks": data["total_clicks"],
            "total_impressions": data["total_impressions"],
            "optimized_title": f"{core_kw} | 香港智印云 ZPrintPro — 專業定制印刷",
            "optimized_h1": f"香港{core_kw}專業服務",
            "optimized_desc": f"香港{core_kw}服務｜智印云 ZPrintPro 提供專業定制印刷，500+香港商戶信賴，免費打樣全港送貨。立即報價！",
            "suggested_faqs": [
                {"q": f"香港{core_kw}的價格是多少？", "a": f"價格視尺寸、數量和材質而定。智印云提供免費報價，量大更優惠。"},
                {"q": f"{core_kw}需要多長時間交貨？", "a": "標準3-5天，急單24小時起貨。全港免費送貨。"},
            ]
        })
    
    return patches

def save_patches(patches):
    with open(PATCHES_FILE, "w", encoding="utf-8") as f:
        json.dump(patches, f, ensure_ascii=False, indent=2)
    print(f"  ✅ 補丁文件已保存: {PATCHES_FILE} ({len(patches)} 個補丁)")
    for p in patches:
        print(f"     · {p['service']:10s} → {p['slug']:30s} (關鍵詞: {p['core_keyword']})")
    return patches

def main():
    print("🔍 GSC 數據處理開始")
    df = load_gsc()
    page_kws = classify_keywords(df)
    patches = generate_patches(page_kws)
    save_patches(patches)
    print(f"\n🎉 完成！為 {len(patches)} 個服務頁面生成了 SEO 補丁")

if __name__ == "__main__":
    main()
