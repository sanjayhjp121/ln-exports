"use client";

import { useState } from "react";
import Image from "next/image";
import { SanityImage } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface ImageGalleryProps {
  images: SanityImage[];
  imageUrls?: string[];
  title: string;
}

export default function ImageGallery({ images, imageUrls, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const useDirectUrls = imageUrls && imageUrls.length > 0;
  const totalImages = useDirectUrls ? imageUrls.length : images?.length || 0;

  if (totalImages === 0) {
    return (
      <div className="aspect-[4/3] bg-stone-100 rounded-[0.125rem] flex items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-stone-300">image</span>
      </div>
    );
  }

  if (useDirectUrls) {
    const activeUrl = imageUrls[activeIndex];

    return (
      <div>
        <div
          className="relative aspect-[4/3] bg-stone-100 rounded-[0.125rem] overflow-hidden cursor-zoom-in group"
          onClick={() => setLightboxOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-[0.125rem] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-sm">zoom_in</span>
            Zoom
          </div>
        </div>

        {totalImages > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {imageUrls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-[0.125rem] overflow-hidden border-2 transition-colors ${
                  idx === activeIndex ? "border-primary" : "border-transparent hover:border-stone-300"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`${title} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <div className="relative max-w-5xl w-full max-h-[90vh] aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrls[activeIndex]}
                alt={title}
                className="w-full h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {totalImages > 1 && (
              <>
                <button
                  className="absolute left-4 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((i) => (i - 1 + totalImages) % totalImages);
                  }}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button
                  className="absolute right-4 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((i) => (i + 1) % totalImages);
                  }}
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const activeUrl = urlFor(activeImage).width(900).height(675).fit("crop").url();
  const lightboxUrl = urlFor(activeImage).width(1400).height(1050).fit("max").url();

  return (
    <div>
      <div
        className="relative aspect-[4/3] bg-stone-100 rounded-[0.125rem] overflow-hidden cursor-zoom-in group"
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
        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-[0.125rem] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-sm">zoom_in</span>
          Zoom
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => {
            const thumbUrl = urlFor(img).width(120).height(90).fit("crop").url();
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-[0.125rem] overflow-hidden border-2 transition-colors ${
                  idx === activeIndex ? "border-primary" : "border-transparent hover:border-stone-300"
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

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <div className="relative max-w-5xl w-full max-h-[90vh] aspect-[4/3]">
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
                className="absolute left-4 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i - 1 + images.length) % images.length);
                }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                className="absolute right-4 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i + 1) % images.length);
                }}
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
