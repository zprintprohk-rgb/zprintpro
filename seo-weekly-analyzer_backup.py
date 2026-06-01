#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import pandas as pd
import json
import os
from datetime import datetime

GSC_FILE = r"F:\zprintpro-nextjs\gsc_data.csv"
HISTORY_FILE = r"F:\zprintpro-nextjs\seo-weekly-history.json"
OUTPUT_DIR = r"F:\zprintpro-nextjs"

def analyze_gsc():
    if not os.path.exists(GSC_FILE):
        print(" GSC 文件不存在")
        return
    df = pd.read_csv(GSC_FILE)
    # 排除竞品
    df = df[~df['热门查询'].str.contains('智印港', na=False)]
    # 高潜力关键词
    high_potential = df[(df['展示'] > 50) & (df['排名'] >= 20) & (df['排名'] <= 50)]
    high_potential = high_potential.sort_values('展示', ascending=False)
    # 生成报告
    lines = []
    lines.append(f"# SEO 周报 {datetime.now().strftime('%Y-%m-%d')}")
    lines.append("")
    lines.append("##  高潜力关键词（展示>50，排名20-50）")
    lines.append("")
    for _, row in high_potential.head(10).iterrows():
        lines.append(f"- **{row['热门查询']}**：展示 {row['展示']}，排名 {row['排名']:.1f}")
    lines.append("")
    lines.append("##  优化建议")
    lines.append("")
    lines.append("请运行 SEO 分析获取详细优化方案。")
    report = "\n".join(lines)
    output_path = os.path.join(OUTPUT_DIR, f"seo-weekly-report-{datetime.now().strftime('%Y-%m-%d')}.md")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report)
    print(f" 报告已保存至 {output_path}")

if __name__ == "__main__":
    analyze_gsc()
