"use client";

import { useState } from "react";
import Image from "next/image";
import { SanityImage } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface ImageGalleryProps {
  images: SanityImage[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-stone-100 rounded-xl flex items-center justify-center">
        <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const activeUrl = urlFor(activeImage).width(900).height(675).fit("crop").url();
  const lightboxUrl = urlFor(activeImage).width(1400).height(1050).fit("max").url();

  return (
    <div>
      {/* Main image */}
      <div
        className="relative aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={activeUrl}
          alt={activeImage.alt || title}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
          priority
        />
        {activeImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3">
            <p className="text-white text-xs">{activeImage.caption}</p>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/30 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          Zoom
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => {
            const thumbUrl = urlFor(img).width(120).height(90).fit("crop").url();
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                  idx === activeIndex ? "border-[#8B1515]" : "border-transparent hover:border-stone-300"
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={img.alt || `${title} ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-4xl w-full max-h-[90vh] aspect-[4/3]">
            <Image
              src={lightboxUrl}
              alt={activeImage.alt || title}
              fill
              sizes="100vw"
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white hover:text-stone-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i - 1 + images.length) % images.length);
                }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 text-white hover:text-stone-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i + 1) % images.length);
                }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
