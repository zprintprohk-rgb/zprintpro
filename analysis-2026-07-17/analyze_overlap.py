# -*- coding: utf-8 -*-
"""两站关键词重叠分析: 证明 cannibalization + 生成车道分配表"""
import pandas as pd, sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))

old = pd.read_csv(os.path.join(BASE, '查询数.csv'))          # 老站 z-printpro.com 91天
new = pd.read_csv(os.path.join(BASE, 'gsc-newsite', '查询数.csv'))  # 新站 zprintpro.com 70天
old.columns = ['q','clicks_o','imps_o','ctr_o','pos_o']
new.columns = ['q','clicks_n','imps_n','ctr_n','pos_n']
old['qn'] = old['q'].str.strip().str.lower()
new['qn'] = new['q'].str.strip().str.lower()

both = old.merge(new, on='qn', how='inner')
both['q'] = both['q_x']
both = both.sort_values('imps_o', ascending=False)
print(f"### 两站重叠查询数: {len(both)} (老站总 {len(old)}, 新站总 {len(new)})")
print("\n--- 重叠词 Top 40 (按老站展示排序): 同一批词, Google 分票 ---")
cols = ['q','clicks_o','imps_o','pos_o','clicks_n','imps_n','pos_n']
print(both[cols].head(40).to_string(index=False))

# 自相残杀严重度: 两边都排 10-60 = 谁都进不了首页
kill = both[(both['pos_o']>=8)&(both['pos_o']<=60)&(both['pos_n']>=8)&(both['pos_n']<=60)]
print(f"\n### 互相残杀区 (两站排名都在 8-60): {len(kill)} 个词, 合计展示 老站{kill['imps_o'].sum():.0f} + 新站{kill['imps_n'].sum():.0f}")

# 车道分类
LOCAL_PAT = ['即日','旺角','銅鑼灣','铜锣湾','觀塘','观塘','學校','校簿','校刊','論文','论文','證書','证书','畢業','過膠','过胶','急件','24小時','24小时','一張','自取','門市','门市','獎狀','奖状','智印港']
def lane(q):
    for p in LOCAL_PAT:
        if p in q: return 'OLD(香港本地急件)'
    return 'NEW(跨境B2B钱词)'
both['lane'] = both['q'].apply(lane)
print("\n--- 车道分配建议 (重叠词) ---")
print(both.groupby('lane')[['imps_o','imps_n']].sum().to_string())

# 重叠词里新站排名已经更好的 (移交成本最低)
win_n = both[(both['pos_n']<both['pos_o'])&(both['imps_o']>=50)]
print(f"\n--- 新站排名已优于老站的重叠词 (展示≥50, 移交最顺) ---")
print(win_n[cols].head(15).to_string(index=False))

# 老站独有大词 (新站完全没覆盖)
only_old = old[~old['qn'].isin(new['qn'])].sort_values('imps_o', ascending=False)
print(f"\n--- 老站独有词 Top 20 (新站零覆盖, 合计 {len(only_old)} 个) ---")
print(only_old[['q','clicks_o','imps_o','pos_o']].head(20).to_string(index=False))

# 输出 CSV 供后续 301 映射用
both[cols+['lane']].to_csv(os.path.join(BASE,'overlap-keywords.csv'), index=False, encoding='utf-8-sig')
only_old.to_csv(os.path.join(BASE,'old-only-keywords.csv'), index=False, encoding='utf-8-sig')
print("\n已输出: overlap-keywords.csv, old-only-keywords.csv")
