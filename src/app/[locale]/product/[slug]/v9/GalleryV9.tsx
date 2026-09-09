'use client';

/**
 * PDP v9.1 相册（藍本 design/pdp-v9.html §Hero.gal: 主圖四角裁切標 + 4 縮圖切換）
 * 圖源 = 現有 getProductImages 產品圖 + 工廠實拍第 4 格（工廠圖路徑由 page.tsx 傳入）
 */
import { useState } from 'react';
import Image from 'next/image';

export function GalleryV9({
  images,
  alt,
  factoryImage,
}: {
  images: string[];
  alt: string;
  factoryImage: string;
}) {
  const thumbs = Array.from(new Set([...images.slice(0, 3), factoryImage]));
  const [idx, setIdx] = useState(0);
  const main = thumbs[idx] ?? thumbs[0];

  return (
    <div>
      <div className="relative rounded-[18px] overflow-hidden bg-[#F3F3F3] border border-[#E5E7EB] [aspect-ratio:4/3] before:content-[''] before:absolute before:z-[2] before:w-4 before:h-4 before:top-3 before:left-3 before:pointer-events-none before:border-t-[1.5px] before:border-l-[1.5px] before:border-[rgba(31,41,55,0.5)] after:content-[''] after:absolute after:z-[2] after:w-4 after:h-4 after:bottom-3 after:right-3 after:pointer-events-none after:border-b-[1.5px] after:border-r-[1.5px] after:border-[rgba(31,41,55,0.5)]">
        <Image key={main} src={main} alt={alt} fill className="object-cover" unoptimized priority sizes="(max-width: 1024px) 100vw, 760px" />
      </div>
      <div className="grid grid-cols-4 gap-3 mt-3">
        {thumbs.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`查看第 ${i + 1} 張圖片`}
            className={`relative [aspect-ratio:1/1] rounded-[10px] overflow-hidden border-2 bg-[#F3F3F3] transition-colors ${i === idx ? 'border-[#2873F5]' : 'border-[#E5E7EB] hover:border-[#C9D6F2]'}`}
          >
            <Image src={t} alt="" fill className="object-cover" unoptimized loading="lazy" sizes="180px" />
          </button>
        ))}
      </div>
    </div>
  );
}
