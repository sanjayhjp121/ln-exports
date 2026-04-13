"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  material: string;
  link: string;
}

const SLIDES: Slide[] = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgJRhbxAKqMijDIu5rkuzslBm4VyjNRvjRymvBLU3pz0WrLlYCYgBtMMEy5lPXptqIgFZtP4ZZzHOxnThTKH29IlRrQeG0kzMf8Cb0M8j_Gq3rNwabXqGYNIYoIfhqeNy6el_gXFz15N429zLWgwdFzInz5Qh1eGeXqncR4Mzmp5or7zuSJECkv18zILPw2iTyxIVDcXWCMizPO6kt771QwpuPwTiOdflztv1MAKN01OpGpot0pCI8rP1GmFliKhzTBcIAtGAlfj",
    title: "Absolute Black Granite",
    subtitle: "Zero-vein, mirror-polished surface — the gold standard for modern kitchens and commercial spaces.",
    material: "Granite",
    link: "/products?category=granite",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjeQSN_pQYp-raOPTfLGmkRrsBntkgrraR995BmZSzsvwNWFA-9d7yRfqz3wn6I1vnvoCCxNgSFWyJ01DS3fAInBMt5EkMLamB4jx5OfpG7wK8OKoLaagQcpcesQHCYsa6SXuMQHbtZPY7JB6PMeu9JfxhQo9hsDbBh5i0d5AbBPdvLNC2A1BAAXEIqz3AtiM4MTzx83F_I55z1hg4Fp92JlzuQp4moz4WAhj-IdozEKrA7E3lpMBh3r2hEP8ALJSEAY4EOD87UDpb",
    title: "Portoro Gold Marble",
    subtitle: "Dramatic gold veining on deep black — a statement of opulence for luxury interiors.",
    material: "Marble",
    link: "/products?category=marble",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWADQJ93A_02JzVzfXairNl2k3sBWCR-OF25CkoQi8YaZyERa3jl5IcHuYJQfFS-TiRWBl_spJlBoVtZswWEWewiyzKNAQiZKEvtpbnHBp1GeJZBojFNnf_Y8oU1Hbn0jeK1DqCKTGozxUw475YWG0-y8rVIH9Ed17UAQhhZh5i4qxL8O4uXI7t4y6Xu0YdOj2ouWZEQ5yj9jKB-oU2rF9cWPE5jy2earABliIETnc6T_QAGcEkLzIQ-cnDWvxYn9R4msTReviQnZo",
    title: "Semi-Precious Quartz",
    subtitle: "Translucent engineered surfaces with the beauty of gemstone and the strength of engineered stone.",
    material: "Quartz",
    link: "/products?category=quartz",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHHC7SLX_Jqp3XHymLdewJ8kDVyo2ZQYnD8Mp6VKczqGcPsUpPvm-bE7ps6UNOhapsZ6UUrdiEYPHD51r6Zb9fZwqiJ_UKFak-gmQc33qmd_4GxnDrc4S5NK9z-RxesLz0v1p4Jgc0hiE7BWvqHInSX8o2_TMgqN3UFUI_9BnQotaDcND50vSIhyBtDVHk7idDg9gHJ7ka7xBWdn7SZujRwyf7NTuoCiFTCxWXVWLMKSPeflQp6ioKIaqr_ZK_zqH5sdn6tYrcPVAp",
    title: "Makrana Pristine White",
    subtitle: "The marble of the Taj Mahal — luminous white with the subtlest grey veining, available in premium slabs.",
    material: "Marble",
    link: "/products?category=marble",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5hkcytrl-wZhEDxlc1xevakHj2iaZaZ9ONiJrB8mYB2wvh7lZa0vcS1eE_W_YChMLxgapspcuxmnuYPasdO6w8z3McVUQ_5DiLOvWdsY1SLUlyu-vfzrCOcA74veEs76N5_9_zQBPWjKbMEU4ZVnqvFz_GO6mfeYnlbg-K70i8ac0v9c7ss9-nUfUJSJzvVAlR0GdKbZa32HVcfe5zFHwd3XAw-4wHdr5MhYyjP1i_th1290ZNF7LhjP1j4eyQcZ8DHu0OMVC-8vz",
    title: "Designer Vitrified Tiles",
    subtitle: "Large-format engineered tiles with wood, marble, and concrete finishes — zero porosity, maximum beauty.",
    material: "Vitrified Tiles",
    link: "/products?category=tiles",
  },
];

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-[85vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-[2]" : "opacity-0 z-[1]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 z-[3]" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] p-8 md:p-16">
        <div className="container mx-auto max-w-[1920px]">
          <div className="max-w-2xl space-y-4">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary-fixed font-bold">
              {slide.material}
            </span>
            <h3 className="font-headline text-4xl md:text-6xl text-white leading-tight">
              {slide.title}
            </h3>
            <p className="text-white/70 text-lg max-w-lg font-light leading-relaxed">
              {slide.subtitle}
            </p>
            <Link
              href={slide.link}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-[0.125rem] font-label text-xs uppercase tracking-widest hover:bg-white/20 transition-colors mt-4"
            >
              View Collection
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors rounded-full"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === current ? "w-10 bg-primary" : "w-4 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors rounded-full"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <span className="text-white/40 text-sm font-label ml-4">
              {current + 1} / {SLIDES.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
