# 2026-10-28 K3 待拍板汇总（包装策略批次）

> 日期：2026-10-28 11:10 · 执行层已完成 30 天路线图 P0-P2 内容层全部内容改动

## 一、本日已上线（无需拍板，只汇报）

| 批 | 内容 | commit |
|---|---|---|
| D6-D7 | zh kraft 主词冲刺（f728356d 批） | 已上线 09:48 |
| D8-D10 | en supplier 冲刺（electronics/food checklist 段） | 已上线 09:48 |
| D11-D12 | ja rigid 貼り箱全量（术语段 + JPY 本地化 + 上製本箱=0） | d96186fb → 10:23 |
| D13 | 三语 category→PDP 内链（supplier 词支撑） | c964a4f3 → 10:23 |
| P0 延伸 | bannerCaps en/ja 免费样残留清 | bded0eab → 11:01 |
| P2-ASSET-01 | kraft/mailer/food 印前·QC·尺寸 段 + 全站 免費樣品對比×70 清 | 34df6950 → 11:01 |

线上探针终验：D8-D10 / D11-D12 / D13 / P2 批 全绿（免费实物样断言归零、贴り箱/上製本箱=0、内链 200、印前/QC/尺寸 段渲染）。

## 二、待 K3 拍板（2 项）

### 1. P2-CONSOL-01 pricing blog 归并（D22-25）
- **决策包**：`docs/2026-10-28-packaging-batch-p2consol-decision.md`
- 现状：pricing-2026（8 内链）vs price-2026（0 内链孤儿），title 意图重复（Packaging Box Printing Price 2026 + 500/1000/5000 pcs）
- **推荐 A**：保留 pricing-2026 + 301 price-2026（链接权重集中）
- 备选 B（两篇分工改 title）/ C（先观察）
- 前置：GSC 新导出看两篇展示量佐证

### 2. dsh 凭据重存（K3-10 已登记）
- Task Scheduler 缺 DEEPSEEK_API_KEY → K3 管理员按 K3-10 重存 dsh 凭据
- 重存后执行层跑新 GSC 导出 → 反馈环四指标首跑（点击/曝光/CTR/排名 + 23 带钱词 + 首页词数 + 关键词行数）

## 三、watch 项（后续批）

- 全站 ja 泛企业 H1 ×16（rigid 之外）→ 逐 SKU 修
- ja category HK$ ×10 → JPY 本地化
- 信封 FAQ 转化数据泄漏 + 纸袋/贺卡/婚礼/学校 免费样 → 七簇域移交
- 刀模模板声明（无 href）→ 业务提供真实文件 or 条件化
- en/ja kraft/mailer/food QC 增强 → D22-25 归并轮
