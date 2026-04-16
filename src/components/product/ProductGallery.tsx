'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Generate placeholder images (in real app, these would be actual product images)
  const images = [
    { id: 1, alt: `${product.name} - Main View` },
    { id: 2, alt: `${product.name} - Detail View` },
    { id: 3, alt: `${product.name} - Side View` },
    { id: 4, alt: `${product.name} - Application` },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-br from-[#2873F5]/20 to-[#F87314]/20 rounded-2xl flex items-center justify-center">
            <span className="text-6xl font-bold text-[#2873F5]">
              {product.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Zoom Button */}
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrentImage(index)}
            className={`flex-1 aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
              currentImage === index ? 'border-[#2873F5]' : 'border-transparent hover:border-gray-200'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-lg font-bold text-[#2873F5]/50">
                {product.name.charAt(0)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
