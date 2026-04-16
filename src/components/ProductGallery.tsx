/**
 * 产品图片画廊组件
 * 支持主图显示和缩略图切换
 */

'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  
  const displayImages = images.length > 0 ? images : ['/images/placeholder.jpg'];
  
  return (
    <div className="space-y-4">
      {/* 主图 */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={displayImages[currentImage]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* 缩略图 */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                currentImage === index ? 'border-[#2873F5]' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
