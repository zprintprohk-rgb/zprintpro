'use client';

/**
 * 排版预览组件 — Quote Engine v3 (Gang Run 杀手级体验)
 * 2026-06-07
 *
 * 用 CSS 网格绘制大版，里面 N 个小矩形（成品），直观告诉客户：
 * "你占了几个位，废了几张纸"
 *
 * 核心差异化：
 * - 显示 "Gang Run" vs "Isolation" 两种模式对比
 * - 让客户**看到**因为混拼省了多少钱（这才是 e-print 没做到的体验）
 */

import type { GangResult } from '@/lib/quote-engine/core';
import { AlertTriangle, TrendingDown, Sparkles, Layers } from 'lucide-react';

interface GangPreviewProps {
  gang: GangResult;
  /** 显示的最大网格数（避免大版渲染过慢） */
  maxItemsToRender?: number;
  /** 纸张单价 (HKD) - 用于显示混拼节省金额 */
  paperCostHKD?: number;
  /** 开机费 (HKD) - 用于显示混拼节省金额 */
  setupCostHKD?: number;
}

export function GangPreview({ gang, maxItemsToRender = 200, paperCostHKD = 4.2, setupCostHKD = 300 }: GangPreviewProps) {
  const wasteColor = gang.wasteRatio > 0.4 ? 'text-red-600' : gang.wasteRatio > 0.25 ? 'text-amber-600' : 'text-green-600';
  const wasteBg = gang.wasteRatio > 0.4 ? 'bg-red-50' : gang.wasteRatio > 0.25 ? 'bg-amber-50' : 'bg-green-50';
  const wasteBorder = gang.wasteRatio > 0.4 ? 'border-red-200' : gang.wasteRatio > 0.25 ? 'border-amber-200' : 'border-green-200';

  // 计算网格列数
  const itemsPerRow = gang.orientation === 'portrait'
    ? Math.max(1, Math.round(Math.sqrt(gang.itemsPerSheet * (gang.itemTotalH / gang.itemTotalW))))
    : Math.max(1, Math.round(Math.sqrt(gang.itemsPerSheet * (gang.itemTotalW / gang.itemTotalH))));

  // Gang Run 节省计算
  const isolationSheets = gang.isolationSheetsNeeded;
  const mixSheets = gang.sheetsNeeded;
  const sheetsSaved = isolationSheets - mixSheets;
  const hkdSaved = sheetsSaved * (setupCostHKD + paperCostHKD);
  const usdSaved = hkdSaved * 0.128;
  const isMixMode = gang.mode === 'mix' && sheetsSaved > 0;

  return (
    <div className={`rounded-xl border p-4 ${wasteBg} ${wasteBorder}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          <Layers className="w-4 h-4" />
          排版预览 (Sheet Layout)
        </h4>
        <div className={`text-xs font-bold ${wasteColor}`}>
          利用率 {(gang.utilization * 100).toFixed(1)}%
        </div>
      </div>

      {/* Sheet visualization */}
      <div className="relative aspect-[1/1.4] bg-white border-2 border-gray-300 rounded-md overflow-hidden mx-auto max-w-[200px]">
        {/* 显示混拼密度视觉化 */}
        {isMixMode && (
          <div className="absolute top-1 right-1 z-10 px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold rounded">
            混拼 GANG RUN
          </div>
        )}
        <div
          className="absolute inset-2 grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
            gridAutoRows: '1fr',
          }}
        >
          {/* 你的版位（蓝色） */}
          {Array.from({ length: Math.min(maxItemsToRender, gang.slotsUsed) }).map((_, i) => (
            <div
              key={`yours-${i}`}
              className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm"
              style={{ aspectRatio: gang.itemTotalW / gang.itemTotalH }}
            />
          ))}
          {/* 其他客户的版位（混拼示意，灰色） */}
          {isMixMode && Array.from({ length: Math.max(0, Math.min(maxItemsToRender, gang.totalSheetCapacity - gang.slotsUsed)) }).map((_, i) => (
            <div
              key={`others-${i}`}
              className="bg-gray-200 rounded-sm opacity-40"
              style={{ aspectRatio: gang.itemTotalW / gang.itemTotalH }}
            />
          ))}
          {gang.itemsPerSheet > maxItemsToRender && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent text-xs text-center text-gray-500 pt-4">
              +{gang.itemsPerSheet - maxItemsToRender} more
            </div>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
        <div className="text-center p-2 bg-white rounded">
          <div className="text-gray-500">单版可排</div>
          <div className="font-bold text-[#2873F5]">{gang.totalSheetCapacity}</div>
        </div>
        <div className="text-center p-2 bg-white rounded">
          <div className="text-gray-500">你占版位</div>
          <div className="font-bold text-[#2873F5]">{gang.slotsUsed}</div>
        </div>
        <div className="text-center p-2 bg-white rounded">
          <div className="text-gray-500">浪费率</div>
          <div className={`font-bold ${wasteColor}`}>{(gang.wasteRatio * 100).toFixed(0)}%</div>
        </div>
      </div>

      {/* ★ 杀手级体验：Gang Run 节省对比 */}
      {isMixMode && (
        <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-purple-900">
                🎯 混拼模式开启 - 你省了 ${usdSaved.toFixed(2)}！
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded">
                  <div className="text-gray-500">自拼模式 (Isolation)</div>
                  <div className="line-through text-gray-400">{isolationSheets} 张版</div>
                </div>
                <div className="bg-purple-100 p-2 rounded">
                  <div className="text-purple-700">混拼模式 (Gang Run)</div>
                  <div className="font-bold text-purple-900">{mixSheets} 张版 ✓</div>
                </div>
              </div>
              <p className="mt-2 text-xs text-purple-700">
                你的设计 <strong>{gang.slotsUsed} 个版位</strong> + 其他客户的设计 <strong>{gang.totalSheetCapacity - gang.slotsUsed} 个版位</strong> = 1 张大版填满 {gang.mixDensity * 100}% 利用率
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Warning if high waste */}
      {gang.wasteRatio > 0.4 && (
        <div className="mt-3 flex items-start gap-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-800">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">尺寸不经济 (Utilization &lt; 60%)</p>
            <p>建议微调尺寸或合并其他客户排版需求 (混拼 Gang-Run)，可降单价 20-30%</p>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {gang.suggestions.length > 0 && (
        <div className="mt-2 space-y-1">
          {gang.suggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <TrendingDown className="w-3 h-3 shrink-0 mt-0.5 text-[#2873F5]" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
