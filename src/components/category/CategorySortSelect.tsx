/**
 * CategorySortSelect — Client-side sort dropdown
 * 2026-07-13: 真正接上排序逻辑, 改 select 触发 router.push 更新 URL ?sort= 参数
 * Page 是 server component, 读 searchParams.sort 做 server-side sort
 *
 * 接收 server 传过来的 defaultValue (来自 URL), 改 select 时:
 *   - 保留 page 参数 (不要因为排序把分页重置)
 *   - 拼接新 sort 参数
 *   - router.push 到新 URL (用 scroll: false 避免跳到顶部)
 */

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';

interface CategorySortSelectProps {
  defaultValue: string;
  options: { value: string; label: string }[];
  className?: string;
  /**
   * 2026-09-22 Cloudflare Workers CPU 修复: 受控模式。
   * 传入 onChange 时组件不调用 useRouter/useSearchParams（避免 Suspense 兜底导致页面动态化），
   * 排序变更仅回调父组件（客户端排序）。未传入时保持原 URL ?sort= 行为不变。
   */
  onChange?: (value: string) => void;
}

function ControlledSortSelect({ defaultValue, options, className, onChange }: CategorySortSelectProps) {
  return (
    <select
      className={className}
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-gray-900 bg-white">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function CategorySortSelect(props: CategorySortSelectProps) {
  if (props.onChange) {
    return <ControlledSortSelect {...props} />;
  }
  return <UrlSortSelect {...props} />;
}

function UrlSortSelect({ defaultValue, options, className }: CategorySortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove sort param
    if (newSort && newSort !== 'popularity') {
      params.set('sort', newSort);
    } else {
      params.delete('sort');
    }

    // Always reset page to 1 on sort change (sorted view = new start)
    params.delete('page');

    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;

    startTransition(() => {
      router.push(newUrl, { scroll: false });
    });
  };

  return (
    <select
      className={className}
      defaultValue={defaultValue}
      onChange={handleChange}
      disabled={isPending}
      aria-busy={isPending}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-gray-900 bg-white">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
