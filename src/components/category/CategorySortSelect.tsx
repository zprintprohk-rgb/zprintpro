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
}

export function CategorySortSelect({ defaultValue, options, className }: CategorySortSelectProps) {
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
