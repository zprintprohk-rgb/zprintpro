#!/usr/bin/env node
/**
 * scripts/guards/ldjson-client-guard.js (v1.0)
 * 门童 #30 Client 组件禁渲染 JSON-LD (2026-11-14, GSC「字段 brand 重复」飞行载荷泄漏事故固化)
 *
 * 背景: 2026-11-02 查案证实 —— `'use client'` 组件内渲染 `<script type="application/ld+json">` 时,
 *       整个 schema 对象会被序列化进 RSC flight 载荷 (self.__next_f.push), 页面于是出现
 *       两份完整 schema (真实 ld+json script + flight 载荷拷贝); Google 解析器两份都吃,
 *       同一 Product 的 brand/seller/offers 等字段各出现两次 → GSC 商家信息「字段 brand 重复」
 *       (76 项, RRT 现场复现)。JsonLd.tsx 已去 'use client' (v3 修复, 2026-11-02 9b46dc5c),
 *       但同一缺陷类在 RushDeliveryFAQ.tsx 复发 (客户端组件内联 FAQPage schema)。
 *
 * 规则: 🔴 red 硬拦 —— 任何带 'use client' 指令的组件文件不得出现:
 *       ① `application/ld+json` (直接渲染 schema script)
 *       ② `<JsonLd` (使用 JsonLd 组件)
 *       ③ `ld+json` (其他 schema 注入形态)
 *   正确做法: schema 只由服务端组件 (JsonLd, 无 'use client') 渲染; 客户端组件只负责交互。
 *
 * 检测口径 (防误报):
 *   - 'use client' 必须是**首个非注释语句** (React 指令要求), 注释里的字面引用不算
 *     (JsonLd.tsx 头部注释含「不得标 'use client'」, 必须豁免);
 *   - ld+json / JsonLd 命中必须位于**非注释代码** (注释里引用反例不算命中)。
 *
 * 配套: docs/2026-11-02 查案记录 (c4605923/82d33ecd) + error-patterns.md
 *       → FLIGHT_PAYLOAD_DUPLICATE_SCHEMA; skill zprintpro-content-standards §14.
 */

const path = require('path');
const fs = require('fs');
const common = require('./common.js');

const RULES = [{ id: 'LDJSON_IN_CLIENT_COMPONENT', severity: 'red' }];

/** 去掉块注释 /* * / 与行注释 // (字符串内不做精确解析, 足够消除反例注释误报) */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:'"\\])?\/\/.*$/gm, '$1');
}

/** 是否带 'use client' 指令 (必须是文件前部首个非注释、非空语句) */
function hasClientDirective(src) {
  const cleaned = src.replace(/^\uFEFF/, '').replace(/\/\*[\s\S]*?\*\//g, '').trimStart();
  // 允许前导 import/注释被跳过? 不 — React 要求 'use client' 必须是文件**第一个**语句,
  // 但实际项目里偶尔有前导注释, 故取: 首个非注释行
  const firstLine = cleaned.split('\n').find((l) => l.trim() !== '');
  if (!firstLine) return false;
  const m = firstLine.trim().match(/^(["'])use client\1;?$/);
  return !!m;
}

/** 源码 (注释已剥离) 是否出现 schema 渲染形态 */
function hasSchemaRender(src) {
  return /application\/ld\+json/.test(src) || /<JsonLd\b/.test(src) || /ld\+json/.test(src);
}

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    if (!/\.(tsx|jsx)$/.test(file)) continue;
    if (common.isFullExemptPath(file)) continue;
    if (common.isExemptPath(file)) continue;
    // 仅扫描客户端组件源 (src/components + src/app 内的组件文件)
    const rel = file.replace(/\\/g, '/');
    if (!/src\//.test(rel)) continue;

    let raw;
    try {
      raw = fs.readFileSync(file, 'utf-8');
    } catch (e) {
      continue;
    }

    const code = stripComments(raw);
    if (!hasClientDirective(code)) continue;
    if (!hasSchemaRender(code)) continue;

    // 定位首个触发行 (非注释代码里的 ld+json 命中)
    const lines = raw.split('\n');
    const codeLines = code.split('\n');
    let hitLine = 1;
    for (let i = 0; i < codeLines.length; i++) {
      if (/application\/ld\+json|<JsonLd\b|ld\+json/.test(codeLines[i])) {
        hitLine = i + 1;
        break;
      }
    }
    allHits.push({
      file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
      line: hitLine,
      match: codeLines[hitLine - 1] ? codeLines[hitLine - 1].trim().slice(0, 80) : '(ld+json usage)',
      severity: 'red',
      ruleId: 'LDJSON_IN_CLIENT_COMPONENT',
      ruleName: 'Client 组件渲染 JSON-LD (RSC flight 载荷重复 schema → GSC「字段 brand 重复」, 2026-11-02 查案固化)',
      fix: 'schema 只由服务端组件渲染 (JsonLd 组件, 无 \'use client\'); 客户端组件只保留交互 (accordion/state), 把 <script type="application/ld+json"> 移出客户端组件, 改由服务端组件/页面输出',
    });
  }
  return allHits;
}

module.exports = { scan, RULES, hasClientDirective, hasSchemaRender };
