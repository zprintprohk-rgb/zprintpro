# K3 指令 v9.3.1 — 执行层 context 耗尽根治协议（L 批续作专用）

> 2026-09-12 11:40 K3 大脑签发 · 效力：deepseek hermes + autoclaw 通用，立即生效
> 触发：L 批连续 2 次「context 已耗尽，请发继续」中断

## 一、根因诊断（实测数据）

L 批剩余 4 文件实测行数（git working tree）:

| 文件 | 行数 |
|---|---|
| about/page.tsx | 988 |
| help-center/HelpCenterClient.tsx | 1,066 |
| payment-methods/page.tsx | 894 |
| legal/page.tsx | 553 |
| 模板基准 contact/page.tsx | 434 |

**3 个根因（按权重）**:
1. **全文重写输出爆炸**（70%）：对 ~900-1000 行文件用整文件 Write 重排，单文件输出 ≈ 3-4 万 token，2 个文件即耗尽
2. **全文读入 + 模板全文读入**（20%）：目标文件 + contact/blog 模板 + 指令包 + AGENTS.md 全部进同一 session，开工前已吃掉大半预算
3. **无检查点续作**（10%）：中断后「继续」重载全部上下文，等于每次从零开始，循环撞墙

## 二、根治 4 条铁律（写进 cron-prompts 指令区，随任务 H 区一并刷新）

### R1. 禁整文件 Write（>200 行既有文件）
L 批 4 文件全部是**排版对齐**，不是重写。只允许 `Edit` 工具做包裹/类名/结构调整：
- banner 替换：定位旧 hero 段首尾 → Edit 替换该段
- 字号/容器：grep 定位 `text-[15px]` / `max-w-*` 等旧值 → Edit 定点改
- **输出 token 从 3-4 万降到 2-3 千**

### R2. 版式规格卡先行（L0，docs-only）
先由执行层从 contact/page.tsx **抽取一次**版式规格，落盘 `docs/v93-inner-page-template-spec.md`（≤3KB）：
- Banner JSX 骨架（橙渐变 150deg #F87314→#EA580C→#C2410C + H1 + 副标）
- 正文区骨架（17.5px 基线 / 1320px 容器 / 白与 #F2F6FF 交替规则）
- 色块/卡片类名清单
之后 L1-L4 各 session **只读规格卡，禁再读 contact/blog 模板全文**。

### R3. 一文件一 session + 检查点续作
- 每 session 只处理 1 个文件（help-center 的 page.tsx 49 行可与 Client 同批）
- 每完成 1 文件：落检查点 `.hermes/logs/v93-L-checkpoint.md`（done 清单 + 本文件 grep 验收结果 + 下一文件名）
- 「继续」时执行层**先读检查点（<1KB），禁重读已完成的文件**

### R4. 分段读，禁全文 cat
定位结构用 Grep（找 `return (` / `<section` / `className="bg-`），细读用 Read line_offset 分段（每次 ≤200 行），禁止无差别全文读取 900+ 行文件。

## 三、L 批重排（替代 deepseek 原 L1/L2/L3 方案）

| 批次 | 内容 | 行数 | session |
|---|---|---|---|
| L0 | 抽版式规格卡（docs-only，不 push src） | ≤3KB 产出 | 1 |
| L1 | about/page.tsx 正文排版（案例无真实处标「待 008 案例库校准」） | 988 | 1 |
| L2 | payment-methods/page.tsx | 894 | 1 |
| L3 | help-center（page.tsx + Client） | 49+1,066 | 1 |
| L4 | legal/page.tsx **只排不改字** | 553 | 1 |

每批独立：门禁 4 件（tsc 54=54 / build exit 0 / bc-ban diff 0 / encoding）→ 攒批可 L1+L2 合 1 push、L3+L4 合 1 push（2 次构建）→ 8 页线上探针（Banner / 17.5px / 1320px / 200）。

## 四、法务页文字零改动的硬验证（L4 必跑）

修改前先快照：
```bash
node -e "const fs=require('fs');const s=fs.readFileSync('src/app/[locale]/legal/page.tsx','utf8');const t=[...s.matchAll(/>([^<>{]*[一-鿿][^<>{]*)</g)].map(m=>m[1].trim()).filter(Boolean).join('|');fs.writeFileSync('.hermes/logs/legal-text-before.txt',t)"
```
改后同命令输出 `legal-text-after.txt`，`diff` 必须为空（允许首尾空白差异）。**diff 非空 = 触红线，立即 checkout 恢复重来。**

## 五、五视角裁决

- ① PM：支持。L0-L4 粒度 = 单文件单 session，与执行层 context 容量匹配。
- ② UI/UX+CRO：支持。规格卡抽取不影响最终视觉效果，模板族一致性反而更稳。
- ③ 运营/转化：中立。纯效率修复，无业务面影响。
- ④ 数据分析师：支持。法务页 diff 硬验证 = 可量化红线，比人工核对可靠。
- ⑤ CEO 终裁：**P0 立即生效**。deepseek 原 L1/L2/L3 方案作废，按本卡 L0→L4 执行。
