/**
 * 分页组件
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  locale: string;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, locale, baseUrl }: PaginationProps) {
  const translations = {
    'zh-hk': { prev: '上一頁', next: '下一頁' },
    'en': { prev: 'Previous', next: 'Next' },
    'ja': { prev: '前へ', next: '次へ' },
  };
  
  const t = translations[locale as keyof typeof translations];
  
  const getPageUrl = (page: number) => {
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
  };
  
  const pages: (number | string)[] = [];
  
  // 简化分页逻辑
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }
  
  return (
    <nav className="flex justify-center items-center gap-2">
      {/* 上一页 */}
      {currentPage > 1 && (
        <a
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
        >
          {t.prev}
        </a>
      )}
      
      {/* 页码 */}
      {pages.map((page, index) => (
        <span key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <a
              href={getPageUrl(page as number)}
              className={`px-3 py-2 border rounded-lg text-sm ${
                currentPage === page
                  ? 'bg-[#2873F5] text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              {page}
            </a>
          )}
        </span>
      ))}
      
      {/* 下一页 */}
      {currentPage < totalPages && (
        <a
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
        >
          {t.next}
        </a>
      )}
    </nav>
  );
}
