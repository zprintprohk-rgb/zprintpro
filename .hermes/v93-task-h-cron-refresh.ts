/**
 * 任务 H (v9.3 指令包): 5 个 cron prompt 指令区刷新到战备级
 * 写入: S1-S3 新标准 + 任务 J 8 个 T1 锁词 + v4/幂等/G 梯队引用 + 冻结名单与门禁纪律重申
 * 幂等: 已含「v9.3 指令区」标记则跳过 (不重复插入)
 */
import fs from 'fs';
import path from 'path';

const DIR = 'F:\\zprintpro-nextjs\\.hermes\\cron-prompts';
const FILES = [
  'zprintpro-daily-content-1x7w.md',
  'zprintpro-gsc-feedback-loop.md',
  'zprintpro-weekly-meta-refresh.md',
  'zprintpro-blog-deepfix.md',
  'zprintpro-monthly-matrix-audit.md',
];
const MARKER = 'v9.3 指令区';

const BLOCK = `> **[v9.3 指令区 · 2026-09-12 K3 拍板 · 必读第 -3 优先级]** 来源 \`docs/2026-09-12-k3-directive-v93-home-fix-money-words.md\`（执行层评估 A 93/100 后新增标准 + 8 锁词 + 3 件终裁）
>
> **S1 答案块字数断言（新门禁 · 2026-09-12 生效）**：凡涉答案块/FAQ/答案卡（quickAnswers / AEO 3 直接答案卡 / FAQPage）的批次，**验收必跑字数断言** —— zh-hk 答案规格区 **40-60 全角字，硬上限 ≤60**；超出部分移到 FAQ 详情，不得留在答案卡。无字数断言的批次视为未验收。（教训：B1 已有 3 品类超标 red-packets 116 / educational 254 / japan-doujin 128 未被发现）
> **S2 slug 存在性前置校验（新门禁 · 2026-09-12 生效）**：任何**引用 slug 列表**的批次（数据层 links / 内链矩阵 / 导航项 / 图片映射 / 内链锚文本），**改动前**先跑存在性校验 —— 每条 slug 对照 \`src/data/blog-posts.ts\` 的 \`getAllBlogPostSlugs()\` 与 \`src/data/products.ts\` 的 \`categories\`；不存在的 slug **随批清洗**（数据源 + 渲染层双清），**禁止挂账**。（教训：7 个已下线 blog slug 留在数据源 links，靠 G2 终验才暴露）
> **S3 平台故障上报阈（新标准 · 2026-09-12 生效）**：平台级故障（CF Pages 503 / CDN 边缘大面积异常 / 部署卡死 / 构建队列长时间阻塞）**观察 ≥60min 必 1 段上报老板**（只报备不请求动作：现象 + 证据 + 影响面 + 当前判断 + 恢复后补终值）。（教训：CF 503 观察 2.5h 未上报；再反复 1 次即开工单）
>
> **任务 J · 8 个 T1 锁词（保护加强位，走 G2 攻坚通道 striking pos 11-20）**：包裝盒印刷 ⭐重中之重 / 紙盒印刷 ⭐重中之重 / 包裝盒訂製 / 貼紙印刷 / 宣傳單張 / 即日印刷 / 書刊印刷 / 騎馬釘。
> - **gsc-feedback cron 每周追踪这 8 词的位置与 CTR 变化**（9/17 起为干净对比窗）。
> - 攻坚动作：① title v4 写满核查（半角当量 50-54 区间，跑当量脚本存档）② 全站内链锚文本统一（每词 ≥3 个正文内链使用统一锚文本，grep 一致性验收）。
> - 红线：**不改 slug、不砍页、不回滚已部署 title**（churn 红线）。
>
> **不变引用（不复制全文，按需回查路径）**：
> - 标题规则 v4 写满原则（50-54 写满 / ≥55 禁加 / 长尾 3 筛选 / 冻结 2-4 周）→ \`docs/2026-09-09-k3-title-rule-v4-write-full.md\`
> - 幂等铁律「不重复做已完成的事」 → 同上
> - G 梯队攻坚顺序（G1 首页 / G2 striking 11-20 / G3 详情模板 / G4 AEO）→ \`docs/2026-09-10-k3-directive-v92-template-rollout.md\`
> - **冻结名单不变**：\`zprintpro-en-us-images/\` 整目录 · \`_batch*.py\` · \`src/components/services/Rush*\` 8 组件 · \`page.redesign.tsx\` · \`src/services/rush/*\`
> - **门禁纪律不变项**：tsc 54=54 基线持平 · build 687 URLs exit 0 · bc-ban 按 diff 0 新增 · 线上探针（非纸面结论）· 只推 main 省 CF 构建配额（分支走本地路径进合并仓）

`;

let changed = 0;
for (const f of FILES) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p)) { console.log(`MISSING ${f}`); continue; }
  const text = fs.readFileSync(p, 'utf8');
  if (text.includes(MARKER)) { console.log(`SKIP (已有标记) ${f}`); continue; }
  // 插到文件最前 (优先级最高区), 保持原有内容不动
  fs.writeFileSync(p, BLOCK + text, 'utf8');
  const st = fs.statSync(p);
  console.log(`OK ${f}  ${(st.size / 1024).toFixed(1)}KB  mtime=${st.mtime.toISOString()}`);
  changed++;
}
console.log(`\n更新文件数: ${changed}/${FILES.length}`);
