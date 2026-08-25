# K3 行动包 2: GBP 3 locale 8/27 09:00 亲提 (零决策)

> **拍板来源**: 千问 8/25 13:45 评核 + 撞墙升级 P0 拍板 2
> **执行人**: K3 真人操作 (Google Business Profile 后台)
> **触发**: 8/27 09:00 Asia/Shanghai (30-40 min 窗口)
> **数据来源**: K3 8/25 11:48 战略升级 + .hermes/k3-inbox/g2-gbp-profile-{zh-hk,en,ja}.md (8/24 17:54 + 8/25 04:55 落)

---

## 0. SOP-10 5 问门禁 (K3 §0.22-§0.24)

- [x] 1. 架构差异? — GBP 是 GEO 基础设施, 不影响 SEO 战略层
- [x] 2. 约束适用范围? — F0 红线, NAP 真实 (深圳实体, K3 8/19 拍板)
- [x] 3. 原数据/拍板来源? — K3 8/19 v3.7 SOP-13 拍板 12 行业 + K3 8/7 phase-out 198 拍板真实电话
- [x] 4. 字段值策略? — 基础设施, 不改 src/ 字段
- [x] 5. Markdown 渲染? — N/A
- **§0.24 笼统批准 ≠ 动作完成**: GBP 提交 ≠ GBP 验证通过, 撞墙 = 24-48h 审核期

**数据来源**:
- K3 8/19 v3.7 拍板 12 大行业 + 3 Locale NAP
- K3 8/7 phase-out 181→198 拍板真实电话
- K3 8/8 02:52 拍板 ジープリント ja alternate brand
- K3 8/24 17:54 G2 commit 8ded99f (zh-hk GBP 基础 2.6KB)
- K3 8/25 04:55 P1 #10 落 en/ja GBP (8.6KB + 8.5KB)

---

## 1. GBP 提交前预检 (8/26 M3 跑, 8/27 K3 提交前确认)

### 1.1 NAP 一致性预检表 (3 处 NAP 逐字一致)

**预检脚本**: M3 8/26 14:00 跑 docs/k3-action-package-gbp-2026-08-27.md 配套脚本

| 位置 | 名称 | 地址 | 电话 | 来源 |
|------|------|------|------|------|
| 站点 footer (zh-hk) | 智印港 ZprintPro | 香港九龍新蒲崗大有街3號萬廣大廈15樓C室 | +86 198 8085 1334 | K3 8/7 phase-out 198 |
| 站点 contact 页 | 智印港 ZprintPro | 香港九龍新蒲崗大有街3號萬廣大廈15樓C室 | +86 198 8085 1334 | K3 8/7 phase-out 198 |
| GBP zh-hk | 智印港 | 広東省深圳市龍崗区平湖街道嘉城路1号 (〒518111) | +86 198 8085 1334 | K3 8/19 v3.7 真实实体 |
| GBP en | ZprintPro | 広東省深圳市龍崗区平湖街道嘉城路1号 | +86 198 8085 1334 | K3 8/19 v3.7 |
| GBP ja | ジープリント | 広東省深圳市龍崗区平湖街道嘉城路1号 | +86 198 8085 1334 | K3 8/19 + 8/8 02:52 |

**M3 撞墙升级**: 站点 footer + contact 页是 HK 地址 (九龍), GBP 是 SZ 地址 (深圳), NAP 不一致 = ⚠️ **K3 必拍**:
- 选 A: 站点 footer 改 SZ 地址 (F0 红线 K3 8/22 17:58 "不删字段" 不动, 改是允许的)
- 选 B: GBP 改 HK 地址 (F0 NAP 真实 K3 8/19 拍板, 不能改)
- **M3 建议**: 选 A 站点 footer 改 SZ 地址 (跟 NAP 真实一致, 8/19 拍板 F0 真实主体)

### 1.2 类目选择 (3 locale 同步)

**主类目**: Print shop (印刷店) / Printing company (印刷公司)
**次类目**: Packaging company (包装公司) / Commercial printer (商业印刷)
**隐藏属性**: 
- Identifies as: Foreign-owned (HK brand, Shenzhen factory) - K3 8/19 拍板
- 营业时间: 週一至週六 09:00-18:00 (GMT+8) - K3 8/19 拍板
- 网站 URL: https://zprintpro.com/{zh-hk,en,ja}/

### 1.3 服务区

- **主要**: 香港全境 (港島 / 九龍 / 新界 + outlying islands)
- **次要**: Macau + Greater Bay Area (大灣區 9+2 城市) + 全球 50+ 國家 (DHL/FedEx)
- K3 8/19 拍板 12 大行业 + K3 8/24 战略升级 1.5 SOP-13 NAP 一致性

### 1.4 照片清单 (≥5 张, E-E-A-T 信号)

| # | 照片 | 描述 | 来源 | 备选 URL |
|---|------|------|------|----------|
| 1 | 厂房外观 | 深圳工厂全景 | K3 8/24 17:54 拍板"照片 1" | /images/factory/factory-exterior.webp |
| 2 | Heidelberg 6+1 | 海德堡 Speedmaster CD 102-6+1 | K3 8/24 17:54 拍板"照片 3" | /images/factory/heidelberg-6+1.webp |
| 3 | HP Indigo | HP Indigo 12000 數碼印刷機 | K3 8/24 17:54 拍板"照片 4" | /images/factory/hp-indigo.webp |
| 4 | 样品墙 | 客製貼紙 / 包裝盒 / 紙袋 樣品 | K3 8/24 17:54 拍板"照片 6+7+8" | /images/factory/samples-wall.webp |
| 5 | 团队 | 創始人 / 工程師 / 客服 團隊 | K3 8/19 拍板 12 大行业 | /images/team/team-photo.webp |

**M3 撞墙升级**: 实际 5 张照片 K3 准备, M3 8/26 14:00 出照片清单 + URL, K3 8/27 上传。

### 1.5 验证方式

- **优先**: 电话 / 短信 即时验证 (5 min, K3 立即可接)
- **次选**: 明信片验证 (1-2 周, Google 寄出, K3 收件后输入代码)
- **推荐**: 电话验证 (撞墙 = 0, K3 准备 +86 198 8085 1334 接收)

### 1.6 提交后 7 天静置期

- 8/27 提交后, 8/28-9/3 7 天静置 (不编辑 / 不催审 / 不重传)
- 8/28 11:00 + 8/28 14:00 + 8/28 16:00 撞墙 = K3 拍板 不编辑 GBP
- 9/4 8/28 7 天后 = 可编辑 (如审核未过, 重新提交)

## 2. GBP 3 locale 提交步骤 (30-40 min 撞墙 = 0 准备 + 真人操作)

### 2.1 zh-hk 提交 (10 min, K3 真人)

```
1. 浏览器打开 https://business.google.com (中文)
2. 创建 / 选择 ZprintPro 香港 智印港 业务
3. 业务名称: 智印港
4. 主要类目: Print shop
5. 次要类目: Packaging company
6. 地址: 広東省深圳市龍崗区平湖街道嘉城路1号 (〒518111) [K3 8/19 拍板]
7. 服务区: 香港全境 + Macau + Greater Bay Area
8. 电话: +86 198 8085 1334 [K3 8/7 phase-out 198]
9. 网站: https://zprintpro.com/zh-hk/
10. 营业时间: 週一至週六 09:00-18:00 (GMT+8)
11. 验证方式: 电话 +86 198 8085 1334 [K3 准备]
12. 照片 ≥5: 厂房 + Heidelberg + HP Indigo + 样品墙 + 团队
13. 业务描述: 粘贴 zh-hk GBP 文案 (8/24 17:54 g2-gbp-profile-zh-hk.md)
14. 提交 → 等待 24-48h 审核
```

### 2.2 en 提交 (10 min, K3 真人)

```
1. 浏览器打开 https://business.google.com (English, US/UK/AU 推荐)
2. 切换到 ZprintPro 业务
3. 业务名称: ZprintPro
4. 主要类目: Commercial Printer
5. 次要类目: Packaging Company
6. 地址: No. 1 Jiacheng Road, Pinghu Subdistrict, Longgang District, Shenzhen, Guangdong, China 518111
7. 服务区: Hong Kong 全境 + Global 50+ countries
8. 电话: +86 198 8085 1334
9. 网站: https://zprintpro.com/en/
10. 营业时间: Monday-Friday 9:00-18:00 (UTC+8) + Saturday 10:00-16:00
11. 验证方式: 电话 +86 198 8085 1334
12. 照片 ≥5: 同 zh-hk (但 alt 改英文)
13. 业务描述: 粘贴 en GBP 文案 (8/25 04:55 g2-gbp-profile-en.md 728 chars)
14. 提交 → 等待 24-48h 审核
```

### 2.3 ja 提交 (10 min, K3 真人)

```
1. 浏览器打开 https://business.google.com (日本語)
2. 切换到 ジープリント 业务
3. 業務名: ジープリント (per K3 8/8 02:52 拍板 alternate brand)
4. 主要カテゴリ: 印刷サービス
5. 次要カテゴリ: パッケージ印刷
6. 住所: 中華人民共和国広東省深圳市龍崗区平湖街道嘉城路 1 号 (〒518111)
7. サービスエリア: 香港全境 + 日本全国 (ヤマト運輸 / 沖縄・北海道含む)
8. 電話: +86 198 8085 1334
9. ウェブサイト: https://zprintpro.com/ja/
10. 営業時間: 月-金 9:00-18:00 (UTC+8) + 土 10:00-16:00
11. 検証方法: 電話 +86 198 8085 1334
12. 写真 ≥5: 同 zh-hk (alt 日本語)
13. 業務説明: 粘贴 ja GBP 文案 (8/25 04:55 g2-gbp-profile-ja.md 562 chars)
14. 提出 → 24-48h 審査
```

## 3. 8/27 K3 行动顺序 (30-40 min 全流程)

```
09:00  K3 上线, M3 报告 GBP 行动包
09:05  K3 准备 5 张照片 (K3 已有 /images/factory/* + /images/team/*)
09:10  K3 浏览器开 zh-hk GBP, 12 步 10 min
09:20  K3 切 en GBP, 12 步 10 min
09:30  K3 切 ja GBP, 12 步 10 min
09:40  GBP 3 locale 提交完成
09:40-10:00  K3 等待电话验证 (K3 准备 +86 198 8085 1334 接收)
```

## 4. 撞墙升级 + K3 必拍决策

**M3 撞墙 = 0 (8/26 14:00 跑预检)**:
- NAP 一致性预检表 (8/26 14:00)
- 5 张照片 URL 清单 (8/26 14:00)
- GBP 3 locale 业务描述文案 (8/24 17:54 + 8/25 04:55 已落)

**M3 撞墙 = K3 必拍 (NAP 不一致)**:
- 站点 footer / contact 页地址是 HK 九龍, GBP 是 SZ 深圳
- **M3 建议**: 选 A 站点 footer 改 SZ 地址 (8/19 拍板 NAP 真实, 8/27 前 M3 改)
- 撞墙 = K3 拍板 footer / contact 改 SZ (1 改 1 验证, F0 红线不删字段, 改字段允许)

**M3 撞墙 = K3 真人 (8/27 09:00 窗口)**:
- 12 步 × 3 locale = 30-40 min, K3 真人操作

## 5. 8/27-9/3 7 天静置期 + 9/4 验证

- 8/27-9/3: 7 天静置 (不编辑 / 不催审 / 不重传, 避免触发重审)
- 8/28 中检: M3 记 GBP 提交状态 ⏳
- 9/4 8/28 7 天后: GBP 后台查看审核状态
  - ✅ 通过: 8/28 战略升级 #6 Local Pack + 评价 ≥ 5 条
  - 🔴 未过: M3 重新跑 NAP 预检 + 拍照清单 + 8/28 EOD 重报

## 6. 配套

- .hermes/k3-inbox/g2-gbp-profile-zh-hk.md (2.6KB, 8/24 17:54 K3 拍板)
- .hermes/k3-inbox/g2-gbp-profile-en.md (8.6KB, 8/25 04:55 M3 落)
- .hermes/k3-inbox/g2-gbp-profile-ja.md (8.5KB, 8/25 04:55 M3 落)
- docs/r0-action-cards-status-2026-08-25.md (R0 5 项 M3 建议)
- AGENTS.md §0.22-§0.24 (K3 8/25 拍板强制级)
