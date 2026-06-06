/**
 * 产品图片画廊组件
 * 支持主图显示、缩略图切换、点击放大
 */

'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
  alt?: string;
}

export function ProductGallery({ images, title, alt }: ProductGalleryProps) {
  const displayImages = images.length > 0 ? images : ['/images/placeholder.jpg'];

  const [currentImage, setCurrentImage] = useState(() => {
    const defaultIndex = 2; // 默认显示第三张图片
    return displayImages.length > defaultIndex ? defaultIndex : 0;
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const mainAlt = alt || title;
  const getThumbAlt = (index: number) => `${mainAlt} - ${index + 1}`;

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-3">
        {/* 主图 — 1:1 比例，点击放大 */}
        <div
          className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-zoom-in"
          onClick={() => openLightbox(currentImage)}
        >
          <img
            src={displayImages[currentImage]}
            alt={mainAlt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* 缩略图 — 始终显示 */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                currentImage === index ? 'border-[#2873F5]' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={image}
                alt={getThumbAlt(index)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox 放大查看 */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <img
            src={displayImages[currentImage]}
            alt={mainAlt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentImage + 1} / {displayImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
