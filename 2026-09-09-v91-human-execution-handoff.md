# PLP/PDP v9.1 执行交接书（执行者：本会话 AI 执行层）

**关联**：唯一执行依据 = `2026-09-09-autoclaw-plp-pdp-v91-execution-card.md`（v1.3）。本书只做「执行者改派」的交接，**不新增任何自由度**；与卡冲突处以卡为准，卡未尽事宜停手上报唐总。
**改派记录**：唐总 2026-09-09「现在交给人来执行」（v1.2）→ 同日改口「是交给你来执行，不是 autoclaw」（**v1.3 终局**）。执行者 = **本会话 AI 执行层**（v1.2 人工口径作废）；复核闸由 deepseek hermes 承接 M3 称谓（AGENTS §0.34.2，职责不变）；验收人唐总不变。

**执行者**：本会话 AI 执行层 · **复核**：deepseek hermes · **验收人**：唐总（CF Preview 拍板）

---

## 一、五大锁定点（对人工同样生效，逐字节不变）

| # | 锁定点 | 人工执行要点 |
|---|--------|--------------|
| 1 | 唯一蓝本 | 打开 `design/plp-v9.html` + `design/pdp-v9.html` 对照实现；蓝本没有的模块/配色/文案/间距/动效一律不加 |
| 2 | 范围锁死 | 只改 zh-hk `/category/stickers/` + `/product/waterproof-stickers/` 两个路由的渲染层；其余 15 品类禁入 |
| 3 | 内容零改动 | `src/data/`、`messages/`、页眉/左侧分类栏/页脚组件逐字节不动；文案/价格/SKU/FAQ/NAP 零改动 |
| 4 | 分支隔离 | 全程 `redesign/plp-pdp-v9` 分支；main 零 commit；CF Preview 验收满意才 merge |
| 5 | 六条验收命令 | 完工自验逐条跑（见第四节，Git Bash），自验不过不得提交复核 |

---

## 二、开工前 5 步（全部通过才动工）

```bash
# 1) 拉齐并切入工作分支（分支已存在 c92e0f60，禁重建；checkout 报错 = 停手上报）
git checkout main && git pull
git checkout redesign/plp-pdp-v9

# 2) 基线校验：输出必须为空（非空 = 环境脏，先停手上报，禁动工）
git diff main --stat -- src/data/ messages/

# 3) 蓝本在场校验：应显示 53,361 B / 42,361 B 两个文件
ls -la design/plp-v9.html design/pdp-v9.html
```

4. 浏览器打开两个蓝本 HTML 看一遍目标视觉——**这就是验收标准，不是参考**。
5. 打开待改路由确认现状：`src/app/[locale]/category/[slug]/page.tsx`、`src/app/[locale]/product/[slug]/page.tsx`（数据取 stickers 相关模块，禁碰数据文件）。

---

## 三、执行中 4 条硬规矩

1. **只做映射**：蓝本视觉 → 现有路由组件的实现替换；数据一律取自现有数据文件，文案零改动。页眉/左侧分类栏/页脚沿用现有 src 组件（蓝本 demo 区不搬），逐字节不动。
2. **设计令牌只有蓝本里的值**：卡片图 `aspect-ratio:1/1`；字号只在白名单 `12|13|14|15|16|17|18|19|20|22|27|42px` 内；PLP H1 27px、PDP H1 42px。白名单外字号出现 = 验收命令①直接 FAIL。
3. **PDP 保留工厂实拍**：路由文件中 `images/factory/` 引用 ≥1（验收命令③），禁删。
4. **commit 纪律**：conventional commits，只在本分支；不碰 sitemap、manifest、redirect、中间件、Next 配置。

---

## 四、完工自验（闸一 · Git Bash 逐条跑，留输出记录）

与卡 §5 完全一致（免翻页复制如下）。判定：①④⑤ 无输出行=过；② ≥1 过；③ ≥1 过；⑥ 构建成功过。任一 FAIL → 停手修复 → 六条全部重跑，禁带病提交。

```bash
# ① 字号基线（白名单外字号出现 = FAIL）
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -E 'font-size:' | grep -vE 'font-size:\s*(12|13|14|15|16|17|18|19|20|22|27|42)px' | head -5

# ② 1:1 图（计数 ≥1 = PASS）
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -c 'aspect-ratio:\s*1/1'

# ③ 工厂图（计数 ≥1 = PASS）
grep -c 'images/factory/' "src/app/[locale]/product/[slug]/page.tsx"

# ④ 禁词（0 命中 = PASS）
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -iE '名片|咭片|business.?card|名刺|name.?card|SEO 主內容|可見正文|內部標注|kicker">AEO' | head -5

# ⑤ 编码（无乱码特征 = PASS）
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -aP '\x{FFFD}|\xc3\xa3\xe2\x82\xac|\xc3\xa5' | head -5

# ⑥ 编译（构建成功 = PASS）
npm run build:cf 2>&1 | tail -5
```

另两项：锁定三校验（`git diff main --stat -- src/data/ messages/` 为空）+ 蓝本↔实现对照截图（桌面+移动）留档。**命令只能在 Git Bash 跑**（本机 cmd/PowerShell 无 grep）。

---

## 五、复核 → 拍板 → 上线序列

```
人工自验全过 → push 分支（CF Preview 自动出）→ 复核闸（deepseek hermes：独立重跑六条
+ 锁定三 diff 为空 + 抽查 3 处蓝本一致性：PLP 卡片区/PDP 价格区/PDP 工厂图区）
→ Preview URL 交唐总拍板 → 满意才 merge（merge commit，禁 squash）→ 上线避开周三
```

- 双闸记录落 `docs/2026-09-09-v91-gate-records.md`（命令时间戳 + 输出摘要）。
- Preview 不通过：本分支修复重走闸，最多 3 轮，超轮次升级唐总裁定。
- merge 后线上异常回滚条款按卡 §7 执行（revert → 确认重新部署 → 抽查恢复 → 24h 复盘）。

---

## 六、停手上报（禁止自行解释/补齐）

- 蓝本与路由现状冲突（数据缺字段/组件能力不足）→ **禁止自行发挥补齐**，停手写明冲突点上报唐总。
- 自验发现数据文件被误改 → `git restore --source=main -- src/data/ messages/` → 重跑锁定三校验 → 重走闸。
- 任何卡内未尽事宜 → 停手上报，禁止自行发挥。

---

**一句话给执行人：蓝本即验收标准，你没有审美裁量权；六条命令是闸门，跑不过就修，修不好就上报。**
