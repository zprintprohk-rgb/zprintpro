import pandas as pd

# 读取数据
df = pd.read_csv(r"F:\zprintpro-nextjs\gsc_data.csv")

# 列名对应
query_col = '热门查询'
clicks_col = '点击次数'
impressions_col = '展示'
ctr_col = '点击率'
position_col = '排名'

print("✅ 数据加载成功")
print(f"总行数: {len(df)}")
print(f"列名: {df.columns.tolist()}")
print()

# 排除竞品
df = df[~df[query_col].str.contains('智印港', na=False)]
print(f"排除'智印港'后剩余: {len(df)}行")
print()

# 按点击排序
top_clicks = df.sort_values(clicks_col, ascending=False).head(10)
print("🏆 按点击量 TOP 10（排除智印港）:")
for _, row in top_clicks.iterrows():
    print(f"{row[query_col]} | 点击:{row[clicks_col]} | 排名:{row[position_col]}")
print()

# 按展示排序
top_impressions = df.sort_values(impressions_col, ascending=False).head(10)
print("📊 按展示量 TOP 10:")
for _, row in top_impressions.iterrows():
    print(f"{row[query_col]} | 展示:{row[impressions_col]} | 排名:{row[position_col]} | 点击:{row[clicks_col]}")
print()

# 高潜力词（展示高 + 排名20-50）
potential = df[(df[impressions_col] > 50) & (df[position_col] >= 20) & (df[position_col] <= 50)]
potential = potential.sort_values(impressions_col, ascending=False)
print(f"🎯 高潜力关键词（展示>50, 排名20-50）: {len(potential)}个")
for _, row in potential.head(10).iterrows():
    print(f"{row[query_col]} | 展示:{row[impressions_col]} | 排名:{row[position_col]:.1f}")