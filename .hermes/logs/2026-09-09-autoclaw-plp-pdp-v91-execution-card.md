# Autoclaw 落地指令卡 — PLP/PDP v9.1 重设计（分支隔离 · 可回滚）

> **下达时间**: 2026-09-09 10:23（K3 拍板「确认即开工」）
> **设计稿（唯一蓝本，不得自由发挥）**:
> - `F:\zprintpro-nextjs\design\plp-v9.html` — 二级类目页（貼紙印刷）
> - `F:\zprintpro-nextjs\design\pdp-v9.html` — 三级产品页（防水貼紙 ST-001）
> **执行范围**: 仅 zh-hk 的 `/category/stickers/` + `/product/waterproof-stickers/` 两个路由做样板。
> **绝对红线**: 内容零改动 —— 所有 H1/H2/H3/正文/FAQ/表格文字逐字保留现有 `src/data/` 与页面文案，本次只改结构、样式、排版。

---

## 一、分支与回滚（硬约束）

```bash
git checkout -b redesign/plp-pdp-v9
# 全部改动在此分支。K3 验收 CF preview 不满意 → 不 merge，主线零影响。
# 满意后由 K3 拍板 merge，再批量套用其余 15 品类（另起任务）。
```

- ❌ 禁止直接在 main 上改
- ❌ 禁止顺手改其他页面/组件/数据文件
- ❌ 禁止动 `src/data/products.ts` / `src/data/blog-posts.ts` / `messages/` 任何文字

---

## 二、组件改造映射（设计稿区块 → 代码落点）

### PLP（`src/app/[locale]/category/[slug]/page.tsx`）

| 设计稿区块 | 代码动作 |
|---|---|
| 页眉 / 左侧分类栏 / 页脚 | **冻结，不动**。设计稿中仅为示意 |
| Banner 左文右图 | 改 banner 区：左 H1+副标+信任徽章（文案不变），右 `<Image>` 分类 hero 图 `hero-sticker-zh-hk.webp`（4:3 卡片 + 圆角 18px + 左下 `STICKER PRINTING · HK` 等宽标签）。**仅此路由生效** |
| 3 个直接答案卡 | 现有内容改 3 列卡片排版（白卡 + Q 蓝标） |
| 9 款 SKU 网格 | 现有 ProductCard 网格上移至此位置；产品图改 **1:1**（`aspect-ratio: 1/1`）；卡片固行对齐：标题 2 行 clamp / 参数等宽 2 行 / 价格单行 nowrap / 按钮 margin-top:auto 钉底 |
| SpecFinder | 现有筛选改为单行紧凑条（标签 + 3 下拉 + 橙按钮），放 SKU 网格之后 |
| 核心競爭優勢 | 改编辑式编号排版（01/02/03 大号等宽橙数字 + 右栏标题+要点），非图标卡 |
| 材質工藝 / 技術參數 / 行業場景 / 6 步流程 | 4 个区块加浅蓝满版色带：`background:#F2F6FF; border-radius:22px; padding:36px 32px`（移动端 28px 20px） |
| 選購指南 | 杂志排版：首段 19px + 底部 2px 墨线 + 首字下沉（蓝 3.2em）；正文 17px 两端对齐；「行業場景速配」段改橙底金句条（`background:#FEF1E6; border-left:4px solid #F87314`） |
| 數據徽章帶 | 藏青渐变 165deg `#244780→#1B3163→#152649`，4 格等宽大数字 |
| 渠道比較表 | 智印港列橙底高亮 |

### PDP（`src/app/[locale]/product/[slug]/page.tsx`）

| 设计稿区块 | 代码动作 |
|---|---|
| Hero 首屏（图廊/H1/价格/双CTA/信任三连） | **内容冻结**，仅视觉层：主图 4:3 + 四角 1.5px 裁切标记；缩略图 4 张 1:1 |
| 工厂品控 3 图 | 图片换为：`factory-heidelberg-6plus1.webp`（caption「[印刷] 海德堡 6+1 柯式印刷機」）/ `factory-color-chart.webp`（[品控] ICC 色彩管理）/ `factory-weigang-uv.webp`（「[不乾膠專用] 輪轉 UV 印刷機 · 貼紙標籤專線」）。gallery 缩略图中的 hpindigo 同步换 heidelberg-6plus1 |
| 价格阶梯 | 5 档真实价格横条图：大数字「71%」+ 最抵档橙高亮 + 「最抵」标签 |
| 右栏 sticky 报价轨 | 桌面端 sticky top:88px，含价格 + 交期键值 + 双按钮 |
| 交期承诺 3 卡 | 即日卡用藏青渐变底白字 |
| 適用場景與檔案規格 | 双栏：左栏首字下沉导语 + 4 场景胶囊标签 + 长文；右栏 sticky「交稿規範」参数卡（300 DPI/CMYK/3mm/外框化/2小時打稿 逐行键值对）+ 橙底免費打稿提示条。**全部现有文字逐字保留** |
| 移动端吸底报价轨 | ≤640px 显示：价格 + 报价 + WhatsApp 双按钮 |

### 设计令牌（两页共用，写入 CSS module，勿污染全局）

```
蓝 #2873F5 / 深蓝 #1E5FD1 / 橙 #F87314 / 深橙 #EA580C / 浅橙底 #FEF1E6
藏青渐变 165deg #244780 → #1B3163 → #152649（仅 Banner/數據帶/页脚/即日卡）
页面底色 #FFFFFF / 浅蓝带 #F2F6FF / WA 绿 #25D366
等宽字体 ui-monospace,Consolas,monospace（标本签/价格数字专用）
容器 max-width 1320px，padding 0 24px
正文基线 17.5px（对齐 globals.css）
```

---

## 三、验收清单（autoclaw 自验后提交，M3 复核）

```bash
# 1. 内容零改动（必须为空 = 数据文件没动）
git diff main --stat -- src/data/ messages/

# 2. 字号基线
grep -n "17.5" src/app/[locale]/category/[slug]/*.module.css | head -3

# 3. 1:1 产品图
grep -rn "aspect-ratio" src/app/[locale]/category/[slug]/ | grep "1/1\|1 / 1\|square"

# 4. 工厂图正确
grep -n "heidelberg-6plus1\|weigang-uv" src/app/[locale]/product/[slug]/page.tsx

# 5. 禁词红线（必须 0 命中）
grep -rni "business.card\|名片\|智印印港" src/app/[locale]/category/ src/app/[locale]/product/

# 6. 编码 + 编译（§12 push SOP）
node scripts/check-encoding.js
npx tsc --noEmit
npm run build
```

## 四、push 与验收流

1. `git add -A && git commit -m "feat(redesign): PLP/PDP v9.1 stickers+waterproof-stickers 样板（分支隔离）"`
2. `git push origin_ssh redesign/plp-pdp-v9`（**只推分支，不 merge**）
3. CF Pages 自动生成 preview 链接 → 报告给 K3
4. K3 验收满意 → 拍板 merge → 另起任务批量套用 15 品类；不满意 → 改分支或废弃

## 五、报告格式（完成后 1 段回报）

`分支 sha / preview 链接 / 6 条验收命令结果（逐条 PASS/FAIL）/ 已知偏差清单（无偏差写「无」）`
