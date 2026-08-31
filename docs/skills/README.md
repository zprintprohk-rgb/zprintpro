# zprintpro 项目技能库

> 本目录是项目级共享技能库：任何 agent（zprintpro / M3 / K3）在执行
> 生产发布、视觉改造、上线验证前，先读本目录对应技能，少走已踩过的弯路。
> 来源：2026-08-30 ~ 09-01 首页/急件页/类目页/SKU 页四轮实战的实证沉淀。

## 技能索引

| 技能 | 何时读 | 一句话 |
|---|---|---|
| [release-pipeline.md](release-pipeline.md) | 任何 commit/push/回滚 之前 | 三闸门、30 分钟 push 间隔、多车道暂存防污染、五步上线验收、一键回滚 |
| [verify-probes.md](verify-probes.md) | 任何渲染/文案改动验证 之前 | SSR 断言口径、CSS minify 匹配、PIL 像素取证、截图上限、dev server 陷阱 |
| [design-tokens.md](design-tokens.md) | 任何 UI/UX 改造 之前 | A 皇室藏青设计系统 tokens、组件模式、反模式黑名单、冻结区红线、基准站 |

## 使用纪律
- 三份技能全部来自实战事故与验证闭环的实证，规则为铁律级；发现新坑请追加进对应文件并注明日期。
- 与 F:\zprintpro-nextjs\AGENTS.md（§0.x）冲突时以 AGENTS.md 为准，并回写本库。
