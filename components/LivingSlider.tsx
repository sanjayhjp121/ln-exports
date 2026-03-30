"use client";

import { useRef } from "react";

const SLIDES = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAh2f1dIiZdtOy15POc1ZxLpwu69j_OnGJcbG2lrlyDu4EAqnfsYJq1U8qaE4oVXdQRE3rvf8UOEmJzfp9axbops62Biu6ZfCymWEo1zwg8Tah4QXeJw6Sy5YcJCu3U9kCr30H5WaSoqBHu2WkxhByhTbDOUmF4Fh7CC1Gcm8-sk6eF8EYecsOa5r0znbCHUFLnt4NEQ6tOOAxvlO_aiBGSalRDKrbplYkoETXPhdPgzLuPrpbckWBNk_k8udfzYxcuE8bG6FcVvfxZ",
    title: "Modern Culinary Sanctuary",
    desc: "Monolithic marble islands that serve as the heartbeat of the modern home, offering both durability and timeless elegance.",
    label: "Statuario White",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAp49VmZPdLRgHIqsOWIaRoRRMQ406jSBZiLLBA8mgML1N2e0epW9munvCjCUk5ArptJy125mmQvtG7D69Jal5tMg0PF_q-k97e70L9yuNb32YclpM74MdoyZVO-Czh8Q_Ig5QdCQT1IkqQ9-yuR9zqY5MDnM-ZdrizKz_76ZNyWkybOB3_03_yZz4ImR6wTz0S1VSZrZyIxx6Jlc4FfATfl1NYJUteOhuKfp3KdVLPtEaOD6BPWA6KkAAalkc396vIfianIvE8ampw",
    title: "Grand Tectonic Living",
    desc: "Large-format granite flooring that grounds expansive living spaces with subtle crystalline depth and unmatched permanence.",
    label: "Crystal Black",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3wfKsRnyUwuCsV9tcnO8Ap0Gmcyya0_2Fy-CVXO3HDWEym8jkMWbaVNyEfVJ0Wpcfo3dJksYt6j055hXothBgB7HY-fli63n9UUqwUddit9MBtU1JKe_fe6StUbHaZ1XFsIjU095855BZ2zCtn9XcXknn4n2tTJg3ffHN8kmrt69LAGBrceqaDqFnInYMQN7UDi1cp2S3nyDimN3HmXq8FQp44EQOt-yG1SPi0rQ3QnbnftpHtrr7zt9N9nQ6o-PxYYIpI0J_W7Bf",
    title: "Bespoke Bath Atelier",
    desc: "Tactile sandstone walls and hand-carved elements transform the private bath into a serene, earth-grounded retreat.",
    label: "Mint Sandstone",
  },
];

export default function LivingSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    sliderRef.current?.scrollBy({ left: dir === "left" ? -800 : 800, behavior: "smooth" });
  }

  return (
    <div className="relative group">
      {/* Slider track */}
      <div
        ref={sliderRef}
        className="slider-container flex overflow-x-auto gap-8 pb-12 snap-x"
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.title}
            className="slider-item min-w-full md:min-w-[80%] lg:min-w-[65%] snap-center flex-shrink-0"
          >
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-[0.125rem] tonal-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-headline text-2xl text-on-surface">{slide.title}</h4>
                  <p className="text-on-surface-variant text-sm mt-2 leading-relaxed max-w-lg">
                    {slide.desc}
                  </p>
                </div>
                <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold flex-shrink-0 ml-8">
                  {slide.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center md:justify-end gap-4 mt-8">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous slide"
          className="w-12 h-12 flex items-center justify-center border border-outline-variant/30 text-on-surface hover:bg-primary hover:text-on-primary transition-all rounded-[0.125rem]"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Next slide"
          className="w-12 h-12 flex items-center justify-center border border-outline-variant/30 text-on-surface hover:bg-primary hover:text-on-primary transition-all rounded-[0.125rem]"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
