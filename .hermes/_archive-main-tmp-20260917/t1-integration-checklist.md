# T1 集成注意事项（2026-09-16 会话辅助）

> 目的：8 个子代理产出内容后的集成清单，防止遗漏/死链。

## 1. 内链目标修正

| 子代理 prompt 中的路径 | 问题 | 修正 |
|------------------------|------|------|
| `/zh-hk/product/gift-boxes/`（packaging-buying-guide 子代理） | products.ts 无 gift-boxes slug | → `/zh-hk/product/rigid-boxes/`（精裝盒/禮品盒，K3 語義匹配） |

## 2. 集成文件清单

| 子代理 | 写入文件 | 位置 |
|--------|----------|------|
| b1b5b97e (packaging-buying-guide) | `src/data/buying-guides.ts` | slug='packaging-buying-guide' 的 content 块 |
| 9f563f49 (sticker-buying-guide) | `src/data/buying-guides.ts` | slug='sticker-buying-guide' 的 content 块 |
| 9c644054 (flyer) | `src/data/buying-guides.ts` + `src/data/blog-data/*.json` | flyer-buying-guide + flyer-printing-guide |
| 96111174 (book) | `src/data/buying-guides.ts` | slug='book-buying-guide' 的 content 块 |
| 44336ebf (saddle-stitch) | `src/data/blog-data/*.json` | saddle-stitch-booklet-printing-guide |
| baa525f8 (same-day) | `src/data/blog-data/*.json` | same-day-flyers-printing-hong-kong-guide |
| 9a98f089 (rush) | `src/data/blog-data/*.json` | rush-printing-hk-guide |
| 8313846b (packaging-box-custom) | `src/data/blog-data/*.json` | packaging-box-custom-guide |

## 3. buying-guides.ts 替换注意

- content 是三语言模板字符串：`content: { 'zh-hk': `...`, en: `...`, ja: `...` }`
- 替换范围 = slug 对应对象的 `content: {` 到对象结束 `},`（L110 起）
- 子代理输出的 content 块可能有反引号/`${}`——替换时整体替换，不逐行拼接
- 替换后跑 `node -e` 验证文件可 parse（TS 无法直接 parse，用 regex 提取 content 块验证）

## 4. blog-data JSON 替换注意

- 子代理输出完整 content 字符串 → 写入 `d[slug].content`
- 写前备份（§12 三件套）
- 写后跑 blog-data-integrity-guard（JSON.parse + 控制字符 + mojibake）

## 5. 验收清单（每词）

1. FAQ regex：`<p><strong>Q[0-9]*[:：]...<br/>A[:：]` 可提取 ≥4
2. H2 问句 > 非问句（RULE2）
3. 表格 ≥2（若适用）
4. 答案块 ≥3（bg-*-50）
5. 内链 ≥7（含修正后 rigid-boxes）
6. CTA ≤3（顶部 1 + 底部 1）
7. 12 铁律门童：总命中 15=15（RULE5_EEAT 基线）
8. 三语言 blog-data JSON 键一致（i18n-guard）
9. check-encoding + tsc

## 6. push 纪律

- 距上次 push（07:41 4b120b17）≥30min → 最早 08:11
- 攒批阈值：8 个 src 内容文件改动 + 1 docs = 远超阈值 → 到点即推
- push 后 verify-deploy.mjs + 线上 curl 复验
