# M3 P0 修复 - 方案 B 详细步骤 — 2026-07-29 20:18

## K3 4 次 token 失败诊断 (20:18 总结)

| 轮次 | token | scopes | list 状态 |
|---|---|---|---|
| 19:30 | cfut_Kf6... | (verify fail 401) | n/a |
| 19:55 | cfut_T7b... | [] | 403 |
| 20:04 | cfut_q7e... | [] | 403 |
| 20:15 | cfut_hri... | [] | 403 |

**根因**: K3 一直在 CF Dashboard 看到的是 **"Edit Token" 页面** (token 名字 "My Profile" 而不是 "CF_API_TOKEN"), 改了权限配置但**没点底部 "Save" / "Create Token" 提交**, 所以 token scope 仍是 0. K3 把没保存的 token 字符串误当成新 secret 写进 .env.

**M3 20:18 拍板**: 不再尝试 token, 走方案 B (K3 手动改 CF Dashboard). 5 min 完成.

## 方案 B 详细步骤 (5 min, K3 自己改)

### Step 1: 打开 z-printpro.com zone 的 Bulk Redirects
- https://dash.cloudflare.com/
- 选 **z-printpro.com** zone (注意不是 zprintpro.com)
- 左侧菜单 → **Rules** → **Redirect Rules**

### Step 2: 找承载 149 条规则的 list
- 列表里应该有 z_printpro_legacy_301 (K3 7/22 创建的 list)
- 点 list 名字进去

### Step 3: 看现有 rules 配置
- 应该看到约 149 条 rules
- 每条 rule 的格式类似:
  - Field: URI Path
  - Operator: equals
  - Value: /products/packaging-box-printing/ (等)
  - Action: URL Redirect
  - Status code: 301
  - Destination URL: https://zprintpro.com/zh-hk/category/packaging/ (等)
- **当前配置问题**: 缺少 "Hostname" 条件, 所以 host 匹配只走 zone 默认 (www 跟 裸域行为不同)

### Step 4: 修改 host 匹配 (K3 关键动作)
- 点某条 rule 的 "Edit" (或批量 edit)
- 在 rule 顶部条件区, 加 "Hostname" 字段:
  - Field: Hostname
  - Operator: is in
  - Value: z-printpro.com AND www.z-printpro.com (用逗号分隔或 + Add Value 加两个)
- **或更稳**: 改 rule expression 为 http.host in {"z-printpro.com" "www.z-printpro.com"} (CF Ruleset expression editor)
- 保存 rule

### Step 5: 验证
- 改完 K3 自己电脑 curl:
  - curl.exe -s -o /dev/null -w "%{http_code}" https://www.z-printpro.com/products/packaging-box-printing/ 期望 301
  - curl.exe -s -o /dev/null -w "%{http_code}" https://www.z-printpro.com/products/label-sticker-printing/ 期望 301
  - curl.exe -s -o /dev/null -w "%{http_code}" https://www.z-printpro.com/products/nonexistent-product-12345/ 期望 301 (catch-all)
  - 5 URL 全 301 = 修好
- 通知 M3, M3 跑双侧 10 抽样 + 写报告

### Step 6: 备选 (如果 Step 4 操作不熟)
- 找一条 rule 看 "Edit" 按钮位置
- K3 截图 "Edit Rule" 页面给我, 我看明白 UI 后告诉 K3 改哪里
- 不需要 K3 截图整张页面, 截 1-2 张关键位置

## M3 0 commit / 0 push 总结 (7/29 1.5 hr 状态)

- 0 commit / 0 push
- token 失败 4 次 (K3 流程卡点)
- 真根因 (8/8 裸域 PASS + 5/8 www FAIL) 已找到 (list host 匹配缺 www)
- 等 K3 方案 B 改完, 5 min 完成
- 7/30 P4 cron 6 hr 后触发, K3 改完 7/29 21:00-22:00 push P0, 7/30 02:30 跟 P4 cron 拆开

## 0 commit / 0 push (本次仅诊断)