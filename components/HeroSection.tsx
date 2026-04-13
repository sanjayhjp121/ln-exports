"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-end overflow-hidden -mt-[104px]">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover scale-105 transition-opacity duration-[2000ms] ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Poster / fallback while video loads */}
        <div
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHHC7SLX_Jqp3XHymLdewJ8kDVyo2ZQYnD8Mp6VKczqGcPsUpPvm-bE7ps6UNOhapsZ6UUrdiEYPHD51r6Zb9fZwqiJ_UKFak-gmQc33qmd_4GxnDrc4S5NK9z-RxesLz0v1p4Jgc0hiE7BWvqHInSX8o2_TMgqN3UFUI_9BnQotaDcND50vSIhyBtDVHk7idDg9gHJ7ka7xBWdn7SZujRwyf7NTuoCiFTCxWXVWLMKSPeflQp6ioKIaqr_ZK_zqH5sdn6tYrcPVAp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fbf9f8] to-transparent z-[3]" />

      {/* Content — positioned at the bottom */}
      <div className="relative z-10 w-full pb-36 pt-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block font-label text-[11px] uppercase tracking-[0.35em] text-white/60 font-medium">
              LN Exports — Premium Stone & Export House
            </span>

            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-white tracking-tight">
              Where <em className="not-italic text-primary-fixed-dim">Earth</em>{" "}
              Meets <span className="text-white">Artistry</span>
            </h1>

            <p className="text-white/60 text-base md:text-lg max-w-lg font-light leading-relaxed">
              Granite · Marble · Quartz · Vitrified Tiles — sourced from India&apos;s
              finest quarries for kitchens, floors & facades worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="bg-primary text-on-primary px-8 py-3.5 font-bold uppercase tracking-widest text-[11px] hover:bg-primary-container transition-colors flex items-center gap-2"
              >
                Explore Collections
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="border border-white/30 text-white px-8 py-3.5 font-bold uppercase tracking-widest text-[11px] hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Request Samples
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40">
        <span className="material-symbols-outlined text-white text-xl">
          keyboard_arrow_down
        </span>
      </div>
    </section>
  );
}
