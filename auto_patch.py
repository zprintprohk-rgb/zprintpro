#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
顶级 SEO+GEO 增强版补丁生成器
直接从 GSC 导出的 CSV 读取高潜力关键词，生成：
- 优化标题/H1/Meta Description
- FAQ 列表（含问题与答案）
- FAQPage Schema JSON-LD
- 内部链接推荐
- 外链机会收集（模拟）
"""

import os
import json
import csv
import pandas as pd
from datetime import datetime

# ================== 配置 ==================
GSC_CSV_PATH = r"F:\zprintpro-nextjs\gsc_data.csv"      # 你的 GSC 导出文件
OUTPUT_DIR = r"F:\zprintpro-nextjs\patches"              # 补丁输出目录
OUTREACH_CSV = r"F:\zprintpro-nextjs\outreach_opportunities.csv"  # 外链机会

# 模拟竞品数据（实际应用中可替换为 browser 实时抓取）
COMPETITOR_CACHE = {
    "食品包裝印刷": {
        "intent": "commercial",
        "competitors": [
            {"title": "食品包裝印刷公司 | 香港環保包裝專家", "h1": "香港食品包裝印刷｜免費打樣"},
            {"title": "食品包裝盒訂製｜食品級紙袋印刷 - 快印王", "h1": "食品級包裝盒訂製"},
            {"title": "小批量食品包裝印刷｜港九新界送貨", "h1": "小批量食品包裝印刷"}
        ],
        "people_also_ask": [
            "食品包裝印刷需要什麼認證？",
            "香港邊度有得印食品包裝盒？",
            "最小起訂量幾多？"
        ]
    },
    "宣傳單張": {
        "intent": "transactional",
        "competitors": [
            {"title": "宣傳單張印刷｜500張起印｜免費設計", "h1": "宣傳單張印刷專家"},
            {"title": "香港宣傳單張印刷｜即日交貨｜低至$0.5/張", "h1": "宣傳單張印刷即日取"},
            {"title": "宣傳單張設計+印刷套餐", "h1": "設計印刷一站式服務"}
        ],
        "people_also_ask": [
            "宣傳單張印刷幾錢？",
            "A4宣傳單張尺寸？",
            "邊度印宣傳單張平？"
        ]
    },
    "海報印刷": {
        "intent": "commercial",
        "competitors": [
            {"title": "海報印刷｜海報設計+印製｜快印公司", "h1": "專業海報印刷"},
            {"title": "香港海報印刷｜即日可取｜低至$10/張", "h1": "海報印刷即日取"}
        ],
        "people_also_ask": [
            "海報印刷尺寸有邊啲？",
            "海報用咩紙好？"
        ]
    }
    # 你可以继续添加更多关键词的竞品数据，也可以留空让脚本使用通用模板
}

# ================== 核心函数 ==================
def extract_keywords_from_csv(csv_path):
    """从 GSC CSV 中提取高潜力关键词（展示>50，排名20-50）"""
    if not os.path.exists(csv_path):
        print(f"❌ CSV 文件不存在: {csv_path}")
        return []
    df = pd.read_csv(csv_path)
    # 列名映射
    query_col = '热门查询'
    impressions_col = '展示'
    position_col = '排名'
    # 排除竞品“智印港”
    df = df[~df[query_col].str.contains('智印港', na=False)]
    # 筛选条件
    mask = (df[impressions_col] > 50) & (df[position_col] >= 20) & (df[position_col] <= 50)
    high_potential = df[mask].sort_values(impressions_col, ascending=False)
    keywords = []
    for _, row in high_potential.iterrows():
        keywords.append({
            "keyword": row[query_col],
            "impressions": int(row[impressions_col]),
            "rank": float(row[position_col])
        })
    return keywords[:10]   # 最多处理10个

def analyze_intent_and_competitors(keyword):
    """获取关键词的意图和竞品数据（从缓存或通用模板）"""
    data = COMPETITOR_CACHE.get(keyword, {})
    if not data:
        # 通用模板
        return {
            "intent": "commercial",
            "competitors": [],
            "people_also_ask": [
                f"{keyword} 邊度平？",
                f"{keyword} 最少要印幾多？",
                f"{keyword} 有無免費打樣？"
            ]
        }
    return {
        "intent": data.get("intent", "commercial"),
        "competitors": data.get("competitors", []),
        "people_also_ask": data.get("people_also_ask", [])
    }

def generate_optimized_title(keyword, intent, competitors):
    """生成顶级标题（含长尾词 + 卖点）"""
    # 根据关键词类型选择后缀
    if "食品" in keyword:
        suffix = "食品級包裝盒/袋訂製｜免費打樣｜智印云"
    elif "宣傳" in keyword:
        suffix = "500張起印｜免費設計｜智印云"
    elif "海報" in keyword:
        suffix = "即日交貨｜多種尺寸｜智印云"
    else:
        suffix = "香港專業訂製｜小批量｜免費送貨｜智印云"
    title = f"{keyword}｜{suffix}"
    if len(title) > 60:
        title = title[:57] + "｜智印云"
    return title

def generate_h1(keyword, intent):
    return f"香港{keyword}｜智印云一站式定制"

def generate_meta_desc(keyword, intent):
    desc = f"專業香港{keyword}服務，提供{keyword}盒/袋/貼紙定制。小批量OK，3天交貨，免費設計打樣。立即報價！"
    if len(desc) > 160:
        desc = desc[:157] + "..."
    return desc

def generate_faq_list(keyword, people_also_ask):
    """生成 FAQ 列表，每个元素包含 question 和 answer"""
    faqs = []
    for q in people_also_ask[:3]:
        answer = f"智印云 ZPrintPro 提供專業{keyword}服務。{q} 我們的最小起訂量為500個，可提供食品級認證，全港免費送貨。"
        faqs.append({"question": q, "answer": answer})
    return faqs

def generate_schema(keyword, faqs):
    """生成 FAQPage Schema JSON-LD 字符串"""
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": f["question"],
                "acceptedAnswer": {"@type": "Answer", "text": f["answer"]}
            }
            for f in faqs
        ]
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def recommend_internal_links(keyword, project_root):
    """基于文件名关键字推荐内部链接（简单匹配）"""
    links = []
    services_dir = os.path.join(project_root, "app", "zh-hk", "services")
    if not os.path.exists(services_dir):
        return links
    for folder in os.listdir(services_dir):
        if folder != keyword and (keyword in folder or folder in keyword):
            links.append(f"/zh-hk/services/{folder}")
    return links[:3]

def collect_outreach_opportunities():
    """收集外链机会（模拟，实际可用 browser 抓取）"""
    opportunities = [
        {"site": "香港印刷目錄", "url": "https://www.hkdir.com/submit", "da": 30},
        {"site": "Printing Directory HK", "url": "https://www.printinghk.com/add", "da": 25},
        {"site": "香港商家目錄", "url": "https://hkdir.net/submit", "da": 20}
    ]
    with open(OUTREACH_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=["site", "url", "da"])
        writer.writeheader()
        writer.writerows(opportunities)
    return OUTREACH_CSV

def main():
    # 1. 读取高潜力关键词
    keywords = extract_keywords_from_csv(GSC_CSV_PATH)
    if not keywords:
        print("⚠️ 未提取到高潜力关键词，请检查 CSV 路径或筛选条件。")
        return

    # 2. 为每个关键词生成补丁
    patches = []
    for kw in keywords:
        keyword = kw["keyword"]
        impressions = kw["impressions"]
        rank = kw["rank"]
        
        # 获取意图和竞品数据
        data = analyze_intent_and_competitors(keyword)
        intent = data["intent"]
        people_also_ask = data["people_also_ask"]
        
        # 生成优化内容
        title = generate_optimized_title(keyword, intent, data["competitors"])
        h1 = generate_h1(keyword, intent)
        meta_desc = generate_meta_desc(keyword, intent)
        faqs = generate_faq_list(keyword, people_also_ask)
        schema = generate_schema(keyword, faqs)
        internal_links = recommend_internal_links(keyword, r"F:\zprintpro-nextjs")
        
        patches.append({
            "keyword": keyword,
            "impressions": impressions,
            "rank": rank,
            "intent": intent,
            "optimized_title": title,
            "optimized_h1": h1,
            "optimized_meta_desc": meta_desc,
            "faq_list": faqs,
            "schema_snippet": schema,
            "internal_links": internal_links,
            "local_entities": ["港鐵沿線", "新界", "九龍", "香港島"]
        })
    
    # 3. 保存补丁 JSON
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    patch_file = os.path.join(OUTPUT_DIR, f"patches_v2_{datetime.now().strftime('%Y%m%d')}.json")
    with open(patch_file, 'w', encoding='utf-8') as f:
        json.dump(patches, f, ensure_ascii=False, indent=2)
    print(f"✅ 生成顶级补丁 {len(patches)} 个，保存至 {patch_file}")
    
    # 4. 收集外链机会
    outreach_file = collect_outreach_opportunities()
    print(f"📎 外链机会已保存至 {outreach_file}")
    
    # 5. 打印第一个补丁示例
    if patches:
        print("\n📋 示例补丁（第一个关键词）：")
        print(json.dumps(patches[0], ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()