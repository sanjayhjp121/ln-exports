"use client";

import { useState } from "react";
import Image from "next/image";
import { SanityImage } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import type { InspirationItem } from "@/lib/placeholder-data";

interface InspirationGalleryProps {
  sanityImages?: SanityImage[];
  placeholderItems?: InspirationItem[];
  productName: string;
}

export default function InspirationGallery({
  sanityImages,
  placeholderItems,
  productName,
}: InspirationGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const useSanity = sanityImages && sanityImages.length > 0;
  const usePlaceholder = placeholderItems && placeholderItems.length > 0;

  if (!useSanity && !usePlaceholder) return null;

  const totalItems = useSanity ? sanityImages.length : placeholderItems!.length;

  return (
    <div className="mt-20">
      <div className="flex items-center gap-4 mb-3">
        <span className="w-10 h-[2px] bg-primary" />
        <h2 className="font-headline text-2xl text-on-surface">See It In Real Spaces</h2>
      </div>
      <p className="text-on-surface-variant font-light text-sm mb-8 ml-14">
        How {productName} looks when installed in kitchens, bathrooms, lobbies, and facades.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {usePlaceholder &&
          placeholderItems!.map((item, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[4/3] rounded-[0.125rem] overflow-hidden cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-light leading-snug">{item.caption}</p>
              </div>
              <div className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-on-surface text-sm">zoom_in</span>
              </div>
            </button>
          ))}

        {useSanity &&
          sanityImages!.map((img, i) => {
            const thumbUrl = urlFor(img).width(400).height(300).fit("crop").url();
            return (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] rounded-[0.125rem] overflow-hidden cursor-zoom-in"
              >
                <Image
                  src={thumbUrl}
                  alt={img.alt || `${productName} inspiration ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-light leading-snug">{img.caption}</p>
                  </div>
                )}
                <div className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined text-on-surface text-sm">zoom_in</span>
                </div>
              </button>
            );
          })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative w-full aspect-[4/3]">
              {usePlaceholder ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={placeholderItems![lightboxIndex].url}
                    alt={placeholderItems![lightboxIndex].caption}
                    className="w-full h-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                </>
              ) : (
                <Image
                  src={urlFor(sanityImages![lightboxIndex]).width(1400).height(1050).fit("max").url()}
                  alt={sanityImages![lightboxIndex].alt || productName}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>

            {/* Caption */}
            <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-white/80 text-sm font-light">
                {usePlaceholder
                  ? placeholderItems![lightboxIndex].caption
                  : sanityImages![lightboxIndex].caption}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {lightboxIndex + 1} / {totalItems}
              </p>
            </div>
          </div>

          {totalItems > 1 && (
            <>
              <button
                className="absolute left-4 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => ((i ?? 0) - 1 + totalItems) % totalItems);
                }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                className="absolute right-16 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => ((i ?? 0) + 1) % totalItems);
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
