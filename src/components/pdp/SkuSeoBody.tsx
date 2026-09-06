/**
 * SkuSeoBody — SKU SEO 长文的结构化渲染器 (2026-09-06 UX 重设计试点)
 *
 * 背景: sku-seo-data.ts 的 body 是 CSV 导入的纯文本 (含 **bold** 星号标记、
 * "Q1:" ~ "Q4:" 问答段落)。此前页面用 whitespace-pre-line 裸排,
 * 星号直接印在页面上, 问答挤成一坨 — 视觉松散 + 不专业。
 *
 * 本组件做三件事 (纯文本 → 结构化, 不改数据源):
 *   1. **bold** → <strong>
 *   2. Q1:~/Q2:... 问答行 → 分组为 FAQ 卡片 (details/summary, 无 JS)
 *   3. 其余行 → <p> 段落
 *
 * 试点范围: 全部 PDP 通用 (渲染层改造, 输出内容与原文本一字不差)。
 */

interface SkuSeoBodyProps {
  body: string;
  locale: string;
}

/** 把 **bold** 标记转为 <strong>, 其余 HTML 转义 */
function renderInline(line: string): string {
  const esc = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export function SkuSeoBody({ body, locale }: SkuSeoBodyProps) {
  if (!body) return null;

  const lines = body.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);

  const faqLabels: Record<string, { title: string }> = {
    'zh-hk': { title: '常見問答' },
    en: { title: 'Quick Answers' },
    ja: { title: 'よくある質問' },
  };
  const faqTitle = faqLabels[locale]?.title || faqLabels.en.title;

  // 抽出 Q&A 行 (Q1: ... A: ...)
  const faqPairs: { q: string; a: string }[] = [];
  const normalLines: string[] = [];
  let pendingQ: string | null = null;
  let pendingA: string[] = [];

  const flushFaq = () => {
    if (pendingQ !== null) {
      faqPairs.push({ q: pendingQ, a: pendingA.join(' ') });
      pendingQ = null;
      pendingA = [];
    }
  };

  for (const line of lines) {
    const qm = line.match(/^Q(\d+)\s*[:：]\s*(.+)$/);
    const am = line.match(/^A\s*[:：]\s*(.*)$/);
    if (qm) {
      flushFaq();
      pendingQ = qm[2];
    } else if (am && pendingQ !== null) {
      pendingA.push(am[1]);
    } else if (/^[A-D]\d?\s*[:：]/.test(line)) {
      // 形如 A1: / B: 的变体 — 当作答案行
      pendingA.push(line.replace(/^[A-D]\d?\s*[:：]\s*/, ''));
    } else if (pendingQ !== null) {
      // Q 后连续非 A 行 — 兼容答案直接跟在下一行且无 A: 前缀
      pendingA.push(line);
    } else {
      normalLines.push(line);
    }
  }
  flushFaq();

  return (
    <div>
      {normalLines.map((line, i) => (
        <p key={i} className="text-gray-600 leading-relaxed text-[15px] mb-3">
          <span dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
        </p>
      ))}

      {faqPairs.length > 0 && (
        <div className="mt-2 rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
          <p className="px-5 pt-4 pb-2 text-sm font-bold text-[#111827]">{faqTitle}</p>
          {faqPairs.map((f, i) => (
            <details key={i} className="border-t border-gray-100 group">
              <summary className="cursor-pointer list-none px-5 py-3.5 text-[15px] font-medium text-[#333333] flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span>{f.q}</span>
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInline(f.a) }} />
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
